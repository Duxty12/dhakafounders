import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";

const PLATFORM_LINKS = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Founder Directory" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

const SOCIAL_LINKS = [
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
  { Icon: Mail, label: "Email", href: "mailto:hello@dhakafounders.com" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1E73BE] flex items-center justify-center">
                <span className="text-white font-extrabold text-sm leading-none">DF</span>
              </div>
              <span className="font-bold text-lg">
                Dhaka <span className="text-[#1E73BE]">Founders</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The definitive map of Dhaka&apos;s tech operators and innovators.
              Building in the open, growing together.
            </p>
            <div className="flex items-center gap-1.5 mt-5 text-gray-500 text-sm">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Dhaka, Bangladesh 🇧🇩</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Platform
            </h3>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              Connect
            </h3>
            <div className="flex gap-3 mb-5">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1E73BE] hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">hello@dhakafounders.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dhaka Founders. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with ❤️ for Bangladesh&apos;s builder community
          </p>
        </div>
      </div>
    </footer>
  );
}
