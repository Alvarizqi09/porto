import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import { clearCacheByPrefix } from "@/lib/apiCache";

// GET - Ambil project by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const project = await Project.findById(params.id)
      .select(
        "_id title desc long_desc image tag demo preview github tech_stack featured order createdAt"
      )
      .lean()
      .exec();

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("GET by ID Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update project by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    // Remove _id from body if exists
    delete body._id;

    const updatedProject = await Project.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).exec();

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Clear cache setelah PUT
    clearCacheByPrefix("projects");
    revalidatePath("/projects");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: updatedProject.toObject(),
    });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Hapus project by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const deletedProject = await Project.findByIdAndDelete(params.id).exec();

    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // Clear cache setelah DELETE
    clearCacheByPrefix("projects");
    revalidatePath("/projects");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
