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
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard title="Email" description={dict.contact.email}>
            <a href={`mailto:${dict.contact.email}`} className="text-sm font-semibold text-[#f6b23c]">
              {dict.contact.email}
            </a>
          </GlassCard>
          <GlassCard title="LinkedIn" description="Renan Brognoli">
            <a href={dict.contact.linkedin} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#f6b23c]">
              {locale === "pt-br" ? "Abrir perfil" : "Open profile"}
            </a>
          </GlassCard>
          <GlassCard title="Instagram" description={dict.contact.instagramLabel} />
        </div>
      </Section>
    </>
  );
}
