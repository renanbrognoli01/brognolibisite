"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

// Root layouts persist during client navigation, so keep the document language in sync.
export function DocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "pt-br" ? "pt-BR" : "en";
  }, [locale]);
  return null;
}
