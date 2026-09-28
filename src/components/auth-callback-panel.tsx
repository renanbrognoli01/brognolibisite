"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getSafeInternalRedirect } from "@/lib/client-security";
import { privacyConsentSessionKey, privacyPolicyVersion } from "@/lib/privacy";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

const authNextStorageKey = "brognolibi-auth-next";
const codeExchanges = new Map<string, Promise<void>>();

function readSessionValue(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function removeSessionValue(key: string) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // Auth must still complete when browser storage is unavailable.
  }
}

function exchangeCodeOnce(code: string) {
  const inFlight = codeExchanges.get(code);
  if (inFlight) {
    return inFlight;
  }

  const supabase = getSupabaseBrowserClient();
  const exchange = supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
    if (error) {
      throw error;
    }
  });
  codeExchanges.set(code, exchange);
  void exchange.then(
    () => codeExchanges.delete(code),
    () => codeExchanges.delete(code),
  );
  return exchange;
}

type AuthCallbackPanelProps = {
  locale: Locale;
};

export function AuthCallbackPanel({ locale }: AuthCallbackPanelProps) {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const dict = useMemo(
    () =>
      locale === "pt-br"
        ? {
            working: "Finalizando seu login...",
            done: "Redirecionando...",
            body: "Estamos conectando sua conta e levando você para a área do assinante.",
            failed: "Falha na autenticação",
            back: "Voltar para o login",
            errorBody: "Não foi possível concluir o login. Tente novamente.",
          }
        : {
            working: "Finalizing your login...",
            done: "Redirecting...",
            body: "We are connecting your account and taking you to the subscriber area.",
            failed: "Authentication failed",
            back: "Back to login",
            errorBody: "We could not complete your sign-in. Please try again.",
          },
    [locale],
  );

  useEffect(() => {
    let mounted = true;

    function resolveNextPath() {
      const queryNext = searchParams.get("next");
      const storedNext = readSessionValue(authNextStorageKey);
      return getSafeInternalRedirect(
        queryNext || storedNext,
        locale,
        window.location.origin,
      );
    }

    async function finishOAuth() {
      try {
        const supabase = getSupabaseBrowserClient();
        const code = searchParams.get("code");
        const next = resolveNextPath();

        if (!code) {
          throw new Error("Missing authentication code.");
        }

        await exchangeCodeOnce(code);
        if (!mounted) {
          return;
        }

        const pendingPrivacyVersion = readSessionValue(privacyConsentSessionKey);
        if (pendingPrivacyVersion === privacyPolicyVersion) {
          try {
            const { error: consentError } = await supabase.auth.updateUser({
              data: { privacy_policy_version: privacyPolicyVersion },
            });
            if (consentError) {
              console.warn("Could not persist privacy policy acceptance after OAuth sign-in.");
            }
          } catch {
            // Consent persistence must not turn a successful sign-in into a failed login.
            console.warn("Could not persist privacy policy acceptance after OAuth sign-in.");
          }
          removeSessionValue(privacyConsentSessionKey);
        }

        removeSessionValue(authNextStorageKey);
        removeSessionValue(privacyConsentSessionKey);

        setCompleted(true);
        window.location.replace(next);
      } catch {
        if (!mounted) {
          return;
        }

        removeSessionValue(authNextStorageKey);
        removeSessionValue(privacyConsentSessionKey);
        setError(dict.errorBody);
      }
    }

    void finishOAuth();

    return () => {
      mounted = false;
    };
  }, [dict.errorBody, locale, searchParams]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-6 py-16">
      <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        {error ? (
          <>
            <h1 className="text-3xl font-semibold text-white">{dict.failed}</h1>
            <p className="mt-4 text-base leading-7 text-white/72">{error}</p>
            <Link
              href={`/${locale}/login`}
              className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              {dict.back}
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-white">{completed ? dict.done : dict.working}</h1>
            <p className="mt-4 text-base leading-7 text-white/72">{dict.body}</p>
          </>
        )}
      </div>
    </div>
  );
}
