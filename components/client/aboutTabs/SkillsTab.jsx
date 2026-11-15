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
import { Wrench } from "lucide-react";

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

const CATEGORY_LABELS = {
  "Programming Language": "Programming Language",
  Framework: "Framework",
  "Frontend Framework": "Framework",
  Frontend: "Frontend",
  Styling: "Styling",
  Backend: "Backend",
  Database: "Backend",
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

    return CATEGORY_ORDER.filter(
      (cat) => groups[cat] && groups[cat].length > 0
    ).map((cat) => ({
      category: cat,
      label: CATEGORY_LABELS[cat] || cat,
      skills: groups[cat],
    }));
  }, [skillList]);

  return (
    <TabsContent value="skills" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-8 xl:p-10 rounded-3xl shadow-nature"
      >
        <div className="flex flex-col gap-3 text-center xl:text-left">
          <div className="flex flex-col items-center xl:items-start justify-center">
            <span className="text-primary font-display font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-primary" />
              <span>Skills & Craftsmanship</span>
            </span>
            <h3 className="text-3xl xl:text-4xl font-bold font-display text-foreground">
              {getValue(title)}
            </h3>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
          </div>
          <p className="w-full text-foreground/80 mx-auto xl:mx-0 leading-relaxed">
            {getValue(description)}
          </p>
        </div>

        {groupedSkills.length > 0 ? (
          <div className="flex flex-col gap-6">
            {groupedSkills.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: groupIndex * 0.08 }}
                className="bg-card/90 rounded-2xl border border-foreground/15 shadow-sm p-6 overflow-hidden"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <h4 className="text-sm font-bold font-display uppercase tracking-wider text-foreground/80">
                    {group.label}
                  </h4>
                  <div className="flex-1 h-px bg-foreground/10" />
                  <span className="text-xs text-primary font-bold font-display bg-primary/10 border border-primary/20 px-3 py-0.5 rounded-full">
                    {group.skills.length}
                  </span>
                </div>

                {/* Skills Grid */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-foreground">
                  {group.skills.map((skillName, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[90px] bg-background/80 rounded-2xl flex flex-col justify-center items-center group cursor-pointer border border-foreground/10 shadow-sm hover:border-primary/50 hover:bg-card hover:shadow-nature hover:-translate-y-1 active:scale-95 transition-all duration-300 text-foreground">
                            <div className="text-4xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center text-foreground/85">
                              {techIconMap[skillName] ? (
                                techIconMap[skillName]
                              ) : (
                                <span className="text-xs font-bold font-display text-center px-2">
                                  {skillName}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold font-display text-foreground/60 mt-1.5 opacity-80 group-hover:text-primary transition-colors">
                              {skillName}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
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
          <div className="text-foreground/50 text-center py-8 italic">
            No skill entries registered.
          </div>
        )}
      </motion.div>
    </TabsContent>
  );
}
