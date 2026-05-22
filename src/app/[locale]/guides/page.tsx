import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.guides.title} description={dict.guides.description} />

      <Section title={locale === "pt-br" ? "Escolha seu guia" : "Choose your guide"}>
        <div className="grid gap-6 lg:grid-cols-2">
          {dict.guides.groups.map((group) => (
            <div
              key={group.title}
              className={`rounded-[2rem] border p-6 ${
                group.accent === "excel"
                  ? "border-[#13766e]/40 bg-[#13766e]/10"
                  : "border-[#f6b23c]/30 bg-[#f6b23c]/10"
              }`}
            >
              <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
              <div className="mt-6 grid gap-4">
                {group.entries.map((entry) => (
                  <GlassCard key={`${group.title}-${entry.language}`} title={entry.language}>
                    <div className="flex flex-wrap gap-3">
                      <a className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111318]" href={entry.salesPage} target="_blank" rel="noreferrer">
                        {locale === "pt-br" ? "Página de vendas" : "Sales page"}
                      </a>
                      <a className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white" href={entry.buyLink} target="_blank" rel="noreferrer">
                        {locale === "pt-br" ? "Comprar agora" : "Buy now"}
                      </a>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
