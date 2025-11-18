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
  "Tailwind CSS": <SiTailwindcss />,
  Bootstrap: <SiBootstrap />,
  "Next.js": <SiNextdotjs />,
  Laravel: <FaLaravel />,
  Figma: <FaFigma />,
  Canva: <SiCanva />,
  "Corel Draw": <SiCoreldraw />,
};

// Fetch data at server-side
async function getAboutData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/about`, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Failed to fetch about data");
    }

    return result.data;
  } catch (err) {
    console.error("Error fetching about data:", err);
    return null;
  }
}

export default async function About() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading About Data</h2>
          <p>Failed to load about data. Please try again later.</p>
        </div>
      </div>
    );
  }

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
                          className="bg-[#DFD3C3] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.date}</span>
                          <h3 className="text-xl max-w-[300px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-black/80">{item.company}</p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="col-span-2 text-gray-400">
                        No experience added yet
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
                          className="bg-[#DFD3C3] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.date}</span>
                          <h3 className="text-xl max-w-[300px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-black/80">{item.school}</p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="col-span-2 text-gray-400">
                        No education added yet
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skill.title}</h3>
                  <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
                    {skill.description}
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                    {skill.skillList && skill.skillList.length > 0 ? (
                      skill.skillList.map((item, index) => (
                        <li key={index}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-full h-[150px] bg-[#DFD3C3] rounded-xl flex justify-center items-center">
                                <div className="text-6xl hover:text-accent transition-all duration-300">
                                  {techIconMap[item.name] || "?"}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="capitalize">{item.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      ))
                    ) : (
                      <li className="col-span-full text-gray-400">
                        No skills added yet
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
