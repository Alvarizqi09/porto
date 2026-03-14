import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      en: { type: String, required: true },
      id: { type: String, required: true },
    },
    text: {
      en: { type: String, required: true, maxlength: 2000 },
      id: { type: String, required: true, maxlength: 2000 },
    },
    image: {
      type: String,
      default: "", // Can be filled with base64, cloudinary URL, or local path
    },
    date: {
      en: { type: String },
      id: { type: String },
    },
    linkedinProfileId: {
      type: String, // Optional, to link to their profile
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Clear cache for Next.js hot reload
if (mongoose.models.Recommendation) {
  delete mongoose.models.Recommendation;
}

export const Recommendation = mongoose.model("Recommendation", recommendationSchema);
