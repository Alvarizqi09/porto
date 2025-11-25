"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/Input";

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
      setFormData(educationItem);
    } else {
      setFormData({ school: "", date: "", degree: "" });
    }
  }, [educationItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.school.trim() && formData.degree.trim()) {
      onSubmit(formData);
      setFormData({ school: "", date: "", degree: "" });
    }
  };

  const handleClose = () => {
    setFormData({ school: "", date: "", degree: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            {educationItem?._index !== undefined
              ? "Edit Education"
              : "Add New Education"}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
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

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Date
            </label>
            <Input
              type="text"
              placeholder="e.g., 2020 - 2024"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Degree
            </label>
            <Input
              type="text"
              placeholder="e.g., Bachelor of Computer Science"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-medium"
            >
              {educationItem?._index !== undefined ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
