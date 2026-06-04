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
          <div className="flex flex-col items-center xl:items-start justify-center">
            <h3 className="text-4xl font-bold">{getValue(title)}</h3>
            <div className="w-24 h-2.5 bg-primary border-2 border-foreground mt-3" />
          </div>
          <p className="max-w-[600px] text-foreground/80 mx-auto xl:mx-0">
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
                className="bg-card rounded-md border-3 border-foreground shadow-[3.5px_3.5px_0px_0px_var(--border)] transition-all duration-150 group overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 px-8 pt-5 pb-3">
                  <h4 className="text-base font-bold text-foreground/80">
                    {group.label}
                  </h4>
                  <div className="flex-1 h-0.5 bg-foreground/15"></div>
                  <span className="text-xs text-foreground/50 font-bold bg-muted border border-foreground px-2.5 py-0.5 rounded-md">
                    {group.skills.length}
                  </span>
                </div>

                {/* Skills Grid */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-8 pb-6 text-foreground">
                  {group.skills.map((skillName, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[100px] bg-background rounded-md flex justify-center items-center group cursor-pointer border-3 border-foreground shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3.5px_3.5px_0px_0px_var(--border)] hover:bg-primary active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150 text-foreground">
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
