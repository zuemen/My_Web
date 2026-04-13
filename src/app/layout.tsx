import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy Chu | 朱廷翊 - Quantum Finance & Blockchain Researcher",
  description: "Personal portfolio of Andy Chu (朱廷翊), focusing on Quantum Amplitude Estimation, RWA Tokenization, and Agentic AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
      </body>
    </html>
  );
}
