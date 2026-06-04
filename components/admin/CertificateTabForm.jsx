"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import CertificateEditModal from "@/components/client/aboutTabs/CertificateEditModal";

export default function CertificateTabForm({
  certificateData: initialData,
  onSave,
  isSubmitting,
}) {
  const [certificateData, setCertificateData] = useState(initialData);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const handleEditCertificate = (index) => {
    setEditingCertificate({
      ...certificateData.items[index],
      _index: index,
    });
    setShowCertificateModal(true);
  };

  const handleSaveCertificateModal = (formData) => {
    const index = formData._index;
    const newCerts = [...certificateData.items];
    const { _index, ...certData } = formData;

    if (index >= newCerts.length) {
      // New certificate
      newCerts.push(certData);
    } else {
      // Edit existing
      newCerts[index] = certData;
    }

    setCertificateData({
      ...certificateData,
      items: newCerts,
    });
    setShowCertificateModal(false);
    setEditingCertificate(null);
  };

  const handleSave = () => {
    // Sanitize data before sending to API to prevent validation errors with old string data
    const sanitizedData = {
      ...certificateData,
      title: typeof certificateData.title === 'string' 
        ? { en: certificateData.title, id: certificateData.title } 
        : certificateData.title,
      description: typeof certificateData.description === 'string' 
        ? { en: certificateData.description, id: certificateData.description } 
        : certificateData.description,
      items: certificateData.items?.map(item => ({
        ...item,
        name: typeof item.name === 'string' ? { en: item.name, id: item.name } : (item.name || { en: "", id: "" }),
        date: typeof item.date === 'string' ? { en: item.date, id: item.date } : (item.date || { en: "", id: "" })
      })) || []
    };
    onSave(sanitizedData);
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
              <label className="block text-sm font-semibold mb-1.5 text-foreground">Title (EN)</label>
              <input
                type="text"
                value={certificateData.title?.en || (typeof certificateData.title === 'string' ? certificateData.title : "")}
                onChange={(e) =>
                  setCertificateData({
                    ...certificateData,
                    title: { ...certificateData.title, en: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition-all duration-150"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">Title (ID)</label>
              <input
                type="text"
                value={certificateData.title?.id || ""}
                onChange={(e) =>
                  setCertificateData({
                    ...certificateData,
                    title: { ...certificateData.title, id: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition-all duration-150"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Description (EN)
              </label>
              <textarea
                value={certificateData.description?.en || (typeof certificateData.description === 'string' ? certificateData.description : "")}
                onChange={(e) =>
                  setCertificateData({
                    ...certificateData,
                    description: { ...certificateData.description, en: e.target.value },
                  })
                }
                rows="5"
                className="w-full px-4 py-2 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition-all duration-150"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-foreground">
                Description (ID)
              </label>
              <textarea
                value={certificateData.description?.id || ""}
                onChange={(e) =>
                  setCertificateData({
                    ...certificateData,
                    description: { ...certificateData.description, id: e.target.value },
                  })
                }
                rows="5"
                className="w-full px-4 py-2 border-3 border-foreground bg-background text-foreground placeholder:text-foreground/50 rounded-md focus:bg-background focus:outline-none focus:shadow-neobrutal transition-all duration-150"
              />
            </div>
          </div>

          {/* Certificates List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">Certificates</h3>
              <button
                onClick={() => {
                  const newCert = {
                    name: { en: "", id: "" },
                    publisher: "",
                    image: "",
                    date: { en: "", id: "" },
                    order: certificateData.items.length,
                  };
                  setEditingCertificate({
                    ...newCert,
                    _index: certificateData.items.length,
                  });
                  setShowCertificateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold border-3 border-foreground rounded-md shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
              >
                <FiPlus /> Add Certificate
              </button>
            </div>

            <div className="space-y-3">
              {certificateData.items?.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-3 border-foreground rounded-md bg-muted/10 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2.5px_2.5px_0px_0px_var(--border)] transition-all"
                >
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      {cert.name?.id || cert.name?.en || (typeof cert.name === 'string' ? cert.name : "Unnamed Certificate")}
                    </div>
                    <div className="text-sm text-foreground/80 mt-0.5">
                      {cert.publisher || "No publisher"} •{" "}
                      {cert.date?.id || cert.date?.en || (typeof cert.date === 'string' ? cert.date : "No date")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {index > 0 && (
                      <button
                        onClick={() => {
                          const newCerts = [...certificateData.items];
                          [newCerts[index], newCerts[index - 1]] = [
                            newCerts[index - 1],
                            newCerts[index],
                          ];
                          setCertificateData({
                            ...certificateData,
                            items: newCerts,
                          });
                        }}
                        className="px-2 py-1 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                        title="Move Up"
                      >
                        ↑
                      </button>
                    )}
                    {index < certificateData.items.length - 1 && (
                      <button
                        onClick={() => {
                          const newCerts = [...certificateData.items];
                          [newCerts[index], newCerts[index + 1]] = [
                            newCerts[index + 1],
                            newCerts[index],
                          ];
                          setCertificateData({
                            ...certificateData,
                            items: newCerts,
                          });
                        }}
                        className="px-2 py-1 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1px_1px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[1.5px_1.5px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      onClick={() => handleEditCertificate(index)}
                      className="px-3 py-1.5 text-xs bg-primary text-primary-foreground font-bold border-2 border-foreground rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all flex items-center gap-1"
                    >
                      <FiEdit2 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => {
                        const newCerts = certificateData.items.filter(
                          (_, i) => i !== index
                        );
                        setCertificateData({
                          ...certificateData,
                          items: newCerts,
                        });
                      }}
                      className="p-1.5 border-2 border-foreground bg-red-500 hover:bg-red-600 text-white rounded shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-0.5px] hover:translate-y-[-0.5px] hover:shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
                "Save Certificates"
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Certificate Edit Modal */}
      <CertificateEditModal
        isOpen={showCertificateModal}
        onClose={() => {
          setShowCertificateModal(false);
          setEditingCertificate(null);
        }}
        certificate={editingCertificate}
        onSubmit={handleSaveCertificateModal}
        isLoading={false}
      />
    </>
  );
}
