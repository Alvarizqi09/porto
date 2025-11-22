import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { setCorsHeaders, handleCorsOptions } from "@/lib/cors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function OPTIONS(request) {
  return handleCorsOptions(request);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return setCorsHeaders(
        NextResponse.json({ error: "No file provided" }, { status: 400 })
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "porto_projects",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    return setCorsHeaders(
      NextResponse.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      })
    );
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return setCorsHeaders(
      NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to upload image",
        },
        { status: 500 }
      )
    );
  }
}
