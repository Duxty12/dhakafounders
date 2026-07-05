import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dhaka Founders — Bangladesh's Premier Founder Directory",
    template: "%s | Dhaka Founders",
  },
  description:
    "Connect with the brains behind Bangladesh's next unicorns. The definitive map of Dhaka's tech operators and innovators.",
  keywords: [
    "dhaka founders",
    "bangladesh startups",
    "tech founders",
    "startup directory",
    "dhaka tech ecosystem",
    "bangladesh unicorn",
  ],
  openGraph: {
    title: "Dhaka Founders",
    description: "Meet the tech founders moving Bangladesh forward.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhaka Founders",
    description: "The definitive map of Dhaka's tech operators and innovators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable}`}
    >
      <body className="font-sans bg-white text-brand-navy antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
