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
    slug: "power-bi-direct-lake-mode-microsoft-fabric",
    locales: {
      "pt-br": {
        title: "Power BI Direct Lake Mode: O Segredo para Relatórios Ultra-Rápidos no Microsoft Fabric",
        summary:
          "Entenda como o Direct Lake combina a velocidade do Import Mode com dados quase em tempo real no Microsoft Fabric, e em quais cenários ele realmente vale a pena.",
        eyebrow: "Power BI e Fabric",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-02",
        readingTime: "6 min",
        body: [
          {
            type: "paragraph",
            text: "Seus relatórios do Power BI demoram para carregar? Você usa DirectQuery e sente que os visuais travam a cada filtro? Existe um modo de conexão que promete mudar isso — e ele já está disponível para quem usa o Microsoft Fabric.",
          },
          {
            type: "paragraph",
            text: "O **Direct Lake Mode** é o novo padrão de performance no ecossistema da Microsoft para Analytics. Neste artigo, você vai entender como ele funciona, quando faz sentido usá-lo e como ele se compara aos modos que você já conhece.",
          },
          {
            type: "heading",
            text: "Os três modos de conexão do Power BI",
          },
          {
            type: "paragraph",
            text: "Para entender o Direct Lake, primeiro precisamos revisitar o que já existe.",
          },
          { type: "heading", text: "Import Mode" },
          {
            type: "paragraph",
            text: "O modo mais popular. Os dados são copiados para dentro do Power BI, compactados na memória pelo motor VertiPaq e consultados com altíssima velocidade. O problema? Os dados só são atualizados quando você agenda um refresh — e datasets muito grandes podem demorar horas para carregar.",
          },
          {
            type: "paragraph",
            text: "**Use quando:** o dataset é de tamanho médio, os dados não precisam ser atualizados em tempo real e a velocidade de interação é prioridade.",
          },
          { type: "heading", text: "DirectQuery" },
          {
            type: "paragraph",
            text: "Neste modo, o Power BI não armazena nada. Cada clique em um visual gera uma consulta direta na fonte de dados. Os dados estão sempre atualizados, mas a performance depende totalmente de quão rápido o banco de dados responde — e isso pode ser lento.",
          },
          {
            type: "paragraph",
            text: "**Use quando:** os dados precisam estar sempre em tempo real ou o volume é grande demais para importar.",
          },
          { type: "heading", text: "Direct Lake Mode" },
          {
            type: "paragraph",
            text: "Aqui está o protagonista. O Direct Lake foi criado para ser o melhor dos dois mundos: a velocidade do Import Mode com a atualização quase em tempo real do DirectQuery — sem duplicar dados.",
          },
          {
            type: "paragraph",
            text: "**Use quando:** você opera dentro do Microsoft Fabric com tabelas Delta no OneLake e precisa de alta performance com dados sempre atualizados.",
          },
          {
            type: "heading",
            text: "Como o Direct Lake funciona na prática",
          },
          {
            type: "paragraph",
            text: "O Direct Lake não importa dados nem consulta a fonte original a cada clique. Em vez disso, ele conecta o modelo semântico do Power BI diretamente às **tabelas Delta armazenadas no OneLake** — o armazenamento unificado do Microsoft Fabric.",
          },
          {
            type: "paragraph",
            text: "O processo funciona assim:",
          },
          {
            type: "list",
            items: [
              "**Os dados ficam no OneLake**, armazenados em formato Parquet (eficiente para consultas colunares).",
              "**Quando uma consulta é executada**, o motor VertiPaq carrega para a memória apenas as colunas necessárias — não o dataset inteiro.",
              "**Quando os dados mudam na fonte**, o refresh do Direct Lake atualiza apenas os metadados. Isso leva segundos, não minutos ou horas.",
            ],
          },
          {
            type: "paragraph",
            text: "O resultado? Relatórios com tempo de resposta próximo ao do Import Mode, com dados que podem refletir mudanças em quase tempo real.",
          },
          {
            type: "heading",
            text: "Direct Lake on OneLake vs. Direct Lake on SQL",
          },
          {
            type: "paragraph",
            text: "Desde março de 2026, o modo **Direct Lake on OneLake** está em disponibilidade geral e é o recomendado pela Microsoft.",
          },
          {
            type: "list",
            items: [
              "Melhor compatibilidade com a segurança do OneLake",
              "Mais recursos de modelagem, incluindo colunas calculadas, que chegaram em abril de 2026",
              "Desempenho de consulta superior",
            ],
          },
          {
            type: "paragraph",
            text: "Já o **Direct Lake on SQL** usa o endpoint de análise SQL do Fabric e permite fallback para DirectQuery — útil em cenários específicos de permissões e governança.",
          },
          {
            type: "heading",
            text: "Quando o Direct Lake pode cair para DirectQuery (e o que fazer)",
          },
          {
            type: "paragraph",
            text: "Um ponto importante: o Direct Lake pode recorrer ao modo DirectQuery automaticamente em algumas situações.",
          },
          {
            type: "list",
            items: [
              "Consultas DAX muito complexas",
              "Relacionamentos de alta cardinalidade",
              "Limites de memória da capacidade do Fabric",
              "Uso de views em vez de tabelas físicas",
            ],
          },
          {
            type: "paragraph",
            text: "Isso se chama **fallback** e pode causar queda perceptível de performance. Para evitá-lo:",
          },
          {
            type: "list",
            items: [
              "Use **tabelas físicas** (não views) no Lakehouse",
              "**Otimize as tabelas Delta** com V-Order, já habilitado por padrão no Fabric",
              "**Dimensione corretamente a capacidade** do Fabric para o volume e concorrência esperados",
            ],
          },
          {
            type: "heading",
            text: "Comparativo rápido: Import vs. DirectQuery vs. Direct Lake",
          },
          {
            type: "list",
            items: [
              "**Dados armazenados** — Import Mode: na memória do Power BI | DirectQuery: na fonte original | Direct Lake: no OneLake (Delta)",
              "**Atualização** — Import Mode: agendada | DirectQuery: tempo real | Direct Lake: quase tempo real",
              "**Performance** — Import Mode: alta | DirectQuery: variável | Direct Lake: alta",
              "**Requer Fabric** — Import Mode: não | DirectQuery: não | Direct Lake: sim",
              "**Ideal para** — Import Mode: datasets médios | DirectQuery: dados em tempo real | Direct Lake: grandes volumes no Fabric",
            ],
          },
          {
            type: "heading",
            text: "Vale a pena migrar para o Direct Lake?",
          },
          {
            type: "paragraph",
            text: "Se a sua empresa já usa o Microsoft Fabric — ou está planejando migrar — a resposta é quase sempre sim. O Direct Lake reduz o custo de atualização, elimina a duplicação de dados e entrega performance equivalente ao Import Mode mesmo em grandes volumes.",
          },
          {
            type: "paragraph",
            text: "Mas se você ainda opera fora do Fabric, o Import Mode continua sendo a melhor opção para a maioria dos cenários. E o DirectQuery segue sendo necessário quando os dados precisam ser absolutamente em tempo real e a fonte de dados suporta bem a carga de consultas.",
          },
          {
            type: "paragraph",
            text: "A boa notícia é que o Direct Lake não é uma substituição radical — é uma evolução natural para quem cresce com o ecossistema da Microsoft.",
          },
          { type: "heading", text: "Conclusão" },
          {
            type: "paragraph",
            text: "O Direct Lake Mode representa uma mudança real na forma como o Power BI lida com dados em grande escala. Ao combinar a velocidade do VertiPaq com a flexibilidade do OneLake, a Microsoft resolveu um dos maiores trade-offs da plataforma: escolher entre performance e atualização.",
          },
          {
            type: "paragraph",
            text: "Se você trabalha com Analytics em um ambiente Fabric, vale estudar essa modalidade com cuidado — e começar a planejar uma migração gradual das suas soluções mais críticas.",
          },
        ],
      },
      en: {
        title: "Power BI Direct Lake Mode: The Secret to Ultra-Fast Reports in Microsoft Fabric",
        summary:
          "Learn how Direct Lake blends Import Mode speed with near real-time data in Microsoft Fabric, and where it actually makes sense in a modern Power BI architecture.",
        eyebrow: "Power BI and Fabric",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-02",
        readingTime: "6 min",
        body: [
          {
            type: "paragraph",
            text: "Are your Power BI reports taking too long to load? Do you use DirectQuery and find your visuals freezing with every filter? There's a connection mode that promises to change that — and it's already available for Microsoft Fabric users.",
          },
          {
            type: "paragraph",
            text: "**Direct Lake Mode** is the new performance standard in Microsoft's Analytics ecosystem. In this article, you'll understand how it works, when it makes sense to use it, and how it compares to the modes you already know.",
          },
          {
            type: "heading",
            text: "The Three Power BI Connection Modes",
          },
          {
            type: "paragraph",
            text: "To understand Direct Lake, we first need to revisit what already exists.",
          },
          { type: "heading", text: "Import Mode" },
          {
            type: "paragraph",
            text: "The most popular mode. Data is copied into Power BI, compressed in memory by the VertiPaq engine, and queried at very high speed. The catch? Data is only updated when you schedule a refresh — and very large datasets can take hours to load.",
          },
          {
            type: "paragraph",
            text: "**Use when:** the dataset is small to medium-sized, data doesn't need real-time updates, and interaction speed is the top priority.",
          },
          { type: "heading", text: "DirectQuery" },
          {
            type: "paragraph",
            text: "In this mode, Power BI stores nothing. Every click on a visual generates a direct query against the data source. Data is always up to date, but performance depends entirely on how fast the database responds — and that can be slow.",
          },
          {
            type: "paragraph",
            text: "**Use when:** data must always be in real time, or the volume is too large to import.",
          },
          { type: "heading", text: "Direct Lake Mode" },
          {
            type: "paragraph",
            text: "Here's the star of the show. Direct Lake was designed to be the best of both worlds: the speed of Import Mode combined with the near real-time freshness of DirectQuery — without duplicating data.",
          },
          {
            type: "paragraph",
            text: "**Use when:** you operate within Microsoft Fabric with Delta tables on OneLake and need high performance with always-current data.",
          },
          {
            type: "heading",
            text: "How Direct Lake Works in Practice",
          },
          {
            type: "paragraph",
            text: "Direct Lake neither imports data nor queries the original source on every click. Instead, it connects the Power BI semantic model directly to **Delta tables stored on OneLake** — Microsoft Fabric's unified storage layer.",
          },
          {
            type: "paragraph",
            text: "The process works like this:",
          },
          {
            type: "list",
            items: [
              "**Data lives on OneLake**, stored in Parquet format, which is efficient for columnar queries.",
              "**When a query runs**, the VertiPaq engine loads only the columns needed into memory — not the entire dataset.",
              "**When the data changes at the source**, the Direct Lake refresh updates only the metadata. This takes seconds, not minutes or hours.",
            ],
          },
          {
            type: "paragraph",
            text: "The result? Report response times close to Import Mode, with data that can reflect changes in near real time.",
          },
          {
            type: "heading",
            text: "Direct Lake on OneLake vs. Direct Lake on SQL",
          },
          {
            type: "paragraph",
            text: "Since March 2026, **Direct Lake on OneLake** has been generally available and is Microsoft's recommended option.",
          },
          {
            type: "list",
            items: [
              "Better compatibility with OneLake security",
              "More modeling features, including calculated columns introduced in April 2026",
              "Superior query performance",
            ],
          },
          {
            type: "paragraph",
            text: "**Direct Lake on SQL** uses the Fabric SQL analytics endpoint and allows fallback to DirectQuery — useful in specific permission and governance scenarios.",
          },
          {
            type: "heading",
            text: "When Direct Lake Falls Back to DirectQuery (and What to Do About It)",
          },
          {
            type: "paragraph",
            text: "An important note: Direct Lake can automatically fall back to DirectQuery mode in some situations.",
          },
          {
            type: "list",
            items: [
              "Highly complex DAX queries",
              "High-cardinality relationships",
              "Fabric capacity memory limits",
              "Using views instead of physical tables",
            ],
          },
          {
            type: "paragraph",
            text: "This is called **fallback**, and it can cause a noticeable drop in performance. To avoid it:",
          },
          {
            type: "list",
            items: [
              "Use **physical tables** rather than views in the Lakehouse",
              "**Optimize Delta tables** with V-Order, already enabled by default in Fabric",
              "**Right-size Fabric capacity** for expected data volume and concurrency",
            ],
          },
          {
            type: "heading",
            text: "Quick Comparison: Import vs. DirectQuery vs. Direct Lake",
          },
          {
            type: "list",
            items: [
              "**Data stored** — Import Mode: in Power BI memory | DirectQuery: at the original source | Direct Lake: in OneLake (Delta)",
              "**Refresh** — Import Mode: scheduled | DirectQuery: real time | Direct Lake: near real time",
              "**Performance** — Import Mode: high | DirectQuery: variable | Direct Lake: high",
              "**Requires Fabric** — Import Mode: no | DirectQuery: no | Direct Lake: yes",
              "**Best for** — Import Mode: medium datasets | DirectQuery: real-time data | Direct Lake: large volumes in Fabric",
            ],
          },
          {
            type: "heading",
            text: "Is It Worth Migrating to Direct Lake?",
          },
          {
            type: "paragraph",
            text: "If your organization already uses Microsoft Fabric — or is planning to migrate — the answer is almost always yes. Direct Lake reduces refresh costs, eliminates data duplication, and delivers Import Mode-equivalent performance even at large scale.",
          },
          {
            type: "paragraph",
            text: "But if you still operate outside of Fabric, Import Mode remains the best choice for most scenarios. And DirectQuery is still necessary when data must be absolutely real time and the data source handles query load well.",
          },
          {
            type: "paragraph",
            text: "The good news is that Direct Lake isn't a radical replacement — it's a natural evolution for teams growing within the Microsoft ecosystem.",
          },
          { type: "heading", text: "Conclusion" },
          {
            type: "paragraph",
            text: "Direct Lake Mode represents a real shift in how Power BI handles data at scale. By combining the speed of VertiPaq with the flexibility of OneLake, Microsoft resolved one of the platform's biggest trade-offs: choosing between performance and freshness.",
          },
          {
            type: "paragraph",
            text: "If you work with Analytics in a Fabric environment, this mode is worth studying carefully — and it's time to start planning a gradual migration of your most critical solutions.",
          },
        ],
      },
    },
  },
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
  {
    slug: "microsoft-fabric-vs-power-bi-em-2026-o-que-muda-de-verdade-na-sua-arquitetura-de-dados",
    featured: false,
    locales: {
      "pt-br": {
        title: "Microsoft Fabric vs Power BI em 2026: O que muda de verdade na sua arquitetura de dados",
        summary: "Se você está coçando a cabeça tentando entender se o Power BI \"morreu\" ou se virou Microsoft Fabric, respira. Você não está sozinho — e a confusão tem motivo.",
        eyebrow: "Power BI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-05-29",
        readingTime: "11 min",
        body: [
          {"type": "paragraph", "text": "Se você está coçando a cabeça tentando entender se o Power BI \"morreu\" ou se virou Microsoft Fabric, respira. Você não está sozinho — e a confusão tem motivo."},
          {"type": "paragraph", "text": "Em 2026 a Microsoft fez a maior reviravolta arquitetural do ecossistema BI da última década. O Power BI continua vivo, mas agora ele é uma peça dentro de um quebra-cabeça maior chamado Fabric. E essa diferença não é só marketing: muda como você modela, custa diferente, e até a forma como você escreve DAX ganhou um capítulo novo em abril deste ano."},
          {"type": "paragraph", "text": "Vou te explicar como se a gente estivesse num café, sem enrolação, com exemplos reais e os números que importam para a decisão."},
          {"type": "heading", "text": "A grande sacada: por que o Fabric existe"},
          {"type": "paragraph", "text": "Antes, o cenário típico de uma empresa média era mais ou menos assim: um Data Lake na Azure, um Synapse no meio, um Data Factory para mover coisa de lá pra cá, o Power BI no topo, e umas três cópias do mesmo dado espalhadas em formatos diferentes. Quem nunca?"},
          {"type": "paragraph", "text": "O Fabric chegou para resolver essa fragmentação. A ideia central é simples e ambiciosa: **um único storage chamado OneLake, um formato comum (Delta Parquet), e várias \"experiências\" rodando em cima do mesmo dado** — Lakehouse, Warehouse, Data Engineering, Real-Time Analytics, Data Science e, claro, Power BI."},
          {"type": "paragraph", "text": "Em outras palavras: você guarda o dado uma vez, e cada perfil técnico usa a ferramenta que prefere para consumir. O engenheiro escreve PySpark, o cara de SQL faz T-SQL, o analista cria visual em Power BI. Todo mundo lendo o mesmo arquivo Delta."},
          {"type": "paragraph", "text": "Isso é um divisor de águas. E é também onde a confusão começa, porque Power BI agora pode rodar de três formas diferentes — e a escolha errada custa caro."},
          {"type": "heading", "text": "Power BI tradicional ainda existe? Sim, mas..."},
          {"type": "paragraph", "text": "Quem só usa Power BI Pro com Import Mode e relatórios publicados no serviço pode dormir tranquilo. Esse modelo continua existindo e funcionando exatamente como sempre."},
          {"type": "paragraph", "text": "A mudança aparece quando você precisa de capacidade dedicada. Ali a história mudou: **as SKUs Premium P (P1, P2, P3) foram aposentadas e substituídas pelas SKUs Fabric F (F2 até F2048)**. Tem migração automática para clientes existentes, mas qualquer compra nova já é F-SKU."},
          {"type": "paragraph", "text": "Por que isso importa? Porque a F-SKU não é só uma renomeação da Premium. Ela é uma capacidade Azure de verdade — você paga via Azure, pode pausar quando quiser (e não pagar nada enquanto está pausada), e usa Capacity Units (CUs) compartilhadas entre todas as cargas Fabric, não só Power BI."},
          {"type": "paragraph", "text": "Em termos de bolso, a F64 (equivalente em CUs à antiga P1) custa em torno de US$ 8.412 por mês, fica perto de US$ 5.000 com reserva de 1 ano, e dá direito de distribuir conteúdo para usuários sem licença Pro — o famoso \"free viewer\". Antes desse limite, abaixo da F64, todo consumidor ainda precisa de licença Pro ou PPU. Isso muda muita conta no fim do ano."},
          {"type": "heading", "text": "OneLake: o \"OneDrive dos dados\""},
          {"type": "paragraph", "text": "Se eu precisasse explicar OneLake pra minha mãe, eu diria: é o OneDrive, só que pra dados corporativos. Um único lugar lógico onde todo dado da empresa vive, sem cópia, com endereço único."},
          {"type": "paragraph", "text": "Tecnicamente, o OneLake é construído sobre Azure Data Lake Storage Gen2 e armazena tudo em Delta Parquet — formato aberto, baseado em Apache Parquet com camada Delta para transações ACID. Isso quer dizer três coisas que mudam tudo:"},
          {"type": "list", "items": ["**Você não precisa duplicar dado pra usar em ferramenta diferente.** Quer ler com Spark? Lê. Quer rodar T-SQL? Roda. Quer criar modelo Power BI? Cria. Tudo no mesmo arquivo físico.", "**Shortcuts (atalhos)** permitem virtualizar dados que estão em outros lugares — S3 da AWS, ADLS Gen2 fora do Fabric, Google Cloud Storage. Sem mover byte, você consulta como se fosse local.", "**Governança e linhagem ficam centralizadas.** Microsoft Purview vê tudo, label de sensibilidade desce automaticamente, audit é uniforme."]},
          {"type": "paragraph", "text": "Resumindo: o OneLake é a fundação. Sem entender essa peça, qualquer escolha de arquitetura no Fabric fica torta."},
          {"type": "heading", "text": "Direct Lake: o modo que mudou o jogo (e ganhou superpoderes em abril/2026)"},
          {"type": "paragraph", "text": "Aqui mora o pulo do gato. Até pouco tempo, suas opções no Power BI eram duas: **Import** (cópia em memória, rápido, mas tem que processar) ou **DirectQuery** (consulta ao vivo no banco, sempre fresco, mas geralmente mais lento)."},
          {"type": "paragraph", "text": "O Direct Lake é uma terceira via. Ele lê **diretamente os arquivos Delta Parquet do OneLake**, carrega na memória do VertiPaq sob demanda (page by page), e te entrega a performance de Import com o frescor do DirectQuery. Sem refresh agendado, sem cópia, sem dataset replicado."},
          {"type": "paragraph", "text": "Na prática: você atualiza o Lakehouse, e o modelo Power BI já enxerga o dado novo na próxima consulta. Sonho, né? E é. Mas até abril de 2026 tinha um limite que travava muita gente: **não dava pra criar colunas calculadas nem tabelas calculadas em DAX**. Quem precisava de uma coluna `Faturamento * 1.13` tinha que voltar pra Import ou criar no Lakehouse via T-SQL."},
          {"type": "paragraph", "text": "Em abril de 2026, a Microsoft liberou em preview as **colunas calculadas e tabelas calculadas no Direct Lake**. Você ativa o recurso no Desktop, escreve seu DAX, publica. Funciona. O catch: ainda é só no Desktop, edição no serviço não existe — você publica, depois precisa republicar para alterar. Mas pra 80% dos casos, já desbloqueou."},
          {"type": "paragraph", "text": "E tem mais: a Microsoft separou o Direct Lake em duas variantes:"},
          {"type": "list", "items": ["**Direct Lake on SQL Endpoint** — a versão clássica, que passa pelo SQL endpoint do Lakehouse/Warehouse. É mais simples de configurar.", "**Direct Lake on OneLake** — a versão nova, que integra com a segurança do OneLake (OneSecurity), permite RLS/CLS no nível do storage e suporta os recursos novos de DAX. É o futuro, mas exige mais setup."]},
          {"type": "paragraph", "text": "Se você está começando agora, pule direto para Direct Lake on OneLake."},
          {"type": "heading", "text": "Lakehouse vs Warehouse: o eterno dilema"},
          {"type": "paragraph", "text": "Outra dúvida campeã: dentro do Fabric, eu uso Lakehouse ou Warehouse? Os dois armazenam em Delta no OneLake, então qual a diferença?"},
          {"type": "paragraph", "text": "Vou simplificar com uma analogia: o **Lakehouse é como sua geladeira** — você guarda qualquer coisa, em qualquer formato (JSON, CSV, imagens, vídeos, Delta), e tem flexibilidade total. O **Warehouse é como o pote de açúcar** — só serve para uma coisa (dados estruturados), mas é otimizado pra isso e tem regras claras."},
          {"type": "paragraph", "text": "Mais formalmente:"},
          {"type": "paragraph", "text": "**Use Lakehouse quando:**"},
          {"type": "list", "items": ["Tem dados não estruturados ou semiestruturados (logs, JSON, imagens)", "Sua equipe domina PySpark / Notebooks", "Precisa fazer Data Science / ML em cima dos mesmos dados", "Quer ingestão flexível, schema-on-read"]},
          {"type": "paragraph", "text": "**Use Warehouse quando:**"},
          {"type": "list", "items": ["Dado é puramente tabular, com schema rígido", "Sua equipe é forte em T-SQL, vem do mundo SQL Server", "Precisa de transações ACID multi-tabela (e elas estão muito melhores em 2026, com DDL transacional verdadeiro)", "Quer um modelo relacional clássico com stored procedures, views, constraints"]},
          {"type": "paragraph", "text": "E o melhor: nada te obriga a escolher um. Padrão comum em 2026 é **Medallion Architecture** com Bronze e Silver em Lakehouse (ingestão e refinamento) e Gold em Warehouse (camada de consumo curada). O Power BI conecta no Gold via Direct Lake. Cada camada com a ferramenta certa."},
          {"type": "heading", "text": "A famosa tabela comparativa (versão honesta)"},
          {"type": "list", "items": ["Aspecto | Power BI Premium clássico | Microsoft Fabric", "Storage | Modelo importado, dataset isolado | OneLake compartilhado, Delta Parquet", "Licença de capacidade | P1/P2/P3 (descontinuada) | F2 → F2048", "Modos de conexão | Import, DirectQuery, Dual | + Direct Lake (on SQL ou on OneLake)", "Free viewer (sem Pro) | Apenas P-SKU | F64 ou superior", "Pausa de capacidade | Não permitido | Sim, billing para", "Workloads suportadas | Apenas Power BI | Power BI, Data Engineering, DW, RTA, Data Science, Data Factory", "Governança | Power BI Admin Portal | Fabric Admin + Purview integrado", "Faturamento | Mensal fixo, M365 | Azure (MACC elegível), por hora"]},
          {"type": "paragraph", "text": "Note que em muitos pontos o Fabric não substitui — ele engloba e expande."},
          {"type": "heading", "text": "Quanto custa de verdade? O que você precisa saber sobre F-SKUs"},
          {"type": "paragraph", "text": "A pergunta que todo mundo faz: \"Vou pagar mais ou menos?\""},
          {"type": "paragraph", "text": "Resposta honesta: **depende muito do seu padrão de uso**. Algumas regras práticas:"},
          {"type": "list", "items": ["Quem usava P1 24/7 e ficou na F64 paga aproximadamente o mesmo (com leve vantagem em reserva anual).", "Quem usa apenas em horário comercial e pausa de noite/fim de semana pode economizar **30-50%** facilmente.", "Quem tinha P-SKU só pelo \"free viewer\" mas usava pouca computação pode descer pra F32 + licenças Pro individuais e economizar.", "Quem está crescendo e precisa de Spark, pipelines e DW além de Power BI agora consolida tudo numa única conta — antes seriam três produtos diferentes."]},
          {"type": "paragraph", "text": "O ponto-chave é: **CUs são compartilhadas**. Se seu time roda Spark de manhã e relatórios à tarde, dá pra dimensionar de forma muito mais inteligente do que com a Premium antiga, onde cada produto era ilha."},
          {"type": "paragraph", "text": "Dica prática: começa em F2 ou F4 pra POC, mede o consumo de CU pelo Capacity Metrics App, e só depois decide o tamanho de produção. Erro mais comum em 2026 é comprar grande demais \"por garantia\"."},
          {"type": "heading", "text": "Para o analista de BI, o que muda no dia a dia?"},
          {"type": "paragraph", "text": "Se você é a pessoa que abre o Power BI Desktop, faz modelo, escreve DAX e publica, a vida em 2026 é assim:"},
          {"type": "list", "items": ["**Conexões novas**: aparece \"Lakehouse\" e \"Warehouse\" no Get Data. Você não precisa mais combinar com o time de engenharia onde está o dado — está no OneLake, fim.", "**Direct Lake como default**: ao criar um semantic model a partir de um Lakehouse, o modo padrão vira Direct Lake. Você usa, mede performance, e só muda pra Import se for nichado.", "**DAX continua sendo DAX**, mas com novidades: User Defined Functions (UDFs), calculation groups muito melhores, e as colunas calculadas no Direct Lake liberadas em preview.", "**Q&A está saindo**: a Microsoft confirmou a deprecação do Q&A clássico para **dezembro de 2026**. O substituto é o Copilot, que exige modelo bem documentado e medidas com bons nomes pra funcionar bem. Se você ignorou nomenclatura até hoje, é hora de levar a sério.", "**Power BI Desktop fica ainda mais conectado**: salvar projeto direto no workspace Fabric, editar no browser, integração com Git nativa. Versionamento de relatório virou padrão."]},
          {"type": "paragraph", "text": "A boa notícia: nada do que você sabe foi pro lixo. Tudo o que se acumulou em DAX, modelagem dimensional, boas práticas de UX continua valendo. O que muda é onde o dado mora e como você liga nele."},
          {"type": "heading", "text": "Checklist de migração para 2026 (sem drama)"},
          {"type": "paragraph", "text": "Se você está pensando em pular pro Fabric ainda neste ano, segue um caminho que funciona:"},
          {"type": "list", "items": ["**Mapeie o que você tem hoje**: datasets em Import, gateways on-premises, refresh schedules, RLS configurado.", "**Pegue uma capacidade pequena (F2 ou F4)** para POC. Custa pouco e dá pra brincar à vontade.", "**Crie um Lakehouse de teste** e traga um único dataset prioritário, em Delta.", "**Reconstrua o semantic model em Direct Lake on OneLake** e compare performance com o original.", "**Valide RLS, autoria, refresh comportamento e Copilot** no ambiente Fabric.", "**Documente o que precisa virar Warehouse** (camada Gold com schema rígido) e o que fica no Lakehouse.", "**Planeje migração de Q&A para Copilot** se você usa Q&A — você tem até dezembro de 2026.", "**Só depois disso decida o tamanho de F-SKU de produção** e a estratégia de pausar/escalar."]},
          {"type": "paragraph", "text": "Pular as etapas 2-5 é a melhor receita para arrependimento. Já vi gente comprar F64 sem ter rodado uma POC e gastar três meses descobrindo que metade da arquitetura precisava ser repensada."},
          {"type": "heading", "text": "FAQ rápido"},
          {"type": "paragraph", "text": "**O Power BI vai acabar?** Não. Power BI é a experiência de BI dentro do Fabric. O nome continua e o produto também. O que muda é o \"chassis\" embaixo."},
          {"type": "paragraph", "text": "**Preciso migrar agora?** Não. Mas se você está em P-SKU, a transição é inevitável até o fim de 2026. Vale começar a POC já."},
          {"type": "paragraph", "text": "**Direct Lake é sempre melhor que Import?** Não. Para modelos pequenos, com lógica DAX complexa e pouca freshness requerida, Import ainda ganha em alguns benchmarks. Direct Lake brilha em volume grande + necessidade de dado fresco."},
          {"type": "paragraph", "text": "**Posso usar Fabric sem Power BI?** Pode, embora o Power BI seja a porta de entrada da maioria. Engenheiros podem viver no Lakehouse e Spark sem nunca abrir um relatório."},
          {"type": "paragraph", "text": "**Quanto tempo leva uma migração média?** Para um departamento com 20-30 relatórios e um modelo medianamente complexo, conta entre 4 e 8 semanas para pôr a primeira carga em produção bem feita."},
          {"type": "heading", "text": "O que esperar daqui pra frente"},
          {"type": "paragraph", "text": "A direção é clara: Microsoft Fabric vai ser a plataforma de dados única do ecossistema MS, e o Power BI vai continuar evoluindo dentro dela. Copilot fica cada vez mais central, Direct Lake amadurece e vira o modo padrão para a maioria dos casos, e a governança fica unificada via Purview."},
          {"type": "paragraph", "text": "Se você é analista, engenheiro ou gestor de BI, ignorar essa mudança em 2026 não é mais uma opção — é uma dívida técnica acumulando juros. A boa notícia é que dá pra começar pequeno, sem ruptura, e o caminho é bem menos assustador do que parece quando você só lê manchete."},
          {"type": "paragraph", "text": "Comece com uma POC. Pegue uma F2. Migre um relatório. Sinta na pele. Aí você decide."},
          {"type": "paragraph", "text": "E quando bater dúvida, lembra: o dado mora no OneLake, o consumo vira capacidade, e o Power BI ainda é o lugar onde a história fica visual. O resto é detalhe (importante, mas detalhe)."},
        ],
      },
      en: {
        title: "Microsoft Fabric vs Power BI in 2026: What Actually Changes in Your Data Architecture",
        summary: "If you've been scratching your head trying to figure out whether Power BI is \"dead\" or has just become Microsoft Fabric, take a breath. You're not alone — and the confusion makes sense.",
        eyebrow: "Power BI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-05-29",
        readingTime: "10 min",
        body: [
          {"type": "paragraph", "text": "If you've been scratching your head trying to figure out whether Power BI is \"dead\" or has just become Microsoft Fabric, take a breath. You're not alone — and the confusion makes sense."},
          {"type": "paragraph", "text": "In 2026, Microsoft pulled off the biggest architectural shift in the BI ecosystem of the last decade. Power BI is still alive, but it's now one piece inside a bigger puzzle called Fabric. And the difference isn't just marketing: it changes how you model data, what you pay, and even how you write DAX got a new chapter in April this year."},
          {"type": "paragraph", "text": "Let me walk you through it like we're at a coffee shop — no fluff, real examples, and the numbers that actually matter for the decision."},
          {"type": "heading", "text": "The big idea: why Fabric exists"},
          {"type": "paragraph", "text": "A few years ago, the typical mid-sized company setup looked roughly like this: an Azure Data Lake here, Synapse in the middle, Data Factory shuttling data around, Power BI on top, and three copies of the same data spread across different formats. Familiar story?"},
          {"type": "paragraph", "text": "Fabric showed up to solve that fragmentation. The core idea is simple and ambitious: **one storage called OneLake, one common format (Delta Parquet), and multiple \"experiences\" running on top of the same data** — Lakehouse, Warehouse, Data Engineering, Real-Time Analytics, Data Science, and yes, Power BI."},
          {"type": "paragraph", "text": "In other words: you store data once, and each technical role uses the tool they prefer to consume it. The engineer writes PySpark, the SQL person runs T-SQL, the analyst builds visuals in Power BI. Everyone reading the same Delta file."},
          {"type": "paragraph", "text": "That's a game-changer. It's also where confusion begins, because Power BI can now run in three different modes — and picking the wrong one gets expensive."},
          {"type": "heading", "text": "Does classic Power BI still exist? Yes, but..."},
          {"type": "paragraph", "text": "If you just use Power BI Pro with Import Mode and reports published to the service, sleep easy. That model still exists and works exactly like always."},
          {"type": "paragraph", "text": "The shift kicks in when you need dedicated capacity. **Premium P-SKUs (P1, P2, P3) have been retired and replaced by Fabric F-SKUs (F2 through F2048).** Existing customers get auto-migration, but any new purchase is F-SKU."},
          {"type": "paragraph", "text": "Why does that matter? Because F-SKU isn't just a Premium rename. It's a real Azure capacity — billed through Azure, pausable on demand (you pay zero while paused), and using Capacity Units (CUs) shared across all Fabric workloads, not just Power BI."},
          {"type": "paragraph", "text": "In wallet terms, an F64 (the CU equivalent of the old P1) runs around US$ 8,412/month, drops to roughly US$ 5,000 with a 1-year reservation, and unlocks free viewer rights — letting unlicensed users consume content. Below F64, every consumer still needs a Pro or PPU license. That math changes a lot of year-end budgets."},
          {"type": "heading", "text": "OneLake: the \"OneDrive for data\""},
          {"type": "paragraph", "text": "If I had to explain OneLake to my mom, I'd say it's OneDrive but for corporate data. A single logical place where all company data lives, no copies, with a unique address."},
          {"type": "paragraph", "text": "Technically, OneLake sits on top of Azure Data Lake Storage Gen2 and stores everything in Delta Parquet — an open format based on Apache Parquet with a Delta layer for ACID transactions. That means three things that change everything:"},
          {"type": "list", "items": ["**You don't have to duplicate data to use it in different tools.** Want to read with Spark? Read it. Want T-SQL? Run it. Want to build a Power BI model? Build it. Same physical file.", "**Shortcuts** let you virtualize data living elsewhere — AWS S3, ADLS Gen2 outside Fabric, Google Cloud Storage. Without moving a byte, you query it as if it were local.", "**Governance and lineage become centralized.** Microsoft Purview sees everything, sensitivity labels flow automatically, audit is uniform."]},
          {"type": "paragraph", "text": "Bottom line: OneLake is the foundation. Without grasping that piece, every architectural decision in Fabric ends up crooked."},
          {"type": "heading", "text": "Direct Lake: the mode that changed everything (and got superpowers in April 2026)"},
          {"type": "paragraph", "text": "Here's the real magic. Until recently, your Power BI options were two: **Import** (in-memory copy, fast, but requires refresh) or **DirectQuery** (live database query, always fresh, but usually slower)."},
          {"type": "paragraph", "text": "Direct Lake is a third path. It reads **Delta Parquet files directly from OneLake**, loads them into VertiPaq memory on demand (page by page), and gives you Import-like performance with DirectQuery freshness. No scheduled refresh, no copy, no replicated dataset."},
          {"type": "paragraph", "text": "In practice: you update the Lakehouse, and the Power BI model sees the new data on the next query. Sounds like a dream? It is. But until April 2026 there was a limit that blocked many teams: **you couldn't create calculated columns or calculated tables in DAX**. Anyone needing a `Revenue * 1.13` column had to go back to Import or build it in the Lakehouse via T-SQL."},
          {"type": "paragraph", "text": "In April 2026, Microsoft released **calculated columns and calculated tables in Direct Lake** as a preview. You enable the feature in Desktop, write your DAX, publish. It works. The catch: still Desktop-only, no in-service editing — you publish, and to change you republish. But for 80% of cases, it's unblocked."},
          {"type": "paragraph", "text": "There's more: Microsoft also split Direct Lake into two flavors:"},
          {"type": "list", "items": ["**Direct Lake on SQL Endpoint** — the classic version, going through the Lakehouse/Warehouse SQL endpoint. Easier to set up.", "**Direct Lake on OneLake** — the newer version, integrated with OneLake security (OneSecurity), supports RLS/CLS at the storage layer, and unlocks the new DAX features. It's the future, but needs more setup."]},
          {"type": "paragraph", "text": "If you're starting fresh, jump straight to Direct Lake on OneLake."},
          {"type": "heading", "text": "Lakehouse vs Warehouse: the eternal dilemma"},
          {"type": "paragraph", "text": "Another champion question: inside Fabric, do I use Lakehouse or Warehouse? Both store in Delta on OneLake — so what's the difference?"},
          {"type": "paragraph", "text": "Let me simplify with an analogy: the **Lakehouse is your fridge** — you can store anything, in any format (JSON, CSV, images, videos, Delta), with total flexibility. The **Warehouse is the sugar jar** — it only holds one thing (structured data), but it's optimized for it and has clear rules."},
          {"type": "paragraph", "text": "More formally:"},
          {"type": "paragraph", "text": "**Use Lakehouse when:**"},
          {"type": "list", "items": ["You have unstructured or semi-structured data (logs, JSON, images)", "Your team is comfortable with PySpark / Notebooks", "You need Data Science / ML on the same data", "You want flexible ingestion, schema-on-read"]},
          {"type": "paragraph", "text": "**Use Warehouse when:**"},
          {"type": "list", "items": ["Data is purely tabular, with strict schema", "Your team is strong in T-SQL, coming from SQL Server world", "You need multi-table ACID transactions (much improved in 2026 with true transactional DDL)", "You want a classic relational model with stored procedures, views, constraints"]},
          {"type": "paragraph", "text": "And the best part: nothing forces you to pick just one. A common 2026 pattern is **Medallion Architecture** with Bronze and Silver in Lakehouse (ingestion and refinement) and Gold in Warehouse (curated consumption layer). Power BI connects to Gold via Direct Lake. Each layer with the right tool."},
          {"type": "heading", "text": "The famous comparison table (honest version)"},
          {"type": "list", "items": ["Aspect | Classic Power BI Premium | Microsoft Fabric", "Storage | Imported model, isolated dataset | Shared OneLake, Delta Parquet", "Capacity license | P1/P2/P3 (retired) | F2 → F2048", "Connection modes | Import, DirectQuery, Dual | + Direct Lake (on SQL or on OneLake)", "Free viewer (no Pro) | P-SKU only | F64 or higher", "Capacity pause | Not allowed | Yes, billing stops", "Supported workloads | Power BI only | Power BI, Data Engineering, DW, RTA, Data Science, Data Factory", "Governance | Power BI Admin Portal | Fabric Admin + integrated Purview", "Billing | Flat monthly, M365 | Azure (MACC eligible), hourly"]},
          {"type": "paragraph", "text": "Notice that in many points Fabric doesn't replace — it encompasses and expands."},
          {"type": "heading", "text": "What does it actually cost? What you need to know about F-SKUs"},
          {"type": "paragraph", "text": "The question everyone asks: \"Will I pay more or less?\""},
          {"type": "paragraph", "text": "Honest answer: **it really depends on your usage pattern.** Some practical rules:"},
          {"type": "list", "items": ["Anyone running P1 24/7 who landed on F64 pays roughly the same (slight win with annual reservation).", "Anyone using only business hours, pausing nights/weekends, can save **30-50%** easily.", "Anyone who had a P-SKU just for the \"free viewer\" but used little compute can drop to F32 + individual Pro licenses and save.", "Anyone growing and needing Spark, pipelines, and DW beyond Power BI now consolidates into one account — previously that meant three separate products."]},
          {"type": "paragraph", "text": "The key point is: **CUs are shared.** If your team runs Spark in the morning and reports in the afternoon, you can size much smarter than with old Premium, where each product was an island."},
          {"type": "paragraph", "text": "Practical tip: start with F2 or F4 for POC, measure CU consumption via Capacity Metrics App, then decide your production size. The most common 2026 mistake is buying too big \"just to be safe.\""},
          {"type": "heading", "text": "For the BI analyst, what changes day-to-day?"},
          {"type": "paragraph", "text": "If you're the person who opens Power BI Desktop, builds a model, writes DAX, and publishes, life in 2026 looks like this:"},
          {"type": "list", "items": ["**New connections**: \"Lakehouse\" and \"Warehouse\" appear in Get Data. You no longer have to coordinate with the engineering team about where the data lives — it's in OneLake, period.", "**Direct Lake as default**: when creating a semantic model from a Lakehouse, the default mode is Direct Lake. You use it, measure performance, and only switch to Import for niche cases.", "**DAX is still DAX**, with novelties: User Defined Functions (UDFs), much better calculation groups, and the calculated columns in Direct Lake released in preview.", "**Q&A is going away**: Microsoft confirmed the deprecation of classic Q&A for **December 2026**. The replacement is Copilot, which requires a well-documented model with good measure names to work well. If you've been sloppy with naming, time to get serious.", "**Power BI Desktop gets even more connected**: save projects directly to the Fabric workspace, edit in the browser, native Git integration. Report versioning is now standard."]},
          {"type": "paragraph", "text": "Good news: nothing you know went to waste. Everything you've accumulated in DAX, dimensional modeling, UX best practices still applies. What changes is where the data lives and how you connect to it."},
          {"type": "heading", "text": "2026 migration checklist (no drama)"},
          {"type": "paragraph", "text": "If you're thinking about jumping to Fabric this year, here's a path that works:"},
          {"type": "list", "items": ["**Map what you have today**: Import datasets, on-premises gateways, refresh schedules, configured RLS.", "**Get a small capacity (F2 or F4)** for POC. Costs little, lets you play freely.", "**Create a test Lakehouse** and bring in a single priority dataset, in Delta.", "**Rebuild the semantic model in Direct Lake on OneLake** and compare performance with the original.", "**Validate RLS, authoring, refresh behavior, and Copilot** in the Fabric environment.", "**Document what needs to be Warehouse** (Gold layer, strict schema) and what stays in Lakehouse.", "**Plan Q&A to Copilot migration** if you use Q&A — you have until December 2026.", "**Only then decide production F-SKU size** and pause/scale strategy."]},
          {"type": "paragraph", "text": "Skipping steps 2-5 is the best recipe for regret. I've seen people buy F64 without running a POC and burn three months figuring out half the architecture had to be rethought."},
          {"type": "heading", "text": "Quick FAQ"},
          {"type": "paragraph", "text": "**Is Power BI going away?** No. Power BI is the BI experience inside Fabric. The name stays, so does the product. What changes is the \"chassis\" underneath."},
          {"type": "paragraph", "text": "**Do I need to migrate now?** No. But if you're on P-SKU, the transition is inevitable by end of 2026. Worth starting the POC now."},
          {"type": "paragraph", "text": "**Is Direct Lake always better than Import?** No. For small models with complex DAX logic and low freshness needs, Import still wins in some benchmarks. Direct Lake shines on big volume + fresh data needs."},
          {"type": "paragraph", "text": "**Can I use Fabric without Power BI?** Yes, although Power BI is most people's entry door. Engineers can live in Lakehouse and Spark without ever opening a report."},
          {"type": "paragraph", "text": "**How long does an average migration take?** For a department with 20-30 reports and a moderately complex model, count on 4 to 8 weeks to get the first workload solidly in production."},
          {"type": "heading", "text": "What to expect going forward"},
          {"type": "paragraph", "text": "The direction is clear: Microsoft Fabric will be the unified data platform of the MS ecosystem, and Power BI will keep evolving inside it. Copilot becomes increasingly central, Direct Lake matures into the default mode for most cases, and governance gets unified through Purview."},
          {"type": "paragraph", "text": "If you're an analyst, engineer, or BI manager, ignoring this shift in 2026 isn't an option anymore — it's technical debt collecting interest. The good news is you can start small, without disruption, and the path is much less scary than headlines make it seem."},
          {"type": "paragraph", "text": "Start with a POC. Grab an F2. Migrate one report. Feel it. Then decide."},
          {"type": "paragraph", "text": "And when in doubt, remember: the data lives in OneLake, consumption becomes capacity, and Power BI is still where the story turns into visuals. The rest is detail (important, but detail)."},
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
