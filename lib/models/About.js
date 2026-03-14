import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, default: "About Me" },
      id: { type: String, default: "Tentang Saya" },
    },
    description: {
      en: { type: String, default: "", maxlength: 2000 },
      id: { type: String, default: "", maxlength: 2000 },
    },
    cvLink: {
      type: String,
      default: "",
    },
    cvLinkEnglish: {
      type: String,
      default: "",
    },
    info: [
      {
        fieldName: {
          en: { type: String, required: true },
          id: { type: String, required: true },
        },
        fieldValue: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const resumeSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, default: "Experience" },
      id: { type: String, default: "Pengalaman" },
    },
    description: {
      en: { type: String, default: "", maxlength: 2000 },
      id: { type: String, default: "", maxlength: 2000 },
    },
    items: [
      {
        company: String,
        date: {
          en: { type: String },
          id: { type: String },
        },
        position: {
          en: { type: String },
          id: { type: String },
        },
        description: {
          en: { type: String, default: "", maxlength: 3000 },
          id: { type: String, default: "", maxlength: 3000 },
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const educationSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, default: "My Education" },
      id: { type: String, default: "Pendidikan" },
    },
    description: {
      en: { type: String, default: "", maxlength: 2000 },
      id: { type: String, default: "", maxlength: 2000 },
    },
    items: [
      {
        school: String,
        date: {
          en: { type: String },
          id: { type: String },
        },
        degree: {
          en: { type: String },
          id: { type: String },
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const skillSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, default: "My Skills" },
      id: { type: String, default: "Keahlian" },
    },
    description: {
      en: { type: String, default: "", maxlength: 2000 },
      id: { type: String, default: "", maxlength: 2000 },
    },
    skillList: [
      {
        name: String,
        category: {
          type: String,
          enum: [
            "Programming Language",
            "Framework",
            "Styling",
            "Backend",
            "Version Control",
            "Libraries",
            "Other",
            // Legacy categories kept for backward compatibility
            "Frontend Framework",
            "Database",
            "Tools & Management",
            "Design",
            "Frontend",
          ],
          default: "Other",
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const certificateSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, default: "My Certificates" },
      id: { type: String, default: "Sertifikat" },
    },
    description: {
      en: { type: String, default: "", maxlength: 2000 },
      id: { type: String, default: "", maxlength: 2000 },
    },
    items: [
      {
        name: {
          en: { type: String },
          id: { type: String },
        },
        publisher: String,
        image: String,
        date: {
          en: { type: String },
          id: { type: String },
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Clear Mongoose models cache for Next.js hot-reloading
if (mongoose.models.About) delete mongoose.models.About;
if (mongoose.models.Resume) delete mongoose.models.Resume;
if (mongoose.models.Education) delete mongoose.models.Education;
if (mongoose.models.Skill) delete mongoose.models.Skill;
if (mongoose.models.Certificate) delete mongoose.models.Certificate;

export const About = mongoose.model("About", aboutSchema);
export const Resume = mongoose.model("Resume", resumeSchema);
export const Education = mongoose.model("Education", educationSchema);
export const Skill = mongoose.model("Skill", skillSchema);
export const Certificate = mongoose.model("Certificate", certificateSchema);
