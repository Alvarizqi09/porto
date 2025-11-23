"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus } from "react-icons/fi";

export default function EducationTabForm({
  educationData: initialData,
  onSave,
  isSubmitting,
}) {
  const [educationData, setEducationData] = useState(initialData);

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
            value={educationData.title}
            onChange={(e) =>
              setEducationData({ ...educationData, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={educationData.description}
            onChange={(e) =>
              setEducationData({
                ...educationData,
                description: e.target.value,
              })
            }
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Education Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education Items</h3>
            <button
              onClick={() =>
                setEducationData({
                  ...educationData,
                  items: [
                    {
                      school: "",
                      date: "",
                      degree: "",
                      order: educationData.items.length,
                    },
                    ...educationData.items,
                  ],
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
            >
              <FiPlus /> Add Education
            </button>
          </div>

          <div className="space-y-3">
            {educationData.items?.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Item #{index + 1}
                  </span>
                  <div className="flex gap-2">
                    {index > 0 && (
                      <button
                        onClick={() => {
                          const newItems = [...educationData.items];
                          [newItems[index], newItems[index - 1]] = [
                            newItems[index - 1],
                            newItems[index],
                          ];
                          setEducationData({
                            ...educationData,
                            items: newItems,
                          });
                        }}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        title="Move Up"
                      >
                        ↑
                      </button>
                    )}
                    {index < educationData.items.length - 1 && (
                      <button
                        onClick={() => {
                          const newItems = [...educationData.items];
                          [newItems[index], newItems[index + 1]] = [
                            newItems[index + 1],
                            newItems[index],
                          ];
                          setEducationData({
                            ...educationData,
                            items: newItems,
                          });
                        }}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="School/University"
                  value={item.school}
                  onChange={(e) => {
                    const newItems = [...educationData.items];
                    newItems[index].school = e.target.value;
                    setEducationData({ ...educationData, items: newItems });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <input
                  type="text"
                  placeholder="Date (e.g., 2021 - Present)"
                  value={item.date}
                  onChange={(e) => {
                    const newItems = [...educationData.items];
                    newItems[index].date = e.target.value;
                    setEducationData({ ...educationData, items: newItems });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <input
                  type="text"
                  placeholder="Degree"
                  value={item.degree}
                  onChange={(e) => {
                    const newItems = [...educationData.items];
                    newItems[index].degree = e.target.value;
                    setEducationData({ ...educationData, items: newItems });
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />

                <button
                  onClick={() => {
                    const newItems = educationData.items.filter(
                      (_, i) => i !== index
                    );
                    setEducationData({ ...educationData, items: newItems });
                  }}
                  className="w-full p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <FiX className="inline mr-2" /> Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onSave(educationData)}
          disabled={isSubmitting}
          className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
        >
          {isSubmitting ? "Saving..." : "Save Education"}
        </button>
      </div>
    </motion.div>
  );
}
