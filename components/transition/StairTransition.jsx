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

    // Phase 1: Columns sweep in from top (stagger)
    tl.to(columns, {
      scaleY: 1,
      duration: 0.4,
      ease: "power3.inOut",
      stagger: {
        each: 0.06,
        from: "start",
      },
    });

    // Phase 2: Columns sweep out to bottom (stagger from end)
    tl.to(
      columns,
      {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.4,
        ease: "power3.inOut",
        stagger: {
          each: 0.06,
          from: "end",
        },
      },
      "+=0.05"
    );
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen fixed top-0 left-0 right-0 pointer-events-none z-40 hidden"
      style={{ display: "none" }}
    >
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="stair-col h-full flex-1 bg-accent"
          style={{ transform: "scaleY(0)" }}
        />
      ))}
    </div>
  );
};

export default StairTransition;
