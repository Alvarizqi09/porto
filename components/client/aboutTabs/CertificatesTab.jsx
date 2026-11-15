"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale } from "next-intl";
import { Award } from "lucide-react";

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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8 glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-8 xl:p-10 rounded-3xl shadow-nature text-center xl:text-left"
      >
        <div className="flex flex-col items-center xl:items-start justify-center">
          <span className="text-primary font-display font-semibold text-xs tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-primary" />
            <span>Certificates & Achievements</span>
          </span>
          <h3 className="text-3xl xl:text-4xl font-bold font-display text-foreground">
            {getValue(title)}
          </h3>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
        </div>

        <p className="w-full text-foreground/80 mx-auto xl:mx-0 whitespace-pre-wrap leading-relaxed">
          {getValue(description)}
        </p>

        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <motion.li
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="group bg-card/90 rounded-2xl overflow-hidden flex flex-col border border-foreground/15 shadow-sm hover:shadow-nature hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {item.image && (
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#E3EDE5]/30 to-[#EDE9DF]/30 overflow-hidden relative border-b border-foreground/10 p-4">
                      <Image
                        src={item.image}
                        alt={`${getValue(item.name)} certificate from ${getValue(item.publisher)}`}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col gap-2.5 flex-grow">
                    <h4 className="text-base font-bold font-display text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {getValue(item.name)}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <p className="text-xs text-foreground/75 font-semibold font-display">
                        {getValue(item.publisher)}
                      </p>
                    </div>

                    {item.date && (
                      <div className="mt-auto pt-3 border-t border-foreground/10">
                        <p className="text-xs text-foreground/60 font-medium">
                          Valid until:{" "}
                          <span className="font-bold text-foreground/80">
                            {getValue(item.date)}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))
            ) : (
              <li className="col-span-full text-foreground/50 text-center py-10 italic">
                No certificate scrolls documented.
              </li>
            )}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-card/80 text-foreground border border-foreground/15 shadow-sm hover:bg-card hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none font-display font-semibold text-xs transition-all duration-200"
              >
                <FiChevronLeft className="text-base text-primary" />
                Previous
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`w-8 h-8 rounded-full text-xs font-bold font-display transition-all duration-200 ${
                      currentPage === i
                        ? "bg-primary text-white shadow-nature shadow-glow"
                        : "bg-card/80 text-foreground/75 border border-foreground/15 hover:bg-card"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-card/80 text-foreground border border-foreground/15 shadow-sm hover:bg-card hover:border-primary/40 disabled:opacity-30 disabled:pointer-events-none font-display font-semibold text-xs transition-all duration-200"
              >
                Next
                <FiChevronRight className="text-base text-primary" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </TabsContent>
  );
}
