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
    <div className="locale-switcher">
      {locales.map((entry) => {
        const active = entry === locale;

        return (
          <Link
            key={entry}
            href={buildLocaleHref(pathname, locale, entry)}
            className={`locale-option ${
              active ? "locale-active" : "hover:bg-white/6"
            }`}
          >
            {getDictionaryLabel(entry)}
          </Link>
        );
      })}
    </div>
  );
}
