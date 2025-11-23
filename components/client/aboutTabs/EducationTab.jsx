"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";

export default function EducationTab({ education }) {
  const {
    title = "My Education",
    description = "",
    items = [],
  } = education || {};

  return (
    <TabsContent value="education" className="w-full">
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
                  className="bg-[#DFD3C3] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                >
                  <span className="text-accent text-sm">{item.date}</span>
                  <h3 className="text-lg font-semibold max-w-[300px] text-center lg:text-left line-clamp-3 leading-tight">
                    {item.degree}
                  </h3>
                  <p className="text-black/60 text-sm">{item.school}</p>
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
