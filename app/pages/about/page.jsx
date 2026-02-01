import AboutClient from "@/components/client/ui/AboutClient";
import { connectDB } from "@/lib/db";
import {
  About as AboutModel,
  Resume,
  Education,
  Skill,
  Certificate,
} from "@/lib/models/About";

// Helper function to serialize MongoDB objects
function serializeData(data) {
  return JSON.parse(JSON.stringify(data));
}

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

    // Serialize all data to convert ObjectIds and remove circular refs
    const serializedAbout = about ? serializeData(about) : null;
    const serializedResume = resume ? serializeData(resume) : null;
    const serializedEducation = education ? serializeData(education) : null;
    const serializedSkill = skill ? serializeData(skill) : null;
    const serializedCertificate = certificate
      ? serializeData(certificate)
      : null;

    // Sort resume items
    if (
      serializedResume &&
      serializedResume.items &&
      Array.isArray(serializedResume.items)
    ) {
      serializedResume.items = serializedResume.items.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    // Sort education items
    if (
      serializedEducation &&
      serializedEducation.items &&
      Array.isArray(serializedEducation.items)
    ) {
      serializedEducation.items = serializedEducation.items.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    // Sort skill list
    if (
      serializedSkill &&
      serializedSkill.skillList &&
      Array.isArray(serializedSkill.skillList)
    ) {
      serializedSkill.skillList = serializedSkill.skillList.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    // Sort certificate items
    if (
      serializedCertificate &&
      serializedCertificate.items &&
      Array.isArray(serializedCertificate.items)
    ) {
      serializedCertificate.items = serializedCertificate.items.sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
    }

    return {
      about: serializedAbout || {
        title: "About Me",
        description: "",
        info: [],
      },
      resume: serializedResume || {
        title: "Experience",
        description: "",
        items: [],
      },
      education: serializedEducation || {
        title: "My Education",
        description: "",
        items: [],
      },
      skill: serializedSkill || {
        title: "My Skills",
        description: "",
        skillList: [],
      },
      certificate: serializedCertificate || {
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
