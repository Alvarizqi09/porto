"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { aboutApi } from "@/lib/api/aboutApi";
import AboutTabForm from "@/components/admin/AboutTabForm";
import ResumeTabForm from "@/components/admin/ResumeTabForm";
import EducationTabForm from "@/components/admin/EducationTabForm";
import SkillTabForm from "@/components/admin/SkillTabForm";
import CertificateTabForm from "@/components/admin/CertificateTabForm";

export default function AdminAbout() {
  const router = useRouter();
  const { status } = useSession();
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState("about");
  const [message, setMessage] = useState("");

  // ✅ Fetch data dengan TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["about-data"],
    queryFn: aboutApi.fetchAboutData,
    enabled: status === "authenticated",
    refetchInterval: 30000,
    staleTime: 10000,
  });

  // ✅ Mutations untuk save
  const saveAboutMutation = useMutation({
    mutationFn: aboutApi.saveAbout,
    onSuccess: () => {
      setMessage({ type: "success", text: "About data updated!" });
      queryClient.invalidateQueries(["about-data"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const saveResumeMutation = useMutation({
    mutationFn: aboutApi.saveResume,
    onSuccess: () => {
      setMessage({ type: "success", text: "Experience data updated!" });
      queryClient.invalidateQueries(["about-data"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const saveEducationMutation = useMutation({
    mutationFn: aboutApi.saveEducation,
    onSuccess: () => {
      setMessage({ type: "success", text: "Education data updated!" });
      queryClient.invalidateQueries(["about-data"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const saveSkillMutation = useMutation({
    mutationFn: aboutApi.saveSkill,
    onSuccess: () => {
      setMessage({ type: "success", text: "Skills data updated!" });
      queryClient.invalidateQueries(["about-data"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const saveCertificateMutation = useMutation({
    mutationFn: aboutApi.saveCertificate,
    onSuccess: () => {
      setMessage({ type: "success", text: "Certificates data updated!" });
      queryClient.invalidateQueries(["about-data"]);
      setTimeout(() => setMessage(""), 3000);
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
      setTimeout(() => setMessage(""), 3000);
    },
  });

  // Redirect jika belum login
  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="text-xl font-bold">Error loading data</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  // Destructure data dengan default values
  const {
    about: aboutData = { title: "About Me", description: "", info: [] },
    resume: resumeData = { title: "Experience", description: "", items: [] },
    education: educationData = {
      title: "My Education",
      description: "",
      items: [],
    },
    skill: skillData = { title: "My Skills", description: "", skillList: [] },
    certificate: certificateData = {
      title: "My Certificates",
      description: "",
      items: [],
    },
  } = data || {};

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Edit About Section</h1>

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

        {/* Tab Content */}
        {currentTab === "about" && (
          <AboutTabForm
            aboutData={aboutData}
            onSave={(data) => saveAboutMutation.mutate(data)}
            isSubmitting={saveAboutMutation.isPending}
          />
        )}

        {currentTab === "resume" && (
          <ResumeTabForm
            resumeData={resumeData}
            onSave={(data) => saveResumeMutation.mutate(data)}
            isSubmitting={saveResumeMutation.isPending}
          />
        )}

        {currentTab === "education" && (
          <EducationTabForm
            educationData={educationData}
            onSave={(data) => saveEducationMutation.mutate(data)}
            isSubmitting={saveEducationMutation.isPending}
          />
        )}

        {currentTab === "skill" && (
          <SkillTabForm
            skillData={skillData}
            onSave={(data) => saveSkillMutation.mutate(data)}
            isSubmitting={saveSkillMutation.isPending}
          />
        )}

        {currentTab === "certificate" && (
          <CertificateTabForm
            certificateData={certificateData}
            onSave={(data) => saveCertificateMutation.mutate(data)}
            isSubmitting={saveCertificateMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
