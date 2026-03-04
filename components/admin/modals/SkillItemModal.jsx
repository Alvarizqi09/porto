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
        className="bg-white rounded-lg shadow-xl max-w-lg w-full overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 bg-gray-50/50 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {skillItem?._index !== undefined ? "Edit Skill" : "Add New Skill"}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Skill Name
              </label>
              <Input
                type="text"
                placeholder="e.g., React, Node.js, Figma"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-50/50 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="flex h-[48px] w-full rounded-md border border-gray-200 focus:border-[#d77864] bg-gray-50/50 focus:bg-white px-4 py-2 text-base outline-none transition"
              >
                <option value="Programming Language">Programming Language</option>
                <option value="Frontend Framework">Frontend Framework</option>
                <option value="Styling">Styling</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Tools & Management">Tools & Management</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
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
              disabled={!formData.name.trim()}
              className="px-6 py-2.5 bg-[#d77864] text-white rounded-lg hover:bg-[#c36551] transition font-semibold shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {skillItem?._index !== undefined ? "Update Skill" : "Add Skill"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
