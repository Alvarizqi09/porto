"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectTag from "@/components/project/ProjectTag";
import { getIcon } from "../../../utils/techIconMap";
import { FolderGit2 } from "lucide-react";

const ICON_SIZE_CLASS = "w-5 h-5";

export default function ProjectsClient({ projects: initialProjects }) {
  const [tag, setTag] = useState("All");

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const projectsWithIcons = initialProjects.map((project) => ({
    ...project,
    id: project._id,
    icon:
      project.tech_stack
        ?.map((tech, index) => {
          const iconEl = getIcon(tech, ICON_SIZE_CLASS);
          return iconEl ? (
            <span
              key={`${project._id}-tech-${index}`}
              className="p-1.5 rounded-full bg-card/80 border border-foreground/10 text-foreground/80 hover:text-primary transition-colors"
              title={tech}
            >
              {iconEl}
            </span>
          ) : null;
        })
        .filter(Boolean) || [],
  }));

  const filteredProjects = projectsWithIcons.filter((project) =>
    project.tag.includes(tag)
  );

  return (
    <div className="mb-20 pt-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center justify-center mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4 text-primary" />
            <span>Atelier of Creations</span>
          </span>
          <h2 className="text-4xl xl:text-5xl font-bold font-display text-foreground">
            Featured Projects
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
        </motion.div>

        {/* Filter Tags */}
        <div className="flex flex-row justify-center items-center gap-2.5 py-4 mb-8 flex-wrap">
          {["All", "Web", "Design"].map((tagName, index) => (
            <motion.div
              key={tagName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + index * 0.08,
              }}
            >
              <ProjectTag
                onClick={handleTagChange}
                name={tagName}
                isSelected={tag === tagName}
              />
            </motion.div>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10 mx-auto"
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-foreground/60 py-16 font-display glass-card rounded-3xl border border-foreground/10">
              No creations found in this meadow yet.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                desc={project.desc}
                image={project.image}
                demo={project.demo}
                preview={project.preview}
                icon={project.icon}
              />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
