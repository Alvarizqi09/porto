// Projects API utilities
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const projectsApi = {
  // Fetch all projects
  async fetchProjects() {
    try {
      const { data } = await api.get("/api/projects");
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch projects");
      }
      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch projects"
      );
    }
  },

  // Fetch single project by ID
  async fetchProjectById(projectId) {
    try {
      const { data } = await api.get(`/api/projects/${projectId}`);
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch project");
      }
      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch project"
      );
    }
  },

  // Add new project
  async addProject(formData, maxOrder) {
    try {
      const newFormData = {
        ...formData,
        order: formData.order === 0 ? maxOrder + 1 : formData.order,
      };

      const { data } = await api.post("/api/projects", newFormData);
      if (!data.success) {
        throw new Error(data.error || "Gagal menambah project");
      }

      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || error.message || "Gagal menambah project"
      );
    }
  },

  // Edit project
  async editProject(projectId, formData) {
    try {
      const { data } = await api.put(`/api/projects/${projectId}`, formData);
      if (!data.success) {
        throw new Error(data.error || "Gagal update project");
      }

      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || error.message || "Gagal update project"
      );
    }
  },

  // Delete project
  async deleteProject(projectId) {
    try {
      const { data } = await api.delete(`/api/projects/${projectId}`);
      if (!data.success) {
        throw new Error(data.error || "Gagal menghapus project");
      }

      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Gagal menghapus project"
      );
    }
  },

  // Move project (swap order)
  async moveProject(project, swapProject) {
    try {
      const currentOrder = project.order || 0;
      const swapOrder = swapProject.order || 0;

      const updatePromises = [
        api.put(`/api/projects/${project._id}`, {
          ...project,
          order: swapOrder,
        }),
        api.put(`/api/projects/${swapProject._id}`, {
          ...swapProject,
          order: currentOrder,
        }),
      ];

      const responses = await Promise.all(updatePromises);

      // Check for errors
      for (const response of responses) {
        if (!response.data.success) {
          throw new Error(
            response.data.error || "Gagal mengubah urutan project"
          );
        }
      }

      return true;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Gagal mengubah urutan project"
      );
    }
  },
};

// Hook for query invalidation
export const useProjectsQueryClient = () => {
  const queryClient = useQueryClient();

  return {
    invalidateProjects: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  };
};
