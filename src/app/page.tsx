import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe,
  Network,
  TrendingUp,
  Users,
} from "lucide-react";
import HeroHeadline from "@/components/landing/HeroHeadline";
import StartupCard, { type StartupCardProps } from "@/components/ui/StartupCard";

export const metadata: Metadata = {
  title: "Dhaka Founders — Bangladesh's Premier Founder Directory",
};

/* ── Static Data ─────────────────────────────────────────────────────────── */

const STATS: { value: string; label: string }[] = [
  { value: "500+", label: "Verified Founders" },
  { value: "200+", label: "Startups Listed" },
  { value: "12", label: "Industry Sectors" },
  { value: "৳2B+", label: "Combined Funding" },
];

const FEATURES: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    icon: Network,
    title: "Discover Builders",
    description:
      "Explore profiles of Bangladesh's most ambitious tech founders, from pre-seed operators to Series A leaders.",
    color: "#1E73BE",
  },
  {
    icon: Users,
    title: "Build Connections",
    description:
      "Find co-founders, mentors, and collaborators who are actively building in the Dhaka tech ecosystem.",
    color: "#7C3AED",
  },
  {
    icon: TrendingUp,
    title: "Track the Ecosystem",
    description:
      "Stay ahead with real-time visibility into the startups, sectors, and trends shaping Bangladesh's future.",
    color: "#059669",
  },
];

const FEATURED_STARTUPS: StartupCardProps[] = [
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
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-32 pb-24">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute -top-40 -right-32 w-[500px] h-[500px] bg-[#1E73BE]/10 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-32 w-96 h-96 bg-[#1E73BE]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFF6FF] border border-[#1E73BE]/25 rounded-full mb-8 shadow-sm">
            <span className="text-lg" aria-hidden="true">🇧🇩</span>
            <span className="text-sm font-semibold text-[#1E73BE]">
              Bangladesh&apos;s #1 Founder Directory
            </span>
          </div>

          {/* Animated Headline */}
          <HeroHeadline />

          {/* Sub-copy */}
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A vibrant community of tech operators and innovators — building in
            the open, growing together. Discover the startups reshaping
            Bangladesh&apos;s digital economy.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              id="hero-explore-directory"
              href="/directory"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1E73BE] text-white font-semibold rounded-xl hover:bg-[#1a68ab] transition-all duration-200 shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5"
            >
              Explore the Directory
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              id="hero-list-startup"
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#111827] font-semibold rounded-xl border border-gray-200 hover:border-[#1E73BE]/40 hover:bg-[#EFF6FF] hover:text-[#1E73BE] transition-all duration-200"
            >
              List Your Startup
              <Building2 className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-[#111827] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center px-4">
                <div className="text-3xl font-extrabold text-white mb-1">
                  {value}
                </div>
                <div className="text-gray-400 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
              Everything you need to navigate the ecosystem
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              From discovery to deep connections — Dhaka Founders is your
              operating system for Bangladesh&apos;s tech scene.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="font-bold text-[#111827] text-xl mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Startups ── */}
      <section className="py-24 bg-[#EFF6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2 tracking-tight">
                Featured Startups
              </h2>
              <p className="text-gray-500">
                Spotlight on Bangladesh&apos;s most exciting ventures
              </p>
            </div>
            <Link
              href="/directory"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E73BE] hover:gap-2.5 transition-all duration-200"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_STARTUPS.map((startup) => (
              <StartupCard key={startup.slug} {...startup} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-[#1E73BE] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-10 h-10 text-white/50 mx-auto mb-6" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to put your startup on the map?
          </h2>
          <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto leading-relaxed">
            Join hundreds of founders who are already building in the open on
            Dhaka Founders.
          </p>
          <Link
            id="cta-banner-get-listed"
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E73BE] font-bold rounded-xl hover:bg-[#EFF6FF] transition-colors duration-200 shadow-lg"
          >
            Get Listed Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
