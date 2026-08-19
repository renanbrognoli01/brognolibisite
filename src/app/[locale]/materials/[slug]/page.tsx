import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyMaterialLink } from "@/components/copy-material-link";
import { PageHero, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { getPublishedMaterials } from "@/lib/materials";

export const revalidate = 1800;

function formatBytes(value: number | null, locale: Locale) {
  if (!value || value <= 0) {
    return null;
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const amount = value / 1024 ** unitIndex;

  return `${new Intl.NumberFormat(locale === "pt-br" ? "pt-BR" : "en-US", {
    maximumFractionDigits: amount >= 10 || unitIndex === 0 ? 0 : 1,
  }).format(amount)} ${units[unitIndex]}`;
}

function formatDate(value: string, locale: Locale) {
  const date = new Date(value);

  return new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isPt = locale === "pt-br";
  const result = await getPublishedMaterials();
  const material = result.items.find((item) => item.slug === slug);

  if (!material) {
    notFound();
  }

  const materialHref = `/${locale}/materials/${material.slug}`;
  const permanentUrl = `https://brognolibi.com${materialHref}`;
  const size = formatBytes(material.fileSizeBytes, locale);

  return (
    <>
      <PageHero
        eyebrow={material.category}
        title={material.title}
        description={
          isPt
            ? "Página exclusiva deste material. Salve ou compartilhe este endereço para voltar diretamente a este arquivo."
            : "This material has its own page. Save or share this address to return directly to this file."
        }
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/12 bg-white/[0.05] text-3xl font-semibold text-[var(--brand-amber)]">
            {material.fileType.slice(0, 3)}
          </div>
          <div className="mt-6 space-y-2 text-sm text-white/62">
            <p>{material.fileType}</p>
            {size ? <p>{size}</p> : null}
            <p>{formatDate(material.publishedAt, locale)}</p>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Download" : "Download"}
        title={isPt ? "Baixe este material" : "Download this material"}
        description={
          isPt
            ? "O arquivo é entregue diretamente pelo armazenamento público da Brognoli BI."
            : "The file is delivered directly from Brognoli BI's public storage."
        }
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
            {isPt ? "Arquivo" : "File"}
          </p>
          <p className="mt-2 break-all text-base font-medium text-white/82">{material.fileName}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={material.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-amber)] px-6 py-3 text-sm font-semibold text-[#0f1d2a] transition hover:brightness-105"
            >
              {isPt ? "Baixar material" : "Download material"}
            </a>
            <CopyMaterialLink href={materialHref} locale={locale} />
            <Link
              href={`/${locale}/materials`}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/72 transition hover:border-white/20 hover:text-white"
            >
              {isPt ? "Ver todos os materiais" : "View all materials"}
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
              {isPt ? "Link permanente" : "Permanent link"}
            </p>
            <p className="mt-2 break-all font-mono text-sm text-[var(--brand-cyan)]">{permanentUrl}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
