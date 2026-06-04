"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import photo from "@/public/assets/Photo.png";

// Simple decorative star SVG path
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FDC800]" fill="currentColor" stroke="black" strokeWidth="2">
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

const Photo = () => {
  return (
    <div className="w-[300px] h-[300px] xl:w-[440px] xl:h-[440px] relative select-none">
      
      {/* ── BACKGROUND FRAME STACK (Tumpukan Frame Neobrutalisme) ── */}
      
      {/* Frame 1: Kuning (Paling Belakang, Rotasi Kiri) */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: -4 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="absolute inset-0 bg-[#FDC800] border-4 border-foreground rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] pointer-events-none"
      />

      {/* Frame 2: Indigo/Ungu (Tengah, Rotasi Kanan) */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 3 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="absolute inset-0 bg-[#432DD7] border-4 border-foreground rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] pointer-events-none"
      />

      {/* Frame 3: Frame Foto Utama (Krem, Tegak, Shadow Tebal) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="absolute inset-0 bg-[#FAF8F0] border-4 border-foreground rounded-lg shadow-[6px_6px_0px_0px_#1C293C] overflow-hidden flex items-end justify-center group"
      >
        {/* Halftone / Grid Pattern overlay inside the photo background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1c293c 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px"
          }}
        />
        
        {/* Image wrapper */}
        <div className="relative w-[92%] h-[92%] overflow-hidden rounded-md group-hover:scale-[1.02] transition-transform duration-500">
          <Image
            src={photo}
            alt="Alvarizqi - Front-End Web Developer Portrait"
            priority
            quality={90}
            fill
            sizes="(max-width: 1280px) 280px, 400px"
            className="object-contain object-bottom"
          />
        </div>
      </motion.div>

      {/* ── STICKERS / BADGES MENGAMBANG (Interactive Badges) ── */}

      {/* Badge Kiri Atas: HELLO! */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="absolute -top-4 -left-6 z-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="bg-[#FDC800] text-foreground border-3 border-foreground px-4 py-2 font-black text-sm rounded-md shadow-[3px_3px_0px_0px_#1C293C] rotate-[-8deg] flex items-center gap-1.5"
        >
          <span>👋</span>
          <span>HELLO!</span>
        </motion.div>
      </motion.div>

      {/* Badge Kanan Bawah: WEB DEV */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute -bottom-3 -right-6 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="bg-[#FAF8F0] text-foreground border-3 border-foreground px-4 py-2 font-black text-sm rounded-md shadow-[3px_3px_0px_0px_#1C293C] rotate-[6deg] flex items-center gap-2"
        >
          <span>💻</span>
          <span>WEB DEV</span>
        </motion.div>
      </motion.div>

      {/* Floating Sparkle/Star Kanan Atas */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 -right-4 z-10"
      >
        <SparkleIcon />
      </motion.div>

      {/* Floating Sparkle/Star Kiri Bawah */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-16 -left-5 z-10"
      >
        <SparkleIcon />
      </motion.div>

    </div>
  );
};

export default Photo;
