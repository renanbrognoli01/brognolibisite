import Image from "next/image";

import { GlassCard, PageHero, Section } from "@/components/ui";
import { sharedChannels } from "@/lib/site-data";
import { getLatestVideos } from "@/lib/youtube";
import type { Locale } from "@/lib/i18n";

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const ptVideos = await getLatestVideos("pt-br");
  const enVideos = await getLatestVideos("en");

  const groups = [
    {
      title: locale === "pt-br" ? "Canal em Português" : "Portuguese channel",
      href: sharedChannels.pt,
      videos: ptVideos,
    },
    {
      title: locale === "pt-br" ? "Channel in English" : "Channel in English",
      href: sharedChannels.en,
      videos: enVideos,
    },
  ];

  return (
    <>
      <PageHero
        title={locale === "pt-br" ? "Vídeos" : "Videos"}
        description={
          locale === "pt-br"
            ? "Acompanhe meus canais em português e inglês com dicas, atualizações e conteúdo prático sobre Power BI, Excel e analytics."
            : "Follow my Portuguese and English channels for practical content, updates, and insights about Power BI, Excel, and analytics."
        }
      />

      <Section title={locale === "pt-br" ? "Conteúdo em dois idiomas" : "Content in two languages"}>
        <div className="grid gap-8 xl:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
                <a href={group.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white">
                  {locale === "pt-br" ? "Ver canal" : "View channel"}
                </a>
              </div>
              <div className="grid gap-5">
                {group.videos.map((video) => (
                  <GlassCard key={video.id} title={video.title} href={video.url}>
                    <div className="relative mt-4 aspect-video overflow-hidden rounded-[1.25rem] border border-white/10">
                      <Image src={video.thumbnail} alt={video.title} fill className="object-cover" unoptimized />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
