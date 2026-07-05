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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Dhaka Founders home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1E73BE] flex items-center justify-center shadow-sm group-hover:shadow-brand transition-shadow duration-200">
              <span className="text-white font-extrabold text-sm leading-none">DF</span>
            </div>
            <span className="font-heading font-bold text-[#111827] text-lg tracking-tight">
              Dhaka{" "}
              <span className="text-[#1E73BE]">Founders</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive ? "text-[#1E73BE]" : "text-gray-600 hover:text-[#1E73BE]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#1E73BE] rounded-full transition-all duration-200 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              id="nav-join-network"
              href="/directory"
              className="flex items-center gap-2 px-4 py-2 bg-[#1E73BE] text-white text-sm font-semibold rounded-lg hover:bg-[#1a68ab] transition-all duration-200 shadow-sm hover:shadow-brand"
            >
              <Zap className="w-3.5 h-3.5" />
              Join the Network
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#1E73BE] hover:bg-[#EFF6FF] transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 animate-slide-down shadow-lg">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                pathname === href
                  ? "text-[#1E73BE] bg-[#EFF6FF]"
                  : "text-gray-700 hover:text-[#1E73BE] hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-50 mt-2">
            <Link
              id="mobile-nav-join"
              href="/directory"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#1E73BE] text-white text-sm font-semibold rounded-lg"
            >
              <Zap className="w-3.5 h-3.5" />
              Join the Network
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
