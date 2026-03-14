"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Interactive dot grid background.
 * Dots react to the mouse cursor — they grow, glow, and
 * connect with subtle lines when the cursor is nearby.
 * Uses Canvas API for smooth 60fps performance.
 */

const DOT_SPACING = 35;
const DOT_BASE_RADIUS = 1.5;
const DOT_MAX_RADIUS = 5;
const MOUSE_RADIUS = 150;
const LINE_DISTANCE = 100;
const DOT_COLOR = "197, 112, 93"; // accent #C5705D in rgb
const LINE_COLOR = "208, 184, 168"; // #D0B8A8 in rgb

export default function BackgroundBlobs() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);
  const dotsRef = useRef([]);

  const initDots = useCallback((width, height) => {
    const dots = [];
    const cols = Math.ceil(width / DOT_SPACING) + 1;
    const rows = Math.ceil(height / DOT_SPACING) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * DOT_SPACING,
          y: row * DOT_SPACING,
          baseX: col * DOT_SPACING,
          baseY: row * DOT_SPACING,
          radius: DOT_BASE_RADIUS,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    const mouse = mouseRef.current;
    const dots = dotsRef.current;

    ctx.clearRect(0, 0, width, height);

    // Draw connections first (behind dots)
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const dx = mouse.x - dot.baseX;
      const dy = mouse.y - dot.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS) {
        // Find nearby dots to connect
        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j];
          const odx = mouse.x - other.baseX;
          const ody = mouse.y - other.baseY;
          const odist = Math.sqrt(odx * odx + ody * ody);

          if (odist < MOUSE_RADIUS) {
            const ddx = dot.baseX - other.baseX;
            const ddy = dot.baseY - other.baseY;
            const dotDist = Math.sqrt(ddx * ddx + ddy * ddy);

            if (dotDist < LINE_DISTANCE) {
              const alpha = Math.max(0, (1 - dist / MOUSE_RADIUS) * (1 - odist / MOUSE_RADIUS)) * 0.3;
              ctx.beginPath();
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }
    }

    // Draw dots
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const dx = mouse.x - dot.baseX;
      const dy = mouse.y - dot.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS) {
        const factor = 1 - dist / MOUSE_RADIUS;
        // Dots push away slightly from cursor
        const pushX = (dx / dist) * factor * -8;
        const pushY = (dy / dist) * factor * -8;
        dot.x = dot.baseX + pushX;
        dot.y = dot.baseY + pushY;
        dot.radius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * factor;

        const alpha = 0.15 + factor * 0.6;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR}, ${alpha})`;
        ctx.fill();
      } else {
        dot.x = dot.baseX;
        dot.y = dot.baseY;
        dot.radius = DOT_BASE_RADIUS;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_BASE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR}, 0.12)`;
        ctx.fill();
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = document.documentElement;
      canvas.width = rect.clientWidth * dpr;
      canvas.height = Math.max(rect.scrollHeight, rect.clientHeight) * dpr;
      canvas.style.width = rect.clientWidth + "px";
      canvas.style.height = Math.max(rect.scrollHeight, rect.clientHeight) + "px";

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      initDots(rect.clientWidth, Math.max(rect.scrollHeight, rect.clientHeight));
    };

    const handleMouse = (e) => {
      mouseRef.current = {
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    animRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initDots, draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-0"
    />
  );
}
