"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Input } from "@/components/ui/input";

export default function CVLinkModal({ isOpen, onClose, cvLinkData, onSubmit }) {
  const [formData, setFormData] = useState({
    cvLink: "",
    cvLinkEnglish: "",
  });

  // Update form when data changes
  useEffect(() => {
    if (cvLinkData) {
      setFormData(cvLinkData);
    } else {
      setFormData({ cvLink: "", cvLinkEnglish: "" });
    }
  }, [cvLinkData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Edit CV Links</h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-gray-800"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                CV Link URL (Indonesian)
              </label>
              <Input
                type="text"
                placeholder="https://drive.google.com/... (Optional)"
                value={formData.cvLink || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cvLink: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                CV Link URL (English)
              </label>
              <Input
                type="text"
                placeholder="https://drive.google.com/... (Optional)"
                value={formData.cvLinkEnglish || ""}
                onChange={(e) =>
                  setFormData({ ...formData, cvLinkEnglish: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-center pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition font-medium"
              >
                Save Links
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
