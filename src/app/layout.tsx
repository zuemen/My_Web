import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZUEMEN.CHU | 朱廷翊 - Quantum Finance & Blockchain Researcher",
  description: "Personal portfolio of ZUEMEN (朱廷翊), focusing on Quantum Finance, Blockchain, and Secure Digital Identity.",
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
