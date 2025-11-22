import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import {
  getFromCache,
  setCache,
  clearCacheByPrefix,
  getCacheKey,
} from "@/lib/apiCache";
import { setCorsHeaders, handleCorsOptions } from "@/lib/cors";

export async function OPTIONS(request) {
  return handleCorsOptions(request);
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");

    // Generate cache key
    const cacheKey = getCacheKey("projects", { tag, featured });

    // Check cache
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      return setCorsHeaders(
        NextResponse.json(cachedData, {
          headers: {
            "Cache-Control": "public, max-age=10",
          },
        })
      );
    }

    // Connect to database
    await connectDB();

    // Build filter dengan optimasi
    const filter = {};
    if (tag && tag !== "All") {
      filter.tag = tag;
    }
    if (featured === "true") {
      filter.featured = true;
    }

    // Query dengan select() untuk hanya ambil field yang diperlukan (lebih cepat)
    const projects = await Project.find(filter)
      .select("_id title desc image tag demo preview tech_stack featured order")
      .sort({ order: 1, createdAt: -1 })
      .limit(50)
      .lean() // Gunakan lean untuk performa query yang lebih cepat
      .exec();

    // Serialize projects to remove ObjectIds
    const serializeData = (data) => JSON.parse(JSON.stringify(data));
    const serializedProjects = projects.map((project) =>
      serializeData(project)
    );

    const responseData = {
      success: true,
      count: serializedProjects.length,
      data: serializedProjects,
    };

    // Set cache
    setCache(cacheKey, responseData);

    return setCorsHeaders(
      NextResponse.json(responseData, {
        headers: {
          "Cache-Control": "public, max-age=10",
        },
      })
    );
  } catch (error) {
    console.error("GET Error:", error);
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    );
  }
}

// POST - Tambah project baru
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validasi data
    if (!body.title || !body.desc || !body.image) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, description, and image are required",
        },
        { status: 400 }
      );
    }

    // Create project menggunakan mongoose
    const projectData = {
      ...body,
      featured: body.featured || false,
      order: body.order || 0,
    };

    const newProject = await Project.create(projectData);

    // Invalidate cache setelah POST
    clearCacheByPrefix("projects");
    revalidatePath("/projects"); // Invalidate projects page cache
    revalidatePath("/"); // Invalidate home page jika menampilkan projects

    // Serialize result to remove ObjectIds
    const serializeData = (data) => JSON.parse(JSON.stringify(data));

    return setCorsHeaders(
      NextResponse.json(
        {
          success: true,
          data: serializeData(newProject),
        },
        { status: 201 }
      )
    );
  } catch (error) {
    console.error("POST Error:", error);
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    );
  }
}
