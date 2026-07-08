import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  Globe,
  Linkedin,
  Mail,
  User,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";

/* ── Types ─────────────────────────────────────────────────────────────────── */

interface PageProps {
  params: Promise<{ id: string }>;
}

interface StartupProfile {
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

/* ── Category Colors (matching StartupCard) ────────────────────────────────── */

const CATEGORY_COLORS: Record<
  string,
  { border: string; badge: string; text: string; bg: string }
> = {
  FinTech: {
    border: "#10B981",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    text: "text-emerald-700",
    bg: "bg-emerald-500",
  },
  HealthTech: {
    border: "#8B5CF6",
    badge: "bg-violet-50 text-violet-700 border-violet-100",
    text: "text-violet-700",
    bg: "bg-violet-500",
  },
  EdTech: {
    border: "#F59E0B",
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    text: "text-amber-700",
    bg: "bg-amber-500",
  },
  AgriTech: {
    border: "#22C55E",
    badge: "bg-green-50 text-green-700 border-green-100",
    text: "text-green-700",
    bg: "bg-green-500",
  },
  "E-Commerce": {
    border: "#EC4899",
    badge: "bg-pink-50 text-pink-700 border-pink-100",
    text: "text-pink-700",
    bg: "bg-pink-500",
  },
  "Logistics & Supply Chain": {
    border: "#F97316",
    badge: "bg-orange-50 text-orange-700 border-orange-100",
    text: "text-orange-700",
    bg: "bg-orange-500",
  },
  "SaaS / B2B": {
    border: "#1E73BE",
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    text: "text-blue-700",
    bg: "bg-blue-500",
  },
  "Consumer App": {
    border: "#06B6D4",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-100",
    text: "text-cyan-700",
    bg: "bg-cyan-500",
  },
  "Deep Tech / AI": {
    border: "#6366F1",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-100",
    text: "text-indigo-700",
    bg: "bg-indigo-500",
  },
  CleanTech: {
    border: "#84CC16",
    badge: "bg-lime-50 text-lime-700 border-lime-100",
    text: "text-lime-700",
    bg: "bg-lime-600",
  },
  "Real Estate Tech": {
    border: "#EF4444",
    badge: "bg-red-50 text-red-700 border-red-100",
    text: "text-red-700",
    bg: "bg-red-500",
  },
  "Media & Entertainment": {
    border: "#A855F7",
    badge: "bg-purple-50 text-purple-700 border-purple-100",
    text: "text-purple-700",
    bg: "bg-purple-500",
  },
  Other: {
    border: "#94A3B8",
    badge: "bg-slate-50 text-slate-700 border-slate-100",
    text: "text-slate-600",
    bg: "bg-slate-400",
  },
};

const DEFAULT_COLOR = {
  border: "#1E73BE",
  badge: "bg-blue-50 text-blue-700 border-blue-100",
  text: "text-blue-700",
  bg: "bg-blue-500",
};

function getColors(category: string | null) {
  if (category && CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  return DEFAULT_COLOR;
}

function toInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ── Data Fetching ──────────────────────────────────────────────────────────── */

async function getStartup(id: string): Promise<StartupProfile | null> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("company_profile")
      .select(
        "id, company_name, category, description, website_url, founder_name, founder_email, linkedin_url, created_at"
      )
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as StartupProfile;
  } catch (err) {
    console.error("Error loading startup profile:", err);
    return null;
  }
}

/* ── SEO Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const startup = await getStartup(id);

  if (!startup) {
    return {
      title: "Startup Not Found",
    };
  }

  return {
    title: `${startup.company_name} — Dhaka Founders Profile`,
    description:
      startup.description ||
      `Meet ${startup.founder_name}, the founder of ${startup.company_name} in Dhaka, Bangladesh.`,
  };
}

/* ── Page Component ──────────────────────────────────────────────────────────── */

export default async function StartupProfilePage({ params }: PageProps) {
  const { id } = await params;
  const startup = await getStartup(id);

  if (!startup) {
    notFound();
  }

  const colors = getColors(startup.category);
  const initials = toInitials(startup.company_name);
  const joinedDate = formatDate(startup.created_at);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Dynamic top banner with brand colors */}
      <div className="relative h-64 bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/60 to-white border-b border-gray-100 overflow-hidden">
        {/* Glowing background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.border }}
          />
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#1E73BE]/5 rounded-full blur-2xl" />
        </div>

      </div>

      {/* Profile Card Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-sm font-semibold text-gray-600 hover:text-[#1E73BE] rounded-xl border border-gray-200/60 shadow-sm transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info (left/center) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                {/* Logo monogram & names */}
                <div className="flex items-center gap-5">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-sm shrink-0"
                    style={{ backgroundColor: colors.border }}
                  >
                    {initials}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-2">
                      {startup.company_name}
                    </h1>
                    {startup.category && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                        {startup.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Website Link CTA */}
                {startup.website_url && (
                  <a
                    href={startup.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1E73BE] hover:bg-[#1a68ab] text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-sm active:scale-[0.98]"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-bold text-[#111827] mb-3">About the Startup</h2>
                {startup.description ? (
                  <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                    {startup.description}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No description provided yet.</p>
                )}
              </div>

              {/* Joined Date Metadata */}
              <div className="mt-10 pt-6 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Listed on Dhaka Founders on {joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Founder Sidecard (right) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1E73BE]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#111827]">Founder Profile</h3>
                  <p className="text-xs text-gray-400">Dhaka Founders Member</p>
                </div>
              </div>

              {/* Founder Details */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Name
                  </label>
                  <p className="text-[#111827] font-bold text-base">{startup.founder_name}</p>
                </div>

                {startup.founder_email && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                      Email Address
                    </label>
                    <a
                      href={`mailto:${startup.founder_email}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E73BE] hover:underline"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      {startup.founder_email}
                    </a>
                  </div>
                )}

                {/* Social & external links */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Professional Networks
                  </label>
                  <div className="flex gap-2">
                    {startup.linkedin_url && (
                      <a
                        href={startup.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-100 hover:border-[#1E73BE]/30 hover:bg-[#EFF6FF]/50 text-sm font-semibold text-gray-600 hover:text-[#1E73BE] rounded-xl transition-all duration-200"
                      >
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                        LinkedIn
                      </a>
                    )}
                    {startup.website_url && (
                      <a
                        href={startup.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-100 hover:border-[#1E73BE]/30 hover:bg-[#EFF6FF]/50 text-sm font-semibold text-gray-600 hover:text-[#1E73BE] rounded-xl transition-all duration-200"
                      >
                        <Globe className="w-4 h-4 text-gray-400" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats / Verification sidebar badge */}
            <div className="bg-[#111827] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#1E73BE]/10 rounded-full blur-2xl" />
              <Building2 className="w-8 h-8 text-[#1E73BE] mb-4" />
              <h4 className="font-extrabold text-lg mb-2">Verified Ecosystem Member</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                This company profile is verified by Dhaka Founders team. All details match active and
                registered operators in Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
