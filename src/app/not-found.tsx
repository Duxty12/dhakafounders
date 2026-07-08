"use client";

import Link from "next/link";
import { ArrowLeft, Home, Compass, Frown } from "lucide-react";
import { useEffect, useRef } from "react";

/* ── Floating particle canvas ─────────────────────────────────────────────── */

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    /* Create particles */
    const COUNT = 35;
    type Particle = {
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number;
    };

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 115, 190, ${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    />
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-white to-[#EFF6FF] flex flex-col items-center justify-center pt-24 pb-12 px-4">

      {/* Decorative blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] bg-[#1E73BE]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-[#1E73BE]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EFF6FF]/60 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <ParticleCanvas />

      {/* Content card */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#1E73BE]/20 rounded-full mb-10 shadow-sm">
          <span className="text-base" aria-hidden="true">🇧🇩</span>
          <span className="text-xs font-semibold text-[#1E73BE] tracking-wide uppercase">
            Dhaka Founders
          </span>
        </div>

        {/* Giant 404 */}
        <div className="relative select-none mb-4">
          {/* Shadow layer */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-[160px] sm:text-[200px] font-extrabold text-[#1E73BE]/10 translate-x-1 translate-y-1 leading-none"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            404
          </span>
          {/* Main layer */}
          <span
            className="relative flex items-center justify-center text-[160px] sm:text-[200px] font-extrabold leading-none bg-gradient-to-b from-[#1E73BE] to-[#1a68ab] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
          >
            404
          </span>
        </div>

        {/* Frown icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#1E73BE]/10 flex items-center justify-center">
            <Frown className="w-7 h-7 text-[#1E73BE]" strokeWidth={1.75} />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-3 tracking-tight"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          This page got lost in the ecosystem
        </h1>

        {/* Sub-copy */}
        <p
          className="text-gray-500 text-base max-w-md mx-auto leading-relaxed mb-10"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          The page you're looking for doesn't exist, may have moved, or is still
          being built by one of Dhaka's ambitious founders.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            id="not-found-go-home"
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E73BE] text-white font-semibold rounded-xl
              hover:bg-[#1a68ab] transition-all duration-200
              shadow-[0_4px_14px_rgba(30,115,190,0.35)] hover:shadow-[0_6px_20px_rgba(30,115,190,0.45)]
              hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            id="not-found-explore-directory"
            href="/directory"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#111827] font-semibold rounded-xl
              border border-gray-200 hover:border-[#1E73BE]/40 hover:bg-[#EFF6FF] hover:text-[#1E73BE]
              transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            <Compass className="w-4 h-4" />
            Explore Directory
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-xs text-gray-400 font-medium">or try these popular sections</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            { href: "/directory", label: "📋 Directory" },
            { href: "/dashboard", label: "🚀 List Your Startup" },
            { href: "/sign-in", label: "🔐 Sign In" },
            { href: "/sign-up", label: "✨ Join Now" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg bg-white border border-gray-100 text-sm text-gray-600 font-medium
                hover:border-[#1E73BE]/30 hover:text-[#1E73BE] hover:bg-[#EFF6FF]
                transition-all duration-200 shadow-sm"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Back link */}
        <button
          id="not-found-go-back"
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#1E73BE] transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Go back to where you came from
        </button>
      </div>

      {/* Bottom brand mark */}
      <div className="relative z-10 mt-16 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#1E73BE]">Dhaka Founders</span>
          {" "}— Bangladesh's #1 Founder Directory 🇧🇩
        </p>
      </div>
    </div>
  );
}
