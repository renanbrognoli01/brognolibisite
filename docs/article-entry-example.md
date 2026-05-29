# Article Entry Example

This is an example of a correct article entry for `src/lib/articles-data.ts`.

Use this example as a formatting reference.

```ts
{
  slug: "guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance",
  featured: true,
  locales: {
    "pt-br": {
      title: "Guia Completo de DAX em 2026: CALCULATE, Filter Context e Performance Sem Misterio",
      summary:
        "Um guia direto sobre contexto, CALCULATE, ALL, time intelligence e performance em DAX para quem quer parar de decorar formula e comecar a pensar em modelo.",
      eyebrow: "Power BI e DAX",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "10 min",
      body: [
        {
          type: "paragraph",
          text: "Se voce ja abriu o Power BI..."
        },
        {
          type: "heading",
          text: "Por que DAX e a habilidade mais cara..."
        },
        {
          type: "paragraph",
          text: "DAX e, ao mesmo tempo..."
        },
        {
          type: "code",
          language: "dax",
          code: "Vendas Eletronicos =\\nCALCULATE(...)"
        },
        {
          type: "list",
          items: [
            "Filter context vive em medidas...",
            "CALCULATE sobrescreve filtros..."
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
            "CALCULATE overrides filters..."
          ]
        }
      ]
    }
  }
}
```

## Important notes

- Do not publish operational notes such as `Generated on`, `Awaiting review`, or `See attached file`.
- Do not put Portuguese inside `en`.
- Do not keep fenced markdown code blocks inside paragraph text.
- Use `body` blocks in order so the article reads naturally on the site.
