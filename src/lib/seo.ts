import type { Metadata } from "next";
import { articles, getArticleBySlug } from "@/lib/articles-data";
import { getPublishedMaterials } from "@/lib/materials";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";
import { PUBLIC_SECTIONS } from "@/lib/public-routes";
export { PUBLIC_SECTIONS } from "@/lib/public-routes";

export const SITE_ORIGIN = "https://brognolibi.com";
export function localePath(locale: Locale, section = "") { return "/" + locale + (section ? "/" + section : ""); }
export function languageAlternates(section: string) {
  return { "pt-BR": SITE_ORIGIN + localePath("pt-br", section), en: SITE_ORIGIN + localePath("en", section) };
}

export async function routeMetadata(locale: Locale, pathname: string): Promise<Metadata> {
  const dict = siteData[locale];
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[1] ?? "";
  const suffix = parts.slice(1).join("/");
  const canonical = SITE_ORIGIN + localePath(locale, suffix);
  let title = section ? dict.nav.find(item => item.href === localePath(locale, section))?.label ?? dict.siteTitle : dict.siteTitle + " | " + (locale === "pt-br" ? "Power BI, Excel e Analytics" : "Power BI, Excel, and Analytics");
  let description = dict.home.hero.description;
  let type: "website" | "article" = "website";
  let publishedTime: string | undefined;
  if (section === "about") description = dict.about.intro[0];
  if (section === "studio") description = dict.studio.heroText;
  if (section === "guides") description = dict.guides.description;
  if (section === "videos") description = locale === "pt-br"
    ? "Acompanhe meus canais em português e inglês com dicas, atualizações e conteúdo prático sobre Power BI, Excel e analytics."
    : "Follow my Portuguese and English channels for practical content, updates, and insights about Power BI, Excel, and analytics.";
  if (section === "materials") description = locale === "pt-br"
    ? "Baixe arquivos, modelos e exemplos utilizados nos vídeos da Brognoli BI em um só lugar."
    : "Download the files, templates, and examples used in Brognoli BI videos from one central place.";
  if (section === "articles") description = dict.articles.description;
  if (section === "products") description = dict.products.description;
  if (section === "contact") description = dict.contact.description;
  if (section === "privacy" || section === "terms") {
    title = dict[section].title;
    description = dict[section].sections[0]?.body[0] ?? description;
  }
  if (section === "articles" && parts[2]) {
    const article = getArticleBySlug(locale, parts[2]);
    if (article) { title = article.title; description = article.summary; type = "article"; publishedTime = article.publishedAt; }
  }
  if (section === "materials" && parts[2]) {
    const { items } = await getPublishedMaterials();
    const material = items.find(item => item.slug === parts[2]);
    if (material) { title = material.title; description = material.title + " — " + material.category + ", " + material.fileType + "."; }
  }
  const publicSection = PUBLIC_SECTIONS.includes(section as typeof PUBLIC_SECTIONS[number]);
  const validDepth = parts.length <= 2 || (parts.length === 3 && (section === "articles" || section === "materials"));
  const knownArticle = section !== "articles" || !parts[2] || articles.some(article => article.slug === parts[2]);
  const indexable = publicSection && validDepth && knownArticle;
  const documentTitle = section ? title + " | " + dict.siteTitle : title;
  return {
    title: documentTitle,
    description,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    alternates: { canonical, ...(indexable ? { languages: languageAlternates(suffix) } : {}) },
    openGraph: { title: documentTitle, description, url: canonical, siteName: dict.siteTitle, locale: locale === "pt-br" ? "pt_BR" : "en_US", type, ...(publishedTime ? { publishedTime } : {}) },
    twitter: { card: "summary", title: documentTitle, description },
  };
}
