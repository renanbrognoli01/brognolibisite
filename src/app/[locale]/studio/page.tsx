import Image from "next/image";

import { ScreenshotGallery } from "@/components/screenshot-gallery";
import {
  Container,
  GlassCard,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@/components/ui";
import { getStudioDownloadInfo } from "@/lib/downloads";
import type { Locale } from "@/lib/i18n";
import { studioScreenshots } from "@/lib/site-data";

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

type StudioCopy = {
  title: string;
  heroText: string;
  osLabel: string;
  versionLabel: string;
  versionHintReady: string;
  versionHintPending: string;
  createTrial: string;
  downloadWindows: string;
  subscriberArea: string;
  benefits: string[];
  features: { title: string; description: string }[];
  plansTitle: string;
  plansIntro: string;
  plansHeading: string;
  plansDescription: string;
  choosePlan: string;
  extraCreditsTitle: string;
  extraCreditsDescription: string;
  signInToBuyCredits: string;
  viewMyAccount: string;
  finalTitle: string;
  finalDescription: string;
  finalBody: string;
  startMyTrial: string;
  seeMoreContent: string;
  painPointsTitle: string;
  painPointsDescription: string;
  practicalOutcomeTitle: string;
  practicalOutcomeDescription: string;
  capabilitiesTitle: string;
  capabilitiesDescription: string;
  audienceTitle: string;
  idealProfileTitle: string;
  idealProfileDescription: string;
  routineTitle: string;
  routineDescription: string;
  routineBody: string[];
  visualTitle: string;
  visualDescription: string;
  problemEyebrow: string;
  capabilityEyebrow: string;
  audienceEyebrow: string;
  visualEyebrow: string;
  pricingEyebrow: string;
  finalEyebrow: string;
};

const studioCopy: Record<Locale, StudioCopy> = {
  "pt-br": {
    title: "BROGNOLI Studio",
    heroText:
      "O BROGNOLI Studio é um software completo para Power BI e analytics. Ele combina automação, melhores práticas e inteligência artificial para reduzir tarefas repetitivas e devolver tempo para o que realmente importa: analisar, decidir e gerar valor com dados.",
    osLabel: "Sistema operacional",
    versionLabel: "Versão disponível",
    versionHintReady: "Instalador pronto para download direto.",
    versionHintPending: "Link público será publicado junto com a release.",
    createTrial: "Criar conta e iniciar trial de 15 dias",
    downloadWindows: "Baixar para Windows",
    subscriberArea: "Entrar na área do assinante",
    benefits: [
      "Criação, otimização e documentação de medidas DAX",
      "Análise de performance, server timings e diagnóstico de modelo",
      "Theme Creator e Background Generator com suporte a IA",
      "Tradução de modelo, calculation groups e governança",
      "Mais velocidade, autonomia e consistência para profissionais e equipes",
    ],
    features: [
      {
        title: "DAX e produtividade",
        description:
          "Crie, formate, documente e melhore medidas usando o contexto completo do modelo semântico.",
      },
      {
        title: "Governança e qualidade",
        description:
          "Inspecione objetos, padrões, relacionamentos e melhores práticas para manter modelos mais saudáveis.",
      },
      {
        title: "Performance e diagnóstico",
        description:
          "Investigue comportamento de queries, tempos de execução e gargalos com fluxos avançados.",
      },
      {
        title: "Criação visual com IA",
        description:
          "Gere backgrounds, temas e estruturas visuais para dashboards de forma muito mais rápida.",
      },
    ],
    plansTitle: "Planos e trial",
    plansIntro:
      "Escolha o nível certo para sua rotina, entre na área do assinante e gerencie trial, assinatura e créditos em um único lugar.",
    plansHeading: "Planos do BROGNOLI Studio",
    plansDescription:
      "Todos os planos contam com trial de 15 dias e levam você para a área do assinante, onde assinatura, créditos e próximos passos ficam centralizados.",
    choosePlan: "Criar conta para escolher o plano",
    extraCreditsTitle: "Créditos extras",
    extraCreditsDescription:
      "Pacotes extras para ampliar seu uso sem trocar de plano. Eles aparecem na sua área do assinante e somam ao seu saldo existente.",
    signInToBuyCredits: "Entrar para comprar créditos",
    viewMyAccount: "Ver minha conta",
    finalTitle: "Se o Power BI faz parte da sua rotina, o Studio foi feito para você",
    finalDescription:
      "A proposta do BROGNOLI Studio é simples: reduzir fricção, elevar qualidade e te dar mais tempo para gerar valor com dados.",
    finalBody:
      "Comece criando sua conta. A partir dela você entra na área do assinante, escolhe o plano, acompanha créditos, compra pacotes extras e gerencia sua assinatura.",
    startMyTrial: "Criar conta e iniciar meu trial",
    seeMoreContent: "Ver mais conteúdo",
    painPointsTitle: "Onde o Studio gera impacto",
    painPointsDescription:
      "Ele atua nas frentes que mais consomem tempo em projetos reais.",
    practicalOutcomeTitle: "Resultado prático",
    practicalOutcomeDescription:
      "Mais padronização, mais autonomia e mais capacidade de focar no que realmente agrega valor.",
    capabilitiesTitle: "Uma plataforma pensada para o fluxo completo de trabalho",
    capabilitiesDescription:
      "Do DAX à performance, de governança à criação visual, o Studio conecta frentes que normalmente ficam espalhadas em várias ferramentas.",
    audienceTitle: "Feito para profissionais que precisam de velocidade com qualidade",
    idealProfileTitle: "Perfil ideal",
    idealProfileDescription:
      "Se você trabalha com Power BI de forma recorrente, o ganho de produtividade e consistência tende a ser imediato.",
    routineTitle: "Como o Studio entra na rotina",
    routineDescription:
      "Use o Studio para acelerar tarefas repetitivas, fortalecer a governança do modelo e elevar a qualidade do que você entrega.",
    routineBody: [
      "Ele foi pensado para funcionar como companheiro de trabalho, não como ferramenta pontual.",
      "Isso significa mais velocidade na execução e mais clareza para padronizar o que sua equipe faz.",
    ],
    visualTitle: "Veja partes reais do produto em ação",
    visualDescription:
      "Clique em qualquer imagem para ampliar e explorar melhor os detalhes da interface.",
    problemEyebrow: "Problema e solução",
    capabilityEyebrow: "Capacidades",
    audienceEyebrow: "Para quem é",
    visualEyebrow: "Prova visual",
    pricingEyebrow: "Planos",
    finalEyebrow: "Chamada final",
  },
  en: {
    title: "BROGNOLI Studio",
    heroText:
      "BROGNOLI Studio is a complete software platform for Power BI and analytics. It combines automation, best practices, and artificial intelligence to reduce repetitive work and give professionals more time to focus on decisions and business value.",
    osLabel: "Operating system",
    versionLabel: "Available version",
    versionHintReady: "Installer ready for direct download.",
    versionHintPending: "Public link will be published with the release.",
    createTrial: "Create an account and start a 15-day trial",
    downloadWindows: "Download for Windows",
    subscriberArea: "Open subscriber area",
    benefits: [
      "DAX creation, optimization, and documentation",
      "Performance analysis, server timings, and model diagnostics",
      "Theme Creator and Background Generator with AI support",
      "Model translation, calculation groups, and governance workflows",
      "More speed, autonomy, and consistency for analysts and teams",
    ],
    features: [
      {
        title: "DAX and productivity",
        description:
          "Create, format, document, and improve measures using the full semantic model context.",
      },
      {
        title: "Governance and quality",
        description:
          "Inspect objects, standards, relationships, and best practices to keep models healthier.",
      },
      {
        title: "Performance and diagnostics",
        description:
          "Investigate query behavior, execution times, and bottlenecks with advanced workflows.",
      },
      {
        title: "Visual creation with AI",
        description:
          "Generate dashboard backgrounds, themes, and visual structures in a much faster way.",
      },
    ],
    plansTitle: "Plans and trial",
    plansIntro:
      "Choose the right level for your workflow, enter the subscriber area, and manage trial, subscription, and credits in one place.",
    plansHeading: "BROGNOLI Studio plans",
    plansDescription:
      "Every plan includes a 15-day trial and takes you into the subscriber area, where subscription, credits, and next steps stay centralized.",
    choosePlan: "Create account to choose a plan",
    extraCreditsTitle: "Extra credits",
    extraCreditsDescription:
      "One-off packs to expand your usage without changing plans. They appear in your subscriber area and add to your existing balance.",
    signInToBuyCredits: "Sign in to buy credits",
    viewMyAccount: "View my account",
    finalTitle: "If Power BI is part of your routine, Studio was built for you",
    finalDescription:
      "BROGNOLI Studio has a simple goal: reduce friction, improve quality, and give you more time to create value with data.",
    finalBody:
      "Start by creating your account. From there you enter the subscriber area, choose a plan, track credits, buy extra packs, and manage your subscription.",
    startMyTrial: "Create account and start my trial",
    seeMoreContent: "See more content",
    painPointsTitle: "Where Studio creates impact",
    painPointsDescription:
      "It focuses on the areas that consume the most time in real-world projects.",
    practicalOutcomeTitle: "Practical outcome",
    practicalOutcomeDescription:
      "More standardization, more autonomy, and more ability to focus on what actually creates value.",
    capabilitiesTitle: "A platform designed for the full workflow",
    capabilitiesDescription:
      "From DAX to performance, from governance to visual creation, Studio connects workflows that are usually spread across multiple tools.",
    audienceTitle: "Built for professionals who need speed with quality",
    idealProfileTitle: "Ideal profile",
    idealProfileDescription:
      "If you work with Power BI regularly, the productivity and consistency gains tend to be immediate.",
    routineTitle: "How Studio fits your routine",
    routineDescription:
      "Use Studio to accelerate repetitive work, strengthen model governance, and improve the quality of what you deliver.",
    routineBody: [
      "It is designed to work as a day-to-day companion, not as a one-off tool.",
      "That means more execution speed and more clarity when standardizing what your team delivers.",
    ],
    visualTitle: "See real parts of the product in action",
    visualDescription:
      "Click any image to enlarge it and explore the interface details more clearly.",
    problemEyebrow: "Problem and solution",
    capabilityEyebrow: "Capabilities",
    audienceEyebrow: "Who it is for",
    visualEyebrow: "Visual proof",
    pricingEyebrow: "Pricing",
    finalEyebrow: "Final call",
  },
};

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const copy = studioCopy[locale];
  const isPt = locale === "pt-br";
  const download = getStudioDownloadInfo();
  const downloadHref = download.windowsUrl ?? `/${locale}/login`;

  const painPoints = isPt
    ? [
        "Medidas DAX lentas e repetitivas",
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
          note: "Ideal para períodos de entrega e uso mais forte",
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
      <section className="border-b border-white/10">
        <Container>
          <div className="grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
                  {copy.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-white/72">{copy.heroText}</p>
              </div>

              <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">
                    {copy.osLabel}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">Windows 10+</p>
                  <p className="mt-2 text-sm leading-7 text-white/66">{download.minOs}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-white/45">
                    {copy.versionLabel}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {download.version ?? "1.0.0"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/66">
                    {download.sha256 ? copy.versionHintReady : copy.versionHintPending}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="relative mx-auto aspect-[1.02] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                <Image
                  src="/media/StudioHero.png"
                  alt="BROGNOLI Studio"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              <div className="flex flex-col gap-3">
                <PrimaryButton href={`/${locale}/login`}>{copy.createTrial}</PrimaryButton>
                <div className="grid gap-3 sm:grid-cols-2">
                  <SecondaryButton href={downloadHref}>{copy.downloadWindows}</SecondaryButton>
                  <SecondaryButton href={`/${locale}/account`}>
                    {copy.subscriberArea}
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow={copy.problemEyebrow}
        title="Menos trabalho operacional. Mais tempo para análise."
        description={
          isPt
            ? "O BROGNOLI Studio foi criado para reduzir as tarefas mais cansativas do dia a dia em Power BI e devolver velocidade para quem precisa construir, revisar e evoluir análises."
            : "BROGNOLI Studio was built to reduce the most time-consuming Power BI tasks and give professionals more speed when building, reviewing, and improving analytics."
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard title={copy.painPointsTitle} description={copy.painPointsDescription}>
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              {painPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard
            title={copy.practicalOutcomeTitle}
            description={copy.practicalOutcomeDescription}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.benefits.map((benefit) => (
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
        eyebrow={copy.capabilityEyebrow}
        title={copy.capabilitiesTitle}
        description={copy.capabilitiesDescription}
      >
        <div id="features" className="grid gap-6 lg:grid-cols-2">
          {copy.features.map((feature) => (
            <GlassCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow={copy.audienceEyebrow} title={copy.audienceTitle}>
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard title={copy.idealProfileTitle} description={copy.idealProfileDescription}>
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              {idealFor.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard title={copy.routineTitle} description={copy.routineDescription}>
            <div className="space-y-4 text-sm leading-7 text-white/72">
              {copy.routineBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </GlassCard>
        </div>
      </Section>

      <Section
        eyebrow={copy.visualEyebrow}
        title={copy.visualTitle}
        description={copy.visualDescription}
      >
        <ScreenshotGallery items={galleryItems} />
      </Section>

      <Section
        eyebrow={copy.pricingEyebrow}
        title={copy.plansTitle}
        description={copy.plansIntro}
      >
        <div id="plans" className="space-y-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl space-y-2">
                <h3 className="text-2xl font-semibold text-white">{copy.plansHeading}</h3>
                <p className="text-sm leading-7 text-white/68">{copy.plansDescription}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href={`/${locale}/login`}>{copy.choosePlan}</PrimaryButton>
                <SecondaryButton href={downloadHref}>{copy.downloadWindows}</SecondaryButton>
                <SecondaryButton href={`/${locale}/account`}>
                  {copy.subscriberArea}
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
                <h3 className="text-2xl font-semibold text-white">{copy.extraCreditsTitle}</h3>
                <p className="text-sm leading-7 text-white/68">
                  {copy.extraCreditsDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton href={`/${locale}/login`}>
                  {copy.signInToBuyCredits}
                </PrimaryButton>
                <SecondaryButton href={`/${locale}/account`}>
                  {copy.viewMyAccount}
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
        eyebrow={copy.finalEyebrow}
        title={copy.finalTitle}
        description={copy.finalDescription}
      >
        <div className="rounded-[2rem] border border-[#f6b23c]/20 bg-[linear-gradient(135deg,rgba(246,178,60,0.14),rgba(246,178,60,0.04),rgba(255,255,255,0.02))] p-8">
          <div className="space-y-6">
            <p className="max-w-3xl text-sm leading-7 text-white/78">{copy.finalBody}</p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href={`/${locale}/login`}>{copy.startMyTrial}</PrimaryButton>
              <SecondaryButton href={downloadHref}>{copy.downloadWindows}</SecondaryButton>
              <SecondaryButton href={`/${locale}/account`}>
                {copy.subscriberArea}
              </SecondaryButton>
              <SecondaryButton href={`/${locale}/videos`}>
                {copy.seeMoreContent}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
