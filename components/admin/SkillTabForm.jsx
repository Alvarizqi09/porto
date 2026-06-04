"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  const handleSave = () => {
    // Sanitize data before sending to API to prevent validation errors with old string data
    const sanitizedData = {
      ...skillData,
      title: typeof skillData.title === 'string' 
        ? { en: skillData.title, id: skillData.title } 
        : skillData.title,
      description: typeof skillData.description === 'string' 
        ? { en: skillData.description, id: skillData.description } 
        : skillData.description,
    };
    onSave(sanitizedData);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card p-4 md:p-8 rounded-md border-4 border-foreground shadow-neobrutal text-left"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Section Title (EN)
                </label>
                <Input
                  type="text"
                  value={skillData.title?.en || (typeof skillData.title === 'string' ? skillData.title : "")}
                  onChange={(e) =>
                    setSkillData({ ...skillData, title: { ...skillData.title, en: e.target.value } })
                  }
                  placeholder="e.g., My Skills"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-foreground">
                  Section Title (ID)
                </label>
                <Input
                  type="text"
                  value={skillData.title?.id || ""}
                  onChange={(e) =>
                    setSkillData({ ...skillData, title: { ...skillData.title, id: e.target.value } })
                  }
                  placeholder="e.g., Kemampuan Saya"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Total Skills
              </label>
              <div className="flex h-[48px] items-center w-full px-4 border-3 border-foreground rounded-md bg-muted/20 text-foreground font-bold">
                {skillData.skillList?.length || 0} skills
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Section Description (EN)
              </label>
              <Textarea
                value={skillData.description?.en || (typeof skillData.description === 'string' ? skillData.description : "")}
                onChange={(e) =>
                  setSkillData({ ...skillData, description: { ...skillData.description, en: e.target.value } })
                }
                rows={3}
                placeholder="Brief description about your skills..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Section Description (ID)
              </label>
              <Textarea
                value={skillData.description?.id || ""}
                onChange={(e) =>
                  setSkillData({ ...skillData, description: { ...skillData.description, id: e.target.value } })
                }
                rows={3}
                placeholder="Deskripsi singkat..."
              />
            </div>
          </div>

          {/* Skills List */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">Skills List</h3>
                <p className="text-sm text-foreground/75 mt-0.5">
                  {skillData.skillList?.length || 0} skills added
                </p>
              </div>
              <button
                onClick={handleAddSkill}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-bold border-3 border-foreground rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
              >
                <FiPlus className="text-lg" /> Add Skill
              </button>
            </div>

            {skillData.skillList?.length === 0 ? (
              <div className="text-center py-12 border-3 border-dashed border-foreground rounded-md bg-muted/10">
                <div className="text-foreground/50 mb-2">
                  <FiPlus className="inline text-4xl" />
                </div>
                <p className="text-foreground font-bold">No skills added yet</p>
                <p className="text-sm text-foreground/75 mt-1">
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
                    className="group relative border-3 border-foreground rounded-md p-4 bg-muted/10 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2.5px_2.5px_0px_0px_var(--border)] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground border-2 border-foreground font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-foreground">
                            {skill.name || "Unnamed Skill"}
                          </div>
                          <div className="text-sm text-foreground/80 mt-0.5">
                            Category: {skill.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <button
                            onClick={() => handleMoveSkill(index, "up")}
                            className="px-2 py-1 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                            title="Move Up"
                          >
                            ↑
                          </button>
                        )}
                        {index < skillData.skillList.length - 1 && (
                          <button
                            onClick={() => handleMoveSkill(index, "down")}
                            className="px-2 py-1 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                            title="Move Down"
                          >
                            ↓
                          </button>
                        )}
                        <button
                          onClick={() => handleEditSkill(index)}
                          className="px-3 py-1.5 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center gap-1"
                        >
                          <FiEdit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(index)}
                          className="p-1.5 border-2 border-foreground bg-red-500 hover:bg-red-600 text-white rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t-3 border-foreground">
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-primary-foreground hover:bg-accent hover:text-white font-bold rounded-md border-3 border-foreground shadow-neobrutal hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-neobrutal-hover active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150 disabled:bg-muted disabled:text-foreground/45 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
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
