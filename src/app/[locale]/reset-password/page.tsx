import type { Metadata } from "next";

import { ResetPasswordPanel } from "@/components/reset-password-panel";
import { Container, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <Section
      eyebrow="Access"
      title={locale === "pt-br" ? "Redefinir senha" : "Reset password"}
      description={
        locale === "pt-br"
          ? "Crie uma nova senha para sua area do assinante do BROGNOLI Studio."
          : "Create a new password for your BROGNOLI Studio subscriber area."
      }
    >
      <Container>
        <ResetPasswordPanel locale={locale} />
      </Container>
    </Section>
  );
}
