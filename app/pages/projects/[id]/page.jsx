"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { getIcon } from "@/utils/techIconMap";

const ICON_SIZE_CLASS = "w-8 h-8";
const createIcon = (name) => {
  return getIcon(name, ICON_SIZE_CLASS);
};

// ✅ API function (bisa pindah ke lib/projectsApi.js)
const fetchProjectById = async (id) => {
  const { data } = await axios.get(`/api/projects/${id}`);
  if (!data.success) {
    throw new Error(data.error || "Failed to fetch project");
  }
  return data.data;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // ✅ Fetch project dengan TanStack Query
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => fetchProjectById(params.id),
    enabled: !!params.id, // Only fetch when ID exists
    staleTime: 60000, // Cache 1 menit
    retry: 1, // Retry 1x jika gagal
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            {error ? "Error" : "Project Not Found"}
          </h1>
          <p className="text-gray-600 mb-8">
            {error?.message || "Proyek yang dicari tidak ditemukan."}
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
          >
            <FaArrowLeft /> Kembali
          </button>
        </div>
      </div>
    );
  }

  const techStackIcons =
    project.tech_stack?.map((tech) => createIcon(tech)).filter(Boolean) || [];

  // Lightbox handlers
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev > 0 ? prev - 1 : (project.pages?.length || 1) - 1
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev < (project.pages?.length || 1) - 1 ? prev + 1 : 0
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold mb-8 transition-colors"
        >
          <FaArrowLeft /> Kembali
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-accent"
          >
            <Image
              src={project.image}
              alt={`${project.title} - Project showcase image`}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            {/* Title & Tags */}
            <div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-bold text-black mb-4"
              >
                {project.title}
              </motion.h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tag?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 bg-accent text-white rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Short Description */}
              <p className="text-gray-700 text-lg mb-6">{project.desc}</p>

              {/* Long Description */}
              {project.long_desc && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-accent">
                  <h3 className="text-lg font-semibold text-black mb-3">
                    Tentang Project Ini
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {project.long_desc}
                  </p>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {techStackIcons.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-black mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-4">{techStackIcons}</div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 flex-wrap"
            >
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                <FaExternalLinkAlt /> Lihat Demo
              </Link>

              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  <FaGithub /> GitHub
                </Link>
              )}

              {project.preview && !project.github && (
                <Link
                  href={project.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  <FaExternalLinkAlt /> Lihat Source
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {/* Created Date */}
          {project.createdAt && (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                Dibuat Pada
              </h4>
              <p className="text-lg font-semibold text-black">
                {new Date(project.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          {/* Project Category */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Kategori
            </h4>
            <p className="text-lg font-semibold text-black">
              {project.tag?.join(", ") || "No category"}
            </p>
          </div>

          {/* Tech Count */}
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Teknologi
            </h4>
            <p className="text-lg font-semibold text-black">
              {project.tech_stack?.length || 0} tools
            </p>
          </div>
        </motion.div>

        {/* ===== Pages Gallery Section ===== */}
        {project.pages && project.pages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
              Halaman Website
            </h2>
            <p className="text-gray-500 mb-8">
              Berikut beberapa tampilan halaman dari website ini
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.pages.map((page, index) => (
                <motion.div
                  key={page._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative h-[220px] rounded-xl overflow-hidden shadow-lg border border-gray-200 group-hover:shadow-2xl group-hover:border-accent/50 transition-all duration-300">
                    <Image
                      src={page.image}
                      alt={page.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full">
                        Klik untuk memperbesar
                      </span>
                    </div>
                  </div>
                  <h4 className="mt-3 text-base font-semibold text-gray-800 group-hover:text-accent transition-colors">
                    {page.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ===== Lightbox Modal ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && project.pages?.[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* Image title */}
            <div className="absolute top-4 left-4 text-white z-10">
              <p className="text-lg font-semibold">
                {project.pages[lightboxIndex].title}
              </p>
              <p className="text-sm text-white/60">
                {lightboxIndex + 1} / {project.pages.length}
              </p>
            </div>

            {/* Prev button */}
            {project.pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.pages[lightboxIndex].image}
                alt={project.pages[lightboxIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
                quality={90}
              />
            </motion.div>

            {/* Next button */}
            {project.pages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

