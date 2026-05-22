"use client";

import Image from "next/image";
import { useState } from "react";

import { ScreenshotGallery } from "@/components/screenshot-gallery";

type Locale = "pt-br" | "en";

type ProductLink = {
  label: string;
  href: string;
  pending?: boolean;
  primary?: boolean;
};

type ProductDetails = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
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

const productsByLocale: Record<Locale, ProductDetails[]> = {
  "pt-br": [
    {
      id: "calmia",
      name: "Calmia",
      tagline:
        "Assistente de terapia para registrar pensamentos disfuncionais, acompanhar humor e fortalecer o processo terapeutico com mais constancia.",
      summary:
        "O Calmia e um aplicativo mobile criado para apoiar a Terapia Cognitivo-Comportamental. Ele ajuda pacientes a registrarem pensamentos automaticos de forma estruturada e permite que terapeutas acompanhem melhor a evolucao entre as sessoes.",
      idealFor:
        "Ideal para pacientes que querem registrar o que sentem no dia a dia e para terapeutas que desejam enriquecer o acompanhamento com dados reais, organizados e compartilhados com consentimento.",
      patientTitle: "Para pacientes",
      patientBullets: [
        "Registro guiado passo a passo de situacoes, emocoes, pensamentos, evidencias e alternativas.",
        "Historico completo para acompanhar evolucao e padroes emocionais.",
        "Exportacao em PDF para levar aos atendimentos ou arquivar progresso.",
        "Bloqueio por biometria para proteger registros pessoais.",
      ],
      therapistTitle: "Para terapeutas",
      therapistBullets: [
        "Acesso aos registros compartilhados pelos pacientes de forma segura.",
        "Mais contexto entre as sessoes, com informacoes do cotidiano real.",
        "Codigo de vinculacao para conectar paciente e terapeuta com clareza.",
        "Visao mais rica da evolucao terapeutica ao longo do tempo.",
      ],
      privacy:
        "Privacidade vem primeiro. O Calmia foi pensado para dados sensiveis, com autenticacao segura, armazenamento local, compartilhamento opcional e alinhamento com a LGPD.",
      highlights: [
        "Registro de pensamentos disfuncionais em formato estruturado.",
        "Historico e analise para acompanhar evolucao emocional.",
        "Compartilhamento opcional com o terapeuta.",
        "Exportacao em PDF para consultas e acompanhamento.",
        "Biometria e seguranca para proteger dados pessoais.",
        "Suporte a multiplos idiomas.",
      ],
      links: [
        { label: "Ver site piloto", href: "https://renanbrognoli01.github.io/" },
        { label: "Apple Store", href: "#", pending: true },
        { label: "Play Store", href: "#", pending: true, primary: true },
      ],
      screenshots: [
        { src: "/media/calmia 1.png", title: "Tela principal do Calmia" },
        { src: "/media/calmia 2.png", title: "Fluxo de registro guiado" },
        { src: "/media/calmia 3.png", title: "Historico e acompanhamento" },
        { src: "/media/calmia 4.png", title: "Detalhes do registro" },
        { src: "/media/calmia 5.png", title: "Experiencia do aplicativo" },
      ],
      logo: "/media/calmia logo.jpeg",
    },
  ],
  en: [
    {
      id: "calmia",
      name: "Calmia",
      tagline:
        "A therapy companion built to record dysfunctional thoughts, track mood, and strengthen the therapeutic process with more consistency.",
      summary:
        "Calmia is a mobile application designed to support Cognitive Behavioral Therapy. It helps patients record automatic thoughts in a structured way and gives therapists better visibility between sessions.",
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
        { label: "View pilot website", href: "https://renanbrognoli01.github.io/" },
        { label: "Apple Store", href: "#", pending: true },
        { label: "Play Store", href: "#", pending: true, primary: true },
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
                <div className="relative h-16 w-16 overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#10141b]">
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
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-[#10141b] p-6">
              <Image src={selected.logo} alt={selected.name} fill className="object-contain p-8" />
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[#10141b] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                {isPt ? "Ideal para" : "Ideal for"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selected.idealFor}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {selected.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.pending ? undefined : "_blank"}
                  rel={link.pending ? undefined : "noreferrer"}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    link.pending
                      ? "border border-white/10 bg-white/[0.03] text-white/48"
                      : link.primary
                        ? "bg-[#f6b23c] text-[#151618] hover:scale-[1.02]"
                        : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {link.pending
                    ? `${link.label} ${isPt ? "(em breve)" : "(soon)"}`
                    : link.label}
                </a>
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
                  className="rounded-[1.4rem] border border-white/10 bg-[#10141b] p-4"
                >
                  <p className="text-sm leading-7 text-white/76">{item}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/10 bg-[#10141b] p-6">
                <h4 className="text-lg font-semibold text-white">{selected.patientTitle}</h4>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/74">
                  {selected.patientBullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-[#10141b] p-6">
                <h4 className="text-lg font-semibold text-white">{selected.therapistTitle}</h4>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/74">
                  {selected.therapistBullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[#10141b] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                {isPt ? "Privacidade e cuidado com dados" : "Privacy and data care"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selected.privacy}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8cc8ff]">
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
