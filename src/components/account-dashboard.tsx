"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getSupabaseBrowserClient, getSupabaseBrowserConfig } from "@/lib/supabase-browser";

const supportEmail = "support@brognolibi.com";

type SubscriberDashboardProps = {
  locale: "pt-br" | "en";
};

type AccountSnapshot = {
  email: string;
  fullName: string | null;
  subscriptionStatus: string | null;
  planName: string | null;
  planCode: string | null;
  nextBillingAt: string | null;
  cancelAtPeriodEnd: boolean;
  planCredits: number;
  extraCredits: number;
  currentPriceLabel: string | null;
};

type CheckoutTarget = {
  targetKind: "subscription" | "credit_pack";
  targetCode: string;
  currency: "BRL" | "USD" | "EUR";
};

export function AccountDashboard({ locale }: SubscriberDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [account, setAccount] = useState<AccountSnapshot | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [resumeLoading, setResumeLoading] = useState(false);

  const dict = useMemo(
    () =>
      locale === "pt-br"
        ? {
            eyebrow: "Minha conta",
            title: "Area do assinante do BROGNOLI Studio",
            description:
              "Acompanhe seu plano, seus creditos e sua assinatura em um so lugar.",
            notSignedTitle: "Voce ainda nao entrou",
            notSignedBody:
              "Faca login para acessar sua assinatura, seus creditos e os proximos passos do BROGNOLI Studio.",
            login: "Fazer login",
            plan: "Plano atual",
            status: "Status",
            nextBilling: "Proxima cobranca",
            planCredits: "Creditos do plano",
            extraCredits: "Creditos extras",
            noSubscription: "Nenhuma assinatura ativa ainda",
            support: "Suporte ao assinante",
            supportBody:
              "Duvidas de acesso, cobranca, creditos ou cancelamento podem ser tratadas por e-mail.",
            signOut: "Sair",
            openStudio: "Conhecer o Studio",
            subscribeStarter: "Assinar Starter",
            subscribePro: "Assinar Pro",
            buyCredits: "Comprar 1.000 creditos",
            buyMore: "Comprar 5.000 creditos",
            currentPlanAction: "Plano atual",
            cancelSubscription: "Cancelar assinatura",
            confirmCancelSubscription:
              "Tem certeza que deseja cancelar sua assinatura? Ela continuara ativa ate o fim do periodo atual.",
            resumeSubscription: "Reativar assinatura",
            resumeDone: "Sua assinatura foi reativada e a renovacao automatica voltou a ficar ativa.",
            cancellationScheduled: "Cancelamento agendado para o fim do periodo atual.",
            cancellationDone:
              "Sua assinatura foi marcada para cancelamento ao fim do periodo atual.",
            billingPortalSoon: "Gestao completa de cobranca em breve.",
            processing: "Processando...",
            currentPrice: "Valor atual",
            noPrice: "Sera exibido aqui quando o plano estiver vinculado.",
            quickActions: "Acoes rapidas",
            missingEnv:
              "As variaveis publicas do Supabase ainda nao foram configuradas neste site.",
          }
        : {
            eyebrow: "My account",
            title: "BROGNOLI Studio subscriber area",
            description:
              "Track your plan, credits, and subscription in a single place.",
            notSignedTitle: "You are not signed in yet",
            notSignedBody:
              "Sign in to access your subscription, credits, and next steps for BROGNOLI Studio.",
            login: "Sign in",
            plan: "Current plan",
            status: "Status",
            nextBilling: "Next billing",
            planCredits: "Plan credits",
            extraCredits: "Extra credits",
            noSubscription: "No active subscription yet",
            support: "Subscriber support",
            supportBody:
              "Questions about access, billing, credits, or cancellation can be handled by email.",
            signOut: "Sign out",
            openStudio: "Explore Studio",
            subscribeStarter: "Subscribe to Starter",
            subscribePro: "Subscribe to Pro",
            buyCredits: "Buy 1,000 credits",
            buyMore: "Buy 5,000 credits",
            currentPlanAction: "Current plan",
            cancelSubscription: "Cancel subscription",
            confirmCancelSubscription:
              "Are you sure you want to cancel your subscription? It will remain active until the end of the current billing period.",
            resumeSubscription: "Resume subscription",
            resumeDone: "Your subscription has been resumed and automatic renewal is active again.",
            cancellationScheduled: "Cancellation scheduled for the end of the current billing period.",
            cancellationDone:
              "Your subscription has been scheduled to cancel at the end of the current billing period.",
            billingPortalSoon: "Full billing management is coming soon.",
            processing: "Processing...",
            currentPrice: "Current price",
            noPrice: "It will appear here once the plan is linked.",
            quickActions: "Quick actions",
            missingEnv:
              "The public Supabase variables have not been configured for this website yet.",
          },
    [locale],
  );

  useEffect(() => {
    let mounted = true;

    async function loadAccount() {
      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        const supabase = getSupabaseBrowserClient();
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session?.user) {
          if (mounted) {
            setAccount(null);
          }
          return;
        }

        const userId = session.user.id;

        const [profileResult, subscriptionResult, walletResult] = await Promise.all([
          supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", userId)
            .maybeSingle<{ email: string; full_name: string | null }>(),
          supabase
            .from("subscriptions")
            .select("plan_id, status, current_period_end, cancel_at_period_end")
            .eq("user_id", userId)
            .order("updated_at", { ascending: false })
            .limit(1)
            .maybeSingle<{
              plan_id: string | null;
              status: string;
              current_period_end: string | null;
              cancel_at_period_end: boolean | null;
            }>(),
          supabase
            .from("credit_wallets")
            .select("plan_credit_balance, extra_credit_balance")
            .eq("user_id", userId)
            .maybeSingle<{ plan_credit_balance: number; extra_credit_balance: number }>(),
        ]);

        if (profileResult.error) {
          throw profileResult.error;
        }
        if (subscriptionResult.error) {
          throw subscriptionResult.error;
        }
        if (walletResult.error) {
          throw walletResult.error;
        }

        let planName: string | null = null;
        let planCode: string | null = null;
        let currentPriceLabel: string | null = null;

        if (subscriptionResult.data?.plan_id) {
          const { data: planResult, error: planError } = await supabase
            .from("plans")
            .select("code, name")
            .eq("id", subscriptionResult.data.plan_id)
            .maybeSingle<{ code: string; name: string }>();

          if (planError) {
            throw planError;
          }

          planName = planResult?.name ?? null;
          planCode = planResult?.code ?? null;

          const currency = locale === "pt-br" ? "BRL" : "USD";
          const countryGroup = locale === "pt-br" ? "BR" : "GLOBAL";
          const { data: priceResult, error: priceError } = await supabase
            .from("price_catalog")
            .select("amount_minor, currency")
            .eq("kind", "subscription")
            .eq("target_code", planCode ?? "")
            .eq("currency", currency)
            .eq("country_group", countryGroup)
            .maybeSingle<{ amount_minor: number; currency: string }>();

          if (priceError) {
            throw priceError;
          }

          if (priceResult) {
            currentPriceLabel = new Intl.NumberFormat(locale === "pt-br" ? "pt-BR" : "en-US", {
              style: "currency",
              currency: priceResult.currency,
            }).format(priceResult.amount_minor / 100);
          }
        }

        if (!mounted) {
          return;
        }

        setAccount({
          email: profileResult.data?.email ?? session.user.email ?? "",
          fullName: profileResult.data?.full_name ?? null,
          subscriptionStatus: subscriptionResult.data?.status ?? null,
          planName,
          planCode,
          nextBillingAt: subscriptionResult.data?.current_period_end ?? null,
          cancelAtPeriodEnd: Boolean(subscriptionResult.data?.cancel_at_period_end),
          planCredits: walletResult.data?.plan_credit_balance ?? 0,
          extraCredits: walletResult.data?.extra_credit_balance ?? 0,
          currentPriceLabel,
        });
      } catch (caughtError) {
        if (!mounted) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : "Unexpected account error.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadAccount();

    return () => {
      mounted = false;
    };
  }, [locale]);

  async function startCheckout(target: CheckoutTarget) {
    setCheckoutLoading(`${target.targetKind}:${target.targetCode}`);
    setError(null);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { supabaseUrl, publishableKey } = getSupabaseBrowserConfig();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw sessionError ?? new Error("Missing authenticated session.");
      }
      if (!supabaseUrl || !publishableKey) {
        throw new Error(dict.missingEnv);
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: publishableKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetKind: target.targetKind,
          targetCode: target.targetCode,
          currency: target.currency,
          successUrl: `${window.location.origin}/${locale}/billing/success`,
          cancelUrl: `${window.location.origin}/${locale}/billing/cancel`,
          locale: locale === "pt-br" ? "pt-BR" : "en",
        }),
      });

      const data = (await response.json()) as { checkoutUrl?: string; error?: string; details?: string };
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.details ?? data.error ?? "Failed to create checkout session.");
      }

      window.location.assign(data.checkoutUrl);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected checkout error.");
      setCheckoutLoading(null);
    }
  }

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.assign(`/${locale}/login`);
  }

  async function handleCancelSubscription() {
    if (!window.confirm(dict.confirmCancelSubscription)) {
      return;
    }

    setCancelLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { supabaseUrl, publishableKey } = getSupabaseBrowserConfig();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw sessionError ?? new Error("Missing authenticated session.");
      }
      if (!supabaseUrl || !publishableKey) {
        throw new Error(dict.missingEnv);
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/cancel-subscription`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: publishableKey,
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as {
        success?: boolean;
        currentPeriodEnd?: string | null;
        error?: string;
        details?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.details ?? data.error ?? "Failed to cancel subscription.");
      }

      setAccount((current) =>
        current
          ? {
              ...current,
              cancelAtPeriodEnd: true,
              nextBillingAt: data.currentPeriodEnd ?? current.nextBillingAt,
            }
          : current,
      );
      setMessage(dict.cancellationDone);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected cancellation error.");
    } finally {
      setCancelLoading(false);
    }
  }

  async function handleResumeSubscription() {
    setResumeLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { supabaseUrl, publishableKey } = getSupabaseBrowserConfig();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw sessionError ?? new Error("Missing authenticated session.");
      }
      if (!supabaseUrl || !publishableKey) {
        throw new Error(dict.missingEnv);
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/resume-subscription`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: publishableKey,
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as {
        success?: boolean;
        currentPeriodEnd?: string | null;
        error?: string;
        details?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.details ?? data.error ?? "Failed to resume subscription.");
      }

      setAccount((current) =>
        current
          ? {
              ...current,
              cancelAtPeriodEnd: false,
              nextBillingAt: data.currentPeriodEnd ?? current.nextBillingAt,
            }
          : current,
      );
      setMessage(dict.resumeDone);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected resume error.");
    } finally {
      setResumeLoading(false);
    }
  }

  function formatDate(value: string | null) {
    if (!value) {
      return "-";
    }

    return new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  }

  const isStarterActive = account?.planCode === "starter" && account.subscriptionStatus === "active";
  const isProActive = account?.planCode === "pro" && account.subscriptionStatus === "active";
  const hasCancellableSubscription = Boolean(
    account?.planCode &&
      account.subscriptionStatus &&
      ["active", "trialing", "past_due"].includes(account.subscriptionStatus),
  );

  if (loading) {
    return <div className="h-64 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8" />;
  }

  if (!account) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <h1 className="text-3xl font-semibold text-white">{dict.notSignedTitle}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">{dict.notSignedBody}</p>
        <div className="mt-8">
          <Link
            href={`/${locale}/login`}
            className="inline-flex rounded-full bg-[#f6b23c] px-6 py-3 text-sm font-semibold text-[#12141a]"
          >
            {dict.login}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6b23c]">{dict.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">{dict.title}</h1>
          <p className="mt-4 text-base leading-7 text-white/72">{dict.description}</p>

          {error ? (
            <div className="mt-6 rounded-2xl border border-[#f37070]/30 bg-[#f37070]/10 px-4 py-3 text-sm text-[#ffd2d2]">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="mt-6 rounded-2xl border border-[#13766e]/30 bg-[#13766e]/10 px-4 py-3 text-sm text-[#d4fff9]">
              {message}
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Email</p>
              <p className="mt-3 text-lg font-semibold text-white">{account.email}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{dict.status}</p>
              <p className="mt-3 text-lg font-semibold text-white">{account.subscriptionStatus ?? dict.noSubscription}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{dict.plan}</p>
              <p className="mt-3 text-lg font-semibold text-white">{account.planName ?? dict.noSubscription}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{dict.nextBilling}</p>
              <p className="mt-3 text-lg font-semibold text-white">{formatDate(account.nextBillingAt)}</p>
              {account.cancelAtPeriodEnd ? (
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-[#f6b23c]">
                  {dict.cancellationScheduled}
                </p>
              ) : null}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{dict.currentPrice}</p>
              <p className="mt-3 text-lg font-semibold text-white">{account.currentPriceLabel ?? dict.noPrice}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#f6b23c]/20 bg-[#f6b23c]/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">{dict.planCredits}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{account.planCredits}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[#13766e]/24 bg-[#13766e]/12 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">{dict.extraCredits}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{account.extraCredits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <h2 className="text-2xl font-semibold text-white">{dict.quickActions}</h2>
          <div className="mt-6 grid gap-3">
            {isStarterActive ? (
              <div className="rounded-full border border-[#f6b23c]/30 bg-[#f6b23c]/10 px-5 py-3 text-center text-sm font-semibold text-[#f6b23c]">
                {dict.currentPlanAction}: Starter
              </div>
            ) : (
              <button
                type="button"
                disabled={checkoutLoading !== null}
                onClick={() => void startCheckout({ targetKind: "subscription", targetCode: "starter", currency: "BRL" })}
                className="rounded-full bg-[#f6b23c] px-5 py-3 text-sm font-semibold text-[#12141a] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {checkoutLoading === "subscription:starter" ? dict.processing : dict.subscribeStarter}
              </button>
            )}
            {isProActive ? (
              <div className="rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-white">
                {dict.currentPlanAction}: Pro
              </div>
            ) : (
              <button
                type="button"
                disabled={checkoutLoading !== null}
                onClick={() => void startCheckout({ targetKind: "subscription", targetCode: "pro", currency: "BRL" })}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {checkoutLoading === "subscription:pro" ? dict.processing : dict.subscribePro}
              </button>
            )}
            <button
              type="button"
              disabled={checkoutLoading !== null}
              onClick={() => void startCheckout({ targetKind: "credit_pack", targetCode: "credits_1000", currency: "BRL" })}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {checkoutLoading === "credit_pack:credits_1000" ? dict.processing : dict.buyCredits}
            </button>
            <button
              type="button"
              disabled={checkoutLoading !== null}
              onClick={() => void startCheckout({ targetKind: "credit_pack", targetCode: "credits_5000", currency: "BRL" })}
              className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {checkoutLoading === "credit_pack:credits_5000" ? dict.processing : dict.buyMore}
            </button>
            {hasCancellableSubscription ? (
              account.cancelAtPeriodEnd ? (
                <button
                  type="button"
                  disabled={resumeLoading}
                  onClick={() => void handleResumeSubscription()}
                  className="rounded-full border border-[#13766e]/30 bg-[#13766e]/10 px-5 py-3 text-center text-sm font-semibold text-[#d4fff9] transition hover:bg-[#13766e]/16 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {resumeLoading ? dict.processing : dict.resumeSubscription}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={cancelLoading}
                  onClick={() => void handleCancelSubscription()}
                  className="rounded-full border border-[#f37070]/30 bg-[#f37070]/10 px-5 py-3 text-center text-sm font-semibold text-[#ffd2d2] transition hover:bg-[#f37070]/16 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {cancelLoading ? dict.processing : dict.cancelSubscription}
                </button>
              )
            ) : null}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5">
            <p className="text-sm leading-7 text-white/72">{dict.billingPortalSoon}</p>
            <a
              href={`mailto:${supportEmail}`}
              className="mt-4 inline-flex rounded-full border border-[#f6b23c]/30 bg-[#f6b23c]/10 px-4 py-3 text-sm font-semibold text-[#f6b23c] transition hover:bg-[#f6b23c]/16"
            >
              {supportEmail}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/studio`}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              {dict.openStudio}
            </Link>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              {dict.signOut}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <h2 className="text-2xl font-semibold text-white">{dict.support}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72">{dict.supportBody}</p>
        <a
          href={`mailto:${supportEmail}`}
          className="mt-6 inline-flex rounded-full border border-[#f6b23c]/30 bg-[#f6b23c]/10 px-4 py-3 text-sm font-semibold text-[#f6b23c] transition hover:bg-[#f6b23c]/16"
        >
          {supportEmail}
        </a>
      </div>
    </div>
  );
}
