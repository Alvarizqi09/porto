"use client";

import { useEffect, useState } from "react";

/**
 * GhibliBackground
 * 
 * A dreamy, layered background with:
 * - Gradient sky (dawn-to-day feel)
 * - Parallax floating clouds at different speeds/layers
 * - Distant mountain silhouettes
 * - Floating firefly particles
 * - Subtle grass silhouette at bottom
 */

// Deterministic random
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// Soft watercolor cloud SVG shape
const CloudShape = ({ width, opacity, className, style }) => (
  <svg
    width={width}
    viewBox="0 0 200 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ opacity, filter: "blur(2px)", ...style }}
  >
    <ellipse cx="100" cy="55" rx="90" ry="25" fill="white" fillOpacity="0.45" />
    <ellipse cx="65" cy="40" rx="45" ry="30" fill="white" fillOpacity="0.5" />
    <ellipse cx="130" cy="38" rx="50" ry="32" fill="white" fillOpacity="0.5" />
    <ellipse cx="100" cy="30" rx="35" ry="25" fill="white" fillOpacity="0.55" />
  </svg>
);

// Generate cloud items — subtle, peaceful watercolor clouds that don't overpower text
function generateClouds(count = 7) {
  const rand = seededRand(777);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    width: 140 + rand() * 180,
    y: 2 + rand() * 22,
    opacity: 0.15 + rand() * 0.22,
    speed: 90 + rand() * 110,
    startX: -(200 + rand() * 300),
    delay: -(rand() * 100),
    zIndex: Math.floor(rand() * 2),
  }));
}

// Generate fireflies
function generateFireflies(count = 18) {
  const rand = seededRand(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: 30 + rand() * 60,
    size: 3 + rand() * 5,
    duration: 3 + rand() * 5,
    delay: rand() * 8,
    driftX: (rand() - 0.5) * 60,
    driftY: -(20 + rand() * 40),
    driftX2: (rand() - 0.5) * 40,
    driftY2: -(40 + rand() * 60),
  }));
}

// Generate dust motes
function generateMotes(count = 12) {
  const rand = seededRand(99);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: 20 + rand() * 70,
    size: 2 + rand() * 3,
    duration: 6 + rand() * 8,
    delay: rand() * 10,
    opacity: 0.15 + rand() * 0.25,
  }));
}

const CLOUDS = generateClouds(8);
const FIREFLIES = generateFireflies(18);
const MOTES = generateMotes(12);

export default function GhibliBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes cloud-move {
          0% { transform: translateX(var(--start-x)); }
          100% { transform: translateX(calc(100vw + 300px)); }
        }
        .ghibli-cloud {
          position: absolute;
          will-change: transform;
          animation: cloud-move var(--speed) var(--delay) linear infinite;
          pointer-events: none;
        }
        @keyframes firefly-dance {
          0%, 100% { 
            opacity: 0; 
            transform: translate(0, 0) scale(0.5);
          }
          15% { 
            opacity: 0.9;
          }
          50% { 
            opacity: 0.6; 
            transform: translate(var(--drift-x), var(--drift-y)) scale(1);
          }
          85% {
            opacity: 0.3;
          }
        }
        .ghibli-firefly {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 168, 83, 0.9), rgba(212, 168, 83, 0) 70%);
          will-change: transform, opacity;
          animation: firefly-dance var(--duration) var(--delay) ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes mote-float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0);
          }
          30% {
            opacity: var(--mote-opacity);
          }
          70% {
            opacity: var(--mote-opacity);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .ghibli-mote {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 248, 240, 0.6);
          will-change: transform, opacity;
          animation: mote-float var(--duration) var(--delay) ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* Sky gradient background */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            #C5DCEA 0%,
            #D4E4ED 15%,
            #E3EDE5 35%,
            #EDE9DF 55%,
            #F0EDE5 75%,
            #F0EDE5 100%
          )`,
        }}
      />

      {/* Distant mountain silhouettes */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 z-0 pointer-events-none"
        style={{ height: "40vh" }}
      >
        {/* Far mountains */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          style={{ opacity: 0.12, height: "100%" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,224 C120,160,240,128,360,144 C480,160,540,200,660,176 C780,152,840,100,960,128 C1080,156,1200,200,1320,192 C1380,188,1440,196,1440,196 L1440,320 L0,320 Z"
            fill="#7BA98F"
            fillOpacity="0.3"
          />
        </svg>
        {/* Near hills */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          style={{ opacity: 0.08, height: "70%" }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,256 C180,220,300,240,480,224 C660,208,720,180,900,200 C1080,220,1200,248,1440,232 L1440,320 L0,320 Z"
            fill="#5A7A5A"
            fillOpacity="0.4"
          />
        </svg>
      </div>

      {/* Floating clouds layer */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {CLOUDS.map((cloud) => (
          <div
            key={cloud.id}
            className="ghibli-cloud"
            style={{
              top: `${cloud.y}%`,
              "--start-x": `${cloud.startX}px`,
              "--speed": `${cloud.speed}s`,
              "--delay": `${cloud.delay}s`,
              zIndex: cloud.zIndex,
            }}
          >
            <CloudShape width={cloud.width} opacity={cloud.opacity} />
          </div>
        ))}
      </div>

      {/* Fireflies layer (only after mount for smoothness) */}
      {mounted && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[1] overflow-hidden pointer-events-none"
        >
          {FIREFLIES.map((ff) => (
            <div
              key={ff.id}
              className="ghibli-firefly"
              style={{
                left: `${ff.x}%`,
                top: `${ff.y}%`,
                width: ff.size,
                height: ff.size,
                "--duration": `${ff.duration}s`,
                "--delay": `${ff.delay}s`,
                "--drift-x": `${ff.driftX}px`,
                "--drift-y": `${ff.driftY}px`,
              }}
            />
          ))}

          {/* Dust motes */}
          {MOTES.map((mote) => (
            <div
              key={`mote-${mote.id}`}
              className="ghibli-mote"
              style={{
                left: `${mote.x}%`,
                top: `${mote.y}%`,
                width: mote.size,
                height: mote.size,
                "--duration": `${mote.duration}s`,
                "--delay": `${mote.delay}s`,
                "--mote-opacity": mote.opacity,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

