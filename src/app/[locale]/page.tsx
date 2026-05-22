import Image from "next/image";

import {
  Container,
  GlassCard,
  HeroPortrait,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero
        eyebrow={dict.home.hero.eyebrow}
        title={dict.home.hero.title}
        description={dict.home.hero.description}
      >
        <HeroPortrait />
      </PageHero>

      <section className="py-10">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {dict.home.quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-4xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/45">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href={dict.home.hero.primaryCta.href}>
              {dict.home.hero.primaryCta.label}
            </PrimaryButton>
            <SecondaryButton href={dict.home.hero.secondaryCta.href}>
              {dict.home.hero.secondaryCta.label}
            </SecondaryButton>
          </div>
        </Container>
      </section>

      <Section
        eyebrow={locale === "pt-br" ? "Ecossistema" : "Ecosystem"}
        title={locale === "pt-br" ? "Produtos, conteúdo e software para dados" : "Products, content, and software for data work"}
        description={
          locale === "pt-br"
            ? "O site Brognoli BI foi pensado para reunir sua trajetória, seus produtos e os recursos mais úteis para profissionais e empresas."
            : "Brognoli BI is designed to bring together your expertise, products, and the most useful resources for professionals and companies."
        }
      >
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {dict.home.sections.map((section) => (
            <GlassCard
              key={section.id}
              title={section.title}
              description={section.description}
              href={section.href}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="BROGNOLI Studio"
        title={locale === "pt-br" ? "O software em destaque do ecossistema" : "The flagship software in the ecosystem"}
        description={
          locale === "pt-br"
            ? "O BROGNOLI Studio combina IA, automação, produtividade e criação visual para transformar a forma como profissionais trabalham com Power BI."
            : "BROGNOLI Studio combines AI, automation, productivity, and visual creation to reshape how professionals work with Power BI."
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <GlassCard
            title={locale === "pt-br" ? "Uma plataforma pensada para performance real" : "A platform designed for real performance"}
            description={
              locale === "pt-br"
                ? "Criação de medidas, documentação, otimização, background generator, themes, tradução de modelo e muito mais."
                : "Measure creation, documentation, optimization, background generation, themes, model translation, and more."
            }
            href={`/${locale}/studio`}
          >
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10">
              <Image src="/media/studio 2.png" alt="BROGNOLI Studio" fill className="object-cover" />
            </div>
          </GlassCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {["/media/dax creator.png", "/media/background generator.png", "/media/performance analyzer.png", "/media/theme creator.png"].map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                <Image src={src} alt="Studio screenshot" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
