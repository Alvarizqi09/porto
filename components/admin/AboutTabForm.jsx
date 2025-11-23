"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus } from "react-icons/fi";

export default function AboutTabForm({
  aboutData: initialData,
  onSave,
  isSubmitting,
}) {
  const [aboutData, setAboutData] = useState(initialData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) =>
              setAboutData({ ...aboutData, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={aboutData.description}
            onChange={(e) =>
              setAboutData({ ...aboutData, description: e.target.value })
            }
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Info Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Info Items</h3>
            <button
              onClick={() =>
                setAboutData({
                  ...aboutData,
                  info: [...aboutData.info, { fieldName: "", fieldValue: "" }],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
            >
              <FiPlus /> Add Info
            </button>
          </div>

          <div className="space-y-3">
            {aboutData.info?.map((item, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Field Name"
                  value={item.fieldName}
                  onChange={(e) => {
                    const newInfo = [...aboutData.info];
                    newInfo[index].fieldName = e.target.value;
                    setAboutData({ ...aboutData, info: newInfo });
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <input
                  type="text"
                  placeholder="Field Value"
                  value={item.fieldValue}
                  onChange={(e) => {
                    const newInfo = [...aboutData.info];
                    newInfo[index].fieldValue = e.target.value;
                    setAboutData({ ...aboutData, info: newInfo });
                  }}
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={() => {
                    const newInfo = aboutData.info.filter(
                      (_, i) => i !== index
                    );
                    setAboutData({ ...aboutData, info: newInfo });
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSave(aboutData)}
          disabled={isSubmitting}
          className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
        >
          {isSubmitting ? "Saving..." : "Save About"}
        </button>
      </div>
    </motion.div>
  );
}
