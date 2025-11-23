"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus } from "react-icons/fi";

export default function SkillTabForm({
  skillData: initialData,
  onSave,
  isSubmitting,
}) {
  const [skillData, setSkillData] = useState(initialData);

  return (
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
            <input
              type="text"
              value={skillData.title}
              onChange={(e) =>
                setSkillData({ ...skillData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              placeholder="e.g., My Skills"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Total Skills
            </label>
            <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 font-semibold">
              {skillData.skillList?.length || 0} skills
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Section Description
          </label>
          <textarea
            value={skillData.description}
            onChange={(e) =>
              setSkillData({ ...skillData, description: e.target.value })
            }
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
            placeholder="Brief description about your skills..."
          />
        </div>

        {/* Skills List */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Skills List</h3>
              <p className="text-sm text-gray-500 mt-1">
                Add and organize your skills by category
              </p>
            </div>
            <button
              onClick={() =>
                setSkillData({
                  ...skillData,
                  skillList: [
                    {
                      name: "",
                      category: "Other",
                      order: skillData.skillList.length,
                    },
                    ...skillData.skillList,
                  ],
                })
              }
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
                  <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
                    {/* Order Controls */}
                    <div className="flex lg:flex-col gap-1 order-3 lg:order-1">
                      <button
                        onClick={() => {
                          const newSkills = [...skillData.skillList];
                          [newSkills[index], newSkills[index - 1]] = [
                            newSkills[index - 1],
                            newSkills[index],
                          ];
                          setSkillData({ ...skillData, skillList: newSkills });
                        }}
                        disabled={index === 0}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => {
                          const newSkills = [...skillData.skillList];
                          [newSkills[index], newSkills[index + 1]] = [
                            newSkills[index + 1],
                            newSkills[index],
                          ];
                          setSkillData({ ...skillData, skillList: newSkills });
                        }}
                        disabled={index === skillData.skillList.length - 1}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    </div>

                    {/* Skill Number Badge */}
                    <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-bold order-2">
                      {index + 1}
                    </div>

                    {/* Input Fields */}
                    <div className="flex-1 grid sm:grid-cols-2 gap-3 order-1 lg:order-3">
                      <input
                        type="text"
                        placeholder="Skill name (e.g., React)"
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...skillData.skillList];
                          newSkills[index].name = e.target.value;
                          setSkillData({ ...skillData, skillList: newSkills });
                        }}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                      />
                      <select
                        value={skill.category}
                        onChange={(e) => {
                          const newSkills = [...skillData.skillList];
                          newSkills[index].category = e.target.value;
                          setSkillData({ ...skillData, skillList: newSkills });
                        }}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition bg-white"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Design">Design</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => {
                        const newSkills = skillData.skillList.filter(
                          (_, i) => i !== index
                        );
                        setSkillData({ ...skillData, skillList: newSkills });
                      }}
                      className="lg:order-4 order-2 p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition group-hover:scale-110"
                      title="Delete skill"
                    >
                      <FiX className="text-xl" />
                    </button>
                  </div>

                  {/* Category Badge (mobile) */}
                  <div className="lg:hidden mt-2 inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    #{index + 1} • {skill.category}
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
  );
}
