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
    slug: "guia-completo-de-dax-calculate-filter-context-e-otimiza-o-de-performance",
    featured: false,
    locales: {
      "pt-br": {
        title: "Guia Completo de DAX: CALCULATE, Filter Context e Otimiza\u00e7\u00e3o de Performance",
        summary: "\ud83d\udcc5 Gerado: 2026-05-28 (Stephen)",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-05-29",
        readingTime: "1 min",
        intro: [
          "\ud83d\udcc5 Gerado: 2026-05-28 (Stephen)"
        ],
        sections: [
        ],
        conclusion: [
        ],
      },
      "en": {
        title: "Guia Completo de DAX: CALCULATE, Filter Context e Otimiza\u00e7\u00e3o de Performance",
        summary: "\ud83d\udcc5 Gerado: 2026-05-28 (Stephen)",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-05-29",
        readingTime: "1 min",
        intro: [
          "# Guia Completo de DAX em 2026: CALCULATE, Filter Context e Performance Sem Mist\u00e9rio Se voc\u00ea j\u00e1 abriu o Power BI, escreveu um `SUM`, viu funcionar, escreveu um `CALCULATE`, viu funcionar\u2026 e depois escreveu uma medida s\u00f3 um pouco mais complexa e o n\u00famero veio errado \u2014 bem-vindo ao clube. DAX \u00e9 assim: parece f\u00e1cil at\u00e9 o dia em que n\u00e3o \u00e9. A boa not\u00edcia? Existem s\u00f3 tr\u00eas ou quatro ideias por tr\u00e1s de 90% dos erros que voc\u00ea comete em DAX. Quando essas ideias caem a ficha, voc\u00ea para de \"decorar f\u00f3rmula\" e come\u00e7a a *desenhar* f\u00f3rmula. E como b\u00f4nus, em **abril de 2026** a Microsoft liberou em preview as **DAX User-Defined Functions (UDFs)**, que mudam um pouco como a gente reaproveita l\u00f3gica no modelo. Vou falar delas no final. A ideia desse guia \u00e9 simples: explicar CALCULATE, contextos, ALL/ALLSELECTED, time intelligence e performance como se a gente estivesse num caf\u00e9, n\u00e3o numa documenta\u00e7\u00e3o. Bora. ## Por que DAX \u00e9 a habilidade mais cara (e mais mal entendida) do Power BI DAX \u00e9, ao mesmo tempo, a linguagem mais procurada por analistas e a mais dif\u00edcil de explicar. A pr\u00f3pria Microsoft diz, na documenta\u00e7\u00e3o oficial, que \"entender e usar contexto de forma eficaz \u00e9 muito importante para construir f\u00f3rmulas de alta performance, an\u00e1lises din\u00e2micas e para resolver problemas em f\u00f3rmulas\". Tradu\u00e7\u00e3o: se voc\u00ea n\u00e3o entende contexto, voc\u00ea est\u00e1 chutando. E o problema n\u00e3o \u00e9 a sintaxe \u2014 \u00e9 que **DAX parece SQL, parece Excel, mas n\u00e3o \u00e9 nenhum dos dois**. Ela tem regras pr\u00f3prias. Se voc\u00ea tenta encaixar a l\u00f3gica de f\u00f3rmula de c\u00e9lula do Excel num modelo tabular, vira sopa. Vamos direto ao osso. ## Row context e filter context: os dois mundos paralelos do DAX Toda f\u00f3rmula DAX vive em um (ou dois) contextos ao mesmo tempo. **Row context** \u00e9 o \"mundo da linha\". Voc\u00ea s\u00f3 tem row context quando o DAX est\u00e1 iterando linha a linha \u2014 em colunas calculadas e dentro de fun\u00e7\u00f5es iteradoras como `SUMX`, `AVERAGEX`, `FILTER`. Dentro do row context, voc\u00ea consegue referenciar colunas direto: `Vendas[Quantidade] * Vendas[PrecoUnitario]` faz sentido porque DAX sabe em qual linha est\u00e1. **Filter context** \u00e9 o \"mundo do recorte\". Ele vem das visualiza\u00e7\u00f5es, dos slicers, dos argumentos do `CALCULATE`. \u00c9 o conjunto de filtros ativos no momento. Quando voc\u00ea arrasta uma matriz com \"Categoria\" nas linhas e \"Total de Vendas\" nos valores, cada c\u00e9lula tem um filter context diferente (uma para cada categoria). A confus\u00e3o cl\u00e1ssica: voc\u00ea escreve `Vendas[Quantidade] * Vendas[PrecoUnitario]` dentro de uma medida \u2014 e o Power BI d\u00e1 erro. Por qu\u00ea? Porque medida n\u00e3o tem row context. Medida vive em filter context. N\u00e3o existe \"a linha atual\" dentro de uma medida. A solu\u00e7\u00e3o? `SUMX(Vendas, Vendas[Quantidade] * Vendas[PrecoUnitario])`. O `SUMX` cria o row context que faltava. Essa \u00e9 a primeira regra de ouro: **medida = filter context, coluna calculada = row context**. Quando voc\u00ea precisa de uma na situa\u00e7\u00e3o da outra, voc\u00ea usa um iterador (`SUMX`, `AVERAGEX`, `FILTER`) ou usa o `CALCULATE` (que veremos j\u00e1 j\u00e1). ## CALCULATE: a fun\u00e7\u00e3o que muda o jogo (literalmente) `CALCULATE` \u00e9 a \u00fanica fun\u00e7\u00e3o em DAX que **muda o filter context**. Pensa nela como um teletransportador: voc\u00ea d\u00e1 uma express\u00e3o e um conjunto de filtros, e ela executa aquela express\u00e3o num universo paralelo onde os filtros que voc\u00ea pediu est\u00e3o ativos. Sintaxe b\u00e1sica: ```dax Vendas Eletr\u00f4nicos = CALCULATE( [Total Vendas], Produtos[Categoria] = \"Eletr\u00f4nicos\" ) ``` Esse \"Produtos[Categoria] = 'Eletr\u00f4nicos'\" \u00e9 a\u00e7\u00facar sint\u00e1tico. Por baixo dos panos, vira `FILTER(ALL(Produtos[Categoria]), Produtos[Categoria] = \"Eletr\u00f4nicos\")`. Isso \u00e9 importante porque o `ALL` ali est\u00e1 jogando fora qualquer filtro existente sobre `Categoria` e colocando o novo. \u00c9 por isso que `CALCULATE` **sobrescreve** filtros por padr\u00e3o. E a\u00ed vem a outra m\u00e1gica: a **context transition**. Quando voc\u00ea chama `CALCULATE` (ou qualquer medida, que \u00e9 s\u00f3 a\u00e7\u00facar para um `CALCULATE` impl\u00edcito) **dentro de um row context**, o DAX converte automaticamente aquela linha atual em filter context. Exemplo. Imagine uma coluna calculada na tabela `Produtos`: ```dax Vendas do Produto = CALCULATE([Total Vendas]) ``` Sem filtro nenhum. Sem nada. Por que funciona? Porque ao chamar `CALCULATE` dentro do row context da coluna calculada, o DAX transforma a linha atual (\"eu sou o produto SKU-123\") em um filtro (\"filter context: Produto = SKU-123\") e a\u00ed a medida calcula s\u00f3 para esse produto. Essa \u00fanica ideia \u2014 context transition \u2014 \u00e9 respons\u00e1vel por uns 30% dos \"por que esse n\u00famero est\u00e1 errado?\". Toda vez que voc\u00ea v\u00ea uma medida sendo chamada dentro de `SUMX`, `AVERAGEX`, `FILTER` ou coluna calculada, *pensa duas vezes*. A transi\u00e7\u00e3o est\u00e1 acontecendo. ## ALL vs ALLSELECTED: a dupla que ningu\u00e9m entende de primeira Hora de matar essa d\u00favida. **`ALL`** remove **todos** os filtros de uma tabela ou coluna. Ignora visual, slicer, tudo. \u00c9 a faxina total. **`ALLSELECTED`** remove os filtros **internos do visual atual**, mas **respeita** o que o usu\u00e1rio selecionou em slicers e em outros filtros do n\u00edvel externo. \u00c9 o equivalente a \"ignore s\u00f3 o que est\u00e1 na linha/coluna da minha matriz, mantenha o resto\". Caso pr\u00e1tico: voc\u00ea quer mostrar \"% do total\" numa matriz com Categoria e Subcategoria. ```dax % sobre Total Geral = DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALL(Produtos))) ``` Esse aqui sempre divide pelo total geral, sem importar o que o usu\u00e1rio fez no slicer. Bom para \"share absoluto\". ```dax % sobre Total Selecionado = DIVIDE([Total Vendas], CALCULATE([Total Vendas], ALLSELECTED(Produtos))) ``` Esse aqui respeita o slicer. Se o usu\u00e1rio filtrou para Q1, o \"total\" passa a ser o total do Q1. Regra pr\u00e1tica: **se voc\u00ea quer um n\u00famero que ignora o usu\u00e1rio, use `ALL`. Se quer um n\u00famero que respeita o usu\u00e1rio mas ignora o recorte do pr\u00f3prio visual, use `ALLSELECTED`.** ## Time intelligence: SAMEPERIODLASTYEAR, DATEADD e a tabela de datas Time intelligence em DAX exige uma coisa **inegoci\u00e1vel**: uma tabela de datas marcada como tabela de datas, cont\u00ednua, com todas as datas do per\u00edodo. Sem isso, nada funciona direito. Isso vem batido por todos os especialistas \u2014 SQLBI, Microsoft Learn, blogs especializados como Casewhen e Elysiate dizem a mesma coisa. Com a tabela de datas pronta, comparar ano contra ano vira uma linha: ```dax Vendas Ano Anterior = CALCULATE([Total Vendas], SAMEPERIODLASTYEAR(DimData[Data])) ``` O `SAMEPERIODLASTYEAR` pega o intervalo de datas que est\u00e1 no filter context atual e devolve o mesmo intervalo um ano antes. Se o usu\u00e1rio est\u00e1 olhando \"Maio de 2026\", ele devolve \"Maio de 2025\". `DATEADD` \u00e9 o irm\u00e3o flex\u00edvel: ```dax Vendas 3 Meses Atr\u00e1s = CALCULATE([Total Vendas], DATEADD(DimData[Data], -3, MONTH)) ``` E aqui vai um detalhe que o pessoal do Exceltown deixa claro: \u00e0s vezes voc\u00ea precisa adicionar `ALL(DimData)` como argumento extra para \"limpar\" filtros que o visual est\u00e1 aplicando. N\u00e3o \u00e9 sempre \u2014 \u00e9 quando voc\u00ea quer comparar com o mesmo per\u00edodo, ignorando o recorte da data. YoY virou cl\u00e1ssico: ```dax YoY % = VAR Atual = [Total Vendas] VAR Anterior = [Vendas Ano Anterior] RETURN DIVIDE(Atual - Anterior, Anterior) ``` Repara que eu usei `VAR`. Isso me leva direto para o pr\u00f3ximo assunto. ## Performance: VAR \u00e9 seu melhor amigo (e iteradores aninhados, o pior inimigo) Quando uma medida demora 8 segundos para abrir, geralmente \u00e9 um desses tr\u00eas pecados: voc\u00ea est\u00e1 calculando a mesma coisa v\u00e1rias vezes, est\u00e1 aninhando iteradores que n\u00e3o deviam ser aninhados, ou est\u00e1 pedindo coisa demais para o Formula Engine. ### Use `VAR`. Sempre que puder. ```dax -- Ruim Margem % = DIVIDE( [Total Vendas] - [Total Custo], [Total Vendas] ) ``` Parece inocente, n\u00e9? Mas `[Total Vendas]` \u00e9 calculado **duas vezes**. O Formula Engine n\u00e3o tem garantia de cach\u00ea interno a\u00ed. ```dax -- Bom Margem % = VAR Vendas = [Total Vendas] VAR Custo = [Total Custo] RETURN DIVIDE(Vendas - Custo, Vendas) ``` Agora cada coisa \u00e9 calculada uma vez. Al\u00e9m de ficar mais r\u00e1pido, fica mais leg\u00edvel \u2014 e VAR \"congela\" o valor naquele filter context, o que evita bugs sutis quando voc\u00ea combina com `CALCULATE` ou context transition. ### Iteradores aninhados: o assassino silencioso O SQLBI publicou um artigo c\u00e9lebre sobre otimiza\u00e7\u00e3o de iteradores aninhados. O resumo \u00e9 brutal: cada n\u00edvel de itera\u00e7\u00e3o multiplica o trabalho. Um `SUMX` dentro de outro `SUMX` que itera 100 mil linhas vira 10 bilh\u00f5es de c\u00e1lculos. O Formula Engine engasga. Padr\u00e3o problem\u00e1tico: ```dax Total Esfor\u00e7o = SUMX( Produtos, SUMX( RELATEDTABLE(Vendas), Vendas[Quantidade] * Produtos[PrecoBase] ) ) ``` Quase sempre d\u00e1 para reescrever como um \u00fanico `SUMX` sobre a tabela de fatos, deixando o engine de armazenamento (storage engine, o famoso \"VertiPaq\") fazer o trabalho pesado: ```dax Total Esfor\u00e7o = SUMX( Vendas, Vendas[Quantidade] * RELATED(Produtos[PrecoBase]) ) ``` Regra pr\u00e1tica: **itere a tabela de fatos uma vez, puxe colunas das dimens\u00f5es com `RELATED`**. Storage engine \u00e9 r\u00e1pido, formula engine \u00e9 lento. Empurra trabalho para o storage sempre que poss\u00edvel. ### Medida ou coluna calculada? Coluna calculada \u00e9 processada no refresh, fica na RAM, ocupa espa\u00e7o. Medida \u00e9 calculada em query time, em cima do que o usu\u00e1rio pediu. Regra: **se o valor depende da sele\u00e7\u00e3o do usu\u00e1rio, \u00e9 medida. Se \u00e9 um atributo intr\u00ednseco da linha (categoria do produto, faixa et\u00e1ria do cliente), pode ser coluna**. N\u00e3o use coluna calculada para \"cachear\" totais \u2014 voc\u00ea vai pagar isso em tamanho de modelo e em refresh lento. ## A novidade de 2026: DAX User-Defined Functions Em abril de 2026, a Microsoft liberou em preview as **DAX User-Defined Functions** no Power BI Desktop. A SQLBI e a documenta\u00e7\u00e3o oficial da Microsoft j\u00e1 t\u00eam material sobre. A ideia: empacotar l\u00f3gica DAX reutiliz\u00e1vel dentro do pr\u00f3prio modelo. Em vez de copiar e colar a mesma express\u00e3o em 30 medidas, voc\u00ea define uma fun\u00e7\u00e3o uma vez e usa em todo lugar. Sintaxe (simplificada, conceitual): ```dax FUNCTION Margem(vendas, custo) = DIVIDE(vendas - custo, vendas) ``` E a\u00ed, em qualquer medida: ```dax Margem Produtos = Margem([Total Vendas], [Total Custo]) ``` Por que isso \u00e9 grande? Porque, at\u00e9 abril de 2026, a \u00fanica forma de reaproveitar l\u00f3gica era copiar f\u00f3rmulas (ruim de manter) ou criar medidas intermedi\u00e1rias (poluem o modelo). UDFs resolvem isso com eleg\u00e2ncia de linguagem de programa\u00e7\u00e3o de verdade. Os \"gotchas\" que o pessoal da SQLBI alerta: ainda \u00e9 preview, performance precisa ser testada caso a caso (UDF n\u00e3o \u00e9 m\u00e1gica, ela ainda passa pelo Formula Engine), e a depura\u00e7\u00e3o \u00e9 menos \u00f3bvia quando algo d\u00e1 errado l\u00e1 dentro. Recomenda\u00e7\u00e3o pr\u00e1tica: comece usando UDFs em **utilit\u00e1rios puros** (formata\u00e7\u00e3o, c\u00e1lculos matem\u00e1ticos, transforma\u00e7\u00f5es de string). Deixe medidas de neg\u00f3cio complexas como medidas tradicionais por enquanto. Quando a feature sair de preview, expanda. ## Resumo do que importa lembrar amanh\u00e3 de manh\u00e3 - **Filter context vive em medidas, row context vive em iteradores e colunas calculadas.** Quando precisar trocar, use `CALCULATE` ou um iterador. - **`CALCULATE` sobrescreve filtros** e dispara **context transition** quando chamado dentro de row context. - **`ALL` \u00e9 faxina total, `ALLSELECTED` respeita o usu\u00e1rio.** Use isso para % do total. - **Time intelligence exige tabela de datas decente.** `SAMEPERIODLASTYEAR` e `DATEADD` resolvem 90% dos comparativos. - **Performance:** `VAR` sempre, evite iteradores aninhados, prefira iterar a fato uma vez com `RELATED`. - **Medida \u2260 coluna calculada.** N\u00e3o use coluna para cachear total. - **DAX UDFs (abril/2026, preview)** chegaram para resolver reaproveitamento de l\u00f3gica. Comece pelos utilit\u00e1rios. DAX premia quem entende as regras e pune quem decora. Se voc\u00ea dedicar duas tardes pra brincar com esses conceitos no DAX Studio, vendo Storage Engine vs Formula Engine no profiler, sua vida em Power BI muda de patamar. S\u00e9rio. E quando bater d\u00favida, lembra: 80% dos erros de DAX s\u00e3o erro de contexto. Volte para a pergunta b\u00e1sica \u2014 **\"em que contexto eu estou nesse ponto da f\u00f3rmula?\"** \u2014 e a resposta aparece. \ud83c\uddec\ud83c\udde7 *Vers\u00e3o em ingl\u00eas: ver anexo .md*"
        ],
        sections: [
        ],
        conclusion: [
        ],
      },
    },
  }
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
