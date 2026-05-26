"use client";

import { useMemo, useState } from "react";

type Locale = "pt-br" | "en";

type GuideEntry = {
  language: string;
  buyLink: string;
  salesPage?: string;
};

type GuideDetails = {
  id: string;
  label: string;
  hero: string;
  subhero: string;
  overview: string;
  highlights: string[];
  idealFor: string;
  access: string;
  guarantee: string;
  payment: string;
};

const guideDetailsByLocale: Record<Locale, GuideDetails[]> = {
  "pt-br": [
    {
      id: "excel-pt",
      label: "Excel Essencial",
      hero: "Excel Essencial",
      subhero:
        "Aprenda a maximizar sua produtividade, desde as operações básicas até técnicas avançadas e automação.",
      overview:
        "Este guia foi pensado para ajudar você a dominar o Excel de A a Z. O foco é sair da teoria solta e entregar um material direto, com explicações claras, exemplos reais e aplicação imediata.",
      highlights: [
        "Domine o Excel do básico ao avançado com uma trilha completa e objetiva.",
        "Receba orientações práticas de um profissional certificado em Excel e análise de dados.",
        "Aprenda atalhos e recursos que ajudam você a trabalhar com mais rapidez e precisão.",
        "Aplique o conteúdo imediatamente em trabalho, estudos e rotinas reais.",
      ],
      idealFor:
        "Indicado tanto para quem está começando agora quanto para quem quer mais segurança, organização e produtividade com o Excel.",
      access: "Acesso vitalício ao material.",
      guarantee: "Garantia de 7 dias com possibilidade de reembolso.",
      payment: "Pagamento pela Hotmart com cartão, Pix e demais formas aceitas na plataforma.",
    },
    {
      id: "excel-en",
      label: "Excel Essentials",
      hero: "Excel Essentials",
      subhero:
        "Learn to maximize your productivity, from basic operations to advanced techniques and automation.",
      overview:
        "A practical ebook designed to help you master Excel from A to Z. Instead of scattered learning, you get direct explanations, real examples, and a structure built for immediate use.",
      highlights: [
        "Master Excel from beginner to advanced with a clear and practical learning path.",
        "Get detailed guidance from a certified Excel and data analysis professional.",
        "Learn shortcuts and techniques that improve speed, structure, and accuracy.",
        "Apply what you learn immediately in real work and study scenarios.",
      ],
      idealFor:
        "Recommended for both beginners and more experienced users who want more confidence and productivity with Excel.",
      access: "Lifetime access to the material.",
      guarantee: "7-day refund guarantee.",
      payment: "Payment is handled by Hotmart using the methods available on the platform.",
    },
    {
      id: "powerbi-pt",
      label: "Power BI Descomplicado",
      hero: "Power BI Descomplicado",
      subhero:
        "Aprenda do zero ao avançado, criando relatórios interativos, modelando dados com precisão e publicando insights com mais facilidade.",
      overview:
        "Um ebook criado para transformar dados brutos em insights valiosos. Ele guia você pelos fundamentos do Power BI e avança para modelagem, visualizações e DAX com exemplos práticos.",
      highlights: [
        "Domine uma das ferramentas de análise de dados mais poderosas do mercado.",
        "Aprenda a criar relatórios interativos e visualizações mais impactantes.",
        "Veja aplicação prática desde a instalação até técnicas avançadas de DAX.",
        "Evolua com um material que vai do básico ao avançado sem dispersão.",
      ],
      idealFor:
        "Recomendado para quem está começando agora e também para quem quer estruturar melhor dashboards e análises no Power BI.",
      access: "Acesso vitalício ao material.",
      guarantee: "Garantia de 7 dias com possibilidade de reembolso.",
      payment: "Pagamento pela Hotmart com cartão, Pix e demais formas aceitas na plataforma.",
    },
    {
      id: "powerbi-en",
      label: "Power BI Simplified",
      hero: "Power BI Simplified",
      subhero:
        "Learn from zero to advanced by building interactive reports, modeling data precisely, and publishing powerful insights with ease.",
      overview:
        "A practical ebook designed to help you turn raw data into valuable insights. It guides you through Power BI fundamentals and moves into modeling, visualization, and DAX with real examples.",
      highlights: [
        "Master one of the most powerful analytics tools on the market from the ground up.",
        "Create clearer reports and more impactful visualizations with practical guidance.",
        "Apply the content immediately, from installation to advanced DAX techniques.",
        "Follow a complete path from beginner to advanced without scattered learning.",
      ],
      idealFor:
        "Recommended for beginners and for professionals who want a clearer and more structured way to improve Power BI delivery.",
      access: "Lifetime access to the material.",
      guarantee: "7-day refund guarantee.",
      payment: "Payment is handled by Hotmart using the methods available on the platform.",
    },
  ],
  en: [
    {
      id: "excel-pt",
      label: "Excel Essencial (PT-BR)",
      hero: "Excel Essencial",
      subhero:
        "Learn to maximize your productivity, from basic operations to advanced techniques and automation.",
      overview:
        "This Portuguese guide was built to help you master Excel from A to Z with direct explanations, real examples, and a structure designed for immediate application.",
      highlights: [
        "A clear path from beginner to advanced Excel usage.",
        "Practical guidance from a certified Excel and data analysis professional.",
        "Shortcuts and techniques that improve speed and accuracy.",
        "Real examples you can apply right away.",
      ],
      idealFor:
        "Ideal for Portuguese-speaking learners who want more confidence and productivity with Excel.",
      access: "Lifetime access to the material.",
      guarantee: "7-day refund guarantee.",
      payment: "Payment is handled by Hotmart using the methods available on the platform.",
    },
    {
      id: "excel-en",
      label: "Excel Essentials",
      hero: "Excel Essentials",
      subhero:
        "Learn to maximize your productivity, from basic operations to advanced techniques and automation.",
      overview:
        "A practical ebook designed to help you master Excel from A to Z. Instead of scattered learning, you get direct explanations, real examples, and a structure built for immediate use.",
      highlights: [
        "Master Excel from beginner to advanced with a clear and practical learning path.",
        "Get detailed guidance from a certified Excel and data analysis professional.",
        "Learn shortcuts and techniques that improve speed, structure, and accuracy.",
        "Apply what you learn immediately in real work and study scenarios.",
      ],
      idealFor:
        "Recommended for both beginners and more experienced users who want more confidence and productivity with Excel.",
      access: "Lifetime access to the material.",
      guarantee: "7-day refund guarantee.",
      payment: "Payment is handled by Hotmart using the methods available on the platform.",
    },
    {
      id: "powerbi-pt",
      label: "Power BI Descomplicado (PT-BR)",
      hero: "Power BI Descomplicado",
      subhero:
        "Learn from zero to advanced by building interactive reports, modeling data precisely, and publishing insights more easily.",
      overview:
        "This Portuguese guide helps you turn raw data into valuable insights while learning the Power BI fundamentals, then moving into modeling, visualizations, and DAX with practical examples.",
      highlights: [
        "A complete path from basic Power BI usage to advanced DAX concepts.",
        "Practical guidance to build better reports and visuals.",
        "Real applications you can use immediately.",
        "A more focused learning path without scattered content.",
      ],
      idealFor:
        "Ideal for Portuguese-speaking learners who want a more structured way to grow with Power BI.",
      access: "Lifetime access to the material.",
      guarantee: "7-day refund guarantee.",
      payment: "Payment is handled by Hotmart using the methods available on the platform.",
    },
    {
      id: "powerbi-en",
      label: "Power BI Simplified",
      hero: "Power BI Simplified",
      subhero:
        "Learn from zero to advanced by building interactive reports, modeling data precisely, and publishing powerful insights with ease.",
      overview:
        "A practical ebook designed to help you turn raw data into valuable insights. It guides you through Power BI fundamentals and moves into modeling, visualization, and DAX with real examples.",
      highlights: [
        "Master one of the most powerful analytics tools on the market from the ground up.",
        "Create clearer reports and more impactful visualizations with practical guidance.",
        "Apply the content immediately, from installation to advanced DAX techniques.",
        "Follow a complete path from beginner to advanced without scattered learning.",
      ],
      idealFor:
        "Recommended for beginners and for professionals who want a clearer and more structured way to improve Power BI delivery.",
      access: "Lifetime access to the material.",
      guarantee: "7-day refund guarantee.",
      payment: "Payment is handled by Hotmart using the methods available on the platform.",
    },
  ],
};

export function GuideShowcase({
  locale,
  groups,
}: {
  locale: Locale;
  groups: {
    title: string;
    accent: "powerbi" | "excel";
    entries: GuideEntry[];
  }[];
}) {
  const details = guideDetailsByLocale[locale];
  const normalizedGroups = groups.map((group) => ({
    ...group,
    entries: group.entries.map((entry) => ({
      ...entry,
      id: `${group.accent}-${entry.language.toLowerCase().includes("english") ? "en" : "pt"}`,
      category: group.accent,
      groupTitle: group.title,
    })),
  }));
  const flattenedEntries = normalizedGroups.flatMap((group) => group.entries);
  const [selectedId, setSelectedId] = useState(flattenedEntries[0]?.id ?? details[0]?.id ?? "");

  const selectedEntry = useMemo(
    () => flattenedEntries.find((entry) => entry.id === selectedId) ?? flattenedEntries[0],
    [flattenedEntries, selectedId],
  );
  const selectedDetails = useMemo(
    () => details.find((entry) => entry.id === selectedId) ?? details[0],
    [details, selectedId],
  );

  if (!selectedEntry || !selectedDetails) {
    return null;
  }

  const isPt = locale === "pt-br";
  const accentClass =
    selectedEntry.category === "excel"
      ? "border-[#13766e]/35 bg-[#13766e]/10 text-[#8ce0d9]"
      : "border-[#f6b23c]/35 bg-[#f6b23c]/10 text-[#f6b23c]";
  const accentButtonClass =
    selectedEntry.category === "excel"
      ? "bg-[#13766e] text-white"
      : "bg-[#f6b23c] text-[#151618]";

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {normalizedGroups.map((group) => (
          <div
            key={group.title}
            id={group.accent === "excel" ? "excel" : "powerbi"}
            className={`rounded-[2rem] border p-6 ${
              group.accent === "excel"
                ? "border-[#13766e]/35 bg-[#13766e]/10"
                : "border-[#f6b23c]/30 bg-[#f6b23c]/10"
            }`}
          >
            <h2 className="text-2xl font-semibold text-white">{group.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/72">
              {group.accent === "excel"
                ? isPt
                  ? "Escolha a versão do material e veja abaixo exatamente o que você vai aprender, para quem ele é indicado e como funciona a compra."
                  : "Choose the guide version and see below exactly what you will learn, who it is for, and how the purchase works."
                : isPt
                  ? "Selecione a versão do guia e confira abaixo os principais benefícios, público ideal e detalhes da entrega."
                  : "Select the guide version and review the key benefits, ideal audience, and delivery details below."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {group.entries.map((entry) => {
                const active = entry.id === selectedId;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedId(entry.id)}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                      active
                        ? "border-white/25 bg-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                        : "border-white/10 bg-[#11151d]/75 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-white/46">
                          {entry.language}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {details.find((detail) => detail.id === entry.id)?.hero ?? entry.language}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
                          group.accent === "excel"
                            ? "border-[#13766e]/40 text-[#8ce0d9]"
                            : "border-[#f6b23c]/40 text-[#f6b23c]"
                        }`}
                      >
                        {group.accent === "excel" ? "Excel" : "Power BI"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>
            {selectedEntry.category === "excel" ? "Excel" : "Power BI"}
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            {selectedEntry.language}
          </span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-semibold tracking-tight text-white">
                {selectedDetails.hero}
              </h3>
              <p className="text-lg leading-8 text-white/82">{selectedDetails.subhero}</p>
              <p className="text-base leading-7 text-white/68">{selectedDetails.overview}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {selectedDetails.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-white/10 bg-[#0f131a] p-4"
                >
                  <p className="text-sm leading-7 text-white/78">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[1.8rem] border border-white/10 bg-[#0f131a] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                {isPt ? "Para quem é" : "Ideal for"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selectedDetails.idealFor}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                {isPt ? "Acesso" : "Access"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selectedDetails.access}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                {isPt ? "Garantia" : "Guarantee"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selectedDetails.guarantee}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                {isPt ? "Pagamento" : "Payment"}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">{selectedDetails.payment}</p>
            </div>
            <a
              className={`mt-2 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.01] ${accentButtonClass}`}
              href={selectedEntry.buyLink}
              target="_blank"
              rel="noreferrer"
            >
              {isPt ? "Comprar agora" : "Buy now"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
