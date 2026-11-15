"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";
import { FiChevronDown } from "react-icons/fi";
import { Briefcase } from "lucide-react";

export default function ExperienceTab({ resume }) {
  const locale = useLocale();
  const { title = "Experience", description = "", items = [] } = resume || {};
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const parseBullets = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
      .filter((line) => line.length > 0);
  };

  return (
    <TabsContent value="experience" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-8 xl:p-10 rounded-3xl shadow-nature"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <span className="text-primary font-display font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            <span>Journey & Quests</span>
          </span>
          <h3 className="text-3xl xl:text-4xl font-bold font-display text-foreground">
            {getValue(title)}
          </h3>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
        </div>

        <p className="text-foreground/80 mx-auto xl:mx-0 w-full leading-relaxed">
          {getValue(description)}
        </p>

        <div>
          <ul className="flex flex-col gap-5">
            {items && items.length > 0 ? (
              items.map((item, index) => {
                const desc = getValue(item.description);
                const bullets = parseBullets(desc);
                const hasDescription = bullets.length > 0;
                const isExpanded = expandedIndex === index;

                return (
                  <li
                    key={index}
                    className="bg-card/90 rounded-2xl border border-foreground/15 shadow-sm hover:shadow-nature hover:border-primary/40 transition-all duration-300 group overflow-hidden"
                  >
                    <div
                      className={`p-6 flex flex-col gap-2.5 items-center lg:items-start ${
                        hasDescription ? "cursor-pointer" : ""
                      }`}
                      onClick={() => hasDescription && toggleExpand(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="bg-primary/15 text-foreground border border-primary/30 px-3.5 py-1 text-xs font-bold font-display uppercase tracking-wider rounded-full shadow-sm">
                          {getValue(item.date)}
                        </span>
                        {hasDescription && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-foreground/70 p-1.5 rounded-full hover:bg-primary/15 transition-colors"
                          >
                            <FiChevronDown className="w-4 h-4 text-primary" />
                          </motion.div>
                        )}
                      </div>
                      <h4 className="text-lg font-bold font-display text-center lg:text-left leading-snug group-hover:text-primary transition-colors duration-300 text-foreground">
                        {getValue(item.position)}
                      </h4>
                      <p className="text-foreground/65 text-sm font-semibold font-display">
                        {getValue(item.company)}
                      </p>
                    </div>

                    <AnimatePresence>
                      {isExpanded && hasDescription && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-3 border-t border-foreground/10 bg-gradient-to-b from-primary/5 to-transparent">
                            <ul className="space-y-2.5">
                              {bullets.map((bullet, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed text-left"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })
            ) : (
              <li className="text-center py-6 text-foreground/50 italic">
                No experience data available.
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </TabsContent>
  );
}
