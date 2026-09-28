import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brognoli BI",
  description: "Official website for Renan Brognoli, BROGNOLI Studio, products, videos, and guides.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Request headers carry the per-request CSP nonce generated in src/proxy.ts.
  // Reading them opts HTML rendering into request time so static HTML can never
  // contain a reusable or missing nonce.
  await headers();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-white flex flex-col">{children}</body>
    </html>
  );
}
