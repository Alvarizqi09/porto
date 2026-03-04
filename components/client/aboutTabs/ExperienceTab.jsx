"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { useLocale } from "next-intl";

export default function ExperienceTab({ resume }) {
  const locale = useLocale();
  const { title = "Experience", description = "", items = [] } = resume || {};

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  return (
    <TabsContent value="experience" className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px] text-center xl:text-left"
      >
        <h3 className="text-4xl font-bold">{title}</h3>
        <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
          {description}
        </p>
        <div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#DFD3C3] rounded-xl overflow-hidden border-l-4 border-accent hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="py-6 px-8 flex flex-col gap-2 items-center lg:items-start">
                    <span className="text-accent text-sm font-medium tracking-wide">
                      {getValue(item.date)}
                    </span>
                    <h3 className="text-lg font-semibold max-w-[300px] text-center lg:text-left leading-tight group-hover:text-accent transition-colors duration-300">
                      {getValue(item.position)}
                    </h3>
                    <p className="text-black/60 text-sm font-medium">
                      {getValue(item.company)}
                    </p>
                    {item.description && (
                      <p className="text-black/50 text-sm mt-2 leading-relaxed text-center lg:text-left">
                        {getValue(item.description)}
                      </p>
                    )}
                  </div>
                </li>
              ))
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
