import type { Metadata } from "next";

import { Container, GlassCard, PrimaryButton, SecondaryButton, Section } from "@/components/ui";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function SuccessBadge() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[color:rgba(255,204,0,0.14)] text-[var(--brand-amber)]">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l7 4v5c0 4.5-2.8 7.7-7 9-4.2-1.3-7-4.5-7-9V7l7-4Z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </svg>
    </div>
  );
}

export default async function BillingSuccessPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt-br";

  return (
    <Section
      eyebrow="Billing"
      title={isPt ? "Pagamento confirmado" : "Payment confirmed"}
      description={
        isPt
          ? "Seu checkout foi concluído com sucesso. A assinatura ou compra de créditos já pode ser processada no ecossistema do BROGNOLI Studio."
          : "Your checkout was completed successfully. The subscription or credit purchase can now be processed in the BROGNOLI Studio ecosystem."
      }
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassCard
            title={isPt ? "Proximo passo" : "Next step"}
            description={
              isPt
                ? "Abra sua área do assinante ou volte ao Studio para continuar com o plano ativo e os créditos liberados."
                : "Open your subscriber area or return to Studio to continue with your active plan and unlocked credits."
            }
          >
            <div className="mt-2 flex items-start gap-4">
              <SuccessBadge />
              <div className="space-y-3 text-sm leading-7 text-white/72">
                <p>
                  {isPt
                    ? "Sua área do assinante no site centraliza login, assinatura, créditos e próximos passos."
                    : "Your subscriber area on the website centralizes login, subscription, credits, and next steps."}
                </p>
                <p>
                  {isPt
                    ? "Se algo não aparecer como esperado, entre em contato com support@brognolibi.com."
                    : "If anything does not appear as expected, contact support@brognolibi.com."}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href={`/${locale}/account`}>
                {isPt ? "Abrir minha conta" : "Open my account"}
              </PrimaryButton>
              <SecondaryButton href="mailto:support@brognolibi.com">
                {isPt ? "Falar com suporte" : "Contact support"}
              </SecondaryButton>
            </div>
          </GlassCard>

          <GlassCard
            title={isPt ? "O que acontece agora" : "What happens now"}
            description={
              isPt
                ? "Seu pagamento entra no fluxo de validação e sincronização do BROGNOLI Studio."
                : "Your payment enters the BROGNOLI Studio validation and sync flow."
            }
          >
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li>- {isPt ? "Assinaturas são sincronizadas com seu usuário." : "Subscriptions are synced to your user."}</li>
              <li>- {isPt ? "Créditos do plano ou créditos extras são liberados automaticamente." : "Plan credits or extra credits are granted automatically."}</li>
              <li>- {isPt ? "Seu uso continua centralizado no software." : "Your usage continues to stay centered in the desktop software."}</li>
            </ul>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
