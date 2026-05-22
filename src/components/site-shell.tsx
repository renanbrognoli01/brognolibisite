import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { getDictionaryLabel, locales, type Locale } from "@/lib/i18n";
import { siteData } from "@/lib/site-data";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

function LocaleSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold text-white/70">
      {locales.map((entry) => {
        const active = entry === locale;

        return (
          <Link
            key={entry}
            href={entry === "pt-br" ? "/pt-br" : "/en"}
            className={`rounded-full px-3 py-2 transition ${
              active ? "bg-[#f6b23c] text-[#101114]" : "hover:bg-white/6"
            }`}
          >
            {getDictionaryLabel(entry)}
          </Link>
        );
      })}
    </div>
  );
}

export function SiteShell({ locale, children }: SiteShellProps) {
  const dict = siteData[locale];

  return (
    <div className="min-h-screen bg-[#090b11] text-white">
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(246,178,60,0.2),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(19,118,110,0.16),_transparent_35%)] pointer-events-none" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b11]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href={locale === "pt-br" ? "/pt-br" : "/en"} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <Image
                src="/media/brognolibi 1.png"
                alt="Brognoli BI"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-2xl font-semibold tracking-tight text-white">{dict.siteTitle}</p>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {dict.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/72 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LocaleSwitcher locale={locale} />
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="border-t border-white/10 bg-[#090b11]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <Image src="/media/brognolibi 1.png" alt="Brognoli BI" fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/45">Brognoli BI</p>
                <p className="font-semibold">{dict.siteTitle}</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/64">{dict.footerText}</p>
          </div>

          <div className="grid gap-3 text-sm text-white/72 sm:grid-cols-2">
            {dict.nav.map((item) => (
              <Link key={`footer-${item.href}`} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/privacy`} className="transition hover:text-white">
              {locale === "pt-br" ? "Privacidade" : "Privacy"}
            </Link>
            <Link href={`/${locale}/terms`} className="transition hover:text-white">
              {locale === "pt-br" ? "Termos" : "Terms"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
