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
  SiVuedotjs,
  SiTypescript,
  SiSupabase,
  SiMongodb,
  SiFirebase,
  SiQuasar,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiJira,
  SiTrello,
} from "react-icons/si";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Tech skill icons mapping
const techIconMap = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3 />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  React: <FaReact />,
  "Vue.js": <SiVuedotjs />,
  "Next.js": <SiNextdotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  Quasar: <SiQuasar />,
  Laravel: <FaLaravel />,
  Figma: <FaFigma />,
  Supabase: <SiSupabase />,
  Firebase: <SiFirebase />,
  Mongodb: <SiMongodb />,
  Github: <SiGithub />,
  Gitlab: <SiGitlab />,
  Bitbucket: <SiBitbucket />,
  Jira: <SiJira />,
  Trello: <SiTrello />,
};

export default function AboutClient({ aboutData }) {
  const { about, resume, education, skill } = aboutData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
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
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            {/* Resume Tab */}
            <TabsContent
              value="resume"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info && about.info.length > 0 ? (
                    about.info.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-black/80">{item.fieldName}</span>
                        <span className="text-lg">{item.fieldValue}</span>
                      </li>
                    ))
                  ) : (
                    <li className="col-span-2 text-gray-400">
                      No info available
                    </li>
                  )}
                </ul>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{resume.title}</h3>
                <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                  {resume.description}
                </p>
                <div>
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {resume.items && resume.items.length > 0 ? (
                      resume.items.map((item, index) => (
                        <li
                          key={index}
                          className="bg-[#DFD3C3] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent text-sm">{item.date}</span>
                          <h3 className="text-lg font-semibold max-w-[300px] text-center lg:text-left line-clamp-3 leading-tight">
                            {item.position}
                          </h3>
                          <p className="text-black/60 text-sm">{item.company}</p>
                        </li>
                      ))
                    ) : (
                      <li className="col-span-2 text-gray-400">
                        No experience data available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <div>
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items && education.items.length > 0 ? (
                      education.items.map((item, index) => (
                        <li
                          key={index}
                          className="bg-[#DFD3C3] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent text-sm">{item.date}</span>
                          <h3 className="text-lg font-semibold max-w-[300px] text-center lg:text-left line-clamp-3 leading-tight">
                            {item.degree}
                          </h3>
                          <p className="text-black/60 text-sm">{item.school}</p>
                        </li>
                      ))
                    ) : (
                      <li className="col-span-2 text-gray-400">
                        No education data available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skill.title}</h3>
                  <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                    {skill.description}
                  </p>
                </div>
                <div className="text-black">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                    {skill.skillList && skill.skillList.length > 0 ? (
                      skill.skillList.map((item, index) => {
                        const skillName =
                          typeof item === "string" ? item : item.name;
                        return (
                          <li key={index}>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className="w-full h-[150px] bg-[#FFF4E6] rounded-xl flex justify-center items-center group cursor-pointer hover:text-accent hover:bg-accent/10 transition-all duration-300">
                                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                                    {techIconMap[skillName] ? (
                                      techIconMap[skillName]
                                    ) : (
                                      <span className="text-xs font-bold text-center px-2">
                                        {skillName}
                                      </span>
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent
                                  className="bg-accent text-white border-none"
                                  side="bottom"
                                >
                                  <p>{skillName}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        );
                      })
                    ) : (
                      <li className="col-span-full text-gray-400">
                        No skills available
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}
