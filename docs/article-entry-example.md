# Article Entry Example

This is an example of a correct article entry for `src/lib/articles-data.ts`.

Use this example as a formatting reference.

```ts
{
  slug: "guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance",
  featured: true,
  locales: {
    "pt-br": {
      title: "Guia Completo de DAX em 2026: CALCULATE, Filter Context e Performance Sem Mistério",
      summary:
        "Um guia prático sobre CALCULATE, row context, filter context, ALL, ALLSELECTED, time intelligence, performance e DAX User-Defined Functions em 2026.",
      eyebrow: "Power BI e DAX",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "10 min",
      intro: [
        "Se você já abriu o Power BI, escreveu um SUM, viu funcionar, escreveu um CALCULATE, viu funcionar e depois escreveu uma medida só um pouco mais complexa e o número veio errado, bem-vindo ao clube. DAX é assim: parece fácil até o dia em que não é.",
        "A boa notícia é que existem só três ou quatro ideias por trás de 90% dos erros que você comete em DAX. Quando essas ideias caem a ficha, você para de decorar fórmula e começa a desenhar fórmula.",
        "A ideia deste guia é simples: explicar CALCULATE, contextos, ALL, ALLSELECTED, time intelligence e performance como se a gente estivesse num café, não numa documentação."
      ],
      sections: [
        {
          heading: "Por que DAX é a habilidade mais cara (e mais mal entendida) do Power BI",
          paragraphs: [
            "DAX é, ao mesmo tempo, a linguagem mais procurada por analistas e uma das mais difíceis de explicar. A própria Microsoft destaca que entender e usar contexto de forma eficaz é essencial para fórmulas performáticas, análises dinâmicas e troubleshooting.",
            "O problema não é a sintaxe. É que DAX parece SQL, parece Excel, mas não é nenhum dos dois. Ela tem regras próprias."
          ]
        },
        {
          heading: "Row context e filter context: os dois mundos paralelos do DAX",
          paragraphs: [
            "Toda fórmula DAX vive em um ou dois contextos ao mesmo tempo.",
            "Row context é o mundo da linha. Ele aparece em colunas calculadas e dentro de iteradores como SUMX, AVERAGEX e FILTER.",
            "Filter context é o mundo do recorte. Ele vem das visualizações, slicers e argumentos do CALCULATE."
          ]
        },
        {
          heading: "Resumo do que importa lembrar amanhã de manhã",
          bullets: [
            "Filter context vive em medidas e row context vive em iteradores e colunas calculadas.",
            "CALCULATE sobrescreve filtros e dispara context transition quando chamado dentro de row context.",
            "ALL é faxina total e ALLSELECTED respeita o usuário.",
            "VAR sempre que possível.",
            "Evite iteradores aninhados."
          ]
        }
      ],
      conclusion: [
        "DAX premia quem entende as regras e pune quem decora fórmulas.",
        "Quando bater dúvida, volte sempre à pergunta mais importante: em que contexto eu estou neste ponto da fórmula?"
      ]
    },
    en: {
      title: "The Complete DAX Guide in 2026: CALCULATE, Filter Context, and Performance Without the Mystery",
      summary:
        "A practical guide to CALCULATE, row context, filter context, ALL, ALLSELECTED, time intelligence, performance, and DAX User-Defined Functions in 2026.",
      eyebrow: "Power BI and DAX",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "10 min",
      intro: [
        "If you have ever opened Power BI, written a SUM, watched it work, written a CALCULATE, watched it work too, and then wrote something only slightly more complex and got the wrong number, welcome to the club.",
        "The good news is that around 90% of DAX mistakes come from just a few core ideas.",
        "This guide explains CALCULATE, contexts, ALL, ALLSELECTED, time intelligence, and performance in a practical way."
      ],
      sections: [
        {
          heading: "Why DAX is the most expensive and misunderstood Power BI skill",
          paragraphs: [
            "DAX is one of the most demanded analytical skills and one of the hardest to explain clearly.",
            "The issue is not syntax. The issue is that DAX looks like SQL and Excel, but follows its own rules."
          ]
        },
        {
          heading: "Row context and filter context",
          paragraphs: [
            "Every DAX formula lives inside one or two contexts at the same time.",
            "Row context appears in calculated columns and iterator functions.",
            "Filter context comes from visuals, slicers, and CALCULATE arguments."
          ]
        },
        {
          heading: "What to remember",
          bullets: [
            "Measures live in filter context.",
            "Calculated columns and iterators create row context.",
            "CALCULATE changes filter context.",
            "ALL resets filters.",
            "ALLSELECTED respects external user selection."
          ]
        }
      ],
      conclusion: [
        "DAX rewards people who understand the rules instead of memorizing formulas.",
        "Whenever in doubt, go back to the context you are in."
      ]
    }
  }
}
```

## Important notes

- Do not publish operational notes such as `Generated on`, `Awaiting review`, or `See attached file`.
- Do not put Portuguese inside `en`.
- Do not leave `sections` empty for long-form editorial content.
- Use this structure even when the source comes from a Trello markdown attachment.
