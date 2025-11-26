"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SkillItemModal from "./modals/SkillItemModal";

export default function SkillTabForm({
  skillData: initialData,
  onSave,
  isSubmitting,
}) {
  const [skillData, setSkillData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const handleAddSkill = () => {
    setEditingSkill(null);
    setShowModal(true);
  };

  const handleEditSkill = (index) => {
    setEditingSkill({
      ...skillData.skillList[index],
      _index: index,
    });
    setShowModal(true);
  };

  const handleSubmitModal = (formData) => {
    const newSkills = [...skillData.skillList];

    if (formData._index !== undefined) {
      // Edit existing
      const { _index, ...skillItemData } = formData;
      newSkills[_index] = skillItemData;
    } else {
      // Add new
      newSkills.unshift(formData);
    }

    setSkillData({ ...skillData, skillList: newSkills });
    setShowModal(false);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (index) => {
    const newSkills = skillData.skillList.filter((_, i) => i !== index);
    setSkillData({ ...skillData, skillList: newSkills });
  };

  const handleMoveSkill = (index, direction) => {
    const newSkills = [...skillData.skillList];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSkills[index], newSkills[targetIndex]] = [
      newSkills[targetIndex],
      newSkills[index],
    ];
    setSkillData({ ...skillData, skillList: newSkills });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-4 md:p-8 rounded-lg shadow-lg"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Section Title
              </label>
              <Input
                type="text"
                value={skillData.title}
                onChange={(e) =>
                  setSkillData({ ...skillData, title: e.target.value })
                }
                placeholder="e.g., My Skills"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Total Skills
              </label>
              <div className="flex h-[48px] items-center w-full px-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 font-semibold">
                {skillData.skillList?.length || 0} skills
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Section Description
            </label>
            <Textarea
              value={skillData.description}
              onChange={(e) =>
                setSkillData({ ...skillData, description: e.target.value })
              }
              rows={3}
              placeholder="Brief description about your skills..."
            />
          </div>

          {/* Skills List */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Skills List</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {skillData.skillList?.length || 0} skills added
                </p>
              </div>
              <button
                onClick={handleAddSkill}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition shadow-md hover:shadow-lg font-medium"
              >
                <FiPlus className="text-lg" /> Add Skill
              </button>
            </div>

            {skillData.skillList?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <div className="text-gray-400 mb-2">
                  <FiPlus className="inline text-4xl" />
                </div>
                <p className="text-gray-600 font-medium">No skills added yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Click "Add Skill" to get started
                </p>
              </div>
            ) : (
              <div className="grid gap-3">
                {skillData.skillList?.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-r from-white to-gray-50 hover:border-accent hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {skill.name || "Unnamed Skill"}
                          </div>
                          <div className="text-sm text-gray-600">
                            Category: {skill.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <button
                            onClick={() => handleMoveSkill(index, "up")}
                            className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                            title="Move Up"
                          >
                            ↑
                          </button>
                        )}
                        {index < skillData.skillList.length - 1 && (
                          <button
                            onClick={() => handleMoveSkill(index, "down")}
                            className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                            title="Move Down"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          onClick={() => handleEditSkill(index)}
                          className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition flex items-center gap-1"
                        >
                          <FiEdit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(index)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete skill"
                        >
                          <FiX className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={() => onSave(skillData)}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save Skills"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for Add/Edit */}
      <SkillItemModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingSkill(null);
        }}
        skillItem={editingSkill}
        onSubmit={handleSubmitModal}
      />
    </>
  );
}
