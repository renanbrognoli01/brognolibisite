import type { Locale } from "@/lib/i18n";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "code"; code: string; language?: string }
  | { type: "list"; items: string[] };

export type LocalizedArticleContent = {
  title: string;
  summary: string;
  eyebrow?: string;
  author: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  body: ArticleBlock[];
};

export type ArticleEntry = {
  slug: string;
  featured?: boolean;
  locales: Record<Locale, LocalizedArticleContent>;
};

export const articles: ArticleEntry[] = [
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
            text: 'Se você já abriu o Power BI, escreveu um `SUM`, viu funcionar, escreveu um `CALCULATE`, viu funcionar... e depois escreveu uma medida só um pouco mais complexa e o número veio errado — bem-vindo ao clube. DAX é assim: parece fácil até o dia em que não é.',
          },
          {
            type: "paragraph",
            text: 'A boa notícia? Existem só três ou quatro ideias por trás de 90% dos erros que você comete em DAX. Quando essas ideias caem a ficha, você para de "decorar fórmula" e começa a *desenhar* fórmula. E como bônus, em **abril de 2026** a Microsoft liberou em preview as **DAX User-Defined Functions (UDFs)**, que mudam um pouco como a gente reaproveita lógica no modelo. Vou falar delas no final.',
          },
          {
            type: "paragraph",
            text: "A ideia deste guia é simples: explicar CALCULATE, contextos, ALL/ALLSELECTED, time intelligence e performance como se a gente estivesse num café, não numa documentação.",
          },
          {
            type: "heading",
            text: "Por que DAX é a habilidade mais cara (e mais mal entendida) do Power BI",
          },
          {
            type: "paragraph",
            text: 'DAX é, ao mesmo tempo, a linguagem mais procurada por analistas e a mais difícil de explicar. A própria Microsoft diz, na documentação oficial, que "entender e usar contexto de forma eficaz é muito importante para construir fórmulas de alta performance, análises dinâmicas e para resolver problemas em fórmulas". Tradução: se você não entende contexto, você está chutando.',
          },
          {
            type: "paragraph",
            text: "E o problema não é a sintaxe — é que **DAX parece SQL, parece Excel, mas não é nenhum dos dois**. Ela tem regras próprias. Se você tenta encaixar a lógica de fórmula de célula do Excel num modelo tabular, vira sopa.",
          },
          { type: "paragraph", text: "Vamos direto ao osso." },
          {
            type: "heading",
            text: "Row context e filter context: os dois mundos paralelos do DAX",
          },
          {
            type: "paragraph",
            text: "Toda fórmula DAX vive em um (ou dois) contextos ao mesmo tempo.",
          },
          {
            type: "paragraph",
            text: '**Row context** é o "mundo da linha". Você só tem row context quando o DAX está iterando linha a linha — em colunas calculadas e dentro de funções iteradoras como `SUMX`, `AVERAGEX`, `FILTER`. Dentro do row context, você consegue referenciar colunas direto: `Vendas[Quantidade] * Vendas[PrecoUnitario]` faz sentido porque DAX sabe em qual linha está.',
          },
          {
            type: "paragraph",
            text: '**Filter context** é o "mundo do recorte". Ele vem das visualizações, dos slicers, dos argumentos do `CALCULATE`. É o conjunto de filtros ativos no momento. Quando você arrasta uma matriz com "Categoria" nas linhas e "Total de Vendas" nos valores, cada célula tem um filter context diferente.',
          },
          {
            type: "paragraph",
            text: 'A confusão clássica: você escreve `Vendas[Quantidade] * Vendas[PrecoUnitario]` dentro de uma medida — e o Power BI dá erro. Por quê? Porque medida não tem row context. Medida vive em filter context. Não existe "a linha atual" dentro de uma medida.',
          },
          {
            type: "paragraph",
            text: "A solução? `SUMX(Vendas, Vendas[Quantidade] * Vendas[PrecoUnitario])`. O `SUMX` cria o row context que faltava.",
          },
          {
            type: "paragraph",
            text: "Essa é a primeira regra de ouro: **medida = filter context, coluna calculada = row context**. Quando você precisa de uma na situação da outra, você usa um iterador (`SUMX`, `AVERAGEX`, `FILTER`) ou usa o `CALCULATE`.",
          },
          {
            type: "heading",
            text: "CALCULATE: a função que muda o jogo (literalmente)",
          },
          {
            type: "paragraph",
            text: "`CALCULATE` é a única função em DAX que **muda o filter context**. Pensa nela como um teletransportador: você dá uma expressão e um conjunto de filtros, e ela executa aquela expressão num universo paralelo onde os filtros que você pediu estão ativos.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Vendas Eletrônicos =",
              "CALCULATE(",
              "    [Total Vendas],",
              '    Produtos[Categoria] = "Eletrônicos"',
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Esse `Produtos[Categoria] = "Eletrônicos"` é açúcar sintático. Por baixo dos panos, vira `FILTER(ALL(Produtos[Categoria]), Produtos[Categoria] = "Eletrônicos")`. Isso importa porque o `ALL` ali joga fora qualquer filtro existente sobre `Categoria` antes de colocar o novo. É por isso que `CALCULATE` sobrescreve filtros por padrão.',
          },
          {
            type: "paragraph",
            text: "E aí vem a outra mágica: a **context transition**. Quando você chama `CALCULATE` (ou qualquer medida, que é só açúcar para um `CALCULATE` implícito) dentro de um row context, o DAX converte automaticamente a linha atual em filter context.",
          },
          {
            type: "paragraph",
            text: "Exemplo. Imagine uma coluna calculada na tabela `Produtos`.",
          },
          {
            type: "code",
            language: "dax",
            code: "Vendas do Produto = CALCULATE([Total Vendas])",
          },
          {
            type: "paragraph",
            text: 'Sem filtro nenhum. Sem nada. Por que funciona? Porque ao chamar `CALCULATE` dentro do row context da coluna calculada, o DAX transforma a linha atual ("eu sou o produto SKU-123") em um filtro ("filter context: Produto = SKU-123") e aí a medida calcula só para esse produto.',
          },
          {
            type: "paragraph",
            text: 'Essa única ideia — context transition — é responsável por uns 30% dos "por que esse número está errado?". Toda vez que você vê uma medida sendo chamada dentro de `SUMX`, `AVERAGEX`, `FILTER` ou coluna calculada, pensa duas vezes. A transição está acontecendo.',
          },
          {
            type: "heading",
            text: "ALL vs ALLSELECTED: a dupla que ninguém entende de primeira",
          },
          { type: "paragraph", text: "Hora de matar essa dúvida." },
          {
            type: "paragraph",
            text: "**`ALL`** remove **todos** os filtros de uma tabela ou coluna. Ignora visual, slicer, tudo. É a faxina total.",
          },
          {
            type: "paragraph",
            text: '**`ALLSELECTED`** remove os filtros **internos do visual atual**, mas **respeita** o que o usuário selecionou em slicers e em outros filtros do nível externo. É o equivalente a "ignore só o que está na linha ou coluna da minha matriz, mantenha o resto".',
          },
          {
            type: "paragraph",
            text: 'Caso prático: você quer mostrar "% do total" numa matriz com Categoria e Subcategoria.',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "% sobre Total Geral =",
              "DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALL(Produtos)))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Esse aqui sempre divide pelo total geral, sem importar o que o usuário fez no slicer. Bom para "share absoluto".',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "% sobre Total Selecionado =",
              "DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALLSELECTED(Produtos)))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Esse aqui respeita o slicer. Se o usuário filtrou para Q1, o "total" passa a ser o total do Q1.',
          },
          {
            type: "paragraph",
            text: "Regra prática: se você quer um número que ignora o usuário, use `ALL`. Se quer um número que respeita o usuário mas ignora o recorte do próprio visual, use `ALLSELECTED`.",
          },
          {
            type: "heading",
            text: "Time intelligence: SAMEPERIODLASTYEAR, DATEADD e a tabela de datas",
          },
          {
            type: "paragraph",
            text: "Time intelligence em DAX exige uma coisa inegociável: uma tabela de datas marcada como tabela de datas, contínua, com todas as datas do período. Sem isso, nada funciona direito. SQLBI, Microsoft Learn e blogs especializados repetem isso porque realmente é a base do assunto.",
          },
          {
            type: "paragraph",
            text: "Com a tabela de datas pronta, comparar ano contra ano vira uma linha.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Vendas Ano Anterior =",
              "CALCULATE([Total Vendas], SAMEPERIODLASTYEAR(DimData[Data]))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'O `SAMEPERIODLASTYEAR` pega o intervalo de datas que está no filter context atual e devolve o mesmo intervalo um ano antes. Se o usuário está olhando "Maio de 2026", ele devolve "Maio de 2025".',
          },
          {
            type: "paragraph",
            text: "`DATEADD` é o irmão flexível.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Vendas 3 Meses Atrás =",
              "CALCULATE([Total Vendas], DATEADD(DimData[Data], -3, MONTH))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'E aqui vai um detalhe que o pessoal do Exceltown deixa claro: às vezes você precisa adicionar `ALL(DimData)` como argumento extra para "limpar" filtros que o visual está aplicando. Não é sempre — é quando você quer comparar com o mesmo período, ignorando o recorte da data.',
          },
          {
            type: "paragraph",
            text: "YoY virou clássico.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "YoY % =",
              "VAR Atual = [Total Vendas]",
              "VAR Anterior = [Vendas Ano Anterior]",
              "RETURN DIVIDE(Atual - Anterior, Anterior)",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Repara que eu usei `VAR`. Isso me leva direto para o próximo assunto.",
          },
          {
            type: "heading",
            text: "Performance: VAR é seu melhor amigo (e iteradores aninhados, o pior inimigo)",
          },
          {
            type: "paragraph",
            text: "Quando uma medida demora 8 segundos para abrir, geralmente é um desses três pecados: você está calculando a mesma coisa várias vezes, está aninhando iteradores que não deviam ser aninhados, ou está pedindo coisa demais para o Formula Engine.",
          },
          {
            type: "heading",
            text: "Use VAR. Sempre que puder.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "-- Ruim",
              "Margem % =",
              "DIVIDE(",
              "    [Total Vendas] - [Total Custo],",
              "    [Total Vendas]",
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Parece inocente, né? Mas `[Total Vendas]` é calculado **duas vezes**. O Formula Engine não tem garantia de cachê interno aí.',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "-- Bom",
              "Margem % =",
              "VAR Vendas = [Total Vendas]",
              "VAR Custo = [Total Custo]",
              "RETURN DIVIDE(Vendas - Custo, Vendas)",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Agora cada coisa é calculada uma vez. Além de ficar mais rápido, fica mais legível — e `VAR` "congela" o valor naquele filter context, o que evita bugs sutis quando você combina com `CALCULATE` ou context transition.',
          },
          {
            type: "heading",
            text: "Iteradores aninhados: o assassino silencioso",
          },
          {
            type: "paragraph",
            text: "O SQLBI publicou um artigo célebre sobre otimização de iteradores aninhados. O resumo é brutal: cada nível de iteração multiplica o trabalho. Um `SUMX` dentro de outro `SUMX` que itera 100 mil linhas vira 10 bilhões de cálculos. O Formula Engine engasga.",
          },
          {
            type: "paragraph",
            text: "Padrão problemático.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Total Esforço =",
              "SUMX(",
              "    Produtos,",
              "    SUMX(",
              "        RELATEDTABLE(Vendas),",
              "        Vendas[Quantidade] * Produtos[PrecoBase]",
              "    )",
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Quase sempre dá para reescrever como um único `SUMX` sobre a tabela de fatos, deixando o engine de armazenamento (storage engine, o famoso "VertiPaq") fazer o trabalho pesado.',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Total Esforço =",
              "SUMX(",
              "    Vendas,",
              "    Vendas[Quantidade] * RELATED(Produtos[PrecoBase])",
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Regra prática: itere a tabela de fatos uma vez e puxe colunas das dimensões com `RELATED`. Storage engine é rápido, formula engine é lento. Empurra trabalho para o storage sempre que possível.",
          },
          {
            type: "heading",
            text: "Medida ou coluna calculada?",
          },
          {
            type: "paragraph",
            text: "Coluna calculada é processada no refresh, fica na RAM, ocupa espaço. Medida é calculada em query time, em cima do que o usuário pediu.",
          },
          {
            type: "paragraph",
            text: 'Regra: se o valor depende da seleção do usuário, é medida. Se é um atributo intrínseco da linha (categoria do produto, faixa etária do cliente), pode ser coluna. Não use coluna calculada para "cachear" totais — você vai pagar isso em tamanho de modelo e em refresh lento.',
          },
          {
            type: "heading",
            text: "A novidade de 2026: DAX User-Defined Functions",
          },
          {
            type: "paragraph",
            text: "Em abril de 2026, a Microsoft liberou em preview as DAX User-Defined Functions no Power BI Desktop. A SQLBI e a documentação oficial da Microsoft já têm material sobre.",
          },
          {
            type: "paragraph",
            text: "A ideia: empacotar lógica DAX reutilizável dentro do próprio modelo. Em vez de copiar e colar a mesma expressão em 30 medidas, você define uma função uma vez e usa em todo lugar.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "FUNCTION Margem(vendas, custo) =",
              "    DIVIDE(vendas - custo, vendas)",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "E aí, em qualquer medida.",
          },
          {
            type: "code",
            language: "dax",
            code: "Margem Produtos = Margem([Total Vendas], [Total Custo])",
          },
          {
            type: "paragraph",
            text: "Por que isso é grande? Porque, até abril de 2026, a única forma de reaproveitar lógica era copiar fórmulas (ruim de manter) ou criar medidas intermediárias (poluem o modelo). UDFs resolvem isso com elegância de linguagem de programação de verdade.",
          },
          {
            type: "paragraph",
            text: 'Os "gotchas" que o pessoal da SQLBI alerta: ainda é preview, performance precisa ser testada caso a caso (UDF não é mágica, ela ainda passa pelo Formula Engine), e a depuração é menos óbvia quando algo dá errado lá dentro.',
          },
          {
            type: "paragraph",
            text: "Recomendação prática: comece usando UDFs em utilitários puros (formatação, cálculos matemáticos, transformações de string). Deixe medidas de negócio complexas como medidas tradicionais por enquanto. Quando a feature sair de preview, expanda.",
          },
          {
            type: "heading",
            text: "Resumo do que importa lembrar amanhã de manhã",
          },
          {
            type: "list",
            items: [
              "Filter context vive em medidas, row context vive em iteradores e colunas calculadas. Quando precisar trocar, use `CALCULATE` ou um iterador.",
              "`CALCULATE` sobrescreve filtros e dispara context transition quando chamado dentro de row context.",
              "`ALL` é faxina total, `ALLSELECTED` respeita o usuário. Use isso para % do total.",
              "Time intelligence exige tabela de datas decente. `SAMEPERIODLASTYEAR` e `DATEADD` resolvem 90% dos comparativos.",
              "Performance: `VAR` sempre, evite iteradores aninhados, prefira iterar a fato uma vez com `RELATED`.",
              "Medida ≠ coluna calculada. Não use coluna para cachear total.",
              "DAX UDFs (abril/2026, preview) chegaram para resolver reaproveitamento de lógica. Comece pelos utilitários.",
            ],
          },
          {
            type: "paragraph",
            text: 'DAX premia quem entende as regras e pune quem decora. Se você dedicar duas tardes pra brincar com esses conceitos no DAX Studio, vendo Storage Engine vs Formula Engine no profiler, sua vida em Power BI muda de patamar. Sério.',
          },
          {
            type: "paragraph",
            text: 'E quando bater dúvida, lembra: 80% dos erros de DAX são erro de contexto. Volte para a pergunta básica — **"em que contexto eu estou nesse ponto da fórmula?"** — e a resposta aparece.',
          },
        ],
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
            text: "If you've ever opened Power BI, written a `SUM`, watched it work, written a `CALCULATE`, watched it work too... and then written something slightly more complex and got the wrong number, welcome to the club. DAX is like that: easy until it isn't.",
          },
          {
            type: "paragraph",
            text: 'The good news? About 90% of the DAX mistakes you make trace back to three or four core ideas. Once those click, you stop "memorizing formulas" and start *designing* them. As a bonus, in **April 2026** Microsoft shipped a preview of **DAX User-Defined Functions (UDFs)**, which slightly changes how we reuse logic in a model. We will cover those at the end.',
          },
          {
            type: "paragraph",
            text: "The goal here is simple: explain CALCULATE, contexts, ALL/ALLSELECTED, time intelligence, and performance the way you would explain them over coffee, not the way a manual would.",
          },
          {
            type: "heading",
            text: "Why DAX is the most expensive and most misunderstood Power BI skill",
          },
          {
            type: "paragraph",
            text: 'DAX is simultaneously the most sought-after skill for analysts and the hardest one to explain clearly. Microsoft itself says that understanding and using context effectively is critical for high-performance formulas, dynamic analysis, and troubleshooting. Translation: if you do not understand context, you are guessing.',
          },
          {
            type: "paragraph",
            text: "The trap is not syntax. The trap is that **DAX looks like SQL, looks like Excel, but is neither**. It has its own rules. If you bring spreadsheet thinking into a tabular model, things fall apart quickly.",
          },
          { type: "paragraph", text: "Let's get to the point." },
          {
            type: "heading",
            text: "Row context and filter context: the two parallel worlds of DAX",
          },
          {
            type: "paragraph",
            text: "Every DAX formula lives inside one or two contexts at the same time.",
          },
          {
            type: "paragraph",
            text: '**Row context** is the "world of the row". You only get row context when DAX iterates line by line - in calculated columns and inside iterators such as `SUMX`, `AVERAGEX`, and `FILTER`. Inside row context you can reference columns directly: `Sales[Quantity] * Sales[UnitPrice]` works because DAX knows which row it is evaluating.',
          },
          {
            type: "paragraph",
            text: '**Filter context** is the "world of the slice". It comes from visuals, slicers, and `CALCULATE` arguments. It is the full set of active filters at that moment. When you place Category on the rows of a matrix and Total Sales on the values, each cell gets a different filter context.',
          },
          {
            type: "paragraph",
            text: 'The classic mistake is writing `Sales[Quantity] * Sales[UnitPrice]` inside a measure and expecting it to work. Measures do not have row context. Measures live in filter context. There is no "current row" inside a measure.',
          },
          {
            type: "paragraph",
            text: "The fix is `SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])`. `SUMX` creates the row context that was missing.",
          },
          {
            type: "paragraph",
            text: "That leads to the first golden rule: **measure = filter context, calculated column = row context**. Whenever you need one in the role of the other, you bring in an iterator or `CALCULATE`.",
          },
          {
            type: "heading",
            text: "CALCULATE: the function that literally changes the game",
          },
          {
            type: "paragraph",
            text: "`CALCULATE` is the only DAX function that **changes filter context**. Think of it as a teleporter: you pass an expression and a set of filters, and it evaluates that expression in a parallel universe where those filters are active.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Electronics Sales =",
              "CALCULATE(",
              "    [Total Sales],",
              '    Products[Category] = "Electronics"',
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'That `Products[Category] = "Electronics"` is syntactic sugar. Under the hood it becomes `FILTER(ALL(Products[Category]), Products[Category] = "Electronics")`. That matters because `ALL` wipes any existing filter on `Category` before applying the new one. That is why `CALCULATE` overrides filters by default.',
          },
          {
            type: "paragraph",
            text: "The other key concept is **context transition**. When you call `CALCULATE` inside a row context, DAX automatically converts the current row into filter context.",
          },
          {
            type: "paragraph",
            text: "Imagine a calculated column on the `Products` table.",
          },
          {
            type: "code",
            language: "dax",
            code: "Product Sales = CALCULATE([Total Sales])",
          },
          {
            type: "paragraph",
            text: 'No filter. No extra logic. Yet it works because `CALCULATE` transforms the current row ("I am product SKU-123") into a filter ("filter context: Product = SKU-123"), and then the measure evaluates for that product only.',
          },
          {
            type: "paragraph",
            text: 'That single idea, context transition, explains a huge share of "why is this number wrong?" moments. Whenever you see a measure called inside `SUMX`, `AVERAGEX`, `FILTER`, or a calculated column, stop and think. Transition is happening.',
          },
          {
            type: "heading",
            text: "ALL vs ALLSELECTED: the duo nobody gets on the first try",
          },
          { type: "paragraph", text: "Let's settle this." },
          {
            type: "paragraph",
            text: "**`ALL`** removes **all** filters from a table or column. It ignores visuals, slicers, everything. Total reset.",
          },
          {
            type: "paragraph",
            text: '**`ALLSELECTED`** removes filters internal to the current visual, but **keeps** what the user selected in slicers and outer filters. Think of it as "ignore only the matrix breakdown, keep the broader user selection".',
          },
          {
            type: "paragraph",
            text: 'A practical example is "% of total" in a matrix with Category and Subcategory.',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "% of Grand Total =",
              "DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Products)))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'This always divides by the absolute total, regardless of what the user selected. Good for "absolute share".',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "% of Selected Total =",
              "DIVIDE([Total Sales], CALCULATE([Total Sales], ALLSELECTED(Products)))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'This one respects the slicer. If the user selected Q1, the "total" becomes the Q1 total.',
          },
          {
            type: "paragraph",
            text: "Rule of thumb: use `ALL` when you want to ignore the user. Use `ALLSELECTED` when you want to respect the user but ignore the visual's own grain.",
          },
          {
            type: "heading",
            text: "Time intelligence: SAMEPERIODLASTYEAR, DATEADD, and the date table",
          },
          {
            type: "paragraph",
            text: "Time intelligence has one non-negotiable requirement: a proper date table, marked as a date table, continuous, and complete for the entire period. Without it, things do not behave consistently.",
          },
          {
            type: "paragraph",
            text: "Once the date table is in place, year-over-year becomes a one-liner.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Sales Previous Year =",
              "CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: '`SAMEPERIODLASTYEAR` takes the date interval currently in filter context and returns the same interval one year earlier. If the user is looking at "May 2026", it returns "May 2025".',
          },
          {
            type: "paragraph",
            text: "`DATEADD` is the more flexible sibling.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Sales 3 Months Ago =",
              "CALCULATE([Total Sales], DATEADD(DimDate[Date], -3, MONTH))",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Sometimes it helps to add `ALL(DimDate)` to clear filters applied by the visual itself. Not always - only when you need to compare the same period while ignoring the current date slice.",
          },
          {
            type: "paragraph",
            text: "YoY is the classic combination.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "YoY % =",
              "VAR Current = [Total Sales]",
              "VAR Previous = [Sales Previous Year]",
              "RETURN DIVIDE(Current - Previous, Previous)",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Notice the `VAR`. That takes us straight to the next topic.",
          },
          {
            type: "heading",
            text: "Performance: VAR is your best friend, nested iterators are not",
          },
          {
            type: "paragraph",
            text: "When a measure takes too long to open, the usual causes are repeated calculations, nested iterators, or too much work pushed into the Formula Engine.",
          },
          {
            type: "heading",
            text: "Use VAR whenever you can",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "-- Bad",
              "Margin % =",
              "DIVIDE(",
              "    [Total Sales] - [Total Cost],",
              "    [Total Sales]",
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Looks harmless, but `[Total Sales]` gets evaluated twice.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "-- Better",
              "Margin % =",
              "VAR Sales = [Total Sales]",
              "VAR Cost = [Total Cost]",
              "RETURN DIVIDE(Sales - Cost, Sales)",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Now each value is calculated once. The formula becomes faster, clearer, and less fragile when combined with `CALCULATE` or context transition.",
          },
          {
            type: "heading",
            text: "Nested iterators: the silent killer",
          },
          {
            type: "paragraph",
            text: "Each level of iteration multiplies the work. A `SUMX` inside another `SUMX` can blow up the number of calculations and choke the Formula Engine.",
          },
          {
            type: "paragraph",
            text: "Problematic pattern.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Total Effort =",
              "SUMX(",
              "    Products,",
              "    SUMX(",
              "        RELATEDTABLE(Sales),",
              "        Sales[Quantity] * Products[BasePrice]",
              "    )",
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: 'Most of the time you can rewrite that as a single `SUMX` over the fact table and let the storage engine, the famous "VertiPaq", do the heavy lifting.',
          },
          {
            type: "code",
            language: "dax",
            code: [
              "Total Effort =",
              "SUMX(",
              "    Sales,",
              "    Sales[Quantity] * RELATED(Products[BasePrice])",
              ")",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Rule of thumb: iterate the fact table once and pull dimension columns with `RELATED`.",
          },
          {
            type: "heading",
            text: "Measure or calculated column?",
          },
          {
            type: "paragraph",
            text: "Calculated columns are processed at refresh time, stored in memory, and take up model space. Measures are evaluated at query time, based on what the user requested.",
          },
          {
            type: "paragraph",
            text: 'Rule: if the value depends on user selection, it should be a measure. If it is an intrinsic row attribute, such as product category or customer age bracket, it can be a column. Do not use calculated columns to "cache" totals.',
          },
          {
            type: "heading",
            text: "The 2026 novelty: DAX User-Defined Functions",
          },
          {
            type: "paragraph",
            text: "In April 2026, Microsoft shipped **DAX User-Defined Functions** in preview for Power BI Desktop. The idea is to package reusable DAX logic inside the model itself.",
          },
          {
            type: "paragraph",
            text: "Instead of copy-pasting the same expression across many measures, you define a function once and use it everywhere.",
          },
          {
            type: "code",
            language: "dax",
            code: [
              "FUNCTION Margin(sales, cost) =",
              "    DIVIDE(sales - cost, sales)",
            ].join("\n"),
          },
          {
            type: "paragraph",
            text: "Then, in any measure.",
          },
          {
            type: "code",
            language: "dax",
            code: "Product Margin = Margin([Total Sales], [Total Cost])",
          },
          {
            type: "paragraph",
            text: "The benefit is cleaner reuse. The caution is that the feature is still in preview, so performance and debuggability should be tested carefully.",
          },
          {
            type: "paragraph",
            text: "A practical starting point is to use UDFs for pure utilities such as formatting, math helpers, and string transforms, while keeping complex business measures traditional for now.",
          },
          {
            type: "heading",
            text: "What to remember tomorrow morning",
          },
          {
            type: "list",
            items: [
              "Filter context lives in measures, row context lives in iterators and calculated columns. Use `CALCULATE` or an iterator when you need to switch between them.",
              "`CALCULATE` overrides filters and triggers context transition when called inside row context.",
              "`ALL` is a total reset, while `ALLSELECTED` respects the broader user selection.",
              "Time intelligence requires a proper date table. `SAMEPERIODLASTYEAR` and `DATEADD` cover most comparisons.",
              "For performance, use `VAR`, avoid nested iterators, and iterate the fact table once when possible.",
              "A measure is not the same thing as a calculated column. Do not use columns to cache totals.",
              "DAX UDFs, released in preview in April 2026, are the new path for reusable logic.",
            ],
          },
          {
            type: "paragraph",
            text: 'DAX rewards people who understand the rules and punishes people who memorize formulas. Whenever you feel stuck, come back to the most important question: **"what context am I in at this point of the formula?"**',
          },
        ],
      },
    },
  },
];

export function getArticlesForLocale(locale: Locale) {
  return articles.map((article) => ({
    slug: article.slug,
    featured: article.featured ?? false,
    ...article.locales[locale],
  }));
}

export function getArticleBySlug(locale: Locale, slug: string) {
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) {
    return null;
  }

  return {
    slug: article.slug,
    featured: article.featured ?? false,
    ...article.locales[locale],
  };
}
