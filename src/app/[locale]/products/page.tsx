import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.products.title} description={dict.products.description} />
      <Section title={locale === "pt-br" ? "Portfólio atual" : "Current portfolio"}>
        <div className="grid gap-6">
          {dict.products.items.map((item) => (
            <GlassCard key={item.name} title={item.name} description={item.summary}>
              <ul className="space-y-3 text-sm leading-7 text-white/72">
                {item.details.map((detail) => (
                  <li key={detail}>• {detail}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      link.pending
                        ? "border border-white/10 bg-white/[0.03] text-white/48"
                        : "bg-[#f6b23c] text-[#151618]"
                    }`}
                  >
                    {link.pending
                      ? `${link.label} ${locale === "pt-br" ? "(em breve)" : "(soon)"}`
                      : link.label}
                  </a>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>
    </>
  );
}
