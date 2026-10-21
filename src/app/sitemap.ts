import type { MetadataRoute } from "next";
import { SITE_ORIGIN, PUBLIC_SECTIONS, languageAlternates, localePath } from "@/lib/seo";
import { articles } from "@/lib/articles-data";
import { getPublishedMaterials } from "@/lib/materials";
import { locales } from "@/lib/i18n";

export const revalidate = 1800;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items } = await getPublishedMaterials();
  const sections = [...PUBLIC_SECTIONS, ...articles.map(article => "articles/" + article.slug), ...items.map(item => "materials/" + item.slug)];
  return locales.flatMap(locale => sections.map(section => ({
    url: SITE_ORIGIN + localePath(locale, section),
    alternates: { languages: languageAlternates(section) },
  })));
}
