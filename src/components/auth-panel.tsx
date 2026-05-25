"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { getSupabaseBrowserClient, getSupabaseBrowserConfig } from "@/lib/supabase-browser";

const supportEmail = "support@brognolibi.com";

type AuthPanelProps = {
  locale: "pt-br" | "en";
};

export function AuthPanel({ locale }: AuthPanelProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dict = useMemo(
    () =>
      locale === "pt-br"
        ? {
            eyebrow: "Area do assinante",
            title: "Entre para acessar sua conta do BROGNOLI Studio",
            description:
              "Use e-mail e senha, Google ou Microsoft para acompanhar sua assinatura, seus creditos e suas proximas cobrancas.",
            login: "Entrar",
            signup: "Criar conta",
            email: "E-mail",
            password: "Senha",
            fullName: "Nome completo",
            submitLogin: "Entrar na conta",
            submitSignup: "Criar conta",
            forgotPassword: "Esqueci minha senha",
            forgotPasswordSent:
              "Enviamos um e-mail de redefinicao de senha. Verifique sua caixa de entrada e siga o link para criar uma nova senha.",
            forgotPasswordMissingEmail: "Informe seu e-mail antes de pedir a redefinicao de senha.",
            withGoogle: "Continuar com Google",
            withMicrosoft: "Continuar com Microsoft",
            switchToSignup: "Ainda nao tem conta? Criar acesso",
            switchToLogin: "Ja tem conta? Fazer login",
            signupSuccess:
              "Conta criada. Verifique seu e-mail para confirmar o acesso antes de continuar.",
            supportLabel: "Suporte ao assinante",
            supportBody:
              "Se precisar de ajuda com acesso, assinatura ou cobranca, fale com nosso suporte.",
            missingEnv:
              "As variaveis publicas do Supabase ainda nao foram configuradas neste site.",
          }
        : {
            eyebrow: "Subscriber area",
            title: "Sign in to access your BROGNOLI Studio account",
            description:
              "Use email and password, Google, or Microsoft to track your subscription, credits, and upcoming billing.",
            login: "Login",
            signup: "Create account",
            email: "Email",
            password: "Password",
            fullName: "Full name",
            submitLogin: "Sign in",
            submitSignup: "Create account",
            forgotPassword: "Forgot password",
            forgotPasswordSent:
              "We sent a password reset email. Check your inbox and follow the link to create a new password.",
            forgotPasswordMissingEmail: "Enter your email before requesting a password reset.",
            withGoogle: "Continue with Google",
            withMicrosoft: "Continue with Microsoft",
            switchToSignup: "Don't have an account yet? Create one",
            switchToLogin: "Already have an account? Sign in",
            signupSuccess:
              "Account created. Check your email to confirm your access before continuing.",
            supportLabel: "Subscriber support",
            supportBody:
              "If you need help with access, subscription, or billing, contact our support team.",
            missingEnv:
              "The public Supabase variables have not been configured for this website yet.",
          },
    [locale],
  );

  const { supabaseUrl, publishableKey } = getSupabaseBrowserConfig();
  const envMissing = !supabaseUrl || !publishableKey;
  const authRedirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/auth/callback?next=/${locale}/account`
      : undefined;

  async function handlePasswordAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();

      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        router.push(`/${locale}/account`);
        router.refresh();
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: authRedirectUrl,
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      setMessage(dict.signupSuccess);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected authentication error.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "azure") {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: authRedirectUrl,
          queryParams: provider === "google" ? { access_type: "offline", prompt: "consent" } : undefined,
          scopes: provider === "azure" ? "openid email profile offline_access" : undefined,
        },
      });

      if (oauthError) {
        throw oauthError;
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected authentication error.");
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError(dict.forgotPasswordMissingEmail);
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/${locale}/auth/callback?next=/${locale}/reset-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setMessage(dict.forgotPasswordSent);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unexpected authentication error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6b23c]">
            {dict.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">{dict.title}</h1>
          <p className="max-w-2xl text-base leading-7 text-white/72">{dict.description}</p>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "login"
                ? "bg-[#f6b23c] text-[#12141a]"
                : "border border-white/10 bg-white/[0.04] text-white/80"
            }`}
          >
            {dict.login}
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "signup"
                ? "bg-[#f6b23c] text-[#12141a]"
                : "border border-white/10 bg-white/[0.04] text-white/80"
            }`}
          >
            {dict.signup}
          </button>
        </div>

        <form onSubmit={handlePasswordAuth} className="mt-8 space-y-4">
          {mode === "signup" ? (
            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/76">{dict.fullName}</span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0d1017] px-4 py-3 text-white outline-none transition focus:border-[#f6b23c]/60"
                placeholder={dict.fullName}
              />
            </label>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/76">{dict.email}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0d1017] px-4 py-3 text-white outline-none transition focus:border-[#f6b23c]/60"
              placeholder="you@example.com"
            />
          </label>

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

          {mode === "login" ? (
            <button
              type="button"
              onClick={() => void handleForgotPassword()}
              disabled={loading || envMissing}
              className="text-left text-sm font-medium text-[#f6b23c] transition hover:text-[#ffd089] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {dict.forgotPassword}
            </button>
          ) : null}

          {envMissing ? (
            <div className="rounded-2xl border border-[#f37070]/30 bg-[#f37070]/10 px-4 py-3 text-sm text-[#ffd2d2]">
              {dict.missingEnv}
            </div>
          ) : null}

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
            disabled={loading || envMissing}
            className="w-full rounded-full bg-[#f6b23c] px-6 py-3 text-sm font-semibold text-[#12141a] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {mode === "login" ? dict.submitLogin : dict.submitSignup}
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            disabled={loading || envMissing}
            onClick={() => void handleOAuth("google")}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {dict.withGoogle}
          </button>
          <button
            type="button"
            disabled={loading || envMissing}
            onClick={() => void handleOAuth("azure")}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {dict.withMicrosoft}
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setMessage(null);
          }}
          className="mt-6 text-sm font-medium text-[#f6b23c] transition hover:text-[#ffd089]"
        >
          {mode === "login" ? dict.switchToSignup : dict.switchToLogin}
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <h2 className="text-2xl font-semibold text-white">{dict.supportLabel}</h2>
        <p className="mt-4 text-sm leading-7 text-white/72">{dict.supportBody}</p>
        <a
          href={`mailto:${supportEmail}`}
          className="mt-6 inline-flex rounded-full border border-[#f6b23c]/30 bg-[#f6b23c]/10 px-4 py-3 text-sm font-semibold text-[#f6b23c] transition hover:bg-[#f6b23c]/16"
        >
          {supportEmail}
        </a>

        <div className="mt-8 space-y-4 rounded-[1.5rem] border border-white/10 bg-[#0d1017] p-5">
          <h3 className="text-lg font-semibold text-white">
            {locale === "pt-br" ? "O que voce vai encontrar aqui" : "What you will find here"}
          </h3>
          <ul className="space-y-3 text-sm leading-7 text-white/72">
            <li>- {locale === "pt-br" ? "Plano atual e status da assinatura" : "Current plan and subscription status"}</li>
            <li>- {locale === "pt-br" ? "Creditos do plano e creditos extras" : "Plan credits and extra credits"}</li>
            <li>- {locale === "pt-br" ? "Proxima cobranca e dados da conta" : "Next billing date and account details"}</li>
            <li>- {locale === "pt-br" ? "Acoes de assinatura e compra de creditos" : "Subscription actions and credit purchases"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
