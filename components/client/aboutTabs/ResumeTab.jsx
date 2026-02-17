"use client";

import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";

export default function ResumeTab({ about }) {
  const { title = "About Me", description = "", info = [] } = about || {};

  return (
    <TabsContent value="resume" className="w-full text-center xl:text-left">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px]"
      >
        <h3 className="text-4xl font-bold">{title}</h3>
        <p className="max-w-[600px] text-black/80 mx-auto xl:mx-0">
          {description}
        </p>
        <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
          {info && info.length > 0 ? (
            info.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-center xl:justify-start gap-4"
              >
                <span className="text-black/80">{item.fieldName}</span>
                <span className="text-lg">{item.fieldValue}</span>
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
