import Image from "next/image";

import { GlassCard, PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.about.introTitle} description={dict.about.intro[0]}>
        <div className="relative mx-auto aspect-[0.9] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
          <Image
            src="/media/renan 5.png"
            alt="Renan Brognoli"
            fill
            className="object-cover object-[center_12%] scale-[1.08]"
          />
        </div>
      </PageHero>

      <Section title={locale === "pt-br" ? "Quem eu sou" : "Who I am"}>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard
            title={locale === "pt-br" ? "Trajetória e visão" : "Journey and perspective"}
          >
            <div className="space-y-5 text-sm leading-7 text-white/72">
              {dict.about.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </GlassCard>
          <GlassCard title={dict.about.certificationsTitle}>
            <div className="grid grid-cols-2 gap-4">
              {["/media/certificacao 1.png", "/media/certificacao 2.png", "/media/certificacao 3.png", "/media/certificacao 4.png"].map((src) => (
                <div key={src} className="rounded-[1.5rem] border border-white/10 bg-white p-4">
                  <div className="relative mx-auto aspect-square w-full max-w-[9rem]">
                    <Image src={src} alt="Microsoft certification" fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/72">
              {dict.about.certifications.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </Section>

      <Section title={dict.about.timelineTitle}>
        <div className="grid gap-4">
          {dict.about.timeline.map((item) => (
            <div
              key={`${item.year}-${item.title}`}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-amber)]">{item.year}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
