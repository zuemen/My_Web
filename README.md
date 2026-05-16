# zuemen.net — Zuemen Chu's Personal Website

Personal website of **Zuemen Chu (朱廷翊)**, Research Assistant at NCCU MIS, exploring Quantum Finance, Smart Contract Security, and Self-Sovereign Identity.

**Live:** [https://zuemen.net](https://zuemen.net)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 |
| Styling | CSS Modules + Tailwind v4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Fonts | Inter · Newsreader · JetBrains Mono (next/font) |
| Deployment | Vercel |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer, metadata, fonts)
│   ├── page.tsx            # Home: Hero + News + Skills + Contact
│   ├── research/page.tsx   # Research philosophy & areas
│   ├── projects/page.tsx   # Full project list
│   ├── cv/page.tsx         # Experience + CV download
│   ├── notes/page.tsx      # Short writings (WIP)
│   ├── robots.ts           # Robots meta
│   ├── sitemap.ts          # XML sitemap
│   └── globals.css         # Design tokens + global styles
└── components/
    ├── Navbar.tsx / .module.css
    ├── Footer.tsx / .module.css
    ├── Hero.tsx / .module.css
    ├── News.tsx / .module.css
    ├── Skills.tsx / .module.css
    ├── Projects.tsx / .module.css
    ├── Experience.tsx / .module.css
    ├── Philosophy.tsx / .module.css
    └── Contact.tsx / .module.css
```

## Deployment

Deployed to Vercel via GitHub integration. Every push to `main` triggers a production deploy.

## License

MIT
