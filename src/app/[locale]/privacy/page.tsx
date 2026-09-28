import Link from "next/link";

import { PageHero, Section } from "@/components/ui";
import { siteData } from "@/lib/site-data";
import type { Locale } from "@/lib/i18n";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = siteData[locale];

  return (
    <>
      <PageHero title={dict.privacy.title} description={dict.privacy.sections[0].body[0]} />
      <Section title={dict.privacy.title}>
        <div className="grid gap-6">
          {dict.privacy.sections.map((section) => (
            <div key={section.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-white/72">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[1.75rem] border border-[color:rgba(255,204,0,0.3)] bg-[color:rgba(255,204,0,0.06)] p-6">
          <h2 className="text-lg font-semibold text-white">
            {locale === "pt-br" ? "Solicitar acesso, exportação ou exclusão de dados" : "Request access, export, or deletion of your data"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/72">
            {locale === "pt-br"
              ? "Se você consegue entrar na sua conta, use a área Minha conta para baixar seus dados ou registrar um pedido de exclusão para análise. Se não consegue acessar a conta, envie um e-mail pelo endereço abaixo. Podemos confirmar sua identidade; não envie senha, chave de API ou documentos desnecessários."
              : "If you can sign in, use My account to download your data or submit a deletion request for review. If you cannot access your account, email the address below. We may verify your identity; do not send passwords, API keys, or unnecessary identity documents."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/account`}
              className="inline-flex rounded-full bg-[var(--brand-amber)] px-5 py-3 text-sm font-semibold text-[#0F1D2A]"
            >
              {locale === "pt-br" ? "Abrir minha conta" : "Open my account"}
            </Link>
            <a
              href={`mailto:support@brognolibi.com?subject=${encodeURIComponent(locale === "pt-br" ? "Solicitação de privacidade / LGPD" : "Privacy rights request")}`}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white"
            >
              support@brognolibi.com
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
