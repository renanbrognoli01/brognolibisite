# Article Entry Example

This document shows the expected shape of a correct article entry inside:

- `src/lib/articles-data.ts`

Use this as a structural reference.

## Canonical example

```ts
{
  slug: "guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance",
  featured: true,
  locales: {
    "pt-br": {
      title: "Guia Completo de DAX em 2026: CALCULATE, Filter Context e Performance Sem Mistério",
      summary:
        "Um guia direto sobre contexto, CALCULATE, ALL, time intelligence e performance em DAX para quem quer parar de decorar fórmula e começar a pensar em modelo.",
      eyebrow: "Power BI e DAX",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "10 min",
      body: [
        {
          type: "paragraph",
          text: "Se você já abriu o Power BI..."
        },
        {
          type: "heading",
          text: "Por que DAX é a habilidade mais cara..."
        },
        {
          type: "paragraph",
          text: "DAX é, ao mesmo tempo..."
        },
        {
          type: "code",
          language: "dax",
          code: "Vendas Eletrônicos =\\nCALCULATE(...)"
        },
        {
          type: "list",
          items: [
            "Filter context vive em medidas...",
            "`CALCULATE` sobrescreve filtros..."
          ]
        }
      ]
    },
    en: {
      title: "The Complete DAX Guide in 2026: CALCULATE, Filter Context, and Performance Without the Mystery",
      summary:
        "A practical guide to CALCULATE, context, ALL, time intelligence, and DAX performance for analysts who want to stop memorizing formulas and start reasoning about models.",
      eyebrow: "Power BI and DAX",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "9 min",
      body: [
        {
          type: "paragraph",
          text: "If you've ever opened Power BI..."
        },
        {
          type: "heading",
          text: "Why DAX is the most expensive..."
        },
        {
          type: "paragraph",
          text: "DAX is simultaneously..."
        },
        {
          type: "code",
          language: "dax",
          code: "Electronics Sales =\\nCALCULATE(...)"
        },
        {
          type: "list",
          items: [
            "Filter context lives in measures...",
            "`CALCULATE` overrides filters..."
          ]
        }
      ]
    }
  }
}
```

## What a good article entry looks like

- The title is editorial, not operational.
- The summary is clean and site-facing.
- PT-BR contains proper accents and `ç`.
- EN contains real English.
- Code is stored in `code` blocks, not in raw markdown fences inside paragraphs.
- Recap bullets are stored as `list` blocks when appropriate.

## What must never appear

Never publish entries containing:

- `Gerado: ...`
- `Status: ...`
- `Versão completa ... anexada`
- `Abaixo: versão PT-BR para revisão rápida`
- `Versão em inglês: ver anexo .md`

Those are Trello workflow artifacts, not article content.

