import type { Metadata } from "next";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import StartupCard, { type StartupCardProps } from "@/components/ui/StartupCard";

export const metadata: Metadata = {
  title: "Founder Directory",
  description:
    "Discover 200+ startups and founders shaping Bangladesh's digital future.",
};

/* ── Static Data ─────────────────────────────────────────────────────────── */

const SECTORS = [
  "All Sectors",
  "B2B Commerce",
  "E-Commerce",
  "Fintech",
  "Healthtech",
  "Edtech",
  "Quick Commerce",
];

const STARTUPS: StartupCardProps[] = [
  {
    name: "ShopUp",
    tagline: "Empowering B2B commerce for small businesses across Bangladesh.",
    sector: "B2B Commerce",
    stage: "Series B",
    founderName: "Afeef Zaman",
    location: "Dhaka",
    logoInitials: "SU",
    logoColor: "#1E73BE",
    slug: "shopup",
  },
  {
    name: "Shajgoj",
    tagline: "The leading beauty & wellness marketplace in South Asia.",
    sector: "E-Commerce",
    stage: "Series A",
    founderName: "Sonya Hossain",
    location: "Dhaka",
    logoInitials: "SJ",
    logoColor: "#D946EF",
    slug: "shajgoj",
  },
  {
    name: "Chaldal",
    tagline: "Ultra-fast grocery delivery reimagining urban food supply chains.",
    sector: "Quick Commerce",
    stage: "Series B",
    founderName: "Waseem Alim",
    location: "Dhaka",
    logoInitials: "CH",
    logoColor: "#059669",
    slug: "chaldal",
  },
  {
    name: "bKash",
    tagline: "Bangladesh's largest mobile financial services platform.",
    sector: "Fintech",
    stage: "Series C+",
    founderName: "Kamal Quadir",
    location: "Dhaka",
    logoInitials: "BK",
    logoColor: "#E11D48",
    slug: "bkash",
  },
  {
    name: "Shikho",
    tagline: "Gamified Bangla-first learning platform for the next generation.",
    sector: "Edtech",
    stage: "Seed",
    founderName: "Shahir Chowdhury",
    location: "Dhaka",
    logoInitials: "SK",
    logoColor: "#F59E0B",
    slug: "shikho",
  },
  {
    name: "Maya",
    tagline: "AI-powered health platform serving underserved communities.",
    sector: "Healthtech",
    stage: "Series A",
    founderName: "Ivy Huq Russell",
    location: "Dhaka",
    logoInitials: "MY",
    logoColor: "#7C3AED",
    slug: "maya",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
                Founder Directory
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Discover{" "}
                <span className="font-semibold text-[#1E73BE]">200+</span>{" "}
                startups shaping Bangladesh&apos;s digital future.
              </p>
            </div>
            <button
              id="directory-submit-startup"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E73BE] text-white font-semibold text-sm rounded-xl hover:bg-[#1a68ab] transition-colors duration-200 shadow-sm whitespace-nowrap"
            >
              Submit Your Startup
            </button>
          </div>

          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="directory-search"
                type="search"
                placeholder="Search founders, startups, or sectors..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] transition-all bg-white"
              />
            </div>
            <button
              id="directory-filter-btn"
              className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 bg-white hover:border-[#1E73BE]/40 hover:text-[#1E73BE] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Sector Filter Chips */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
            {SECTORS.map((sector, idx) => (
              <button
                key={sector}
                id={`filter-sector-${sector.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  idx === 0
                    ? "bg-[#1E73BE] text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#1E73BE]/40 hover:text-[#1E73BE] hover:bg-[#EFF6FF]"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Startup Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-[#111827]">
              {STARTUPS.length}
            </span>{" "}
            of 200+ startups
          </p>
          <select
            id="directory-sort"
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] bg-white text-gray-600 cursor-pointer"
          >
            <option>Featured</option>
            <option>Newest</option>
            <option>A – Z</option>
            <option>Stage: Early</option>
            <option>Stage: Growth</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STARTUPS.map((startup) => (
            <StartupCard key={startup.slug} {...startup} />
          ))}
        </div>

        {/* Pagination */}
        <nav
          aria-label="Directory pagination"
          className="mt-12 flex items-center justify-center gap-2"
        >
          {([1, 2, 3, "…", 8] as (number | string)[]).map((page, idx) => (
            <button
              key={idx}
              disabled={page === "…"}
              aria-current={page === 1 ? "page" : undefined}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                page === 1
                  ? "bg-[#1E73BE] text-white shadow-sm"
                  : page === "…"
                  ? "text-gray-400 cursor-default"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#1E73BE]/40 hover:text-[#1E73BE]"
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
