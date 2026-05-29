import { GlassCard, PageHero, Section } from "@/components/ui";
import { getArticlesForLocale } from "@/lib/articles-data";
import type { Locale } from "@/lib/i18n";
import { siteData } from "@/lib/site-data";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];
  const articles = getArticlesForLocale(locale);

  return (
    <>
      <PageHero title={dict.articles.title} description={dict.articles.description} />
      {articles.length ? (
        <Section
          title={locale === "pt-br" ? "Artigos publicados" : "Published articles"}
          description={
            locale === "pt-br"
              ? "Conteudos autorais sobre Power BI, DAX, analytics e produtividade publicados no site."
              : "Original content about Power BI, DAX, analytics, and productivity published on the site."
          }
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <GlassCard
                key={article.slug}
                title={article.title}
                description={article.summary}
                href={`/${locale}/articles/${article.slug}`}
              >
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>{article.publishedAt}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span>{article.readingTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#f6b23c]">
                      {article.category}
                    </div>
                    {article.featured ? (
                      <div className="inline-flex rounded-full border border-[#13766e]/30 bg-[#13766e]/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#7de1d8]">
                        {locale === "pt-br" ? "Destaque" : "Featured"}
                      </div>
                    ) : null}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>
      ) : (
        <Section title={dict.articles.placeholderTitle}>
          <GlassCard title={dict.articles.placeholderTitle} description={dict.articles.placeholderBody} />
        </Section>
      )}
    </>
  );
}
