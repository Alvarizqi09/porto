// About API utilities
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log(process.env.NEXT_PUBLIC_API_URL);
export const aboutApi = {
  // Fetch all about data (about, resume, education, skill)
  async fetchAboutData() {
    try {
      const { data } = await api.get("/api/about");
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch about data");
      }
      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch about data"
      );
    }
  },

  // Save about section
  async saveAbout(aboutData) {
    try {
      const { data } = await api.post("/api/about", {
        section: "about",
        data: aboutData,
      });

      if (!data.success) {
        throw new Error(data.error || "Failed to save about data");
      }

      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to save about data"
      );
    }
  },

  // Save resume section
  async saveResume(resumeData) {
    try {
      const { data } = await api.post("/api/about", {
        section: "resume",
        data: resumeData,
      });

      if (!data.success) {
        throw new Error(data.error || "Failed to save resume data");
      }

      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to save resume data"
      );
    }
  },

  // Save education section
  async saveEducation(educationData) {
    try {
      const { data } = await api.post("/api/about", {
        section: "education",
        data: educationData,
      });

      if (!data.success) {
        throw new Error(data.error || "Failed to save education data");
      }

      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to save education data"
      );
    }
  },

  // Save skill section
  async saveSkill(skillData) {
    try {
      const { data } = await api.post("/api/about", {
        section: "skill",
        data: skillData,
      });

      if (!data.success) {
        throw new Error(data.error || "Failed to save skill data");
      }

      return data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to save skill data"
      );
    }
  },
};
