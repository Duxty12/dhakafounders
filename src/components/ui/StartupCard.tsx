import Link from "next/link";
import { ArrowUpRight, Globe, User } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface StartupCardProps {
  id: string;
  company_name: string;
  category: string | null;
  description: string | null;
  website_url: string | null;
  founder_name: string;
  founder_email: string | null;
  linkedin_url: string | null;
  created_at: string;
}

/* ── Category → accent color map ────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, { border: string; badge: string; text: string; dot: string }> = {
  "FinTech":                   { border: "#10B981", badge: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-500"  },
  "HealthTech":                { border: "#8B5CF6", badge: "bg-violet-50",   text: "text-violet-700",  dot: "bg-violet-500"  },
  "EdTech":                    { border: "#F59E0B", badge: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-500"   },
  "AgriTech":                  { border: "#22C55E", badge: "bg-green-50",    text: "text-green-700",   dot: "bg-green-500"   },
  "E-Commerce":                { border: "#EC4899", badge: "bg-pink-50",     text: "text-pink-700",    dot: "bg-pink-500"    },
  "Logistics & Supply Chain":  { border: "#F97316", badge: "bg-orange-50",   text: "text-orange-700",  dot: "bg-orange-500"  },
  "SaaS / B2B":                { border: "#1E73BE", badge: "bg-blue-50",     text: "text-blue-700",    dot: "bg-blue-500"    },
  "Consumer App":              { border: "#06B6D4", badge: "bg-cyan-50",     text: "text-cyan-700",    dot: "bg-cyan-500"    },
  "Deep Tech / AI":            { border: "#6366F1", badge: "bg-indigo-50",   text: "text-indigo-700",  dot: "bg-indigo-500"  },
  "CleanTech":                 { border: "#84CC16", badge: "bg-lime-50",     text: "text-lime-700",    dot: "bg-lime-600"    },
  "Real Estate Tech":          { border: "#EF4444", badge: "bg-red-50",      text: "text-red-700",     dot: "bg-red-500"     },
  "Media & Entertainment":     { border: "#A855F7", badge: "bg-purple-50",   text: "text-purple-700",  dot: "bg-purple-500"  },
  "Other":                     { border: "#94A3B8", badge: "bg-slate-50",    text: "text-slate-600",   dot: "bg-slate-400"   },
};

const DEFAULT_COLOR = { border: "#1E73BE", badge: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" };

type ColorDef = { border: string; badge: string; text: string; dot: string };

function getColors(category: string | null): ColorDef {
  if (category && CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  return DEFAULT_COLOR;
}

/* ── Helpers ────────────────────────────────────────────────────────────────── */

/** Two-letter initials from company name */
function toInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Format ISO timestamp → "Jul 2025" */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export default function StartupCard({
  id,
  company_name,
  category,
  description,
  website_url,
  founder_name,
  linkedin_url,
  created_at,
}: StartupCardProps) {
  const colors = getColors(category);
  const initials = toInitials(company_name);
  const profileHref = `/directory/${id}`;
  const joinedDate = formatDate(created_at);

  return (
    <article
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
        shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_40px_rgba(30,115,190,0.12)]
        hover:-translate-y-1 transition-all duration-300"
    >
      {/* Colored top border accent */}
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: colors.border }}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-6">

        {/* Card Header: logo + arrow */}
        <div className="flex items-start justify-between mb-4">
          {/* Logo monogram */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-base shrink-0 shadow-sm"
            style={{ backgroundColor: colors.border }}
            aria-label={`${company_name} logo`}
          >
            {initials}
          </div>

          {/* Category badge */}
          {category && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.badge} ${colors.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} aria-hidden="true" />
              {category}
            </span>
          )}
        </div>

        {/* Company name */}
        <h3 className="font-extrabold text-[#111827] text-lg leading-snug mb-2 group-hover:text-[#1E73BE] transition-colors duration-200">
          {company_name}
        </h3>

        {/* Description */}
        {description ? (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
            {description}
          </p>
        ) : (
          <p className="text-gray-300 text-sm italic flex-1 mb-4">No description provided.</p>
        )}

        {/* Meta row: founder + joined date */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-5 pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1.5 font-medium text-gray-600">
            <User className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
            {founder_name}
          </span>
          <span>Joined {joinedDate}</span>
        </div>

        {/* Actions: View Profile + Website */}
        <div className="flex items-center gap-2 mt-auto">
          <Link
            href={profileHref}
            id={`view-profile-${id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold
              bg-[#1E73BE] text-white
              hover:bg-[#1a68ab] active:scale-[0.97]
              transition-all duration-200 shadow-sm hover:shadow-[0_4px_12px_rgba(30,115,190,0.30)]"
          >
            View Profile
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>

          {website_url && (
            <a
              href={website_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company_name} website`}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200
                text-gray-400 hover:border-[#1E73BE]/40 hover:text-[#1E73BE] hover:bg-[#EFF6FF]
                transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
