"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SiteAccountEntry } from "@/components/site-account-entry";
import type { Locale } from "@/lib/i18n";

export function MobileNavigation({ locale, items }: { locale: Locale; items: { href: string; label: string }[] }) {
  const details = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);
  useEffect(() => {
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape" && details.current?.open) {
        details.current.open = false;
        details.current.querySelector("summary")?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (details.current?.open && !details.current.contains(event.target as Node)) details.current.open = false;
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", dismiss); document.removeEventListener("pointerdown", outside); };
  }, []);
  return <details ref={details} className="mobile-navigation xl:hidden">
    <summary aria-label={locale === "pt-br" ? "Abrir navegação" : "Open navigation"}>Menu</summary>
    <div className="mobile-navigation-panel">
      <nav aria-label={locale === "pt-br" ? "Navegação principal" : "Main navigation"}>
        {items.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => { if (details.current) details.current.open = false; }}>{item.label}</Link>)}
      </nav>
      <SiteAccountEntry locale={locale} mobile />
    </div>
  </details>;
}
