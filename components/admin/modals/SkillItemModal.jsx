"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";

export default function SkillItemModal({
  isOpen,
  onClose,
  skillItem,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Other",
  });

  useEffect(() => {
    if (skillItem) {
      setFormData(skillItem);
    } else {
      setFormData({ name: "", category: "Other" });
    }
  }, [skillItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({ name: "", category: "Other" });
    }
  };

  const handleClose = () => {
    setFormData({ name: "", category: "Other" });
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
            {skillItem?._index !== undefined ? "Edit Skill" : "Add New Skill"}
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
              Skill Name
            </label>
            <Input
              type="text"
              placeholder="e.g., React, Node.js, Figma"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="flex h-[48px] w-full rounded-md border border-white/10 focus:border-accent font-light bg-primary px-4 py-2 text-base outline-none"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-medium"
            >
              {skillItem?._index !== undefined ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
