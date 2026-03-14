"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import gsap from "gsap";

export default function RecommendationsCarousel() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await fetch("/api/recommendations");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const getValue = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[locale] || val.en || "";
  };

  // Auto-advance the active card
  useEffect(() => {
    if (!recommendations || recommendations.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % recommendations.length);
    }, 6000); // Change card every 6 seconds

    return () => clearInterval(interval);
  }, [recommendations]);

  if (isLoading || !recommendations || recommendations.length === 0) return null;

  // Let's create a cool "Stack" effect using Framer Motion (which is often easier for React state-driven 3D stacks than manual GSAP DOM manipulation, though both work). 
  // We'll show 3 cards at a time. The active one is in front.
  
  const visibleCards = [];
  for (let i = 0; i < 3; i++) {
    // Wrap around the array
    const idx = (activeIndex + i) % recommendations.length;
    visibleCards.push({ data: recommendations[idx], offset: i, originalIndex: idx });
  }

  return (
    <section className="py-16 pt-0 w-full overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center flex items-center gap-3">
            <FaLinkedin className="text-[#0A66C2]" /> recommendations
          </h2>
          <div className="w-20 h-1 bg-accent mt-4 rounded-full" />
        </motion.div>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-3xl mx-auto h-[530px] md:h-[450px] flex justify-center perspective-1000">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card) => {
              // Calculate styling based on its "depth" (offset)
              const isFront = card.offset === 0;
              const yOffset = card.offset * 20; // push down
              const scale = 1 - card.offset * 0.05; // shrink
              const opacity = 1 - card.offset * 0.2; // fade
              const zIndex = 30 - card.offset; // stack order
              
              return (
                <motion.div
                  key={`${card.originalIndex}-${card.offset}`} // Important for AnimatePresence
                  layout
                  initial={{ 
                    opacity: 0, 
                    y: 100, 
                    scale: 0.8,
                    rotateX: -10 
                  }}
                  animate={{ 
                    opacity: opacity, 
                    y: yOffset, 
                    scale: scale,
                    zIndex: zIndex,
                    rotateX: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -100, 
                    scale: 1.1,
                    filter: "blur(4px)"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "backOut" // Custom bouncy ease supported by Framer
                  }}
                  className={`absolute top-0 w-full h-full p-6 md:p-8 rounded-3xl border border-[#C5705D]/20 shadow-2xl flex flex-col items-center text-center overflow-hidden
                    ${isFront ? 'bg-[#DFD3C3] backdrop-blur-md' : 'bg-[#E5DACE] shadow-none pointer-events-none'}`}
                  style={{ transformOrigin: "top center" }}
                >
                  <RiDoubleQuotesL className="absolute top-4 left-6 text-[#C5705D] opacity-10 text-6xl md:text-8xl -rotate-12" />
                  
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-full border-4 border-white shadow-md relative overflow-hidden flex-shrink-0 z-10">
                    <Image
                      src={card.data.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(card.data.name) + "&background=random"}
                      alt={card.data.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <p className="text-[11px] md:text-sm text-black/80 font-medium italic mb-4 w-full max-w-2xl leading-relaxed z-10 flex-grow">
                    "{getValue(card.data.text)}"
                  </p>
                  
                  <div className="flex flex-col items-center z-10 mt-auto">
                    <h4 className="text-base md:text-lg font-bold text-black">{card.data.name}</h4>
                    <p className="text-[10px] md:text-xs text-accent font-semibold mt-1 uppercase tracking-wider line-clamp-1">{getValue(card.data.role)}</p>
                    <p className="text-[10px] text-black/50 mt-1">{getValue(card.data.date)}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Manual Navigation Controls */}
        <div className="flex justify-center gap-3 mt-8">
          {recommendations.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-8 bg-accent" : "w-2 bg-accent/30 hover:bg-accent/50"
              }`}
              aria-label={`Go to recommendation ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
