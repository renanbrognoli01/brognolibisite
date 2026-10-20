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
      <header className="site-header">
        <div className="site-nav-frame">
          <Link href={locale === "pt-br" ? "/pt-br" : "/en"} className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/media/LogoDesktop.png"
                alt="Brognoli BI"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
            <p className="brand-name">
              {dict.siteTitle}
            </p>
          </Link>

          <nav className="desktop-navigation">
            {dict.nav.filter((item) => ["/studio", "/articles", "/guides", "/about"].some((suffix) => item.href.endsWith(suffix))).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <SiteAccountEntry locale={locale} />
            <LocaleSwitcher locale={locale} />
            <details className="site-menu"><summary>Menu</summary><nav aria-label={locale === "pt-br" ? "Todas as páginas" : "All pages"}>{dict.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href={`/${locale}/login`}>{locale === "pt-br" ? "Minha conta" : "My account"}</Link></nav></details>
          </div>
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="site-footer">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src="/media/LogoDesktop.png"
                  alt="Brognoli BI"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="footer-wordmark">Brognoli BI</p>
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
