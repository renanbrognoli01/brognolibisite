"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDictionaryLabel, locales, type Locale } from "@/lib/i18n";

function buildLocaleHref(pathname: string, currentLocale: Locale, targetLocale: Locale) {
  if (!pathname) {
    return targetLocale === "pt-br" ? "/pt-br" : "/en";
  }

  const segments = pathname.split("/");

  if (segments[1] === currentLocale) {
    segments[1] = targetLocale;
  } else if (segments[1] === "pt-br" || segments[1] === "en") {
    segments[1] = targetLocale;
  } else {
    segments.splice(1, 0, targetLocale);
  }

  const normalizedPath = segments.join("/") || `/${targetLocale}`;
  return normalizedPath;
}

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold text-white/70">
      {locales.map((entry) => {
        const active = entry === locale;

        return (
          <Link
            key={entry}
            href={buildLocaleHref(pathname, locale, entry)}
            className={`rounded-full px-3 py-2 transition ${
              active ? "bg-[var(--brand-amber)] text-[#0F1D2A]" : "hover:bg-white/6"
            }`}
          >
            {getDictionaryLabel(entry)}
          </Link>
        );
      })}
    </div>
  );
}
