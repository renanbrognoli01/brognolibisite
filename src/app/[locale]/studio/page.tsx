import Image from "next/image";

import { ScreenshotGallery } from "@/components/screenshot-gallery";
import {
  GlassCard,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { siteData, studioScreenshots } from "@/lib/site-data";

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];
  const isPt = locale === "pt-br";

  const painPoints = isPt
    ? [
        "Medidas DAX demoradas e repetitivas",
        "Falta de padronização e documentação",
        "Ajustes visuais que tomam tempo demais",
        "Dificuldade para diagnosticar gargalos no modelo",
      ]
    : [
        "Slow and repetitive DAX work",
        "Lack of standards and documentation",
        "Visual adjustments that consume too much time",
        "Difficulty diagnosing bottlenecks in the model",
      ];

  const idealFor = isPt
    ? [
        "Analistas e desenvolvedores Power BI",
        "Consultores e freelancers que precisam ganhar escala",
        "Equipes de BI que buscam governança e produtividade",
        "Profissionais que querem usar IA com contexto real do modelo",
      ]
    : [
        "Power BI analysts and developers",
        "Consultants and freelancers who need to scale",
        "BI teams seeking governance and productivity",
        "Professionals who want AI with real model context",
      ];

  const screenshotTitles = isPt
    ? [
        "DAX Creator",
        "Measure Optimization",
        "Background Generator",
        "Theme Creator",
        "Performance Analyzer",
        "Data Model Analyzer",
        "Best Practice Checker",
        "Model Translator",
      ]
    : [
        "DAX Creator",
        "Measure Optimization",
        "Background Generator",
        "Theme Creator",
        "Performance Analyzer",
        "Data Model Analyzer",
        "Best Practice Checker",
        "Model Translator",
      ];

  const galleryItems = studioScreenshots.map((src, index) => ({
    src,
    title: screenshotTitles[index] ?? "BROGNOLI Studio",
  }));

  return (
    <>
      <PageHero title={dict.studio.title} description={dict.studio.heroText}>
        <div className="space-y-5">
          <div className="relative mx-auto aspect-[1.1] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <Image
              src="/media/studio 4.png"
              alt="BROGNOLI Studio logo"
              fill
              className="object-contain p-8"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton href="#plans">
              {isPt ? "Começar com trial de 15 dias" : "Start with a 15-day trial"}
            </PrimaryButton>
            <SecondaryButton href="#features">
              {isPt ? "Ver funcionalidades" : "See features"}
            </SecondaryButton>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Problema e solução" : "Problem and solution"}
        title={isPt ? "Menos trabalho operacional. Mais tempo para análise." : "Less operational work. More time for analysis."}
        description={
          isPt
            ? "O BROGNOLI Studio foi criado para reduzir as tarefas mais cansativas do dia a dia em Power BI e devolver velocidade para quem precisa construir, revisar e evoluir análises."
            : "BROGNOLI Studio was built to reduce the most time-consuming Power BI tasks and give professionals more speed when building, reviewing, and improving analytics."
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard
            title={isPt ? "Onde o Studio gera impacto" : "Where Studio creates impact"}
            description={
              isPt
                ? "Ele atua exatamente nas frentes que mais consomem tempo em projetos reais."
                : "It focuses on the exact areas that consume the most time in real-world projects."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              {painPoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard
            title={isPt ? "Resultado prático" : "Practical outcome"}
            description={
              isPt
                ? "Mais padronização, mais autonomia e mais capacidade de focar naquilo que realmente agrega valor."
                : "More standardization, more autonomy, and more ability to focus on what actually creates value."
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {dict.studio.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/78"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Capacidades" : "Capabilities"}
        title={isPt ? "Uma plataforma pensada para o fluxo completo de trabalho" : "A platform designed for the full workflow"}
        description={
          isPt
            ? "Do DAX à performance, de governança à criação visual, o Studio conecta frentes que normalmente ficam espalhadas em várias ferramentas."
            : "From DAX to performance, from governance to visual creation, Studio connects workflows that are usually spread across multiple tools."
        }
      >
        <div id="features" className="grid gap-6 lg:grid-cols-2">
          {dict.studio.features.map((feature) => (
            <GlassCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Para quem é" : "Who it is for"}
        title={isPt ? "Feito para profissionais que precisam de velocidade com qualidade" : "Built for professionals who need speed with quality"}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard
            title={isPt ? "Perfil ideal" : "Ideal profile"}
            description={
              isPt
                ? "Se você trabalha com Power BI de forma recorrente, o ganho de produtividade e consistência tende a ser imediato."
                : "If you work with Power BI regularly, the productivity and consistency gains tend to be immediate."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              {idealFor.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard
            title={isPt ? "Como o Studio entra na rotina" : "How Studio fits your routine"}
            description={
              isPt
                ? "Use o Studio para acelerar tarefas repetitivas, fortalecer a governança do modelo e elevar a qualidade do que você entrega."
                : "Use Studio to accelerate repetitive work, strengthen model governance, and improve the quality of what you deliver."
            }
          >
            <div className="space-y-4 text-sm leading-7 text-white/72">
              <p>
                {isPt
                  ? "Ele foi pensado para funcionar como companheiro de trabalho, não como ferramenta pontual."
                  : "It is designed to work as a day-to-day companion, not as a one-off tool."}
              </p>
              <p>
                {isPt
                  ? "Isso significa mais velocidade na execução e mais clareza para padronizar o que sua equipe faz."
                  : "That means more execution speed and more clarity when standardizing what your team delivers."}
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Prova visual" : "Visual proof"}
        title={isPt ? "Veja partes reais do produto em ação" : "See real parts of the product in action"}
        description={
          isPt
            ? "Clique em qualquer imagem para ampliar e explorar melhor os detalhes da interface."
            : "Click any image to enlarge it and explore the interface details more clearly."}
      >
        <ScreenshotGallery items={galleryItems} />
      </Section>

      <Section
        eyebrow={isPt ? "Planos" : "Pricing"}
        title={dict.studio.plansTitle}
        description={
          isPt
            ? "Escolha o nível certo para sua rotina e escale com o uso de IA no seu ritmo."
            : "Choose the right level for your workflow and scale your AI usage at your own pace."
        }
      >
        <div id="plans" className="grid gap-6 lg:grid-cols-5">
          {dict.studio.plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[2rem] border p-6 ${
                plan.name === "Pro"
                  ? "border-[#f6b23c]/40 bg-[#f6b23c]/10 shadow-[0_20px_60px_rgba(246,178,60,0.08)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="space-y-4">
                {plan.name === "Pro" ? (
                  <span className="inline-flex rounded-full bg-[#f6b23c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#111318]">
                    {isPt ? "Mais popular" : "Most popular"}
                  </span>
                ) : null}
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="text-3xl font-semibold text-white">{plan.price}</p>
                <p className="text-sm font-medium text-[#f6b23c]">{plan.credits}</p>
                <p className="text-sm leading-7 text-white/72">{plan.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <PrimaryButton href="#plans">
            {isPt ? "Escolher um plano" : "Choose a plan"}
          </PrimaryButton>
          <SecondaryButton href={`/${locale}/contact`}>
            {isPt ? "Falar comigo" : "Talk to me"}
          </SecondaryButton>
        </div>
        <p className="mt-6 text-sm text-white/64">
          {isPt
            ? "Todos os planos do BROGNOLI Studio terão trial de 15 dias."
            : "All BROGNOLI Studio plans will include a 15-day trial."}
        </p>
      </Section>

      <Section
        eyebrow={isPt ? "Chamada final" : "Final call"}
        title={isPt ? "Se o Power BI faz parte da sua rotina, o Studio foi feito para você" : "If Power BI is part of your routine, Studio was built for you"}
        description={
          isPt
            ? "A proposta do BROGNOLI Studio é simples: reduzir fricção, elevar qualidade e te dar mais tempo para gerar valor com dados."
            : "BROGNOLI Studio has a simple goal: reduce friction, improve quality, and give you more time to create value with data."
        }
      >
        <div className="rounded-[2rem] border border-[#f6b23c]/20 bg-[linear-gradient(135deg,rgba(246,178,60,0.14),rgba(246,178,60,0.04),rgba(255,255,255,0.02))] p-8">
          <div className="flex flex-wrap gap-4">
            <PrimaryButton href="#plans">
              {isPt ? "Começar meu trial" : "Start my trial"}
            </PrimaryButton>
            <SecondaryButton href={`/${locale}/videos`}>
              {isPt ? "Ver mais conteúdo" : "See more content"}
            </SecondaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
