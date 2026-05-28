import { PageHero, Section } from "@/components/ui";
import { MDXContent } from "@/components/mdx-content";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export async function generateStaticParams({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const language = locale === "pt-br" ? "pt" : "en";
  const slugs = getArticleSlugs(language);

  return slugs.map((slug) => ({
    locale,
    slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const language = locale === "pt-br" ? "pt" : "en";

  const article = getArticle(slug, language);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={article.title}
        description={article.description}
      >
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>By {article.author}</span>
          <span>•</span>
          <span>
            {new Date(article.date).toLocaleDateString(
              language === "pt" ? "pt-BR" : "en-US"
            )}
          </span>
          <span>•</span>
          <span>{article.readTime}</span>
          <span>•</span>
          <span>{article.category}</span>
        </div>
      </PageHero>

      <Section>
        <MDXContent>
          <MDXRemote source={article.content} />
        </MDXContent>
      </Section>
    </>
  );
}
