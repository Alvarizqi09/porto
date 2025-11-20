"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProjectForm from "@/components/ProjectForm";
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import Image from "next/image";

const fetchProjects = async () => {
  const response = await fetch("/api/projects");
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || "Failed to fetch projects");
  }
  return result.data;
};

const AdminProjects = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: fetchProjects,
    refetchInterval: 5000, // Auto refetch setiap 5 detik
  });

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
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menambah project");
      }

      setMessage({ type: "success", text: "Project berhasil ditambahkan!" });
      setShowForm(false);

      // Invalidate dan refetch data
      await queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });

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
      const response = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal update project");
      }

      setMessage({ type: "success", text: "Project berhasil diupdate!" });
      setEditingProject(null);
      setShowForm(false);

      // Invalidate dan refetch data
      await queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });

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
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus project");
      }

      setMessage({ type: "success", text: "Project berhasil dihapus!" });

      // Invalidate dan refetch data
      await queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Refresh server-side components
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

        {/* Form Section */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">
                {editingProject ? "Edit Project" : "Tambah Project Baru"}
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
              onSubmit={editingProject ? handleEditProject : handleAddProject}
              isLoading={isSubmitting}
              initialData={editingProject}
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
          ) : projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg">
              Belum ada project. Tambahkan project baru!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
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
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
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
    </div>
  );
};

export default AdminProjects;
