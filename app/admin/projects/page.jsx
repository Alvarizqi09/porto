"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProjectForm from "@/components/ProjectForm";
import ProjectEditModal from "@/components/ProjectEditModal";
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import Image from "next/image";
import { projectsApi, useProjectsQueryClient } from "@/lib/projectsApi";
import { useRouter } from "next/navigation";

const AdminProjects = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { invalidateProjects } = useProjectsQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [localProjects, setLocalProjects] = useState([]);

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => projectsApi.fetchProjects(),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (projects.length > 0) {
      setLocalProjects(projects);
    }
  }, [projects]);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const handleAddProject = async (formData) => {
    setIsSubmitting(true);
    try {
      const maxOrder =
        localProjects.length > 0
          ? Math.max(...localProjects.map((p) => p.order || 0))
          : -1;

      const newProject = await projectsApi.addProject(formData, maxOrder);
      setLocalProjects([...localProjects, newProject]);

      setMessage({ type: "success", text: "Project berhasil ditambahkan!" });
      setShowForm(false);

      await invalidateProjects();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProject = async (formData) => {
    setIsSubmitting(true);
    try {
      await projectsApi.editProject(editingProject._id, formData);

      setMessage({ type: "success", text: "Project berhasil diupdate!" });
      setEditingProject(null);
      setShowEditModal(false);

      await invalidateProjects();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Yakin ingin menghapus project ini?")) {
      return;
    }

    try {
      await projectsApi.deleteProject(projectId);
      setLocalProjects(localProjects.filter((p) => p._id !== projectId));

      setMessage({ type: "success", text: "Project berhasil dihapus!" });

      await invalidateProjects();
      router.refresh();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  const handleMoveProject = async (project, direction) => {
    const sortedProjects = [...localProjects].sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
    const currentIndex = sortedProjects.findIndex((p) => p._id === project._id);

    if (currentIndex === -1) {
      return;
    }

    let swapIndex;
    if (direction === "up" && currentIndex > 0) {
      swapIndex = currentIndex - 1;
    } else if (
      direction === "down" &&
      currentIndex < sortedProjects.length - 1
    ) {
      swapIndex = currentIndex + 1;
    } else {
      return;
    }

    const swapProject = sortedProjects[swapIndex];

    // Update local state immediately
    const updatedProjects = localProjects.map((p) => {
      if (p._id === project._id) {
        return { ...p, order: swapProject.order };
      }
      if (p._id === swapProject._id) {
        return { ...p, order: project.order };
      }
      return p;
    });
    setLocalProjects(updatedProjects);

    // Send to API in background
    try {
      await projectsApi.moveProject(project, swapProject);
      setMessage({ type: "success", text: "Urutan project berhasil diubah!" });
      await invalidateProjects();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setLocalProjects(localProjects);
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-gray-600">
              Selamat datang, {session?.user?.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Alert */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Form Section - Only for Add New */}
        {showForm && !editingProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">
                Tambah Project Baru
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                className="p-2 hover:bg-gray-200 rounded-lg"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <ProjectForm
              onSubmit={handleAddProject}
              isLoading={isSubmitting}
              initialData={null}
            />
          </motion.div>
        )}

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Daftar Projects</h2>
            {!showForm && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingProject(null);
                }}
                className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-all"
              >
                <FiPlus />
                Tambah Project
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              Error: {error.message}
            </div>
          ) : localProjects.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg">
              Belum ada project. Tambahkan project baru!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {localProjects
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((project, index, sortedArray) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={150}
                          height={150}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-black">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {project.desc}
                            </p>
                          </div>
                          {project.featured && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Tags & Tech Stack */}
                        <div className="mt-3 space-y-2">
                          <div className="flex gap-2 flex-wrap">
                            {project.tag?.map((t) => (
                              <span
                                key={t}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          {project.tech_stack?.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {project.tech_stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Links */}
                        <div className="mt-3 flex gap-4 text-sm">
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Demo
                          </a>
                          <a
                            href={project.preview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Preview
                          </a>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <div className="flex gap-2">
                          {index > 0 && (
                            <button
                              onClick={() => handleMoveProject(project, "up")}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Move Up"
                            >
                              ↑
                            </button>
                          )}
                          {index < sortedArray.length - 1 && (
                            <button
                              onClick={() => handleMoveProject(project, "down")}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Move Down"
                            >
                              ↓
                            </button>
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            // Fetch fresh data from server
                            try {
                              const { data } = await axios.get(
                                `/api/projects/${project._id}`
                              );
                              if (data.success) {
                                setEditingProject(data.data);
                                setShowEditModal(true);
                              }
                            } catch (error) {
                              console.error("Error fetching project:", error);
                              // Fallback to current project if fetch fails
                              setEditingProject(project);
                              setShowEditModal(true);
                            }
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Project Modal */}
      <ProjectEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSubmit={handleEditProject}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default AdminProjects;
