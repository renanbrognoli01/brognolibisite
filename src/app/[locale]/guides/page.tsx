import { GuideShowcase } from "@/components/guide-showcase";
import {
  GlassCard,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { siteData } from "@/lib/site-data";

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];
  const isPt = locale === "pt-br";

  return (
    <>
      <PageHero title={dict.guides.title} description={dict.guides.description}>
        <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-2xl font-semibold text-white">
            {isPt
              ? "Aprenda mais rápido com materiais diretos e práticos"
              : "Learn faster with direct and practical materials"}
          </h2>
          <p className="text-sm leading-7 text-white/72">
            {isPt
              ? "Os guias de bolso foram pensados para quem quer reduzir dúvidas, ganhar confiança e aplicar melhor Power BI e Excel no dia a dia."
              : "The pocket guides were designed for professionals who want fewer doubts, more confidence, and better day-to-day use of Power BI and Excel."}
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton href="#excel">
              {isPt ? "Ver guias" : "See guides"}
            </PrimaryButton>
            <SecondaryButton href={`/${locale}/videos`}>
              {isPt ? "Explorar videos" : "Explore videos"}
            </SecondaryButton>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Por que comprar" : "Why buy"}
        title={
          isPt
            ? "Um atalho para estudar com mais clareza"
            : "A shortcut to study with more clarity"
        }
        description={
          isPt
            ? "Em vez de perder tempo pulando entre vários conteúdos, você recebe um material focado, prático e pronto para consulta rápida."
            : "Instead of losing time across scattered content, you get focused, practical material designed for quick reference."
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard
            title={isPt ? "Aplicação prática" : "Practical application"}
            description={
              isPt
                ? "Conteúdo pensado para quem precisa usar a ferramenta de verdade, e não apenas estudar teoria."
                : "Content built for people who need to use the tools in real work, not only study theory."
            }
          />
          <GlassCard
            title={isPt ? "Consulta rápida" : "Quick reference"}
            description={
              isPt
                ? "Materiais de bolso para voltar sempre que surgir uma dúvida importante."
                : "Pocket-style materials you can revisit whenever an important question appears."
            }
          />
          <GlassCard
            title={isPt ? "Evolução mais rápida" : "Faster growth"}
            description={
              isPt
                ? "Menos dispersão, mais clareza e uma curva de aprendizado melhor."
                : "Less distraction, more clarity, and a better learning curve."
            }
          />
        </div>
      </Section>

      <Section title={isPt ? "Escolha seu guia" : "Choose your guide"}>
        <GuideShowcase locale={locale} groups={dict.guides.groups} />
      </Section>

      <Section
        eyebrow={isPt ? "Chamada final" : "Final call"}
        title={
          isPt
            ? "Escolha o material certo e evolua com mais consistência"
            : "Choose the right material and grow with more consistency"
        }
        description={
          isPt
            ? "Se você quer um caminho mais prático para estudar Power BI ou Excel, os guias de bolso foram feitos exatamente para isso."
            : "If you want a more practical path to learn Power BI or Excel, the pocket guides were built exactly for that."
        }
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <div className="flex flex-wrap gap-4">
            <PrimaryButton href="#excel">
              {isPt ? "Ver guia de Excel" : "See Excel guide"}
            </PrimaryButton>
            <SecondaryButton href="#powerbi">
              {isPt ? "Ver guia de Power BI" : "See Power BI guide"}
            </SecondaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
