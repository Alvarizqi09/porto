"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";

export default function EducationItemModal({
  isOpen,
  onClose,
  educationItem,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    school: "",
    date: "",
    degree: "",
  });

  useEffect(() => {
    if (educationItem) {
      const safeObject = (val) => typeof val === 'string' ? { en: val, id: val } : (val || { en: "", id: "" });
      setFormData({
        ...educationItem,
        date: safeObject(educationItem.date),
        degree: safeObject(educationItem.degree),
      });
    } else {
      setFormData({ school: "", date: { en: "", id: "" }, degree: { en: "", id: "" } });
    }
  }, [educationItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.school.trim() && formData.degree?.en?.trim()) {
      onSubmit(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({ school: "", date: { en: "", id: "" }, degree: { en: "", id: "" } });
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
            {educationItem?._index !== undefined
              ? "Edit Education"
              : "Add New Education"}
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
                School/University
              </label>
              <Input
                type="text"
                placeholder="e.g., Harvard University"
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
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
                  placeholder="e.g., 2020 - 2024"
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
                  placeholder="e.g., 2020 - 2024"
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
                  Degree <span className="text-foreground/50 font-normal">(EN)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Bachelor of Computer Science"
                  value={formData.degree?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: { ...formData.degree, en: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Degree <span className="text-foreground/50 font-normal">(ID)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Sarjana Ilmu Komputer"
                  value={formData.degree?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: { ...formData.degree, id: e.target.value } })
                  }
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
              disabled={!formData.school.trim() || !formData.degree?.en?.trim()}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {educationItem?._index !== undefined ? "Update Education" : "Add Education"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
