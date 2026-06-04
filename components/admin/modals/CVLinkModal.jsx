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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card rounded-md border-4 border-foreground shadow-neobrutal max-w-md w-full p-6 text-left"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-foreground">Edit CV Links</h3>
            <button
              onClick={handleClose}
              className="p-1.5 border-2 border-foreground bg-primary hover:bg-accent hover:text-white text-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center justify-center"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
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
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
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
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all duration-150 text-center"
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
