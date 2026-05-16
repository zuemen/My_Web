import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    default: "Zuemen Chu (朱廷翊) — Quantum Finance & Blockchain Researcher",
    template: "%s · Zuemen Chu",
  },
  description:
    "Zuemen Chu (朱廷翊) is a Research Assistant at National Chengchi University MIS, exploring Quantum Finance, QML, Smart Contract Security, RWA Tokenization, and Self-Sovereign Identity.",
  keywords: [
    "Quantum Finance",
    "QML",
    "Quantum Machine Learning",
    "Smart Contract Security",
    "RWA Tokenization",
    "ERC-3643",
    "SSI",
    "DID",
    "NCCU MIS",
    "Blockchain",
    "Zuemen Chu",
    "朱廷翊",
  ],
  authors: [{ name: "Zuemen Chu", url: "https://zuemen.net" }],
  creator: "Zuemen Chu",
  openGraph: {
    type: "profile",
    url: "https://zuemen.net",
    title: "Zuemen Chu (朱廷翊) — Quantum & Blockchain Researcher",
    description:
      "Research Assistant at NCCU MIS. Working on Quantum Finance, Smart Contract Security, and Self-Sovereign Identity.",
    siteName: "zuemen.net",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Zuemen Chu — Quantum Finance & Blockchain Researcher",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuemen Chu — Quantum & Blockchain Researcher",
    description:
      "Research Assistant at NCCU MIS. Quantum Finance, Smart Contract Security, SSI/DID.",
    images: ["/og.png"],
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
    "Quantum Finance",
    "Quantum Machine Learning",
    "Smart Contract Security",
    "Self-Sovereign Identity",
    "RWA Tokenization",
    "ERC-3643",
    "Blockchain",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
