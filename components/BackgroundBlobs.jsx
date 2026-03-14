"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundBlobs() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["grab", "bubble"],
          },
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.4,
              color: "#C5705D",
            },
          },
          bubble: {
            distance: 200,
            size: 6,
            duration: 0.4,
            opacity: 0.8,
          },
          repulse: {
            distance: 250,
            duration: 0.6,
          },
        },
      },
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        color: {
          value: ["#C5705D", "#D0B8A8", "#b8a090", "#a07868"],
        },
        shape: {
          type: ["circle", "triangle"],
        },
        opacity: {
          value: { min: 0.15, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#D0B8A8",
          opacity: 0.15,
          width: 1,
          triangles: {
            enable: true,
            color: "#D0B8A8",
            opacity: 0.03,
          },
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 1.2 },
          direction: "none",
          outModes: {
            default: "bounce",
          },
          attract: {
            enable: true,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
        },
        wobble: {
          enable: true,
          distance: 8,
          speed: { min: -3, max: 3 },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03,
            color: "#C5705D",
            opacity: 0.7,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
    />
  );
}
