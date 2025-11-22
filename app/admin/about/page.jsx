"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import { aboutApi } from "@/lib/aboutApi";
import CertificateEditModal from "@/components/CertificateEditModal";

export default function AdminAbout() {
  const router = useRouter();
  const { status } = useSession();
  const [currentTab, setCurrentTab] = useState("about");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [aboutData, setAboutData] = useState({
    title: "About Me",
    description: "",
    info: [],
  });

  const [resumeData, setResumeData] = useState({
    title: "Experience",
    description: "",
    items: [],
  });

  const [educationData, setEducationData] = useState({
    title: "My Education",
    description: "",
    items: [],
  });

  const [skillData, setSkillData] = useState({
    title: "My Skills",
    description: "",
    skillList: [],
  });

  const [certificateData, setCertificateData] = useState({
    title: "My Certificates",
    description: "",
    items: [],
  });

  // Certificate modal state
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await aboutApi.fetchAboutData();
        if (!data || !data.about) {
          throw new Error("Failed to fetch about data");
        }
        setAboutData(data.about);
        setResumeData(data.resume);
        setEducationData(data.education);
        setSkillData(data.skill);
        setCertificateData(data.certificate);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage({ type: "error", text: error.message });
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();

      // Refetch data every 10 seconds to sync with changes
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, [status]);
  const handleSaveAbout = async () => {
    setIsSubmitting(true);
    try {
      await aboutApi.saveAbout(aboutData);
      setMessage({ type: "success", text: "About data updated!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveResume = async () => {
    setIsSubmitting(true);
    try {
      await aboutApi.saveResume(resumeData);
      setMessage({ type: "success", text: "Experience data updated!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveEducation = async () => {
    setIsSubmitting(true);
    try {
      await aboutApi.saveEducation(educationData);
      setMessage({ type: "success", text: "Education data updated!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveSkill = async () => {
    setIsSubmitting(true);
    try {
      await aboutApi.saveSkill(skillData);
      setMessage({ type: "success", text: "Skills data updated!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSaveCertificate = async () => {
    setIsSubmitting(true);
    try {
      const result = await aboutApi.saveCertificate(certificateData);

      setMessage({ type: "success", text: "Certificates data updated!" });
    } catch (error) {
      console.error("Save certificate error:", error);
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEditCertificate = (index) => {
    setEditingCertificate({
      ...certificateData.items[index],
      _index: index,
    });
    setShowCertificateModal(true);
  };

  const handleSaveCertificateModal = async (formData) => {
    setIsSubmitting(true);
    try {
      const index = formData._index;
      const newCerts = [...certificateData.items];
      const { _index, ...certData } = formData;
      newCerts[index] = certData;

      const updatedCertificateData = {
        ...certificateData,
        items: newCerts,
      };

      // Directly save to database
      const result = await aboutApi.saveCertificate(updatedCertificateData);

      setCertificateData(updatedCertificateData);
      setShowCertificateModal(false);
      setEditingCertificate(null);
      setMessage({
        type: "success",
        text: "Certificate saved successfully!",
      });
    } catch (error) {
      console.error("Save certificate error:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save certificate",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Edit About Section</h1>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {["about", "resume", "education", "skill", "certificate"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`px-6 py-3 font-semibold transition-colors capitalize ${
                  currentTab === tab
                    ? "text-accent border-b-2 border-accent"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* About Tab */}
        {currentTab === "about" && (
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
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={aboutData.description}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      description: e.target.value,
                    })
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
                        info: [
                          ...aboutData.info,
                          { fieldName: "", fieldValue: "" },
                        ],
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
                onClick={handleSaveAbout}
                disabled={isSubmitting}
                className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
              >
                {isSubmitting ? "Saving..." : "Save About"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Resume Tab */}
        {currentTab === "resume" && (
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
                  value={resumeData.title}
                  onChange={(e) =>
                    setResumeData({ ...resumeData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={resumeData.description}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      description: e.target.value,
                    })
                  }
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Experience Items */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Experience Items</h3>
                  <button
                    onClick={() =>
                      setResumeData({
                        ...resumeData,
                        items: [
                          {
                            company: "",
                            date: "",
                            position: "",
                            order: resumeData.items.length,
                          },
                          ...resumeData.items,
                        ],
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
                  >
                    <FiPlus /> Add Experience
                  </button>
                </div>
                <div className="space-y-3">
                  {resumeData.items?.map((item, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-lg space-y-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-500">
                          Item #{index + 1}
                        </span>
                        <div className="flex gap-2">
                          {index > 0 && (
                            <button
                              onClick={() => {
                                const newItems = [...resumeData.items];
                                [newItems[index], newItems[index - 1]] = [
                                  newItems[index - 1],
                                  newItems[index],
                                ];
                                setResumeData({
                                  ...resumeData,
                                  items: newItems,
                                });
                              }}
                              className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                              title="Move Up"
                            >
                              ↑
                            </button>
                          )}
                          {index < resumeData.items.length - 1 && (
                            <button
                              onClick={() => {
                                const newItems = [...resumeData.items];
                                [newItems[index], newItems[index + 1]] = [
                                  newItems[index + 1],
                                  newItems[index],
                                ];
                                setResumeData({
                                  ...resumeData,
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
                        placeholder="Company"
                        value={item.company}
                        onChange={(e) => {
                          const newItems = [...resumeData.items];
                          newItems[index].company = e.target.value;
                          setResumeData({ ...resumeData, items: newItems });
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="Date (e.g., Feb 2024 - Jun 2024)"
                        value={item.date}
                        onChange={(e) => {
                          const newItems = [...resumeData.items];
                          newItems[index].date = e.target.value;
                          setResumeData({ ...resumeData, items: newItems });
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={item.position}
                        onChange={(e) => {
                          const newItems = [...resumeData.items];
                          newItems[index].position = e.target.value;
                          setResumeData({ ...resumeData, items: newItems });
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        onClick={() => {
                          const newItems = resumeData.items.filter(
                            (_, i) => i !== index
                          );
                          setResumeData({ ...resumeData, items: newItems });
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
                onClick={handleSaveResume}
                disabled={isSubmitting}
                className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
              >
                {isSubmitting ? "Saving..." : "Save Experience"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Education Tab */}
        {currentTab === "education" && (
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
                    setEducationData({
                      ...educationData,
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
                    <div
                      key={index}
                      className="border p-4 rounded-lg space-y-3"
                    >
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
                          setEducationData({
                            ...educationData,
                            items: newItems,
                          });
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
                          setEducationData({
                            ...educationData,
                            items: newItems,
                          });
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
                          setEducationData({
                            ...educationData,
                            items: newItems,
                          });
                        }}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        onClick={() => {
                          const newItems = educationData.items.filter(
                            (_, i) => i !== index
                          );
                          setEducationData({
                            ...educationData,
                            items: newItems,
                          });
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
                onClick={handleSaveEducation}
                disabled={isSubmitting}
                className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
              >
                {isSubmitting ? "Saving..." : "Save Education"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Skill Tab */}
        {currentTab === "skill" && (
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
                    setSkillData({
                      ...skillData,
                      description: e.target.value,
                    })
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
                    <h3 className="text-xl font-bold text-gray-800">
                      Skills List
                    </h3>
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
                    <p className="text-gray-600 font-medium">
                      No skills added yet
                    </p>
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
                                setSkillData({
                                  ...skillData,
                                  skillList: newSkills,
                                });
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
                                setSkillData({
                                  ...skillData,
                                  skillList: newSkills,
                                });
                              }}
                              disabled={
                                index === skillData.skillList.length - 1
                              }
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
                                setSkillData({
                                  ...skillData,
                                  skillList: newSkills,
                                });
                              }}
                              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                            />
                            <select
                              value={skill.category}
                              onChange={(e) => {
                                const newSkills = [...skillData.skillList];
                                newSkills[index].category = e.target.value;
                                setSkillData({
                                  ...skillData,
                                  skillList: newSkills,
                                });
                              }}
                              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition bg-white"
                            >
                              <option value="Frontend">🎨 Frontend</option>
                              <option value="Backend">⚙️ Backend</option>
                              <option value="Design">✨ Design</option>
                              <option value="Other">📦 Other</option>
                            </select>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => {
                              const newSkills = skillData.skillList.filter(
                                (_, i) => i !== index
                              );
                              setSkillData({
                                ...skillData,
                                skillList: newSkills,
                              });
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
                  onClick={handleSaveSkill}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-accent hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "💾 Save Skills"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Certificates Tab */}
        {currentTab === "certificate" && (
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
                      handleEditCertificate(certificateData.items.length);
                      // Prepare for new certificate
                      setEditingCertificate({
                        ...newCert,
                        _index: certificateData.items.length,
                      });
                      setCertificateData({
                        ...certificateData,
                        items: [...certificateData.items, newCert],
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
                          {cert.publisher || "No publisher"}
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
                onClick={handleSaveCertificate}
                disabled={isSubmitting}
                className="w-full py-3 bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white font-semibold rounded-lg"
              >
                {isSubmitting ? "Saving..." : "Save Certificates"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Certificate Edit Modal */}
        <CertificateEditModal
          isOpen={showCertificateModal}
          onClose={() => {
            setShowCertificateModal(false);
            setEditingCertificate(null);
          }}
          certificate={editingCertificate}
          onSubmit={handleSaveCertificateModal}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
