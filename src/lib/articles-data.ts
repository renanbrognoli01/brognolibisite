import type { Locale } from "@/lib/i18n";

export type ArticleSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LocalizedArticleContent = {
  title: string;
  summary: string;
  eyebrow?: string;
  author: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  intro: string[];
  sections: ArticleSection[];
  conclusion?: string[];
};

export type ArticleEntry = {
  slug: string;
  featured?: boolean;
  locales: Record<Locale, LocalizedArticleContent>;
};

export const articles: ArticleEntry[] = [
  {
  slug: "guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance",
  featured: false,
  locales: {
    "pt-br": {
      title: "Guia Completo de DAX: CALCULATE, Filter Context e Otimização de Performance",
      summary: "Se você já abriu o Power BI, escreveu um `SUM`, viu funcionar, escreveu um `CALCULATE`, viu funcionar… e depois escreveu uma medida só um pouco mais complexa e ",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "9 min",
      intro: [
        "Se você já abriu o Power BI, escreveu um `SUM`, viu funcionar, escreveu um `CALCULATE`, viu funcionar… e depois escreveu uma medida só um pouco mais complexa e o número veio errado — bem-vindo ao clube. DAX é assim: parece fácil até o dia em que não é.",
        "A boa notícia? Existem só três ou quatro ideias por trás de 90% dos erros que você comete em DAX. Quando essas ideias caem a ficha, você para de \"decorar fórmula\" e começa a *desenhar* fórmula. E como bônus, em **abril de 2026** a Microsoft liberou em preview as **DAX User-Defined Functions (UDFs)**, que mudam um pouco como a gente reaproveita lógica no modelo. Vou falar delas no final.",
        "A ideia desse guia é simples: explicar CALCULATE, contextos, ALL/ALLSELECTED, time intelligence e performance como se a gente estivesse num café, não numa documentação. Bora."
      ],
      sections: [
        {
          heading: "Por que DAX é a habilidade mais cara (e mais mal entendida) do Power BI",
          paragraphs: [
            "DAX é, ao mesmo tempo, a linguagem mais procurada por analistas e a mais difícil de explicar. A própria Microsoft diz, na documentação oficial, que \"entender e usar contexto de forma eficaz é muito importante para construir fórmulas de alta performance, análises dinâmicas e para resolver problemas em fórmulas\". Tradução: se você não entende contexto, você está chutando.",
            "E o problema não é a sintaxe — é que **DAX parece SQL, parece Excel, mas não é nenhum dos dois**. Ela tem regras próprias. Se você tenta encaixar a lógica de fórmula de célula do Excel num modelo tabular, vira sopa.",
            "Vamos direto ao osso."
          ],
        },
        {
          heading: "Row context e filter context: os dois mundos paralelos do DAX",
          paragraphs: [
            "Toda fórmula DAX vive em um (ou dois) contextos ao mesmo tempo.",
            "**Row context** é o \"mundo da linha\". Você só tem row context quando o DAX está iterando linha a linha — em colunas calculadas e dentro de funções iteradoras como `SUMX`, `AVERAGEX`, `FILTER`. Dentro do row context, você consegue referenciar colunas direto: `Vendas[Quantidade] * Vendas[PrecoUnitario]` faz sentido porque DAX sabe em qual linha está.",
            "**Filter context** é o \"mundo do recorte\". Ele vem das visualizações, dos slicers, dos argumentos do `CALCULATE`. É o conjunto de filtros ativos no momento. Quando você arrasta uma matriz com \"Categoria\" nas linhas e \"Total de Vendas\" nos valores, cada célula tem um filter context diferente (uma para cada categoria).",
            "A confusão clássica: você escreve `Vendas[Quantidade] * Vendas[PrecoUnitario]` dentro de uma medida — e o Power BI dá erro. Por quê? Porque medida não tem row context. Medida vive em filter context. Não existe \"a linha atual\" dentro de uma medida.",
            "A solução? `SUMX(Vendas, Vendas[Quantidade] * Vendas[PrecoUnitario])`. O `SUMX` cria o row context que faltava.",
            "Essa é a primeira regra de ouro: **medida = filter context, coluna calculada = row context**. Quando você precisa de uma na situação da outra, você usa um iterador (`SUMX`, `AVERAGEX`, `FILTER`) ou usa o `CALCULATE` (que veremos já já)."
          ],
        },
        {
          heading: "CALCULATE: a função que muda o jogo (literalmente)",
          paragraphs: [
            "`CALCULATE` é a única função em DAX que **muda o filter context**. Pensa nela como um teletransportador: você dá uma expressão e um conjunto de filtros, e ela executa aquela expressão num universo paralelo onde os filtros que você pediu estão ativos.",
            "Sintaxe básica:",
            "```dax",
            "Vendas Eletrônicos =",
            "CALCULATE(",
            "[Total Vendas],",
            "Produtos[Categoria] = \"Eletrônicos\"",
            ")",
            "```",
            "Esse \"Produtos[Categoria] = 'Eletrônicos'\" é açúcar sintático. Por baixo dos panos, vira `FILTER(ALL(Produtos[Categoria]), Produtos[Categoria] = \"Eletrônicos\")`. Isso é importante porque o `ALL` ali está jogando fora qualquer filtro existente sobre `Categoria` e colocando o novo. É por isso que `CALCULATE` **sobrescreve** filtros por padrão.",
            "E aí vem a outra mágica: a **context transition**. Quando você chama `CALCULATE` (ou qualquer medida, que é só açúcar para um `CALCULATE` implícito) **dentro de um row context**, o DAX converte automaticamente aquela linha atual em filter context.",
            "Exemplo. Imagine uma coluna calculada na tabela `Produtos`:",
            "```dax",
            "Vendas do Produto = CALCULATE([Total Vendas])",
            "```",
            "Sem filtro nenhum. Sem nada. Por que funciona? Porque ao chamar `CALCULATE` dentro do row context da coluna calculada, o DAX transforma a linha atual (\"eu sou o produto SKU-123\") em um filtro (\"filter context: Produto = SKU-123\") e aí a medida calcula só para esse produto.",
            "Essa única ideia — context transition — é responsável por uns 30% dos \"por que esse número está errado?\". Toda vez que você vê uma medida sendo chamada dentro de `SUMX`, `AVERAGEX`, `FILTER` ou coluna calculada, *pensa duas vezes*. A transição está acontecendo."
          ],
        },
        {
          heading: "ALL vs ALLSELECTED: a dupla que ninguém entende de primeira",
          paragraphs: [
            "Hora de matar essa dúvida.",
            "**`ALL`** remove **todos** os filtros de uma tabela ou coluna. Ignora visual, slicer, tudo. É a faxina total.",
            "**`ALLSELECTED`** remove os filtros **internos do visual atual**, mas **respeita** o que o usuário selecionou em slicers e em outros filtros do nível externo. É o equivalente a \"ignore só o que está na linha/coluna da minha matriz, mantenha o resto\".",
            "Caso prático: você quer mostrar \"% do total\" numa matriz com Categoria e Subcategoria.",
            "```dax",
            "% sobre Total Geral =",
            "DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALL(Produtos)))",
            "```",
            "Esse aqui sempre divide pelo total geral, sem importar o que o usuário fez no slicer. Bom para \"share absoluto\".",
            "```dax",
            "% sobre Total Selecionado =",
            "DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALLSELECTED(Produtos)))",
            "```",
            "Esse aqui respeita o slicer. Se o usuário filtrou para Q1, o \"total\" passa a ser o total do Q1.",
            "Regra prática: **se você quer um número que ignora o usuário, use `ALL`. Se quer um número que respeita o usuário mas ignora o recorte do próprio visual, use `ALLSELECTED`.**"
          ],
        },
        {
          heading: "Time intelligence: SAMEPERIODLASTYEAR, DATEADD e a tabela de datas",
          paragraphs: [
            "Time intelligence em DAX exige uma coisa **inegociável**: uma tabela de datas marcada como tabela de datas, contínua, com todas as datas do período. Sem isso, nada funciona direito. Isso vem batido por todos os especialistas — SQLBI, Microsoft Learn, blogs especializados como Casewhen e Elysiate dizem a mesma coisa.",
            "Com a tabela de datas pronta, comparar ano contra ano vira uma linha:",
            "```dax",
            "Vendas Ano Anterior =",
            "CALCULATE([Total Vendas], SAMEPERIODLASTYEAR(DimData[Data]))",
            "```",
            "O `SAMEPERIODLASTYEAR` pega o intervalo de datas que está no filter context atual e devolve o mesmo intervalo um ano antes. Se o usuário está olhando \"Maio de 2026\", ele devolve \"Maio de 2025\".",
            "`DATEADD` é o irmão flexível:",
            "```dax",
            "Vendas 3 Meses Atrás =",
            "CALCULATE([Total Vendas], DATEADD(DimData[Data], -3, MONTH))",
            "```",
            "E aqui vai um detalhe que o pessoal do Exceltown deixa claro: às vezes você precisa adicionar `ALL(DimData)` como argumento extra para \"limpar\" filtros que o visual está aplicando. Não é sempre — é quando você quer comparar com o mesmo período, ignorando o recorte da data.",
            "YoY virou clássico:",
            "```dax",
            "YoY % =",
            "VAR Atual = [Total Vendas]",
            "VAR Anterior = [Vendas Ano Anterior]",
            "RETURN DIVIDE(Atual - Anterior, Anterior)",
            "```",
            "Repara que eu usei `VAR`. Isso me leva direto para o próximo assunto."
          ],
        },
        {
          heading: "Performance: VAR é seu melhor amigo (e iteradores aninhados, o pior inimigo)",
          paragraphs: [
            "Quando uma medida demora 8 segundos para abrir, geralmente é um desses três pecados: você está calculando a mesma coisa várias vezes, está aninhando iteradores que não deviam ser aninhados, ou está pedindo coisa demais para o Formula Engine.",
            "### Use `VAR`. Sempre que puder.",
            "```dax",
            "-- Ruim",
            "Margem % =",
            "DIVIDE(",
            "[Total Vendas] - [Total Custo],",
            "[Total Vendas]",
            ")",
            "```",
            "Parece inocente, né? Mas `[Total Vendas]` é calculado **duas vezes**. O Formula Engine não tem garantia de cachê interno aí.",
            "```dax",
            "-- Bom",
            "Margem % =",
            "VAR Vendas = [Total Vendas]",
            "VAR Custo = [Total Custo]",
            "RETURN DIVIDE(Vendas - Custo, Vendas)",
            "```",
            "Agora cada coisa é calculada uma vez. Além de ficar mais rápido, fica mais legível — e VAR \"congela\" o valor naquele filter context, o que evita bugs sutis quando você combina com `CALCULATE` ou context transition.",
            "### Iteradores aninhados: o assassino silencioso",
            "O SQLBI publicou um artigo célebre sobre otimização de iteradores aninhados. O resumo é brutal: cada nível de iteração multiplica o trabalho. Um `SUMX` dentro de outro `SUMX` que itera 100 mil linhas vira 10 bilhões de cálculos. O Formula Engine engasga.",
            "Padrão problemático:",
            "```dax",
            "Total Esforço =",
            "SUMX(",
            "Produtos,",
            "SUMX(",
            "RELATEDTABLE(Vendas),",
            "Vendas[Quantidade] * Produtos[PrecoBase]",
            ")",
            ")",
            "```",
            "Quase sempre dá para reescrever como um único `SUMX` sobre a tabela de fatos, deixando o engine de armazenamento (storage engine, o famoso \"VertiPaq\") fazer o trabalho pesado:",
            "```dax",
            "Total Esforço =",
            "SUMX(",
            "Vendas,",
            "Vendas[Quantidade] * RELATED(Produtos[PrecoBase])",
            ")",
            "```",
            "Regra prática: **itere a tabela de fatos uma vez, puxe colunas das dimensões com `RELATED`**. Storage engine é rápido, formula engine é lento. Empurra trabalho para o storage sempre que possível.",
            "### Medida ou coluna calculada?",
            "Coluna calculada é processada no refresh, fica na RAM, ocupa espaço. Medida é calculada em query time, em cima do que o usuário pediu.",
            "Regra: **se o valor depende da seleção do usuário, é medida. Se é um atributo intrínseco da linha (categoria do produto, faixa etária do cliente), pode ser coluna**. Não use coluna calculada para \"cachear\" totais — você vai pagar isso em tamanho de modelo e em refresh lento."
          ],
        },
        {
          heading: "A novidade de 2026: DAX User-Defined Functions",
          paragraphs: [
            "Em abril de 2026, a Microsoft liberou em preview as **DAX User-Defined Functions** no Power BI Desktop. A SQLBI e a documentação oficial da Microsoft já têm material sobre.",
            "A ideia: empacotar lógica DAX reutilizável dentro do próprio modelo. Em vez de copiar e colar a mesma expressão em 30 medidas, você define uma função uma vez e usa em todo lugar.",
            "Sintaxe (simplificada, conceitual):",
            "```dax",
            "FUNCTION Margem(vendas, custo) =",
            "DIVIDE(vendas - custo, vendas)",
            "```",
            "E aí, em qualquer medida:",
            "```dax",
            "Margem Produtos = Margem([Total Vendas], [Total Custo])",
            "```",
            "Por que isso é grande? Porque, até abril de 2026, a única forma de reaproveitar lógica era copiar fórmulas (ruim de manter) ou criar medidas intermediárias (poluem o modelo). UDFs resolvem isso com elegância de linguagem de programação de verdade.",
            "Os \"gotchas\" que o pessoal da SQLBI alerta: ainda é preview, performance precisa ser testada caso a caso (UDF não é mágica, ela ainda passa pelo Formula Engine), e a depuração é menos óbvia quando algo dá errado lá dentro.",
            "Recomendação prática: comece usando UDFs em **utilitários puros** (formatação, cálculos matemáticos, transformações de string). Deixe medidas de negócio complexas como medidas tradicionais por enquanto. Quando a feature sair de preview, expanda."
          ],
        },
        {
          heading: "Resumo do que importa lembrar amanhã de manhã",
          paragraphs: [
            "DAX premia quem entende as regras e pune quem decora. Se você dedicar duas tardes pra brincar com esses conceitos no DAX Studio, vendo Storage Engine vs Formula Engine no profiler, sua vida em Power BI muda de patamar. Sério.",
            "E quando bater dúvida, lembra: 80% dos erros de DAX são erro de contexto. Volte para a pergunta básica — **\"em que contexto eu estou nesse ponto da fórmula?\"** — e a resposta aparece."
          ],
          bullets: [
            "**Filter context vive em medidas, row context vive em iteradores e colunas calculadas.** Quando precisar trocar, use `CALCULATE` ou um iterador.",
            "**`CALCULATE` sobrescreve filtros** e dispara **context transition** quando chamado dentro de row context.",
            "**`ALL` é faxina total, `ALLSELECTED` respeita o usuário.** Use isso para % do total.",
            "**Time intelligence exige tabela de datas decente.** `SAMEPERIODLASTYEAR` e `DATEADD` resolvem 90% dos comparativos.",
            "**Performance:** `VAR` sempre, evite iteradores aninhados, prefira iterar a fato uma vez com `RELATED`.",
            "**Medida ≠ coluna calculada.** Não use coluna para cachear total.",
            "**DAX UDFs (abril/2026, preview)** chegaram para resolver reaproveitamento de lógica. Comece pelos utilitários."
          ],
        }
      ],
      conclusion: [
        "DAX premia quem entende as regras e pune quem decora. Se você dedicar duas tardes pra brincar com esses conceitos no DAX Studio, vendo Storage Engine vs Formula Engine no profiler, sua vida em Power BI muda de patamar. Sério.",
        "E quando bater dúvida, lembra: 80% dos erros de DAX são erro de contexto. Volte para a pergunta básica — **\"em que contexto eu estou nesse ponto da fórmula?\"** — e a resposta aparece."
      ],
    },
    "en": {
      title: "The Complete DAX Guide in 2026: CALCULATE, Filter Context, and Performance Without the Mystery",
      summary: "Se você já abriu o Power BI, escreveu um `SUM`, viu funcionar, escreveu um `CALCULATE`, viu funcionar… e depois escreveu uma medida só um pouco mais complexa e ",
      author: "Renan Brognoli",
      category: "Power BI",
      publishedAt: "2026-05-29",
      readingTime: "9 min",
      intro: [
        "If you've ever opened Power BI, written a `SUM`, watched it work, written a `CALCULATE`, watched it work too… and then written something slightly more complex and got a wrong number — welcome to the club. DAX is like that: easy until it isn't.",
        "The good news? About 90% of the DAX mistakes you make trace back to three or four core ideas. Once those click, you stop \"memorizing formulas\" and start *designing* them. As a bonus, in **April 2026** Microsoft shipped a preview of **DAX User-Defined Functions (UDFs)**, which slightly changes how we reuse logic in a model. We'll cover those at the end.",
        "The goal here: explain CALCULATE, contexts, ALL/ALLSELECTED, time intelligence, and performance the way you'd explain them over coffee — not the way a manual would. Let's go."
      ],
      sections: [
        {
          heading: "Why DAX is the most expensive (and most misunderstood) Power BI skill",
          paragraphs: [
            "DAX is simultaneously the most sought-after skill for analysts and the hardest to teach. Microsoft's own docs put it bluntly: \"understanding context and using context effectively are very important for building high-performing formulas, dynamic analyses, and for troubleshooting problems.\" Translation: if you don't get context, you're guessing.",
            "The trap isn't syntax — it's that **DAX looks like SQL, looks like Excel, but is neither**. It has its own rules. If you try to bring Excel cell logic into a tabular model, things break.",
            "Let's get to the meat."
          ],
        },
        {
          heading: "Row context and filter context: the two parallel worlds of DAX",
          paragraphs: [
            "Every DAX formula lives inside one (or two) contexts at a time.",
            "**Row context** is \"the world of the row.\" You only have row context when DAX is iterating row-by-row — inside calculated columns and inside iterator functions like `SUMX`, `AVERAGEX`, and `FILTER`. Inside row context you can reference columns directly: `Sales[Quantity] * Sales[UnitPrice]` works because DAX knows which row it's on.",
            "**Filter context** is \"the world of the slice.\" It comes from visuals, slicers, and `CALCULATE` arguments. It's the set of filters active at that moment. If you drop a matrix with \"Category\" on rows and \"Total Sales\" on values, each cell has its own filter context (one per category).",
            "The classic confusion: you write `Sales[Quantity] * Sales[UnitPrice]` inside a measure — error. Why? Measures don't have row context. Measures live in filter context. There is no \"current row\" inside a measure.",
            "Fix? `SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])`. `SUMX` creates the row context that was missing.",
            "That's rule number one: **measure = filter context, calculated column = row context**. When you need one inside the other, you use an iterator (`SUMX`, `AVERAGEX`, `FILTER`) or you use `CALCULATE` (next stop)."
          ],
        },
        {
          heading: "CALCULATE: the function that changes the game (literally)",
          paragraphs: [
            "`CALCULATE` is the only function in DAX that **changes the filter context**. Think of it as a teleporter: you give it an expression and a set of filters, and it runs the expression in a parallel universe where those filters are active.",
            "Basic syntax:",
            "```dax",
            "Electronics Sales =",
            "CALCULATE(",
            "[Total Sales],",
            "Products[Category] = \"Electronics\"",
            ")",
            "```",
            "That \"Products[Category] = 'Electronics'\" is syntactic sugar. Under the hood it becomes `FILTER(ALL(Products[Category]), Products[Category] = \"Electronics\")`. That matters because `ALL` is wiping any existing filter on `Category` before placing the new one. That's why `CALCULATE` **overrides** filters by default.",
            "Then comes the other piece of magic: **context transition**. When you call `CALCULATE` (or any measure, which is itself a hidden `CALCULATE`) **inside a row context**, DAX automatically converts the current row into filter context.",
            "Example. A calculated column on the `Products` table:",
            "```dax",
            "Product Sales = CALCULATE([Total Sales])",
            "```",
            "No filter. Nothing. Why does it work? Because calling `CALCULATE` inside the row context of a calculated column tells DAX to convert the current row (\"I am product SKU-123\") into a filter (\"filter context: Product = SKU-123\"). The measure then computes only for that product.",
            "This single idea — context transition — is responsible for roughly 30% of all \"why is this number wrong?\" moments. Whenever you see a measure called inside `SUMX`, `AVERAGEX`, `FILTER`, or a calculated column, *pause and think*. Transition is happening."
          ],
        },
        {
          heading: "ALL vs ALLSELECTED: the duo nobody gets on the first try",
          paragraphs: [
            "Let's settle this.",
            "**`ALL`** removes **all** filters from a table or column. It ignores visuals, slicers, everything. Total wipe.",
            "**`ALLSELECTED`** removes filters **internal to the current visual** but **respects** what the user picked at slicers and outer-level filters. The \"ignore only what's on my rows/columns, keep the rest\" function.",
            "Use case: % of total in a matrix with Category and Subcategory.",
            "```dax",
            "% of Grand Total =",
            "DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Products)))",
            "```",
            "This always divides by the absolute total, regardless of slicers. Good for \"absolute share.\"",
            "```dax",
            "% of Selected Total =",
            "DIVIDE([Total Sales], CALCULATE([Total Sales], ALLSELECTED(Products)))",
            "```",
            "This respects slicers. If the user picked Q1, the \"total\" becomes the Q1 total.",
            "Rule of thumb: **use `ALL` when you want a number that ignores the user. Use `ALLSELECTED` when you want a number that respects the user but ignores the visual's own slicing.**"
          ],
        },
        {
          heading: "Time intelligence: SAMEPERIODLASTYEAR, DATEADD, and the date table",
          paragraphs: [
            "Time intelligence has one **non-negotiable** requirement: a properly marked, continuous date table covering the full period. Without it, nothing works correctly. Every serious source — SQLBI, Microsoft Learn, specialist blogs like Casewhen and Elysiate — agrees.",
            "With a proper date table, year-over-year is a one-liner:",
            "```dax",
            "Sales Previous Year =",
            "CALCULATE([Total Sales], SAMEPERIODLASTYEAR(DimDate[Date]))",
            "```",
            "`SAMEPERIODLASTYEAR` takes the date range currently in filter context and returns the same range one year earlier. If the user is looking at \"May 2026,\" it returns \"May 2025.\"",
            "`DATEADD` is the flexible sibling:",
            "```dax",
            "Sales 3 Months Ago =",
            "CALCULATE([Total Sales], DATEADD(DimDate[Date], -3, MONTH))",
            "```",
            "And here's a detail Exceltown flags well: sometimes you need to add `ALL(DimDate)` as an extra argument to \"clear\" filters the visual is applying. Not always — only when you want to compare the same period while ignoring the visual's date slicing.",
            "YoY is the classic combo:",
            "```dax",
            "YoY % =",
            "VAR Current = [Total Sales]",
            "VAR Previous = [Sales Previous Year]",
            "RETURN DIVIDE(Current - Previous, Previous)",
            "```",
            "Notice the `VAR`. That brings us straight into the next topic."
          ],
        },
        {
          heading: "Performance: `VAR` is your best friend (and nested iterators, your worst enemy)",
          paragraphs: [
            "When a measure takes 8 seconds to open, it's usually one of three sins: you're computing the same thing repeatedly, you're nesting iterators that shouldn't be nested, or you're asking too much from the Formula Engine.",
            "### Use `VAR`. Always.",
            "```dax",
            "-- Bad",
            "Margin % =",
            "DIVIDE(",
            "[Total Sales] - [Total Cost],",
            "[Total Sales]",
            ")",
            "```",
            "Looks innocent, right? But `[Total Sales]` is calculated **twice**. The Formula Engine has no guaranteed internal cache for this.",
            "```dax",
            "-- Good",
            "Margin % =",
            "VAR Sales = [Total Sales]",
            "VAR Cost = [Total Cost]",
            "RETURN DIVIDE(Sales - Cost, Sales)",
            "```",
            "Each piece is computed once. Faster, more readable, and `VAR` \"freezes\" the value in that filter context — which prevents subtle bugs when combined with `CALCULATE` or context transition.",
            "### Nested iterators: the silent killer",
            "SQLBI famously published an article on optimizing nested iterators. The summary is brutal: each level of iteration multiplies the work. A `SUMX` inside another `SUMX` over 100k rows becomes 10 billion calculations. The Formula Engine chokes.",
            "Bad pattern:",
            "```dax",
            "Total Effort =",
            "SUMX(",
            "Products,",
            "SUMX(",
            "RELATEDTABLE(Sales),",
            "Sales[Quantity] * Products[BasePrice]",
            ")",
            ")",
            "```",
            "Almost always rewriteable as a single `SUMX` over the fact table, letting the storage engine (the famous \"VertiPaq\") do the heavy lifting:",
            "```dax",
            "Total Effort =",
            "SUMX(",
            "Sales,",
            "Sales[Quantity] * RELATED(Products[BasePrice])",
            ")",
            "```",
            "Rule of thumb: **iterate the fact table once, pull dimension columns with `RELATED`**. Storage engine is fast, formula engine is slow. Push work to storage whenever you can.",
            "### Measure or calculated column?",
            "A calculated column is processed at refresh, lives in RAM, takes space. A measure is computed at query time, on top of what the user asked.",
            "Rule: **if the value depends on user selection, it's a measure. If it's an intrinsic row attribute (product category, customer age bracket), it can be a column**. Don't use calculated columns to \"cache\" totals — you'll pay in model size and refresh time."
          ],
        },
        {
          heading: "The 2026 novelty: DAX User-Defined Functions",
          paragraphs: [
            "In April 2026, Microsoft released **DAX User-Defined Functions** in preview for Power BI Desktop. SQLBI and the official Microsoft docs already cover the basics.",
            "The idea: package reusable DAX logic inside the model itself. Instead of copy-pasting the same expression across 30 measures, you define a function once and use it everywhere.",
            "Syntax (simplified, conceptual):",
            "```dax",
            "FUNCTION Margin(sales, cost) =",
            "DIVIDE(sales - cost, sales)",
            "```",
            "Then in any measure:",
            "```dax",
            "Product Margin = Margin([Total Sales], [Total Cost])",
            "```",
            "Why is this big? Until April 2026, the only ways to reuse logic were copy-pasting (a maintenance nightmare) or creating intermediate measures (polluting the model). UDFs solve this with proper programming-language elegance.",
            "The gotchas SQLBI flags: it's still preview, performance must be tested case by case (UDFs aren't magic, they still go through the Formula Engine), and debugging gets less obvious when something fails inside one.",
            "Practical recommendation: start using UDFs for **pure utilities** (formatting, math helpers, string transforms). Keep complex business measures as traditional measures for now. When the feature leaves preview, expand."
          ],
        },
        {
          heading: "What to remember tomorrow morning",
          paragraphs: [
            "DAX rewards people who understand the rules and punishes people who memorize. Spend two afternoons playing with these ideas in DAX Studio, watching Storage Engine vs Formula Engine in the profiler, and your Power BI work moves to a new tier. Seriously.",
            "And when in doubt, remember: 80% of DAX errors are context errors. Go back to the basic question — **\"what context am I in at this point of the formula?\"** — and the answer shows up."
          ],
          bullets: [
            "**Filter context lives in measures, row context lives in iterators and calculated columns.** When you need to swap, use `CALCULATE` or an iterator.",
            "**`CALCULATE` overrides filters** and triggers **context transition** when called inside row context.",
            "**`ALL` is total wipe, `ALLSELECTED` respects the user.** Use them for % of total.",
            "**Time intelligence requires a decent date table.** `SAMEPERIODLASTYEAR` and `DATEADD` handle 90% of comparisons.",
            "**Performance:** `VAR` always, avoid nested iterators, prefer iterating the fact table once with `RELATED`.",
            "**Measure ≠ calculated column.** Don't use columns to cache totals.",
            "**DAX UDFs (April 2026, preview)** finally tackle logic reuse. Start with utilities."
          ],
        }
      ],
      conclusion: [
        "DAX rewards people who understand the rules and punishes people who memorize. Spend two afternoons playing with these ideas in DAX Studio, watching Storage Engine vs Formula Engine in the profiler, and your Power BI work moves to a new tier. Seriously.",
        "And when in doubt, remember: 80% of DAX errors are context errors. Go back to the basic question — **\"what context am I in at this point of the formula?\"** — and the answer shows up."
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
