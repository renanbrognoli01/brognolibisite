import { notFound } from "next/navigation";

import { PageHero, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { getArticleBySlug, getArticlesForLocale } from "@/lib/articles-data";

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of ["pt-br", "en"] as const) {
    for (const article of getArticlesForLocale(locale)) {
      params.push({ locale, slug: article.slug });
    }
  }

  return params;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={article.eyebrow ?? article.category}
        title={article.title}
        description={article.summary}
      >
        <div className="space-y-3 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-sm text-white/72 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <p className="font-semibold text-white">{article.author}</p>
          <div className="flex flex-wrap gap-3">
            <span>{article.publishedAt}</span>
            <span className="text-white/28">•</span>
            <span>{article.readingTime}</span>
            <span className="text-white/28">•</span>
            <span>{article.category}</span>
          </div>
        </div>
      </PageHero>

      <Section title={article.title} description={article.summary}>
        <article className="mx-auto max-w-4xl space-y-10 text-white/88">
          <div className="space-y-6 text-lg leading-8 text-white/78">
            {article.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight text-white">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-white/78">
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="space-y-3 pl-5 text-base leading-8 text-white/78">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {article.conclusion?.length ? (
            <section className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {locale === "pt-br" ? "Conclusão" : "Conclusion"}
              </h2>
              {article.conclusion.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-white/78">
                  {paragraph}
                </p>
              ))}
            </section>
          ) : null}
        </article>
      </Section>
    </>
  );
}
