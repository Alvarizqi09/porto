"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function RecommendationsCarousel() {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

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
          <div className="w-20 h-2.5 bg-primary border-2 border-foreground mt-4" />
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
                  className={`absolute top-0 w-full h-full p-6 md:p-8 rounded-md border-4 border-foreground shadow-neobrutal-card flex flex-col items-center text-center overflow-hidden
                    ${isFront ? 'bg-card' : 'bg-muted shadow-none pointer-events-none'}`}
                  style={{ transformOrigin: "top center" }}
                >
                  <RiDoubleQuotesL className="absolute top-4 left-6 text-primary opacity-20 text-6xl md:text-8xl -rotate-12" />
                  
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-4 rounded-md border-3 border-foreground shadow-[2.5px_2.5px_0px_0px_var(--border)] relative overflow-hidden flex-shrink-0 z-10 bg-background">
                    <Image
                      src={
                        card.data.image &&
                        card.data.image.trim() !== "" &&
                        card.data.image !== "null" &&
                        card.data.image !== "undefined" &&
                        !imageErrors[card.data._id]
                          ? card.data.image
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              card.data.name
                            )}&background=random`
                      }
                      alt={card.data.name}
                      fill
                      className="object-cover"
                      onError={() => {
                        setImageErrors((prev) => ({
                          ...prev,
                          [card.data._id]: true,
                        }));
                      }}
                    />
                  </div>
                  
                  <p className="text-[12px] md:text-sm text-foreground/90 font-medium italic mb-4 w-full max-w-2xl leading-relaxed z-10 flex-grow">
                    "{getValue(card.data.text)}"
                  </p>
                  
                  <div className="flex flex-col items-center z-10 mt-auto">
                    <h3 className="text-base md:text-lg font-bold text-foreground">{card.data.name}</h3>
                    <p className="text-[10px] md:text-xs text-foreground/80 font-bold mt-1 uppercase tracking-wider line-clamp-1">{getValue(card.data.role)}</p>
                    <p className="text-[10px] text-foreground/50 mt-1">{getValue(card.data.date)}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1 mt-8">
          {recommendations.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-8 h-8 cursor-pointer flex items-center justify-center"
              aria-label={`Go to recommendation ${i + 1}`}
            >
              <div 
                className={`h-4 w-4 border-2 border-foreground transition-all duration-150 shadow-[1px_1px_0px_0px_var(--border)] ${
                  activeIndex === i ? "bg-primary scale-110" : "bg-card hover:bg-primary/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
