"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  Building2,
  Globe,
  Tag,
  FileText,
  User,
  Mail,
  Linkedin,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { saveProfile, type ProfileFormState, type CompanyProfile } from "./actions";

/* ── Initial state ────────────────────────────────────────────────────────── */

const INITIAL_STATE: ProfileFormState = { success: false, message: "" };

/* ── Category options ─────────────────────────────────────────────────────── */

const CATEGORIES = [
  "FinTech",
  "HealthTech",
  "EdTech",
  "AgriTech",
  "E-Commerce",
  "Logistics & Supply Chain",
  "SaaS / B2B",
  "Consumer App",
  "Deep Tech / AI",
  "CleanTech",
  "Real Estate Tech",
  "Media & Entertainment",
  "Other",
] as const;

/* ── Sub-components ────────────────────────────────────────────────────────── */

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      {children}
    </span>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#111827] mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function InputField({
  id,
  name,
  type = "text",
  placeholder,
  defaultValue,
  icon,
  required,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  defaultValue?: string | null;
  icon: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <FieldIcon>{icon}</FieldIcon>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]
          hover:border-gray-300 transition-all duration-200"
      />
    </div>
  );
}

/* ── Section divider ────────────────────────────────────────────────────────── */

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-[#1E73BE] flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h2 className="text-base font-bold text-[#111827]">{title}</h2>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

/* ── Main form component ─────────────────────────────────────────────────────── */

export default function ProfileForm({ existing }: { existing: CompanyProfile | null }) {
  const [state, formAction, isPending] = useActionState(saveProfile, INITIAL_STATE);
  const alertRef = useRef<HTMLDivElement>(null);

  // Scroll the status alert into view when it changes
  useEffect(() => {
    if (state.message && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-8" noValidate>

      {/* ── Status Alert ── */}
      {state.message && (
        <div
          ref={alertRef}
          role="alert"
          aria-live="polite"
          className={`flex items-start gap-3 p-4 rounded-xl border text-sm font-medium animate-[fadeIn_0.3s_ease-out_both] ${
            state.success
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-px" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-px" />
          )}
          {state.message}
        </div>
      )}

      {/* ══ Company Details ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <SectionHeader
          icon={<Building2 className="w-5 h-5 text-white" />}
          title="Company Details"
          subtitle="Tell us about your startup or company"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Company Name */}
          <div className="md:col-span-2">
            <Label htmlFor="profile-company-name" required>Company Name</Label>
            <InputField
              id="profile-company-name"
              name="company_name"
              placeholder="e.g. Chaldal Technologies"
              defaultValue={existing?.company_name}
              icon={<Building2 className="w-4 h-4" />}
              required
            />
          </div>

          {/* Website URL */}
          <div>
            <Label htmlFor="profile-website-url">Website URL</Label>
            <InputField
              id="profile-website-url"
              name="website_url"
              type="url"
              placeholder="https://yourcompany.com"
              defaultValue={existing?.website_url}
              icon={<Globe className="w-4 h-4" />}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="profile-category">Category / Sector</Label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Tag className="w-4 h-4" />
              </span>
              <select
                id="profile-category"
                name="category"
                defaultValue={existing?.category ?? ""}
                className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827]
                  appearance-none cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]
                  hover:border-gray-300 transition-all duration-200"
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {/* custom chevron */}
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="profile-description">Company Description</Label>
            <div className="relative">
              <span className="absolute left-3.5 top-4 text-gray-400 pointer-events-none">
                <FileText className="w-4 h-4" />
              </span>
              <textarea
                id="profile-description"
                name="description"
                rows={4}
                placeholder="Describe what your company does, your mission, and the problem you're solving…"
                defaultValue={existing?.description ?? ""}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder-gray-400 resize-none
                  focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE]
                  hover:border-gray-300 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══ Founder Details ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <SectionHeader
          icon={<User className="w-5 h-5 text-white" />}
          title="Founder Details"
          subtitle="Tell us about you as a founder"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Founder Name */}
          <div>
            <Label htmlFor="profile-founder-name" required>Full Name</Label>
            <InputField
              id="profile-founder-name"
              name="founder_name"
              placeholder="e.g. Zia Ashraf"
              defaultValue={existing?.founder_name}
              icon={<User className="w-4 h-4" />}
              required
            />
          </div>

          {/* Founder Email */}
          <div>
            <Label htmlFor="profile-founder-email">Email Address</Label>
            <InputField
              id="profile-founder-email"
              name="founder_email"
              type="email"
              placeholder="founder@company.com"
              defaultValue={existing?.founder_email}
              icon={<Mail className="w-4 h-4" />}
            />
          </div>

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <Label htmlFor="profile-linkedin-url">LinkedIn Profile URL</Label>
            <InputField
              id="profile-linkedin-url"
              name="linkedin_url"
              type="url"
              placeholder="https://linkedin.com/in/your-name"
              defaultValue={existing?.linkedin_url}
              icon={<Linkedin className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-xs text-gray-400">
          Fields marked <span className="text-red-500 font-semibold">*</span> are required
        </p>
        <button
          id="profile-save-button"
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-3 bg-[#1E73BE] text-white text-sm font-bold rounded-xl
            hover:bg-[#1a68ab] active:scale-[0.98] transition-all duration-200
            shadow-[0_4px_14px_rgba(30,115,190,0.35)] hover:shadow-[0_6px_20px_rgba(30,115,190,0.45)]
            disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {existing ? "Update Profile" : "Save Profile"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
