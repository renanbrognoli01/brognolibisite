import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.articles.title} description={dict.articles.description} />
      <Section title={dict.articles.placeholderTitle}>
        <GlassCard title={dict.articles.placeholderTitle} description={dict.articles.placeholderBody} />
      </Section>
    </>
  );
}
