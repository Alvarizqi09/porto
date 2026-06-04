"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";

export default function InfoItemModal({ isOpen, onClose, infoItem, onSubmit }) {
  const [formData, setFormData] = useState({
    fieldName: "",
    fieldValue: "",
  });

  // Update form when infoItem changes
  useEffect(() => {
    if (infoItem) {
      // Handle legacy string fieldName
      const fieldName = typeof infoItem.fieldName === 'string'
        ? { en: infoItem.fieldName, id: infoItem.fieldName }
        : infoItem.fieldName || { en: "", id: "" };
      setFormData({ ...infoItem, fieldName });
    } else {
      setFormData({ fieldName: { en: "", id: "" }, fieldValue: "" });
    }
  }, [infoItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.fieldName?.en?.trim() && formData.fieldName?.id?.trim() && formData.fieldValue.trim()) {
      onSubmit(formData);
      setFormData({ fieldName: { en: "", id: "" }, fieldValue: "" });
    }
  };

  const handleClose = () => {
    setFormData({ fieldName: { en: "", id: "" }, fieldValue: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-card rounded-md border-4 border-foreground shadow-neobrutal max-w-xl w-full mx-auto overflow-hidden text-left"
      >
        {/* Header */}
        <div className="bg-muted/20 border-b-3 border-foreground px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-foreground">
            {infoItem?._index !== undefined ? "Edit Info" : "Add New Info"}
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 border-2 border-foreground bg-primary hover:bg-accent hover:text-white text-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center justify-center"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Field Name <span className="text-foreground/50 font-normal">(EN)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., Email"
                value={formData.fieldName?.en || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fieldName: { ...formData.fieldName, en: e.target.value } })
                }
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-foreground">
                Field Name <span className="text-foreground/50 font-normal">(ID)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., Surel"
                value={formData.fieldName?.id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fieldName: { ...formData.fieldName, id: e.target.value } })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">
              Field Value
            </label>
            <Input
              type="text"
              placeholder="e.g., John Doe, john@email.com"
              value={formData.fieldValue}
              onChange={(e) =>
                setFormData({ ...formData, fieldValue: e.target.value })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/20 border-t-3 border-foreground flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 font-bold text-foreground hover:bg-muted/30 rounded border-2 border-foreground transition shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!formData.fieldName?.en?.trim() || !formData.fieldName?.id?.trim() || !formData.fieldValue.trim()}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {infoItem?._index !== undefined ? "Update Info" : "Add Info"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
