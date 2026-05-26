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

type PlanCard = {
  name: string;
  price: string;
  credits: string;
  note: string;
  highlight?: boolean;
};

type CreditPackCard = {
  name: string;
  price: string;
  note: string;
};

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

  const screenshotTitles = [
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

  const commercialPlans: PlanCard[] = isPt
    ? [
        {
          name: "Light",
          price: "R$ 9,90/mês",
          credits: "0 créditos",
          note: "API própria ou modo manual",
        },
        {
          name: "Starter",
          price: "R$ 29,00/mês",
          credits: "2.000 créditos",
          note: "Entrada ideal para usar IA do Studio com rotina leve",
        },
        {
          name: "Pro",
          price: "R$ 59,00/mês",
          credits: "6.000 créditos",
          note: "Melhor custo-benefício para uso recorrente",
          highlight: true,
        },
        {
          name: "Expert",
          price: "R$ 119,00/mês",
          credits: "15.000 créditos",
          note: "Para fluxo intenso, projetos e consultoria",
        },
        {
          name: "Business",
          price: "R$ 299,00/mês",
          credits: "50.000 créditos",
          note: "Times, operação e escala com governança",
        },
      ]
    : [
        {
          name: "Light",
          price: "US$ 4.90/month",
          credits: "0 credits",
          note: "Bring your own API or use manual mode",
        },
        {
          name: "Starter",
          price: "US$ 9.90/month",
          credits: "2,000 credits",
          note: "Ideal entry point for light Studio AI usage",
        },
        {
          name: "Pro",
          price: "US$ 19.90/month",
          credits: "6,000 credits",
          note: "Best value for recurring workflows",
          highlight: true,
        },
        {
          name: "Expert",
          price: "US$ 39.90/month",
          credits: "15,000 credits",
          note: "For heavier project and consulting workflows",
        },
        {
          name: "Business",
          price: "US$ 99.90/month",
          credits: "50,000 credits",
          note: "For teams, operations, and scale",
        },
      ];

  const creditPacks: CreditPackCard[] = isPt
    ? [
        {
          name: "1.000 créditos",
          price: "R$ 19,90",
          note: "Pacote extra para complementar o plano quando necessário",
        },
        {
          name: "5.000 créditos",
          price: "R$ 89,00",
          note: "Ideal para reforçar períodos de entrega e uso mais forte",
        },
        {
          name: "10.000 créditos",
          price: "R$ 169,00",
          note: "Mais escala para operação intensa e compras pontuais",
        },
      ]
    : [
        {
          name: "1,000 credits",
          price: "US$ 6.90",
          note: "Extra pack to complement your plan whenever needed",
        },
        {
          name: "5,000 credits",
          price: "US$ 29.90",
          note: "Ideal for delivery peaks and stronger AI usage",
        },
        {
          name: "10,000 credits",
          price: "US$ 59.90",
          note: "More scale for intensive workflows and one-off boosts",
        },
      ];

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
            <PrimaryButton href={`/${locale}/login`}>
              {isPt
                ? "Criar conta e iniciar trial de 15 dias"
                : "Create an account and start a 15-day trial"}
            </PrimaryButton>
            <SecondaryButton href={`/${locale}/account`}>
              {isPt ? "Entrar na ?rea do assinante" : "Open subscriber area"}
              {isPt ? "Entrar na área do assinante" : "Open subscriber area"}
            </SecondaryButton>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Problema e solução" : "Problem and solution"}
        title={
          isPt
            ? "Menos trabalho operacional. Mais tempo para análise."
            : "Less operational work. More time for analysis."
        }
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
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard
            title={isPt ? "Resultado pr?tico" : "Practical outcome"}
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
        title={
          isPt
            ? "Uma plataforma pensada para o fluxo completo de trabalho"
            : "A platform designed for the full workflow"
        }
        description={
          isPt
            ? "Do DAX à performance, de governança à criação visual, o Studio conecta frentes que normalmente ficam espalhadas em várias ferramentas."
            : "From DAX to performance, from governance to visual creation, Studio connects workflows that are usually spread across multiple tools."
        }
      >
        <div id="features" className="grid gap-6 lg:grid-cols-2">
          {dict.studio.features.map((feature) => (
            <GlassCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Para quem é" : "Who it is for"}
        title={
          isPt
            ? "Feito para profissionais que precisam de velocidade com qualidade"
            : "Built for professionals who need speed with quality"
        }
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
                <li key={item}>- {item}</li>
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
        title={
          isPt
            ? "Veja partes reais do produto em ação"
            : "See real parts of the product in action"
        }
        description={
          isPt
            ? "Clique em qualquer imagem para ampliar e explorar melhor os detalhes da interface."
            : "Click any image to enlarge it and explore the interface details more clearly."
        }
      >
        <ScreenshotGallery items={galleryItems} />
      </Section>

      <Section
        eyebrow={isPt ? "Planos" : "Pricing"}
        title={dict.studio.plansTitle}
        description={
          isPt
            ? "Escolha o nível certo para sua rotina, entre na área do assinante e gerencie trial, assinatura e créditos em um único lugar."
            : "Choose the right level for your workflow, enter the subscriber area, and manage trial, subscription, and credits in one place."
        }
      >
        <div id="plans" className="space-y-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <h3 className="text-2xl font-semibold text-white">
                  {isPt ? "Planos do BROGNOLI Studio" : "BROGNOLI Studio plans"}
                </h3>
                <p className="text-sm leading-7 text-white/68">
                  {isPt
                    ? "Todos os planos contam com trial de 15 dias e levam você para a área do assinante, onde assinatura, créditos e próximos passos ficam centralizados."
                    : "Every plan includes a 15-day trial and takes you into the subscriber area, where subscription, credits, and next steps stay centralized."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href={`/${locale}/login`}>
                  {isPt
                    ? "Criar conta para escolher o plano"
                    : "Create account to choose a plan"}
                </PrimaryButton>
                <SecondaryButton href={`/${locale}/account`}>
                  {isPt ? "J? tenho conta" : "I already have an account"}
                </SecondaryButton>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {commercialPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-[2rem] border p-6 ${
                    plan.highlight
                      ? "border-[#f6b23c]/40 bg-[#f6b23c]/10 shadow-[0_20px_60px_rgba(246,178,60,0.08)]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="space-y-4">
                    {plan.highlight ? (
                      <span className="inline-flex rounded-full bg-[#f6b23c] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#111318]">
                        {isPt ? "Mais popular" : "Most popular"}
                      </span>
                    ) : null}
                    <h4 className="text-2xl font-semibold text-white">{plan.name}</h4>
                    <p className="text-3xl font-semibold text-white">{plan.price}</p>
                    <p className="text-sm font-medium text-[#f6b23c]">{plan.credits}</p>
                    <p className="min-h-20 text-sm leading-7 text-white/72">{plan.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <h3 className="text-2xl font-semibold text-white">
                  {isPt ? "Cr?ditos extras" : "Extra credits"}
                </h3>
                <p className="text-sm leading-7 text-white/68">
                  {isPt
                    ? "Pacotes extras para ampliar seu uso sem trocar de plano. Eles aparecem na sua área do assinante e somam ao seu saldo existente."
                    : "One-off packs to expand your usage without changing plans. They appear in your subscriber area and add to your existing balance."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href={`/${locale}/login`}>
                  {isPt ? "Entrar para comprar créditos" : "Sign in to buy credits"}
                </PrimaryButton>
                <SecondaryButton href={`/${locale}/account`}>
                  {isPt ? "Ver minha conta" : "View my account"}
                </SecondaryButton>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {creditPacks.map((pack) => (
                <div
                  key={pack.name}
                  className="rounded-[1.75rem] border border-white/10 bg-[#0d1017] p-6"
                >
                  <div className="space-y-4">
                    <h4 className="text-2xl font-semibold text-white">{pack.name}</h4>
                    <p className="text-3xl font-semibold text-white">{pack.price}</p>
                    <p className="text-sm leading-7 text-white/72">{pack.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Chamada final" : "Final call"}
        title={
          isPt
            ? "Se o Power BI faz parte da sua rotina, o Studio foi feito para você"
            : "If Power BI is part of your routine, Studio was built for you"
        }
        description={
          isPt
            ? "A proposta do BROGNOLI Studio é simples: reduzir fricção, elevar qualidade e te dar mais tempo para gerar valor com dados."
            : "BROGNOLI Studio has a simple goal: reduce friction, improve quality, and give you more time to create value with data."
        }
      >
        <div className="rounded-[2rem] border border-[#f6b23c]/20 bg-[linear-gradient(135deg,rgba(246,178,60,0.14),rgba(246,178,60,0.04),rgba(255,255,255,0.02))] p-8">
          <div className="space-y-6">
            <p className="max-w-3xl text-sm leading-7 text-white/78">
              {isPt
                ? "Comece criando sua conta. A partir dela você entra na área do assinante, escolhe o plano, acompanha créditos, compra pacotes extras e gerencia sua assinatura."
                : "Start by creating your account. From there you enter the subscriber area, choose a plan, track credits, buy extra packs, and manage your subscription."}
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href={`/${locale}/login`}>
                {isPt
                  ? "Criar conta e iniciar meu trial"
                  : "Create account and start my trial"}
              </PrimaryButton>
              <SecondaryButton href={`/${locale}/account`}>
                {isPt ? "Ir para minha conta" : "Go to my account"}
              </SecondaryButton>
              <SecondaryButton href={`/${locale}/videos`}>
                {isPt ? "Ver mais conteúdo" : "See more content"}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
