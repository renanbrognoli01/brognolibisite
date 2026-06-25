"use client";

import Image from "next/image";
import { useState } from "react";

import { ScreenshotGallery } from "@/components/screenshot-gallery";

type Locale = "pt-br" | "en";

type ProductLink = {
  label: string;
  href: string;
  store?: "apple" | "google";
  pending?: boolean;
  primary?: boolean;
};

type ProductMetric = {
  value: string;
  label: string;
};

type ProductDetails = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  accent: string;
  metrics: ProductMetric[];
  idealFor: string;
  patientTitle: string;
  patientBullets: string[];
  therapistTitle: string;
  therapistBullets: string[];
  privacy: string;
  highlights: string[];
  links: ProductLink[];
  screenshots: { src: string; title: string }[];
  logo: string;
};

function AppleStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M16.67 12.46a4.74 4.74 0 0 1 2.26-3.98 5.1 5.1 0 0 0-4.02-2.18c-1.71-.18-3.33 1-4.2 1-.9 0-2.24-.98-3.69-.95A5.31 5.31 0 0 0 2.5 9.12c-1.94 3.36-.49 8.3 1.38 11.01.91 1.33 2 2.83 3.43 2.78 1.38-.05 1.9-.89 3.56-.89 1.66 0 2.13.89 3.59.86 1.49-.03 2.43-1.34 3.33-2.68 1.05-1.53 1.48-3.01 1.5-3.09-.03-.01-2.89-1.11-2.92-4.65ZM13.79 4.42A4.65 4.65 0 0 0 14.89 1a4.72 4.72 0 0 0-3.07 1.6 4.43 4.43 0 0 0-1.13 3.31 3.9 3.9 0 0 0 3.1-1.49Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path fill="#34A853" d="M3.62 2.26 13.9 12 3.62 21.74A2.1 2.1 0 0 1 3 20.19V3.81c0-.57.23-1.1.62-1.55Z" />
      <path fill="#4285F4" d="M16.52 14.49 6.16 24l10.36-5.7 3.45-1.9-3.45-1.91Z" transform="translate(-0.5 -2.26)" />
      <path fill="#FBBC04" d="m19.97 10.09-3.45-1.9L13.9 12l2.62 2.17 3.45-1.91c1.38-.76 1.38-1.42 0-2.17Z" />
      <path fill="#EA4335" d="M6.16 0 16.52 9.51 13.9 12 3.62 2.26c.62-.6 1.58-.7 2.54-.26Z" transform="translate(-0.5)" />
    </svg>
  );
}

function StoreBadge({ link, isPt }: { link: ProductLink; isPt: boolean }) {
  const overline =
    link.store === "google"
      ? isPt
        ? "Disponível no"
        : "Get it on"
      : isPt
        ? "Baixe na"
        : "Download on the";

  const Icon = link.store === "google" ? GooglePlayIcon : AppleStoreIcon;

  return (
    <a
      href={link.href}
      target={link.pending ? undefined : "_blank"}
      rel={link.pending ? undefined : "noreferrer"}
      className={`flex min-w-[11.5rem] items-center gap-3 rounded-[1.2rem] border px-4 py-3 transition ${
        link.pending
          ? "border-white/10 bg-white/[0.03] text-white/48"
          : link.primary
            ? "border-[var(--brand-amber)]/40 bg-[var(--brand-amber)] text-[#0F1D2A] hover:scale-[1.02] hover:shadow-[0_14px_30px_rgba(255,204,0,0.16)]"
            : "border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:border-white/20"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-[0.9rem] ${
          link.primary ? "bg-black/10" : "bg-white/10"
        }`}
      >
        <Icon />
      </div>
      <div className="min-w-0">
        <p
          className={`text-[0.62rem] uppercase tracking-[0.18em] ${
            link.primary ? "text-[#0F1D2A]/72" : "text-white/52"
          }`}
        >
          {overline}
        </p>
        <p className="text-sm font-semibold leading-tight">
          {link.pending ? `${link.label} ${isPt ? "(em breve)" : "(soon)"}` : link.label}
        </p>
      </div>
    </a>
  );
}

const productsByLocale: Record<Locale, ProductDetails[]> = {
  "pt-br": [
    {
      id: "calmia",
      name: "Calmia",
      tagline:
        "Um app de terapia pensado para transformar registros emocionais em acompanhamento prático, seguro e contínuo.",
      summary:
        "O Calmia é um aplicativo mobile criado para apoiar a Terapia Cognitivo-Comportamental. Ele ajuda pacientes a registrarem pensamentos automáticos de forma estruturada e permite que terapeutas acompanhem melhor a evolução entre as sessões.",
      accent: "from-[#93c5fd] via-[#7c8cff] to-[#6d5dfc]",
      metrics: [
        { value: "CBT", label: "base terapêutica" },
        { value: "PDF", label: "exportação rápida" },
        { value: "1:1", label: "paciente e terapeuta" },
      ],
      idealFor:
        "Ideal para pacientes que querem registrar o que sentem no dia a dia e para terapeutas que desejam enriquecer o acompanhamento com dados reais, organizados e compartilhados com consentimento.",
      patientTitle: "Para pacientes",
      patientBullets: [
        "Registro guiado passo a passo de situações, emoções, pensamentos, evidências e alternativas.",
        "Histórico completo para acompanhar evolução e padrões emocionais.",
        "Exportação em PDF para levar aos atendimentos ou arquivar progresso.",
        "Bloqueio por biometria para proteger registros pessoais.",
      ],
      therapistTitle: "Para terapeutas",
      therapistBullets: [
        "Acesso aos registros compartilhados pelos pacientes de forma segura.",
        "Mais contexto entre as sessões, com informações do cotidiano real.",
        "Código de vinculação para conectar paciente e terapeuta com clareza.",
        "Visão mais rica da evolução terapêutica ao longo do tempo.",
      ],
      privacy:
        "Privacidade vem primeiro. O Calmia foi pensado para dados sensíveis, com autenticação segura, armazenamento local, compartilhamento opcional e alinhamento com a LGPD.",
      highlights: [
        "Registro de pensamentos disfuncionais em formato estruturado.",
        "Histórico e análise para acompanhar evolução emocional.",
        "Compartilhamento opcional com o terapeuta.",
        "Exportação em PDF para consultas e acompanhamento.",
        "Biometria e segurança para proteger dados pessoais.",
        "Suporte a múltiplos idiomas.",
      ],
      links: [
        {
          label: "Apple Store",
          href: "https://apps.apple.com/us/app/calmia-assistente-de-terapia/id6781356385",
          store: "apple",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.rpdapp.app&pcampaignid=web_share",
          store: "google",
          primary: true,
        },
      ],
      screenshots: [
        { src: "/media/calmia 1.png", title: "Tela principal do Calmia" },
        { src: "/media/calmia 2.png", title: "Fluxo de registro guiado" },
        { src: "/media/calmia 3.png", title: "Histórico e acompanhamento" },
        { src: "/media/calmia 4.png", title: "Detalhes do registro" },
        { src: "/media/calmia 5.png", title: "Experiência do aplicativo" },
      ],
      logo: "/media/calmia logo.jpeg",
    },
  ],
  en: [
    {
      id: "calmia",
      name: "Calmia",
      tagline:
        "A therapy app designed to turn emotional records into practical, secure, and continuous follow-up.",
      summary:
        "Calmia is a mobile application designed to support Cognitive Behavioral Therapy. It helps patients record automatic thoughts in a structured way and gives therapists better visibility between sessions.",
      accent: "from-[#93c5fd] via-[#7c8cff] to-[#6d5dfc]",
      metrics: [
        { value: "CBT", label: "therapy foundation" },
        { value: "PDF", label: "fast export" },
        { value: "1:1", label: "patient and therapist" },
      ],
      idealFor:
        "Ideal for patients who want to capture what they feel in real life and for therapists who want richer follow-up based on organized, consent-based data sharing.",
      patientTitle: "For patients",
      patientBullets: [
        "Step-by-step guided records for situations, emotions, automatic thoughts, evidence, and alternatives.",
        "Full history to track progress and emotional patterns over time.",
        "PDF export for therapy sessions and personal progress archives.",
        "Biometric protection to keep personal records secure.",
      ],
      therapistTitle: "For therapists",
      therapistBullets: [
        "Secure access to records shared by patients.",
        "Better context between sessions with real day-to-day data.",
        "A linking code system to connect therapist and patient clearly.",
        "A richer view of therapeutic progress over time.",
      ],
      privacy:
        "Privacy comes first. Calmia was designed for sensitive health-related data, with secure authentication, local storage, optional sharing, and LGPD/GDPR-aligned care.",
      highlights: [
        "Structured dysfunctional thought records.",
        "History and analysis to follow emotional progress.",
        "Optional therapist sharing.",
        "PDF export for sessions and follow-up.",
        "Biometric protection and stronger privacy.",
        "Multiple language support.",
      ],
      links: [
        {
          label: "Apple Store",
          href: "https://apps.apple.com/us/app/calmia-assistente-de-terapia/id6781356385",
          store: "apple",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.rpdapp.app&pcampaignid=web_share",
          store: "google",
          primary: true,
        },
      ],
      screenshots: [
        { src: "/media/calmia 1.png", title: "Calmia home screen" },
        { src: "/media/calmia 2.png", title: "Guided record flow" },
        { src: "/media/calmia 3.png", title: "History and tracking" },
        { src: "/media/calmia 4.png", title: "Record details" },
        { src: "/media/calmia 5.png", title: "App experience" },
      ],
      logo: "/media/calmia logo.jpeg",
    },
  ],
};

export function ProductShowcase({ locale }: { locale: Locale }) {
  const products = productsByLocale[locale];
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const selected = products.find((item) => item.id === selectedId) ?? products[0];
  const isPt = locale === "pt-br";

  if (!selected) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const active = product.id === selectedId;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelectedId(product.id)}
              className={`rounded-[1.8rem] border p-5 text-left transition ${
                active
                  ? "border-white/25 bg-white/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.2)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-[1.15rem] border border-white/10 bg-white">
                  <Image src={product.logo} alt={product.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    {isPt ? "Produto" : "Product"}
                  </p>
                  <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/68">{product.tagline}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[var(--surface-2)] p-5">
              <div className={`rounded-[1.9rem] bg-gradient-to-br ${selected.accent} p-[1px]`}>
                <div className="rounded-[1.85rem] bg-[var(--surface-1)] p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-[1rem] bg-white">
                      <Image
                        src={selected.logo}
                        alt={selected.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/42">
                        {isPt ? "App mobile" : "Mobile app"}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{selected.name}</h3>
                    </div>
                  </div>

                  <div className="relative mx-auto mt-5 w-full max-w-[21rem] overflow-hidden rounded-[2.7rem] border border-white/10 bg-[#061521] p-2 shadow-[0_28px_60px_rgba(0,0,0,0.36)]">
                    <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/12" />
                    <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem]">
                      <Image
                        src={selected.screenshots[0]?.src ?? selected.logo}
                        alt={selected.screenshots[0]?.title ?? selected.name}
                        fill
                        className="object-contain bg-white"
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {selected.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
                      >
                        <p className="text-lg font-semibold text-white">{metric.value}</p>
                        <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/45">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[var(--surface-2)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                {isPt ? "Ideal para" : "Ideal for"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selected.idealFor}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {selected.links.map((link) => (
                <StoreBadge key={link.label} link={link} isPt={isPt} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold tracking-tight text-white">{selected.name}</h3>
              <p className="text-lg leading-8 text-white/82">{selected.tagline}</p>
              <p className="text-base leading-7 text-white/68">{selected.summary}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {selected.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-white/10 bg-[var(--surface-2)] p-4"
                >
                  <div className="mb-3 h-2 w-12 rounded-full bg-white/12" />
                  <p className="text-sm leading-7 text-white/76">{item}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/10 bg-[var(--surface-2)] p-6">
                <h4 className="text-lg font-semibold text-white">{selected.patientTitle}</h4>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-white/74 marker:text-white/40">
                  {selected.patientBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-[var(--surface-2)] p-6">
                <h4 className="text-lg font-semibold text-white">{selected.therapistTitle}</h4>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-white/74 marker:text-white/40">
                  {selected.therapistBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[var(--surface-2)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                {isPt ? "Privacidade e cuidado com dados" : "Privacy and data care"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selected.privacy}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">
                  {isPt ? "Prova visual" : "Product preview"}
                </p>
                <h4 className="text-2xl font-semibold text-white">
                  {isPt
                    ? "Veja o produto em uso nas telas do app"
                    : "See the product through real app screens"}
                </h4>
              </div>
              <ScreenshotGallery items={selected.screenshots} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
