"use client";

import { useState } from "react";

import { getSupabaseBrowserClient, getSupabaseBrowserConfig } from "@/lib/supabase-browser";

type Locale = "pt-br" | "en";
type PrivacyAction = "export" | "request_deletion";

type PrivacyResponse = {
  error?: string;
  requestId?: string;
  status?: string;
};

const copy = {
  "pt-br": {
    title: "Seus dados pessoais",
    description:
      "Baixe uma cópia dos dados associados à sua conta ou registre um pedido de exclusão para análise da equipe.",
    export: "Baixar meus dados",
    requestDeletion: "Solicitar exclusão da conta",
    exportNote:
      "O arquivo inclui dados da conta, assinatura, créditos, dispositivos, uso do Studio e histórico de aceite da política. Chaves de API, arquivos e configurações que existem apenas no seu dispositivo não são incluídos.",
    deletionNote:
      "O pedido não apaga seus dados nem cancela uma assinatura automaticamente. A equipe revisará o pedido e poderá manter registros exigidos para cobrança, prevenção a fraude ou obrigações legais.",
    confirm:
      "Entendo que este pedido será revisado e que preciso cancelar minha assinatura separadamente, se aplicável.",
    confirmPrompt:
      "Registrar um pedido de exclusão para análise? Isso não apaga os dados imediatamente nem cancela sua assinatura.",
    exportSuccess: "Seu arquivo de dados foi baixado.",
    deletionSuccess: "Pedido registrado para análise. Número do pedido:",
    error: "Não foi possível concluir. Tente novamente mais tarde.",
    sessionError: "Sua sessão expirou. Entre novamente e tente outra vez.",
    limitError: "Você atingiu o limite de solicitações. Tente novamente mais tarde.",
    unavailableError: "O serviço está temporariamente indisponível. Tente novamente mais tarde.",
    tooLargeError: "O arquivo excede o limite para download pelo site.",
    processing: "Processando...",
  },
  en: {
    title: "Your personal data",
    description:
      "Download a copy of the data associated with your account or submit a deletion request for staff review.",
    export: "Download my data",
    requestDeletion: "Request account deletion",
    exportNote:
      "The file includes account, subscription, credit, device, Studio usage, and privacy-policy acceptance data. API key values, files, and settings stored only on your device are not included.",
    deletionNote:
      "The request does not immediately erase data or automatically cancel a subscription. Staff will review it and may retain records required for billing, fraud prevention, or legal obligations.",
    confirm:
      "I understand this request will be reviewed and I must cancel my subscription separately, if applicable.",
    confirmPrompt:
      "Submit an account deletion request for review? This will not immediately erase data or cancel your subscription.",
    exportSuccess: "Your data export has been downloaded.",
    deletionSuccess: "Request submitted for review. Request ID:",
    error: "We could not complete this request. Please try again later.",
    sessionError: "Your session has expired. Sign in again and retry.",
    limitError: "You have reached the request limit. Please try again later.",
    unavailableError: "The service is temporarily unavailable. Please try again later.",
    tooLargeError: "The file exceeds the website download limit.",
    processing: "Processing...",
  },
} satisfies Record<Locale, Record<string, string>>;

export function PrivacyDataControls({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [busy, setBusy] = useState<PrivacyAction | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(action: PrivacyAction) {
    setBusy(action);
    setError(null);
    setNotice(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { supabaseUrl, publishableKey } = getSupabaseBrowserConfig();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token || !supabaseUrl || !publishableKey) {
        throw new Error("Missing authenticated session or service configuration");
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/privacy-data-request`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: publishableKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
        cache: "no-store",
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error("session");
        if (response.status === 429) throw new Error("limit");
        if (response.status === 503) throw new Error("unavailable");
        if (response.status === 413) throw new Error("too-large");
        throw new Error("request");
      }

      if (action === "export") {
        const file = await response.blob();
        const objectUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "brognoli-data-export.json";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
        setNotice(text.exportSuccess);
        return;
      }

      const result = (await response.json()) as PrivacyResponse;
      if (!result.requestId) {
        throw new Error("Missing privacy request identifier");
      }

      setConfirmed(false);
      setNotice(`${text.deletionSuccess} ${result.requestId}`);
    } catch (cause) {
      const reason = cause instanceof Error ? cause.message : "request";
      setError(
        reason === "session"
          ? text.sessionError
          : reason === "limit"
            ? text.limitError
            : reason === "unavailable"
              ? text.unavailableError
              : reason === "too-large"
                ? text.tooLargeError
                : text.error,
      );
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
      <h2 className="text-2xl font-semibold text-white">{text.title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-white/72">{text.description}</p>
      <p className="mt-3 max-w-4xl text-xs leading-6 text-white/55">{text.exportNote}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void submit("export")}
          className="rounded-full bg-[var(--brand-amber)] px-5 py-3 text-sm font-semibold text-[#0F1D2A] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy === "export" ? text.processing : text.export}
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-[color:rgba(243,112,112,0.24)] bg-[color:rgba(243,112,112,0.06)] p-5">
        <h3 className="text-lg font-semibold text-white">{text.requestDeletion}</h3>
        <p className="mt-2 text-sm leading-6 text-white/72">{text.deletionNote}</p>
        <label className="mt-4 flex max-w-4xl cursor-pointer items-start gap-3 text-sm leading-6 text-white/72">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.currentTarget.checked)}
            className="mt-1 accent-[var(--brand-amber)]"
          />
          <span>{text.confirm}</span>
        </label>
        <button
          type="button"
          disabled={!confirmed || busy !== null}
          onClick={() => {
            if (confirmed && window.confirm(text.confirmPrompt)) {
              void submit("request_deletion");
            }
          }}
          className="mt-4 rounded-full border border-[color:rgba(243,112,112,0.36)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:rgba(243,112,112,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy === "request_deletion" ? text.processing : text.requestDeletion}
        </button>
      </div>

      {notice ? (
        <p role="status" className="mt-4 rounded-xl border border-[color:rgba(0,178,169,0.3)] bg-[color:rgba(0,178,169,0.1)] px-4 py-3 text-sm text-[var(--success-soft)]">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-4 rounded-xl border border-[color:rgba(243,112,112,0.3)] bg-[color:rgba(243,112,112,0.1)] px-4 py-3 text-sm text-[var(--danger-soft)]">
          {error}
        </p>
      ) : null}
    </section>
  );
}
