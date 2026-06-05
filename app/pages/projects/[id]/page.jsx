"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCalendarAlt,
  FaLayerGroup,
  FaCogs,
  FaSearch,
  FaLock,
} from "react-icons/fa";
import { getIcon } from "@/utils/techIconMap";
import { ProjectDetailSkeleton } from "@/components/ui/Skeleton";
import { useTranslations, useLocale } from "next-intl";
import { getLocalizedText } from "@/utils/localization";
import { DEFAULT_PROJECT_IMAGE } from "@/utils/imageFallback";

const ICON_SIZE_CLASS = "w-8 h-8";
const createIcon = (name) => getIcon(name, ICON_SIZE_CLASS);

const fetchProjectById = async (id) => {
  const { data } = await axios.get(`/api/projects/${id}`);
  if (!data.success) throw new Error(data.error || "Failed to fetch project");
  return data.data;
};

const stagger = {
  parent: {
    animate: { transition: { staggerChildren: 0.08 } },
  },
  child: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activePageTab, setActivePageTab] = useState(0);
  const t = useTranslations("ProjectDetail");
  const locale = useLocale();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => fetchProjectById(params.id),
    enabled: !!params.id,
    staleTime: 60000,
    retry: 1,
  });

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((prev) =>
          prev > 0 ? prev - 1 : (project?.pages?.length || 1) - 1
        );
      if (e.key === "ArrowRight")
        setLightboxIndex((prev) =>
          prev < (project?.pages?.length || 1) - 1 ? prev + 1 : 0
        );
    },
    [lightboxIndex, project?.pages?.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Loading state with skeleton
  if (isLoading) return <ProjectDetailSkeleton />;

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#FBFBF9]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-card p-10 border-4 border-foreground shadow-[6px_6px_0px_0px_#1C293C] max-w-md w-full"
        >
          <div className="w-20 h-20 bg-primary border-4 border-foreground flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_#1C293C]">
            <span className="text-4xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {error ? t("errorTitle") : t("notFoundTitle")}
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {error?.message || t("notFoundDesc")}
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white border-3 border-foreground font-bold shadow-[3px_3px_0px_0px_#1C293C] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[4.5px_4.5px_0px_0px_#1C293C] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150"
          >
            <FaArrowLeft /> {t("back")}
          </button>
        </motion.div>
      </div>
    );
  }

  const techStackIcons =
    project.tech_stack?.map((tech) => createIcon(tech)).filter(Boolean) || [];

  const localizedTitle = getLocalizedText(project.title, locale);
  const localizedDesc = getLocalizedText(project.desc, locale);
  const localizedLongDesc = getLocalizedText(project.long_desc, locale);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  // Helper for mock URLs in browser mockups
  const mockUrl = `https://alvarizqi.com/projects/${project._id || "project"}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-10 lg:py-16 bg-[#FBFBF9] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        
        {/* ===== TOP NAVIGATION / HEADER ===== */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <motion.button
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border-3 border-foreground text-foreground rounded-md shadow-[3px_3px_0px_0px_#1C293C] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[4.5px_4.5px_0px_0px_#1C293C] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150 text-sm font-bold"
          >
            <FaArrowLeft className="w-3.5 h-3.5" /> {t("back")}
          </motion.button>
          
          <div className="hidden sm:flex items-center gap-3">
            {project.tag?.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-[#432DD7] text-white border-2 border-foreground rounded-md text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#1C293C]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ===== HERO GRID: ASYMMETRIC WINDOW FRAME + HEADER DETAILS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Kolom Kiri: Browser/Window Frame Mockup showcase utama (65% width equivalent) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-card border-4 border-foreground rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_#1C293C] flex flex-col"
            >
              {/* Window Header Bar (Classic OS Style) */}
              <div className="bg-[#432DD7] border-b-4 border-foreground py-3 px-4 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FAF8F0] border-2 border-foreground"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FDC800] border-2 border-foreground"></span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FAF8F0] border-2 border-foreground"></span>
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-widest hidden sm:inline">
                  showcase_window.exe
                </span>
                <div className="w-12 h-1 bg-[#FAF8F0]/30 rounded-md"></div>
              </div>
              
              {/* Image viewport */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
                <Image
                  src={project.image || DEFAULT_PROJECT_IMAGE}
                  alt={`${localizedTitle} - Project main banner`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  quality={90}
                />
              </div>
            </motion.div>
          </div>

          {/* Kolom Kanan: Title & Short Desc + CTA (35% width equivalent) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Tag/Category for mobile */}
              <div className="flex sm:hidden flex-wrap gap-2">
                {project.tag?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#432DD7] text-white border-2 border-foreground rounded-md text-[10px] font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-foreground relative inline-block leading-tight">
                  {localizedTitle}
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FDC800] -z-10 transform -rotate-1"></span>
                </h1>
              </div>

              <div className="border-l-6 border-[#432DD7] pl-4">
                <p className="text-base text-foreground font-semibold leading-relaxed">
                  {localizedDesc}
                </p>
              </div>

              {/* Call to Actions (CTAs) */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-6 py-4 bg-[#FDC800] text-foreground border-3 border-foreground font-bold shadow-[4px_4px_0px_0px_#1C293C] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[5.5px_5.5px_0px_0px_#1C293C] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150 flex-1 text-center"
                >
                  <FaExternalLinkAlt className="w-4 h-4" /> {t("liveDemo")}
                </Link>

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 px-6 py-4 bg-[#FAF8F0] text-foreground border-3 border-foreground font-bold shadow-[4px_4px_0px_0px_#1C293C] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[5.5px_5.5px_0px_0px_#1C293C] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-150 flex-1 text-center"
                  >
                    <FaGithub className="w-4 h-4" /> {t("github")}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

        </div>

        {/* ===== FLOATING STATS CARDS ===== */}
        <motion.div
          variants={stagger.parent}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 lg:mb-16"
        >
          {[
            {
              icon: <FaCalendarAlt className="w-5 h-5 text-white" />,
              label: t("createdAt"),
              value: project.createdAt
                ? new Date(project.createdAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-",
              color: "bg-[#432DD7]"
            },
            {
              icon: <FaLayerGroup className="w-5 h-5 text-foreground" />,
              label: t("category"),
              value: project.tag?.join(", ") || "-",
              color: "bg-[#FDC800]"
            },
            {
              icon: <FaCogs className="w-5 h-5 text-white" />,
              label: t("technologies"),
              value: t("toolsCount", { count: project.tech_stack?.length || 0 }),
              color: "bg-foreground"
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={stagger.child}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="bg-card rounded-md p-5 border-3 border-foreground shadow-[4px_4px_0px_0px_#1C293C] transition-all duration-150 flex items-center gap-4"
            >
              <div className={`w-12 h-12 ${stat.color} border-2 border-foreground rounded-md flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-extrabold mb-0.5">
                  {stat.label}
                </p>
                <p className="text-sm font-black text-foreground truncate">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== DETAILED CONTENT SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-24">
          
          {/* Deskripsi Panjang (Tentang Proyek) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border-4 border-foreground p-6 lg:p-8 rounded-lg shadow-[6px_6px_0px_0px_#1C293C] h-full"
            >
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3.5">
                <span className="w-3.5 h-8 bg-[#FDC800] border-2 border-foreground rounded-sm"></span>
                {t("aboutProject")}
              </h2>
              
              {localizedLongDesc ? (
                <p className="text-foreground/80 leading-[1.95] text-[15px] font-medium whitespace-pre-line">
                  {localizedLongDesc}
                </p>
              ) : (
                <p className="text-foreground/50 italic">{t("noDescription") || "No detailed description available."}</p>
              )}
            </motion.div>
          </div>

          {/* Tech Stack List */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-card border-4 border-foreground p-6 rounded-lg shadow-[6px_6px_0px_0px_#1C293C] h-full flex flex-col"
            >
              <h2 className="text-xl lg:text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                <span className="w-3.5 h-8 bg-[#432DD7] border-2 border-foreground rounded-sm"></span>
                {t("techStack")}
              </h2>

              <div className="flex flex-wrap gap-2.5 my-auto">
                {project.tech_stack?.map((tech, i) => {
                  const icon = createIcon(tech);
                  return (
                    <motion.div
                      key={tech}
                      whileHover={{ y: -2, transition: { duration: 0.15 } }}
                      className="flex items-center gap-2 px-3 py-2 bg-[#FAF8F0] border-2 border-foreground rounded-md shadow-[2px_2px_0px_0px_#1C293C] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1C293C] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-150"
                    >
                      {icon && (
                        <span className="[&>svg]:w-4.5 [&>svg]:h-4.5 shrink-0">{icon}</span>
                      )}
                      <span className="text-xs font-bold text-foreground">
                        {tech}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>

        {/* ===== PAGES GALLERY (CLASSIC BROWSER MOCKUP WINDOW) ===== */}
        {project.pages && project.pages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            {/* Section Heading & Page Tab Selector */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-foreground flex items-center gap-3">
                  <span className="w-3.5 h-8 bg-[#FDC800] border-2 border-foreground rounded-sm"></span>
                  {t("websitePages")}
                </h2>
                <p className="text-foreground/60 mt-1 ml-7 text-sm font-bold">
                  {t("pageCount", { count: project.pages.length })}
                </p>
              </div>

              {/* Dynamic folder tabs layout for page choosing */}
              {project.pages.length > 1 && (
                <div className="flex flex-wrap gap-1.5 max-w-full overflow-x-auto pb-1 pl-7 xl:pl-0">
                  {project.pages.map((page, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePageTab(i)}
                      className={`px-4 py-2 border-3 border-foreground rounded-t-md text-xs font-bold transition-all duration-150 relative -bottom-[3px] z-10 ${
                        activePageTab === i
                          ? "bg-[#FAF8F0] text-foreground border-b-transparent shadow-[0px_-2px_0px_rgba(0,0,0,0.1)]"
                          : "bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)]"
                      }`}
                    >
                      {getLocalizedText(page.title, locale)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Browser Window mockup wrapper */}
            <div className="bg-card border-4 border-foreground rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_#1C293C] flex flex-col">
              
              {/* Browser Header Bar */}
              <div className="bg-[#FAF8F0] border-b-4 border-foreground py-3.5 px-4 flex flex-col sm:flex-row items-center gap-3 select-none shrink-0">
                {/* 3 dots & mock navigation buttons */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FA5252] border-2 border-foreground"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FAB005] border-2 border-foreground"></span>
                    <span className="w-3 h-3 rounded-full bg-[#40C057] border-2 border-foreground"></span>
                  </div>
                  <div className="flex gap-1 text-foreground/40 text-xs font-bold">
                    <span>&lt;</span>
                    <span>&gt;</span>
                    <span>↻</span>
                  </div>
                </div>

                {/* Mock Search/URL bar */}
                <div className="bg-white border-2 border-foreground rounded px-3 py-1 text-xs font-bold text-foreground/60 w-full sm:flex-1 text-left truncate flex items-center gap-2">
                  <FaLock className="text-[#40C057] w-3 h-3 shrink-0" />
                  <span>{mockUrl}</span>
                </div>
              </div>

              {/* Browser Viewport image */}
              <motion.div
                key={activePageTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer aspect-[16/10] w-full max-h-[560px] overflow-hidden"
                onClick={() => openLightbox(activePageTab)}
              >
                <Image
                  src={project.pages[activePageTab].image || DEFAULT_PROJECT_IMAGE}
                  alt={getLocalizedText(project.pages[activePageTab].title, locale)}
                  fill
                  className="object-cover group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                  sizes="100vw"
                  quality={90}
                />
                
                {/* Hover zoom overlay */}
                <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-primary text-foreground text-sm font-black px-5 py-3 border-3 border-foreground flex items-center gap-2 shadow-[4px_4px_0px_0px_#1C293C]">
                    <FaSearch className="w-4 h-4" /> {t("zoom")}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Thumbnail Grid for Page Switching (if pages > 1) */}
            {project.pages.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mt-6">
                {project.pages.map((page, index) => (
                  <motion.div
                    key={page._id || index}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className={`relative cursor-pointer rounded-md overflow-hidden border-3 shadow-[2.5px_2.5px_0px_0px_#1C293C] transition-all duration-150 ${
                      activePageTab === index
                        ? "border-[#432DD7] bg-primary"
                        : "border-foreground bg-card hover:bg-muted"
                    }`}
                    onClick={() => setActivePageTab(index)}
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={page.image || DEFAULT_PROJECT_IMAGE}
                        alt={getLocalizedText(page.title, locale)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 150px"
                        quality={60}
                      />
                    </div>
                    <div className="p-2.5 bg-card border-t-2 border-foreground">
                      <p className={`text-xs font-black truncate text-center ${activePageTab === index ? "text-[#432DD7]" : "text-foreground"}`}>
                        {getLocalizedText(page.title, locale)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </div>

      {/* ===== LIGHTBOX MODAL ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && project.pages?.[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/70 hover:text-white p-2.5 rounded-full hover:bg-white/10 transition-all z-20"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Title + counter */}
            <div className="absolute top-5 left-5 z-20">
              <p className="text-white font-bold text-lg">
                {getLocalizedText(project.pages[lightboxIndex].title, locale)}
              </p>
              <p className="text-white/50 text-sm">
                {lightboxIndex + 1} / {project.pages.length}
              </p>
            </div>

            {/* Prev */}
            {project.pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev > 0 ? prev - 1 : project.pages.length - 1
                  );
                }}
                className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-20"
              >
                <FaChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90vw] max-w-6xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.pages[lightboxIndex].image || DEFAULT_PROJECT_IMAGE}
                alt={getLocalizedText(project.pages[lightboxIndex].title, locale)}
                fill
                className="object-contain"
                sizes="90vw"
                quality={95}
              />
            </motion.div>

            {/* Next */}
            {project.pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev < project.pages.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-20"
              >
                <FaChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            )}

            {/* Thumbnail strip */}
            {project.pages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {project.pages.map((page, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(i);
                    }}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      lightboxIndex === i
                        ? "border-[#432DD7] scale-110"
                        : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={page.image || DEFAULT_PROJECT_IMAGE}
                      alt={getLocalizedText(page.title, locale)}
                      fill
                      className="object-cover"
                      sizes="64px"
                      quality={30}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
