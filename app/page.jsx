"use client";

import dynamic from "next/dynamic";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { FiDownload, FiChevronDown } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { aboutApi } from "@/lib/api/aboutApi";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const RecommendationsCarousel = dynamic(() => import("@/components/client/ui/RecommendationsCarousel"), { ssr: false });
const Photo = dynamic(() => import("@/components/Photo"), {
  ssr: true,
  loading: () => (
    <div className="w-[300px] h-[300px] xl:w-[440px] xl:h-[440px] bg-[#FAF8F0] border-4 border-foreground rounded-lg shadow-[6px_6px_0px_0px_#1C293C] animate-pulse" />
  ),
});

// Default CV links (hardcoded fallback — instant, no fetch needed)
const DEFAULT_CV_LINK = "https://drive.google.com/file/d/1HYp78XR8yUlacHp91G-1acG6zOZZ1Eu3/view?usp=sharing";
const DEFAULT_CV_LINK_ENGLISH = "https://drive.google.com/file/d/15eLv51GE7xqmeV4KujAy0STrhxYeHK2f/view?usp=sharing";

const Home = () => {
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["about-data"],
    queryFn: aboutApi.fetchAboutData,
  });
  
  const t = useTranslations("Hero");

  // Database override > hardcoded default
  const cvLink = data?.about?.cvLink || DEFAULT_CV_LINK;
  const cvLinkEnglish = data?.about?.cvLinkEnglish || DEFAULT_CV_LINK_ENGLISH;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCvDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="h-full mb-10">
      <div className="container mx-auto ">
        <div className=" flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{t("role")}</span>
            <h1 className="h1">
              {t("titlePrefix")} <br />
              <span className="text-accent">Alvarizqi</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-foreground/80">
              {t("description")}
            </p>
            <div className="flex flex-col items-center justify-center xl:justify-start gap-6 mb-8">
              <div className="flex flex-col xl:flex-row items-center gap-8">
                {/* CV Download Dropdown Button */}
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="uppercase flex items-center gap-2"
                    onClick={() => setCvDropdownOpen((prev) => !prev)}
                  >
                    <span>{t("downloadCV")}</span>
                    <FiDownload className="text-xl" />
                    <motion.span
                      animate={{ rotate: cvDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="inline-flex"
                    >
                      <FiChevronDown className="text-lg" />
                    </motion.span>
                  </Button>

                  <AnimatePresence>
                    {cvDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0 mt-2 z-50 min-w-[200px] bg-card border-3 border-foreground rounded-md shadow-neobrutal overflow-hidden"
                      >
                        <a
                          href={cvLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent hover:text-white transition-colors duration-150"
                        >
                          <span className="text-base">🇮🇩</span>
                          <span>{t("cvIndo")}</span>
                        </a>
                        <div className="h-[2px] bg-foreground/15" />
                        <a
                          href={cvLinkEnglish || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-foreground hover:bg-accent hover:text-white transition-colors duration-150"
                        >
                          <span className="text-base">🇬🇧</span>
                          <span>{t("cvEnglish")}</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-10 h-10 border-3 border-foreground rounded-md flex justify-center items-center text-foreground text-base bg-card hover:bg-primary shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3.5px_3.5px_0px_0px_var(--border)] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
      <div className="text-center mt-12 mb-20">
        <p className="text-lg text-foreground/80">
          {t("quote")}
        </p>
      </div>

      <RecommendationsCarousel />
    </section>
  );
};

export default Home;
