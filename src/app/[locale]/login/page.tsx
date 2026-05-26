import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth-panel";
import { Container, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <Section
      eyebrow="Access"
      title={locale === "pt-br" ? "Login do assinante" : "Subscriber login"}
      description={
        locale === "pt-br"
          ? "Acesse sua conta para acompanhar assinatura, créditos e gestão do BROGNOLI Studio."
          : "Access your account to track subscription, credits, and BROGNOLI Studio management."
      }
    >
      <Container>
        <AuthPanel locale={locale} />
      </Container>
    </Section>
  );
}
