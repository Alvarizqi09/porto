"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { FiUpload, FiX } from "react-icons/fi";

export function CertificateImageUpload({ onImageUrlChange, currentImageUrl }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentImageUrl || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setError("Pilih gambar terlebih dahulu");
      return;
    }

    setUploadingImage(true);
    try {
      const { url } = await uploadToCloudinary(imageFile);
      onImageUrlChange(url);
      setImageFile(null);
      setError("");
    } catch (err) {
      setError(err.message || "Gagal upload gambar");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageFile(null);
    onImageUrlChange("");
    setError("");
  };

  return (
    <div className="space-y-3">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative w-full h-[120px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={imagePreview}
            alt="Certificate preview"
            fill
            className="object-cover"
          />
          {imageFile && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button
                onClick={handleRemoveImage}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                <FiX size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upload Section */}
      <div className="flex gap-2 items-center">
        <label className="flex-1 flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition">
          <div className="flex items-center gap-2 text-sm">
            <FiUpload size={18} />
            <span>Upload Certificate Image</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={uploadingImage}
          />
        </label>

        {imageFile && (
          <button
            onClick={handleUploadImage}
            disabled={uploadingImage}
            className="px-4 py-2 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
          >
            {uploadingImage ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Current URL Display */}
      {currentImageUrl && !imageFile && (
        <p className="text-xs text-gray-500 break-all">
          Current: {currentImageUrl.slice(0, 50)}...
        </p>
      )}
    </div>
  );
}
