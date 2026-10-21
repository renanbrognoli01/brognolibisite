import type { Metadata } from "next";
import { headers } from "next/headers";
import { routeMetadata, localePath } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/site-shell";
import { DocumentLanguage } from "@/components/document-language";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const pathname = (await headers()).get("x-brognoli-pathname") ?? localePath(safeLocale);
  return routeMetadata(safeLocale, pathname);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SiteShell locale={locale as Locale}><DocumentLanguage locale={locale as Locale} />{children}</SiteShell>;
}
