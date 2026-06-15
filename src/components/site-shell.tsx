import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type { Locale } from "@/lib/i18n";
import { siteData } from "@/lib/site-data";
import { SiteAccountEntry } from "@/components/site-account-entry";
import { LocaleSwitcher } from "@/components/locale-switcher";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  const dict = siteData[locale];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top_left,_rgba(15,76,129,0.28),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(0,178,169,0.16),_transparent_36%),linear-gradient(180deg,_rgba(7,21,33,0),_rgba(7,21,33,0.82))]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:rgba(7,21,33,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href={locale === "pt-br" ? "/pt-br" : "/en"} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <Image
                src="/media/LogoDesktop.png"
                alt="Brognoli BI"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="whitespace-nowrap text-2xl font-semibold tracking-tight text-white">
              {dict.siteTitle}
            </p>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {dict.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/72 transition hover:text-[var(--brand-amber)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SiteAccountEntry locale={locale} />
            <LocaleSwitcher locale={locale} />
          </div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="border-t border-white/10 bg-[var(--background)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <Image src="/media/LogoDesktop.png" alt="Brognoli BI" fill className="object-contain" />
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
