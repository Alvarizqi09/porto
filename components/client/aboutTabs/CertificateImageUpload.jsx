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
      const response = await uploadToCloudinary(imageFile);

      // Handle both direct response { url, publicId } and wrapped response { success, url, publicId }
      const imageUrl = response.url || response.data?.url;

      if (!imageUrl) {
        throw new Error("Tidak ada URL yang dikembalikan dari upload");
      }

      onImageUrlChange(imageUrl);
      setImageFile(null);
      setError("");
    } catch (err) {
      console.error("Upload error:", err);
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
    <div className="space-y-3 text-left">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative w-full h-[120px] bg-muted/10 border-3 border-foreground rounded-md overflow-hidden">
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
                className="p-2 border-2 border-foreground bg-red-500 hover:bg-red-600 text-white rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
              >
                <FiX size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upload Section */}
      <div className="flex gap-2 items-center">
        <label className="flex-1 flex items-center justify-center px-4 py-2 border-3 border-dashed border-foreground rounded-md cursor-pointer bg-background hover:bg-muted/30 text-foreground transition font-bold shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
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
            className="px-4 py-2 bg-primary text-primary-foreground hover:bg-accent hover:text-white font-bold border-3 border-foreground rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
          >
            {uploadingImage ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}

      {/* Current URL Display */}
      {currentImageUrl && !imageFile && (
        <p className="text-xs text-foreground/50 break-all font-mono">
          Current: {currentImageUrl.slice(0, 50)}...
        </p>
      )}
    </div>
  );
}
