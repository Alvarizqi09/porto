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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {educationItem?._index !== undefined
              ? "Edit Education"
              : "Add New Education"}
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
                School/University
              </label>
              <Input
                type="text"
                placeholder="e.g., Harvard University"
                value={formData.school}
                onChange={(e) =>
                  setFormData({ ...formData, school: e.target.value })
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
                  placeholder="e.g., 2020 - 2024"
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
                  placeholder="e.g., 2020 - 2024"
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
                  Degree <span className="text-gray-400 font-normal">(EN)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Bachelor of Computer Science"
                  value={formData.degree?.en || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: { ...formData.degree, en: e.target.value } })
                  }
                  className="w-full bg-gray-50/50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                  Degree <span className="text-gray-400 font-normal">(ID)</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Sarjana Ilmu Komputer"
                  value={formData.degree?.id || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: { ...formData.degree, id: e.target.value } })
                  }
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
              disabled={!formData.school.trim() || !formData.degree?.en?.trim()}
              className="px-6 py-2.5 bg-[#d77864] text-white rounded-lg hover:bg-[#c36551] transition font-semibold shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {educationItem?._index !== undefined ? "Update Education" : "Add Education"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
