import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  ChevronRight,
  Plus,
  Settings,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

/* ── Static Data ─────────────────────────────────────────────────────────── */

const STATS: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}[] = [
  { label: "Profile Views", value: "1,284", change: "+12%", icon: BarChart3, color: "#1E73BE" },
  { label: "Connections", value: "48", change: "+8%", icon: Users, color: "#7C3AED" },
  { label: "Directory Rank", value: "#23", change: "↑5", icon: Star, color: "#F59E0B" },
  { label: "Ecosystem Score", value: "87", change: "+3pts", icon: TrendingUp, color: "#059669" },
];

const ACTIVITY: { text: string; time: string }[] = [
  { text: "Chaldal viewed your profile", time: "2 hours ago" },
  { text: "ShopUp sent you a connection request", time: "5 hours ago" },
  { text: "Your startup listing was approved", time: "1 day ago" },
  { text: "You appeared in 3 new searches this week", time: "2 days ago" },
  { text: "Profile completeness reached 80%", time: "3 days ago" },
];

const SIDEBAR_LINKS: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}[] = [
  { href: "/dashboard", label: "Overview", icon: BarChart3, active: true },
  { href: "/dashboard/profile", label: "My Profile", icon: Users, active: false },
  { href: "/directory", label: "Directory", icon: TrendingUp, active: false },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, active: false },
];

const QUICK_ACTIONS: { label: string; href: string }[] = [
  { label: "Update Profile", href: "/dashboard/profile" },
  { label: "View My Listing", href: "/directory" },
  { label: "Explore Network", href: "/directory" },
  { label: "Invite a Founder", href: "#" },
];

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function DashboardPage() {
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
            <p className="text-xs font-bold text-[#1E73BE] mb-1">🔥 Pro Tip</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Complete your profile to rank higher in search results and
              attract more co-founders.
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 p-6 lg:p-10 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
              Founder Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back. Here&apos;s your ecosystem pulse.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="dashboard-notifications"
              aria-label="View notifications"
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#1E73BE]/50 hover:text-[#1E73BE] hover:bg-[#EFF6FF] transition-all duration-200"
            >
              <Bell className="w-4 h-4" />
            </button>
            <Link
              id="dashboard-update-company-profile"
              href="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#1E73BE] text-[#1E73BE] text-sm font-semibold rounded-xl hover:bg-[#EFF6FF] transition-all duration-200 shadow-sm"
            >
              <Building2 className="w-4 h-4" />
              Update Company Profile
            </Link>
            <button
              id="dashboard-list-startup"
              className="flex items-center gap-2 px-4 py-2 bg-[#1E73BE] text-white text-sm font-semibold rounded-xl hover:bg-[#1a68ab] transition-colors duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              List Startup
            </button>
          </div>
        </div>

        {/* Update Company Profile Banner */}
        <Link
          id="dashboard-update-company-profile-banner"
          href="/dashboard/profile"
          className="group flex items-center justify-between w-full mb-8 p-5 rounded-2xl border border-[#1E73BE]/20 bg-gradient-to-r from-[#EFF6FF] via-white to-[#EFF6FF] hover:from-[#DBEAFE] hover:to-[#DBEAFE] hover:border-[#1E73BE]/40 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#1E73BE] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827] group-hover:text-[#1E73BE] transition-colors duration-200">
                Update Company Profile
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Keep your company details, mission, and team info up to date.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1E73BE] text-white text-xs font-semibold rounded-xl group-hover:bg-[#1a68ab] transition-colors duration-200 shrink-0 shadow-sm">
            Edit Profile
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        </Link>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, change, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {change}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-[#111827] mb-0.5">
                {value}
              </div>
              <div className="text-xs text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-[#111827] text-base mb-5">
              Recent Activity
            </h2>
            <div className="space-y-1">
              {ACTIVITY.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 group hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-[#1E73BE] mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#111827] font-medium leading-snug">
                      {item.text}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#1E73BE] transition-colors shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-[#111827] text-base mb-5">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {QUICK_ACTIONS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#EFF6FF] text-sm font-medium text-gray-700 hover:text-[#1E73BE] transition-all duration-200 group"
                >
                  {label}
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1E73BE] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
