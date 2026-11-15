"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import photo from "@/public/assets/Photo.png";
import { Sparkles, Code2 } from "lucide-react";

// Soft floating leaf SVG
const Leaf = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
  </svg>
);

// Soft sparkle
const Sparkle = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

const Photo = () => {
  return (
    <div className="w-[300px] h-[300px] xl:w-[440px] xl:h-[440px] relative select-none flex items-center justify-center">
      {/* ── SOFT WATERCOLOR AURA & BACKDROP RINGS ── */}

      {/* Ring 1: Soft sage green halo with breathing animation */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-tr from-primary/30 via-ghibli-sky/30 to-accent/20 blur-xl pointer-events-none"
      />

      {/* Ring 2: Organic paper/canvas frame */}
      <motion.div
        animate={{
          borderRadius: [
            "45% 55% 60% 40% / 50% 45% 55% 50%",
            "55% 45% 50% 50% / 45% 55% 45% 55%",
            "45% 55% 60% 40% / 50% 45% 55% 50%",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-2 bg-gradient-to-br from-[#FEFCF6] via-[#F4EFE6] to-[#E8E1D3] border-2 border-primary/25 shadow-nature-xl overflow-hidden pointer-events-none"
      />

      {/* Ring 3: Subtle inner glow border */}
      <div className="absolute inset-4 rounded-[42%_58%_65%_35%/48%_52%_48%_52%] border border-accent/20 pointer-events-none" />

      {/* ── PHOTO CONTAINER ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative w-[90%] h-[90%] flex items-end justify-center z-10 group"
      >
        <div className="relative w-full h-full overflow-hidden flex items-end justify-center">
          <Image
            src={photo}
            alt="Alvarizqi - Front-End Web Developer"
            priority
            quality={95}
            fill
            sizes="(max-width: 1280px) 280px, 400px"
            className="object-contain object-bottom drop-shadow-md group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </motion.div>

      {/* ── FLOATING NATURE BADGES (GHIBLI STYLE) ── */}

      {/* Badge Kiri Atas: Hello Traveler / Dev */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute -top-3 -left-3 xl:-left-6 z-20"
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="bg-card/95 backdrop-blur-md text-foreground px-4 py-2 rounded-full border border-primary/40 shadow-nature text-xs xl:text-sm font-bold font-display flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Hello, traveler!</span>
        </motion.div>
      </motion.div>

      {/* Badge Kanan Bawah: Web Craftsman */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute -bottom-2 -right-3 xl:-right-6 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="bg-card/95 backdrop-blur-md text-foreground px-4 py-2 rounded-full border border-accent/50 shadow-nature text-xs xl:text-sm font-bold font-display flex items-center gap-2"
        >
          <Code2 className="w-4 h-4 text-accent" />
          <span>Web Craftsman</span>
        </motion.div>
      </motion.div>

      {/* ── FLOATING DRIFTING LEAVES & SPARKLES ── */}
      {/* Leaf 1: Fluttering on the right */}
      <motion.div
        animate={{
          y: [-10, 15, -10],
          x: [0, 10, 0],
          rotate: [0, 25, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 -right-6 z-20 text-primary/70"
      >
        <Leaf className="w-6 h-6" />
      </motion.div>

      {/* Leaf 2: Lower left */}
      <motion.div
        animate={{
          y: [10, -12, 10],
          x: [0, -8, 0],
          rotate: [-15, 10, -15],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 -left-5 z-20 text-accent/60"
      >
        <Leaf className="w-5 h-5" />
      </motion.div>

      {/* Soft warm gold sparkle */}
      <motion.div
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.9, 0.4],
          rotate: [0, 90, 180],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-10 z-20 text-accent/70"
      >
        <Sparkle className="w-4 h-4" />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 0.7, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-6 left-12 z-20 text-primary/60"
      >
        <Sparkle className="w-3.5 h-3.5" />
      </motion.div>
    </div>
  );
};

export default Photo;
