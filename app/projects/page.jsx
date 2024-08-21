"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectTag from "@/components/ProjectTag";
import { Button } from "@/components/ui/button";

const Project = [
  {
    id: "1",
    image: "/assets/farmasi.jpg",
    title: "Rosati Farmasi",
    tag: ["All", "Web"],
    desc: "Rosati Pharmacy is a website created for the final project of a software engineering course. This website was created with Laravel and Bootstrap then deployed with Digital Ocean",
    demo: "http://rosatifarmasi.me/#",
    preview: "http://rosatifarmasi.me",
  },
  {
    id: "2",
    image: "/assets/vilume.jpg",
    title: "Vilume",
    tag: ["All", "Design"],
    desc: "VILUME is a website created to fulfill the tasks of the Alterra Academy mini-project. This website was created with ReactJS+Vite and also styled using Tailwind. There is also Firebase integration for login and OpenAi for Customer Services",
    demo: "https://vilume.vercel.app",
    preview: "https://vilume.vercel.app",
  },
  {
    id: "3",
    image: "/assets/Alterra.jpg",
    title: "Alterra Submission",
    tag: ["All", "Web"],
    desc: "Alterra Submission is one of the tasks from Alterra Academy which is required by several criteria. I created this website with ReactJS + Vite with bootstrap styling. It contains CRUD to add products and is also integrated with OpenAi",
    demo: "https://react-ai-nu.vercel.app/#home",
    preview: "https://react-ai-nu.ver",
  },
];

const Projects = () => {
  const [tag, setTag] = useState("All");

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = Project.filter((Project) =>
    Project.tag.includes(tag)
  );
  return (
    <div>
      <div className="container">
        <h2 className="text-center text-4xl font-bold text-white my-8">
          My Project
        </h2>
        <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
          <ProjectTag
            onClick={handleTagChange}
            name="All"
            isSelected={tag === "All"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Web"
            isSelected={tag === "Web"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Design"
            isSelected={tag === "Design"}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-9 xl:gap-12">
          {filteredProjects.map((Project) => {
            return (
              <ProjectCard
                key={Project.id}
                title={Project.title}
                desc={Project.desc}
                image={Project.image}
                demo={Project.demo}
                preview={Project.preview}
              ></ProjectCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
