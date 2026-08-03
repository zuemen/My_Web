import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  description:
    "Zuemen Chu (朱廷翊) is a Research Assistant at NCCU MIS, working on blockchain trust infrastructure — Self-Sovereign Identity (SSI/VC/DID), smart contract security, and RWA tokenization, with applications in fintech.",
  keywords: [
    "Blockchain",
    "SSI",
    "DID",
    "VC",
    "Smart Contract Security",
    "RWA Tokenization",
    "ERC-3643",
    "Fintech",
    "NCCU MIS",
    "Quantum Finance",
    "QML",
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
      "Research Assistant at NCCU MIS. Working on Self-Sovereign Identity (SSI/VC/DID), Smart Contract Security, and RWA Tokenization.",
    siteName: "zuemen.net",
    // Image comes from app/opengraph-image.tsx (file-based metadata). Listing
    // it here too would just reintroduce a hardcoded path to keep in sync.
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuemen Chu — Blockchain & Digital Trust Infrastructure",
    description:
      "Research Assistant at NCCU MIS. Self-Sovereign Identity (SSI/VC/DID), Smart Contract Security, RWA Tokenization.",
    // No twitter:image — Twitter/X falls back to og:image, which is generated.
  },
  alternates: { canonical: "https://zuemen.net" },
};

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
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
