"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px] text-center xl:text-left"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <h3 className="text-4xl font-bold">{getValue(title)}</h3>
          <div className="w-24 h-2.5 bg-primary border-2 border-foreground mt-3" />
        </div>
        <p className="text-foreground/80 mx-auto xl:mx-0 w-full">
          {getValue(description)}
        </p>
        <div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="bg-card rounded-md border-3 border-foreground shadow-[3.5px_3.5px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4.5px_4.5px_0px_0px_var(--border)] transition-all duration-150 group overflow-hidden"
                >
                  <div className="py-6 px-8 flex flex-col gap-2 items-center lg:items-start">
                    <span className="bg-primary text-primary-foreground border-2 border-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-md shadow-[1.5px_1.5px_0px_0px_var(--border)] mb-2">
                      {getValue(item.date)}
                    </span>
                    <h3 className="text-lg font-bold max-w-[300px] text-center lg:text-left leading-tight group-hover:text-accent transition-colors duration-300 text-foreground">
                      {getValue(item.degree)}
                    </h3>
                    <p className="text-foreground/70 text-sm font-semibold">
                      {getValue(item.school)}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="col-span-2 text-gray-400">
                No education data available
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </TabsContent>
  );
}
