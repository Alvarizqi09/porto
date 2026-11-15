"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current === pathname) {
      // Initial load — dreamy gentle fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.1,
          clearProps: "transform",
        }
      );
      return;
    }

    prevPathRef.current = pathname;

    // Page change — soft mist wipe + smooth content reveal
    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0.6 },
      { opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "transform",
      },
      "-=0.3"
    );
  }, [pathname]);

  return (
    <div>
      <div
        ref={overlayRef}
        className="h-screen w-screen fixed inset-0 bg-[#F0EDE5]/70 backdrop-blur-sm pointer-events-none z-30"
        style={{ opacity: 0 }}
      />
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default PageTransition;
