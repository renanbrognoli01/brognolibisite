"use client";

import { useState } from "react";

type Locale = "pt-br" | "en";

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
    >
      <path
        d="M9.5 14.5 14.5 9m-7.25 8.25-1 1a3.18 3.18 0 0 1-4.5-4.5l3-3a3.18 3.18 0 0 1 4.5 0m5.5 2.5a3.18 3.18 0 0 1 0-4.5m0 0a3.18 3.18 0 0 1 4.5-4.5 3.18 3.18 0 0 1 0 4.5l-1 1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyMaterialLink({ href, locale }: { href: string; locale: Locale }) {
  const [copied, setCopied] = useState(false);
  const isPt = locale === "pt-br";

  async function copyLink() {
    const url = new URL(href, "https://brognolibi.com").toString();

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/24 hover:bg-white/[0.08]"
      aria-live="polite"
    >
      <LinkIcon />
      {copied ? (isPt ? "Link copiado!" : "Link copied!") : isPt ? "Copiar link" : "Copy link"}
    </button>
  );
}
