"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";

export default function CertificatesTab({ certificate }) {
  const {
    title = "My Certificates",
    description = "",
    items = [],
  } = certificate || {};

  return (
    <TabsContent value="certificates" className="w-full">
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
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 hover:border-accent/30"
                >
                  {item.image && (
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={`${item.name} certificate from ${item.publisher}`}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-3 flex-grow bg-gradient-to-b from-white to-gray-50/50">
                    <h4 className="text-lg font-bold text-black leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-accent transition-colors duration-300">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      <p className="text-sm text-accent font-semibold">
                        {item.publisher}
                      </p>
                    </div>
                    {item.date && (
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <p className="text-xs text-black/60 font-medium flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-label="Certificate valid date"
                            role="presentation"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Valid until:{" "}
                          <span className="font-semibold text-black/80">
                            {item.date}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="col-span-full text-gray-400 text-center py-12">
                No certificates available
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </TabsContent>
  );
}
