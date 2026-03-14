"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import techIconMap from "../../../utils/techIconMap";
import { useLocale } from "next-intl";

// Display order for categories — groups appear in this sequence
const CATEGORY_ORDER = [
  "Programming Language",
  "Framework",
  "Styling",
  "Backend",
  "Version Control",
  "Libraries",
  "Tools & Management",
  "Design",
  "Other",
];

// Maps legacy categories to display names
const CATEGORY_LABELS = {
  "Programming Language": "Programming Language",
  Framework: "Framework",
  "Frontend Framework": "Framework", // Legacy
  Frontend: "Frontend", // Legacy
  Styling: "Styling",
  Backend: "Backend",
  Database: "Backend", // Merge Database to Backend
  "Version Control": "Version Control",
  Libraries: "Libraries",
  "Tools & Management": "Tools & Management",
  Design: "Design",
  Other: "Other",
};

export default function SkillsTab({ skill }) {
  const locale = useLocale();
  const { title = "My Skills", description = "", skillList = [] } = skill || {};

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups = {};
    skillList.forEach((item) => {
      const skillName = typeof item === "string" ? item : item.name;
      const category =
        typeof item === "string" ? "Other" : item.category || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skillName);
    });

    // Return ordered groups (only those that have skills)
    return CATEGORY_ORDER.filter((cat) => groups[cat] && groups[cat].length > 0).map(
      (cat) => ({
        category: cat,
        label: CATEGORY_LABELS[cat] || cat,
        skills: groups[cat],
      })
    );
  }, [skillList]);

  return (
    <TabsContent value="skills" className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px]"
      >
        <div className="flex flex-col gap-[30px] text-center xl:text-left">
          <h3 className="text-4xl font-bold">{getValue(title)}</h3>
          <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
            {getValue(description)}
          </p>
        </div>

        {groupedSkills.length > 0 ? (
          <div className="flex flex-col gap-8">
            {groupedSkills.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
                className="bg-[#DFD3C3] rounded-xl overflow-hidden border-l-4 border-accent hover:shadow-lg transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 px-8 pt-5 pb-3">
                  <h4 className="text-base font-bold text-black/80">
                    {group.label}
                  </h4>
                  <div className="flex-1 h-px bg-black/15"></div>
                  <span className="text-xs text-black/40 font-medium">
                    {group.skills.length}
                  </span>
                </div>

                {/* Skills Grid */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-8 pb-6 text-black">
                  {group.skills.map((skillName, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[100px] bg-[#FFF4E6] rounded-xl flex justify-center items-center group cursor-pointer hover:text-accent hover:bg-accent/10 transition-all duration-300 border border-transparent hover:border-accent/20">
                            <div className="text-5xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
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
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No skills available</div>
        )}
      </motion.div>
    </TabsContent>
  );
}
