"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import CertificateEditModal from "@/components/CertificateEditModal";

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

  return (
    <>
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
              value={certificateData.title}
              onChange={(e) =>
                setCertificateData({
                  ...certificateData,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={certificateData.description}
              onChange={(e) =>
                setCertificateData({
                  ...certificateData,
                  description: e.target.value,
                })
              }
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Certificates List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Certificates</h3>
              <button
                onClick={() => {
                  const newCert = {
                    name: "",
                    publisher: "",
                    image: "",
                    date: "",
                    order: certificateData.items.length,
                  };
                  setEditingCertificate({
                    ...newCert,
                    _index: certificateData.items.length,
                  });
                  setShowCertificateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
              >
                <FiPlus /> Add Certificate
              </button>
            </div>

            <div className="space-y-2">
              {certificateData.items?.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {cert.name || "Unnamed Certificate"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {cert.publisher || "No publisher"} •{" "}
                      {cert.date || "No date"}
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
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
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
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      onClick={() => handleEditCertificate(index)}
                      className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 flex items-center gap-1"
                    >
                      <FiEdit2 size={16} /> Edit
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
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSave(certificateData)}
            disabled={isSubmitting}
            className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
          >
            {isSubmitting ? "Saving..." : "Save Certificates"}
          </button>
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
