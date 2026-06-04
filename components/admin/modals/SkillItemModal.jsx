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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card rounded-md border-4 border-foreground shadow-neobrutal max-w-lg w-full overflow-hidden text-left"
      >
        <div className="flex justify-between items-center p-6 bg-muted/20 border-b-3 border-foreground">
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            {skillItem?._index !== undefined ? "Edit Skill" : "Add New Skill"}
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 border-2 border-foreground bg-primary hover:bg-accent hover:text-white text-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center justify-center"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
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
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="flex h-[48px] w-full rounded-md border-3 border-foreground bg-background text-foreground px-4 py-2 text-base outline-none focus:bg-background focus:shadow-neobrutal transition"
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
              disabled={!formData.name.trim()}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {skillItem?._index !== undefined ? "Update Skill" : "Add Skill"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
