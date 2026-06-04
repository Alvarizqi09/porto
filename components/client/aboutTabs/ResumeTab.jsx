"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px]"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <h3 className="text-4xl font-bold">{getValue(title)}</h3>
          <div className="w-24 h-2.5 bg-primary border-2 border-foreground mt-3" />
        </div>
        <p className="text-foreground/80 mx-auto xl:mx-0 whitespace-pre-wrap max-w-[600px]">
          {getValue(description)}
        </p>
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-6 mx-auto xl:mx-0 w-full">
          {info && info.length > 0 ? (
            info.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-start gap-2 md:gap-4 p-4 bg-card border-3 border-foreground rounded-md shadow-[3.5px_3.5px_0px_0px_var(--border)] text-left"
              >
                <span className="text-foreground/50 font-bold uppercase tracking-wider text-xs shrink-0">{getValue(item.fieldName)}:</span>
                <span className="text-base text-foreground font-extrabold">{getValue(item.fieldValue)}</span>
              </li>
            ))
          ) : (
            <li className="col-span-2 text-gray-400">No info available</li>
          )}
        </ul>
      </motion.div>
    </TabsContent>
  );
}
