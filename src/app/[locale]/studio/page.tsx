import Image from "next/image";

import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData, studioScreenshots } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.studio.title} description={dict.studio.heroText}>
        <div className="relative mx-auto aspect-[1.1] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
          <Image src="/media/studio 1.png" alt="BROGNOLI Studio logo" fill className="object-contain p-8" />
        </div>
      </PageHero>

      <Section
        eyebrow={locale === "pt-br" ? "Proposta de valor" : "Value proposition"}
        title={locale === "pt-br" ? "Um parceiro diário para Power BI" : "A daily partner for Power BI"}
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {dict.studio.benefits.map((benefit) => (
            <GlassCard key={benefit} title={benefit} />
          ))}
        </div>
      </Section>

      <Section
        title={locale === "pt-br" ? "Funcionalidades principais" : "Core capabilities"}
        description={
          locale === "pt-br"
            ? "O BROGNOLI Studio foi desenhado para cobrir desde qualidade de DAX até design, documentação e performance."
            : "BROGNOLI Studio is designed to cover everything from DAX quality to design, documentation, and performance."
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {dict.studio.features.map((feature) => (
            <GlassCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </Section>

      <Section title={locale === "pt-br" ? "Visão da ferramenta" : "A look into the product"}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {studioScreenshots.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
              <Image src={src} alt="BROGNOLI Studio screenshot" fill className="object-cover" />
            </div>
          ))}
        </div>
      </Section>

      <Section title={dict.studio.plansTitle}>
        <div className="grid gap-6 lg:grid-cols-5">
          {dict.studio.plans.map((plan) => (
            <GlassCard key={plan.name} title={plan.name} description={plan.note}>
              <div className="space-y-2 text-sm text-white/72">
                <p className="text-3xl font-semibold text-white">{plan.price}</p>
                <p>{plan.credits}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/64">
          {locale === "pt-br"
            ? "Todos os planos do BROGNOLI Studio terão trial de 15 dias."
            : "All BROGNOLI Studio plans will include a 15-day trial."}
        </p>
      </Section>
    </>
  );
}
