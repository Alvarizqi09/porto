"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";
import { BookOpen } from "lucide-react";

export default function ResumeTab({ about }) {
  const locale = useLocale();
  const { title = "About Me", description = "", info = [] } = about || {};

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  return (
    <TabsContent value="resume" className="w-full text-center xl:text-left">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-8 xl:p-10 rounded-3xl shadow-nature"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <span className="text-primary font-display font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Wanderer's Journal</span>
          </span>
          <h3 className="text-3xl xl:text-4xl font-bold font-display text-foreground">
            {getValue(title)}
          </h3>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
        </div>

        <p className="text-foreground/80 mx-auto xl:mx-0 whitespace-pre-wrap w-full leading-relaxed text-base">
          {getValue(description)}
        </p>

        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-4 mx-auto xl:mx-0 w-full pt-4">
          {info && info.length > 0 ? (
            info.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-start gap-2 sm:gap-4 p-5 bg-card/80 border border-foreground/10 rounded-2xl shadow-sm text-left hover:border-primary/40 hover:bg-card transition-all duration-300"
              >
                <span className="text-foreground/50 font-semibold font-display uppercase tracking-wider text-xs shrink-0">
                  {getValue(item.fieldName)}:
                </span>
                <span className="text-base text-foreground font-bold font-display">
                  {getValue(item.fieldValue)}
                </span>
              </li>
            ))
          ) : (
            <li className="col-span-2 text-foreground/50 italic py-4">
              No info recorded yet.
            </li>
          )}
        </ul>
      </motion.div>
    </TabsContent>
  );
}
