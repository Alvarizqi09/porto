"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectTag from "@/components/ProjectTag";
import { FaLaravel, FaPhp, FaReact } from "react-icons/fa";
import {
  SiBootstrap,
  SiCodeigniter,
  SiFigma,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";

const Project = [
  {
    id: "1",
    image: "/assets/farmasi.jpg",
    title: "Rosati Farmasi",
    tag: ["All", "Web"],
    desc: "Rosati Pharmacy is a website created for the final project of a software engineering course. This website was created with Laravel and Bootstrap then deployed with Digital Ocean",
    demo: "detail/Rosati",
    preview: "http://rosatifarmasi.me",
    icon: [
      <FaLaravel key="laravel" className="w-6 h-6" />,
      <FaPhp key="php" className="w-6 h-6" />,
    ],
  },
  {
    id: "2",
    image: "/assets/vilume.jpg",
    title: "Vilume",
    tag: ["All", "Web"],
    desc: "VILUME is a website created to fulfill the tasks of the Alterra Academy mini-project. This website was created with ReactJS+Vite and also styled using Tailwind. There is also Firebase integration for login and OpenAi for Customer Services",
    demo: "detail/Vilume",
    preview: "https://vilume.vercel.app",
    icon: [
      <SiVite key={"Vite"} className="w-6 h-6" />,
      <FaReact key={"React"} className="w-6 h-6" />,
      <SiTailwindcss key={"Tailwind"} className="w-6 h-6" />,
    ],
  },
  {
    id: "3",
    image: "/assets/Alterra.jpg",
    title: "Alterra Submission",
    tag: ["All", "Web"],
    desc: "Alterra Submission is one of the tasks from Alterra Academy which is required by several criteria. I created this website with ReactJS + Vite with bootstrap styling. It contains CRUD to add products and is also integrated with OpenAi",
    demo: "detail/Alterra",
    preview: "https://react-ai-nu.ver",
    icon: [
      <SiVite key={"Vite"} className="w-6 h-6" />,
      <FaReact key={"React"} className="w-6 h-6" />,
      <SiBootstrap key={"Bootstrap"} className="w-6 h-6" />,
    ],
  },

  {
    id: "4",
    image: "/assets/Kliq.jpg",
    title: "Kliq Chat Prototype",
    tag: ["All", "Design"],
    desc: "Prototype and design of Kliq Chat Application",
    demo: "https://www.figma.com/proto/vdG44rI7YvM4ulDvRyYHL4/Untitled?node-id=32-319&scaling=scale-down&page-id=0%3A1&starting-point-node-id=0%3A3&t=g6ZzcObxLkLOHk5S-1",
    preview:
      "https://www.figma.com/proto/vdG44rI7YvM4ulDvRyYHL4/Untitled?node-id=32-319&scaling=scale-down&page-id=0%3A1&starting-point-node-id=0%3A3&t=g6ZzcObxLkLOHk5S-1",
    icon: [<SiFigma key={"Figma"} className="w-6 h-6" />],
  },
  {
    id: "5",
    image: "/assets/farmasi.jpg",
    title: "Rosati Prototype",
    tag: ["All", "Design"],
    desc: "Prototype and design of Rosati Farmasi Website",
    demo: "https://www.figma.com/proto/MQApVvVWRme1DlK8eMuPsR/Farmasi?node-id=367-5293&t=WVgwxU8QO2YzmKe1-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=357%3A1592",
    preview:
      "https://www.figma.com/proto/MQApVvVWRme1DlK8eMuPsR/Farmasi?node-id=367-5293&t=WVgwxU8QO2YzmKe1-1&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=357%3A1592",
    icon: [<SiFigma key={"Figma"} className="w-6 h-6" />],
  },
  {
    id: "6",
    image: "/assets/Qbills.jpg",
    title: "QBILLS POS APP",
    tag: ["All", "Web"],
    desc: "QBILLS is a Point of Sale application that I created for the final project of the Alterra Academy MSIB Batch 5 Programs. This website was created with NextJS and TailwindCSS then deployed with Vercel",
    demo: "https://qbills.vercel.app/",
    preview: "https://qbills.vercel.app/",
    icon: [
      <SiNextdotjs key={"Next"} className="w-6 h-6" />,
      <SiTailwindcss key={"Tailwind"} className="w-6 h-6" />,
    ],
  },
  {
    id: "7",
    image: "/assets/TechAnn.jpg",
    title: "TechAnn",
    tag: ["All", "Web"],
    desc: "An online shop website that has a simple CRUD project feature made with Vue3 and uses Vue-router for page routing, the first project for practicing using the VueJS Framework.",
    demo: "https://tech-ann.vercel.app/",
    preview: "https://tech-ann.vercel.app/",
    icon: [
      <SiVuedotjs key={"Vue"} className="w-6 h-6" />,
      <SiTailwindcss key={"Tailwind"} className="w-6 h-6" />,
    ],
  },
  {
    id: "8",
    image: "/assets/AmdMandiri.jpg",
    title: "AMD Mandiri(MixPitch)",
    tag: ["All", "Web"],
    desc: "Developing and deploying 20+ new features with superior monitoring & evaluation (monev) features in 2 of the 5 top banks in Indonesia, namely BNI (Bank Negara Indonesia) and Bank Mandiri.",
    demo: "https://mandiri.ideaboxapp.com/",
    preview: "https://mandiri.ideaboxapp.com/",
    icon: [
      <SiCodeigniter key={"CI4"} className="w-6 h-6" />,
      <SiBootstrap key={"Bootstrap"} className="w-6 h-6" />,
    ],
  },
  {
    id: "9",
    image: "/assets/BNI.jpg",
    title: "Ideabox BNI",
    tag: ["All", "Web"],
    desc: "Developing and deploying 20+ new features with superior monitoring & evaluation (monev) features in 2 of the 5 top banks in Indonesia, namely BNI (Bank Negara Indonesia) and Bank Mandiri.",
    demo: "https://bni.ideaboxapp.com",
    preview: "https://bni.ideaboxapp.com",
    icon: [
      <SiCodeigniter key={"CI4"} className="w-6 h-6" />,
      <SiBootstrap key={"Tailwind"} className="w-6 h-6" />,
    ],
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
    <div className="mb-10">
      <div className="container">
        <motion.h2
          className="text-center text-4xl font-bold text-black my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
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
                duration: 1,
                delay: 1 + index * 0.5,
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
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-16 mx-auto"
        >
          {filteredProjects.map((Project) => {
            return (
              <ProjectCard
                key={Project.id}
                title={Project.title}
                desc={Project.desc}
                image={Project.image}
                demo={Project.demo}
                preview={Project.preview}
                icon={Project.icon}
              ></ProjectCard>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
