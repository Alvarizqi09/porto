"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Tabs } from "@/components/ui/tabs";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCertificate,
  FaCode,
  FaTh,
  FaTimes,
} from "react-icons/fa";

// Tab content components
import ResumeTab from "../aboutTabs/ResumeTab";
import ExperienceTab from "../aboutTabs/ExperienceTab";
import EducationTab from "../aboutTabs/EducationTab";

// Lazy load heavier tabs
const CertificatesTab = dynamic(() => import("../aboutTabs/CertificatesTab"), {
  ssr: false,
});
const SkillsTab = dynamic(() => import("../aboutTabs/SkillsTab"), {
  ssr: false,
});

const TAB_ITEMS = [
  { value: "resume", icon: FaUser, label: "About Me" },
  { value: "experience", icon: FaBriefcase, label: "Experience" },
  { value: "education", icon: FaGraduationCap, label: "Education" },
  { value: "certificates", icon: FaCertificate, label: "Certificates" },
  { value: "skills", icon: FaCode, label: "Skills" },
];

export default function AboutClient({ aboutData }) {
  const [activeTab, setActiveTab] = useState("resume");
  const [isOpen, setIsOpen] = useState(false);

  const {
    about = { title: "About Me", description: "", info: [] },
    resume = { title: "Experience", description: "", items: [] },
    education = { title: "My Education", description: "", items: [] },
    skill = { title: "My Skills", description: "", skillList: [] },
    certificate = { title: "My Certificates", description: "", items: [] },
  } = aboutData || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, duration: 0.6, ease: "easeOut" },
      }}
      className="min-h-[80vh] flex flex-col items-center justify-start my-6 py-6"
    >
      <div className="container mx-auto">
        {/* Top Desktop Tab Bar */}
        <div className="hidden lg:flex justify-center mb-10">
          <div className="glass-card bg-[#FCFAF4]/95 backdrop-blur-md p-1.5 rounded-full border border-foreground/15 shadow-nature flex gap-2">
            {TAB_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-display text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-nature shadow-glow font-bold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 font-semibold"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col w-full max-w-5xl mx-auto"
        >
          <div className="min-h-[60vh] w-full">
            <ResumeTab about={about} />
            <ExperienceTab resume={resume} />
            <EducationTab education={education} />
            <CertificatesTab certificate={certificate} />
            <SkillsTab skill={skill} />
          </div>
        </Tabs>
      </div>

      {/* Floating Action Button for Mobile or quick-toggle */}
      <div
        className="fixed right-6 bottom-8 lg:bottom-1/2 lg:translate-y-1/2 z-50 flex items-center gap-3"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2.5"
            >
              {TAB_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === item.value;

                return (
                  <motion.button
                    key={item.value}
                    initial={{ opacity: 0, scale: 0, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0, x: 10 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => {
                      setActiveTab(item.value);
                      setIsOpen(false);
                    }}
                    className={`group relative w-12 h-12 rounded-full flex items-center justify-center border shadow-nature hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-glow"
                        : "glass-card bg-card/90 text-foreground border-foreground/15 hover:bg-card hover:border-primary/50"
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="absolute right-full mr-3 px-3 py-1 bg-card text-foreground text-xs font-semibold font-display border border-foreground/15 shadow-nature rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 p-3.5 bg-primary text-white rounded-full flex items-center justify-center border border-primary/30 shadow-nature-lg hover:shadow-glow transition-all duration-300"
          aria-label="Toggle section menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaTh className="w-5 h-5" />
            )}
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}
