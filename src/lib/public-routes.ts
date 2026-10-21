export const PUBLIC_SECTIONS = ["", "about", "studio", "guides", "videos", "articles", "materials", "products", "contact", "privacy", "terms"] as const;

export function isMarketingPath(pathname: string) {
  const section = pathname.split("/")[2] ?? "";
  return PUBLIC_SECTIONS.includes(section as typeof PUBLIC_SECTIONS[number]) && !["privacy", "terms"].includes(section);
}
