"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiLogOut, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { projectsApi } from "@/lib/projectsApi";
import ProjectForm from "@/components/ProjectForm";
import ProjectEditModal from "@/components/ProjectEditModal";
import ProjectAddModal from "@/components/ProjectAddModal";

const AdminProjects = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Fetch projects dengan auto-refetch
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: projectsApi.fetchProjects,
    enabled: status === "authenticated",
    refetchInterval: 5000, // Auto polling
    staleTime: 2000,
  });

  // ✅ Mutation untuk add project
  const addProjectMutation = useMutation({
    mutationFn: ({ formData, maxOrder }) =>
      projectsApi.addProject(formData, maxOrder),
    onSuccess: () => {
      setMessage({ type: "success", text: "Project berhasil ditambahkan!" });
      setShowAddModal(false);
      queryClient.invalidateQueries(["admin-projects"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  // ✅ Mutation untuk edit project
  const editProjectMutation = useMutation({
    mutationFn: ({ id, formData }) => projectsApi.editProject(id, formData),
    onSuccess: () => {
      setMessage({ type: "success", text: "Project berhasil diupdate!" });
      setEditingProject(null);
      setShowEditModal(false);
      queryClient.invalidateQueries(["admin-projects"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  // ✅ Mutation untuk delete project
  const deleteProjectMutation = useMutation({
    mutationFn: projectsApi.deleteProject,
    onSuccess: () => {
      setMessage({ type: "success", text: "Project berhasil dihapus!" });
      queryClient.invalidateQueries(["admin-projects"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  // ✅ Mutation untuk reorder project
  const moveProjectMutation = useMutation({
    mutationFn: ({ project, swapProject }) =>
      projectsApi.moveProject(project, swapProject),
    // Optimistic update
    onMutate: async ({ project, swapProject }) => {
      await queryClient.cancelQueries(["admin-projects"]);

      const previousProjects = queryClient.getQueryData(["admin-projects"]);

      queryClient.setQueryData(["admin-projects"], (old) =>
        old.map((p) => {
          if (p._id === project._id) return { ...p, order: swapProject.order };
          if (p._id === swapProject._id) return { ...p, order: project.order };
          return p;
        })
      );

      return { previousProjects };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["admin-projects"], context.previousProjects);
      setMessage({ type: "error", text: err.message });
    },
    onSuccess: () => {
      setMessage({ type: "success", text: "Urutan project berhasil diubah!" });
      setTimeout(() => setMessage(""), 3000);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["admin-projects"]);
    },
  });

  // Handlers
  const handleAddProject = (formData) => {
    const maxOrder =
      projects.length > 0 ? Math.max(...projects.map((p) => p.order || 0)) : -1;
    addProjectMutation.mutate({ formData, maxOrder });
  };

  const handleEditProject = (formData) => {
    editProjectMutation.mutate({
      id: editingProject._id,
      formData,
    });
  };

  const handleDeleteProject = (projectId) => {
    if (confirm("Yakin ingin menghapus project ini?")) {
      deleteProjectMutation.mutate(projectId);
    }
  };

  const handleMoveProject = (project, direction) => {
    const sortedProjects = [...projects].sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
    const currentIndex = sortedProjects.findIndex((p) => p._id === project._id);

    if (currentIndex === -1) return;

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
    moveProjectMutation.mutate({ project, swapProject });
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  // Guards
  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  // ✅ Langsung pakai data dari query, TIDAK perlu localProjects lagi
  const sortedProjects = [...projects].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

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
            <FiLogOut /> Logout
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
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
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
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-all"
            >
              <FiPlus /> Tambah Project
            </button>
          </div>

          {sortedProjects.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg">
              Belum ada project. Tambahkan project baru!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {sortedProjects.map((project, index) => (
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
                        {index < sortedProjects.length - 1 && (
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
                        onClick={() => {
                          setEditingProject(project);
                          setShowEditModal(true);
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

      {/* Modals */}
      <ProjectEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSubmit={handleEditProject}
        isLoading={editProjectMutation.isPending}
      />

      <ProjectAddModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingProject(null);
        }}
        onSubmit={handleAddProject}
        isLoading={addProjectMutation.isPending}
      />
    </div>
  );
};

export default AdminProjects;
