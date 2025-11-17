import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET - Ambil semua projects
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio"); // Nama database

    // Parse query params untuk filtering
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");

    // Build filter
    const filter = {};
    if (tag && tag !== "All") {
      filter.tag = tag;
    }
    if (featured === "true") {
      filter.featured = true;
    }

    const projects = await db
      .collection("projects")
      .find(filter)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
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
    const client = await clientPromise;
    const db = client.db("portfolio");

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

    // Prepare data
    const projectData = {
      ...body,
      featured: body.featured || false,
      order: body.order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(projectData);

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: result.insertedId,
          ...projectData,
        },
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
