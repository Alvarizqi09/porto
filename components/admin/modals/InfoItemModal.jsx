"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "../../ui/input";

export default function InfoItemModal({ isOpen, onClose, infoItem, onSubmit }) {
  const [formData, setFormData] = useState({
    fieldName: "",
    fieldValue: "",
  });

  // Update form when infoItem changes
  useEffect(() => {
    if (infoItem) {
      setFormData(infoItem);
    } else {
      setFormData({ fieldName: "", fieldValue: "" });
    }
  }, [infoItem]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (formData.fieldName.trim() && formData.fieldValue.trim()) {
      onSubmit(formData);
      setFormData({ fieldName: "", fieldValue: "" });
    }
  };

  const handleClose = () => {
    setFormData({ fieldName: "", fieldValue: "" });
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
            {infoItem?._index !== undefined ? "Edit Info" : "Add New Info"}
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
              Field Name
            </label>
            <Input
              type="text"
              placeholder="e.g., Name, Email, Phone"
              value={formData.fieldName}
              onChange={(e) =>
                setFormData({ ...formData, fieldName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
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

          <div className="flex items-center justify-center pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-medium"
            >
              {infoItem?._index !== undefined ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
