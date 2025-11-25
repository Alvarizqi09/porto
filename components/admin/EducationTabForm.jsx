"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import EducationItemModal from "./modals/EducationItemModal";

export default function EducationTabForm({
  educationData: initialData,
  onSave,
  isSubmitting,
}) {
  const [educationData, setEducationData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const handleAddEducation = () => {
    setEditingEducation(null);
    setShowModal(true);
  };

  const handleEditEducation = (index) => {
    setEditingEducation({
      ...educationData.items[index],
      _index: index,
    });
    setShowModal(true);
  };

  const handleSubmitModal = (formData) => {
    const newItems = [...educationData.items];

    if (formData._index !== undefined) {
      // Edit existing
      const { _index, ...itemData } = formData;
      newItems[_index] = itemData;
    } else {
      // Add new
      newItems.unshift(formData);
    }

    setEducationData({ ...educationData, items: newItems });
    setShowModal(false);
    setEditingEducation(null);
  };

  const handleDeleteEducation = (index) => {
    const newItems = educationData.items.filter((_, i) => i !== index);
    setEducationData({ ...educationData, items: newItems });
  };

  const handleMoveEducation = (index, direction) => {
    const newItems = [...educationData.items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[index],
    ];
    setEducationData({ ...educationData, items: newItems });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Section Title
            </label>
            <Input
              type="text"
              value={educationData.title}
              onChange={(e) =>
                setEducationData({ ...educationData, title: e.target.value })
              }
              placeholder="e.g., My Education"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Section Description
            </label>
            <Textarea
              value={educationData.description}
              onChange={(e) =>
                setEducationData({
                  ...educationData,
                  description: e.target.value,
                })
              }
              rows={5}
              placeholder="Brief description about your education..."
            />
          </div>

          {/* Education Items List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Education Items
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {educationData.items?.length || 0} items
                </p>
              </div>
              <button
                onClick={handleAddEducation}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition shadow-md hover:shadow-lg font-medium"
              >
                <FiPlus /> Add Education
              </button>
            </div>

            {educationData.items?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-gray-400 mb-2">
                  <FiPlus className="inline text-4xl" />
                </div>
                <p className="text-gray-600 font-medium">
                  No education items yet
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Add Education" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {educationData.items?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {item.degree || "Unnamed Degree"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.school || "No school"} • {item.date || "No date"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveEducation(index, "up")}
                          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="Move Up"
                        >
                          ↑
                        </button>
                      )}
                      {index < educationData.items.length - 1 && (
                        <button
                          onClick={() => handleMoveEducation(index, "down")}
                          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="Move Down"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        onClick={() => handleEditEducation(index)}
                        className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition flex items-center gap-1"
                      >
                        <FiEdit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEducation(index)}
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
              onClick={() => onSave(educationData)}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Education"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for Add/Edit */}
      <EducationItemModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingEducation(null);
        }}
        educationItem={editingEducation}
        onSubmit={handleSubmitModal}
      />
    </>
  );
}
