import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import {
  About,
  Resume,
  Education,
  Skill,
  Certificate,
} from "@/lib/models/About";
import { getFromCache, setCache, clearCacheByPrefix } from "@/lib/apiCache";
import { setCorsHeaders, handleCorsOptions } from "@/lib/cors";

export async function OPTIONS(request) {
  return handleCorsOptions(request);
}

export async function GET(request) {
  try {
    const cacheKey = "about-all";

    // Check cache - return cached data if available
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

    await connectDB();

    const [about, resume, education, skill, certificate] = await Promise.all([
      About.findOne().lean(),
      Resume.findOne().lean(),
      Education.findOne().lean(),
      Skill.findOne().lean(),
      Certificate.findOne().lean(),
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

    // Sort certificate items
    if (certificate && certificate.items && Array.isArray(certificate.items)) {
      certificate.items = certificate.items.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    // Serialize all data to remove ObjectIds and circular references
    const serializeData = (data) => JSON.parse(JSON.stringify(data));

    const responseData = {
      success: true,
      data: {
        about: about
          ? serializeData(about)
          : { title: "About Me", description: "", info: [] },
        resume: resume
          ? serializeData(resume)
          : { title: "Experience", description: "", items: [] },
        education: education
          ? serializeData(education)
          : {
              title: "My Education",
              description: "",
              items: [],
            },
        skill: skill
          ? serializeData(skill)
          : { title: "My Skills", description: "", skillList: [] },
        certificate: certificate
          ? serializeData(certificate)
          : {
              title: "My Certificates",
              description: "",
              items: [],
            },
      },
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
    console.error("GET About Error:", error);
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    );
  }
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
      case "certificate":
        result = await Certificate.findOneAndUpdate({}, data, {
          upsert: true,
          new: true,
          runValidators: true,
        });
        break;
      default:
        return setCorsHeaders(
          NextResponse.json(
            { success: false, error: "Invalid section" },
            { status: 400 }
          )
        );
    }

    clearCacheByPrefix("about");
    revalidatePath("/about");
    revalidatePath("/");

    // Serialize result to remove ObjectIds
    const serializeData = (data) => JSON.parse(JSON.stringify(data));

    return setCorsHeaders(
      NextResponse.json({
        success: true,
        data: serializeData(result),
      })
    );
  } catch (error) {
    console.error("POST About Error:", error);
    return setCorsHeaders(
      NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    );
  }
}
