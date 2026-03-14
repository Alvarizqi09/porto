import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Recommendation } from "@/lib/models/Recommendation";

export async function GET() {
  try {
    await connectDB();
    const recommendations = await Recommendation.find({ isVisible: true }).sort({ order: 1 });
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
