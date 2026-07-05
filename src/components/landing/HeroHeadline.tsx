"use client";

import { useState, useEffect } from "react";

const HEADLINES = [
  "Connect with the Brains Behind Bangladesh's Next Unicorns.",
  "The Definitive Map of Dhaka's Tech Operators and Innovators.",
  "Meet the Tech Founders Moving Bangladesh Forward.",
] as const;

export default function HeroHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsExiting(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HEADLINES.length);
        // Fade in
        setIsExiting(false);
      }, 350);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight tracking-tight max-w-4xl mx-auto min-h-[1.2em]">
      <span
        className={`inline-block transition-all duration-350 ease-in-out ${
          isExiting
            ? "opacity-0 -translate-y-3"
            : "opacity-100 translate-y-0"
        }`}
      >
        {HEADLINES[currentIndex]}
      </span>
    </h1>
  );
}
