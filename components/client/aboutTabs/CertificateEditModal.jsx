"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CertificateImageUpload } from "@/components/client/aboutTabs/CertificateImageUpload";
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
  const [formData, setFormData] = useState({
    name: { en: "", id: "" },
    publisher: "",
    image: "",
    date: { en: "", id: "" },
  });

  // ✅ Sync formData saat certificate berubah atau modal dibuka
  useEffect(() => {
    if (certificate && isOpen) {
      const safeObject = (val) => typeof val === 'string' ? { en: val, id: val } : (val || { en: "", id: "" });
      setFormData({
        ...certificate,
        name: safeObject(certificate.name),
        date: safeObject(certificate.date),
      });
    } else {
      setFormData({
        name: { en: "", id: "" },
        publisher: "",
        image: "",
        date: { en: "", id: "" },
      });
    }
  }, [certificate, isOpen]); // Tambah isOpen sebagai dependency

  const handleInputChange = (field, value, locale = null) => {
    if (locale) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [locale]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
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

  // ✅ Reset form saat modal ditutup
  const handleClose = () => {
    setFormData({
      name: { en: "", id: "" },
      publisher: "",
      image: "",
      date: { en: "", id: "" },
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-black">
            {certificate?._index !== undefined
              ? "Edit Certificate"
              : "Add Certificate"}
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            {certificate?._index !== undefined
              ? "Update certificate details and save changes"
              : "Add new certificate to your portfolio"}
          </SheetDescription>
        </SheetHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6 pb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Certificate Name <span className="text-gray-400 font-normal">(EN)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Frontend Development"
                value={formData.name?.en || ""}
                onChange={(e) => handleInputChange("name", e.target.value, "en")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Certificate Name <span className="text-gray-400 font-normal">(ID)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Pengembangan Frontend"
                value={formData.name?.id || ""}
                onChange={(e) => handleInputChange("name", e.target.value, "id")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">
              Publisher/Issuer
            </label>
            <input
              type="text"
              placeholder="e.g., Alterra Academy"
              value={formData.publisher || ""}
              onChange={(e) => handleInputChange("publisher", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">
              Certificate Image
            </label>
            <div className="p-1 border border-gray-100 rounded-lg bg-gray-50/50">
              <CertificateImageUpload
                currentImageUrl={formData.image}
                onImageUrlChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Valid Until / Date <span className="text-gray-400 font-normal">(EN)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Dec 2025"
                value={formData.date?.en || ""}
                onChange={(e) => handleInputChange("date", e.target.value, "en")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Valid Until / Date <span className="text-gray-400 font-normal">(ID)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Des 2025"
                value={formData.date?.id || ""}
                onChange={(e) => handleInputChange("date", e.target.value, "id")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent transition"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-gray-100">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !formData.name?.en || !formData.publisher}
              className="px-6 py-2.5 bg-[#d77864] text-white font-semibold rounded-lg hover:bg-[#c36551] shadow-sm hover:shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : certificate?._index !== undefined ? "Update Certificate" : "Save Certificate"}
            </button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
