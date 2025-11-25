"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project/ProjectCard";
import ProjectTag from "@/components/project/ProjectTag";
import { getIcon } from "../../../utils/techIconMap";

// Centralized tech icons, give each a consistent size
const ICON_SIZE_CLASS = "w-6 h-6";

export default function ProjectsClient({ projects: initialProjects }) {
  const [tag, setTag] = useState("All");

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  // Transform projects dengan icons
  const projectsWithIcons = initialProjects.map((project) => ({
    ...project,
    id: project._id,
    icon:
      project.tech_stack
        ?.map((tech) => getIcon(tech, ICON_SIZE_CLASS))
        .filter(Boolean) || [],
  }));

  const filteredProjects = projectsWithIcons.filter((project) =>
    project.tag.includes(tag)
  );

  return (
    <div className="mb-10">
      <div className="container">
        <motion.h2
          className="text-center text-4xl font-bold text-black my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          My Project
        </motion.h2>
        <div className="text-black flex flex-row justify-center items-center gap-2 py-6">
          {["All", "Web", "Design"].map((tagName, index) => (
            <motion.div
              key={tagName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + index * 0.1,
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-16 mx-auto"
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No projects found. Please add some projects to the database.
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
