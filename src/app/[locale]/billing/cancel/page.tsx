import type { Metadata } from "next";

import { Container, GlassCard, PrimaryButton, SecondaryButton, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function CancelBadge() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/[0.06] text-white/80">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="m9 9 6 6" />
        <path d="m15 9-6 6" />
      </svg>
    </div>
  );
}

export default async function BillingCancelPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt-br";

  return (
    <Section
      eyebrow="Billing"
      title={isPt ? "Checkout cancelado" : "Checkout canceled"}
      description={
        isPt
          ? "Nenhuma cobranca foi concluida. Voce pode retomar a assinatura ou a compra de creditos quando quiser."
          : "No charge was completed. You can restart the subscription or credit purchase whenever you want."
      }
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard
            title={isPt ? "Sem problema" : "No problem"}
            description={
              isPt
                ? "Se voce saiu do checkout por engano, basta iniciar o processo novamente pela sua conta."
                : "If you left checkout by mistake, just start the process again from your account."
            }
          >
            <div className="mt-2 flex items-start gap-4">
              <CancelBadge />
              <div className="space-y-3 text-sm leading-7 text-white/72">
                <p>
                  {isPt
                    ? "Nenhuma assinatura ou compra extra foi ativada nessa tentativa."
                    : "No subscription or extra purchase was activated in this attempt."}
                </p>
                <p>
                  {isPt
                    ? "Voce pode tentar novamente agora mesmo pela area do assinante ou pedir ajuda em support@brognolibi.com."
                    : "You can try again right now from the subscriber area or ask for help at support@brognolibi.com."}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href={`/${locale}/account`}>
                {isPt ? "Ir para minha conta" : "Go to my account"}
              </PrimaryButton>
              <SecondaryButton href="mailto:support@brognolibi.com">
                {isPt ? "Falar com suporte" : "Contact support"}
              </SecondaryButton>
            </div>
          </GlassCard>

          <GlassCard
            title={isPt ? "Quando usar esta pagina" : "When this page appears"}
            description={
              isPt
                ? "Ela e usada como retorno do checkout da Stripe quando a compra nao e concluida."
                : "It is used as the Stripe checkout return page when the purchase is not completed."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li>- {isPt ? "Fechamento manual do checkout." : "Manual checkout close."}</li>
              <li>- {isPt ? "Mudanca de ideia antes de pagar." : "Change of mind before paying."}</li>
              <li>- {isPt ? "Tentativa interrompida para revisar plano ou creditos." : "Interrupted attempt to review plan or credits."}</li>
            </ul>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
