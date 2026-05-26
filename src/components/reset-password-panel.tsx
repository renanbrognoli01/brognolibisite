"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Locale } from "@/lib/i18n";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";

type ResetPasswordPanelProps = {
  locale: Locale;
};

export function ResetPasswordPanel({ locale }: ResetPasswordPanelProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dict = useMemo(
    () =>
      locale === "pt-br"
        ? {
            title: "Defina sua nova senha",
            description:
              "Crie uma nova senha para continuar acessando sua area do assinante do BROGNOLI Studio.",
            password: "Nova senha",
            confirmPassword: "Confirmar nova senha",
            submit: "Salvar nova senha",
            success: "Senha atualizada com sucesso. Agora voce ja pode entrar normalmente.",
            mismatch: "As senhas nao coincidem.",
            invalidLink:
              "Este link de redefinicao nao esta valido ou expirou. Solicite um novo e-mail para continuar.",
            backToLogin: "Voltar para o login",
            preparing: "Estamos preparando sua sessao de recuperacao...",
          }
        : {
            title: "Set your new password",
            description:
              "Create a new password to keep accessing your BROGNOLI Studio subscriber area.",
            password: "New password",
            confirmPassword: "Confirm new password",
            submit: "Save new password",
            success: "Password updated successfully. You can now sign in normally.",
            mismatch: "Passwords do not match.",
            invalidLink:
              "This reset link is invalid or expired. Request a new email to continue.",
            backToLogin: "Back to login",
            preparing: "We are preparing your recovery session...",
          },
    [locale],
  );

  useEffect(() => {
    let mounted = true;

    async function prepareRecoverySession() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!mounted) {
          return;
        }

        if (!data.session) {
          setError(dict.invalidLink);
        }
      } catch (caughtError) {
        if (!mounted) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : dict.invalidLink);
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    }

    void prepareRecoverySession();

    return () => {
      mounted = false;
    };
  }, [dict.invalidLink]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError(dict.mismatch);
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        throw updateError;
      }

      setMessage(dict.success);
      setPassword("");
      setConfirmPassword("");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected password reset error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
      <h1 className="text-3xl font-semibold text-white">{dict.title}</h1>
      <p className="mt-4 text-base leading-7 text-white/72">{dict.description}</p>

      {initializing ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0d1017] px-4 py-3 text-sm text-white/72">
          {dict.preparing}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/76">{dict.password}</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#0d1017] px-4 py-3 text-white outline-none transition focus:border-[#f6b23c]/60"
            placeholder="********"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/76">{dict.confirmPassword}</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#0d1017] px-4 py-3 text-white outline-none transition focus:border-[#f6b23c]/60"
            placeholder="********"
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-[#f37070]/30 bg-[#f37070]/10 px-4 py-3 text-sm text-[#ffd2d2]">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-2xl border border-[#13766e]/30 bg-[#13766e]/10 px-4 py-3 text-sm text-[#d4fff9]">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || initializing || !!error}
          className="w-full rounded-full bg-[#f6b23c] px-6 py-3 text-sm font-semibold text-[#12141a] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {dict.submit}
        </button>
      </form>

      <Link
        href={`/${locale}/login`}
        className="mt-6 inline-flex text-sm font-medium text-[#f6b23c] transition hover:text-[#ffd089]"
      >
        {dict.backToLogin}
      </Link>
    </div>
  );
}
