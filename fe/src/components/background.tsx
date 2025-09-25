"use client";

import { useEffect, useRef } from "react";
import "@/styles/tailwind.css";

export function Background() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const colors = [
      "rgba(139, 92, 246,", // purple
      "rgba(16, 185, 129,", // green
      "rgba(59, 130, 246,", // blue
      "rgba(168, 85, 247,", // violet
      "rgba(34, 197, 94,",  // green bright
    ];

    const orbsCount = 10; // số orb
    for (let i = 0; i < orbsCount; i++) {
      const orbElement = document.createElement("div");
      orbElement.className = "orb fixed pointer-events-none animate-float";

      // Random size 50px - 200px
      const size = 50 + Math.random() * 150;
      orbElement.style.setProperty("--size", `${size}px`);

      // Random color + opacity 0.2 - 0.5
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = 0.2 + Math.random() * 0.3;
      orbElement.style.setProperty("--color", `${color} ${opacity})`);

      // Random float animation
      orbElement.style.setProperty("--dx", `${(Math.random() - 0.5) * 1500}px`);
      orbElement.style.setProperty("--dy", `${(Math.random() - 0.5) * 1500}px`);
      orbElement.style.setProperty("--scale", `${1 + Math.random() * 0.5}`);
      orbElement.style.setProperty("--duration", `${5 + Math.random() * 5}s`);
      orbElement.style.setProperty("--delay", `${Math.random() * -5}s`);
      orbElement.style.filter = `blur(${10 + Math.random() * 30}px)`;
      // orbElement.style.opacity = `${0.2 + Math.random() * 0.3}`;

      // Random position top/left
      orbElement.style.top = `${Math.random() * 100}%`;
      orbElement.style.left = `${Math.random() * 100}%`;

      mountRef.current?.appendChild(orbElement);
    }

    return () => {
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 overflow-hidden -z-10" />;
}

export default Background;
