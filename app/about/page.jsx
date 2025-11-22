import AboutClient from "@/components/client/AboutClient";
import { connectDB } from "@/lib/db";
import {
  About as AboutModel,
  Resume,
  Education,
  Skill,
  Certificate,
} from "@/lib/models/About";

// Server-side data fetching - Direct DB query (no API call)
async function getAboutData() {
  try {
    await connectDB();

    const [about, resume, education, skill, certificate] = await Promise.all([
      AboutModel.findOne().lean(),
      Resume.findOne().lean(),
      Education.findOne().lean(),
      Skill.findOne().lean(),
      Certificate.findOne().lean(),
    ]);

    // Sort resume items
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

    return {
      about: about || { title: "About Me", description: "", info: [] },
      resume: resume || { title: "Experience", description: "", items: [] },
      education: education || {
        title: "My Education",
        description: "",
        items: [],
      },
      skill: skill || { title: "My Skills", description: "", skillList: [] },
      certificate: certificate || {
        title: "My Certificates",
        description: "",
        items: [],
      },
    };
  } catch (err) {
    console.error("Error fetching about data:", err);
    // Return default data if fetch fails
    return {
      about: { title: "About Me", description: "", info: [] },
      resume: { title: "Experience", description: "", items: [] },
      education: { title: "My Education", description: "", items: [] },
      skill: { title: "My Skills", description: "", skillList: [] },
      certificate: { title: "My Certificates", description: "", items: [] },
    };
  }
}

export default async function About() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading About Data</h2>
          <p>Failed to load about data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return <AboutClient aboutData={aboutData} />;
}
