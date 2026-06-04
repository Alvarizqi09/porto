"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale } from "next-intl";

const ITEMS_PER_PAGE = 4;

export default function CertificatesTab({ certificate }) {
  const locale = useLocale();
  const {
    title = "My Certificates",
    description = "",
    items = [],
  } = certificate || {};

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(
    () => Math.ceil(items.length / ITEMS_PER_PAGE),
    [items.length]
  );

  const paginatedItems = useMemo(
    () =>
      items.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      ),
    [items, currentPage]
  );

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <TabsContent value="certificates" className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-[30px] text-center xl:text-left"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <h3 className="text-4xl font-bold">{getValue(title)}</h3>
          <div className="w-24 h-2.5 bg-primary border-2 border-foreground mt-3" />
        </div>
        <p className="max-w-[600px] text-foreground/80 mx-auto xl:mx-0 whitespace-pre-wrap">
          {getValue(description)}
        </p>
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <motion.li
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-card rounded-md overflow-hidden transition-all duration-150 flex flex-col border-3 border-foreground shadow-neobrutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neobrutal-hover"
                >
                  {item.image && (
                    <div className="w-full aspect-[16/9] bg-muted overflow-hidden relative border-b-3 border-foreground">
                      <Image
                        src={item.image}
                        alt={`${getValue(item.name)} certificate from ${getValue(item.publisher)}`}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-3 flex-grow bg-card">
                    <h4 className="text-lg font-bold text-foreground leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-accent transition-colors duration-300">
                      {getValue(item.name)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-none border border-foreground bg-primary"></div>
                      <p className="text-sm text-foreground/80 font-bold">
                        {getValue(item.publisher)}
                      </p>
                    </div>
                    {item.date && (
                      <div className="mt-auto pt-4 border-t-3 border-foreground">
                        <p className="text-xs text-foreground/60 font-bold flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-foreground"
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
                          <span className="font-extrabold text-foreground">
                            {getValue(item.date)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="col-span-full text-gray-400 text-center py-12">
                No certificates available
              </li>
            )}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-card text-foreground border-3 border-foreground shadow-[2px_2px_0px_0px_var(--border)] hover:bg-primary transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card disabled:translate-x-0 disabled:shadow-[2px_2px_0px_0px_var(--border)] font-bold text-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <FiChevronLeft className="text-lg" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`w-9 h-9 rounded-md text-sm font-bold transition-all duration-150 border-3 border-foreground shadow-[1.5px_1.5px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2.5px_2.5px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
                      currentPage === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-card text-foreground border-3 border-foreground shadow-[2px_2px_0px_0px_var(--border)] hover:bg-primary transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-card disabled:translate-x-0 disabled:shadow-[2px_2px_0px_0px_var(--border)] font-bold text-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                Next
                <FiChevronRight className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </TabsContent>
  );
}
