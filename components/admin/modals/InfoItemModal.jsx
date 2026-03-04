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
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-auto overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-50 border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-extrabold text-gray-800">
            {infoItem?._index !== undefined ? "Edit Info" : "Add New Info"}
          </h3>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Field Name <span className="text-gray-400 font-normal">(EN)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., Email"
                value={formData.fieldName?.en || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fieldName: { ...formData.fieldName, en: e.target.value } })
                }
                className="w-full bg-gray-50/50 focus:bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Field Name <span className="text-gray-400 font-normal">(ID)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g., Surel"
                value={formData.fieldName?.id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fieldName: { ...formData.fieldName, id: e.target.value } })
                }
                className="w-full bg-gray-50/50 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              Field Value
            </label>
            <Input
              type="text"
              placeholder="e.g., John Doe, john@email.com"
              value={formData.fieldValue}
              onChange={(e) =>
                setFormData({ ...formData, fieldValue: e.target.value })
              }
              className="bg-gray-50/50 focus:bg-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50/80 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!formData.fieldName?.en?.trim() || !formData.fieldName?.id?.trim() || !formData.fieldValue.trim()}
            className="px-6 py-2.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-sm"
          >
            {infoItem?._index !== undefined ? "Update Info" : "Add Info"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
