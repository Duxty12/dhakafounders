import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

export interface StartupCardProps {
  name: string;
  tagline: string;
  sector: string;
  stage: string;
  founderName: string;
  location: string;
  logoInitials: string;
  logoColor: string;
  slug: string;
}

export default function StartupCard({
  name,
  tagline,
  sector,
  stage,
  founderName,
  location,
  logoInitials,
  logoColor,
  slug,
}: StartupCardProps) {
  return (
    <Link
      href={`/directory/${slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: logoColor }}
          aria-label={`${name} logo`}
        >
          {logoInitials}
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#1E73BE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>

      {/* Name & Tagline */}
      <h3 className="font-bold text-[#111827] text-lg mb-1 leading-snug">{name}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{tagline}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 bg-[#EFF6FF] text-[#1E73BE] text-xs font-semibold rounded-full">
          {sector}
        </span>
        <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full border border-gray-100">
          {stage}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-600 font-medium">{founderName}</span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <MapPin className="w-3 h-3" />
          {location}
        </div>
      </div>
    </Link>
  );
}
