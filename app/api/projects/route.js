import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";

// Cache untuk production (memory cache)
const cache = new Map();
const CACHE_DURATION = 0; // Disable cache - fetch fresh data every time

// Helper function to clear all cache
function clearCache() {
  cache.clear();
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");

    // Generate cache key
    const cacheKey = `projects-${tag || "all"}-${featured || "false"}`;

    // Check cache (disabled if CACHE_DURATION is 0)
    if (CACHE_DURATION > 0 && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return NextResponse.json(cachedData.data, {
          headers: {
            "Cache-Control": "public, max-age=300", // 5 minutes
          },
        });
      }
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

    const responseData = {
      success: true,
      count: projects.length,
      data: projects,
    };

    // Set cache untuk semua environment
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now(),
    });

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, max-age=300", // 5 minutes
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
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
    clearCache();
    revalidatePath("/projects"); // Invalidate projects page cache
    revalidatePath("/"); // Invalidate home page jika menampilkan projects

    return NextResponse.json(
      {
        success: true,
        data: newProject.toObject(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
