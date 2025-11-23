"use client";

import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tab content components (extracted for readability)
import ResumeTab from "../aboutTabs/ResumeTab";
import ExperienceTab from "../aboutTabs/ExperienceTab";
import EducationTab from "../aboutTabs/EducationTab";
import CertificatesTab from "../aboutTabs/CertificatesTab";
import SkillsTab from "../aboutTabs/SkillsTab";

export default function AboutClient({ aboutData }) {
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
          defaultValue="resume"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            <ResumeTab about={about} />
            <ExperienceTab resume={resume} />
            <EducationTab education={education} />
            <CertificatesTab certificate={certificate} />
            <SkillsTab skill={skill} />
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
