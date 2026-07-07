import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Plus } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import DirectoryGrid from "./DirectoryGrid";
import type { StartupCardProps } from "@/components/ui/StartupCard";

export const metadata: Metadata = {
  title: "Founder Directory",
  description:
    "Discover startups and founders shaping Bangladesh's digital future.",
};

/* ── Data fetching ───────────────────────────────────────────────────────────── */

async function getAllProfiles(): Promise<StartupCardProps[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("company_profile")
    .select(
      "id, company_name, category, description, website_url, founder_name, founder_email, linkedin_url, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching company profiles:", error.message);
    return [];
  }

  return (data ?? []) as StartupCardProps[];
}

/* ── Page ─────────────────────────────────────────────────────────────────────── */

export default async function DirectoryPage() {
  const startups = await getAllProfiles();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Title Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              {/* Eyebrow */}
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1E73BE] mb-2">
                Bangladesh&apos;s Startup Ecosystem
              </p>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Founder Directory
              </h1>
              <p className="text-gray-500 mt-2 text-sm max-w-lg">
                Explore{" "}
                <span className="font-bold text-[#111827]">{startups.length}</span>{" "}
                verified startups and the founders building Bangladesh&apos;s digital future.
              </p>
            </div>

            <Link
              id="directory-submit-startup"
              href="/dashboard/profile"
              className="group inline-flex items-center gap-2 px-5 py-2.5
                bg-[#1E73BE] text-white font-semibold text-sm rounded-xl
                hover:bg-[#1a68ab] transition-all duration-200
                shadow-[0_4px_14px_rgba(30,115,190,0.30)] hover:shadow-[0_6px_20px_rgba(30,115,190,0.40)]
                whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Submit Your Startup
            </Link>
          </div>

          {/* Stats strip */}
          {startups.length > 0 && (
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-50">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-[#111827]">{startups.length}</p>
                <p className="text-xs text-gray-500 font-medium">Companies</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-[#111827]">
                  {new Set(startups.map((s) => s.category).filter(Boolean)).size}
                </p>
                <p className="text-xs text-gray-500 font-medium">Sectors</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="text-center">
                <p className="text-2xl font-extrabold text-[#111827]">BD</p>
                <p className="text-xs text-gray-500 font-medium">Country</p>
              </div>
            </div>
          )}

          {/* Empty state — no data yet */}
          {startups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <p className="text-sm text-gray-400">
                No companies in the directory yet.{" "}
                <Link href="/dashboard/profile" className="text-[#1E73BE] font-semibold hover:underline">
                  Be the first to submit yours →
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Interactive Grid (Client Component) ── */}
      {startups.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <DirectoryGrid startups={startups} />
        </div>
      )}
    </div>
  );
}
