"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";

import InfoItemModal from "./modals/InfoItemModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AboutTabForm({
  aboutData: initialData,
  onSave,
  isSubmitting,
}) {
  const [aboutData, setAboutData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);

  const handleAddInfo = () => {
    setEditingInfo(null);
    setShowModal(true);
  };

  const handleEditInfo = (index) => {
    setEditingInfo({
      ...aboutData.info[index],
      _index: index,
    });
    setShowModal(true);
  };

  const handleSubmitModal = (formData) => {
    const newInfo = [...aboutData.info];

    if (formData._index !== undefined) {
      // Edit existing
      const { _index, ...infoData } = formData;
      newInfo[_index] = infoData;
    } else {
      // Add new
      newInfo.push(formData);
    }

    setAboutData({ ...aboutData, info: newInfo });
    setShowModal(false);
    setEditingInfo(null);
  };

  const handleDeleteInfo = (index) => {
    const newInfo = aboutData.info.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, info: newInfo });
  };

  const handleMoveInfo = (index, direction) => {
    const newInfo = [...aboutData.info];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newInfo[index], newInfo[targetIndex]] = [
      newInfo[targetIndex],
      newInfo[index],
    ];
    setAboutData({ ...aboutData, info: newInfo });
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
              value={aboutData.title}
              onChange={(e) =>
                setAboutData({ ...aboutData, title: e.target.value })
              }
              placeholder="e.g., About Me"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Section Description
            </label>
            <Textarea
              value={aboutData.description}
              onChange={(e) =>
                setAboutData({ ...aboutData, description: e.target.value })
              }
              rows={5}
              placeholder="Brief description about yourself..."
            />
          </div>

          {/* Info Items List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Info
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {aboutData.info?.length || 0} items
                </p>
              </div>
              <button
                onClick={handleAddInfo}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition shadow-md hover:shadow-lg font-medium"
              >
                <FiPlus /> Add Info
              </button>
            </div>

            {aboutData.info?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-gray-400 mb-2">
                  <FiPlus className="inline text-4xl" />
                </div>
                <p className="text-gray-600 font-medium">No info items yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Add Info" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {aboutData.info?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 font-medium">
                          Field Name
                        </span>
                        <p className="font-semibold text-gray-900">
                          {item.fieldName || "Unnamed Field"}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium">
                          Field Value
                        </span>
                        <p className="text-gray-700">
                          {item.fieldValue || "No value"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveInfo(index, "up")}
                          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="Move Up"
                        >
                          ↑
                        </button>
                      )}
                      {index < aboutData.info.length - 1 && (
                        <button
                          onClick={() => handleMoveInfo(index, "down")}
                          className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="Move Down"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        onClick={() => handleEditInfo(index)}
                        className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition flex items-center gap-1"
                      >
                        <FiEdit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteInfo(index)}
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
              onClick={() => onSave(aboutData)}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save About"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for Add/Edit */}
      <InfoItemModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingInfo(null);
        }}
        infoItem={editingInfo}
        onSubmit={handleSubmitModal}
      />
    </>
  );
}
