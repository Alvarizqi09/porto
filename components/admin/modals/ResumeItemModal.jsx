"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "../../ui/input";

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
  });

  useEffect(() => {
    if (resumeItem) {
      setFormData(resumeItem);
    } else {
      setFormData({ company: "", date: "", position: "" });
    }
  }, [resumeItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.company.trim() && formData.position.trim()) {
      onSubmit(formData);
      setFormData({ company: "", date: "", position: "" });
    }
  };

  const handleClose = () => {
    setFormData({ company: "", date: "", position: "" });
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
            {resumeItem?._index !== undefined
              ? "Edit Experience"
              : "Add New Experience"}
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

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Date
            </label>
            <Input
              type="text"
              placeholder="e.g., Jan 2023 - Present"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Position
            </label>
            <Input
              type="text"
              placeholder="e.g., Software Engineer"
              value={formData.position}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-medium"
            >
              {resumeItem?._index !== undefined ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
