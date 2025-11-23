"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import techIconMap from "../../../utils/techIconMap";

export default function SkillsTab({ skill }) {
  const { title = "My Skills", description = "", skillList = [] } = skill || {};

  return (
    <TabsContent value="skills" className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px]"
      >
        <div className="flex flex-col gap-[30px] text-center xl:text-left">
          <h3 className="text-4xl font-bold">{title}</h3>
          <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
            {description}
          </p>
        </div>
        <div className="text-black">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
            {skillList && skillList.length > 0 ? (
              skillList.map((item, index) => {
                const skillName = typeof item === "string" ? item : item.name;
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
      </motion.div>
    </TabsContent>
  );
}
