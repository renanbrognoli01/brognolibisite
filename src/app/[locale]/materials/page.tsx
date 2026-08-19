import { MaterialsCatalog } from "@/components/materials-catalog";
import { GlassCard, PageHero, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { getPublishedMaterials } from "@/lib/materials";

export const revalidate = 1800;

export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt-br";
  const result = await getPublishedMaterials();

  return (
    <>
      <PageHero
        title={isPt ? "Materiais para download" : "Downloadable materials"}
        description={
          isPt
            ? "Baixe arquivos, modelos e exemplos utilizados nos vídeos da Brognoli BI em um só lugar."
            : "Download the files, templates, and examples used in Brognoli BI videos from one central place."
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-2xl font-semibold text-white">1</p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              {isPt ? "Encontre o vídeo ou tema" : "Find the video or topic"}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-2xl font-semibold text-white">2</p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              {isPt ? "Confira o formato do arquivo" : "Check the file format"}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-2xl font-semibold text-white">3</p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              {isPt ? "Faça o download direto" : "Download it directly"}
            </p>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Biblioteca" : "Library"}
        title={isPt ? "Materiais disponíveis" : "Available materials"}
        description={
          isPt
            ? "Pesquise por título, categoria ou formato e faça o download diretamente pelo card."
            : "Search by title, category, or format and download the file directly from its card."
        }
      >
        <MaterialsCatalog locale={locale} result={result} />
      </Section>

      <Section
        eyebrow={isPt ? "Conteúdo prático" : "Practical content"}
        title={isPt ? "Do vídeo para a sua máquina" : "From the video to your computer"}
        description={
          isPt
            ? "A biblioteca foi criada para facilitar a reprodução dos exemplos apresentados nos canais."
            : "The library was created to make it easier to reproduce the examples shown on the channels."
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard
            title={isPt ? "Arquivos organizados" : "Organized files"}
            description={
              isPt
                ? "Cada material mostra categoria, formato, tamanho e data de publicação."
                : "Each material shows its category, format, size, and publication date."
            }
          />
          <GlassCard
            title={isPt ? "Catálogo sempre atualizado" : "Always up to date"}
            description={
              isPt
                ? "Novos arquivos aparecem automaticamente após o upload, sem cadastro duplicado."
                : "New files appear automatically after upload, with no duplicate registration."
            }
          />
          <GlassCard
            title={isPt ? "Download sem etapas extras" : "Direct downloads"}
            description={
              isPt
                ? "Os arquivos públicos são entregues diretamente pelo armazenamento, sem exigir login."
                : "Public files are delivered directly from storage without requiring a login."
            }
          />
        </div>
      </Section>
    </>
  );
}
