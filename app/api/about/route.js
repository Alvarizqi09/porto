import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { About, Resume, Education, Skill } from "@/lib/models/About";

// Cache untuk production
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET(request) {
  try {
    const cacheKey = "about-all";

    // Check cache
    if (cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey);
      if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
        return NextResponse.json(cachedData.data, {
          headers: {
            "Cache-Control": "public, max-age=600",
          },
        });
      }
    }

    await connectDB();

    const [about, resume, education, skill] = await Promise.all([
      About.findOne().lean(),
      Resume.findOne().lean(),
      Education.findOne().lean(),
      Skill.findOne().lean(),
    ]);

    const responseData = {
      success: true,
      data: {
        about: about || { title: "About Me", description: "", info: [] },
        resume: resume || { title: "Experience", description: "", items: [] },
        education: education || {
          title: "My Education",
          description: "",
          items: [],
        },
        skill: skill || { title: "My Skills", description: "", skillList: [] },
      },
    };

    // Set cache
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now(),
    });

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (error) {
    console.error("GET About Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function clearCache() {
  cache.clear();
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { section, data } = body;

    let result;

    switch (section) {
      case "about":
        result = await About.findOneAndUpdate({}, data, {
          upsert: true,
          new: true,
          runValidators: true,
        });
        break;
      case "resume":
        result = await Resume.findOneAndUpdate({}, data, {
          upsert: true,
          new: true,
          runValidators: true,
        });
        break;
      case "education":
        result = await Education.findOneAndUpdate({}, data, {
          upsert: true,
          new: true,
          runValidators: true,
        });
        break;
      case "skill":
        result = await Skill.findOneAndUpdate({}, data, {
          upsert: true,
          new: true,
          runValidators: true,
        });
        break;
      default:
        return NextResponse.json(
          { success: false, error: "Invalid section" },
          { status: 400 }
        );
    }

    clearCache();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("POST About Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
