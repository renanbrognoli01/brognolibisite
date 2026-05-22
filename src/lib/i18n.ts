export const locales = ["pt-br", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-br";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionaryLabel(locale: Locale) {
  return locale === "pt-br" ? "PT-BR" : "EN";
}
