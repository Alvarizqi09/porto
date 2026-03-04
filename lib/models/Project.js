import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: [true, "Project title (EN) is required"], maxlength: 100, trim: true },
      id: { type: String, required: [true, "Project title (ID) is required"], maxlength: 100, trim: true },
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    tag: {
      type: [String],
      enum: ["All", "Web", "Design"],
      required: [true, "Tags are required"],
    },
    desc: {
      en: { type: String, required: [true, "Description (EN) is required"], maxlength: 500 },
      id: { type: String, required: [true, "Description (ID) is required"], maxlength: 500 },
    },
    long_desc: {
      en: { type: String, default: "", maxlength: 2000 },
      id: { type: String, default: "", maxlength: 2000 },
    },
    demo: {
      type: String,
      required: [true, "Demo URL is required"],
    },
    preview: {
      type: String,
      required: [true, "Preview URL is required"],
    },
    github: {
      type: String,
      default: "",
    },
    tech_stack: {
      type: [String],
      default: [],
    },
    pages: {
      type: [
        {
          title: {
            en: { type: String, required: [true, "Page title (EN) is required"], trim: true },
            id: { type: String, required: [true, "Page title (ID) is required"], trim: true },
          },
          image: {
            type: String,
            required: [true, "Page image URL is required"],
          },
        },
      ],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true, // Index untuk query featured
    },
    order: {
      type: Number,
      default: 0,
      index: true, // Index untuk sorting
    },
  },
  {
    timestamps: true, // Otomatis menambah createdAt dan updatedAt
  }
);

// Compound index untuk performa query filtering dan sorting
projectSchema.index({ tag: 1, order: 1, createdAt: -1 });
projectSchema.index({ featured: 1, order: 1 });

// Prevent model overwrite pada hot reload
export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
