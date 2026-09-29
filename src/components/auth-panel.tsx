"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";

import { privacyConsentSessionKey, privacyPolicyVersion } from "@/lib/privacy";
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
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dict = useMemo(
    () =>
      locale === "pt-br"
        ? {
            eyebrow: "Área do assinante",
            title: "Entre para acessar sua conta do BROGNOLI Studio",
            description:
              "Use e-mail e senha, Google ou Microsoft para acompanhar sua assinatura, seus créditos e suas próximas cobranças.",
            login: "Entrar",
            signup: "Criar conta",
            email: "E-mail",
            password: "Senha",
            fullName: "Nome completo",
            namePurpose: "O nome é exibido no perfil da conta e pode ser usado no atendimento.",
            emailPurpose: "Usamos o e-mail para autenticar sua conta, administrar assinatura e créditos e enviar comunicações operacionais e de suporte. A senha é tratada pelo serviço de autenticação do Supabase.",
            privacyAcceptance: "Li e aceito a Política de Privacidade (versão 2026-09-28).",
            privacyRequired: "Leia e aceite a Política de Privacidade para criar uma conta ou continuar com Google/Microsoft.",
            submitLogin: "Entrar na conta",
            submitSignup: "Criar conta",
            forgotPassword: "Esqueci minha senha",
            forgotPasswordSent:
              "Enviamos um e-mail de redefinição de senha. Verifique sua caixa de entrada e siga o link para criar uma nova senha.",
            forgotPasswordMissingEmail: "Informe seu e-mail antes de pedir a redefinição de senha.",
            withGoogle: "Continuar com Google",
            withMicrosoft: "Continuar com Microsoft",
            switchToSignup: "Ainda não tem conta? Criar acesso",
            switchToLogin: "Já tem conta? Fazer login",
            signupSuccess:
              "Conta criada. Verifique seu e-mail para confirmar o acesso antes de continuar.",
            supportLabel: "Suporte ao assinante",
            supportBody:
              "Se precisar de ajuda com acesso, assinatura ou cobrança, fale com nosso suporte.",
            missingEnv:
              "As variáveis públicas do Supabase ainda não foram configuradas neste site.",
            authError: "Não foi possível concluir a autenticação. Confira os dados e tente novamente.",
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
            namePurpose: "Your name appears on your account profile and may be used for support.",
            emailPurpose: "We use your email to authenticate your account, manage your subscription and credits, and send operational and support communications. Your password is handled by Supabase Auth.",
            privacyAcceptance: "I have read and accept the Privacy Policy (version 2026-09-28).",
            privacyRequired: "Read and accept the Privacy Policy to create an account or continue with Google/Microsoft.",
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
            authError: "We could not complete authentication. Check your details and try again.",
          },
    [locale],
  );

  const { supabaseUrl, publishableKey } = getSupabaseBrowserConfig();
  const envMissing = !supabaseUrl || !publishableKey;
  const authRedirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/auth/callback?next=/${locale}/account`
      : undefined;
  const oauthRedirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/auth/callback`
      : undefined;

  async function handlePasswordAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === "signup" && !privacyAccepted) {
      setError(dict.privacyRequired);
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();

      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim().toLocaleLowerCase(),
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
        email: email.trim().toLocaleLowerCase(),
        password,
        options: {
          emailRedirectTo: authRedirectUrl,
          data: {
            full_name: fullName.trim(),
            privacy_policy_version: privacyPolicyVersion,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      setMessage(dict.signupSuccess);
    } catch {
      setError(dict.authError);
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "azure") {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!privacyAccepted) {
      setError(dict.privacyRequired);
      setLoading(false);
      return;
    }

    try {
      window.sessionStorage.setItem(privacyConsentSessionKey, privacyPolicyVersion);
      const supabase = getSupabaseBrowserClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: oauthRedirectUrl,
          scopes: provider === "azure" ? "email" : undefined,
        },
      });

      if (oauthError) {
        throw oauthError;
      }
    } catch {
      window.sessionStorage.removeItem(privacyConsentSessionKey);
      setError(dict.authError);
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
        redirectTo: `${window.location.origin}/${locale}/reset-password`,
      });

      if (resetError) {
        throw resetError;
      }

      setMessage(dict.forgotPasswordSent);
    } catch {
      setError(dict.authError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-amber)]">
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
                ? "bg-[var(--brand-amber)] text-[#0F1D2A]"
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
                ? "bg-[var(--brand-amber)] text-[#0F1D2A]"
                : "border border-white/10 bg-white/[0.04] text-white/80"
            }`}
          >
            {dict.signup}
          </button>
        </div>

        <form onSubmit={handlePasswordAuth} className="mt-8 space-y-4">
          {mode === "signup" ? (
            <>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/76">{dict.fullName}</span>
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value.slice(0, 120))}
                  autoComplete="name"
                  maxLength={120}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[var(--surface-1)] px-4 py-3 text-white outline-none transition focus:border-[color:rgba(255,204,0,0.6)]"
                  placeholder={dict.fullName}
                />
                <span className="block text-xs leading-5 text-white/60">{dict.namePurpose}</span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-6 text-white/80">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(event) => setPrivacyAccepted(event.target.checked)}
                  required
                  className="mt-1 accent-[var(--brand-amber)]"
                />
                <span id="oauth-privacy-notice">
                  {dict.privacyAcceptance}{" "}
                  <Link href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="text-[var(--brand-amber)] underline">
                    {locale === "pt-br" ? "Ler política" : "Read policy"}
                  </Link>
                </span>
              </label>
            </>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/76">{dict.email}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              maxLength={254}
              required
              className="w-full rounded-2xl border border-white/10 bg-[var(--surface-1)] px-4 py-3 text-white outline-none transition focus:border-[color:rgba(255,204,0,0.6)]"
              placeholder="you@example.com"
            />
            <span className="block text-xs leading-5 text-white/60">{dict.emailPurpose}</span>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/76">{dict.password}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={mode === "signup" ? 8 : undefined}
              maxLength={128}
              required
              className="w-full rounded-2xl border border-white/10 bg-[var(--surface-1)] px-4 py-3 text-white outline-none transition focus:border-[color:rgba(255,204,0,0.6)]"
              placeholder="********"
            />
          </label>

          {mode === "login" ? (
            <button
              type="button"
              onClick={() => void handleForgotPassword()}
              disabled={loading || envMissing}
              className="text-left text-sm font-medium text-[var(--brand-amber)] transition hover:text-[#FFE066] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {dict.forgotPassword}
            </button>
          ) : null}

          {envMissing ? (
            <div className="rounded-2xl border border-[color:rgba(243,112,112,0.3)] bg-[color:rgba(243,112,112,0.1)] px-4 py-3 text-sm text-[var(--danger-soft)]">
              {dict.missingEnv}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-[color:rgba(243,112,112,0.3)] bg-[color:rgba(243,112,112,0.1)] px-4 py-3 text-sm text-[var(--danger-soft)]">
              {error}
            </div>
          ) : null}

          {message ? (
            <div className="rounded-2xl border border-[color:rgba(0,178,169,0.3)] bg-[color:rgba(0,178,169,0.1)] px-4 py-3 text-sm text-[var(--success-soft)]">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || envMissing}
            className="w-full rounded-full bg-[var(--brand-amber)] px-6 py-3 text-sm font-semibold text-[#0F1D2A] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {mode === "login" ? dict.submitLogin : dict.submitSignup}
          </button>
        </form>

        <div className="mt-6 grid gap-3">
          {mode === "login" ? (
            <label className="flex items-start gap-3 text-sm leading-6 text-white/80">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
                className="mt-1 accent-[var(--brand-amber)]"
              />
              <span id="oauth-privacy-notice">
                {dict.privacyAcceptance}{" "}
                  <Link href={`/${locale}/privacy`} target="_blank" rel="noreferrer" className="text-[var(--brand-amber)] underline">
                  {locale === "pt-br" ? "Ler política" : "Read policy"}
                </Link>
              </span>
            </label>
          ) : null}
          <button
            type="button"
            aria-describedby="oauth-privacy-notice"
            disabled={loading || envMissing}
            onClick={() => void handleOAuth("google")}
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {dict.withGoogle}
          </button>
          <button
            type="button"
            aria-describedby="oauth-privacy-notice"
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
          className="mt-6 text-sm font-medium text-[var(--brand-amber)] transition hover:text-[#FFE066]"
        >
          {mode === "login" ? dict.switchToSignup : dict.switchToLogin}
        </button>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <h2 className="text-2xl font-semibold text-white">{dict.supportLabel}</h2>
        <p className="mt-4 text-sm leading-7 text-white/72">{dict.supportBody}</p>
        <a
          href={`mailto:${supportEmail}`}
          className="mt-6 inline-flex rounded-full border border-[color:rgba(255,204,0,0.3)] bg-[color:rgba(255,204,0,0.1)] px-4 py-3 text-sm font-semibold text-[var(--brand-amber)] transition hover:bg-[color:rgba(255,204,0,0.16)]"
        >
          {supportEmail}
        </a>

        <div className="mt-8 space-y-4 rounded-[1.5rem] border border-white/10 bg-[var(--surface-1)] p-5">
            <h3 className="text-lg font-semibold text-white">
            {locale === "pt-br" ? "O que você vai encontrar aqui" : "What you will find here"}
          </h3>
          <ul className="space-y-3 text-sm leading-7 text-white/72">
            <li>- {locale === "pt-br" ? "Plano atual e status da assinatura" : "Current plan and subscription status"}</li>
            <li>- {locale === "pt-br" ? "Créditos do plano e créditos extras" : "Plan credits and extra credits"}</li>
            <li>- {locale === "pt-br" ? "Próxima cobrança e dados da conta" : "Next billing date and account details"}</li>
            <li>- {locale === "pt-br" ? "Ações de assinatura e compra de créditos" : "Subscription actions and credit purchases"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
