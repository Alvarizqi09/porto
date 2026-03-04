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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {resumeItem?._index !== undefined
              ? "Edit Experience"
              : "Add New Experience"}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Company
              </label>
              <Input
                type="text"
                placeholder="e.g., Google, Microsoft"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Date <span className="text-gray-400 font-normal">(EN)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Jan 2023 - Present"
                  value={formData.date?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: { ...formData.date, en: e.target.value } })
                  }
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Date <span className="text-gray-400 font-normal">(ID)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Jan 2023 - Sekarang"
                  value={formData.date?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: { ...formData.date, id: e.target.value } })
                  }
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Position <span className="text-gray-400 font-normal">(EN)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={formData.position?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: { ...formData.position, en: e.target.value } })
                  }
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Position <span className="text-gray-400 font-normal">(ID)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Engineer Perangkat Lunak"
                  value={formData.position?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, position: { ...formData.position, id: e.target.value } })
                  }
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Description <span className="text-gray-400 font-normal">(EN)</span>
                </label>
                <Textarea
                  placeholder="Brief description about your role..."
                  value={formData.description?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })
                  }
                  rows={4}
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Description <span className="text-gray-400 font-normal">(ID)</span>
                </label>
                <Textarea
                  placeholder="Deskripsi singkat tentang peran Anda..."
                  value={formData.description?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: { ...formData.description, id: e.target.value } })
                  }
                  rows={4}
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-gray-100">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 font-medium text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.company.trim() || !formData.position?.en?.trim()}
              className="px-6 py-2.5 bg-[#d77864] text-white rounded-lg hover:bg-[#c36551] transition font-semibold shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resumeItem?._index !== undefined ? "Update Experience" : "Add Experience"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
