import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.contact.title} description={dict.contact.description} />
      <Section title={locale === "pt-br" ? "Canais oficiais" : "Official channels"}>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          <GlassCard
            title="Email"
            description={locale === "pt-br" ? "Contato direto para parcerias e produtos" : "Direct contact for partnerships and products"}
          >
            <a
              href={`mailto:${dict.contact.email}`}
              className="whitespace-nowrap text-[0.78rem] font-semibold tracking-[-0.01em] text-[var(--brand-amber)] sm:text-[0.82rem]"
            >
              {dict.contact.email}
            </a>
          </GlassCard>
          <GlassCard title="LinkedIn" description="Renan Brognoli">
            <a href={dict.contact.linkedin} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[var(--brand-amber)]">
              {locale === "pt-br" ? "Abrir perfil" : "Open profile"}
            </a>
          </GlassCard>
          <GlassCard
            title={locale === "pt-br" ? "YouTube PT-BR" : "YouTube PT-BR"}
            description={locale === "pt-br" ? "Canal em portugues" : "Portuguese channel"}
          >
            <a
              href="https://www.youtube.com/@renanbrognolibr"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[var(--brand-amber)]"
            >
              {locale === "pt-br" ? "Abrir canal" : "Open channel"}
            </a>
          </GlassCard>
          <GlassCard
            title={locale === "pt-br" ? "YouTube EN" : "YouTube EN"}
            description={locale === "pt-br" ? "Canal em ingles" : "English channel"}
          >
            <a
              href="https://www.youtube.com/@renanbrognoliint"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[var(--brand-amber)]"
            >
              {locale === "pt-br" ? "Abrir canal" : "Open channel"}
            </a>
          </GlassCard>
          <GlassCard title="Instagram" description={dict.contact.instagramLabel}>
            <a
              href={dict.contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[var(--brand-amber)]"
            >
              {locale === "pt-br" ? "Abrir perfil" : "Open profile"}
            </a>
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
