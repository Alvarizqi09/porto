"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeItemModal({
  isOpen,
  onClose,
  resumeItem,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    company: "",
    date: "",
    position: "",
    description: "",
  });

  useEffect(() => {
    if (resumeItem) {
      // Normalize legacy data
      const safeObject = (val) => typeof val === 'string' ? { en: val, id: val } : (val || { en: "", id: "" });
      setFormData({
        ...resumeItem,
        date: safeObject(resumeItem.date),
        position: safeObject(resumeItem.position),
        description: safeObject(resumeItem.description),
      });
    } else {
      setFormData({
        company: "",
        date: { en: "", id: "" },
        position: { en: "", id: "" },
        description: { en: "", id: "" },
      });
    }
  }, [resumeItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.company.trim() && formData.position?.en?.trim()) {
      onSubmit(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      company: "",
      date: { en: "", id: "" },
      position: { en: "", id: "" },
      description: { en: "", id: "" },
    });
  }

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card rounded-md border-4 border-foreground shadow-neobrutal max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden text-left"
      >
        <div className="flex justify-between items-center p-6 bg-muted/20 border-b-3 border-foreground">
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            {resumeItem?._index !== undefined
              ? "Edit Experience"
              : "Add New Experience"}
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 border-2 border-foreground bg-primary hover:bg-accent hover:text-white text-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center justify-center"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Company
              </label>
              <Input
                type="text"
                placeholder="e.g., Google, Microsoft"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Date <span className="text-foreground/50 font-normal">(EN)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Jan 2023 - Present"
                  value={formData.date?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: { ...formData.date, en: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Date <span className="text-foreground/50 font-normal">(ID)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Jan 2023 - Sekarang"
                  value={formData.date?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: { ...formData.date, id: e.target.value } })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Position <span className="text-foreground/50 font-normal">(EN)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={formData.position?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: { ...formData.position, en: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Position <span className="text-foreground/50 font-normal">(ID)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Engineer Perangkat Lunak"
                  value={formData.position?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: { ...formData.position, id: e.target.value } })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Description <span className="text-foreground/50 font-normal">(EN)</span>
                </label>
                <Textarea
                  placeholder="Brief description about your role..."
                  value={formData.description?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })
                  }
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Description <span className="text-foreground/50 font-normal">(ID)</span>
                </label>
                <Textarea
                  placeholder="Deskripsi singkat tentang peran Anda..."
                  value={formData.description?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: { ...formData.description, id: e.target.value } })
                  }
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t-3 border-foreground">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 font-bold text-foreground hover:bg-muted/30 rounded border-2 border-foreground transition shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.company.trim() || !formData.position?.en?.trim()}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resumeItem?._index !== undefined ? "Update Experience" : "Add Experience"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
