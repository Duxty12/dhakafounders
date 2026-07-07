"use client";

import { useState, useMemo } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import StartupCard, { type StartupCardProps } from "@/components/ui/StartupCard";

/* ── Props ──────────────────────────────────────────────────────────────────── */

interface DirectoryGridProps {
  startups: StartupCardProps[];
}

/* ── Helpers ─────────────────────────────────────────────────────────────────── */

/** Derive a sorted unique list of categories from the data */
function buildCategories(startups: StartupCardProps[]): string[] {
  const cats = new Set<string>();
  for (const s of startups) {
    if (s.category) cats.add(s.category);
  }
  return ["All", ...Array.from(cats).sort()];
}

const SORT_OPTIONS = [
  { value: "newest",  label: "Newest First" },
  { value: "oldest",  label: "Oldest First" },
  { value: "az",      label: "A → Z" },
  { value: "za",      label: "Z → A" },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["value"];

/* ── Component ───────────────────────────────────────────────────────────────── */

export default function DirectoryGrid({ startups }: DirectoryGridProps) {
  const [query, setQuery]           = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [sort, setSort]             = useState<SortKey>("newest");

  const categories = useMemo(() => buildCategories(startups), [startups]);

  /* ── Filtering + sorting ── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = startups.filter((s) => {
      const matchesCategory =
        activeCategory === "All" || s.category === activeCategory;

      const matchesQuery =
        !q ||
        s.company_name.toLowerCase().includes(q) ||
        s.founder_name.toLowerCase().includes(q) ||
        (s.description ?? "").toLowerCase().includes(q) ||
        (s.category ?? "").toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });

    // sort
    result = [...result].sort((a, b) => {
      if (sort === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sort === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sort === "az")     return a.company_name.localeCompare(b.company_name);
      if (sort === "za")     return b.company_name.localeCompare(a.company_name);
      return 0;
    });

    return result;
  }, [startups, query, activeCategory, sort]);

  const hasActiveFilter = query || activeCategory !== "All";

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  return (
    <>
      {/* ── Search + Sort row ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="directory-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, founders, or sectors…"
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm bg-white
              focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]
              hover:border-gray-300 transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <select
            id="directory-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl text-sm bg-white text-gray-600
              appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]
              hover:border-gray-300 transition-all duration-200"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── Category filter pills ── */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-category-${cat.toLowerCase().replace(/[\s/&]+/g, "-")}`}
            onClick={() => setCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#1E73BE] text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#1E73BE]/40 hover:text-[#1E73BE] hover:bg-[#EFF6FF]"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Clear all filters button */}
        {hasActiveFilter && (
          <button
            onClick={clearFilters}
            id="directory-clear-filters"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold
              bg-red-50 border border-red-200 text-red-600
              hover:bg-red-100 transition-all duration-200"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* ── Results toolbar ── */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-[#111827]">{filtered.length}</span>
          {" "}of{" "}
          <span className="font-semibold text-[#111827]">{startups.length}</span>
          {" "}companies
          {activeCategory !== "All" && (
            <span className="text-[#1E73BE] font-semibold"> · {activeCategory}</span>
          )}
        </p>
        {hasActiveFilter && filtered.length === 0 && (
          <span className="text-xs text-gray-400">Try broadening your search</span>
        )}
      </div>

      {/* ── Cards grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((startup) => (
            <StartupCard key={startup.id} {...startup} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] flex items-center justify-center mb-4">
            <Search className="w-7 h-7 text-[#1E73BE]" />
          </div>
          <h3 className="text-base font-bold text-[#111827] mb-1">No results found</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            No companies match{" "}
            {query ? <>&ldquo;{query}&rdquo;</> : "the selected filter"}. Try a different search or{" "}
            <button
              onClick={clearFilters}
              className="text-[#1E73BE] font-semibold hover:underline"
            >
              clear filters
            </button>
            .
          </p>
        </div>
      )}
    </>
  );
}
