import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "About Me",
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    info: [
      {
        fieldName: {
          type: String,
          required: true,
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
      type: String,
      default: "Experience",
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    items: [
      {
        company: String,
        date: String,
        position: String,
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
      type: String,
      default: "My Education",
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    items: [
      {
        school: String,
        date: String,
        degree: String,
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
      type: String,
      default: "My Skills",
    },
    description: {
      type: String,
      default: "",
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    skillList: [
      {
        name: String,
        category: {
          type: String,
          enum: ["Frontend", "Backend", "Design", "Other"],
          default: "Other",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const About =
  mongoose.models.About || mongoose.model("About", aboutSchema);
export const Resume =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
export const Education =
  mongoose.models.Education || mongoose.model("Education", educationSchema);
export const Skill =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);
