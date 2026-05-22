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
              {isPt ? "Explorar vídeos" : "Explore videos"}
            </SecondaryButton>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Por que comprar" : "Why buy"}
        title={isPt ? "Um atalho para estudar com mais clareza" : "A shortcut to study with more clarity"}
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
        <div className="grid gap-6 lg:grid-cols-2">
          {dict.guides.groups.map((group) => (
            <div
              key={group.title}
              id={group.accent === "excel" ? "excel" : "powerbi"}
              className={`rounded-[2rem] border p-6 ${
                group.accent === "excel"
                  ? "border-[#13766e]/40 bg-[#13766e]/10"
                  : "border-[#f6b23c]/30 bg-[#f6b23c]/10"
              }`}
            >
              <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
                {group.accent === "excel"
                  ? isPt
                    ? "Ideal para quem quer melhorar a produtividade, dominar atalhos mentais e aplicar Excel com mais segurança."
                    : "Ideal for professionals who want better productivity, stronger mental shortcuts, and more confidence using Excel."
                  : isPt
                    ? "Perfeito para quem quer acelerar a aprendizagem em Power BI, evitar erros comuns e construir análises melhores."
                    : "Perfect for professionals who want to accelerate Power BI learning, avoid common mistakes, and build better analytics."}
              </p>
              <div className="mt-6 grid gap-4">
                {group.entries.map((entry) => (
                  <GlassCard
                    key={`${group.title}-${entry.language}`}
                    title={entry.language}
                    description={
                      isPt
                        ? "Escolha a língua do material e siga para a página oficial de compra."
                        : "Choose the guide language and continue to the official purchase page."
                    }
                  >
                    <div className="flex flex-wrap gap-3">
                      <a
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111318]"
                        href={entry.salesPage}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {isPt ? "Conhecer o guia" : "Explore guide"}
                      </a>
                      <a
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          group.accent === "excel"
                            ? "bg-[#13766e] text-white"
                            : "bg-[#f6b23c] text-[#111318]"
                        }`}
                        href={entry.buyLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {isPt ? "Comprar agora" : "Buy now"}
                      </a>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={isPt ? "Chamada final" : "Final call"}
        title={isPt ? "Escolha o material certo e evolua com mais consistência" : "Choose the right material and grow with more consistency"}
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
