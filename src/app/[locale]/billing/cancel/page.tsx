import type { Metadata } from "next";

import {
  Container,
  GlassCard,
  PrimaryButton,
  SecondaryButton,
  Section,
} from "@/components/ui";
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

  const title = isPt ? "Checkout cancelado" : "Checkout canceled";
  const description = isPt
    ? "Nenhuma cobrança foi concluída. Você pode retomar a assinatura ou a compra de créditos quando quiser."
    : "No charge was completed. You can restart the subscription or credit purchase whenever you want.";

  return (
    <Section eyebrow="Billing" title={title} description={description}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard
            title={isPt ? "Sem problema" : "No problem"}
            description={
              isPt
                ? "Se você saiu do checkout por engano, basta iniciar o processo novamente pelo Studio."
                : "If you left checkout by mistake, just start the process again from Studio."
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
                    ? "Quando a área de assinante estiver pronta, o site também permitirá retomar e gerenciar compras com mais facilidade."
                    : "Once the subscriber area is ready, the website will also make it easier to resume and manage purchases."}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href={`/${locale}/studio`}>
                {isPt ? "Voltar para o Studio" : "Back to Studio"}
              </PrimaryButton>
              <SecondaryButton href={`/${locale}/contact`}>
                {isPt ? "Falar comigo" : "Talk to me"}
              </SecondaryButton>
            </div>
          </GlassCard>

          <GlassCard
            title={isPt ? "Quando usar esta página" : "When this page appears"}
            description={
              isPt
                ? "Ela é usada como retorno do checkout da Stripe quando a compra não é concluída."
                : "It is used as the Stripe checkout return page when the purchase is not completed."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li>• {isPt ? "Fechamento manual do checkout." : "Manual checkout close."}</li>
              <li>• {isPt ? "Mudança de ideia antes de pagar." : "Change of mind before paying."}</li>
              <li>• {isPt ? "Tentativa interrompida para revisar plano ou créditos." : "Interrupted attempt to review plan or credits."}</li>
            </ul>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
