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
        <HeroPortrait src="/media/renan 2.png" />
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
        eyebrow={locale === "pt-br" ? "Credenciais" : "Credentials"}
        title={
          locale === "pt-br"
            ? "Certificações e experiência prática para transformar dados em decisões"
            : "Certifications and hands-on experience focused on turning data into decisions"
        }
        description={
          locale === "pt-br"
            ? "Uma base construída com formação sólida, prática real em projetos, certificações Microsoft e atuação contínua em software, conteúdo e analytics."
            : "Built on formal education, real project delivery, Microsoft certifications, and ongoing work in software, content, and analytics."
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["/media/certificacao 1.png", "/media/certificacao 2.png", "/media/certificacao 3.png", "/media/certificacao 4.png"].map((src) => (
              <div key={src} className="rounded-[1.75rem] border border-white/10 bg-white p-4">
                <div className="relative mx-auto aspect-square w-full max-w-[10rem]">
                  <Image src={src} alt="Microsoft certification" fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>

          <GlassCard
            title={locale === "pt-br" ? "Resumo profissional" : "Professional snapshot"}
            description={
              locale === "pt-br"
                ? "Mais de uma década combinando BI, Excel, dashboards, performance, governança e produtos digitais."
                : "More than a decade combining BI, Excel, dashboards, performance, governance, and digital products."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li>• {locale === "pt-br" ? "Atuação com clientes nacionais e internacionais" : "Experience with national and international clients"}</li>
              <li>• {locale === "pt-br" ? "Mais de 200 dashboards e soluções analíticas entregues" : "More than 200 dashboards and analytical solutions delivered"}</li>
              <li>• {locale === "pt-br" ? "Conteúdo em português e inglês para a comunidade de dados" : "Content in Portuguese and English for the data community"}</li>
              <li>• {locale === "pt-br" ? "Foco em software, produtividade e analytics aplicado" : "Strong focus on software, productivity, and applied analytics"}</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

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
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0f121a]">
              <Image src="/media/studio 2.png" alt="BROGNOLI Studio" fill className="object-contain p-8" />
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

      <Section
        eyebrow={locale === "pt-br" ? "Presença digital" : "Digital presence"}
        title={locale === "pt-br" ? "Conteúdo, comunidade e produtos" : "Content, community, and products"}
        description={
          locale === "pt-br"
            ? "Além do software, o ecossistema Brognoli BI reúne vídeos, ebooks e outros produtos digitais em expansão."
            : "Beyond software, the Brognoli BI ecosystem brings together videos, ebooks, and expanding digital products."
        }
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard
            title={locale === "pt-br" ? "Canal em português" : "Portuguese channel"}
            description={
              locale === "pt-br"
                ? "Dicas, novidades e tutoriais sobre Power BI, Excel e produtividade."
                : "Tutorials, updates, and practical content about Power BI, Excel, and productivity."
            }
            href={`/${locale}/videos`}
          />
          <GlassCard
            title={locale === "pt-br" ? "Guias de bolso" : "Pocket guides"}
            description={
              locale === "pt-br"
                ? "Materiais diretos para apoiar a rotina de quem quer evoluir mais rápido."
                : "Practical materials designed to support professionals who want to move faster."
            }
            href={`/${locale}/guides`}
          />
          <GlassCard
            title={locale === "pt-br" ? "Outros produtos" : "Other products"}
            description={
              locale === "pt-br"
                ? "Conheça também iniciativas como o Calmia e futuros produtos do grupo."
                : "Explore initiatives such as Calmia and future products from the group."
            }
            href={`/${locale}/products`}
          />
        </div>
      </Section>
    </>
  );
}
