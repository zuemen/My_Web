import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import LanguageProvider from "@/i18n/LanguageProvider";
import SkipLink from "@/components/SkipLink";
import "./globals.css";

// Inter was the body face. It is the default of every scaffolded site and
// carries no voice of its own; Plex has the technical heritage this content
// wants and still sits comfortably under Newsreader.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zuemen.net"),
  title: {
    default: "Zuemen Chu (朱廷翊) — Blockchain & Digital Trust Infrastructure",
    template: "%s · Zuemen Chu",
  },
  // Kept under 155 characters so search engines show it without truncating.
  description:
    "Zuemen Chu (朱廷翊) — NCCU MIS research assistant, Cathay Financial Holdings blockchain intern. SSI, contract security and x402 agent payments.",
  keywords: [
    "Blockchain",
    "SSI",
    "DID",
    "VC",
    "Smart Contract Security",
    "RWA Tokenization",
    "ERC-3643",
    "x402",
    "Agent Payments",
    "Agentic AI",
    "Fintech",
    "NCCU MIS",
    "Quantum Finance",
    "QML",
    "IBM Qiskit",
    "Quantum Hackathon",
    "Zuemen Chu",
    "朱廷翊",
  ],
  authors: [{ name: "Zuemen Chu", url: "https://zuemen.net" }],
  creator: "Zuemen Chu",
  openGraph: {
    type: "profile",
    url: "https://zuemen.net",
    title: "Zuemen Chu — Blockchain & Digital Trust Infrastructure",
    description:
      "Research Assistant at NCCU MIS. Working on Self-Sovereign Identity (SSI/VC/DID), Smart Contract Security, RWA Tokenization, and x402 agent payments.",
    siteName: "zuemen.net",
    // Image comes from app/opengraph-image.tsx (file-based metadata). Listing
    // it here too would just reintroduce a hardcoded path to keep in sync.
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuemen Chu — Blockchain & Digital Trust Infrastructure",
    description:
      "Research Assistant at NCCU MIS. Self-Sovereign Identity (SSI/VC/DID), Smart Contract Security, RWA Tokenization, x402 agent payments.",
    // No twitter:image — Twitter/X falls back to og:image, which is generated.
  },
  alternates: { canonical: "https://zuemen.net" },
};

// Evaluated at build time — layout is a server component — so each deploy
// refreshes the footer date. en-CA gives YYYY-MM-DD; the explicit timeZone keeps
// a late-night build on a UTC machine from rolling back a day.
const lastUpdated = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Taipei",
}).format(new Date());

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zuemen Chu",
  alternateName: ["Zuemen", "朱廷翊", "Ting-Yi Chu"],
  url: "https://zuemen.net",
  image: "https://zuemen.net/zuemen.jpg",
  sameAs: [
    "https://github.com/zuemen",
    "https://www.linkedin.com/in/%E5%BB%B7%E7%BF%8A-%E6%9C%B1-95838538a/",
  ],
  jobTitle: "Research Assistant",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "National Chengchi University",
    department: "Management Information Systems",
  },
  knowsAbout: [
    "Blockchain",
    "Self-Sovereign Identity",
    "Decentralized Identifiers",
    "Verifiable Credentials",
    "Smart Contract Security",
    "RWA Tokenization",
    "ERC-3643",
    "Fintech",
    "Quantum Finance",
    "Quantum Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <SkipLink />
          <MotionProvider>
            <Navbar />
            {children}
            <Footer lastUpdated={lastUpdated} />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
