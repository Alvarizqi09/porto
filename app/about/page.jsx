"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaFigma,
  FaReact,
  FaLaravel,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiCanva,
  SiCoreldraw,
  SiBootstrap,
  SiNextdotjs,
} from "react-icons/si";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const resume = {
  title: "About Me",
  description:
    "Hi, I`m Alvarizqi! I specialize in wireframing, prototyping, and have hands-on experience with HTML, CSS, JavaScript, and graphic design tools like Canva and Corel Draw. Right now, I`m deepening my skills in Next.js and Laravel. As a creative problem solver, Im passionate about turning innovative ideas into user-centric designs. Let`s collaborate and make great things happen!",
  info: [
    { fieldName: "Name", fieldValue: "Alvarizqi" },
    { fieldName: "Phone", fieldValue: "(+62) 8132 7963 181" },
    { fieldName: "Email", fieldValue: "Alvarizqi80@gmail.com" },
    { fieldName: "Instagram", fieldValue: "@Alvarizqi__" },
    { fieldName: "Location", fieldValue: "Semarang,Indonesia" },
  ],
};

const experience = {
  title: "Experience",
  description:
    " I have worked on several personal projects, including a portfolio website and a blog. I am always looking for new opportunities to learn and grow as a designer and developer.",
  items: [
    {
      company: "Telkom Indonesia",
      date: "Feb 2024 - Jun 2024",
      position: "Front-end Web Developer Intern",
    },
    {
      company: "Alterra Academy",
      date: "Aug 2023 - Dec 2023",
      position: "Students in Alterra Academy",
    },
    {
      company: "BEM FMIPA 2022",
      date: "Feb 2022 - Dec 2022",
      position: "Staff of Information and Media Division",
    },
    {
      company: "SKETSA FMIPA 2023",
      date: "Mar 2023 - Dec 2023",
      position: "Head of Relation and Media Division",
    },
  ],
};

const education = {
  title: "My Education",
  description:
    "I am currently pursuing a Bachelor's degree in Computer Science at Universitas Negeri Semarang. I have completed several courses in UI/UX design, front-end development, and web development. I am passionate about learning and always looking for new opportunities to expand my knowledge and skills.",
  items: [
    {
      school: "Universitas Negeri Semarang",
      date: "2021 - Present",
      degree: "Bachelor's Degree in Computer Science",
    },
    {
      school: "SMAN 1 Ajibarang",
      date: "2018 - 2021",
      degree: "High School",
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "I have experience working with a variety of tools and technologies. Here are some of the skills that I have developed over the years:",
  skillList: [
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiBootstrap />, name: "Bootstrap" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <FaLaravel />, name: "Laravel" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <SiCanva />, name: "Canva" },
    { icon: <SiCoreldraw />, name: "Corel Draw" },
  ],
};

const about = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center my-10 py-12 xl:py-0 "
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
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            <TabsContent
              value="resume"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{resume.title}</h3>
                <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                  {resume.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {resume.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-black/80">{item.fieldName}</span>
                        <span className="text-lg">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] active:text-white text-black/80 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <div className="">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((items, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#DFD3C3] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{items.date}</span>
                          <h3 className="text-xl max-w-[300px] min-h-[60px] text-center lg:text-left">
                            {items.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-black/80">{items.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <div className="">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((items, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#DFD3C3] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{items.date}</span>
                          <h3 className="text-xl max-w-[300px] min-h-[60px] text-center lg:text-left">
                            {items.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-black/80">{items.school}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left ">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                    {skills.skillList.map((items, index) => {
                      return (
                        <li key={index}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-full h-[150px] bg-[#DFD3C3] rounded-xl flex justify-center items-center">
                                <div className="text-6xl hover:text-accent transition-all duration-300">
                                  {items.icon}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="capitalize">{items.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default about;
