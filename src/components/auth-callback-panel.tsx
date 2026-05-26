"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type AuthCallbackPanelProps = {
  locale: Locale;
};

export function AuthCallbackPanel({ locale }: AuthCallbackPanelProps) {
  const router = useRouter();
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
            missingCode: "Código de autenticação ausente.",
          }
        : {
            working: "Finalizing your login...",
            done: "Redirecting...",
            body: "We are connecting your account and taking you to the subscriber area.",
            failed: "Authentication failed",
            back: "Back to login",
            missingCode: "Missing authentication code.",
          },
    [locale],
  );

  useEffect(() => {
    let mounted = true;

    async function finishOAuth() {
      try {
        const supabase = getSupabaseBrowserClient();
        const code = searchParams.get("code");
        const next = searchParams.get("next") || `/${locale}/account`;

        if (!code) {
          throw new Error(dict.missingCode);
        }

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          throw exchangeError;
        }

        if (!mounted) {
          return;
        }

        setCompleted(true);
        router.replace(next);
        router.refresh();
      } catch (caughtError) {
        if (!mounted) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : "Unexpected callback error.");
      }
    }

    void finishOAuth();

    return () => {
      mounted = false;
    };
  }, [dict.missingCode, locale, router, searchParams]);

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
