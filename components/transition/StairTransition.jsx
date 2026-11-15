"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const StairTransition = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    const container = containerRef.current;
    if (!container) return;

    const columns = container.querySelectorAll(".stair-col");

    // Reset columns
    gsap.set(columns, { scaleY: 0, transformOrigin: "top" });
    gsap.set(container, { display: "flex" });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(container, { display: "none" });
      },
    });

    // Phase 1: Columns sweep down softly like morning mist
    tl.to(columns, {
      scaleY: 1,
      duration: 0.35,
      ease: "power2.inOut",
      stagger: {
        each: 0.04,
        from: "start",
      },
    });

    // Phase 2: Columns sweep away
    tl.to(
      columns,
      {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.35,
        ease: "power2.inOut",
        stagger: {
          each: 0.04,
          from: "end",
        },
      },
      "+=0.03"
    );
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 hidden"
      style={{ display: "none" }}
    >
      {[
        "rgba(184, 212, 227, 0.9)", // Soft sky blue
        "rgba(197, 220, 234, 0.9)", // Muted sky
        "rgba(227, 237, 229, 0.9)", // Soft sage
        "rgba(123, 169, 143, 0.85)", // Primary sage
        "rgba(212, 168, 83, 0.8)", // Soft warm gold
        "rgba(237, 233, 223, 0.9)", // Parchment
        "rgba(184, 212, 227, 0.85)", // Sky
      ].map((color, i) => (
        <div
          key={i}
          className="stair-col h-full flex-1"
          style={{ transform: "scaleY(0)", backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default StairTransition;
