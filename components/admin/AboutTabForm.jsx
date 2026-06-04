"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CVLinkModal from "./modals/CVLinkModal";
import InfoItemModal from "./modals/InfoItemModal";

export default function AboutTabForm({
  aboutData: initialData,
  onSave,
  isSubmitting,
}) {
  const [aboutData, setAboutData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [editingInfo, setEditingInfo] = useState(null);

  const handleCVModalSubmit = (newLinks) => {
    setAboutData({
      ...aboutData,
      cvLink: newLinks.cvLink,
      cvLinkEnglish: newLinks.cvLinkEnglish,
    });
    setShowCVModal(false);
  };

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

  const handleSave = () => {
    // Sanitize data before sending to API to prevent validation errors with old string data
    const sanitizedData = {
      ...aboutData,
      title: typeof aboutData.title === 'string' 
        ? { en: aboutData.title, id: aboutData.title } 
        : aboutData.title,
      description: typeof aboutData.description === 'string' 
        ? { en: aboutData.description, id: aboutData.description } 
        : aboutData.description,
      info: aboutData.info?.map((item) => ({
        ...item,
        fieldName: typeof item.fieldName === 'string' 
          ? { en: item.fieldName, id: item.fieldName } 
          : item.fieldName || { en: "", id: "" },
      })) || []
    };
    onSave(sanitizedData);
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
        className="bg-card p-8 rounded-md border-4 border-foreground shadow-neobrutal text-left"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Section Title (EN)
              </label>
              <Input
                type="text"
                value={aboutData.title?.en || (typeof aboutData.title === 'string' ? aboutData.title : "")}
                onChange={(e) =>
                  setAboutData({ ...aboutData, title: { ...aboutData.title, en: e.target.value } })
                }
                placeholder="e.g., About Me"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Section Title (ID)
              </label>
              <Input
                type="text"
                value={aboutData.title?.id || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, title: { ...aboutData.title, id: e.target.value } })
                }
                placeholder="e.g., Tentang Saya"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Section Description (EN)
              </label>
              <Textarea
                value={aboutData.description?.en || (typeof aboutData.description === 'string' ? aboutData.description : "")}
                onChange={(e) =>
                  setAboutData({ ...aboutData, description: { ...aboutData.description, en: e.target.value } })
                }
                rows={5}
                placeholder="Brief description about yourself..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Section Description (ID)
              </label>
              <Textarea
                value={aboutData.description?.id || ""}
                onChange={(e) =>
                  setAboutData({ ...aboutData, description: { ...aboutData.description, id: e.target.value } })
                }
                rows={5}
                placeholder="Deskripsi singkat tentang diri Anda..."
              />
            </div>
          </div>

          <div className="bg-muted/20 border-3 border-foreground rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                CV Download Links
              </h3>
              <p className="text-sm text-foreground/75 mt-1">
                Manage your Indonesian and English CV Google Drive URLs
              </p>
            </div>
            <button
              onClick={() => setShowCVModal(true)}
              className="px-4 py-2 bg-primary text-primary-foreground font-bold border-3 border-foreground rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150 flex items-center gap-2"
            >
              <FiEdit2 size={16} /> Edit CV Links
            </button>
          </div>

          {/* Info Items List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Personal Info
                </h3>
                <p className="text-sm text-foreground/75 mt-0.5">
                  {aboutData.info?.length || 0} items
                </p>
              </div>
              <button
                onClick={handleAddInfo}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold border-3 border-foreground rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
              >
                <FiPlus /> Add Info
              </button>
            </div>

            {aboutData.info?.length === 0 ? (
              <div className="text-center py-12 border-3 border-dashed border-foreground rounded-md bg-muted/10">
                <div className="text-foreground/50 mb-2">
                  <FiPlus className="inline text-4xl" />
                </div>
                <p className="text-foreground font-bold">No info items yet</p>
                <p className="text-sm text-foreground/75 mt-1">
                  Click "Add Info" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {aboutData.info?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border-3 border-foreground rounded-md bg-muted/10 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2.5px_2.5px_0px_0px_var(--border)] transition-all"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-foreground/70 font-bold uppercase tracking-wider">
                          Field Name
                        </span>
                        <p className="font-bold text-foreground">
                          {item.fieldName?.id || item.fieldName?.en || (typeof item.fieldName === 'string' ? item.fieldName : "Unnamed Field")}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-foreground/70 font-bold uppercase tracking-wider">
                          Field Value
                        </span>
                        <p className="text-foreground font-medium">
                          {item.fieldValue || "No value"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveInfo(index, "up")}
                          className="px-2 py-1 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                          title="Move Up"
                        >
                          ↑
                        </button>
                      )}
                      {index < aboutData.info.length - 1 && (
                        <button
                          onClick={() => handleMoveInfo(index, "down")}
                          className="px-2 py-1 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                          title="Move Down"
                        >
                          ↓
                        </button>
                      )}
                      <button
                        onClick={() => handleEditInfo(index)}
                        className="px-3 py-1.5 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center gap-1"
                      >
                        <FiEdit2 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteInfo(index)}
                        className="p-1.5 border-2 border-foreground bg-red-500 hover:bg-red-600 text-white rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                      >
                        <FiX size={14} />
                      </button>
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

      <CVLinkModal
        isOpen={showCVModal}
        onClose={() => setShowCVModal(false)}
        cvLinkData={{
          cvLink: aboutData.cvLink,
          cvLinkEnglish: aboutData.cvLinkEnglish,
        }}
        onSubmit={handleCVModalSubmit}
      />
    </>
  );
}
