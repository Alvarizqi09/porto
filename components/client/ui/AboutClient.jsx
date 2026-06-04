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
  { value: "resume", icon: FaUser, label: "Resume" },
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
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center my-10 py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col w-full"
        >
          <div className="min-h-[70vh] w-full">
            <ResumeTab about={about} />
            <ExperienceTab resume={resume} />
            <EducationTab education={education} />
            <CertificatesTab certificate={certificate} />
            <SkillsTab skill={skill} />
          </div>
        </Tabs>
      </div>

      {/* Floating Action Button — vertically centered, right edge */}
      <div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center gap-3"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Expanded Menu Items — appear to the left */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2"
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
                    className={`group relative w-12 h-12 rounded-md flex items-center justify-center border-3 border-foreground shadow-[2.5px_2.5px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150 ${
                      isActive
                        ? "bg-accent text-white"
                        : "bg-card text-foreground hover:bg-primary"
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                    {/* Tooltip — appears to the left */}
                    <span className="absolute right-full mr-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold border-2 border-foreground shadow-[2.3px_2.3px_0px_0px_var(--border)] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-md flex items-center justify-center border-3 border-foreground shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
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
