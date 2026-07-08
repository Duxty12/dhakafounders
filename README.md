<div align="center">

<br />

<!-- Logo / Hero Badge -->
<img src="https://img.shields.io/badge/🇧🇩%20Dhaka%20Founders-Bangladesh's%20%231%20Founder%20Directory-1E73BE?style=for-the-badge&labelColor=111827&color=1E73BE" alt="Dhaka Founders" />

<br /><br />

<h1>Dhaka Founders</h1>

<p><strong>Connect with the Brains Behind Bangladesh's Next Unicorns.</strong><br/>
The definitive map of Dhaka's tech operators and innovators — building in the open, growing together.</p>

<br />

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-1E73BE?style=flat-square)](LICENSE)

<br />

</div>

---

## ✨ What is Dhaka Founders?

**Dhaka Founders** is Bangladesh's premier founder directory — a curated, community-driven platform that surfaces the startups, operators, and innovators shaping the country's digital economy.

Whether you're an investor scouting the next unicorn, a founder seeking co-founders and collaborators, or a builder wanting to be discovered — Dhaka Founders is your operating system for the Dhaka tech ecosystem.

> *"The Definitive Map of Dhaka's Tech Operators and Innovators."*

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔍 **Founder Directory** | Searchable, filterable profiles of 500+ verified founders across 12+ sectors |
| 🏢 **Startup Listings** | Rich company profiles with category badges, descriptions, and founder details |
| 📊 **Ecosystem Stats** | Real-time visibility into funding, sectors, and growth trends |
| 🔐 **Authenticated Profiles** | Secure sign-up/sign-in powered by Clerk |
| 📋 **Dashboard** | Founders can list and manage their startup profile |
| ⚡ **Turbopack Dev** | Blazing-fast local development with Next.js Turbopack |

---

## 🛠️ Tech Stack

```
Framework   → Next.js 15 (App Router) + TypeScript 5.7
Styling     → Tailwind CSS v4
Auth        → Clerk (Next.js SDK)
Database    → Supabase (PostgreSQL via SSR client)
UI Icons    → Lucide React
Fonts       → Plus Jakarta Sans + Inter (Google Fonts)
Deployment  → Vercel (recommended)
```

---

## 📁 Project Structure

```
dhakafounders/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Authenticated founder dashboard
│   │   ├── directory/          # Public founder & startup directory
│   │   ├── sign-in/            # Clerk sign-in page
│   │   ├── sign-up/            # Clerk sign-up page
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── layout.tsx          # Root layout (fonts, Clerk, Navbar, Footer)
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles & Tailwind config
│   ├── components/
│   │   ├── landing/            # Hero headline, animations
│   │   ├── ui/                 # Reusable UI components (StartupCard, etc.)
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── utils/
│       └── supabase/           # Supabase client helpers (server + browser)
├── brand-dna.md                # Brand guidelines & design system
├── next.config.ts
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** or **pnpm**
- A [Supabase](https://supabase.com) project
- A [Clerk](https://clerk.com) application

### 1. Clone the repository

```bash
git clone https://github.com/Duxty12/dhakafounders.git
cd dhakafounders
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root with the following keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Set up Supabase

Create the following table in your Supabase SQL editor:

```sql
create table company_profile (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  category text,
  description text,
  website_url text,
  founder_name text not null,
  founder_email text,
  linkedin_url text,
  created_at timestamptz default now()
);
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 🎨 Brand DNA

| Token | Value | Usage |
|---|---|---|
| **Brand Blue** | `#1E73BE` | Primary buttons, links, accents |
| **Dark Navy** | `#111827` | Headings, stats strip background |
| **Light Blue** | `#EFF6FF` | Section backgrounds, badge fills |
| **Heading Font** | Plus Jakarta Sans | All headings (700–800 weight) |
| **Body Font** | Inter | Body text, labels, descriptions |

---

## 🗺️ Roadmap

- [x] Public founder directory with search & filters
- [x] Authenticated dashboard for startup listing
- [x] Featured startups on landing page
- [x] Responsive design across all breakpoints
- [ ] Founder profile detail pages
- [ ] Advanced search (sector, funding stage, location)
- [ ] Investor connect feature
- [ ] Weekly ecosystem newsletter digest
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and **commit**: `git commit -m "feat: add amazing feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request** against `main`

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br />

Built with ❤️ for Bangladesh's tech community.

**[dhakafounders.com](https://dhakafounders.com)**

<br />

<img src="https://img.shields.io/badge/Made%20in-Bangladesh%20🇧🇩-1E73BE?style=flat-square&labelColor=111827" />

</div>