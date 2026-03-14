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
        <h3 className="text-4xl font-bold">{getValue(title)}</h3>
        <p className="text-black/80 mx-auto xl:mx-0">
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
                    className="bg-[#DFD3C3] rounded-xl overflow-hidden border-l-4 border-accent hover:shadow-lg transition-all duration-300 group"
                  >
                    <div
                      className={`py-6 px-8 flex flex-col gap-2 items-center lg:items-start ${
                        hasDescription ? "cursor-pointer" : ""
                      }`}
                      onClick={() => hasDescription && toggleExpand(index)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-accent text-sm font-medium tracking-wide">
                          {getValue(item.date)}
                        </span>
                        {hasDescription && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-accent"
                          >
                            <FiChevronDown className="w-5 h-5" />
                          </motion.div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-center lg:text-left leading-tight group-hover:text-accent transition-colors duration-300">
                        {getValue(item.position)}
                      </h3>
                      <p className="text-black/60 text-sm font-medium">
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
                          <div className="px-8 pb-6 pt-2 border-t border-black/10">
                            <ul className="space-y-2">
                              {bullets.map((bullet, bIdx) => (
                                <li
                                  key={bIdx}
                                  className="flex items-start gap-3 text-sm text-black/65 leading-relaxed text-left"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
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
