"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${scrolled
          /* Scrolled: strong glass — white frost with brand-blue tinted border */
          ? "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-brand-blue/10 shadow-[0_1px_24px_rgba(30,115,190,0.08)]"
          /* At top: subtle glass so hero gradient shows through */
          : "bg-white/40 backdrop-blur-md backdrop-saturate-100 border-b border-white/20"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label="Dhaka Founders home"
          >
            {/* Monogram badge */}
            <div
              className="
                relative w-9 h-9 rounded-xl flex items-center justify-center
                bg-brand-blue shadow-brand
                group-hover:scale-105 group-hover:shadow-brand-lg
                transition-all duration-300 ease-out overflow-hidden
              "
            >
              {/* Inner shimmer on hover */}
              <span
                aria-hidden="true"
                className="
                  absolute inset-0 opacity-0 group-hover:opacity-100
                  bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,transparent_60%)]
                  transition-opacity duration-300
                "
              />
              <span className="relative text-white font-extrabold text-sm leading-none tracking-tight">
                DF
              </span>
            </div>

            {/* Wordmark */}
            <span className="font-heading font-extrabold text-brand-navy text-xl tracking-tight leading-none">
              Dhaka{" "}
              <span
                className="
                  text-transparent bg-clip-text
                  bg-[linear-gradient(135deg,#1E73BE_0%,#3b9de8_100%)]
                "
              >
                Founders
              </span>
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative text-sm font-semibold tracking-wide
                    transition-colors duration-200 group
                    ${isActive
                      ? "text-brand-blue"
                      : "text-gray-500 hover:text-brand-blue"
                    }
                  `}
                >
                  {label}
                  {/* Active / hover underline */}
                  <span
                    className={`
                      absolute -bottom-0.5 left-0 h-[2px] rounded-full
                      bg-[linear-gradient(90deg,#1E73BE,#3b9de8)]
                      transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Join Button ── */}
          <div className="hidden md:flex items-center">
            <Link
              id="nav-join-network"
              href="/directory"
              className="
                group relative flex items-center gap-2
                px-5 py-2.5 rounded-xl
                bg-brand-blue text-white text-sm font-bold tracking-wide
                shadow-brand
                overflow-hidden
                transition-all duration-300 ease-out
                hover:scale-[1.04] hover:shadow-brand-lg hover:-translate-y-px
                active:scale-[0.98] active:shadow-sm
              "
            >
              {/* Shimmer sweep on hover */}
              <span
                aria-hidden="true"
                className="
                  absolute inset-0
                  translate-x-[-110%] group-hover:translate-x-[110%]
                  transition-transform duration-500 ease-in-out
                  bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.2)_50%,transparent_80%)]
                "
              />
              <Zap className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative">Join the Network</span>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              md:hidden p-2.5 rounded-xl
              text-gray-500 hover:text-brand-blue hover:bg-brand-soft-blue
              transition-all duration-200
            "
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <X className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          className="
            md:hidden animate-slide-down
            bg-white/90 backdrop-blur-xl backdrop-saturate-150
            border-t border-brand-blue/10
            px-4 py-4 space-y-1
            shadow-[0_8px_32px_rgba(30,115,190,0.10)]
          "
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                block text-sm font-semibold py-2.5 px-3 rounded-xl
                transition-all duration-200
                ${pathname === href
                  ? "text-brand-blue bg-brand-soft-blue"
                  : "text-gray-600 hover:text-brand-blue hover:bg-brand-soft-blue/60"
                }
              `}
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 mt-1 border-t border-gray-100">
            <Link
              id="mobile-nav-join"
              href="/directory"
              className="
                group relative flex items-center justify-center gap-2
                w-full px-4 py-3 rounded-xl overflow-hidden
                bg-brand-blue text-white text-sm font-bold
                shadow-brand transition-all duration-300
                hover:shadow-brand-lg active:scale-[0.98]
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute inset-0
                  translate-x-[-110%] group-hover:translate-x-[110%]
                  transition-transform duration-500 ease-in-out
                  bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.2)_50%,transparent_80%)]
                "
              />
              <Zap className="relative w-3.5 h-3.5" />
              <span className="relative">Join the Network</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
