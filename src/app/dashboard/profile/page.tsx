import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import ProfileForm from "./ProfileForm";
import { getExistingProfile } from "./actions";

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Update your company and founder details to appear in the Dhaka Founders directory.",
};

/* ── Sidebar links (mirrors dashboard) ─────────────────────────────────────── */

const SIDEBAR_LINKS: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}[] = [
  { href: "/dashboard",          label: "Overview",  icon: BarChart3,   active: false },
  { href: "/dashboard/profile",  label: "My Profile", icon: Users,       active: true  },
  { href: "/directory",          label: "Directory", icon: TrendingUp,  active: false },
  { href: "/dashboard/settings", label: "Settings",  icon: Settings,    active: false },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default async function ProfilePage() {
  // Pre-fetch existing profile data server-side for hydration
  const existing = await getExistingProfile();

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex">

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-4rem)] bg-white border-r border-gray-100 sticky top-16 shrink-0">
        <div className="p-5 pt-8 flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {SIDEBAR_LINKS.map(({ href, label, icon: Icon, active }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#EFF6FF] text-[#1E73BE]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#111827]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar tip */}
        <div className="p-5">
          <div className="p-4 bg-[#EFF6FF] rounded-xl border border-[#1E73BE]/15">
            <p className="text-xs font-bold text-[#1E73BE] mb-1">💡 Profile Tip</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              A complete profile with a description and LinkedIn link gets{" "}
              <strong className="text-[#1E73BE]">3× more</strong> views in the directory.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 p-6 lg:p-10 max-w-3xl">

        {/* Page header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#1E73BE] transition-colors duration-200 mb-4 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E73BE] to-[#3b9de8] flex items-center justify-center shadow-[0_4px_14px_rgba(30,115,190,0.35)] shrink-0">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
                {existing ? "Update Company Profile" : "Create Company Profile"}
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {existing
                  ? "Your details are pre-filled — edit any field and save."
                  : "Fill in your details to appear in the Dhaka Founders directory."}
              </p>
            </div>
          </div>

          {/* Status badge */}
          {existing && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Profile active · last saved{" "}
              {new Date(existing.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          )}
        </div>

        {/* Form */}
        <ProfileForm existing={existing} />
      </div>
    </div>
  );
}
