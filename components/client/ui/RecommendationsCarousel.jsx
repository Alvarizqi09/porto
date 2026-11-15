"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { MessageSquareQuote } from "lucide-react";
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
    }, 7000);

    return () => clearInterval(interval);
  }, [recommendations]);

  if (isLoading || !recommendations || recommendations.length === 0) return null;

  const visibleCards = [];
  for (let i = 0; i < 3; i++) {
    const idx = (activeIndex + i) % recommendations.length;
    visibleCards.push({
      data: recommendations[idx],
      offset: i,
      originalIndex: idx,
    });
  }

  return (
    <section className="py-16 pt-4 w-full overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center mb-14"
        >
          <span className="text-primary font-display font-semibold text-sm tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <MessageSquareQuote className="w-4 h-4 text-primary" />
            <span>Words of Companions</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center flex items-center gap-3 text-foreground">
            <FaLinkedin className="text-[#0A66C2]" /> Recommendations
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-accent mt-3" />
        </motion.div>

        {/* Stacked Cards Container */}
        <div className="relative w-full max-w-3xl mx-auto h-[500px] md:h-[430px] flex justify-center perspective-1000">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card) => {
              const isFront = card.offset === 0;
              const yOffset = card.offset * 16;
              const scale = 1 - card.offset * 0.04;
              const opacity = 1 - card.offset * 0.25;
              const zIndex = 30 - card.offset;

              return (
                <motion.div
                  key={`${card.originalIndex}-${card.offset}`}
                  layout
                  initial={{
                    opacity: 0,
                    y: 80,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: opacity,
                    y: yOffset,
                    scale: scale,
                    zIndex: zIndex,
                  }}
                  exit={{
                    opacity: 0,
                    y: -60,
                    scale: 1.05,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`absolute top-0 w-full h-full p-8 md:p-10 rounded-3xl border border-foreground/15 shadow-nature-lg flex flex-col items-center text-center overflow-hidden transition-all duration-300
                    ${
                      isFront
                        ? "glass-card bg-[#FEFCF6]/90 backdrop-blur-md"
                        : "bg-[#F3EFE7]/80 backdrop-blur-sm pointer-events-none"
                    }`}
                  style={{ transformOrigin: "top center" }}
                >
                  {/* Whimsical double quote decoration */}
                  <RiDoubleQuotesL className="absolute top-5 left-6 text-primary/15 text-7xl md:text-8xl -rotate-6 pointer-events-none" />

                  {/* Avatar */}
                  <div className="w-18 h-18 md:w-20 md:h-20 mb-5 rounded-full border-2 border-primary/40 shadow-nature relative overflow-hidden flex-shrink-0 z-10 p-0.5 bg-card">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
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
                              )}&background=7BA98F&color=fff`
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
                  </div>

                  <p className="text-sm md:text-base text-foreground/85 font-medium italic mb-6 w-full max-w-2xl leading-relaxed z-10 flex-grow font-primary">
                    &ldquo;{getValue(card.data.text)}&rdquo;
                  </p>

                  <div className="flex flex-col items-center z-10 mt-auto">
                    <h3 className="text-base md:text-lg font-bold font-display text-foreground">
                      {card.data.name}
                    </h3>
                    <p className="text-xs text-foreground/70 font-semibold font-display mt-0.5 uppercase tracking-wider line-clamp-1">
                      {getValue(card.data.role)}
                    </p>
                    <p className="text-[11px] text-foreground/50 mt-1">
                      {getValue(card.data.date)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Soft rounded pagination pills */}
        <div className="flex justify-center gap-2 mt-10">
          {recommendations.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="p-1 cursor-pointer transition-all duration-300"
              aria-label={`Go to recommendation ${i + 1}`}
            >
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-8 bg-primary shadow-glow"
                    : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
