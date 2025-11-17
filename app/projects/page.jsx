"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectTag from "@/components/ProjectTag";
import { FaLaravel, FaPhp, FaReact } from "react-icons/fa";
import {
  SiBootstrap,
  SiCodeigniter,
  SiExpress,
  SiFigma,
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiNodedotjs,
} from "react-icons/si";

// Mapping tech stack ke icon
const techIconMap = {
  Vite: <SiVite key="Vite" className="w-6 h-6" />,
  React: <FaReact key="React" className="w-6 h-6" />,
  ReactJS: <SiReact key="ReactJS" className="w-6 h-6" />,
  Tailwind: <SiTailwindcss key="Tailwind" className="w-6 h-6" />,
  Typescript: <SiTypescript key="Typescript" className="w-6 h-6" />,
  Laravel: <FaLaravel key="Laravel" className="w-6 h-6" />,
  PHP: <FaPhp key="PHP" className="w-6 h-6" />,
  Next: <SiNextdotjs key="Next" className="w-6 h-6" />,
  Vue: <SiVuedotjs key="Vue" className="w-6 h-6" />,
  CI4: <SiCodeigniter key="CI4" className="w-6 h-6" />,
  Bootstrap: <SiBootstrap key="Bootstrap" className="w-6 h-6" />,
  Figma: <SiFigma key="Figma" className="w-6 h-6" />,
  Supabase: <SiSupabase key="Supabase" className="w-6 h-6" />,
  "Node.js": <SiNodedotjs key="Node.js" className="w-6 h-6" />,
  MongoDB: <SiMongodb key="MongoDB" className="w-6 h-6" />,
  Express: <SiExpress key="Express" className="w-6 h-6" />,
};

const Projects = () => {
  const [tag, setTag] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects dari API dengan caching dan retry logic
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        const result = await response.json();

        if (result.success) {
          // Transform tech_stack array ke icon components
          const projectsWithIcons = result.data.map((project) => ({
            ...project,
            id: project._id,
            icon:
              project.tech_stack
                ?.map((tech) => techIconMap[tech])
                .filter(Boolean) || [],
          }));

          setProjects(projectsWithIcons);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projects.filter((project) =>
    project.tag.includes(tag)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="container">
        <motion.h2
          className="text-center text-4xl font-bold text-black my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 2 }}
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
                duration: 2.4,
                delay: 2 + index * 0.5,
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
          transition={{ duration: 2.4, delay: 2 }}
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
};

export default Projects;
