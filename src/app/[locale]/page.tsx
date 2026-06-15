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
import type { Locale } from "@/lib/i18n";
import { siteData } from "@/lib/site-data";

function InsightIcon({ type }: { type: "spark" | "bars" | "shield" | "palette" }) {
  if (type === "spark") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--brand-amber)]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
      </svg>
    );
  }

  if (type === "bars") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--brand-amber)]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 19V11" />
        <path d="M12 19V7" />
        <path d="M19 19V4" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--brand-amber)]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l7 3v6c0 4.5-2.8 7.7-7 9-4.2-1.3-7-4.5-7-9V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[var(--brand-amber)]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <circle cx="7" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];
  const isPt = locale === "pt-br";

  const credentials = [
    {
      src: "/media/certificacao 1.png",
      title: "Data Analyst Associate",
    },
    {
      src: "/media/certificacao 2.png",
      title: "Microsoft Certified Trainer",
    },
    {
      src: "/media/certificacao 3.png",
      title: "MCSA BI Reporting",
    },
    {
      src: "/media/certificacao 4.png",
      title: "Excel Associate",
    },
  ];

  const studioHighlights = [
    {
      title: isPt ? "IA com contexto do modelo" : "AI with model context",
      description: isPt
        ? "O Studio entende tabelas, colunas, medidas e relacionamentos para gerar sugestões mais assertivas."
        : "Studio understands tables, columns, measures, and relationships to deliver more accurate suggestions.",
      icon: "spark" as const,
    },
    {
      title: isPt ? "Aceleração de DAX" : "DAX acceleration",
      description: isPt
        ? "Criação, documentação, formatação e otimização em um fluxo pensado para o trabalho real."
        : "Creation, documentation, formatting, and optimization in a workflow designed for real work.",
      icon: "bars" as const,
    },
    {
      title: isPt ? "Governança e padrões" : "Governance and standards",
      description: isPt
        ? "Mais consistência em nomes, traduções, documentação e melhores práticas no modelo."
        : "More consistency across naming, translations, documentation, and best practices in the model.",
      icon: "shield" as const,
    },
    {
      title: isPt ? "Visual e produtividade" : "Visuals and productivity",
      description: isPt
        ? "Themes, backgrounds e recursos visuais para acelerar a entrega sem perder qualidade."
        : "Themes, backgrounds, and visual tools to accelerate delivery without losing quality.",
      icon: "palette" as const,
    },
  ];

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
        eyebrow={isPt ? "Credenciais" : "Credentials"}
        title={
          isPt
            ? "Certificações e experiência prática para transformar dados em decisões"
            : "Certifications and hands-on experience focused on turning data into decisions"
        }
        description={
          isPt
            ? "Uma base construída com formação sólida, prática real em projetos, certificações Microsoft e atuação contínua em software, conteúdo e analytics."
            : "Built on formal education, real project delivery, Microsoft certifications, and ongoing work in software, content, and analytics."
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((credential) => (
              <div
                key={credential.src}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 text-center"
              >
                <div className="mx-auto flex h-28 w-28 items-start justify-center rounded-[1.35rem] bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.15)]">
                  <div className="relative h-full w-full">
                    <Image src={credential.src} alt={credential.title} fill className="object-contain object-top" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium leading-6 text-white/78">{credential.title}</p>
              </div>
            ))}
          </div>

          <GlassCard
            title={isPt ? "Resumo profissional" : "Professional snapshot"}
            description={
              isPt
                ? "Mais de uma década combinando BI, Excel, dashboards, performance, governança e produtos digitais."
                : "More than a decade combining BI, Excel, dashboards, performance, governance, and digital products."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li>• {isPt ? "Atuação com clientes nacionais e internacionais" : "Experience with national and international clients"}</li>
              <li>• {isPt ? "Mais de 200 dashboards e soluções analíticas entregues" : "More than 200 dashboards and analytical solutions delivered"}</li>
              <li>• {isPt ? "Conteúdo em português e inglês para a comunidade de dados" : "Content in Portuguese and English for the data community"}</li>
              <li>• {isPt ? "Foco em software, produtividade e analytics aplicado" : "Strong focus on software, productivity, and applied analytics"}</li>
            </ul>
          </GlassCard>
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Ecossistema" : "Ecosystem"}
        title={isPt ? "Produtos, conteúdo e software para dados" : "Products, content, and software for data work"}
        description={
          isPt
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
        title={isPt ? "O software em destaque do ecossistema" : "The flagship software in the ecosystem"}
        description={
          isPt
            ? "O BROGNOLI Studio combina IA, automação, produtividade e criação visual para transformar a forma como profissionais trabalham com Power BI."
            : "BROGNOLI Studio combines AI, automation, productivity, and visual creation to reshape how professionals work with Power BI."
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <GlassCard
            title={isPt ? "Uma plataforma pensada para performance real" : "A platform designed for real performance"}
            description={
              isPt
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
            {studioHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgba(255,204,0,0.12)]">
                  <InsightIcon type={item.icon} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/72">{item.description}</p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="h-6 w-3 rounded-full bg-[color:rgba(0,178,169,0.5)]" />
                  <span className="h-9 w-3 rounded-full bg-[color:rgba(0,178,169,0.7)]" />
                  <span className="h-12 w-3 rounded-full bg-[color:rgba(255,204,0,0.8)]" />
                  <span className="h-8 w-3 rounded-full bg-[color:rgba(0,178,169,0.6)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Presença digital" : "Digital presence"}
        title={isPt ? "Conteúdo, comunidade e produtos" : "Content, community, and products"}
        description={
          isPt
            ? "Além do software, o ecossistema Brognoli BI reúne vídeos, ebooks e outros produtos digitais em expansão."
            : "Beyond software, the Brognoli BI ecosystem brings together videos, ebooks, and expanding digital products."
        }
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard
            title={isPt ? "Canal em português" : "Portuguese channel"}
            description={
              isPt
                ? "Dicas, novidades e tutoriais sobre Power BI, Excel e produtividade."
                : "Tutorials, updates, and practical content about Power BI, Excel, and productivity."
            }
            href={`/${locale}/videos`}
          />
          <GlassCard
            title={isPt ? "Guias de bolso" : "Pocket guides"}
            description={
              isPt
                ? "Materiais diretos para apoiar a rotina de quem quer evoluir mais rápido."
                : "Practical materials designed to support professionals who want to move faster."
            }
            href={`/${locale}/guides`}
          />
          <GlassCard
            title={isPt ? "Outros produtos" : "Other products"}
            description={
              isPt
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
