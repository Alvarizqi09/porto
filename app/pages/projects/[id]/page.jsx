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
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {error ? t("errorTitle") : t("notFoundTitle")}
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {error?.message || t("notFoundDesc")}
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {/* ===== HERO SECTION — Full-width banner with overlay ===== */}
      <div className="relative w-full h-[50vh] lg:h-[60vh] overflow-hidden">
        <Image
          src={project.image || DEFAULT_PROJECT_IMAGE}
          alt={`${localizedTitle} - Project showcase`}
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        {/* Back button - floating */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ x: -4 }}
          onClick={() => router.back()}
          className="absolute top-6 left-6 lg:top-8 lg:left-10 z-10 inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-md text-white rounded-full hover:bg-white/25 transition-all duration-300 text-sm font-medium border border-white/20"
        >
          <FaArrowLeft className="w-3.5 h-3.5" /> {t("back")}
        </motion.button>

        {/* Hero text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute bottom-0 left-0 right-0 p-6 lg:p-16"
        >
          <div className="container mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tag?.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 bg-accent/90 backdrop-blur-sm text-white rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {localizedTitle}
            </h1>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl leading-relaxed">
              {localizedDesc}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ===== FLOATING STATS CARDS ===== */}
      <div className="container mx-auto px-4">
        <motion.div
          variants={stagger.parent}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-10 relative z-10 mb-12"
        >
          {[
            {
              icon: <FaCalendarAlt className="w-5 h-5 text-accent" />,
              label: t("createdAt"),
              value: project.createdAt
                ? new Date(project.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "-",
            },
            {
              icon: <FaLayerGroup className="w-5 h-5 text-accent" />,
              label: t("category"),
              value: project.tag?.join(", ") || "-",
            },
            {
              icon: <FaCogs className="w-5 h-5 text-accent" />,
              label: t("technologies"),
              value: t("toolsCount", { count: project.tech_stack?.length || 0 }),
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={stagger.child}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4 border border-gray-100"
            >
              <div className="w-11 h-11 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {stat.label}
                </p>
                <p className="text-sm font-bold text-gray-900 truncate">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== MAIN CONTENT — 2 (content) + 1 (sidebar) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left — Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            {localizedLongDesc && (
              <div className="mb-10">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-accent rounded-full" />
                  {t("aboutProject")}
                </h2>
                <p className="text-gray-600 leading-[1.85] whitespace-pre-wrap text-[15px]">
                  {localizedLongDesc}
                </p>
              </div>
            )}

            {/* Tech Stack — inside main content */}
            {techStackIcons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="w-1 h-7 bg-accent rounded-full" />
                  {t("techStack")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.tech_stack?.map((tech, i) => {
                    const icon = createIcon(tech);
                    return (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i }}
                        whileHover={{ y: -3, transition: { duration: 0.15 } }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-200"
                      >
                        {icon && (
                          <span className="[&>svg]:w-5 [&>svg]:h-5">{icon}</span>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {tech}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right — Sidebar (CTA + Links) */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-4 sticky top-24">
              <h3 className="text-base font-bold text-gray-900 mb-1">
                {t("viewProject")}
              </h3>

              {/* Demo Button */}
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <FaExternalLinkAlt className="w-4 h-4" /> {t("liveDemo")}
              </Link>

              {/* GitHub */}
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <FaGithub className="w-4 h-4" /> {t("github")}
                </Link>
              )}

              {/* Preview / Source */}
              {project.preview && (
                <Link
                  href={project.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all duration-300 border border-gray-200"
                >
                  <FaExternalLinkAlt className="w-4 h-4" /> {t("sourceCode")}
                </Link>
              )}
            </div>
          </motion.aside>
        </div>

        {/* ===== PAGES GALLERY SECTION ===== */}
        {project.pages && project.pages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 mb-16"
          >
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="w-1 h-8 bg-accent rounded-full" />
                  {t("websitePages")}
                </h2>
                <p className="text-gray-400 mt-1 ml-4 text-sm">
                  {t("pageCount", { count: project.pages.length })}
                </p>
              </div>

              {/* Page tabs / pills */}
              {project.pages.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto pb-1 ml-4 sm:ml-0">
                  {project.pages.map((page, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePageTab(i)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                        activePageTab === i
                          ? "bg-accent text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {getLocalizedText(page.title, locale)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Featured large preview (active tab) */}
            <motion.div
              key={activePageTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl border border-gray-200 mb-6 h-[300px] sm:h-[400px] lg:h-[500px]"
              onClick={() => openLightbox(activePageTab)}
            >
              <Image
                src={project.pages[activePageTab].image || DEFAULT_PROJECT_IMAGE}
                alt={getLocalizedText(project.pages[activePageTab].title, locale)}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                sizes="100vw"
                quality={85}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <h3 className="text-white text-lg font-bold drop-shadow-lg">
                    {getLocalizedText(project.pages[activePageTab].title, locale)}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {activePageTab + 1} / {project.pages.length}
                  </p>
                </div>
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
                  <FaSearch className="w-3 h-3" /> {t("zoom")}
                </span>
              </div>
            </motion.div>

            {/* Thumbnail grid (if more than 1 page) */}
            {project.pages.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {project.pages.map((page, index) => (
                  <motion.div
                    key={page._id || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activePageTab === index
                        ? "border-accent shadow-lg ring-2 ring-accent/20"
                        : "border-gray-200 hover:border-accent/40 hover:shadow-md"
                    }`}
                    onClick={() => setActivePageTab(index)}
                  >
                    <div className="relative h-[100px] sm:h-[110px]">
                      <Image
                        src={page.image || DEFAULT_PROJECT_IMAGE}
                        alt={getLocalizedText(page.title, locale)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        quality={60}
                      />
                      {activePageTab === index && (
                        <div className="absolute inset-0 bg-accent/10" />
                      )}
                    </div>
                    <div className="p-2 bg-white">
                      <p
                        className={`text-xs font-semibold truncate ${
                          activePageTab === index
                            ? "text-accent"
                            : "text-gray-600"
                        }`}
                      >
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
              <p className="text-white font-semibold text-lg">
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
                        ? "border-accent ring-1 ring-accent/50 scale-110"
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
