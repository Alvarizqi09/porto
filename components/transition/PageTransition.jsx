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
      // Initial load — just fade content in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
      return;
    }

    prevPathRef.current = pathname;

    // Page change — overlay flash + content reveal
    const tl = gsap.timeline();

    // Quick overlay flash
    tl.fromTo(
      overlayRef.current,
      { opacity: 0.8 },
      { opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.6 }
    );

    // Content fades in with slight upward motion
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );
  }, [pathname]);

  return (
    <div>
      <div
        ref={overlayRef}
        className="h-screen w-screen fixed bg-primary top-0 pointer-events-none z-30"
        style={{ opacity: 0 }}
      />
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default PageTransition;
