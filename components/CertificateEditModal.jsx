"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CertificateImageUpload } from "@/components/CertificateImageUpload";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function CertificateEditModal({
  isOpen,
  onClose,
  certificate,
  onSubmit,
  isLoading,
}) {
  const [formData, setFormData] = useState(certificate || {});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (url) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  // Update formData when certificate changes
  useEffect(() => {
    if (certificate) {
      setFormData(certificate);
    }
  }, [certificate]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-black">
            Edit Certificate
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Update certificate details and save changes
          </SheetDescription>
        </SheetHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-4"
        >
          {certificate && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Certificate Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Frontend Development"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Publisher/Issuer
                </label>
                <input
                  type="text"
                  placeholder="e.g., Alterra Academy"
                  value={formData.publisher || ""}
                  onChange={(e) =>
                    handleInputChange("publisher", e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Certificate Image
                </label>
                <CertificateImageUpload
                  currentImageUrl={formData.image}
                  onImageUrlChange={handleImageChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Valid Until (Date)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2025-12-31"
                  value={formData.date || ""}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 disabled:bg-gray-400"
                >
                  {isLoading ? "Saving..." : "Save Certificate"}
                </button>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
