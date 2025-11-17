import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
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
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    demo: {
      type: String,
      required: [true, "Demo URL is required"],
    },
    preview: {
      type: String,
      required: [true, "Preview URL is required"],
    },
    tech_stack: {
      type: [String],
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
