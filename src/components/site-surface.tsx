"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isMarketingPath } from "@/lib/public-routes";

export function SiteSurface({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div className={`site-frame min-h-screen bg-[var(--background)] text-[var(--text-primary)] ${isMarketingPath(pathname) ? "brand-public" : ""}`}>{children}</div>;
}
