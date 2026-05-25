import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account-dashboard";
import { Container, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <Section
      eyebrow="Account"
      title={locale === "pt-br" ? "Minha conta" : "My account"}
      description={
        locale === "pt-br"
          ? "Seu ponto central para assinatura, creditos, suporte e proximos passos no BROGNOLI Studio."
          : "Your central place for subscription, credits, support, and next steps in BROGNOLI Studio."
      }
    >
      <Container>
        <AccountDashboard locale={locale} />
      </Container>
    </Section>
  );
}
