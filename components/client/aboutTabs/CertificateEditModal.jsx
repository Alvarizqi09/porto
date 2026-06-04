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
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-card border-l-4 border-foreground text-left">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-foreground">
            {certificate?._index !== undefined
              ? "Edit Certificate"
              : "Add Certificate"}
          </SheetTitle>
          <SheetDescription className="text-foreground/75">
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
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Certificate Name <span className="text-foreground/50 font-normal">(EN)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Frontend Development"
                value={formData.name?.en || ""}
                onChange={(e) => handleInputChange("name", e.target.value, "en")}
                className="w-full px-4 py-2.5 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Certificate Name <span className="text-foreground/50 font-normal">(ID)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Pengembangan Frontend"
                value={formData.name?.id || ""}
                onChange={(e) => handleInputChange("name", e.target.value, "id")}
                className="w-full px-4 py-2.5 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-foreground">
              Publisher/Issuer
            </label>
            <input
              type="text"
              placeholder="e.g., Alterra Academy"
              value={formData.publisher || ""}
              onChange={(e) => handleInputChange("publisher", e.target.value)}
              className="w-full px-4 py-2.5 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-foreground">
              Certificate Image
            </label>
            <div className="p-1.5 border-3 border-foreground rounded-md bg-muted/20">
              <CertificateImageUpload
                currentImageUrl={formData.image}
                onImageUrlChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Valid Until / Date <span className="text-foreground/50 font-normal">(EN)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Dec 2025"
                value={formData.date?.en || ""}
                onChange={(e) => handleInputChange("date", e.target.value, "en")}
                className="w-full px-4 py-2.5 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Valid Until / Date <span className="text-foreground/50 font-normal">(ID)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Des 2025"
                value={formData.date?.id || ""}
                onChange={(e) => handleInputChange("date", e.target.value, "id")}
                className="w-full px-4 py-2.5 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t-3 border-foreground">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="px-5 py-2.5 font-bold text-foreground hover:bg-muted/30 rounded border-2 border-foreground transition shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !formData.name?.en || !formData.publisher}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : certificate?._index !== undefined ? "Update Certificate" : "Save Certificate"}
            </button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
