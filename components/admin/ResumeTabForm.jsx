"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ResumeItemModal from "./modals/ResumeItemModal";

export default function ResumeTabForm({
  resumeData: initialData,
  onSave,
  isSubmitting,
}) {
  const [resumeData, setResumeData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editingResume, setEditingResume] = useState(null);

  const handleAddResume = () => {
    setEditingResume(null);
    setShowModal(true);
  };

  const handleEditResume = (index) => {
    setEditingResume({
      ...resumeData.items[index],
      _index: index,
    });
    setShowModal(true);
  };

  const handleSubmitModal = (formData) => {
    const newItems = [...resumeData.items];

    if (formData._index !== undefined) {
      // Edit existing
      const { _index, ...itemData } = formData;
      newItems[_index] = itemData;
    } else {
      // Add new
      newItems.unshift(formData);
    }

    setResumeData({ ...resumeData, items: newItems });
    setShowModal(false);
    setEditingResume(null);
  };

  const handleDeleteResume = (index) => {
    const newItems = resumeData.items.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, items: newItems });
  };

  const handleMoveResume = (index, direction) => {
    const newItems = [...resumeData.items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[index],
    ];
    setResumeData({ ...resumeData, items: newItems });
  };

  const handleSave = () => {
    // Sanitize data before sending to API to prevent validation errors with old string data
    const sanitizedData = {
      ...resumeData,
      title: typeof resumeData.title === 'string' 
        ? { en: resumeData.title, id: resumeData.title } 
        : resumeData.title,
      description: typeof resumeData.description === 'string' 
        ? { en: resumeData.description, id: resumeData.description } 
        : resumeData.description,
      items: resumeData.items?.map(item => ({
        ...item,
        position: typeof item.position === 'string' ? { en: item.position, id: item.position } : (item.position || { en: "", id: "" }),
        date: typeof item.date === 'string' ? { en: item.date, id: item.date } : (item.date || { en: "", id: "" }),
        description: typeof item.description === 'string' ? { en: item.description, id: item.description } : (item.description || { en: "", id: "" })
      })) || []
    };
    onSave(sanitizedData);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Section Title (EN)
              </label>
              <Input
                type="text"
                value={resumeData.title?.en || (typeof resumeData.title === 'string' ? resumeData.title : "")}
                onChange={(e) =>
                  setResumeData({ ...resumeData, title: { ...resumeData.title, en: e.target.value } })
                }
                placeholder="e.g., My Experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Section Title (ID)
              </label>
              <Input
                type="text"
                value={resumeData.title?.id || ""}
                onChange={(e) =>
                  setResumeData({ ...resumeData, title: { ...resumeData.title, id: e.target.value } })
                }
                placeholder="e.g., Pengalaman Saya"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Section Description (EN)
              </label>
              <Textarea
                value={resumeData.description?.en || (typeof resumeData.description === 'string' ? resumeData.description : "")}
                onChange={(e) =>
                  setResumeData({ ...resumeData, description: { ...resumeData.description, en: e.target.value } })
                }
                rows={5}
                placeholder="Brief description about your experience..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Section Description (ID)
              </label>
              <Textarea
                value={resumeData.description?.id || ""}
                onChange={(e) =>
                  setResumeData({ ...resumeData, description: { ...resumeData.description, id: e.target.value } })
                }
                rows={5}
                placeholder="Deskripsi singkat..."
              />
            </div>
          </div>

          {/* Experience Items List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Experience Items
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {resumeData.items?.length || 0} items
                </p>
              </div>
              <button
                onClick={handleAddResume}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition shadow-md hover:shadow-lg font-medium"
              >
                <FiPlus /> Add Experience
              </button>
            </div>

            {resumeData.items?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-gray-400 mb-2">
                  <FiPlus className="inline text-4xl" />
                </div>
                <p className="text-gray-600 font-medium">
                  No experience items yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Add Experience" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {resumeData.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {item.position?.id || item.position?.en || (typeof item.position === 'string' ? item.position : "Unnamed Position")}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.company || "No company"} •{" "}
                        {item.date?.id || item.date?.en || (typeof item.date === 'string' ? item.date : "No date")}
                      </div>
                      {(item.description?.id || item.description?.en || (typeof item.description === 'string' ? item.description : "")) && (
                        <div className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {item.description?.id || item.description?.en || (typeof item.description === 'string' ? item.description : "")}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveResume(index, "up")}
                          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="Move Up"
                        >
                          ↑
                        </button>
                      )}
                      {index < resumeData.items.length - 1 && (
                        <button
                          onClick={() => handleMoveResume(index, "down")}
                          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="Move Down"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        onClick={() => handleEditResume(index)}
                        className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition flex items-center gap-1"
                      >
                        <FiEdit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteResume(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Experience"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for Add/Edit */}
      <ResumeItemModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingResume(null);
        }}
        resumeItem={editingResume}
        onSubmit={handleSubmitModal}
      />
    </>
  );
}
