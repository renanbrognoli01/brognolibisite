import { Fragment, type ReactNode } from "react";
import { notFound } from "next/navigation";

import { Container, PageHero } from "@/components/ui";
import type { ArticleBlock } from "@/lib/articles-data";
import { getArticleBySlug, getArticlesForLocale } from "@/lib/articles-data";
import type { Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of ["pt-br", "en"] as const) {
    for (const article of getArticlesForLocale(locale)) {
      params.push({ locale, slug: article.slug });
    }
  }

  return params;
}

function renderInline(text: string) {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={`${token}-${index}`}
          className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[0.95em] text-[var(--brand-amber)]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={`${token}-${index}`} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith("*") && token.endsWith("*")) {
      return (
        <em key={`${token}-${index}`} className="italic text-white/88">
          {token.slice(1, -1)}
        </em>
      );
    }

    return <Fragment key={`${token}-${index}`}>{token}</Fragment>;
  });
}

function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <article className="space-y-8">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={`${block.text}-${index}`}
              className="pt-6 text-3xl font-semibold tracking-tight text-white md:text-[2.1rem]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "code") {
          return (
            <div
              key={`${block.language ?? "code"}-${index}`}
              className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[var(--surface-1)] shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
            >
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-amber)]">
                {block.language ?? "Code"}
              </div>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-7 text-white/84">
                <code>{block.code}</code>
              </pre>
            </div>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={`list-${index}`}
              className="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 text-base leading-8 text-white/78 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
            >
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-amber)]" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block.text}-${index}`} className="text-lg leading-9 text-white/78">
            {renderInline(block.text)}
          </p>
        );
      })}
    </article>
  );
}

function MetadataLine({ children }: { children: ReactNode }) {
  return <span className="flex items-center gap-3">{children}</span>;
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
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-amber)]">
              {locale === "pt-br" ? "Artigo publicado" : "Published article"}
            </p>
            <p className="text-2xl font-semibold text-white">{article.author}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/68">
            <MetadataLine>
              <span>{article.publishedAt}</span>
            </MetadataLine>
            <MetadataLine>
              <span>{article.readingTime}</span>
            </MetadataLine>
            <MetadataLine>
              <span>{article.category}</span>
            </MetadataLine>
          </div>
        </div>
      </PageHero>

      <section className="py-16">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)] md:p-10">
              <ArticleBody blocks={article.body} />
            </div>
            <aside className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
                  {locale === "pt-br" ? "Leitura rápida" : "Quick read"}
                </p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-white/72">
                  <p>
                    {locale === "pt-br"
                      ? "Esse artigo foi formatado para leitura completa no site, com exemplos DAX destacados e resumos em blocos para consulta rápida."
                      : "This article is formatted for long-form reading, with highlighted DAX examples and recap blocks for quick reference."}
                  </p>
                  <p>
                    {locale === "pt-br"
                      ? "Se você estiver estudando no Power BI, vale abrir o DAX Studio em paralelo para testar os exemplos e observar o comportamento do engine."
                      : "If you are studying inside Power BI, open DAX Studio alongside it to test the examples and observe engine behavior."}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
