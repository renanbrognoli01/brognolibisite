import {
  GlassCard,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@/components/ui";
import type { Locale } from "@/lib/i18n";
import { getStudioDownloadInfo } from "@/lib/downloads";

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt-br";
  const download = getStudioDownloadInfo();

  return (
    <>
      <PageHero
        title={isPt ? "Baixar BROGNOLI Studio" : "Download BROGNOLI Studio"}
        description={
          isPt
            ? "Instale o BROGNOLI Studio no Windows com um fluxo simples, direto e pronto para o seu ambiente de trabalho."
            : "Install BROGNOLI Studio on Windows with a simple, direct workflow ready for your daily work."
        }
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard
              title={isPt ? "Sistema operacional" : "Operating system"}
              description={download.minOs}
            />
            <GlassCard
              title={isPt ? "Versão disponível" : "Available version"}
              description={download.version ?? (isPt ? "Em breve" : "Coming soon")}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {download.windowsUrl ? (
              <PrimaryButton href={download.windowsUrl}>
                {isPt ? "Baixar instalador para Windows" : "Download Windows installer"}
              </PrimaryButton>
            ) : (
              <PrimaryButton href={`/${locale}/contact`}>
                {isPt ? "Solicitar acesso ao instalador" : "Request installer access"}
              </PrimaryButton>
            )}
            <SecondaryButton href={`/${locale}/studio`}>
              {isPt ? "Voltar para a página do Studio" : "Back to Studio page"}
            </SecondaryButton>
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow={isPt ? "Instalação" : "Installation"}
        title={
          isPt
            ? "Download direto, sem atrito"
            : "Direct download, without friction"
        }
        description={
          isPt
            ? "A página foi preparada para apontar direto para o instalador oficial. Isso permite um botão simples no site e flexibilidade para trocar a hospedagem depois."
            : "This page is prepared to point directly to the official installer. That gives you a simple website button now and flexibility to swap hosting later."
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard
            title={isPt ? "Como funciona agora" : "How it works now"}
            description={
              isPt
                ? "O botão pode apontar para um asset direto do GitHub Releases ou para uma CDN própria, sem mudar o layout do site."
                : "The button can target a direct GitHub Releases asset or your own CDN without changing the site layout."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li>
                {isPt
                  ? "- Um único clique inicia o download do instalador"
                  : "- A single click starts the installer download"}
              </li>
              <li>
                {isPt
                  ? "- O site continua sendo a experiência principal de distribuição"
                  : "- The site remains the main distribution experience"}
              </li>
              <li>
                {isPt
                  ? "- A hospedagem pode evoluir depois sem refazer a página"
                  : "- Hosting can evolve later without rebuilding the page"}
              </li>
            </ul>
          </GlassCard>
          <GlassCard
            title={isPt ? "Informações técnicas" : "Technical details"}
            description={
              isPt
                ? "Campos opcionais ajudam a transmitir confiança para o usuário na hora do download."
                : "Optional fields help build trust when the user is ready to download."
            }
          >
            <div className="space-y-3 text-sm leading-7 text-white/72">
              <p>
                <span className="font-semibold text-white">
                  {isPt ? "Versão:" : "Version:"}
                </span>{" "}
                {download.version ?? (isPt ? "não informada" : "not provided")}
              </p>
              <p>
                <span className="font-semibold text-white">
                  {isPt ? "Sistema mínimo:" : "Minimum OS:"}
                </span>{" "}
                {download.minOs}
              </p>
              <p>
                <span className="font-semibold text-white">SHA-256:</span>{" "}
                {download.sha256 ?? (isPt ? "não informado" : "not provided")}
              </p>
            </div>
          </GlassCard>
        </div>
      </Section>
    </>
  );
}
