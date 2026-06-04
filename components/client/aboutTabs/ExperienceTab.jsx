"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";
import { FiChevronDown } from "react-icons/fi";

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

  // Parse description into bullet points (split by newline)
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px] text-center xl:text-left"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <h3 className="text-4xl font-bold">{getValue(title)}</h3>
          <div className="w-24 h-2.5 bg-primary border-2 border-foreground mt-3" />
        </div>
        <p className="text-foreground/80 mx-auto xl:mx-0 max-w-[600px]">
          {getValue(description)}
        </p>
        <div>
          <ul className="flex flex-col gap-6">
            {items && items.length > 0 ? (
              items.map((item, index) => {
                const desc = getValue(item.description);
                const bullets = parseBullets(desc);
                const hasDescription = bullets.length > 0;
                const isExpanded = expandedIndex === index;

                return (
                  <li
                    key={index}
                    className="bg-card rounded-md border-3 border-foreground shadow-[3.5px_3.5px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4.5px_4.5px_0px_0px_var(--border)] transition-all duration-150 group overflow-hidden"
                  >
                    <div
                      className={`py-6 px-8 flex flex-col gap-2 items-center lg:items-start ${
                        hasDescription ? "cursor-pointer" : ""
                      }`}
                      onClick={() => hasDescription && toggleExpand(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="bg-primary text-primary-foreground border-2 border-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md shadow-[1.5px_1.5px_0px_0px_var(--border)]">
                          {getValue(item.date)}
                        </span>
                        {hasDescription && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-foreground border-2 border-foreground p-1 rounded-md bg-card shadow-[1px_1px_0px_0px_var(--border)]"
                          >
                            <FiChevronDown className="w-5 h-5" />
                          </motion.div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-center lg:text-left leading-tight group-hover:text-accent transition-colors duration-300 text-foreground">
                        {getValue(item.position)}
                      </h3>
                      <p className="text-foreground/70 text-sm font-semibold">
                        {getValue(item.company)}
                      </p>
                    </div>

                    {/* Expandable description with bullet points */}
                    <AnimatePresence>
                      {isExpanded && hasDescription && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-6 pt-4 border-t-3 border-foreground bg-primary/5">
                            <ul className="space-y-2">
                              {bullets.map((bullet, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed text-left"
                                >
                                  <span className="mt-1.5 w-2.5 h-2.5 rounded-none border border-foreground bg-primary shrink-0" />
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
              <li className="col-span-2 text-gray-400">
                No experience data available
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </TabsContent>
  );
}
