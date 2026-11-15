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
import { Sparkles, Quote } from "lucide-react";

const Stats = dynamic(() => import("@/components/Stats"), { ssr: false });
const RecommendationsCarousel = dynamic(
  () => import("@/components/client/ui/RecommendationsCarousel"),
  { ssr: false }
);
const Photo = dynamic(() => import("@/components/Photo"), {
  ssr: true,
  loading: () => (
    <div className="w-[300px] h-[300px] xl:w-[440px] xl:h-[440px] bg-card/60 rounded-[45%_55%_60%_40%/50%_45%_55%_50%] border-2 border-primary/20 shadow-nature-lg animate-pulse" />
  ),
});

// Default CV links
const DEFAULT_CV_LINK =
  "https://drive.google.com/file/d/1HYp78XR8yUlacHp91G-1acG6zOZZ1Eu3/view?usp=sharing";
const DEFAULT_CV_LINK_ENGLISH =
  "https://drive.google.com/file/d/15eLv51GE7xqmeV4KujAy0STrhxYeHK2f/view?usp=sharing";

const Home = () => {
  const [cvDropdownOpen, setCvDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data } = useQuery({
    queryKey: ["about-data"],
    queryFn: aboutApi.fetchAboutData,
  });

  const t = useTranslations("Hero");

  const cvLink = data?.about?.cvLink || DEFAULT_CV_LINK;
  const cvLinkEnglish = data?.about?.cvLinkEnglish || DEFAULT_CV_LINK_ENGLISH;

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
    <section className="h-full mb-10 pt-4 xl:pt-8">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-6 xl:pb-20 gap-10 xl:gap-0">
          {/* Text content */}
          <div className="text-center xl:text-left order-2 xl:order-none max-w-xl">
            {/* Whimsical role badge with high contrast */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/95 backdrop-blur-md border border-primary/35 shadow-sm mb-5"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-display font-bold text-xs xl:text-sm text-foreground tracking-wide">
                {t("role")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="h1 font-display mb-4"
            >
              {t("titlePrefix")} <br />
              <span className="text-ghibli-gradient relative inline-block">
                Alvarizqi
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-transparent rounded-full opacity-60" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 text-foreground/85 leading-relaxed text-base xl:text-lg font-medium"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-center xl:items-start gap-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* CV Download Dropdown Button */}
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="default"
                    size="lg"
                    className="flex items-center gap-2.5 rounded-full shadow-nature hover:shadow-glow"
                    onClick={() => setCvDropdownOpen((prev) => !prev)}
                  >
                    <span>{t("downloadCV")}</span>
                    <FiDownload className="text-lg" />
                    <motion.span
                      animate={{ rotate: cvDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="inline-flex"
                    >
                      <FiChevronDown className="text-base" />
                    </motion.span>
                  </Button>

                  <AnimatePresence>
                    {cvDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0 mt-3 z-50 min-w-[210px] glass-card bg-card/95 backdrop-blur-md border border-foreground/15 rounded-2xl shadow-nature-xl overflow-hidden p-1.5"
                      >
                        <a
                          href={cvLink || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold font-display text-foreground rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                        >
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">ID</span>
                          <span>{t("cvIndo")}</span>
                        </a>
                        <div className="h-[1px] bg-foreground/10 my-1 mx-2" />
                        <a
                          href={cvLinkEnglish || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCvDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold font-display text-foreground rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                        >
                          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">EN</span>
                          <span>{t("cvEnglish")}</span>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <Socials containerStyles="flex gap-3" />
              </div>
            </motion.div>
          </div>

          {/* Photo */}
          <div className="order-1 xl:order-none mb-4 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>

      {/* GitHub Calendar (The Garden) */}
      <Stats />

      {/* Whimsical quote banner with wind sepoy-sepoy / calm anime breeze aesthetic */}
      <div className="text-center my-14 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block max-w-2xl glass-card px-8 py-5 rounded-3xl border border-foreground/10 shadow-nature"
        >
          <p className="text-base md:text-lg text-foreground/80 font-display italic leading-relaxed flex items-center justify-center gap-2">
            <Quote className="w-4 h-4 text-primary/60 inline mr-1 rotate-180 shrink-0" />
            <span>{t("quote")}</span>
            <Quote className="w-4 h-4 text-primary/60 inline ml-1 shrink-0" />
          </p>
        </motion.div>
      </div>

      {/* Recommendations Carousel */}
      <RecommendationsCarousel />
    </section>
  );
};

export default Home;
