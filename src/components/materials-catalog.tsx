"use client";

import { useMemo, useState } from "react";

import type { MaterialItem, MaterialsResult } from "@/lib/materials";

type Locale = "pt-br" | "en";

function formatBytes(value: number | null, locale: Locale) {
  if (!value || value <= 0) {
    return null;
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const amount = value / 1024 ** unitIndex;

  return `${new Intl.NumberFormat(locale === "pt-br" ? "pt-BR" : "en-US", {
    maximumFractionDigits: amount >= 10 || unitIndex === 0 ? 0 : 1,
  }).format(amount)} ${units[unitIndex]}`;
}

function formatDate(value: string, locale: Locale) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale === "pt-br" ? "pt-BR" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MaterialCard({ item, locale }: { item: MaterialItem; locale: Locale }) {
  const isPt = locale === "pt-br";
  const size = formatBytes(item.fileSizeBytes, locale);
  const date = formatDate(item.publishedAt, locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
      <div className="relative aspect-[16/8.8] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(0,178,169,0.28),_transparent_42%),linear-gradient(135deg,_#0d2940,_#071521)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/12 bg-white/[0.06] text-3xl font-semibold text-[var(--brand-amber)] transition duration-500 group-hover:scale-[1.05]">
            {item.fileType.slice(0, 3).toUpperCase()}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071521] to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/12 bg-[#071521]/85 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur">
            {item.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/42">
          <span>{item.fileType.toUpperCase()}</span>
          {size ? <span>• {size}</span> : null}
          {date ? <span>• {date}</span> : null}
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-7 text-white">{item.title}</h3>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a
            href={item.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-amber)] px-5 py-3 text-sm font-semibold text-[#0f1d2a] transition hover:brightness-105"
          >
            <DownloadIcon />
            {isPt ? "Baixar material" : "Download material"}
          </a>
        </div>
      </div>
    </article>
  );
}

export function MaterialsCatalog({
  locale,
  result,
}: {
  locale: Locale;
  result: MaterialsResult;
}) {
  const isPt = locale === "pt-br";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => [...new Set(result.items.map((item) => item.category))].sort((a, b) => a.localeCompare(b)),
    [result.items],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(locale);

    return result.items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.fileName, item.category, item.fileType]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, locale, query, result.items]);

  if (!result.items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/14 bg-white/[0.025] px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/[0.05] text-2xl text-[var(--brand-amber)]">
          ↓
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-white">
          {isPt ? "Os primeiros materiais chegam em breve" : "The first materials are coming soon"}
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/62">
          {isPt
            ? "Esta área já está preparada para reunir arquivos de Power BI, Excel, DAX, Fabric e outros conteúdos usados nos vídeos."
            : "This area is ready to collect Power BI, Excel, DAX, Fabric, and other files used in the videos."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">{isPt ? "Buscar materiais" : "Search materials"}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isPt ? "Buscar por título, tema ou formato" : "Search by title, topic, or format"}
              className="w-full rounded-full border border-white/12 bg-[#071521] px-5 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--brand-cyan)]"
            />
          </label>

          <div className="flex flex-wrap gap-2" aria-label={isPt ? "Categorias" : "Categories"}>
            <button
              type="button"
              onClick={() => setCategory("all")}
              aria-pressed={category === "all"}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                category === "all"
                  ? "border-[var(--brand-amber)] bg-[var(--brand-amber)] text-[#0f1d2a]"
                  : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20"
              }`}
            >
              {isPt ? "Todos" : "All"}
            </button>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  category === item
                    ? "border-[var(--brand-amber)] bg-[var(--brand-amber)] text-[#0f1d2a]"
                    : "border-white/10 bg-white/[0.03] text-white/68 hover:border-white/20"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredItems.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <MaterialCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.6rem] border border-dashed border-white/14 px-6 py-12 text-center text-sm text-white/58">
          {isPt
            ? "Nenhum material corresponde à busca ou categoria selecionada."
            : "No materials match the selected search or category."}
        </div>
      )}
    </div>
  );
}
