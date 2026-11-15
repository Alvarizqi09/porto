"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";
import { GraduationCap } from "lucide-react";

export default function EducationTab({ education }) {
  const locale = useLocale();
  const {
    title = "My Education",
    description = "",
    items = [],
  } = education || {};

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  return (
    <TabsContent value="education" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-8 xl:p-10 rounded-3xl shadow-nature text-center xl:text-left"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <span className="text-primary font-display font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <span>Academic Path</span>
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
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="bg-card/90 rounded-2xl border border-foreground/15 p-6 shadow-sm hover:shadow-nature hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden text-left"
                >
                  <div className="flex flex-col gap-2 items-start">
                    <span className="bg-primary/15 text-foreground border border-primary/30 px-3.5 py-1 text-xs font-bold font-display uppercase tracking-wider rounded-full shadow-sm mb-1">
                      {getValue(item.date)}
                    </span>
                    <h4 className="text-lg font-bold font-display leading-snug group-hover:text-primary transition-colors duration-300 text-foreground">
                      {getValue(item.degree)}
                    </h4>
                    <p className="text-foreground/65 text-sm font-semibold font-display">
                      {getValue(item.school)}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="col-span-2 text-center py-6 text-foreground/50 italic">
                No education records available.
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </TabsContent>
  );
}
