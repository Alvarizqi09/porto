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
} from "react-icons/fa";
import { AlertCircle, BookOpen, Code2, Layers } from "lucide-react";
import { getIcon } from "@/utils/techIconMap";
import { ProjectDetailSkeleton } from "@/components/ui/Skeleton";
import { useTranslations, useLocale } from "next-intl";
import { getLocalizedText } from "@/utils/localization";
import { DEFAULT_PROJECT_IMAGE } from "@/utils/imageFallback";

const ICON_SIZE_CLASS = "w-6 h-6";
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
    initial: { opacity: 0, y: 15 },
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

  if (isLoading) return <ProjectDetailSkeleton />;

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-10 rounded-3xl border border-foreground/15 shadow-nature-xl max-w-md w-full"
        >
          <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-5 text-primary">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground mb-3">
            {error ? t("errorTitle") : t("notFoundTitle")}
          </h1>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {error?.message || t("notFoundDesc")}
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold font-display shadow-nature hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaArrowLeft /> {t("back")}
          </button>
        </motion.div>
      </div>
    );
  }

  const localizedTitle = getLocalizedText(project.title, locale);
  const localizedDesc = getLocalizedText(project.desc, locale);
  const localizedLongDesc = getLocalizedText(project.long_desc, locale);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-8 lg:py-14 relative z-10"
    >
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-card border border-foreground/15 text-foreground rounded-full shadow-nature hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm font-semibold font-display"
          >
            <FaArrowLeft className="w-3.5 h-3.5 text-primary" /> {t("back")}
          </motion.button>

          <div className="hidden sm:flex items-center gap-2">
            {project.tag?.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-primary/15 text-foreground border border-primary/30 rounded-full text-xs font-bold font-display uppercase tracking-wider shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Main Banner Canvas */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="glass-card bg-[#FEFCF6]/90 border border-foreground/15 rounded-3xl overflow-hidden shadow-nature-xl flex flex-col p-3"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white shadow-inner">
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

          {/* Title, Short Description & CTAs */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex sm:hidden flex-wrap gap-2">
                {project.tag?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/15 text-foreground border border-primary/30 rounded-full text-[11px] font-bold font-display uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-display text-foreground leading-tight">
                  {localizedTitle}
                </h1>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
              </div>

              <div className="border-l-4 border-primary/40 pl-4">
                <p className="text-base text-foreground/80 leading-relaxed font-medium">
                  {localizedDesc}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-full font-bold font-display shadow-nature hover:shadow-glow hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex-1 text-center"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" /> {t("liveDemo")}
                </Link>

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 glass-card text-foreground border border-foreground/20 rounded-full font-bold font-display shadow-nature hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex-1 text-center"
                  >
                    <FaGithub className="w-4 h-4 text-foreground/80" /> {t("github")}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stats Cards */}
        <motion.div
          variants={stagger.parent}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 lg:mb-16"
        >
          {[
            {
              icon: <FaCalendarAlt className="w-5 h-5 text-primary" />,
              label: t("createdAt"),
              value: project.createdAt
                ? new Date(project.createdAt).toLocaleDateString(
                    locale === "id" ? "id-ID" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : "-",
            },
            {
              icon: <FaLayerGroup className="w-5 h-5 text-accent" />,
              label: t("category"),
              value: project.tag?.join(", ") || "-",
            },
            {
              icon: <FaCogs className="w-5 h-5 text-ghibli-forest" />,
              label: t("technologies"),
              value: t("toolsCount", { count: project.tech_stack?.length || 0 }),
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={stagger.child}
              className="glass-card bg-[#FEFCF6]/85 rounded-2xl p-5 border border-foreground/15 shadow-nature hover:shadow-nature-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-card rounded-xl border border-foreground/10 flex items-center justify-center shrink-0 shadow-sm">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-foreground/50 uppercase tracking-wider font-semibold font-display mb-0.5">
                  {stat.label}
                </p>
                <p className="text-sm font-bold font-display text-foreground truncate">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Content & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* About Project */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-6 lg:p-8 rounded-3xl shadow-nature h-full"
            >
              <h2 className="text-2xl font-bold font-display text-foreground mb-5 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                {t("aboutProject")}
              </h2>

              {localizedLongDesc ? (
                <p className="text-foreground/80 leading-[1.9] text-[15px] whitespace-pre-line font-medium">
                  {localizedLongDesc}
                </p>
              ) : (
                <p className="text-foreground/50 italic">
                  {t("noDescription") || "No detailed description available."}
                </p>
              )}
            </motion.div>
          </div>

          {/* Tech Stack List */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass-card bg-[#FEFCF6]/85 border border-foreground/15 p-6 rounded-3xl shadow-nature h-full flex flex-col"
            >
              <h2 className="text-xl font-bold font-display text-foreground mb-5 flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-accent" />
                {t("techStack")}
              </h2>

              <div className="flex flex-wrap gap-2.5 my-auto">
                {project.tech_stack?.map((tech) => {
                  const icon = createIcon(tech);
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3.5 py-2 bg-card/80 border border-foreground/15 rounded-xl shadow-sm hover:border-primary/50 hover:bg-card hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {icon && (
                        <span className="shrink-0 text-foreground/80">{icon}</span>
                      )}
                      <span className="text-xs font-semibold font-display text-foreground">
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Pages Gallery */}
        {project.pages && project.pages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold font-display text-foreground flex items-center gap-2.5">
                  <Layers className="w-6 h-6 text-primary" />
                  {t("websitePages")}
                </h2>
                <p className="text-foreground/60 mt-1 text-sm">
                  {t("pageCount", { count: project.pages.length })}
                </p>
              </div>

              {project.pages.length > 1 && (
                <div className="flex flex-wrap gap-1.5 max-w-full overflow-x-auto pb-1">
                  {project.pages.map((page, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePageTab(i)}
                      className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 ${
                        activePageTab === i
                          ? "bg-primary text-white shadow-nature font-bold"
                          : "bg-card/90 text-foreground hover:bg-card hover:text-primary border border-foreground/15 font-semibold"
                      }`}
                    >
                      {getLocalizedText(page.title, locale)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Display Viewport */}
            <div className="glass-card bg-[#FEFCF6]/90 border border-foreground/15 rounded-3xl p-3 shadow-nature-xl overflow-hidden">
              <motion.div
                key={activePageTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer aspect-[16/10] w-full max-h-[580px] overflow-hidden rounded-2xl bg-white"
                onClick={() => openLightbox(activePageTab)}
              >
                <Image
                  src={
                    project.pages[activePageTab].image || DEFAULT_PROJECT_IMAGE
                  }
                  alt={getLocalizedText(
                    project.pages[activePageTab].title,
                    locale
                  )}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  sizes="100vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-[#3D4F3D]/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-card/90 text-foreground text-sm font-bold font-display px-5 py-2.5 rounded-full border border-white/60 shadow-nature-lg flex items-center gap-2">
                    <FaSearch className="w-3.5 h-3.5 text-primary" /> {t("zoom")}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Thumbnails */}
            {project.pages.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mt-6">
                {project.pages.map((page, index) => (
                  <div
                    key={page._id || index}
                    className={`relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-200 shadow-sm hover:-translate-y-1 ${
                      activePageTab === index
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-foreground/15 hover:border-foreground/35"
                    }`}
                    onClick={() => setActivePageTab(index)}
                  >
                    <div className="relative aspect-[16/10] w-full bg-white">
                      <Image
                        src={page.image || DEFAULT_PROJECT_IMAGE}
                        alt={getLocalizedText(page.title, locale)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 150px"
                        quality={60}
                      />
                    </div>
                    <div className="p-2 bg-card/90 text-center">
                      <p className="text-xs font-semibold font-display text-foreground truncate">
                        {getLocalizedText(page.title, locale)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && project.pages?.[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3D4F3D]/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all z-20"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="absolute top-6 left-6 z-20">
              <p className="text-white font-bold font-display text-lg">
                {getLocalizedText(project.pages[lightboxIndex].title, locale)}
              </p>
              <p className="text-white/60 text-xs">
                {lightboxIndex + 1} / {project.pages.length}
              </p>
            </div>

            {project.pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev > 0 ? prev - 1 : project.pages.length - 1
                  );
                }}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all z-20"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-[90vw] max-w-5xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  project.pages[lightboxIndex].image || DEFAULT_PROJECT_IMAGE
                }
                alt={getLocalizedText(
                  project.pages[lightboxIndex].title,
                  locale
                )}
                fill
                className="object-contain"
                sizes="90vw"
                quality={95}
              />
            </motion.div>

            {project.pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev < project.pages.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all z-20"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
