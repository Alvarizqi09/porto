"use client";

import { useEffect, useRef } from "react";

/**
 * NeobrutalBackground
 *
 * A pure CSS + vanilla canvas-free approach: a fixed <div> containing
 * randomly-placed SVG geometric shapes (squares, crosses, plus signs, circles)
 * that drift very slowly using CSS keyframe animations.
 *
 * Colors are pulled from the site's CSS variables so it adapts to light/dark mode.
 */

const SHAPES = [
  // type, viewBox, path
  {
    type: "square",
    size: 24,
    el: (color, fill) => (
      <rect
        x="2" y="2" width="20" height="20"
        stroke={color} strokeWidth="2.5" fill={fill}
      />
    ),
  },
  {
    type: "cross",
    size: 24,
    el: (color) => (
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <line x1="4" y1="4" x2="20" y2="20" />
        <line x1="20" y1="4" x2="4" y2="20" />
      </g>
    ),
  },
  {
    type: "plus",
    size: 24,
    el: (color) => (
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </g>
    ),
  },
  {
    type: "circle",
    size: 24,
    el: (color, fill) => (
      <circle
        cx="12" cy="12" r="9"
        stroke={color} strokeWidth="2.5" fill={fill}
      />
    ),
  },
  {
    type: "diamond",
    size: 24,
    el: (color, fill) => (
      <polygon
        points="12,2 22,12 12,22 2,12"
        stroke={color} strokeWidth="2.5" fill={fill}
      />
    ),
  },
  {
    type: "triangle",
    size: 24,
    el: (color, fill) => (
      <polygon
        points="12,3 22,21 2,21"
        stroke={color} strokeWidth="2.5" fill={fill}
      />
    ),
  },
];

// Deterministic-ish pseudo-random from a seed
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateItems(count = 40) {
  const rand = seededRand(42);
  const items = [];
  for (let i = 0; i < count; i++) {
    const shapeIdx = Math.floor(rand() * SHAPES.length);
    // 3 colors: yellow, blue-violet (light mode accent), electric violet (dark mode accent)
    const colorRoll = rand();
    const colorChoice = colorRoll < 0.45 ? "primary" : colorRoll < 0.75 ? "accent" : "violet";
    const size = 16 + Math.floor(rand() * 32); // 16–48 px
    const opacity = 0.10 + rand() * 0.18; // slightly more visible
    const x = rand() * 100;
    const y = rand() * 100;
    const duration = 18 + rand() * 30;
    const delay = -(rand() * 30);
    const drift = (rand() - 0.5) * 120;
    const driftY = (rand() - 0.5) * 80;
    const rotation = Math.floor(rand() * 360);
    const rotateDelta = (rand() - 0.5) * 180;
    const filled = rand() > 0.6;

    items.push({
      id: i,
      shapeIdx,
      colorChoice,
      size,
      opacity,
      x,
      y,
      duration,
      delay,
      drift,
      driftY,
      rotation,
      rotateDelta,
      filled,
    });
  }
  return items;
}

const ITEMS = generateItems(42);

export default function BackgroundBlobs() {
  return (
    <>
      <style>{`
        @keyframes neo-drift {
          0%   { transform: translate(0, 0) rotate(var(--rot-start)); }
          50%  { transform: translate(var(--drift-x), var(--drift-y)) rotate(var(--rot-mid)); }
          100% { transform: translate(0, 0) rotate(var(--rot-start)); }
        }
        .neo-shape {
          position: absolute;
          will-change: transform;
          animation: neo-drift var(--duration) var(--delay) ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {ITEMS.map((item) => {
          const shape = SHAPES[item.shapeIdx];
          // Colors: "primary" = yellow (#FDC800), "accent" = blue-violet (#432DD7)
          const stroke =
            item.colorChoice === "primary"
              ? "#FDC800"
              : item.colorChoice === "violet"
              ? "#7B61FF"
              : "#432DD7";
          const fill = item.filled
            ? item.colorChoice === "primary"
              ? "#FDC800"
              : item.colorChoice === "violet"
              ? "#7B61FF"
              : "#432DD7"
            : "none";

          return (
            <div
              key={item.id}
              className="neo-shape"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: item.size,
                height: item.size,
                opacity: item.opacity,
                "--duration": `${item.duration}s`,
                "--delay": `${item.delay}s`,
                "--drift-x": `${item.drift}px`,
                "--drift-y": `${item.driftY}px`,
                "--rot-start": `${item.rotation}deg`,
                "--rot-mid": `${item.rotation + item.rotateDelta}deg`,
              }}
            >
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {shape.el(stroke, fill)}
              </svg>
            </div>
          );
        })}
      </div>
    </>
  );
}
