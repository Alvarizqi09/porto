import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { About, Resume, Education, Skill } from "@/lib/models/About";

// Cache untuk production
const cache = new Map();
const CACHE_DURATION = 1000; // 1 second cache to ensure fresh data

export async function GET(request) {
  try {
    const cacheKey = "about-all";

    // Skip cache - always fetch fresh data
    // if (cache.has(cacheKey) && CACHE_DURATION > 0) {
    //   const cachedData = cache.get(cacheKey);
    //   if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
    //     return NextResponse.json(cachedData.data, {
    //       headers: {
    //         "Cache-Control": "public, max-age=600",
    //       },
    //     });
    //   }
    // }

    await connectDB();

    const [about, resume, education, skill] = await Promise.all([
      About.findOne().lean(),
      Resume.findOne().lean(),
      Education.findOne().lean(),
      Skill.findOne().lean(),
    ]);

    // Sort resume items - put items with lower index/order first
    if (resume && resume.items && Array.isArray(resume.items)) {
      resume.items = resume.items.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    // Sort education items
    if (education && education.items && Array.isArray(education.items)) {
      education.items = education.items.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    // Sort skill list
    if (skill && skill.skillList && Array.isArray(skill.skillList)) {
      skill.skillList = skill.skillList.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

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

    // Clear cache before setting new data
    cache.clear();
    cache.set(cacheKey, {
      data: responseData,
      timestamp: Date.now(),
    });

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
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
    revalidatePath("/about");
    revalidatePath("/");

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
