"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

export function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#FF6B6B", "#FFD166", "#4ECDC4", "#FF9F1C"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: ["circle", "triangle", "star"],
      },
      size: {
        value: { min: 2, max: 5 },
      },
    },
    detectRetina: true,
  }

  if (!init) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles id="tsparticles" options={particlesOptions as any} className="h-full w-full" />
    </div>
  )
}
