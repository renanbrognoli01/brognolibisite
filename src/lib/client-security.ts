import type { Locale } from "@/lib/i18n";

export function getSafeInternalRedirect(
  candidate: string | null | undefined,
  locale: Locale,
  origin: string,
) {
  const fallback = `/${locale}/account`;
  const value = candidate?.trim();

  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }

  try {
    const url = new URL(value, origin);
    const localeRoot = `/${locale}`;
    if (
      url.origin !== origin ||
      (url.pathname !== localeRoot && !url.pathname.startsWith(`${localeRoot}/`))
    ) {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function isTrustedStripeCheckoutUrl(candidate: string) {
  try {
    const url = new URL(candidate);
    return (
      url.protocol === "https:" &&
      url.hostname === "checkout.stripe.com" &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}
