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
    slug: "microsoft-fabric-free-vale-a-pena-2026",
    featured: false,
    locales: {
      "pt-br": {
        title: "Microsoft Fabric Free vale a pena? O que dá para fazer de graça em 2026",
        summary:
          "Entenda a diferença entre o trial gratuito de 60 dias e a licença permanente do Microsoft Fabric, o que cada um permite fazer e em quais cenários faz sentido começar sem pagar nada.",
        eyebrow: "Microsoft Fabric",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-08-27",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "Quando a Microsoft anunciou o Microsoft Fabric, muita gente ficou curiosa sobre o que conseguiria usar sem pagar nada. A resposta curta: dá para fazer bastante coisa, mas tem um porém que ninguém quer ouvir.",
          },
          {
            type: "paragraph",
            text: "A boa notícia é que existe um trial generoso. A má notícia é que \"gratuito para sempre\" e \"gratuito por 60 dias\" são conceitos bem diferentes, e a Microsoft às vezes deixa essa distinção propositalmente embaçada.",
          },
          {
            type: "paragraph",
            text: "Aqui vai a explicação sem rodeios.",
          },
          {
            type: "heading",
            text: "O que é o Microsoft Fabric, afinal?",
          },
          {
            type: "paragraph",
            text: "O Microsoft Fabric é a plataforma de analytics da Microsoft que reúne Power BI, Data Factory, Data Engineering, Data Science e Real-Time Intelligence em um único lugar. Em vez de contratar vários serviços separados, você tem tudo dentro do mesmo ambiente, compartilhando o mesmo armazenamento (o OneLake) e o mesmo modelo de capacidade.",
          },
          {
            type: "paragraph",
            text: "É uma proposta interessante, especialmente para quem já vive dentro do ecossistema Microsoft. A integração com Microsoft 365, Azure e Dynamics é quase transparente.",
          },
          {
            type: "heading",
            text: "O gratuito do Fabric: duas coisas diferentes",
          },
          {
            type: "paragraph",
            text: "Quando alguém pesquisa \"Microsoft Fabric Free\", está na verdade falando de dois modelos distintos. Confundi-los é o erro mais comum.",
          },
          {
            type: "heading",
            text: "Trial de 60 dias",
          },
          {
            type: "paragraph",
            text: "O trial é o mais robusto dos dois. Você ganha acesso a uma capacidade equivalente a F64 (64 unidades de capacidade), além de 1 TB de armazenamento no OneLake. Durante esse período, pode criar pipelines, notebooks, lakehouses, warehouses e colaborar em workspaces com outros usuários.",
          },
          {
            type: "paragraph",
            text: "O que não funciona no trial:",
          },
          {
            type: "list",
            items: [
              "Copilot e recursos de IA (Data Agent, funções de IA, AI Services)",
              "Private Link para ambientes com requisitos de rede mais rígidos",
              "Trusted Workspace Access, que é o controle de acesso avançado para dados sensíveis",
            ],
          },
          {
            type: "paragraph",
            text: "São limitações que, para quem está avaliando a plataforma, provavelmente não vão fazer diferença no dia a dia. O trial serve muito bem para testar workflows reais antes de abrir a carteira.",
          },
          {
            type: "paragraph",
            text: "Um detalhe importante: cada tenant do Microsoft Entra tem direito a até cinco trials. Se cancelar antes do prazo, os itens criados ficam disponíveis por mais 7 dias. Depois disso, somem.",
          },
          {
            type: "heading",
            text: "Licença gratuita por usuário (a permanente)",
          },
          {
            type: "paragraph",
            text: "Aqui mora a confusão. Existe uma licença por usuário que não expira, mas ela é bem mais limitada do que o trial.",
          },
          {
            type: "paragraph",
            text: "Com a licença gratuita permanente, você pode:",
          },
          {
            type: "list",
            items: [
              "Criar itens do Fabric que não são do Power BI (lakehouses, notebooks, warehouses) dentro de workspaces que já rodam em uma capacidade F-SKU paga",
              "Visualizar conteúdo do Power BI, mas só se ele estiver em uma capacidade F64 ou superior",
              "Usar o Power BI Desktop localmente para criar relatórios na sua máquina",
            ],
          },
          {
            type: "paragraph",
            text: "O que não rola com a licença gratuita: publicar ou compartilhar conteúdo do Power BI na nuvem, colaborar em workspaces sem ter uma capacidade paga por baixo, ou fazer qualquer coisa colaborativa de verdade sem alguém pagando a conta da infraestrutura.",
          },
          {
            type: "paragraph",
            text: "Traduzindo para o português direto: a licença gratuita permanente só faz sentido se você for um usuário dentro de uma organização que já contratou uma capacidade Fabric. Sozinho, sem pagar nada, você consegue usar o Power BI Desktop localmente. Só isso.",
          },
          {
            type: "heading",
            text: "Os planos pagos e os SKUs F",
          },
          {
            type: "paragraph",
            text: "Se o trial acabar e você quiser continuar, o caminho é contratar uma capacidade F-SKU. Os SKUs F vão de F2 (2 unidades de capacidade) até F2048, para quem tem volumes de dados que a maioria de nós jamais vai ver. O modelo de cobrança tem duas opções:",
          },
          {
            type: "paragraph",
            text: "Pay-as-you-go: você paga por segundo, com mínimo de um minuto. Pode pausar a capacidade quando não está usando e parar de ser cobrado. Ótimo para times de desenvolvimento ou cargas de trabalho intermitentes. Um F2 nesse modelo custa aproximadamente R$ 1.500 por mês.",
          },
          {
            type: "paragraph",
            text: "Reserva de 1 ou 3 anos: você se compromete antecipadamente e paga cerca de 41% a menos em relação ao pay-as-you-go. O problema é que a cobrança não para, mesmo que você pause a capacidade. Faz sentido para cargas de trabalho previsíveis e constantes em produção.",
          },
          {
            type: "paragraph",
            text: "O OneLake é cobrado separadamente, em torno de US$ 0,023 por GB por mês. As capacidades incluem armazenamento espelhado gratuito equivalente ao número de CUs.",
          },
          {
            type: "heading",
            text: "O threshold do F64: o ponto que muda o jogo",
          },
          {
            type: "paragraph",
            text: "Existe um divisor de águas no modelo de licenciamento do Fabric que vale entender antes de tomar qualquer decisão.",
          },
          {
            type: "paragraph",
            text: "Abaixo do F64 (ou seja, F2 até F32), todo mundo que vai visualizar um relatório do Power BI precisa ter uma licença Power BI Pro, que custa US$ 14 por usuário por mês. Num time de 20 pessoas que só leem dashboards, isso soma US$ 280 mensais só em licenças de visualização, além do custo da capacidade.",
          },
          {
            type: "paragraph",
            text: "A partir do F64, usuários que apenas consomem conteúdo do Power BI podem usar a licença gratuita do Fabric. Ou seja, quanto maior a empresa e maior o número de pessoas acessando relatórios, mais o F64 começa a fazer sentido financeiro.",
          },
          {
            type: "paragraph",
            text: "Para pequenas e médias empresas com times enxutos, a conta quase sempre fecha melhor nos SKUs menores com Power BI Pro para cada usuário.",
          },
          {
            type: "heading",
            text: "Para quem o trial gratuito faz sentido hoje?",
          },
          {
            type: "paragraph",
            text: "O trial de 60 dias é uma oportunidade genuína em três cenários:",
          },
          {
            type: "list",
            items: [
              "Desenvolvedores e analistas de dados que querem aprender a plataforma sem comprometer orçamento. Dá para montar um lakehouse, criar pipelines com o Data Factory, escrever notebooks em Python ou SQL e entender como tudo se conecta.",
              "Times de BI migrando do Power BI Premium (P-SKUs), que foram descontinuados em dezembro de 2024. O trial serve para testar a migração e entender os impactos antes de contratar um SKU F definitivo.",
              "Empresas avaliando se o Fabric resolve um problema específico, como centralizar dados de fontes diferentes ou automatizar relatórios que hoje dependem de processos manuais.",
            ],
          },
          {
            type: "heading",
            text: "O que aconteceu com o Copilot no Fabric?",
          },
          {
            type: "paragraph",
            text: "Até março de 2025, o Copilot no Fabric era exclusivo das capacidades maiores. A partir daí, a Microsoft liberou o Copilot e os recursos de IA para todos os SKUs pagos (F2 e acima). Isso mudou bastante a proposta de valor para empresas menores, que antes precisavam pagar muito mais para ter acesso às funcionalidades de IA.",
          },
          {
            type: "paragraph",
            text: "No trial gratuito, o Copilot ainda não está disponível, o que é uma limitação real para quem queria justamente testar essa parte.",
          },
          {
            type: "heading",
            text: "Vale a pena começar?",
          },
          {
            type: "paragraph",
            text: "Depende do que você quer fazer. Se a ideia é aprender, explorar e entender se o Fabric resolve um problema real para o seu negócio, o trial de 60 dias é uma das melhores formas de fazer isso sem gastar nada. Você tem capacidade F64 equivalente, que é o suficiente para montar pipelines, centralizar dados e gerar relatórios colaborativos de verdade.",
          },
          {
            type: "paragraph",
            text: "Se a ideia é colocar em produção, a conta precisa ser feita com cuidado. Um F2 com 10 usuários usando Power BI Pro já soma em torno de R$ 2.000 mensais. Para uma pequena empresa, esse custo precisa estar claramente justificado pela redução de tempo em tarefas manuais ou pela qualidade das decisões que os dados vão embasar.",
          },
          {
            type: "paragraph",
            text: "A Microsoft não criou o Fabric para substituir o Power BI Desktop gratuito. Criou para ser a plataforma de dados completa para times que já cresceram além das planilhas. Se você ainda está nesse caminho, o trial é o lugar certo para começar a entender o que te espera mais na frente.",
          },
          {
            type: "paragraph",
            text: "*Fontes: Microsoft Learn (fabric-trial, licenses, fabric-features), documentação oficial do Microsoft Fabric, Synapx Fabric Pricing Guide 2026, Promethium Fabric Pricing Guide, Alphabold Fabric Pricing and Licensing.*",
          },
        ],
      },
      en: {
        title: "Is Microsoft Fabric Free Worth It? What You Can Actually Do for Free in 2026",
        summary:
          "Understand the difference between the 60-day free trial and the permanent free license for Microsoft Fabric, what each one lets you do, and in which scenarios starting for free actually makes sense.",
        eyebrow: "Microsoft Fabric",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-08-27",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "When Microsoft announced Microsoft Fabric, a lot of people got curious about what they could use without paying anything. The short answer: you can do quite a bit, but there's a catch nobody wants to hear.",
          },
          {
            type: "paragraph",
            text: "The good news is that the trial is generous. The bad news is that \"free forever\" and \"free for 60 days\" are very different things, and Microsoft sometimes keeps that distinction intentionally blurry.",
          },
          {
            type: "paragraph",
            text: "Here's the explanation without the fluff.",
          },
          {
            type: "heading",
            text: "What Is Microsoft Fabric, Anyway?",
          },
          {
            type: "paragraph",
            text: "Microsoft Fabric is Microsoft's analytics platform that brings together Power BI, Data Factory, Data Engineering, Data Science, and Real-Time Intelligence in a single place. Instead of subscribing to several separate services, you get everything in the same environment, sharing the same storage layer (OneLake) and the same capacity model.",
          },
          {
            type: "paragraph",
            text: "It's a compelling offer, especially for anyone already living inside the Microsoft ecosystem. The integration with Microsoft 365, Azure, and Dynamics is nearly seamless.",
          },
          {
            type: "heading",
            text: "The Free in Fabric: Two Very Different Things",
          },
          {
            type: "paragraph",
            text: "When someone searches for \"Microsoft Fabric Free\", they're actually talking about two distinct models. Confusing them is the most common mistake people make.",
          },
          {
            type: "heading",
            text: "The 60-Day Trial",
          },
          {
            type: "paragraph",
            text: "The trial is the more robust of the two. You get access to a capacity equivalent to F64 (64 capacity units), plus 1 TB of storage in OneLake. During that period, you can create pipelines, notebooks, lakehouses, warehouses, and collaborate in workspaces with other users.",
          },
          {
            type: "paragraph",
            text: "What doesn't work in the trial:",
          },
          {
            type: "list",
            items: [
              "Copilot and AI features (Data Agent, AI functions, AI Services)",
              "Private Link for environments with stricter network requirements",
              "Trusted Workspace Access, which is the advanced access control for sensitive data",
            ],
          },
          {
            type: "paragraph",
            text: "These are limitations that, for anyone evaluating the platform, probably won't matter on a day-to-day basis. The trial works well for testing real workflows before opening your wallet.",
          },
          {
            type: "paragraph",
            text: "One important detail: each Microsoft Entra tenant is entitled to up to five trials. If you cancel before the deadline, created items remain available for another 7 days. After that, they're gone.",
          },
          {
            type: "heading",
            text: "The Free Per-User License (the Permanent One)",
          },
          {
            type: "paragraph",
            text: "This is where the confusion lives. There's a per-user license that doesn't expire, but it's far more limited than the trial.",
          },
          {
            type: "paragraph",
            text: "With the permanent free license, you can:",
          },
          {
            type: "list",
            items: [
              "Create non-Power BI Fabric items (lakehouses, notebooks, warehouses) inside workspaces that run on a paid F-SKU capacity",
              "View Power BI content, but only if it's hosted on an F64 capacity or higher",
              "Use Power BI Desktop locally to create reports on your machine",
            ],
          },
          {
            type: "paragraph",
            text: "What you can't do with the free license: publish or share Power BI content to the cloud, collaborate in workspaces without a paid capacity underneath, or do anything genuinely collaborative without someone paying for the infrastructure.",
          },
          {
            type: "paragraph",
            text: "In plain terms: the permanent free license only makes sense if you're a user inside an organization that has already purchased a Fabric capacity. On your own, paying nothing, you can use Power BI Desktop locally. That's it.",
          },
          {
            type: "heading",
            text: "Paid Plans and F SKUs",
          },
          {
            type: "paragraph",
            text: "Once the trial ends and you want to keep going, the path is purchasing an F-SKU capacity. F SKUs range from F2 (2 capacity units) to F2048, for whoever has data volumes most of us will never see. The billing model has two options:",
          },
          {
            type: "paragraph",
            text: "Pay-as-you-go: you pay per second, with a one-minute minimum. You can pause capacity when not in use and stop being charged. Great for development teams or intermittent workloads. An F2 in this model costs approximately US$ 262.80 per month.",
          },
          {
            type: "paragraph",
            text: "1- or 3-year reservation: you commit upfront and pay about 41% less compared to pay-as-you-go. The catch is that billing doesn't stop, even if you pause capacity. Makes sense for predictable, constant production workloads.",
          },
          {
            type: "paragraph",
            text: "OneLake is billed separately, at around US$ 0.023 per GB per month. Capacities include free mirrored storage equivalent to the number of CUs.",
          },
          {
            type: "heading",
            text: "The F64 Threshold: the Point That Changes Everything",
          },
          {
            type: "paragraph",
            text: "There's a dividing line in Fabric's licensing model worth understanding before making any decision.",
          },
          {
            type: "paragraph",
            text: "Below F64 (meaning F2 through F32), everyone who's going to view a Power BI report needs a Power BI Pro license, which costs US$ 14 per user per month. In a team of 20 people who only read dashboards, that adds up to US$ 280 monthly just in viewing licenses, on top of the capacity cost.",
          },
          {
            type: "paragraph",
            text: "From F64 upward, users who only consume Power BI content can use the free Fabric license. The larger the company and the more people accessing reports, the more F64 starts to make financial sense.",
          },
          {
            type: "paragraph",
            text: "For small and medium businesses with lean teams, the math almost always works out better with smaller SKUs and Power BI Pro for each user.",
          },
          {
            type: "heading",
            text: "Who Should Actually Use the Free Trial Today?",
          },
          {
            type: "paragraph",
            text: "The 60-day trial is a genuine opportunity in three scenarios:",
          },
          {
            type: "list",
            items: [
              "Developers and data analysts who want to learn the platform without burning budget. You can set up a lakehouse, build pipelines with Data Factory, write notebooks in Python or SQL, and understand how everything connects.",
              "BI teams migrating from Power BI Premium (P-SKUs), which were discontinued in December 2024. The trial is useful for testing migration and understanding the impact before committing to a permanent F SKU.",
              "Companies evaluating whether Fabric solves a specific problem, such as centralizing data from different sources or automating reports that currently depend on manual processes.",
            ],
          },
          {
            type: "heading",
            text: "What Happened to Copilot in Fabric?",
          },
          {
            type: "paragraph",
            text: "Until March 2025, Copilot in Fabric was exclusive to larger capacities. After that, Microsoft made Copilot and AI features available for all paid SKUs (F2 and above). This significantly changed the value proposition for smaller companies, which previously needed to pay much more to access AI features.",
          },
          {
            type: "paragraph",
            text: "In the free trial, Copilot is still not available, which is a real limitation for anyone who wanted to test that part specifically.",
          },
          {
            type: "heading",
            text: "Is It Worth Starting?",
          },
          {
            type: "paragraph",
            text: "It depends on what you want to do. If the goal is to learn, explore, and understand whether Fabric solves a real problem for your business, the 60-day trial is one of the best ways to do that without spending anything. You get F64-equivalent capacity, which is enough to build pipelines, centralize data, and generate genuinely collaborative reports.",
          },
          {
            type: "paragraph",
            text: "If the goal is production deployment, the math needs careful attention. An F2 with 10 users on Power BI Pro already adds up to around US$ 400 per month. For a small business, that cost needs to be clearly justified by time saved on manual tasks or by the quality of decisions the data will support.",
          },
          {
            type: "paragraph",
            text: "Microsoft didn't build Fabric to replace the free Power BI Desktop. It built it as the complete data platform for teams that have already grown beyond spreadsheets. If you're still on that path, the trial is the right place to start understanding what's ahead.",
          },
          {
            type: "paragraph",
            text: "*Sources: Microsoft Learn (fabric-trial, licenses, fabric-features), official Microsoft Fabric documentation, Synapx Fabric Pricing Guide 2026, Promethium Fabric Pricing Guide, Alphabold Fabric Pricing and Licensing.*",
          },
        ],
      },
    },
  },
  {
    slug: "copilot-no-excel-com-dados-do-power-bi-julho-2026",
    featured: false,
    locales: {
      "pt-br": {
        title: "Copilot no Excel com dados do Power BI: o que mudou e como usar agora",
        summary:
          "A atualização de julho de 2026 trouxe o Power BI grounding e conectores sincronizados ao Copilot no Excel. Entenda o que mudou, como conectar um relatório e o que o modelo semântico precisa ter para funcionar direito.",
        eyebrow: "Power BI e DAX",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-08-25",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "Durante anos, o fluxo era sempre o mesmo: você abria o Power BI, criava o visual, exportava para Excel, ajustava a planilha e finalmente mandava para o gestor. Um processo que consumia tempo e criava aquela clássica situação do \"esses dados estão desatualizados já\".",
          },
          {
            type: "paragraph",
            text: "A Microsoft acaba de mudar esse ciclo. Com a atualização de julho de 2026, o Copilot no Excel ganhou suporte a Power BI grounding, além de conectores sincronizados disponíveis para todos. Na prática, você analisa dados governados do Power BI diretamente no Excel, usando linguagem natural, sem precisar exportar nada.",
          },
          {
            type: "paragraph",
            text: "Parece simples. E é. Mas tem alguns detalhes importantes que definem se a coisa vai funcionar bem ou virar uma dor de cabeça.",
          },
          {
            type: "heading",
            text: "O que é Power BI grounding no contexto do Copilot",
          },
          {
            type: "paragraph",
            text: "\"Grounding\" é o processo de dar contexto real ao modelo de linguagem do Copilot. Sem ele, a IA responde com base no seu conhecimento geral. Com ele, responde com base nos seus dados.",
          },
          {
            type: "paragraph",
            text: "No caso do Excel, o Copilot agora consegue importar um snapshot dos dados de um relatório do Power BI e usar esse conteúdo como base para responder perguntas, gerar tabelas, criar gráficos e produzir resumos. Tudo isso dentro do Excel, em linguagem natural.",
          },
          {
            type: "paragraph",
            text: "Importante: não é uma conexão ao vivo. O Copilot importa um instantâneo único do relatório. Se os dados mudaram desde a última importação, você precisa adicionar o relatório novamente ao painel do Copilot para pegar a versão atualizada.",
          },
          {
            type: "heading",
            text: "Como conectar um relatório do Power BI ao Copilot no Excel",
          },
          {
            type: "paragraph",
            text: "O processo é direto:",
          },
          {
            type: "list",
            items: [
              "Abra o Excel e acesse o painel do Copilot.",
              "No campo de prompt, clique no ícone \"+\" para adicionar conteúdo.",
              "Selecione \"Adicionar conteúdo de trabalho\" e depois \"Outro\".",
              "Uma lista dos seus relatórios do Power BI acessados recentemente vai aparecer.",
              "Selecione o relatório desejado e confirme.",
            ],
          },
          {
            type: "paragraph",
            text: "A partir daí, o Copilot usa esse relatório como base para responder suas perguntas. Você pode pedir análises, comparações, resumos em tópicos, tabelas dinâmicas prontas para editar. A resposta é rastreável: o Copilot indica de onde veio cada dado.",
          },
          {
            type: "paragraph",
            text: "Outra rota, se você preferir começar pelo Power BI: abra o serviço, localize o modelo semântico, clique nas opções e escolha \"Analisar no Excel\". O Power BI gera e baixa um arquivo Excel já conectado ao modelo.",
          },
          {
            type: "heading",
            text: "Conectores sincronizados: o outro lado da atualização",
          },
          {
            type: "paragraph",
            text: "Além do Power BI grounding, a atualização de julho trouxe os Synced Copilot Connectors como recurso disponível para todos. Eles funcionam de forma diferente: em vez de dados de relatórios, você traz para o Excel conteúdo organizacional, como tickets de suporte, registros de CRM, itens de trabalho e documentos corporativos.",
          },
          {
            type: "paragraph",
            text: "Esse conteúdo entra direto no grid do Excel. Depois disso, o Copilot analisa tudo com linguagem natural. É a diferença entre ter um relatório estático e ter a capacidade de cruzar dados de fontes completamente diferentes dentro de uma única planilha.",
          },
          {
            type: "heading",
            text: "O que o modelo semântico precisa ter para funcionar direito",
          },
          {
            type: "paragraph",
            text: "Aqui mora a pegadinha. O Copilot é tão bom quanto o modelo que ele consulta. Um modelo desorganizado retorna respostas imprecisas ou se recusa a responder.",
          },
          {
            type: "paragraph",
            text: "Medidas bem definidas. O Copilot depende dos metadados do modelo para gerar respostas. Se as medidas estão lá, nomeadas e com descrições claras, a IA sabe o que usar. Se não estão, ela tenta adivinhar e geralmente erra.",
          },
          {
            type: "paragraph",
            text: "Nomes de tabelas e colunas legíveis. \"fct_vnd_v2_final_REAL\" não ajuda ninguém. \"Vendas\" sim.",
          },
          {
            type: "paragraph",
            text: "Row-Level Security configurado antes de ativar o Copilot. Se você tem dados sensíveis, a RLS precisa estar no lugar. O Copilot respeita as permissões do modelo, mas só se elas existirem.",
          },
          {
            type: "paragraph",
            text: "Modelo simplificado. Relações desnecessárias e tabelas que ninguém usa atrapalham o Copilot tanto quanto atrapalham qualquer analista.",
          },
          {
            type: "heading",
            text: "Licença e capacidade: o que você precisa ter",
          },
          {
            type: "paragraph",
            text: "O Copilot no Excel com Power BI grounding exige:",
          },
          {
            type: "list",
            items: [
              "Licença Microsoft 365 com Copilot habilitado.",
              "Workspace do Power BI em capacidade Fabric F64+ ou Power BI Premium.",
              "O Copilot precisa estar habilitado no tenant pelo administrador.",
            ],
          },
          {
            type: "paragraph",
            text: "Power BI Pro sozinho não habilita o painel do Copilot com essas funcionalidades avançadas. Esse ponto costuma pegar as equipes de surpresa na hora de implantar.",
          },
          {
            type: "heading",
            text: "Um aviso sobre o Power BI Q&A",
          },
          {
            type: "paragraph",
            text: "A Microsoft anunciou que vai aposentar o recurso Power BI Q&A em dezembro de 2026. Isso inclui visuais de Q&A, tiles de dashboard e experiências embarcadas. A migração recomendada é exatamente para o Copilot. Quem depende do Q&A hoje precisa planejar essa transição com antecedência.",
          },
          {
            type: "heading",
            text: "Por que isso importa para quem trabalha com dados",
          },
          {
            type: "paragraph",
            text: "A proposta não é substituir o Power BI. O relatório continua lá, governado, com as medidas corretas e a segurança configurada. O que muda é a camada de consumo.",
          },
          {
            type: "paragraph",
            text: "Um analista que vive no Excel agora pode consultar dados do modelo semântico sem depender do desenvolvedor de BI para criar cada visual ou exportar cada tabela. Ele faz a pergunta em linguagem natural, o Copilot busca no relatório e entrega a resposta diretamente na planilha.",
          },
          {
            type: "paragraph",
            text: "Para equipes que ainda brigam com o eterno \"quem tem a versão mais recente da planilha\", essa integração é uma resposta concreta. Os dados vêm do modelo. O modelo tem um dono. O dono cuida da qualidade. O consumidor analisa no ambiente que prefere.",
          },
          {
            type: "paragraph",
            text: "Não é mágica, é arquitetura funcionando do jeito que deveria funcionar há muito tempo.",
          },
        ],
      },
      en: {
        title: "Copilot in Excel with Power BI Data: What Changed and How to Use It Now",
        summary:
          "The July 2026 update brought Power BI grounding and synced connectors to Copilot in Excel. Understand what changed, how to connect a report, and what your semantic model needs to work properly.",
        eyebrow: "Power BI and DAX",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-08-25",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "For years, the workflow was always the same: open Power BI, build the visual, export to Excel, adjust the spreadsheet, and finally send it to the manager. A process that ate up time and created the classic \"these numbers are already outdated\" situation.",
          },
          {
            type: "paragraph",
            text: "Microsoft just changed that cycle. With the July 2026 update, Copilot in Excel gained Power BI grounding support, alongside synced connectors now available for everyone. In practice, you analyze governed Power BI data directly in Excel using natural language, without exporting anything.",
          },
          {
            type: "paragraph",
            text: "It sounds simple. And it is. But there are a few important details that determine whether things work smoothly or turn into a headache.",
          },
          {
            type: "heading",
            text: "What Power BI Grounding Means in the Copilot Context",
          },
          {
            type: "paragraph",
            text: "\"Grounding\" is the process of giving the Copilot language model real-world context. Without it, the AI answers based on general knowledge. With it, it answers based on your data.",
          },
          {
            type: "paragraph",
            text: "In Excel, Copilot can now import a snapshot of a Power BI report's data and use that content as the foundation for answering questions, generating tables, creating charts, and producing summaries. All of this inside Excel, in plain language.",
          },
          {
            type: "paragraph",
            text: "One important note: it is not a live connection. Copilot imports a one-time snapshot of the report. If the data has changed since the last import, you need to add the report again to the Copilot panel to get the updated version.",
          },
          {
            type: "heading",
            text: "How to Connect a Power BI Report to Copilot in Excel",
          },
          {
            type: "paragraph",
            text: "The process is straightforward:",
          },
          {
            type: "list",
            items: [
              "Open Excel and access the Copilot panel.",
              "In the prompt field, click the \"+\" icon to add content.",
              "Select \"Add work content\" and then \"Other.\"",
              "A list of your recently accessed Power BI reports will appear.",
              "Select the desired report and confirm.",
            ],
          },
          {
            type: "paragraph",
            text: "From there, Copilot uses that report as the basis for answering your questions. You can ask for analyses, comparisons, bullet-point summaries, or editable pivot tables ready to work with. Responses are traceable: Copilot indicates where each piece of data came from.",
          },
          {
            type: "paragraph",
            text: "Another route, if you prefer to start in Power BI: open the service, find the semantic model, click the options menu, and choose \"Analyze in Excel.\" Power BI generates and downloads an Excel file already connected to the model.",
          },
          {
            type: "heading",
            text: "Synced Connectors: The Other Side of the Update",
          },
          {
            type: "paragraph",
            text: "Beyond Power BI grounding, the July update made Synced Copilot Connectors generally available for everyone. These work differently: instead of report data, they bring organizational content directly into Excel, such as support tickets, CRM records, work items, and corporate documents.",
          },
          {
            type: "paragraph",
            text: "That content lands straight in the Excel grid. From there, Copilot analyzes everything in natural language. The difference is between having a static report and having the ability to cross-reference data from completely different sources inside a single spreadsheet.",
          },
          {
            type: "heading",
            text: "What the Semantic Model Needs to Work Properly",
          },
          {
            type: "paragraph",
            text: "This is where the catch lives. Copilot is only as good as the model it queries. A disorganized model returns inaccurate answers or refuses to respond at all.",
          },
          {
            type: "paragraph",
            text: "Well-defined measures. Copilot relies on model metadata to generate responses. If measures are there, named properly and with clear descriptions, the AI knows what to use. If they are not, it guesses, and it usually gets it wrong.",
          },
          {
            type: "paragraph",
            text: "Readable table and column names. \"fct_vnd_v2_final_REAL\" helps no one. \"Sales\" does.",
          },
          {
            type: "paragraph",
            text: "Row-Level Security configured before enabling Copilot. If you have sensitive data, RLS needs to be in place. Copilot respects model permissions, but only if they exist.",
          },
          {
            type: "paragraph",
            text: "A simplified model. Unnecessary relationships and unused tables slow down Copilot just as much as they slow down any analyst.",
          },
          {
            type: "heading",
            text: "Licensing and Capacity: What You Need",
          },
          {
            type: "paragraph",
            text: "Copilot in Excel with Power BI grounding requires:",
          },
          {
            type: "list",
            items: [
              "A Microsoft 365 license with Copilot enabled.",
              "A Power BI workspace on Fabric F64+ capacity or Power BI Premium.",
              "Copilot enabled at the tenant level by your administrator.",
            ],
          },
          {
            type: "paragraph",
            text: "Power BI Pro alone does not enable the Copilot panel for these advanced features. This point tends to catch teams off guard when it is time to deploy.",
          },
          {
            type: "heading",
            text: "A Note on Power BI Q&A",
          },
          {
            type: "paragraph",
            text: "Microsoft announced that it will retire the Power BI Q&A feature in December 2026. This includes Q&A visuals, dashboard tiles, and embedded experiences. The recommended migration path is precisely to Copilot. Anyone relying on Q&A today needs to plan that transition ahead of time.",
          },
          {
            type: "heading",
            text: "Why This Matters for People Who Work with Data",
          },
          {
            type: "paragraph",
            text: "The point is not to replace Power BI. The report stays there, governed, with the right measures and security in place. What changes is the consumption layer.",
          },
          {
            type: "paragraph",
            text: "An analyst who lives in Excel can now query data from the semantic model without depending on the BI developer to build every visual or export every table. Ask the question in plain language, Copilot searches the report, and the answer lands directly in the spreadsheet.",
          },
          {
            type: "paragraph",
            text: "For teams still fighting over \"who has the latest version of the file,\" this integration is a concrete answer. The data comes from the model. The model has an owner. The owner maintains quality. The consumer analyzes it in the environment they prefer.",
          },
          {
            type: "paragraph",
            text: "It is not magic. It is architecture working the way it should have worked a long time ago.",
          },
        ],
      },
    },
  },
  {
    slug: "conversational-analytics-microsoft-fabric",
    featured: false,
    locales: {
      "pt-br": {
        title: "Conversational analytics no Microsoft Fabric: o que muda para quem trabalha com dados",
        summary:
          "O Microsoft Fabric lançou o Fabric IQ e os Data Agents em julho de 2026, transformando a forma como analistas e gestores interagem com dados. Entenda o que mudou, o que o Q&A clássico do Power BI tem a ver com isso e o que você precisa fazer antes de dezembro.",
        eyebrow: "Microsoft Fabric e IA",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-08-04",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "Você já perdeu uma tarde inteira esperando que um analista montasse um relatório para responder uma pergunta simples? Pois o Microsoft Fabric está mudando exatamente isso, e a atualização de julho de 2026 deixou claro que a empresa não está mais apenas testando a ideia.",
          },
          {
            type: "heading",
            text: "O que é analytics conversacional, afinal",
          },
          {
            type: "paragraph",
            text: "Analytics conversacional é a capacidade de fazer perguntas sobre dados em linguagem natural e receber respostas imediatas, sem precisar escrever SQL, DAX ou qualquer outra linguagem de consulta. Em vez de abrir um painel e tentar decifrar o que os números dizem, você simplesmente pergunta: 'Qual produto teve a maior queda de margem no segundo trimestre?' e a ferramenta responde.",
          },
          {
            type: "paragraph",
            text: "No Microsoft Fabric, essa funcionalidade ganhou um nome e uma arquitetura própria: o Fabric IQ.",
          },
          {
            type: "heading",
            text: "O que é o Fabric IQ",
          },
          {
            type: "paragraph",
            text: "O Fabric IQ é a camada de inteligência semântica do Fabric. Ele funciona como um intermediário entre os dados brutos armazenados no OneLake e as perguntas feitas por usuários, analistas ou agentes de IA. Seu trabalho é traduzir contexto de negócio, glossário, hierarquias e métricas, de forma que qualquer sistema de IA consiga entender o que 'receita líquida' ou 'ticket médio' significa para aquela empresa específica.",
          },
          {
            type: "paragraph",
            text: "A base do Fabric IQ são os modelos semânticos do Power BI. Ou seja, se você já tem um modelo bem construído no Power BI com medidas DAX documentadas e tabelas bem nomeadas, o Fabric IQ usa esse trabalho como ponto de partida. Ele não ignora o que foi feito antes: ele amplia.",
          },
          {
            type: "paragraph",
            text: "Além dos modelos semânticos, o Fabric IQ usa ontologia (ainda em preview), que é basicamente um mapa de como os conceitos de negócio se relacionam entre si. Pense num dicionário corporativo que a IA consegue ler e usar para dar respostas mais precisas.",
          },
          {
            type: "heading",
            text: "Os Fabric Data Agents",
          },
          {
            type: "paragraph",
            text: "Para colocar tudo isso em prática, o Fabric oferece os Data Agents: agentes configuráveis que respondem perguntas sobre os dados da empresa de forma governada e segura, sem dar escrita, só leitura. Eles usam os modelos de linguagem da Azure OpenAI por baixo dos panos e se conectam diretamente aos dados no OneLake.",
          },
          {
            type: "paragraph",
            text: "Na prática, um gestor pode abrir o Microsoft 365 Copilot, digitar 'Como estão as vendas da região Sul comparado ao mês passado?' e receber uma resposta gerada a partir dos dados reais da empresa. Sem abrir o Power BI. Sem esperar que um analista monte um relatório.",
          },
          {
            type: "paragraph",
            text: "Isso é o que a Microsoft chama de 'democratização dos dados' e, embora o termo já tenha cansado de tão usado, o mecanismo técnico desta vez é mais sólido do que as tentativas anteriores.",
          },
          {
            type: "heading",
            text: "O Q&A clássico do Power BI vai morrer",
          },
          {
            type: "paragraph",
            text: "Um detalhe que passou batido por muita gente: a Microsoft anunciou que o Q&A clássico do Power BI, aquele campo de busca por linguagem natural que existe nos relatórios há anos, será descontinuado em dezembro de 2026. O substituto é o Copilot para Power BI, que usa modelos de linguagem modernos e tem integração nativa com o Fabric IQ.",
          },
          {
            type: "paragraph",
            text: "Para quem usa o Q&A hoje, isso significa que vale começar a testar o Copilot agora. A experiência é diferente, mais rica, e a curva de aprendizado é pequena. Mas deixar para migrar às vésperas da descontinuação é pedir para ter problema.",
          },
          {
            type: "heading",
            text: "O que muda para o analista de dados",
          },
          {
            type: "paragraph",
            text: "A pergunta que todo analista está fazendo, com razão, é: meu trabalho some?",
          },
          {
            type: "paragraph",
            text: "A resposta honesta é: não some, mas muda bastante.",
          },
          {
            type: "paragraph",
            text: "Com o Fabric IQ e os Data Agents, usuários de negócio ganham autonomia para fazer perguntas diretas aos dados. O analista deixa de ser o único ponto de contato entre a empresa e os números. Isso é bom para o negócio e, no médio prazo, é bom para o analista também, porque libera tempo para trabalho de maior valor.",
          },
          {
            type: "paragraph",
            text: "O que não muda, e talvez fique ainda mais importante, é a qualidade do modelo semântico. O Fabric IQ é tão bom quanto o modelo por trás dele. Se as medidas DAX estão mal nomeadas, se não há descrições, se a modelagem está bagunçada, a IA vai errar ou dar respostas vagas. O analista que sabe construir um modelo bem estruturado vai ser a pessoa que garante que a IA fala a verdade.",
          },
          {
            type: "paragraph",
            text: "Além disso, alguém precisa revisar se o que a IA está respondendo faz sentido. Modelos de linguagem cometem erros, especialmente com métricas complexas ou dados com muitas exceções. O olho crítico do analista, que conhece o negócio de perto, continua sendo insubstituível nessa etapa.",
          },
          {
            type: "paragraph",
            text: "A mudança prática é esta: menos tempo construindo relatórios sob demanda, mais tempo garantindo que a fundação está sólida e que as respostas automáticas são confiáveis.",
          },
          {
            type: "heading",
            text: "Como a Microsoft está integrando tudo isso",
          },
          {
            type: "paragraph",
            text: "O Fabric IQ não vive sozinho. Ele faz parte de uma família de camadas de inteligência que a Microsoft batizou de Microsoft IQ, que inclui Work IQ (dados de trabalho como e-mails e reuniões), Foundry IQ (dados de aplicações) e Web IQ (dados externos). A ideia é que o Copilot consiga cruzar informações de todas essas fontes em uma única resposta contextualizada.",
          },
          {
            type: "paragraph",
            text: "Na teoria, isso significa que um agente pode responder: 'Por que as vendas caíram em junho?' cruzando dados de CRM, reuniões do Teams, e-mails de feedback de clientes e o modelo semântico do Power BI ao mesmo tempo. É ambicioso. Se vai funcionar bem na prática em larga escala, o tempo vai mostrar.",
          },
          {
            type: "heading",
            text: "Vale a pena se preparar agora?",
          },
          {
            type: "paragraph",
            text: "Sim, e a preparação é mais simples do que parece. O ponto de partida é o modelo semântico do Power BI. Se ele já existe e está bem estruturado, metade do trabalho está feita. O Fabric IQ usa isso como base.",
          },
          {
            type: "paragraph",
            text: "O passo seguinte é habilitar o Copilot no tenant do Fabric e explorar os Data Agents. A Microsoft disponibilizou documentação detalhada e a curva de entrada é razoável para quem já trabalha com o ecossistema.",
          },
          {
            type: "paragraph",
            text: "O que não faz sentido é esperar. O analytics conversacional no Microsoft Fabric não é mais protótipo de conferência. É funcionalidade em produção, com roadmap definido e uma descontinuação de recurso antigo no calendário. Quem se mover agora vai chegar à virada de 2027 com vantagem real.",
          },
        ],
      },
      en: {
        title: "Conversational analytics in Microsoft Fabric: what changes for data professionals",
        summary:
          "Microsoft Fabric launched Fabric IQ and Data Agents in July 2026, transforming how analysts and managers interact with data. Understand what changed, what the classic Power BI Q&A has to do with it, and what you need to do before December.",
        eyebrow: "Microsoft Fabric and AI",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-08-04",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "Have you ever lost an entire afternoon waiting for an analyst to build a report just to answer one simple question? Microsoft Fabric is changing exactly that, and the July 2026 update made it clear the company is no longer just testing the idea.",
          },
          {
            type: "heading",
            text: "What conversational analytics actually means",
          },
          {
            type: "paragraph",
            text: "Conversational analytics is the ability to ask questions about data in plain language and get immediate answers, without writing SQL, DAX, or any query language. Instead of opening a dashboard and trying to decode what the numbers say, you simply ask: 'Which product had the biggest margin drop in Q2?' and the tool responds.",
          },
          {
            type: "paragraph",
            text: "In Microsoft Fabric, this capability got its own name and architecture: Fabric IQ.",
          },
          {
            type: "heading",
            text: "What is Fabric IQ",
          },
          {
            type: "paragraph",
            text: "Fabric IQ is the semantic intelligence layer of Fabric. It acts as a bridge between the raw data stored in OneLake and the questions asked by users, analysts, or AI agents. Its job is to translate business context, glossary, hierarchies, and metrics so that any AI system can understand what 'net revenue' or 'average ticket' means for that specific company.",
          },
          {
            type: "paragraph",
            text: "The foundation of Fabric IQ is Power BI semantic models. If you already have a well-built model in Power BI with documented DAX measures and properly named tables, Fabric IQ uses that work as a starting point. It does not ignore what was built before: it extends it.",
          },
          {
            type: "paragraph",
            text: "On top of semantic models, Fabric IQ uses ontology (still in preview), which is essentially a map of how business concepts relate to each other. Think of a corporate dictionary that AI can read and use to deliver more accurate answers.",
          },
          {
            type: "heading",
            text: "The Fabric Data Agents",
          },
          {
            type: "paragraph",
            text: "To put all of this into practice, Fabric offers Data Agents: configurable agents that answer questions about company data in a governed and secure way, with read-only access. They use Azure OpenAI language models under the hood and connect directly to data in OneLake.",
          },
          {
            type: "paragraph",
            text: "In practice, a manager can open Microsoft 365 Copilot, type 'How are sales in the Southern region compared to last month?' and receive an answer generated from the company's actual data. No need to open Power BI. No need to wait for an analyst to build a report.",
          },
          {
            type: "paragraph",
            text: "This is what Microsoft calls 'data democratization' and, while the phrase has been overused to exhaustion, the technical mechanism this time is more solid than previous attempts.",
          },
          {
            type: "heading",
            text: "The classic Power BI Q&A is going away",
          },
          {
            type: "paragraph",
            text: "One detail that slipped past many people: Microsoft announced that the classic Q&A feature in Power BI, the natural language search field that has existed in reports for years, will be discontinued in December 2026. The replacement is Copilot for Power BI, which uses modern language models and has native integration with Fabric IQ.",
          },
          {
            type: "paragraph",
            text: "For anyone using Q&A today, this means it is worth starting to test Copilot now. The experience is different, richer, and the learning curve is small. But waiting until the deadline to migrate is asking for trouble.",
          },
          {
            type: "heading",
            text: "What changes for the data analyst",
          },
          {
            type: "paragraph",
            text: "The question every analyst is asking, reasonably, is: does my job disappear?",
          },
          {
            type: "paragraph",
            text: "The honest answer is: it does not disappear, but it changes quite a bit.",
          },
          {
            type: "paragraph",
            text: "With Fabric IQ and Data Agents, business users gain autonomy to ask direct questions about data. The analyst is no longer the sole point of contact between the company and its numbers. That is good for the business and, in the medium term, good for the analyst too, because it frees up time for higher-value work.",
          },
          {
            type: "paragraph",
            text: "What does not change, and may become even more important, is the quality of the semantic model. Fabric IQ is only as good as the model behind it. If DAX measures are poorly named, if there are no descriptions, if the data modeling is a mess, the AI will make mistakes or give vague answers. The analyst who knows how to build a well-structured model will be the person who ensures the AI tells the truth.",
          },
          {
            type: "paragraph",
            text: "Someone also needs to review whether what the AI is answering actually makes sense. Language models make mistakes, especially with complex metrics or data with many exceptions. The critical eye of an analyst who knows the business closely is still irreplaceable at this stage.",
          },
          {
            type: "paragraph",
            text: "The practical change is this: less time building on-demand reports, more time making sure the foundation is solid and that the automated answers are trustworthy.",
          },
          {
            type: "heading",
            text: "How Microsoft is integrating all of this",
          },
          {
            type: "paragraph",
            text: "Fabric IQ does not operate in isolation. It is part of a family of intelligence layers that Microsoft branded as Microsoft IQ, which includes Work IQ (work data such as emails and meetings), Foundry IQ (application data), and Web IQ (external data). The idea is that Copilot can cross-reference information from all these sources in a single contextualized response.",
          },
          {
            type: "paragraph",
            text: "In theory, this means an agent could answer: 'Why did sales drop in June?' by combining CRM data, Teams meeting notes, customer feedback emails, and the Power BI semantic model all at once. It is ambitious. Whether it will work well at scale in the real world, time will tell.",
          },
          {
            type: "heading",
            text: "Is it worth preparing now?",
          },
          {
            type: "paragraph",
            text: "Yes, and the preparation is simpler than it sounds. The starting point is the Power BI semantic model. If it already exists and is well structured, half the work is done. Fabric IQ uses it as a base.",
          },
          {
            type: "paragraph",
            text: "The next step is enabling Copilot in the Fabric tenant and exploring Data Agents. Microsoft has provided detailed documentation and the entry curve is manageable for anyone already working within the ecosystem.",
          },
          {
            type: "paragraph",
            text: "What does not make sense is waiting. Conversational analytics in Microsoft Fabric is no longer a conference prototype. It is a production feature, with a defined roadmap and a legacy feature deprecation already on the calendar. Those who move now will reach 2027 with a real advantage.",
          },
        ],
      },
    },
  },
  {
    slug: "power-bi-junho-2026-novidades-que-importam",
    featured: false,
    locales: {
      "pt-br": {
        title: "Power BI junho de 2026: o que mudou e o que realmente importa para o seu trabalho",
        summary:
          "A atualização de junho de 2026 do Power BI trouxe mudanças reais no fluxo de trabalho: Copilot dentro do modelo semântico, agentes de IA criando relatórios do zero, Date Picker para slicers e vários recursos saindo de Preview para GA. Entenda o que vale atenção.",
        eyebrow: "Power BI e IA",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-07-21",
        readingTime: "10 min",
        body: [
          {
            type: "paragraph",
            text: "A Microsoft lançou em 9 de junho de 2026 mais uma atualização mensal do Power BI. E desta vez, diferente de muitos meses em que as novidades se resumem a ajustes cosméticos, junho trouxe mudanças que vão mexer de verdade no fluxo de trabalho de quem desenvolve e de quem consome relatórios.",
          },
          {
            type: "paragraph",
            text: "O destaque vai para a inteligência artificial, mas não do jeito genérico de sempre. As novidades de IA desta atualização têm função clara e aplicação prática. Além disso, vários recursos que estavam em Preview finalmente chegaram a Disponibilidade Geral (GA), o que significa que você pode usar em produção sem se preocupar com comportamentos instáveis.",
          },
          {
            type: "heading",
            text: "Copilot em Web Modeling: IA dentro do modelo semântico",
          },
          {
            type: "paragraph",
            text: "Até agora, o Copilot no Power BI era, na prática, uma ferramenta para quem consome relatórios. Você perguntava algo, ele tentava responder com um visual. Útil em alguns casos, decepcionante em outros.",
          },
          {
            type: "paragraph",
            text: "Com o Copilot em Web Modeling, o cenário muda de lado. Agora a IA trabalha junto com quem constrói o modelo semântico, não apenas com quem usa o resultado final.",
          },
          {
            type: "paragraph",
            text: "Na prática, você pode apontar para uma medida que está dando resultado errado e perguntar o que há de errado. Pode pedir para o Copilot identificar relacionamentos desnecessários ou medidas redundantes. Pode fazer perguntas sobre a estrutura do modelo em linguagem natural e receber uma explicação compreensível.",
          },
          {
            type: "paragraph",
            text: "Para quem mantém modelos com centenas de medidas e tabelas complexas, isso pode reduzir bastante o tempo de debugging e de documentação. Ainda está em Preview, então não espere perfeição, mas a direção é clara.",
          },
          {
            type: "heading",
            text: "AI-Powered Reporting Skills: agentes criando relatórios do zero",
          },
          {
            type: "paragraph",
            text: "Esta é a novidade que mais vai polarizar opiniões. As AI-Powered Reporting Skills permitem que agentes de IA conduzam todo o fluxo de criação de um relatório: planejamento, design, construção dos visuais, validação e publicação, tudo via prompts em linguagem natural.",
          },
          {
            type: "paragraph",
            text: "A ideia é que você descreva o que precisa e o agente entrega o relatório pronto.",
          },
          {
            type: "paragraph",
            text: "Para perfis não técnicos que precisam criar relatórios simples, isso tem valor real. Para desenvolvedores experientes, a utilidade depende muito de quanto controle você ainda tem sobre o resultado. Em Preview, o ceticismo é justificado. Mas se a Microsoft conseguir afinar isso, o impacto no volume de trabalho operacional de criação de relatórios vai ser considerável.",
          },
          {
            type: "heading",
            text: "Fabric Apps para Semantic Models: o modelo como ativo reutilizável",
          },
          {
            type: "paragraph",
            text: "Essa é a novidade mais estratégica do mês, ainda que seja a que menos gera barulho nas redes.",
          },
          {
            type: "paragraph",
            text: "Fabric Apps para Semantic Models permite criar aplicações completas diretamente a partir de um modelo semântico existente, usando linguagem natural. A governança, as métricas e as permissões já definidas no modelo ficam intactas. O que muda é que agora qualquer pessoa com acesso consegue criar uma aplicação funcional em cima disso sem precisar mexer no código.",
          },
          {
            type: "paragraph",
            text: "O time de engenharia constrói e mantém o modelo semântico com rigor técnico. O time de negócios, a partir desse modelo, cria as aplicações que precisa sem depender de demanda de TI para cada ajuste. Isso, se funcionar bem, resolve uma fricção antiga entre as áreas.",
          },
          {
            type: "heading",
            text: "Date Picker para Slicers: pequeno, mas salva muito relatório",
          },
          {
            type: "paragraph",
            text: "Entre as novidades de reporting, o Date Picker para Slicers merece atenção especial porque resolve um problema frequente: filtros de data que ficam desatualizados e exigem manutenção manual.",
          },
          {
            type: "paragraph",
            text: "Com o Date Picker, você define uma data relativa padrão que avança automaticamente conforme os dados são atualizados. O usuário do relatório ainda pode ajustar para uma data específica quando precisar, mas o padrão já chega certo.",
          },
          {
            type: "paragraph",
            text: "Para relatórios mensais, trimestrais ou de janelas móveis, isso elimina uma tarefa de manutenção que consome tempo e gera erros silenciosos.",
          },
          {
            type: "heading",
            text: "O que chegou a GA: use sem medo",
          },
          {
            type: "paragraph",
            text: "Vários recursos que estavam em Preview ganharam Disponibilidade Geral nesta atualização. Isso significa que a Microsoft considerou a funcionalidade estável o suficiente para uso em produção.",
          },
          {
            type: "list",
            items: [
              "Shape Map: útil para mapas geográficos com regiões customizadas, como estados brasileiros ou territórios de vendas.",
              "Auto-expand para Matrix: elimina a necessidade de expandir hierarquias manualmente toda vez que o relatório carrega.",
              "Melhorias de eixo em gráficos de barras e colunas: remoção de padding e correção do comportamento ao ativar rótulos de dados.",
              "Card visual com hover state: defina um estilo diferente quando o usuário passa o cursor sobre o card.",
              "Formatação condicional de largura de colunas em Matrix e Table: colunas com largura fixa que variam por condição.",
            ],
          },
          {
            type: "heading",
            text: "Tooltip em formato de frase: contexto sem DAX",
          },
          {
            type: "paragraph",
            text: "A opção de tooltip em formato de frase estava em Preview e ganhou GA nesta atualização. Em vez de mostrar uma lista de campos com valores, você escreve uma frase que referencia os campos diretamente.",
          },
          {
            type: "paragraph",
            text: "O resultado é um tooltip que parece escrito por um humano, não gerado por uma tabela. Útil para dashboards onde o público não é técnico e precisa de contexto, não de dados brutos.",
          },
          {
            type: "heading",
            text: "Scatter Chart com auto-fit de marcadores",
          },
          {
            type: "paragraph",
            text: "Quem trabalha com gráficos de dispersão conhece o problema: bolhas ou marcadores posicionados perto das bordas aparecem cortados. A solução sempre foi ajustar o intervalo do eixo manualmente ou criar medidas dinâmicas.",
          },
          {
            type: "paragraph",
            text: "O Auto-fit Markers cuida disso automaticamente. O Power BI ajusta o espaço do gráfico para garantir que todos os marcadores apareçam por completo. Simples, discreto e a maioria das pessoas nunca vai nem perceber que estava com problema antes.",
          },
          {
            type: "heading",
            text: "O que fazer agora",
          },
          {
            type: "paragraph",
            text: "Se você usa Power BI regularmente, junho de 2026 vale uma atualização de versão. O Date Picker para Slicers e as melhorias de eixo já justificam isso por si sós.",
          },
          {
            type: "paragraph",
            text: "Para quem está construindo modelos semânticos, o Copilot em Web Modeling merece um teste mesmo estando em Preview. A ferramenta ainda vai errar, mas é a primeira vez que a IA entra de forma útil no lado técnico da modelagem.",
          },
          {
            type: "paragraph",
            text: "E para gestores de dados e arquitetos de soluções, Fabric Apps para Semantic Models é o recurso para acompanhar de perto nos próximos meses. Se a promessa se confirmar, ela muda a conversa sobre como as áreas de negócio consomem dados sem depender do time técnico para cada entrega.",
          },
        ],
      },
      en: {
        title: "Power BI June 2026: what changed and what actually matters for your work",
        summary:
          "The June 2026 Power BI update brings real workflow changes: Copilot inside the semantic model, AI agents building reports from scratch, Date Picker for slicers, and several features graduating from Preview to GA. Here is what deserves your attention.",
        eyebrow: "Power BI and AI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-07-21",
        readingTime: "10 min",
        body: [
          {
            type: "paragraph",
            text: "Microsoft released the June 2026 Power BI monthly update on June 9th. Unlike many months where the highlights amount to cosmetic tweaks, this update brings changes that will genuinely affect how both developers and report consumers work day to day.",
          },
          {
            type: "paragraph",
            text: "AI is the headline, but not in the vague, buzzword-heavy way you might expect. The AI features in this update have a clear purpose and practical application. Several capabilities that had been in Preview also reached General Availability, meaning you can safely use them in production without worrying about unpredictable behavior.",
          },
          {
            type: "heading",
            text: "Copilot in Web Modeling: AI inside the semantic model",
          },
          {
            type: "paragraph",
            text: "Until now, Copilot in Power BI was effectively a tool for report consumers. You asked something, it tried to answer with a visual. Useful in some cases, disappointing in others.",
          },
          {
            type: "paragraph",
            text: "With Copilot in Web Modeling, the dynamic shifts. Now the AI works alongside whoever is building the semantic model, not just whoever uses the end result.",
          },
          {
            type: "paragraph",
            text: "In practice, you can point to a measure that is returning incorrect results and ask what is wrong. You can ask Copilot to identify unnecessary relationships or redundant measures. You can ask questions about the model structure in plain language and get a comprehensible explanation back.",
          },
          {
            type: "paragraph",
            text: "For anyone maintaining models with hundreds of measures and complex table relationships, this could meaningfully cut down debugging and documentation time. It is still in Preview, so do not expect perfection, but the direction is clear.",
          },
          {
            type: "heading",
            text: "AI-Powered Reporting Skills: agents building reports from scratch",
          },
          {
            type: "paragraph",
            text: "This is the feature that will divide opinions the most. AI-Powered Reporting Skills allow AI agents to handle the entire report creation workflow: planning, design, visual layout, validation, and publication, all through natural language prompts.",
          },
          {
            type: "paragraph",
            text: "The idea is you describe what you need and the agent delivers a finished report.",
          },
          {
            type: "paragraph",
            text: "For non-technical profiles who need to create simple reports, there is real value here. For experienced developers, the usefulness depends heavily on how much control you retain over the output. In Preview, healthy skepticism is warranted. But if Microsoft manages to refine this, the impact on the volume of routine report-building work could be substantial.",
          },
          {
            type: "heading",
            text: "Fabric Apps for Semantic Models: the model as a reusable asset",
          },
          {
            type: "paragraph",
            text: "This is the most strategically significant feature of the month, even if it is generating the least noise on social media.",
          },
          {
            type: "paragraph",
            text: "Fabric Apps for Semantic Models allows you to build complete applications directly from an existing semantic model using natural language. The governance, metrics, and permissions already defined in the model remain intact. What changes is that anyone with access can now create a functional application on top of that model without touching the underlying code.",
          },
          {
            type: "paragraph",
            text: "The engineering team builds and maintains the semantic model with technical rigor. The business team, working from that same model, creates the applications they need without filing a ticket to IT for every change. If it works as advertised, it resolves a long-standing friction between technical and business teams.",
          },
          {
            type: "heading",
            text: "Date Picker for Slicers: small feature, big time saver",
          },
          {
            type: "paragraph",
            text: "Among the reporting updates, the Date Picker for Slicers deserves special attention because it fixes a common problem: date filters that go stale and require manual maintenance.",
          },
          {
            type: "paragraph",
            text: "With the Date Picker, you set a relative default date that automatically rolls forward as the data refreshes. Report users can still switch to a specific date when needed, but the default is always current.",
          },
          {
            type: "paragraph",
            text: "For monthly, quarterly, or rolling-window reports, this eliminates a maintenance task that wastes time and introduces silent errors.",
          },
          {
            type: "heading",
            text: "What reached GA: safe to use in production",
          },
          {
            type: "paragraph",
            text: "Several features that had been in Preview reached General Availability with this update, indicating Microsoft considers them stable enough for production use.",
          },
          {
            type: "list",
            items: [
              "Shape Map: useful for geographic maps with custom regions such as state-level breakdowns or custom sales territories.",
              "Auto-expand for Matrix: removes the need to manually expand hierarchies every time a report loads.",
              "Axis improvements for bar and column charts: removes padding between the axis and bars, and fixes the axis range issue when enabling data labels.",
              "Card visual hover state: define a different image or style when the user hovers over the card.",
              "Conditional formatting of fixed column widths in Matrix and Table: addresses a long-standing complaint from anyone working with dense information tables.",
            ],
          },
          {
            type: "heading",
            text: "Sentence-format tooltips: context without DAX",
          },
          {
            type: "paragraph",
            text: "The sentence-format tooltip option was in Preview and reached GA with this update. Instead of displaying a list of fields with their values, you write a sentence that directly references those fields.",
          },
          {
            type: "paragraph",
            text: "The result is a tooltip that reads as if a person wrote it, not something generated by a table dump. Useful for dashboards where the audience is not technical and needs context, not raw data.",
          },
          {
            type: "heading",
            text: "Scatter Chart auto-fit markers",
          },
          {
            type: "paragraph",
            text: "Anyone who works with scatter charts knows the problem: bubbles or markers positioned near the edges appear clipped. The fix has always been to manually adjust the axis range or build dynamic measures.",
          },
          {
            type: "paragraph",
            text: "Auto-fit Markers handles this automatically. Power BI adjusts the chart area to ensure every marker appears fully visible. Simple, unobtrusive, and most people will never even notice they had the problem before.",
          },
          {
            type: "heading",
            text: "What to do now",
          },
          {
            type: "paragraph",
            text: "If you use Power BI regularly, the June 2026 update is worth installing. The Date Picker for Slicers and the axis improvements alone justify it.",
          },
          {
            type: "paragraph",
            text: "For anyone building semantic models, Copilot in Web Modeling is worth testing even in Preview. It will still make mistakes, but this is the first time AI has entered the technical side of modeling in a genuinely useful way.",
          },
          {
            type: "paragraph",
            text: "And for data managers and solution architects, Fabric Apps for Semantic Models is the feature to watch closely over the coming months. If the promise holds, it fundamentally changes how business teams consume data without depending on the technical team for every deliverable.",
          },
        ],
      },
    },
  },
  {
    slug: "fabric-data-agent-api-publica",
    featured: false,
    locales: {
      "pt-br": {
        title: "A API pública do Fabric Data Agent e o que isso muda para quem trabalha com BI",
        summary:
          "A Microsoft liberou a API pública do Fabric Data Agent, permitindo criar, configurar e publicar agentes de dados sem encostar no portal do Fabric. Entenda o que mudou, o que são service principals nesse contexto e por que isso importa para automações com Power BI.",
        eyebrow: "Microsoft Fabric e IA",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-07-14",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "Durante anos, automatizar coisas no Microsoft Fabric exigiu abrir o portal, clicar em dezenas de menus e torcer para a interface não mudar na próxima semana. A Microsoft acabou de mudar isso, pelo menos para os Data Agents.",
          },
          {
            type: "paragraph",
            text: "A API pública do Fabric Data Agent chegou. E com ela, a possibilidade de criar, configurar e publicar agentes de dados sem precisar encostar no portal do Fabric.",
          },
          {
            type: "heading",
            text: "O que é o Fabric Data Agent, afinal",
          },
          {
            type: "paragraph",
            text: "Antes de falar da API, vale recapitular o que é esse negócio de Data Agent.",
          },
          {
            type: "paragraph",
            text: "Um Fabric Data Agent é um recurso alimentado por IA que permite fazer perguntas sobre dados armazenados no OneLake em linguagem natural. Sem SQL. Sem DAX. Sem KQL. Você pergunta qual produto vendeu mais em março e o agente gera e executa a consulta automaticamente, devolvendo a resposta.",
          },
          {
            type: "paragraph",
            text: "Ele funciona conectado a fontes de dados como modelos semânticos do Power BI, lakehouses, warehouses e bancos de dados KQL. Até aí, nada de novo. A novidade está em como você gerencia e distribui esses agentes.",
          },
          {
            type: "heading",
            text: "O que muda com a API pública",
          },
          {
            type: "paragraph",
            text: "Antes dessa atualização, criar e configurar um Data Agent era uma tarefa manual, feita dentro do portal do Fabric ou por meio do SDK, mas restrita a notebooks do próprio Fabric.",
          },
          {
            type: "paragraph",
            text: "Com a API pública, o SDK do Fabric Data Agent passa a rodar na mesma superfície REST que você já usa para gerenciar workspaces e outros itens do Fabric. Isso significa que o gerenciamento do ciclo de vida de um agente, criar, configurar, atualizar e publicar, pode ser feito de qualquer lugar:",
          },
          {
            type: "list",
            items: [
              "Ambientes de desenvolvimento local",
              "Pipelines de CI/CD",
              "Portais internos",
              "Azure Functions",
              "Contêineres",
              "Qualquer serviço de backend que consiga fazer uma chamada REST",
            ],
          },
          {
            type: "paragraph",
            text: "A lógica de separação é importante de entender. A API cuida do plano de gerenciamento: você usa ela para construir e publicar o agente. Depois de publicado, o agente é consumido por meio do endpoint MCP (Model Context Protocol), que é o protocolo padrão para conectar agentes de IA a fontes de dados e ferramentas.",
          },
          {
            type: "heading",
            text: "Service principals: o detalhe que importa para operações",
          },
          {
            type: "paragraph",
            text: "Um ponto que não pode passar em branco: os Fabric Data Agents agora suportam service principals.",
          },
          {
            type: "paragraph",
            text: "Isso quer dizer que você pode autenticar e executar agentes usando identidades de aplicativo, sem depender de credenciais de usuário. Para quem monta pipelines automatizados, isso é a diferença entre uma solução que funciona de madrugada sem intervenção humana e uma que quebra toda vez que alguém troca de senha.",
          },
          {
            type: "paragraph",
            text: "Para empresas que precisam de automações escaláveis com controle de acesso granular, essa mudança é relevante.",
          },
          {
            type: "heading",
            text: "A conexão com o Copilot Studio e o ecossistema MCP",
          },
          {
            type: "paragraph",
            text: "O Copilot Studio, em sua versão mais recente, passou a suportar servidores MCP. Isso cria uma ponte direta entre os Fabric Data Agents e os agentes que você constrói no Copilot Studio.",
          },
          {
            type: "paragraph",
            text: "Na prática: você publica um Data Agent no Fabric, ele fica disponível via endpoint MCP, e o Copilot Studio consegue consumi-lo como uma fonte de dados ou ferramenta dentro de um fluxo de trabalho. Sem precisar replicar a lógica de acesso a dados em outro lugar.",
          },
          {
            type: "paragraph",
            text: "A mesma lógica vale para integrações com o Microsoft 365 Copilot. Agentes de dados publicados no Fabric já aparecem disponíveis para uso no Teams, na web e no app desktop do M365.",
          },
          {
            type: "heading",
            text: "Deployment pipelines e o fluxo de dev para produção",
          },
          {
            type: "paragraph",
            text: "Outro recurso que ganhou relevância com essa atualização: os deployment pipelines do Fabric agora funcionam com Data Agents.",
          },
          {
            type: "paragraph",
            text: "Isso significa que você consegue promover um agente do ambiente de desenvolvimento para staging, testar, validar o comportamento com dados reais de homologação, e só depois publicar para produção. O mesmo fluxo que equipes de dados já usam para modelos semânticos e dataflows.",
          },
          {
            type: "paragraph",
            text: "Para equipes que precisam de rastreabilidade e controle de mudanças, essa é uma peça que faltava.",
          },
          {
            type: "heading",
            text: "Permissões mais simples para modelos semânticos do Power BI",
          },
          {
            type: "paragraph",
            text: "Uma mudança prática que vai facilitar a vida de analistas: para conectar um Data Agent a um modelo semântico do Power BI, o usuário precisa apenas da permissão de leitura no modelo.",
          },
          {
            type: "paragraph",
            text: "Antes, acessar um modelo semântico por meio de agentes ou do Copilot no Power BI exigia acesso total ao workspace ou permissão de Build. Isso complicava a governança em ambientes com muitos usuários e modelos compartilhados.",
          },
          {
            type: "paragraph",
            text: "Com a permissão de leitura sendo suficiente, fica mais simples distribuir acesso a experiências conversacionais sobre os dados sem abrir brechas de segurança desnecessárias.",
          },
          {
            type: "heading",
            text: "Por que isso importa para analistas e desenvolvedores de BI",
          },
          {
            type: "paragraph",
            text: "A abertura da API pública do Fabric Data Agent não é apenas uma feature nova na lista de novidades da Microsoft. Ela muda a forma como equipes de dados podem pensar a distribuição e manutenção de agentes conversacionais sobre dados.",
          },
          {
            type: "paragraph",
            text: "Até pouco tempo atrás, criar um agente de dados que funcionasse de forma automatizada, com controle de versão, deploy em múltiplos ambientes e autenticação via service principal, era algo que exigia gambiarras ou soluções customizadas. Agora é parte nativa da plataforma.",
          },
          {
            type: "paragraph",
            text: "Para quem trabalha com Power BI e Microsoft Fabric no dia a dia, vale a pena olhar para isso não como uma curiosidade técnica, mas como uma mudança de postura. A Microsoft está apostando que o futuro do acesso a dados corporativos passa por agentes de IA. E está construindo a infraestrutura para que esses agentes sejam gerenciados com o mesmo rigor de qualquer outro artefato de dados.",
          },
          {
            type: "paragraph",
            text: "O SDK está disponível no PyPI como fabric-data-agent-sdk. A documentação completa está no Microsoft Learn. Se você já tem workspaces no Fabric com capacidade que suporta Data Agents, pode começar agora.",
          },
        ],
      },
      en: {
        title: "The Fabric Data Agent Public API and What It Actually Changes for BI Professionals",
        summary:
          "Microsoft released the Fabric Data Agent public API, enabling teams to create, configure, and publish data agents without touching the Fabric portal. Here is what changed, what service principals mean in this context, and why it matters for Power BI automation.",
        eyebrow: "Microsoft Fabric and AI",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-07-14",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "For years, automating things inside Microsoft Fabric meant opening the portal, clicking through dozens of menus, and hoping the interface hadn't changed since last week. Microsoft just changed that, at least for Data Agents.",
          },
          {
            type: "paragraph",
            text: "The Fabric Data Agent public API is here. And with it, the ability to create, configure, and publish data agents without ever touching the Fabric portal.",
          },
          {
            type: "heading",
            text: "What Is a Fabric Data Agent, Anyway",
          },
          {
            type: "paragraph",
            text: "Before diving into the API, a quick recap of what a Data Agent actually is.",
          },
          {
            type: "paragraph",
            text: "A Fabric Data Agent is an AI-powered feature that lets you ask questions about data stored in OneLake using natural language. No SQL. No DAX. No KQL. You ask which product sold the most in March and the agent generates and runs the query automatically, returning the answer.",
          },
          {
            type: "paragraph",
            text: "It connects to data sources like Power BI semantic models, lakehouses, warehouses, and KQL databases. None of that is new. What changed is how you manage and deploy these agents.",
          },
          {
            type: "heading",
            text: "What the Public API Actually Changes",
          },
          {
            type: "paragraph",
            text: "Before this update, creating and configuring a Data Agent was a manual task. You did it inside the Fabric portal or through the SDK, but only from within Fabric notebooks.",
          },
          {
            type: "paragraph",
            text: "With the public API, the Fabric Data Agent SDK now runs on the same REST surface you already use to manage workspaces and other Fabric items. That means the entire lifecycle of an agent, creating, configuring, updating, and publishing, can happen from anywhere:",
          },
          {
            type: "list",
            items: [
              "Local development environments",
              "CI/CD pipelines",
              "Internal portals",
              "Azure Functions",
              "Containers",
              "Any backend service that can make a REST call",
            ],
          },
          {
            type: "paragraph",
            text: "The separation between management and runtime is worth understanding. The API handles the management plane: you use it to build and publish the agent. Once published, the agent is consumed through the MCP (Model Context Protocol) endpoint, which is the standard protocol for connecting AI agents to data sources and tools.",
          },
          {
            type: "heading",
            text: "Service Principals: The Detail That Matters for Operations",
          },
          {
            type: "paragraph",
            text: "One thing that should not be overlooked: Fabric Data Agents now support service principals.",
          },
          {
            type: "paragraph",
            text: "That means you can authenticate and execute agents using app identities, without relying on user credentials. For anyone building automated pipelines, this is the difference between a solution that keeps running at 3 AM without human intervention and one that breaks every time someone changes their password.",
          },
          {
            type: "paragraph",
            text: "For organizations that need scalable automation with granular access control, this is a meaningful change.",
          },
          {
            type: "heading",
            text: "The Connection to Copilot Studio and the MCP Ecosystem",
          },
          {
            type: "paragraph",
            text: "Copilot Studio, in its latest version, now supports MCP servers. That creates a direct bridge between Fabric Data Agents and the agents you build inside Copilot Studio.",
          },
          {
            type: "paragraph",
            text: "In practice: you publish a Data Agent in Fabric, it becomes available via its MCP endpoint, and Copilot Studio can consume it as a data source or tool inside a workflow. No need to duplicate data access logic somewhere else.",
          },
          {
            type: "paragraph",
            text: "The same applies to Microsoft 365 Copilot integrations. Published Fabric data agents show up as available tools in Teams, on the web, and in the M365 desktop app.",
          },
          {
            type: "heading",
            text: "Deployment Pipelines and the Dev-to-Production Flow",
          },
          {
            type: "paragraph",
            text: "Another feature that became more relevant with this update: Fabric deployment pipelines now work with Data Agents.",
          },
          {
            type: "paragraph",
            text: "That means you can promote an agent from a development environment to staging, test it, validate behavior against real pre-production data, and only then push to production. The same flow data teams already use for semantic models and dataflows.",
          },
          {
            type: "paragraph",
            text: "For teams that need traceability and change control, this was a missing piece.",
          },
          {
            type: "heading",
            text: "Simpler Permissions for Power BI Semantic Models",
          },
          {
            type: "paragraph",
            text: "A practical change that will make life easier for analysts: to connect a Data Agent to a Power BI semantic model, a user now only needs read permission on the model.",
          },
          {
            type: "paragraph",
            text: "Previously, accessing a semantic model through agents or Power BI Copilot required full workspace access or Build permission. That made governance complicated in environments with many users and shared models.",
          },
          {
            type: "paragraph",
            text: "With read permission being enough, it becomes simpler to distribute access to conversational data experiences without creating unnecessary security gaps.",
          },
          {
            type: "heading",
            text: "Why This Matters for BI Analysts and Developers",
          },
          {
            type: "paragraph",
            text: "The opening of the Fabric Data Agent public API is not just another item on Microsoft's feature list. It changes how data teams can think about deploying and maintaining conversational agents over their data.",
          },
          {
            type: "paragraph",
            text: "Until recently, building a data agent that worked in a fully automated way, with version control, multi-environment deployment, and service principal authentication, required workarounds or custom solutions. Now it is native to the platform.",
          },
          {
            type: "paragraph",
            text: "For people working with Power BI and Microsoft Fabric day to day, this is worth treating not as a technical curiosity but as a shift in posture. Microsoft is betting that the future of corporate data access runs through AI agents. And it is building the infrastructure to manage those agents with the same rigor applied to any other data artifact.",
          },
          {
            type: "paragraph",
            text: "The SDK is available on PyPI as fabric-data-agent-sdk. Full documentation is on Microsoft Learn. If you already have Fabric workspaces with capacity that supports Data Agents, you can start today.",
          },
        ],
      },
    },
  },
  {
    slug: "copilot-in-web-modeling-power-bi-preview",
    featured: false,
    locales: {
      "pt-br": {
        title: "Copilot no Power BI agora modela por você: entenda o que muda na prática",
        summary:
          "O Copilot in web modeling chegou ao Power BI em preview e promete editar modelos semânticos em linguagem natural, sem abrir o Desktop. Entenda o que ele faz, quem pode usar e qual é o maior obstáculo.",
        eyebrow: "Power BI e IA",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-30",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "A Microsoft colocou o Copilot em mais um lugar no Power BI. Desta vez, dentro da modelagem semântica pelo navegador, em versão preview. O recurso promete deixar analistas e desenvolvedores fazerem alterações no modelo de dados usando linguagem natural, sem precisar abrir o Power BI Desktop nem escrever uma linha de DAX na mão.",
          },
          {
            type: "paragraph",
            text: "Vale a pena entender o que isso significa de verdade antes de criar expectativas demais.",
          },
          {
            type: "heading",
            text: "O que é o Copilot in web modeling",
          },
          {
            type: "paragraph",
            text: "O Copilot in web modeling é um assistente de IA integrado à experiência de modelo semântico do serviço do Power BI. Em termos simples: você abre o seu modelo semântico no Power BI Service, entra no modo de edição e clica em \"Copilot\" na faixa de opções. A partir daí, começa a conversar com ele.",
          },
          {
            type: "paragraph",
            text: "Você pode pedir coisas como \"cria uma medida de crescimento ano a ano para a coluna de receita\" ou \"renomeia todas as colunas da tabela fct_vendas para português\" e o Copilot executa, ou pelo menos tenta.",
          },
          {
            type: "paragraph",
            text: "O processo funciona assim:",
          },
          {
            type: "list",
            items: [
              "Você abre o modelo semântico na visualização de modelo no Power BI Service.",
              "Muda do modo de visualização para o modo de edição.",
              "Seleciona Copilot na faixa de opções.",
              "Digita o que quer fazer.",
            ],
          },
          {
            type: "paragraph",
            text: "Antes de agir pela primeira vez, o Copilot pede permissão explícita para revisar e alterar o modelo. Essa aprovação vale para toda a sessão. E ele cria um ponto de restauração automático no início de cada sessão, o que facilita desfazer qualquer coisa que não saiu como esperado.",
          },
          {
            type: "heading",
            text: "O que ele consegue fazer",
          },
          {
            type: "paragraph",
            text: "As capacidades do recurso se dividem em três blocos:",
          },
          {
            type: "heading",
            text: "Análise e recomendações",
          },
          {
            type: "paragraph",
            text: "O Copilot pode revisar a estrutura do seu modelo e apontar problemas. Nomes de colunas inconsistentes, relacionamentos mal definidos, tabelas sem descrição. Pensa nele como um revisor que leu o modelo inteiro e te entregou uma lista de melhorias.",
          },
          {
            type: "heading",
            text: "Edição do modelo",
          },
          {
            type: "paragraph",
            text: "Aqui está o ponto mais prático. Usando linguagem natural, você consegue criar tabelas, colunas, medidas e relacionamentos. Também dá para gerar medidas DAX (totais, métricas de crescimento, agregações) e criar regras de RLS para restringir o acesso a dados por perfil de usuário.",
          },
          {
            type: "heading",
            text: "Descoberta e organização",
          },
          {
            type: "paragraph",
            text: "O Copilot sugere descrições para tabelas, colunas e medidas, propõe estruturas de pastas de exibição e indica quais campos técnicos devem ser ocultados dos autores de relatórios. Quem já trabalhou num modelo semântico mal documentado sabe o quanto isso faz diferença para quem usa o relatório na outra ponta.",
          },
          {
            type: "heading",
            text: "O que ele não faz (ainda)",
          },
          {
            type: "list",
            items: [
              "O recurso está em preview, o que significa que pode mudar, quebrar ou não funcionar como o esperado em situações específicas.",
              "Usar o Copilot para configurar preparar dados para IA dentro do próprio modelo ainda não é suportado.",
              "As alterações respeitam as permissões existentes. Se você não tem acesso de escrita no modelo semântico, o Copilot não consegue editar nada.",
              "Funciona melhor em modelos bem estruturados. Modelo bagunçado com nomes crípticos vai gerar respostas ruins. IA não faz milagre.",
            ],
          },
          {
            type: "heading",
            text: "Quem pode usar",
          },
          {
            type: "paragraph",
            text: "Aqui vem a parte que vai frustrar muita gente: o Copilot in web modeling exige capacidade Microsoft Fabric F64 ou superior, o que inclui licenças Power BI Premium P1 (ou equivalente). Não funciona com Power BI Pro comum.",
          },
          {
            type: "paragraph",
            text: "O F64 é um SKU de capacidade compartilhada. Pense nele como o aluguel de uma fatia de processamento da Microsoft. Custa bastante mais do que uma licença Pro individual, então esse recurso, por enquanto, é para empresas com infraestrutura mais robusta.",
          },
          {
            type: "paragraph",
            text: "Além disso, as configurações de administrador do Fabric precisam permitir o uso do Copilot e dos recursos baseados no Azure OpenAI. Sem isso habilitado no tenant, nada funciona.",
          },
          {
            type: "heading",
            text: "Por que isso importa para desenvolvedores de Power BI",
          },
          {
            type: "paragraph",
            text: "Historicamente, qualquer mudança estrutural no modelo semântico exigia o Power BI Desktop. Abrir o arquivo .pbix, fazer a alteração, publicar de volta. Isso não é o fim do mundo, mas adiciona fricção desnecessária quando o modelo já está publicado e alguém precisa de um ajuste rápido.",
          },
          {
            type: "paragraph",
            text: "A possibilidade de fazer edições diretamente pelo navegador, com a ajuda de IA para gerar DAX ou criar RLS, reduz esse ciclo. Para analistas que trabalham em modelos compartilhados e não têm acesso fácil ao Desktop, é uma mudança prática.",
          },
          {
            type: "paragraph",
            text: "Também é um sinal do caminho que a Microsoft está trilhando. O Power BI está progressivamente se tornando uma ferramenta baseada no Fabric, e a modelagem web é parte dessa transição. Quem ainda trabalha em fluxos 100% baseados no Desktop vai precisar se adaptar.",
          },
          {
            type: "heading",
            text: "Prepare o modelo antes de usar o Copilot",
          },
          {
            type: "paragraph",
            text: "Um detalhe que a documentação da Microsoft reforça: o Copilot performa muito melhor em modelos bem preparados. Isso significa:",
          },
          {
            type: "list",
            items: [
              "Descrições claras em tabelas e colunas.",
              "Nomes que façam sentido para o negócio, não abreviações técnicas internas.",
              "Relacionamentos definidos corretamente.",
              "Medidas-chave já criadas e documentadas.",
            ],
          },
          {
            type: "paragraph",
            text: "Modelo sem essa base vai gerar recomendações genéricas e medidas DAX duvidosas. O Copilot usa o contexto do modelo para entender o que você tem. Se esse contexto é ruim, a saída também será.",
          },
          {
            type: "heading",
            text: "Conclusão",
          },
          {
            type: "paragraph",
            text: "O Copilot in web modeling do Power BI é um recurso genuinamente útil para quem tem a infraestrutura necessária para rodá-lo. A proposta de editar modelos semânticos em linguagem natural, sem sair do navegador, faz sentido e resolve um problema real.",
          },
          {
            type: "paragraph",
            text: "O problema é o requisito de licença. F64 deixa o recurso fora do alcance da maioria das empresas que usam Power BI no Brasil, onde Pro e Premium Per User ainda são a realidade mais comum. Quem tem acesso vai aproveitar. Quem não tem, vai acompanhar de longe por um bom tempo.",
          },
          {
            type: "paragraph",
            text: "Por enquanto, o mais inteligente é preparar seus modelos semânticos corretamente agora. Quando o acesso chegar, você vai estar pronto para aproveitar.",
          },
        ],
      },
      en: {
        title: "Copilot in Power BI now models for you: what actually changes",
        summary:
          "Copilot in web modeling arrived in Power BI as a preview, promising to edit semantic models in natural language without opening Desktop. Here is what it does, who can use it, and what the real obstacle is.",
        eyebrow: "Power BI and AI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-30",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "Microsoft has placed Copilot in yet another corner of Power BI. This time, it's inside the web-based semantic modeling experience, currently in preview. The feature promises to let analysts and developers make changes to the data model using natural language, without having to open Power BI Desktop or write a single line of DAX by hand.",
          },
          {
            type: "paragraph",
            text: "It's worth understanding what that actually means before getting your hopes up.",
          },
          {
            type: "heading",
            text: "What Copilot in web modeling is",
          },
          {
            type: "paragraph",
            text: "Copilot in web modeling is an AI-powered assistant integrated into the Power BI service's semantic model experience. In plain terms: you open your semantic model in the Power BI Service, switch to editing mode, and click \"Copilot\" in the ribbon. From there, you start talking to it.",
          },
          {
            type: "paragraph",
            text: "You can ask things like \"create a year-over-year growth measure for the revenue column\" or \"rename all columns in the fct_sales table to follow business naming conventions\" and Copilot executes, or at least tries.",
          },
          {
            type: "paragraph",
            text: "The process works like this:",
          },
          {
            type: "list",
            items: [
              "Open the semantic model in Model view in the Power BI Service.",
              "Switch from Viewing mode to Editing mode.",
              "Select Copilot from the ribbon.",
              "Type what you want to do.",
            ],
          },
          {
            type: "paragraph",
            text: "Before acting for the first time, Copilot asks for explicit permission to review and modify the model. This approval covers the entire session. And it creates an automatic restore checkpoint at the start of each session, making it easy to roll back anything that didn't go as planned.",
          },
          {
            type: "heading",
            text: "What it can do",
          },
          {
            type: "paragraph",
            text: "The feature's capabilities fall into three categories:",
          },
          {
            type: "heading",
            text: "Analysis and recommendations",
          },
          {
            type: "paragraph",
            text: "Copilot can review your model's structure and flag issues. Inconsistent column names, poorly defined relationships, undescribed tables. Think of it as a reviewer who read the entire model and handed you a prioritized list of improvements.",
          },
          {
            type: "heading",
            text: "Model editing",
          },
          {
            type: "paragraph",
            text: "This is the most practical part. Using natural language, you can create tables, columns, measures, and relationships. You can also generate DAX measures (totals, growth metrics, aggregations) and create RLS rules to restrict data access by user profile.",
          },
          {
            type: "heading",
            text: "Discoverability and organization",
          },
          {
            type: "paragraph",
            text: "Copilot suggests descriptions for tables, columns, and measures, proposes display folder structures, and recommends which technical fields should be hidden from report authors. Anyone who has inherited a poorly documented semantic model knows how much this matters.",
          },
          {
            type: "heading",
            text: "What it doesn't do (yet)",
          },
          {
            type: "list",
            items: [
              "The feature is in preview, meaning it can change, break, or underperform in specific situations.",
              "Using Copilot to configure prepare data for AI settings within the model is not yet supported.",
              "Changes respect existing permissions. If you don't have write access to the semantic model, Copilot won't be able to edit anything on your behalf.",
              "It works best on well-structured models. A messy model with cryptic names will generate poor responses. AI doesn't perform miracles.",
            ],
          },
          {
            type: "heading",
            text: "Who can use it",
          },
          {
            type: "paragraph",
            text: "Here's the part that will frustrate a lot of people: Copilot in web modeling requires Microsoft Fabric F64 capacity or higher, which includes Power BI Premium P1 licenses or equivalent. It does not work with a standard Power BI Pro license.",
          },
          {
            type: "paragraph",
            text: "F64 is a shared capacity SKU. Think of it as renting a slice of Microsoft's processing infrastructure. It costs significantly more than an individual Pro license, so this feature, for now, is for organizations with a more robust infrastructure in place.",
          },
          {
            type: "paragraph",
            text: "On top of that, the Fabric admin settings must allow the use of Copilot and Azure OpenAI-powered features. Without that enabled at the tenant level, nothing works.",
          },
          {
            type: "heading",
            text: "Why this matters for Power BI developers",
          },
          {
            type: "paragraph",
            text: "Historically, any structural change to a semantic model required Power BI Desktop. Open the .pbix file, make the change, publish it back. That's not the end of the world, but it adds unnecessary friction when the model is already published and someone just needs a quick adjustment.",
          },
          {
            type: "paragraph",
            text: "The ability to make edits directly in the browser, with AI assistance for generating DAX or creating RLS rules, reduces that cycle. For analysts who work on shared models and don't have easy access to Desktop, that's a real, practical improvement.",
          },
          {
            type: "paragraph",
            text: "It's also a signal of the direction Microsoft is heading. Power BI is progressively becoming a Fabric-first tool, and web modeling is part of that transition. Anyone still working on 100% Desktop-based workflows will need to adapt.",
          },
          {
            type: "heading",
            text: "Prepare your model before using Copilot",
          },
          {
            type: "paragraph",
            text: "One detail the Microsoft documentation emphasizes: Copilot performs significantly better on well-prepared models. That means:",
          },
          {
            type: "list",
            items: [
              "Clear descriptions on tables and columns.",
              "Names that make sense to the business, not internal technical abbreviations.",
              "Correctly defined relationships.",
              "Key measures already created and documented.",
            ],
          },
          {
            type: "paragraph",
            text: "A model without that foundation will generate generic recommendations and questionable DAX measures. Copilot uses the model's context to understand what you have. If that context is poor, the output will be too.",
          },
          {
            type: "heading",
            text: "Wrapping up",
          },
          {
            type: "paragraph",
            text: "Copilot in web modeling for Power BI is a genuinely useful feature for organizations that have the infrastructure to run it. The idea of editing semantic models in natural language, directly in the browser, makes sense and solves a real problem.",
          },
          {
            type: "paragraph",
            text: "The issue is the licensing requirement. F64 puts the feature out of reach for most small and mid-sized businesses that rely on Power BI Pro or Premium Per User. Those who have access will benefit. Those who don't will be watching from the sidelines for a while.",
          },
          {
            type: "paragraph",
            text: "For now, the smartest move is to get your semantic models properly structured. When access eventually comes, you'll be ready to make the most of it.",
          },
        ],
      },
    },
  },
  {
    slug: "copilot-web-modeling-agent-skills-power-bi-junho-2026",
    featured: false,
    locales: {
      "pt-br": {
        title: "O Copilot chegou ao Web Modeling do Power BI, e agora a IA cria DAX por você",
        summary:
          "A atualização de junho de 2026 trouxe o Copilot para dentro do modelo semântico do Power BI e as Agent Skills para desenvolvimento autônomo. Entenda o que mudou de verdade.",
        eyebrow: "Power BI e DAX",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-25",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "Por anos, a parte chata de trabalhar com Power BI não era fazer os relatórios. Era a modelagem semântica: renomear tabelas, criar relacionamentos, ajustar medidas DAX que deveriam ser simples mas viravam uma tarde inteira de depuração. Pois bem, a Microsoft resolveu colocar o Copilot justamente nessa parte.",
          },
          {
            type: "paragraph",
            text: "A atualização de junho de 2026 trouxe duas funcionalidades que mudam a lógica de como analistas e desenvolvedores trabalham com o Power BI: o Copilot no Web Modeling e as Agent Skills. As duas estão em Public Preview, mas já dá para entender o que está acontecendo.",
          },
          {
            type: "heading",
            text: "O que o Copilot faz dentro do modelo semântico",
          },
          {
            type: "paragraph",
            text: "A ideia é simples: você abre o modelo semântico no serviço do Power BI, entra no modo de edição e chama o Copilot pela faixa de opções. A partir daí, você digita o que quer em linguagem natural.",
          },
          {
            type: "paragraph",
            text: "\"Crie uma medida de margem de lucro.\" \"Renomeie as tabelas para seguir o padrão fato e dimensão.\" \"Identifique relacionamentos que possam estar com problema.\"",
          },
          {
            type: "paragraph",
            text: "O Copilot analisa o esquema, aponta inconsistências e aplica as mudanças diretamente. Antes de fazer qualquer coisa na primeira sessão, ele pede permissão, e cria um ponto de restauração automático para você poder desfazer tudo se algo sair errado.",
          },
          {
            type: "paragraph",
            text: "Isso não é pouca coisa. Quem já ficou 30 minutos tentando entender por que uma medida retorna BLANK quando deveria retornar zero vai entender o valor disso.",
          },
          {
            type: "list",
            items: [
              "Análise do modelo com recomendações de boas práticas",
              "Renomeação de tabelas e colunas",
              "Criação e modificação de relacionamentos",
              "Geração de medidas DAX com base em descrições textuais (totais, crescimentos, agregações)",
            ],
          },
          {
            type: "paragraph",
            text: "O limite de input do Copilot subiu de 500 para 10.000 caracteres, então você pode dar contexto de negócio detalhado ao invés de prompts genéricos.",
          },
          {
            type: "heading",
            text: "Agent Skills: a IA que constrói do zero",
          },
          {
            type: "paragraph",
            text: "As Agent Skills são uma camada acima do Copilot. Anunciadas no Microsoft Build 2026, elas propõem algo mais ambicioso: um agente de IA que gerencia o ciclo completo de desenvolvimento analítico, dos dados brutos até o relatório publicado, com base em uma descrição em linguagem natural ou até uma captura de tela.",
          },
          {
            type: "paragraph",
            text: "Funciona assim: você descreve o que precisa. O agente cria o modelo semântico (schema em estrela, medidas DAX, configurações para IA), constrói o relatório, formata e publica. Sem você ter clicado em uma única tabela.",
          },
          {
            type: "paragraph",
            text: "A Microsoft faz questão de separar as duas coisas: o Copilot no Web Modeling auxilia o usuário humano que está editando um modelo existente. As Agent Skills são para desenvolvimento autônomo, onde o agente toma a frente do processo.",
          },
          {
            type: "paragraph",
            text: "Para times que têm demanda alta de relatórios operacionais repetitivos, a combinação das duas pode significar uma redução grande no tempo de entrega.",
          },
          {
            type: "heading",
            text: "DAX User-Defined Functions: agora com disponibilidade geral",
          },
          {
            type: "paragraph",
            text: "Enquanto o Copilot e as Agent Skills pegam os holofotes, o lançamento das DAX User-Defined Functions (UDFs) em disponibilidade geral merece atenção.",
          },
          {
            type: "paragraph",
            text: "UDFs permitem que você defina uma função de cálculo complexa uma vez e a reutilize em medidas, colunas calculadas e cálculos visuais. Isso resolve um problema antigo no Power BI: duplicação de lógica de cálculo espalhada pelo modelo, o que dificulta manutenção e aumenta chance de inconsistência.",
          },
          {
            type: "paragraph",
            text: "Se você tem uma fórmula de margem de contribuição ou de meta vs. realizado que aparece em dez medidas diferentes, agora dá para centralizar tudo numa função e chamar ela onde precisar.",
          },
          {
            type: "heading",
            text: "O modelo semântico como centro de tudo",
          },
          {
            type: "paragraph",
            text: "O que a Microsoft está construindo, peça a peça, é uma arquitetura onde o modelo semântico é a camada de inteligência de negócio confiável que alimenta tanto relatórios humanos quanto agentes de IA.",
          },
          {
            type: "paragraph",
            text: "A atualização de junho reforça isso com a experiência \"Prep data for AI\", que avalia a qualidade do modelo semântico especificamente para respostas de IA serem mais precisas. Há também o Outbound Access Control (OAP) no Fabric, que permite ao administrador do workspace restringir quais fontes de dados os modelos e relatórios podem conectar.",
          },
          {
            type: "paragraph",
            text: "A ideia é clara: quanto melhor o modelo, mais confiável é o que a IA produz a partir dele.",
          },
          {
            type: "heading",
            text: "O que isso significa na prática",
          },
          {
            type: "paragraph",
            text: "Para quem é analista ou desenvolvedor de Power BI, o cenário está mudando. Não no sentido de \"a IA vai te substituir\", mas no sentido de que as tarefas repetitivas e mecânicas da modelagem estão sendo absorvidas pela IA.",
          },
          {
            type: "paragraph",
            text: "Isso quer dizer que o diferencial profissional vai cada vez mais para o entendimento do negócio, para saber qual pergunta fazer ao modelo, qual medida tem sentido semântico real, qual relatório efetivamente ajuda uma decisão. A parte técnica de \"escrever DAX correto\" vai virar commodity.",
          },
          {
            type: "paragraph",
            text: "Quem entende bem os conceitos por trás, como star schema, granularidade, contexto de filtro no DAX, vai usar o Copilot como um multiplicador de produtividade. Quem sempre copiou fórmula do Stack Overflow sem entender vai continuar copiando, só que de um jeito mais sofisticado.",
          },
          {
            type: "paragraph",
            text: "As funcionalidades estão em Preview. Para habilitar, você precisa de licença Microsoft 365 Copilot e capacidade no Fabric. A documentação oficial está em learn.microsoft.com/en-us/power-bi/transform-model/copilot-web-modeling.",
          },
        ],
      },
      en: {
        title: "Copilot is now inside Power BI Web Modeling, and it creates DAX for you",
        summary:
          "The June 2026 update brought Copilot into the Power BI semantic model and Agent Skills for autonomous development. Here is what actually changed.",
        eyebrow: "Power BI and DAX",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-25",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "For years, the tedious part of working with Power BI wasn't building reports. It was semantic modeling: renaming tables, setting up relationships, debugging DAX measures that should have been straightforward but ended up eating an entire afternoon. Microsoft decided to put Copilot right there, in the middle of that pain.",
          },
          {
            type: "paragraph",
            text: "The June 2026 update brought two features that change how analysts and developers actually work with Power BI: Copilot in Web Modeling and Agent Skills. Both are in Public Preview, but the direction is already clear.",
          },
          {
            type: "heading",
            text: "What Copilot does inside the semantic model",
          },
          {
            type: "paragraph",
            text: "The concept is straightforward: you open a semantic model in the Power BI service, switch to editing mode, and call Copilot from the ribbon. From there, you type what you need in plain language.",
          },
          {
            type: "paragraph",
            text: "\"Create a profit margin measure.\" \"Rename the tables to follow fact and dimension naming conventions.\" \"Check if there are any relationships that might be broken.\"",
          },
          {
            type: "paragraph",
            text: "Copilot analyzes the schema, flags inconsistencies, and applies the changes directly. Before doing anything in your first session, it asks for permission and creates an automatic restore point so you can roll back if something goes sideways.",
          },
          {
            type: "paragraph",
            text: "That's not a small thing. Anyone who has spent 30 minutes figuring out why a measure returns BLANK instead of zero will appreciate the value here.",
          },
          {
            type: "list",
            items: [
              "Model analysis with best-practice recommendations",
              "Table and column renaming",
              "Relationship creation and modification",
              "DAX measure generation from text descriptions (totals, growth metrics, aggregations)",
            ],
          },
          {
            type: "paragraph",
            text: "The Copilot input limit jumped from 500 to 10,000 characters, so you can provide real business context instead of vague one-liners.",
          },
          {
            type: "heading",
            text: "Agent Skills: AI that builds from scratch",
          },
          {
            type: "paragraph",
            text: "Agent Skills sit a level above Copilot. Announced at Microsoft Build 2026, they aim at something more ambitious: an AI agent that manages the full analytics development cycle, from raw data to published report, driven by a natural language description or even a screenshot.",
          },
          {
            type: "paragraph",
            text: "Here's how it works: you describe what you need. The agent creates the semantic model (star schema, DAX measures, AI-ready configurations), builds the report, formats it, and publishes it. Without you clicking on a single table.",
          },
          {
            type: "paragraph",
            text: "Microsoft is deliberate about distinguishing the two: Copilot in Web Modeling assists the human editing an existing model. Agent Skills are for autonomous development, where the agent takes the lead on the entire process.",
          },
          {
            type: "paragraph",
            text: "For teams with high volumes of repetitive operational reports, combining both could mean a significant drop in delivery time.",
          },
          {
            type: "heading",
            text: "DAX User-Defined Functions: now generally available",
          },
          {
            type: "paragraph",
            text: "While Copilot and Agent Skills grab the spotlight, the DAX User-Defined Functions (UDFs) reaching general availability deserves attention.",
          },
          {
            type: "paragraph",
            text: "UDFs let you define a complex calculation once and reuse it across measures, calculated columns, and visual calculations. This addresses a long-standing pain in Power BI: duplicated calculation logic scattered across the model, making maintenance harder and inconsistency more likely.",
          },
          {
            type: "paragraph",
            text: "If you have a contribution margin or budget-vs-actual formula copied across ten different measures, you can now centralize it in one function and call it wherever needed.",
          },
          {
            type: "heading",
            text: "The semantic model as the center of everything",
          },
          {
            type: "paragraph",
            text: "What Microsoft is building, piece by piece, is an architecture where the semantic model is the trusted business intelligence layer that feeds both human-made reports and AI agents.",
          },
          {
            type: "paragraph",
            text: "The June update reinforces this with the \"Prep data for AI\" experience, which evaluates semantic model quality specifically so AI-generated answers are more accurate. There is also the Outbound Access Control (OAP) in Fabric, which lets workspace administrators restrict which data sources models and reports can connect to.",
          },
          {
            type: "paragraph",
            text: "The logic is clear: the better the model, the more reliable everything the AI produces from it.",
          },
          {
            type: "heading",
            text: "What this means in practice",
          },
          {
            type: "paragraph",
            text: "For Power BI analysts and developers, the landscape is shifting. Not in the sense of \"AI will replace you,\" but in the sense that repetitive and mechanical modeling tasks are being absorbed by AI.",
          },
          {
            type: "paragraph",
            text: "That means the professional edge will increasingly come from business understanding: knowing which question to ask the model, which measure has real semantic meaning, which report actually helps a decision get made. The technical side of \"writing correct DAX\" is becoming a commodity.",
          },
          {
            type: "paragraph",
            text: "Those who understand the underlying concepts, like star schemas, granularity, and DAX filter context, will use Copilot as a productivity multiplier. Those who always copied formulas from Stack Overflow without understanding them will keep copying, just in a more sophisticated way.",
          },
          {
            type: "paragraph",
            text: "The features are in Preview. To enable them, you need a Microsoft 365 Copilot license and Fabric capacity. Official documentation is at learn.microsoft.com/en-us/power-bi/transform-model/copilot-web-modeling.",
          },
        ],
      },
    },
  },
  {
    slug: "dax-user-defined-functions-power-bi",
    locales: {
      "pt-br": {
        title: "DAX mudou de vez: o que são as User-Defined Functions e por que você vai querer usar",
        summary:
          "Entenda como as User-Defined Functions tornam o DAX mais reutilizável, organizado e pronto para modelos semânticos colaborativos no Power BI.",
        eyebrow: "Power BI e DAX",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-16",
        readingTime: "5 min",
        body: [
          {
            type: "paragraph",
            text: "Se você trabalha com Power BI há algum tempo, sabe que DAX tem uma característica irritante: você escreve a mesma lógica umas dez vezes, em medidas diferentes, e reza para não ter cometido nenhum erro em pelo menos nove delas.",
          },
          {
            type: "paragraph",
            text: "Com a atualização de junho de 2026, a Microsoft finalizou a disponibilidade geral das User-Defined Functions (UDFs) no DAX. Esse recurso estava em preview desde setembro de 2025 e agora chegou com tudo: suporte no Power BI Desktop, no serviço web e integração com ferramentas como SSMS e Git.",
          },
          {
            type: "paragraph",
            text: "A promessa é simples. Você define uma função uma vez. Usa ela em qualquer lugar do modelo.",
          },
          {
            type: "heading",
            text: "O problema que as UDFs resolvem",
          },
          {
            type: "paragraph",
            text: "Imagine que você precisa calcular o valor com imposto em vários lugares do seu modelo semântico. A lógica é sempre a mesma: valor multiplicado por uma alíquota. Até aí, tudo bem.",
          },
          {
            type: "paragraph",
            text: "O problema começa quando a alíquota muda. Você vai precisar atualizar cada medida, cada coluna calculada, cada cálculo visual que usava essa fórmula. Se tiver sorte, lembra de todos. Se não tiver, o relatório vai apresentar números inconsistentes.",
          },
          {
            type: "paragraph",
            text: "As UDFs encerram essa história. Você centraliza a lógica em um único lugar. Quando a regra muda, muda em um ponto só.",
          },
          {
            type: "heading",
            text: "Como funciona na prática",
          },
          {
            type: "paragraph",
            text: "A sintaxe introduz uma nova palavra-chave: `FUNCTION`. O formato básico é esse:",
          },
          {
            type: "code",
            language: "dax",
            code: "DEFINE\n    FUNCTION NomeDaFuncao = ( parametro : TIPO ) => expressão",
          },
          {
            type: "paragraph",
            text: "Um exemplo concreto: uma função que adiciona imposto a um valor.",
          },
          {
            type: "code",
            language: "dax",
            code: "DEFINE\n    /// AddTax recebe um valor e retorna o total com imposto\n    /// @param {NUMERIC} amount - Valor sem imposto\n    /// @param {NUMERIC} [taxRate] - Alíquota opcional, padrão 10%\n    /// @returns Valor total com imposto aplicado\n    FUNCTION AddTax = \n        ( amount : NUMERIC, taxRate : NUMERIC = 0.1 ) =>\n            amount * ( 1 + taxRate )\n\nEVALUATE\n{ AddTax ( 100 ) }\n-- Retorna 110",
          },
          {
            type: "paragraph",
            text: "Note o parâmetro `taxRate` com valor padrão. Isso é um dos recursos novos do GA: parâmetros opcionais. Você pode chamar `AddTax(100)` e a função assume 10% automaticamente, ou passar `AddTax(100, 0.15)` quando precisar de 15%.",
          },
          {
            type: "heading",
            text: "Onde você pode usar as UDFs",
          },
          {
            type: "paragraph",
            text: "Uma vez salva no modelo, a função fica disponível como qualquer outra função DAX nativa. Você pode usá-la em:",
          },
          {
            type: "list",
            items: [
              "Medidas",
              "Colunas calculadas",
              "Cálculos visuais",
              "Outras funções definidas pelo usuário",
            ],
          },
          {
            type: "paragraph",
            text: "Essa última possibilidade é interessante. Você pode compor funções. Uma função de margem bruta pode chamar internamente uma função de custo ajustado. O modelo fica modular.",
          },
          {
            type: "heading",
            text: "Onde criar e editar as funções",
          },
          {
            type: "paragraph",
            text: "A Microsoft disponibilizou três caminhos para trabalhar com UDFs:",
          },
          {
            type: "paragraph",
            text: "**DAX Query View:** É onde você define, testa e salva funções no modelo. Tem botão de \"Update model with changes\" para salvar de vez. O IntelliSense já reconhece as funções definidas.",
          },
          {
            type: "paragraph",
            text: "**TMDL View:** Para quem prefere trabalhar com arquivos de definição. As UDFs ficam salvas como arquivos TMDL e podem ser versionadas via Git. Ótimo para times que trabalham colaborativamente no mesmo modelo.",
          },
          {
            type: "paragraph",
            text: "**Model Explorer:** Você encontra as funções criadas em um nó dedicado chamado \"Functions\". Dá para criar, editar e acompanhar dependências por lá.",
          },
          {
            type: "heading",
            text: "A conexão com o Copilot",
          },
          {
            type: "paragraph",
            text: "Um detalhe que a Microsoft enfatizou bastante: UDFs são objetos de primeira classe no modelo semântico. Elas têm assinatura tipada, descrição e parâmetros documentados.",
          },
          {
            type: "paragraph",
            text: "Isso significa que ferramentas de IA, como o Copilot, conseguem descobrir e invocar essas funções com muito mais precisão do que tentando inferir lógica DAX de medidas genéricas. Em vez de o Copilot tentar adivinhar como calcular sua margem, você expõe explicitamente uma função `CalcularMargem` com documentação clara.",
          },
          {
            type: "paragraph",
            text: "Para quem está investindo em automação e IA dentro do Power BI, isso muda bastante o jogo.",
          },
          {
            type: "heading",
            text: "Requisitos técnicos",
          },
          {
            type: "paragraph",
            text: "Antes de sair criando funções, um aviso: as UDFs exigem nível de compatibilidade de banco de dados 1702 ou superior. Modelos mais antigos podem precisar de atualização.",
          },
          {
            type: "paragraph",
            text: "No Power BI Desktop de junho de 2026 em diante, o recurso vem habilitado por padrão. No SSMS, o suporte começa a partir da versão 22.5.",
          },
          {
            type: "heading",
            text: "Vale a pena adotar agora?",
          },
          {
            type: "paragraph",
            text: "Para modelos novos, a resposta é direta: sim. Comece usando UDFs para qualquer lógica que se repete. Margem, impostos, conversão de moeda, regras comerciais. Tudo que você escreveria mais de uma vez vira candidato a função.",
          },
          {
            type: "paragraph",
            text: "Para modelos legados, o processo é mais gradual. Não compensa refatorar tudo de uma vez. Mas à medida que você precisar ajustar cálculos existentes, vale centralizar a lógica em funções.",
          },
          {
            type: "paragraph",
            text: "O DAX sempre teve poder. Agora tem organização.",
          },
          {
            type: "paragraph",
            text: "*Fontes: Microsoft Power BI June 2026 Feature Summary, documentação oficial Microsoft Learn (DAX User-Defined Functions Best Practices), Microsoft Fabric Community.*",
          },
        ],
      },
      en: {
        title: "DAX just changed for good: what are User-Defined Functions and why you'll want to use them",
        summary:
          "Learn how User-Defined Functions make DAX more reusable, organized, and ready for collaborative semantic models in Power BI.",
        eyebrow: "Power BI and DAX",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-16",
        readingTime: "5 min",
        body: [
          {
            type: "paragraph",
            text: "If you've been working with Power BI for a while, you know DAX has one particularly annoying trait: you write the same logic ten times across different measures and pray you didn't make a mistake in at least nine of them.",
          },
          {
            type: "paragraph",
            text: "With the June 2026 update, Microsoft finalized the general availability of User-Defined Functions (UDFs) in DAX. The feature had been in preview since September 2025 and now ships complete: support in Power BI Desktop, the web service, and integration with tools like SSMS and Git.",
          },
          {
            type: "paragraph",
            text: "The promise is straightforward. You define a function once. You use it anywhere in the model.",
          },
          {
            type: "heading",
            text: "The problem UDFs solve",
          },
          {
            type: "paragraph",
            text: "Imagine you need to calculate a tax-inclusive value in several places across your semantic model. The logic is always the same: a value multiplied by a rate. Simple enough.",
          },
          {
            type: "paragraph",
            text: "The problem starts when the rate changes. You'll need to update every measure, every calculated column, every visual calculation that used that formula. If you're lucky, you remember them all. If not, your report will show inconsistent numbers.",
          },
          {
            type: "paragraph",
            text: "UDFs put an end to that story. You centralize the logic in one place. When the rule changes, it changes in one spot.",
          },
          {
            type: "heading",
            text: "How it works in practice",
          },
          {
            type: "paragraph",
            text: "The syntax introduces a new keyword: `FUNCTION`. The basic structure looks like this:",
          },
          {
            type: "code",
            language: "dax",
            code: "DEFINE\n    FUNCTION FunctionName = ( parameter : TYPE ) => expression",
          },
          {
            type: "paragraph",
            text: "A concrete example: a function that adds tax to a value.",
          },
          {
            type: "code",
            language: "dax",
            code: "DEFINE\n    /// AddTax takes an amount and returns the total including tax\n    /// @param {NUMERIC} amount - Pre-tax value\n    /// @param {NUMERIC} [taxRate] - Optional tax rate, defaults to 10%\n    /// @returns Total value with tax applied\n    FUNCTION AddTax = \n        ( amount : NUMERIC, taxRate : NUMERIC = 0.1 ) =>\n            amount * ( 1 + taxRate )\n\nEVALUATE\n{ AddTax ( 100 ) }\n-- Returns 110",
          },
          {
            type: "paragraph",
            text: "Notice the `taxRate` parameter with a default value. Optional parameters are one of the new features that shipped with GA. You can call `AddTax(100)` and the function assumes 10% automatically, or pass `AddTax(100, 0.15)` when you need 15%.",
          },
          {
            type: "heading",
            text: "Where you can use UDFs",
          },
          {
            type: "paragraph",
            text: "Once saved to the model, the function behaves like any native DAX function. You can use it in:",
          },
          {
            type: "list",
            items: [
              "Measures",
              "Calculated columns",
              "Visual calculations",
              "Other user-defined functions",
            ],
          },
          {
            type: "paragraph",
            text: "That last one is worth noting. You can compose functions. A gross margin function can internally call an adjusted cost function. The model becomes modular.",
          },
          {
            type: "heading",
            text: "Where to create and edit functions",
          },
          {
            type: "paragraph",
            text: "Microsoft made three paths available for working with UDFs:",
          },
          {
            type: "paragraph",
            text: "**DAX Query View:** Where you define, test, and save functions to the model. There's an \"Update model with changes\" button to commit them permanently. IntelliSense already recognizes defined functions as you type.",
          },
          {
            type: "paragraph",
            text: "**TMDL View:** For those who prefer working with definition files. UDFs are saved as TMDL files and can be versioned through Git. Great for teams collaborating on the same model.",
          },
          {
            type: "paragraph",
            text: "**Model Explorer:** Functions show up under a dedicated \"Functions\" node. You can create, edit, and track dependencies from there.",
          },
          {
            type: "heading",
            text: "The Copilot connection",
          },
          {
            type: "paragraph",
            text: "One detail Microsoft emphasized heavily: UDFs are first-class objects in the semantic model. They have typed signatures, descriptions, and documented parameters.",
          },
          {
            type: "paragraph",
            text: "That means AI tools like Copilot can discover and invoke these functions with much greater precision than by trying to infer logic from generic measures. Instead of Copilot guessing how to calculate your margin, you explicitly expose a `CalculateMargin` function with clear documentation.",
          },
          {
            type: "paragraph",
            text: "For anyone investing in automation and AI within Power BI, this changes things considerably.",
          },
          {
            type: "heading",
            text: "Technical requirements",
          },
          {
            type: "paragraph",
            text: "Before you start creating functions, a heads-up: UDFs require a database compatibility level of 1702 or higher. Older models may need updating.",
          },
          {
            type: "paragraph",
            text: "In Power BI Desktop from the June 2026 release onward, the feature is enabled by default. In SSMS, support starts from version 22.5.",
          },
          {
            type: "heading",
            text: "Is it worth adopting now?",
          },
          {
            type: "paragraph",
            text: "For new models, the answer is straightforward: yes. Start using UDFs for any logic that repeats. Margins, taxes, currency conversion, business rules. Anything you'd write more than once is a candidate for a function.",
          },
          {
            type: "paragraph",
            text: "For legacy models, the process is more gradual. It's not worth refactoring everything at once. But as you need to adjust existing calculations, it's worth centralizing that logic into functions.",
          },
          {
            type: "paragraph",
            text: "DAX always had power. Now it has organization too.",
          },
          {
            type: "paragraph",
            text: "*Sources: Microsoft Power BI June 2026 Feature Summary, official Microsoft Learn documentation (DAX User-Defined Functions Best Practices), Microsoft Fabric Community.*",
          },
        ],
      },
    },
  },
  {
    slug: "nova-experiencia-do-power-query-no-power-bi-desktop-preview",
    locales: {
      "pt-br": {
        title: "Nova experiência do Power Query no Power BI Desktop (Preview)",
        summary:
          "Veja o que mudou na nova experiência do Power Query no Power BI Desktop, como ativar o preview e por que a atualização deixa o fluxo de conexão e preparação de dados mais simples.",
        eyebrow: "Power Query e Power BI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-09",
        readingTime: "5 min",
        body: [
          {
            type: "paragraph",
            text: "A Microsoft lançou, na atualização de maio de 2026 do Power BI Desktop, uma nova experiência do Power Query em preview. Não é uma mudança cosmética. É uma reformulação completa da forma como você conecta e prepara dados. E quem trabalha com Power BI no dia a dia vai sentir a diferença desde o primeiro clique.",
          },
          {
            type: "paragraph",
            text: "Se você ainda não ativou o recurso, este artigo explica o que mudou, o que melhorou e como habilitar o preview na sua máquina.",
          },
          {
            type: "heading",
            text: "O que é o Power Query e por que isso importa?",
          },
          {
            type: "paragraph",
            text: "Para quem está chegando agora: o Power Query é a ferramenta dentro do Power BI — e também do Excel — responsável por conectar, importar e transformar dados antes de eles chegarem ao seu relatório. É ali que você define de onde vêm os dados, como eles devem ser filtrados, combinados e organizados.",
          },
          {
            type: "paragraph",
            text: "Durante anos, a tela de \"Obter Dados\", ponto de entrada do Power Query, funcionou bem, mas ficou desatualizada. A interface acumulou conectores, botões e menus de uma forma que, para quem está começando, pode parecer intimidante. A nova experiência chega para resolver isso.",
          },
          {
            type: "heading",
            text: "O que mudou na prática",
          },
          {
            type: "heading",
            text: "1. Descoberta de fontes de dados muito mais rápida",
          },
          {
            type: "paragraph",
            text: "A nova tela de \"Obter Dados\" traz um painel de navegação lateral redesenhado. Em vez de uma lista interminável de ícones, agora você encontra caminhos mais diretos para localizar a fonte certa.",
          },
          {
            type: "list",
            items: [
              "**Novo**: acesso ao catálogo completo de conectores disponíveis.",
              "**Dados recentes**: reconecte rapidamente às fontes que você já usou.",
              "**OneLake Catalog**: acesse diretamente os itens de dados do Microsoft Fabric para os quais você já tem permissão.",
            ],
          },
          {
            type: "heading",
            text: "2. Fluxo de conexão simplificado",
          },
          {
            type: "paragraph",
            text: "Antes, conectar-se a uma fonte de dados envolvia navegar por várias janelas separadas: escolher o conector, configurar a autenticação, selecionar o modo de conectividade e confirmar cada etapa em um diálogo diferente.",
          },
          {
            type: "paragraph",
            text: "Agora, tudo isso está unificado em um fluxo mais coeso. Configurações, autenticação e modo de conexão aparecem em sequência lógica, sem saltos entre telas. Você escolhe a fonte e avança diretamente para a prévia dos dados.",
          },
          {
            type: "heading",
            text: "3. Acessibilidade e modo escuro",
          },
          {
            type: "list",
            items: [
              "**Navegação completa por teclado**: você pode percorrer toda a experiência sem usar o mouse.",
              "**Modo escuro**: um alívio visual bem-vindo para quem passa horas na frente da tela.",
            ],
          },
          {
            type: "heading",
            text: "4. Atalhos diretos para tarefas comuns",
          },
          {
            type: "list",
            items: [
              "**Tabela em branco**: ideal para digitar ou colar dados manualmente.",
              "**Consulta em branco**: para quem escreve código M e precisa de uma query customizada do zero.",
            ],
          },
          {
            type: "heading",
            text: "5. Consistência entre produtos Microsoft",
          },
          {
            type: "paragraph",
            text: "Um dos objetivos declarados da Microsoft é unificar a experiência do Power Query entre Power BI Desktop, Microsoft Fabric e Excel. Quem usa os três começa a sentir que está em um ambiente familiar, independentemente de onde estiver trabalhando.",
          },
          {
            type: "heading",
            text: "Como ativar o preview",
          },
          {
            type: "paragraph",
            text: "O recurso ainda está em fase de testes, então ele não vem ativado por padrão. Para habilitar:",
          },
          {
            type: "list",
            items: [
              "Abra o **Power BI Desktop**.",
              "Vá em **Arquivo > Opções e configurações > Opções**.",
              "No menu lateral, clique em **Recursos de visualização** (*Preview features*).",
              "Marque a opção **\"Nova experiência do Power Query\"**.",
              "Reinicie o Power BI Desktop.",
            ],
          },
          {
            type: "paragraph",
            text: "Na próxima vez que você clicar em \"Obter Dados\", a nova interface já estará disponível.",
          },
          {
            type: "heading",
            text: "Vale testar agora?",
          },
          {
            type: "paragraph",
            text: "Sim, especialmente se você trabalha com Power BI de forma regular. A nova experiência ainda é um preview, então podem existir bugs pontuais, mas o ganho em organização e velocidade já é perceptível.",
          },
          {
            type: "paragraph",
            text: "Para quem ensina Power BI ou faz onboarding de analistas novos, a interface mais limpa também ajuda bastante: a curva de aprendizado fica menor.",
          },
          {
            type: "paragraph",
            text: "A Microsoft está pedindo feedback da comunidade sobre o recurso. Se você encontrar problemas ou tiver sugestões, vale participar do fórum da Microsoft Fabric Community.",
          },
          {
            type: "heading",
            text: "Conclusão",
          },
          {
            type: "paragraph",
            text: "A nova experiência do Power Query no Power BI Desktop é um passo concreto na direção certa. Interface mais moderna, fluxo de conexão simplificado, acessibilidade nativa e integração mais forte com o ecossistema Microsoft Fabric.",
          },
          {
            type: "paragraph",
            text: "Não é uma revolução no que o Power Query faz, mas é uma melhora real em como você chega lá.",
          },
          {
            type: "paragraph",
            text: "Atualização de maio de 2026 do Power BI Desktop. Recurso disponível como preview, sujeito a alterações antes do lançamento oficial.",
          },
        ],
      },
      en: {
        title: "New Power Query Experience in Power BI Desktop (Preview)",
        summary:
          "Understand what changed in the new Power Query experience in Power BI Desktop, how to enable the preview, and why the update makes data connection and preparation faster and easier.",
        eyebrow: "Power Query and Power BI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-06-09",
        readingTime: "5 min",
        body: [
          {
            type: "paragraph",
            text: "Microsoft released a new Power Query experience in preview with the May 2026 Power BI Desktop update. This isn't a cosmetic change. It's a full redesign of how you connect and prepare data, and anyone who works with Power BI regularly will feel the difference from the very first click.",
          },
          {
            type: "paragraph",
            text: "If you haven't enabled the feature yet, this article breaks down what changed, what improved, and how to turn on the preview on your machine.",
          },
          {
            type: "heading",
            text: "What Is Power Query and Why Does It Matter?",
          },
          {
            type: "paragraph",
            text: "For those just getting started, Power Query is the tool inside Power BI — and Excel as well — responsible for connecting, importing, and transforming data before it reaches your report. It's where you define where the data comes from, how it should be filtered, combined, and organized.",
          },
          {
            type: "paragraph",
            text: "For years, the \"Get Data\" screen — Power Query's entry point — worked well but felt dated. The interface accumulated connectors, buttons, and menus in a way that can feel intimidating for beginners. The new experience is here to fix that.",
          },
          {
            type: "heading",
            text: "What Changed in Practice",
          },
          {
            type: "heading",
            text: "1. Faster Data Source Discovery",
          },
          {
            type: "paragraph",
            text: "The new \"Get Data\" screen brings a redesigned left-hand navigation panel. Instead of an endless list of icons, you now get clearer paths to find the right source faster.",
          },
          {
            type: "list",
            items: [
              "**New**: access the full catalog of available connectors.",
              "**Recent data**: quickly reconnect to sources you've already used.",
              "**OneLake Catalog**: directly access Microsoft Fabric data items you already have permission to use.",
            ],
          },
          {
            type: "heading",
            text: "2. Streamlined Connection Flow",
          },
          {
            type: "paragraph",
            text: "Previously, connecting to a data source meant moving through several separate windows: choosing the connector, configuring authentication, selecting connectivity mode, and confirming each step in a different dialog.",
          },
          {
            type: "paragraph",
            text: "Now everything is unified into a more cohesive flow. Settings, authentication, and connection mode appear in a logical sequence without jumping between dialogs. You choose a source and move straight to the data preview.",
          },
          {
            type: "heading",
            text: "3. Accessibility and Dark Mode",
          },
          {
            type: "list",
            items: [
              "**Full keyboard navigation**: you can move through the entire experience without touching the mouse.",
              "**Dark mode**: welcome visual relief for anyone spending long hours in front of a screen.",
            ],
          },
          {
            type: "heading",
            text: "4. Quick Shortcuts for Common Tasks",
          },
          {
            type: "list",
            items: [
              "**Blank Table**: ideal for typing or pasting data manually.",
              "**Blank Query**: for M code authors who need a custom query from scratch.",
            ],
          },
          {
            type: "heading",
            text: "5. Consistency Across Microsoft Products",
          },
          {
            type: "paragraph",
            text: "One of Microsoft's stated goals is to unify the Power Query experience across Power BI Desktop, Microsoft Fabric, and Excel. People who use all three start to feel at home regardless of where they are working.",
          },
          {
            type: "heading",
            text: "How to Enable the Preview",
          },
          {
            type: "paragraph",
            text: "The feature is still in testing, so it isn't enabled by default. To turn it on:",
          },
          {
            type: "list",
            items: [
              "Open **Power BI Desktop**.",
              "Go to **File > Options and settings > Options**.",
              "In the side menu, click **Preview features**.",
              "Check the **\"New Power Query experience\"** option.",
              "Restart Power BI Desktop.",
            ],
          },
          {
            type: "paragraph",
            text: "The next time you click \"Get Data\", the new interface will be available.",
          },
          {
            type: "heading",
            text: "Is It Worth Testing Now?",
          },
          {
            type: "paragraph",
            text: "Yes, especially if you use Power BI regularly. The new experience is still a preview, so there may be occasional bugs, but the gains in organization and speed are already noticeable.",
          },
          {
            type: "paragraph",
            text: "For anyone teaching Power BI or onboarding new analysts, the cleaner interface also helps a lot because it shortens the learning curve.",
          },
          {
            type: "paragraph",
            text: "Microsoft is actively asking the community for feedback on the feature. If you find issues or have suggestions, it's worth participating in the Microsoft Fabric Community forum.",
          },
          {
            type: "heading",
            text: "Conclusion",
          },
          {
            type: "paragraph",
            text: "The new Power Query experience in Power BI Desktop is a concrete step in the right direction: a more modern interface, a simpler connection flow, built-in accessibility, and tighter integration with the Microsoft Fabric ecosystem.",
          },
          {
            type: "paragraph",
            text: "It isn't a revolution in what Power Query does, but it is a real improvement in how you get there.",
          },
          {
            type: "paragraph",
            text: "Power BI Desktop May 2026 update. Feature available as a preview and subject to change before the official release.",
          },
        ],
      },
    },
  },
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
    slug: "microsoft-fabric-data-warehouse-gpu-acceleration",
    featured: false,
    locales: {
      "pt-br": {
        title: "Microsoft Fabric ficou até 7x mais rápido com GPU no Data Warehouse",
        summary:
          "Entenda como a aceleração por GPU no Fabric Data Warehouse promete consultas até 7x mais rápidas, por que o CoddSpeed importa e o que muda para equipes de analytics.",
        eyebrow: "Microsoft Fabric",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-06-23",
        readingTime: "4 min",
        body: [
          {
            type: "paragraph",
            text: "Durante anos, melhorar a performance de um data warehouse era sinônimo de gastar mais: mais servidores, mais memória, mais dinheiro. A Microsoft acaba de virar essa lógica de cabeça para baixo no Microsoft Build 2026, anunciando aceleração por GPU no Fabric Data Warehouse, com ganhos de até 7 vezes na velocidade de consultas, sem reescrever uma linha de SQL.",
          },
          {
            type: "paragraph",
            text: "O early access preview está previsto para julho de 2026. Mas já dá para entender o que está em jogo.",
          },
          { type: "heading", text: "O que é o CoddSpeed" },
          {
            type: "paragraph",
            text: "A tecnologia por trás da aceleração tem um nome: CoddSpeed. Não se trata de um ajuste pontual no sistema, mas de um motor de execução de queries desenvolvido ao longo de vários anos pela Microsoft Research, derivado de um protótipo chamado TQP (Tensor Query Processor).",
          },
          {
            type: "paragraph",
            text: 'O trabalho técnico foi tão sólido que o paper "CoddSpeed: Hardware Accelerated Query Processing in Microsoft Fabric" ganhou o prêmio de Best Industry Paper no ACM SIGMOD 2026, a conferência mais importante de bancos de dados no mundo acadêmico.',
          },
          {
            type: "paragraph",
            text: "A arquitetura do CoddSpeed é construída em torno de algo chamado Coprocessor Abstraction Layer (CAL), uma camada de abstração que permite ao sistema distribuir partes das queries para diferentes tipos de hardware, GPUs, FPGAs ou ASICs, de forma automática. Se uma query não for elegível para GPU, o sistema cai de volta para CPU sem travar, sem erro, sem interrupção.",
          },
          { type: "heading", text: "Os números dos benchmarks" },
          {
            type: "paragraph",
            text: "A Microsoft divulgou benchmarks internos realizados em maio de 2026, com até 64 usuários simultâneos consultando o Data Warehouse. Os resultados:",
          },
          {
            type: "list",
            items: [
              "**1 usuário simultâneo:** 3x mais rápido que concorrentes CPU-based",
              "**16 usuários simultâneos:** 6x mais rápido",
              "**64 usuários simultâneos:** até 7x mais rápido",
            ],
          },
          {
            type: "paragraph",
            text: "O padrão aqui é interessante. A aceleração não é linear: ela cresce conforme a concorrência aumenta. GPUs são projetadas para paralelismo massivo, então quanto mais usuários disputam recursos ao mesmo tempo, mais o hardware joga a favor.",
          },
          {
            type: "paragraph",
            text: 'Nos benchmarks técnicos com TPC-H SF=100 num único NVIDIA A100, o CoddSpeed registrou 7,9x de speedup em consultas "warm" e 4,7x em consultas "cold". Com 8 GPUs H100 num único nó e dataset de 1 TB (TPC-H SF=1000), o speedup chegou a 27,1x em relação à execução em CPU.',
          },
          {
            type: "paragraph",
            text: "Para ter uma referência: o CoddSpeed foi medido como aproximadamente 2x mais rápido que o HeavyDB, que já é considerado um dos processadores de query em GPU mais rápidos disponíveis.",
          },
          { type: "heading", text: "Como ativar" },
          {
            type: "paragraph",
            text: "A parte mais surpreendente da novidade não é o número, é a simplicidade de adoção. Não há migração de dados. Não há reescrita de queries. Não há provisionamento de infraestrutura especial.",
          },
          {
            type: "paragraph",
            text: "A aceleração por GPU é habilitada por um toggle nas configurações do workspace. A partir daí, o otimizador de queries do Fabric decide automaticamente quais partes de cada consulta vão para GPU e quais ficam na CPU. O usuário final não precisa saber nem perceber que está acontecendo.",
          },
          {
            type: "paragraph",
            text: "Todos os SQL Analytics Endpoints e Data Warehouses dentro do workspace afetado recebem a aceleração automaticamente.",
          },
          { type: "heading", text: "Por que isso importa agora" },
          {
            type: "paragraph",
            text: "O timing não é coincidência. Analytics corporativo está mudando de perfil. Antes, o data warehouse servia principalmente relatórios batch, consultas pesadas rodando de madrugada, painéis atualizados uma vez por dia. Isso tolerava latência.",
          },
          {
            type: "paragraph",
            text: "A nova demanda vem de sistemas de IA, agentes autônomos e aplicações que consultam dados em tempo real para tomar decisões. Essas cargas de trabalho exigem velocidade de resposta que CPUs, por melhor que sejam, têm dificuldade de entregar quando a concorrência aumenta.",
          },
          {
            type: "paragraph",
            text: "A Microsoft está posicionando o Fabric Data Warehouse não mais como um repositório de dados para relatórios, mas como uma camada de execução ativa para IA, agentes e sistemas que raciocinam continuamente sobre dados. GPU é a peça que viabiliza isso em escala.",
          },
          { type: "heading", text: "O que muda para quem usa Fabric hoje" },
          {
            type: "paragraph",
            text: "Se você já trabalha com Microsoft Fabric, a principal mensagem é: não precisa fazer nada diferente para se beneficiar da mudança quando o preview estiver disponível. Suas queries SQL existentes vão rodar igual a antes. Só que mais rápido.",
          },
          {
            type: "paragraph",
            text: "Para equipes que sofrem com dashboards lentos em horários de pico, relatórios que travam quando muitos usuários acessam ao mesmo tempo, ou modelos semânticos que demoram demais para processar consultas complexas, esse anúncio é diretamente relevante.",
          },
          {
            type: "paragraph",
            text: "O preview começa em julho. Vale acompanhar.",
          },
          {
            type: "paragraph",
            text: "**Fontes:** Microsoft Fabric Blog (Build 2026), Microsoft Research (CoddSpeed paper), ACM SIGMOD 2026, benchmarks internos Microsoft (maio/2026).",
          },
        ],
      },
      en: {
        title:
          "Microsoft Fabric Data Warehouse is now up to 7x faster with GPU acceleration",
        summary:
          "Learn how GPU acceleration in Fabric Data Warehouse promises queries up to 7x faster, why CoddSpeed matters, and what changes for analytics teams.",
        eyebrow: "Microsoft Fabric",
        author: "Renan Brognoli",
        category: "Microsoft Fabric",
        publishedAt: "2026-06-23",
        readingTime: "4 min",
        body: [
          {
            type: "paragraph",
            text: "For years, improving data warehouse performance meant spending more: more servers, more memory, more money. Microsoft just turned that logic upside down at Microsoft Build 2026, announcing GPU acceleration for the Fabric Data Warehouse, with query speed gains of up to 7x, and without rewriting a single line of SQL.",
          },
          {
            type: "paragraph",
            text: "The early access preview is scheduled for July 2026. Here's what's actually happening under the hood.",
          },
          { type: "heading", text: "Meet CoddSpeed" },
          {
            type: "paragraph",
            text: "The technology powering the acceleration has a name: CoddSpeed. This isn't a minor tweak to the system. It's a query execution engine developed over several years by Microsoft Research, derived from a prototype called TQP (Tensor Query Processor).",
          },
          {
            type: "paragraph",
            text: 'The technical work behind it was solid enough to earn the Best Industry Paper award at ACM SIGMOD 2026, the most prestigious database conference in academia. The paper is titled "CoddSpeed: Hardware Accelerated Query Processing in Microsoft Fabric."',
          },
          {
            type: "paragraph",
            text: "CoddSpeed is built around something called the Coprocessor Abstraction Layer (CAL), a hardware-agnostic API that allows the system to automatically route query fragments to different types of hardware accelerators: GPUs, FPGAs, or ASICs. If a query isn't eligible for GPU processing, the system falls back to CPU seamlessly, with no errors and no interruptions.",
          },
          { type: "heading", text: "The benchmark numbers" },
          {
            type: "paragraph",
            text: "Microsoft published internal benchmarks conducted in May 2026, testing up to 64 simultaneous users querying the Data Warehouse. The results:",
          },
          {
            type: "list",
            items: [
              "**1 concurrent user:** 3x faster than CPU-based competitors",
              "**16 concurrent users:** 6x faster",
              "**64 concurrent users:** up to 7x faster",
            ],
          },
          {
            type: "paragraph",
            text: "The pattern here is worth noting. The acceleration isn't linear: it compounds as concurrency increases. GPUs are designed for massive parallelism, so the more users competing for resources simultaneously, the more the hardware works in your favor.",
          },
          {
            type: "paragraph",
            text: "On TPC-H SF=100 benchmarks with a single NVIDIA A100 GPU, CoddSpeed recorded a 7.9x warm speedup and 4.7x cold speedup. With 8x H100 GPUs on a single node at TPC-H SF=1000 (1 TB dataset), the speedup reached 27.1x compared to CPU execution.",
          },
          {
            type: "paragraph",
            text: "For context: CoddSpeed was measured as approximately 2x faster than HeavyDB, already considered one of the fastest GPU query processors available.",
          },
          { type: "heading", text: "How to enable it" },
          {
            type: "paragraph",
            text: "The most surprising part of this announcement isn't the numbers. It's how simple adoption is. No data migration. No query rewrites. No special infrastructure provisioning.",
          },
          {
            type: "paragraph",
            text: "GPU acceleration is enabled through a single toggle in workspace settings. From there, Fabric's query optimizer automatically decides which parts of each query go to the GPU and which stay on the CPU. End users don't need to know or even notice it's happening.",
          },
          {
            type: "paragraph",
            text: "All SQL Analytics Endpoints and Data Warehouses within the affected workspace receive the acceleration automatically.",
          },
          { type: "heading", text: "Why this matters right now" },
          {
            type: "paragraph",
            text: "The timing isn't coincidental. Corporate analytics is changing. Historically, the data warehouse served primarily batch reporting: heavy queries running overnight, dashboards updated once a day. Latency was tolerable.",
          },
          {
            type: "paragraph",
            text: "The new demand comes from AI systems, autonomous agents, and applications that query data in real time to make decisions. These workloads require response speeds that CPUs, no matter how good, struggle to deliver as concurrency scales up.",
          },
          {
            type: "paragraph",
            text: "Microsoft is repositioning the Fabric Data Warehouse from a reporting repository into an active execution layer for AI, agents, and systems that continuously reason over data. GPU is the piece that makes this viable at scale.",
          },
          { type: "heading", text: "What changes for current Fabric users" },
          {
            type: "paragraph",
            text: "If you already work with Microsoft Fabric, the main takeaway is simple: you don't need to do anything differently to benefit from this when the preview becomes available. Your existing SQL queries will run exactly as before. Just faster.",
          },
          {
            type: "paragraph",
            text: "For teams dealing with slow dashboards during peak hours, reports that lock up when too many users connect simultaneously, or semantic models that take too long to process complex queries, this announcement is directly relevant.",
          },
          {
            type: "paragraph",
            text: "The preview starts in July. Worth keeping an eye on.",
          },
          {
            type: "paragraph",
            text: "**Sources:** Microsoft Fabric Blog (Build 2026), Microsoft Research (CoddSpeed paper), ACM SIGMOD 2026, Microsoft internal benchmarks (May 2026).",
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
  {
    slug: "copilot-funcao-nativa-no-excel",
    locales: {
      "pt-br": {
        title: "=COPILOT(): A IA que Chegou Direto na Célula do Excel",
        summary:
          "Veja como a nova função =COPILOT() leva IA generativa direto para a célula do Excel, quais tarefas ela resolve melhor e o que muda para quem trabalha com dados no Microsoft 365.",
        eyebrow: "Excel e IA",
        author: "Renan Brognoli",
        category: "Excel",
        publishedAt: "2026-06-04",
        readingTime: "5 min",
        body: [
          {
            type: "paragraph",
            text: "Imagine digitar numa célula do Excel algo como `=COPILOT(\"Categorize esses dados de venda por região\", A2:A100)` e receber uma análise completa em segundos — sem fórmulas complexas, sem VBA, sem enrolação. Isso já é realidade.",
          },
          {
            type: "paragraph",
            text: "A Microsoft lançou a função `=COPILOT()` como fórmula nativa do Excel para usuários do Microsoft 365, e ela está mudando silenciosamente a forma como profissionais trabalham com dados no dia a dia.",
          },
          {
            type: "heading",
            text: "O que é a função =COPILOT()?",
          },
          {
            type: "paragraph",
            text: "É exatamente o que o nome sugere: o Copilot — assistente de IA da Microsoft — embutido diretamente dentro de uma célula da planilha. Diferente do painel lateral do Copilot, esta função funciona como qualquer outra fórmula: você escreve, pressiona Enter e recebe o resultado na célula.",
          },
          {
            type: "paragraph",
            text: "A sintaxe básica é:",
          },
          {
            type: "code",
            language: "text",
            code: "=COPILOT(prompt, [contexto1], [prompt2], [contexto2], ...)",
          },
          {
            type: "list",
            items: [
              "**prompt**: a instrução em linguagem natural, descrevendo o que você quer que a IA faça",
              "**contexto**: o intervalo de células com os dados que a IA deve analisar",
            ],
          },
          {
            type: "paragraph",
            text: "Um exemplo prático:",
          },
          {
            type: "code",
            language: "text",
            code: "=COPILOT(\"Analise o sentimento deste comentário de cliente\", B2)",
          },
          {
            type: "paragraph",
            text: "O resultado aparece diretamente na célula — e, como qualquer fórmula, se os dados de origem mudarem, o resultado é recalculado automaticamente.",
          },
          {
            type: "heading",
            text: "O que essa função consegue fazer?",
          },
          {
            type: "paragraph",
            text: "A `=COPILOT()` foi desenhada para tarefas que as fórmulas tradicionais não conseguem fazer com facilidade. Entre as principais:",
          },
          {
            type: "list",
            items: [
              "**Categorização de texto livre**: classifica comentários, respostas de formulários ou descrições em grupos",
              "**Análise de sentimento**: diz se um feedback é positivo, negativo ou neutro",
              "**Limpeza e padronização de dados**: corrige variações de escrita, formata endereços, padroniza nomes",
              "**Extração de informações**: tira e-mails, telefones ou datas de textos não estruturados",
              "**Resumos**: condensa parágrafos inteiros em uma linha",
              "**Geração de listas**: cria sugestões, próximos passos ou variações com base em contexto",
            ],
          },
          {
            type: "paragraph",
            text: "E mais: a função suporta **Dynamic Arrays**, ou seja, pode retornar múltiplos resultados de uma só vez, espalhando os dados automaticamente pelas células adjacentes.",
          },
          {
            type: "heading",
            text: "Isso substitui as fórmulas normais?",
          },
          {
            type: "paragraph",
            text: "Não — e a própria Microsoft deixa isso claro. A `=COPILOT()` é poderosa para tarefas **semânticas e generativas**, mas não é recomendada para cálculos numéricos que exigem precisão e reprodutibilidade. Para isso, as fórmulas clássicas como `SOMASE`, `PROCV` ou `CONT.SE` continuam sendo a escolha certa.",
          },
          {
            type: "paragraph",
            text: "Pense assim: fórmulas tradicionais são determinísticas — a mesma entrada sempre gera a mesma saída. O Copilot é um modelo de IA, o que significa que os resultados podem variar com o tempo à medida que o modelo é atualizado. Para análises qualitativas, categorização e interpretação de texto, ele é imbatível. Para cálculos contábeis, continue com as fórmulas de sempre.",
          },
          {
            type: "heading",
            text: "Como está disponível hoje?",
          },
          {
            type: "paragraph",
            text: "A função chegou em agosto de 2025 para usuários do **Canal Beta** do Microsoft 365 Insider, e desde então tem expandido gradualmente. Em maio de 2026, a Microsoft aprimorou ainda mais a função, adicionando a capacidade de **buscar informações na web** em tempo real dentro da própria célula.",
          },
          {
            type: "paragraph",
            text: "Para usar, você precisa de:",
          },
          {
            type: "list",
            items: [
              "**Licença Microsoft 365 Copilot** (plano comercial — não está disponível nos planos pessoal/família)",
              "**Conta Microsoft Entra ID** (antes chamada Azure AD)",
              "**Canal Beta ou Insider** do Excel",
            ],
          },
          {
            type: "paragraph",
            text: "Uma limitação importante: a função exige **conexão com a internet** e só acessa os dados que você fornece diretamente como contexto nos argumentos. Ela não tem visão de toda a sua planilha automaticamente — você precisa indicar os intervalos.",
          },
          {
            type: "heading",
            text: "Por que isso importa para quem trabalha com dados?",
          },
          {
            type: "paragraph",
            text: "Durante anos, a barreira para análise de dados no Excel foi justamente a parte técnica: saber qual fórmula usar, como combinar funções, quando recorrer a Power Query ou macros. O `=COPILOT()` começa a remover essa barreira.",
          },
          {
            type: "paragraph",
            text: "Profissionais que lidam com relatórios, bases de clientes, feedbacks de pesquisas ou qualquer dado textual ganham uma ferramenta que entende linguagem natural e entrega respostas diretamente no fluxo de trabalho deles — sem precisar sair do Excel, sem precisar aprender Python, sem precisar contratar um analista para cada análise exploratória.",
          },
          {
            type: "paragraph",
            text: "Para equipes que já usam Power BI e Excel no dia a dia, a integração com o ecossistema Microsoft 365 Copilot cria um fluxo contínuo: explorar no Excel com `=COPILOT()`, visualizar no Power BI, colaborar no Teams. A IA começa a ser não um produto separado, mas uma camada embutida nas ferramentas que você já usa.",
          },
          {
            type: "heading",
            text: "Conclusão",
          },
          {
            type: "paragraph",
            text: "A função `=COPILOT()` não é uma novidade que fica só no papel. Ela representa uma mudança real na forma como o Excel funciona — e sinaliza o caminho que a Microsoft está traçando para o futuro das ferramentas de produtividade: IA não como painel lateral, mas como parte do fluxo de trabalho.",
          },
          {
            type: "paragraph",
            text: "Se você tem acesso ao plano comercial do Microsoft 365, vale começar a experimentar. E se ainda não tem, é um bom motivo para ficar de olho nos próximos meses — a tendência é que essa funcionalidade se expanda para mais planos com o tempo.",
          },
          {
            type: "paragraph",
            text: "O Excel nunca mais vai ser o mesmo.",
          },
        ],
      },
      en: {
        title: "=COPILOT(): The AI That Landed Right Inside an Excel Cell",
        summary:
          "Understand how the new =COPILOT() function brings generative AI directly into Excel cells, which tasks it handles best, and why it matters for data work inside Microsoft 365.",
        eyebrow: "Excel and AI",
        author: "Renan Brognoli",
        category: "Excel",
        publishedAt: "2026-06-04",
        readingTime: "5 min",
        body: [
          {
            type: "paragraph",
            text: "Imagine typing something like `=COPILOT(\"Categorize this sales data by region\", A2:A100)` into an Excel cell and getting a complete analysis in seconds — no complex formulas, no VBA, no hassle. That's already a reality.",
          },
          {
            type: "paragraph",
            text: "Microsoft launched the `=COPILOT()` function as a native Excel formula for Microsoft 365 users, and it's quietly changing the way professionals handle data every day.",
          },
          {
            type: "heading",
            text: "What Is the =COPILOT() Function?",
          },
          {
            type: "paragraph",
            text: "It's exactly what the name suggests: Copilot — Microsoft's AI assistant — embedded directly inside a spreadsheet cell. Unlike the Copilot side panel, this function works like any other formula: you type it, hit Enter, and the result appears in the cell.",
          },
          {
            type: "paragraph",
            text: "The basic syntax is:",
          },
          {
            type: "code",
            language: "text",
            code: "=COPILOT(prompt, [context1], [prompt2], [context2], ...)",
          },
          {
            type: "list",
            items: [
              "**prompt**: a natural language instruction describing what you want the AI to do",
              "**context**: the cell range containing the data you want the AI to analyze",
            ],
          },
          {
            type: "paragraph",
            text: "A practical example:",
          },
          {
            type: "code",
            language: "text",
            code: "=COPILOT(\"Analyze the sentiment of this customer comment\", B2)",
          },
          {
            type: "paragraph",
            text: "The result appears directly in the cell — and, like any formula, if the source data changes, the result recalculates automatically.",
          },
          {
            type: "heading",
            text: "What Can This Function Do?",
          },
          {
            type: "paragraph",
            text: "`=COPILOT()` was designed for tasks that traditional formulas can't handle easily. Key use cases include:",
          },
          {
            type: "list",
            items: [
              "**Free-text categorization**: classifies comments, form responses, or descriptions into groups",
              "**Sentiment analysis**: determines whether feedback is positive, negative, or neutral",
              "**Data cleaning and standardization**: fixes spelling variations, formats addresses, standardizes names",
              "**Information extraction**: pulls emails, phone numbers, or dates from unstructured text",
              "**Summarization**: condenses entire paragraphs into a single line",
              "**List generation**: creates suggestions, next steps, or variations based on context",
            ],
          },
          {
            type: "paragraph",
            text: "On top of that, the function supports **Dynamic Arrays** — meaning it can return multiple results at once, automatically spilling data into adjacent cells.",
          },
          {
            type: "heading",
            text: "Does This Replace Regular Formulas?",
          },
          {
            type: "paragraph",
            text: "No — and Microsoft is clear about this. `=COPILOT()` is powerful for **semantic and generative tasks**, but it's not recommended for numerical calculations that require precision and reproducibility. For those, classic formulas like `SUMIF`, `VLOOKUP`, or `COUNTIF` are still the right choice.",
          },
          {
            type: "paragraph",
            text: "Think of it this way: traditional formulas are deterministic — the same input always produces the same output. Copilot is an AI model, which means results can vary over time as the model gets updated. For qualitative analysis, text categorization, and interpretation, it's unbeatable. For accounting calculations, stick with the formulas you already know.",
          },
          {
            type: "heading",
            text: "How Is It Available Today?",
          },
          {
            type: "paragraph",
            text: "The function rolled out in August 2025 for users on the **Microsoft 365 Insider Beta Channel**, and it has been gradually expanding ever since. In May 2026, Microsoft enhanced it further by adding the ability to **search the web in real time** directly from within the cell.",
          },
          {
            type: "paragraph",
            text: "To use it, you need:",
          },
          {
            type: "list",
            items: [
              "A **Microsoft 365 Copilot license** (commercial plan — not available on personal/family plans)",
              "A **Microsoft Entra ID account** (formerly Azure AD)",
              "The **Beta or Insider Channel** version of Excel",
            ],
          },
          {
            type: "paragraph",
            text: "One important limitation: the function requires an **active internet connection** and only accesses data you explicitly provide as context in the arguments. It doesn't automatically see your entire spreadsheet — you need to specify the ranges.",
          },
          {
            type: "heading",
            text: "Why Does This Matter for Data Professionals?",
          },
          {
            type: "paragraph",
            text: "For years, the barrier to data analysis in Excel has been the technical side: knowing which formula to use, how to combine functions, when to reach for Power Query or macros. `=COPILOT()` starts tearing down that barrier.",
          },
          {
            type: "paragraph",
            text: "Professionals who work with reports, customer databases, survey feedback, or any kind of text data gain a tool that understands natural language and delivers answers directly in their workflow — without leaving Excel, without learning Python, without hiring an analyst for every exploratory analysis.",
          },
          {
            type: "paragraph",
            text: "For teams already using Power BI and Excel daily, the integration with the Microsoft 365 Copilot ecosystem creates a seamless flow: explore in Excel with `=COPILOT()`, visualize in Power BI, collaborate in Teams. AI stops being a separate product and becomes a layer embedded in the tools you already use.",
          },
          {
            type: "heading",
            text: "Conclusion",
          },
          {
            type: "paragraph",
            text: "The `=COPILOT()` function isn't just a paper announcement. It represents a real shift in how Excel works — and signals the path Microsoft is charting for the future of productivity tools: AI not as a side panel, but as part of the workflow itself.",
          },
          {
            type: "paragraph",
            text: "If you have access to a commercial Microsoft 365 plan, it's worth starting to experiment. And if you don't yet, it's a good reason to keep watching the coming months — the expectation is that this feature will expand to more plans over time.",
          },
          {
            type: "paragraph",
            text: "Excel will never be the same.",
          },
        ],
      },
    },
  },
  {
    slug: "power-bi-desktop-bridge-o-que-e-e-o-que-muda-na-automacao",
    featured: false,
    locales: {
      "pt-br": {
        title: "Power BI Desktop Bridge: o que é e o que muda na sua automação",
        summary:
          "O Power BI Desktop Bridge chegou em preview em junho de 2026 e abre um canal local e seguro para que aplicativos, scripts e agentes de IA se comuniquem diretamente com o Power BI Desktop. Entenda como funciona e por que isso muda o jogo da automação.",
        eyebrow: "Power BI e Automação",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-07-07",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "Desde junho de 2026, o Power BI Desktop tem um novo recurso em preview que passou despercebido pela maioria dos analistas. Chama-se Power BI Desktop Bridge, e ele abre algo que o ecossistema do Power BI nunca teve de forma nativa: um canal direto, seguro e local para que aplicativos externos, scripts e agentes de IA se comuniquem com o Desktop enquanto ele está aberto na sua máquina.",
          },
          {
            type: "paragraph",
            text: "Parece técnico demais? É. Mas as consequências práticas são bem concretas.",
          },
          {
            type: "heading",
            text: "O que é, afinal",
          },
          {
            type: "paragraph",
            text: "O Desktop Bridge é um servidor local que roda dentro do próprio processo do Power BI Desktop. Ele expõe um endpoint de named pipe, um mecanismo de comunicação entre processos (IPC) que opera exclusivamente na mesma máquina. Nada sai pela rede. Nenhuma porta de rede exposta. Nenhum acesso remoto.",
          },
          {
            type: "paragraph",
            text: "Cada janela aberta do Power BI Desktop cria seu próprio canal, identificado pelo ID do processo. Se você tiver três arquivos abertos ao mesmo tempo, cada um tem seu bridge independente, e o cliente que se conectar precisa escolher com qual instância quer falar.",
          },
          {
            type: "paragraph",
            text: "O protocolo de comunicação é JSON-RPC 2.0, com framing por Content-Length. Isso significa que qualquer linguagem que saiba construir um JSON e enviar por um named pipe consegue se integrar ao bridge. PowerShell, Python, Node.js, o que você preferir.",
          },
          {
            type: "heading",
            text: "Para que serve na prática",
          },
          {
            type: "paragraph",
            text: "O bridge expõe um conjunto de APIs que, na versão atual de preview, cobrem quatro operações principais.",
          },
          {
            type: "paragraph",
            text: "Descoberta de capacidades: o método bridge.manifest retorna a lista completa de APIs suportadas pela versão instalada do Desktop. Como o bridge pode mudar entre versões, chamar esse método antes de qualquer outra coisa é o caminho certo para evitar o erro -32601 MethodNotFound.",
          },
          {
            type: "paragraph",
            text: "Estado do relatório: com application.state.get/v1 dá para saber qual arquivo está aberto e se há alterações não salvas. Útil para scripts que precisam garantir que o ambiente está num estado estável antes de agir.",
          },
          {
            type: "paragraph",
            text: "Captura de screenshot: o report.snapshot.capture/v1 tira uma captura da página atual do relatório em PNG, com resolução configurável. Esse é um dos métodos mais poderosos do bridge, porque permite que um agente de IA veja visualmente como ficou uma alteração antes de decidir o próximo passo.",
          },
          {
            type: "paragraph",
            text: "Recarregamento de arquivo: o file.reload/v1 instrui o Desktop a reler o arquivo PBIP ou PBIR do disco. Ou seja: um script faz alterações nos arquivos do projeto, chama esse método, e o Desktop recarrega tudo sem que o analista precise fechar e abrir de novo.",
          },
          {
            type: "heading",
            text: "Por que isso importa para quem trabalha com IA",
          },
          {
            type: "paragraph",
            text: "Essas quatro operações, juntas, formam um loop de desenvolvimento que antes era impossível de automatizar de forma confiável: editar, recarregar, capturar screenshot, validar, corrigir.",
          },
          {
            type: "paragraph",
            text: "Agentes de IA que desenvolvem relatórios no Power BI agora podem verificar o resultado visual de cada alteração sem depender de simulações ou de imagens estáticas de referência. O agente aplica uma mudança nos arquivos do projeto, recarrega o Desktop via bridge, captura o screenshot e decide se o resultado está correto. Se não estiver, ajusta e repete. Tudo isso sem intervenção humana.",
          },
          {
            type: "paragraph",
            text: "Isso não é cenário futurista. O Microsoft Build 2026 apresentou o Agent Skills for Power BI em preview, que usa exatamente esse tipo de loop para construir e refinar modelos semânticos e relatórios por meio de descrições em linguagem natural. O Desktop Bridge é uma das peças de infraestrutura que viabiliza esse fluxo.",
          },
          {
            type: "heading",
            text: "Como habilitar",
          },
          {
            type: "paragraph",
            text: "O bridge já vem ativado por padrão nas versões de junho de 2026 em diante. Para confirmar ou desativar, o caminho é: Arquivo > Opções e Configurações > Opções > Funcionalidades de Preview > Habilitar acesso de ferramentas externas ao Power BI Desktop por meio de APIs locais seguras.",
          },
          {
            type: "paragraph",
            text: "Se você usa versões anteriores, o recurso não está disponível.",
          },
          {
            type: "heading",
            text: "Qual é a relação com as ferramentas externas que já existem",
          },
          {
            type: "paragraph",
            text: "O DAX Studio, o Tabular Editor e outras ferramentas externas se conectam ao Analysis Services local que o Power BI Desktop expõe. Essa conexão é para o modelo semântico, o motor de dados por trás do relatório.",
          },
          {
            type: "paragraph",
            text: "O Desktop Bridge é outra coisa. Ele não fala com o Analysis Services. Ele fala com o próprio processo do Desktop, permitindo controlar o comportamento do aplicativo: recarregar arquivo, capturar tela, consultar estado. É uma camada de controle de UI e ciclo de vida, não de modelo de dados.",
          },
          {
            type: "paragraph",
            text: "As duas abordagens são complementares. Um agente sofisticado pode usar o Analysis Services para consultar e modificar o modelo e o Desktop Bridge para verificar visualmente o resultado.",
          },
          {
            type: "heading",
            text: "O que esperar daqui pra frente",
          },
          {
            type: "paragraph",
            text: "O bridge está em preview, o que significa que a API pode mudar antes da disponibilidade geral. A Microsoft já sinalizou que o conjunto de métodos pode crescer. As candidatas naturais para as próximas versões são operações de navegação entre páginas, controle de filtros e slicers e exportação de dados.",
          },
          {
            type: "paragraph",
            text: "Para quem desenvolve ferramentas para o ecossistema Power BI, o momento de começar a experimentar é agora. A Microsoft claramente está construindo a infraestrutura para um mundo onde agentes de IA participam ativamente do desenvolvimento de relatórios, e o Desktop Bridge é a fundação local dessa arquitetura.",
          },
          {
            type: "paragraph",
            text: "Quem entender como isso funciona antes da disponibilidade geral vai sair na frente quando os recursos chegarem ao estado estável.",
          },
        ],
      },
      en: {
        title: "Power BI Desktop Bridge: what it is and what it changes for automation",
        summary:
          "The Power BI Desktop Bridge shipped in preview in June 2026 and opens a secure, local channel for external apps, scripts, and AI agents to communicate directly with Power BI Desktop. Here's how it works and why it changes the automation game.",
        eyebrow: "Power BI and Automation",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-07-07",
        readingTime: "9 min",
        body: [
          {
            type: "paragraph",
            text: "Since June 2026, Power BI Desktop has shipped a new preview feature that most analysts have barely noticed. It's called the Power BI Desktop Bridge, and it opens something the Power BI ecosystem never had natively: a direct, secure, local channel for external applications, scripts, and AI agents to communicate with Desktop while it's running on your machine.",
          },
          {
            type: "paragraph",
            text: "Sounds too technical? It is. But the practical consequences are concrete.",
          },
          {
            type: "heading",
            text: "What it actually is",
          },
          {
            type: "paragraph",
            text: "The Desktop Bridge is a local server running inside the Power BI Desktop process itself. It exposes a named pipe endpoint, an inter-process communication (IPC) mechanism that operates exclusively on the same machine. Nothing goes over the network. No exposed network ports. No remote access.",
          },
          {
            type: "paragraph",
            text: "Each open Power BI Desktop window creates its own channel, identified by its process ID. If you have three files open at the same time, each one has an independent bridge, and the connecting client must choose which instance to talk to.",
          },
          {
            type: "paragraph",
            text: "The communication protocol is JSON-RPC 2.0 with Content-Length framing. That means any language capable of building a JSON payload and sending it through a named pipe can integrate with the bridge — PowerShell, Python, Node.js, whatever you prefer.",
          },
          {
            type: "heading",
            text: "What it does in practice",
          },
          {
            type: "paragraph",
            text: "The bridge exposes a set of APIs that, in the current preview version, cover four main operations.",
          },
          {
            type: "paragraph",
            text: "Capability discovery: the bridge.manifest method returns the full list of APIs supported by the installed version of Desktop. Since the bridge can change between versions, calling this method before anything else is the right move to avoid the -32601 MethodNotFound error.",
          },
          {
            type: "paragraph",
            text: "Report state: with application.state.get/v1 you can check which file is open and whether there are unsaved changes. Useful for scripts that need to verify the environment is in a stable state before acting.",
          },
          {
            type: "paragraph",
            text: "Screenshot capture: the report.snapshot.capture/v1 takes a PNG screenshot of the current report page at a configurable resolution. This is one of the bridge's most powerful methods, because it lets an AI agent visually inspect the result of a change before deciding what to do next.",
          },
          {
            type: "paragraph",
            text: "File reload: the file.reload/v1 instructs Desktop to re-read the PBIP or PBIR project file from disk. Meaning: a script makes changes to the project files, calls this method, and Desktop reloads everything without the analyst needing to close and reopen it manually.",
          },
          {
            type: "heading",
            text: "Why this matters for anyone working with AI",
          },
          {
            type: "paragraph",
            text: "These four operations together form a development loop that was previously impossible to reliably automate: edit, reload, capture screenshot, validate, correct.",
          },
          {
            type: "paragraph",
            text: "AI agents that develop Power BI reports can now verify the visual result of each change without relying on simulations or static reference images. The agent applies a change to the project files, reloads Desktop via the bridge, captures the screenshot, and decides whether the result looks right. If it doesn't, it adjusts and repeats. All without human intervention.",
          },
          {
            type: "paragraph",
            text: "This isn't a futuristic scenario. Microsoft Build 2026 introduced Agent Skills for Power BI in preview, which uses exactly this kind of loop to build and refine semantic models and reports through natural language descriptions. The Desktop Bridge is one of the infrastructure pieces that makes this workflow possible.",
          },
          {
            type: "heading",
            text: "How to enable it",
          },
          {
            type: "paragraph",
            text: "The bridge ships enabled by default on June 2026 and later versions. To verify or toggle it: File > Options and Settings > Options > Preview Features > Enable external tool access to Power BI Desktop through secure local APIs.",
          },
          {
            type: "paragraph",
            text: "If you're on an earlier version, the feature isn't available.",
          },
          {
            type: "heading",
            text: "How it relates to existing external tools",
          },
          {
            type: "paragraph",
            text: "DAX Studio, Tabular Editor, and other external tools connect to the local Analysis Services instance that Power BI Desktop exposes. That connection targets the semantic model, the data engine behind the report.",
          },
          {
            type: "paragraph",
            text: "The Desktop Bridge is a different thing. It doesn't talk to Analysis Services. It talks to the Desktop process itself, allowing control over application behavior: reload the file, capture the screen, query state. It's a UI and lifecycle control layer, not a data model layer.",
          },
          {
            type: "paragraph",
            text: "The two approaches are complementary. A sophisticated agent can use Analysis Services to query and modify the model, and the Desktop Bridge to visually verify the result.",
          },
          {
            type: "heading",
            text: "What to expect going forward",
          },
          {
            type: "paragraph",
            text: "The bridge is in preview, which means the API can change before general availability. Microsoft has already signaled that the method set will grow. Natural candidates for future versions include page navigation operations, filter and slicer control, and data export.",
          },
          {
            type: "paragraph",
            text: "For anyone building tools for the Power BI ecosystem, the time to start experimenting is now. Microsoft is clearly building the infrastructure for a world where AI agents actively participate in report development, and the Desktop Bridge is the local foundation of that architecture.",
          },
          {
            type: "paragraph",
            text: "Those who understand how this works before general availability will have a head start when the features reach stable status.",
          },
        ],
      },
    },
  },
{
    slug: "fim-do-importador-legado-de-excel-csv-no-power-bi",
    featured: false,
    locales: {
      "pt-br": {
        title: "O fim do importador legado de Excel e CSV no Power BI: o que muda a partir de 31 de agosto de 2026",
        summary:
          "A Microsoft está encerrando o suporte ao importador legado de Excel e CSV no Power BI Service. A partir de 31 de agosto de 2026, relatórios que dependem desse fluxo antigo simplesmente param de abrir. Veja quem é afetado, como migrar e o que fazer agora.",
        eyebrow: "Power BI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-08-11",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "Se você ainda usa aquele fluxo antigo de subir um arquivo Excel ou CSV direto pelo navegador no Power BI Service, este artigo é um alerta. A Microsoft está encerrando o suporte ao importador legado, e o prazo final é 31 de agosto de 2026.",
          },
          {
            type: "paragraph",
            text: "Não é uma mudança sutil. A partir dessa data, relatórios que dependem de modelos semânticos criados pelo fluxo legado simplesmente param de abrir. Nada de dados desatualizados, nada de aviso amigável. Erro na tela.",
          },
          {
            type: "heading",
            text: "O que é o importador legado?",
          },
          {
            type: "paragraph",
            text: "Quando o Power BI Service ainda era jovem, a Microsoft oferecia uma forma bem simples de trabalhar com dados: você entrava na página 'Criar', fazia upload de um arquivo Excel ou CSV direto pelo navegador, e o Power BI gerava um modelo semântico na hora. Sem precisar do Power BI Desktop, sem configurar gateway, sem nada complicado.",
          },
          {
            type: "paragraph",
            text: "Essa facilidade teve um preço. Os modelos criados assim eram limitados: não davam para editar no navegador, não tinham opção de atualização agendada, e não podiam ser baixados de volta. Para quem precisava de um relatório rápido e estático, funcionava. Para quem precisava de dados vivos, era uma armadilha.",
          },
          {
            type: "paragraph",
            text: "A Microsoft decidiu descontinuar esse fluxo. E fez isso em etapas.",
          },
          {
            type: "heading",
            text: "As datas que você precisa saber",
          },
          {
            type: "paragraph",
            text: "A depreciação aconteceu em três fases:",
          },
          {
            type: "list",
            items: [
              "31 de maio de 2026: a criação de novos modelos semânticos pelo fluxo legado foi bloqueada. Ninguém mais consegue iniciar esse caminho.",
              "31 de julho de 2026: os modelos semânticos existentes pararam de atualizar. Os relatórios ainda abriam, mas os dados ficaram congelados naquele momento. Qualquer coisa criada depois desse ponto simplesmente não aparecia.",
              "31 de agosto de 2026: data final. Os modelos legados deixam de existir para consulta. Relatórios vinculados a eles retornam erro e não abrem mais.",
            ],
          },
          {
            type: "paragraph",
            text: "Se você chegou até aqui depois de 31 de agosto, o estrago já pode ter acontecido. Mas ainda dá para resolver.",
          },
          {
            type: "heading",
            text: "Quem é afetado?",
          },
          {
            type: "paragraph",
            text: "A boa notícia é que a mudança não atinge todo mundo. Ela afeta especificamente quem criou modelos semânticos fazendo upload direto de Excel ou CSV pela interface web do Power BI Service e tem relatórios vinculados a esses modelos.",
          },
          {
            type: "paragraph",
            text: "Se você criou seus modelos pelo Power BI Desktop e publicou no Service, está tranquilo. Se você usa os conectores de Excel e CSV dentro do Desktop e trabalha com arquivos no OneDrive ou SharePoint, também não há problema.",
          },
          {
            type: "paragraph",
            text: "O jeito mais rápido de identificar modelos legados é checar no Power BI Service se eles têm as opções de editar no navegador, baixar o arquivo ou configurar atualização agendada. Se nenhuma dessas opções aparecer, é legado.",
          },
          {
            type: "paragraph",
            text: "Administradores de tenant podem usar a API REST do Power BI para examinar a propriedade ContentProviderType dos datasets e identificar todos os modelos legados de uma vez.",
          },
          {
            type: "heading",
            text: "Como migrar",
          },
          {
            type: "paragraph",
            text: "A migração não é complicada, mas exige atenção para não perder nada.",
          },
          {
            type: "paragraph",
            text: "Passo 1: abra o Power BI Desktop. Use a opção 'Obter Dados' para conectar ao mesmo arquivo Excel ou CSV que alimentava o modelo legado. O Desktop vai criar um modelo semântico novo, moderno, com todas as opções disponíveis.",
          },
          {
            type: "paragraph",
            text: "Passo 2: publique no Power BI Service. Depois de configurar as transformações e validar os dados, publique o modelo no workspace correto.",
          },
          {
            type: "paragraph",
            text: "Passo 3: reconectando os relatórios. Os relatórios antigos precisam ser apontados para o novo modelo semântico. No Power BI Service, há a opção de reatribuir a fonte de dados de um relatório existente, evitando a necessidade de recriar tudo do zero.",
          },
          {
            type: "paragraph",
            text: "Se o arquivo Excel ou CSV estiver armazenado no OneDrive for Work ou SharePoint, o Power BI consegue sincronizar automaticamente qualquer alteração dentro de cerca de uma hora, sem precisar configurar gateway.",
          },
          {
            type: "paragraph",
            text: "Para organizações que querem ir além, mover os dados para o OneLake do Microsoft Fabric é uma opção que elimina duplicação e centraliza tudo em um único lugar.",
          },
          {
            type: "heading",
            text: "Por que a Microsoft fez isso?",
          },
          {
            type: "paragraph",
            text: "O fluxo legado era tecnicamente inferior ao que a plataforma evoluiu para suportar. Manter dois sistemas paralelos, um moderno e um antigo, gera custo de manutenção, inconsistências de comportamento e confusão para o usuário.",
          },
          {
            type: "paragraph",
            text: "A descontinuação força uma padronização que, no final, beneficia quem migra: modelos modernos têm refresh agendado, são editáveis, podem ser baixados e integram melhor com todo o ecossistema do Power BI e do Fabric.",
          },
          {
            type: "paragraph",
            text: "É o tipo de mudança que dói na hora, mas que a longo prazo faz sentido.",
          },
          {
            type: "heading",
            text: "O que fazer agora",
          },
          {
            type: "paragraph",
            text: "Se você ainda não mapeou seus modelos legados, esse é o primeiro passo. Use o Power BI Service para verificar workspace por workspace, ou use a API REST para uma visão completa do tenant.",
          },
          {
            type: "paragraph",
            text: "Depois, priorize os relatórios mais usados. Comece a migração por eles, valide os dados, e só então avance para os de menor uso.",
          },
          {
            type: "paragraph",
            text: "Não deixe para a última hora. O prazo final é 31 de agosto, e um relatório quebrado no dia seguinte é exatamente o tipo de problema que ninguém quer explicar para o gestor numa segunda de manhã.",
          },
        ],
      },
      en: {
        title: "The end of the legacy Excel and CSV importer in Power BI: what changes after August 31, 2026",
        summary:
          "Microsoft is shutting down support for the legacy Excel and CSV importer in Power BI Service. After August 31, 2026, reports that depend on this old flow will simply stop opening. See who is affected, how to migrate, and what to do now.",
        eyebrow: "Power BI",
        author: "Renan Brognoli",
        category: "Power BI",
        publishedAt: "2026-08-11",
        readingTime: "8 min",
        body: [
          {
            type: "paragraph",
            text: "If you are still using the old flow of uploading an Excel or CSV file directly through the browser in Power BI Service, this article is a warning. Microsoft is shutting down support for the legacy importer, and the final deadline is August 31, 2026.",
          },
          {
            type: "paragraph",
            text: "This is not a subtle change. After that date, reports that depend on semantic models created through the legacy flow will simply stop opening. No stale data warning, no friendly message. Just an error on the screen.",
          },
          {
            type: "heading",
            text: "What is the legacy importer?",
          },
          {
            type: "paragraph",
            text: "Back when Power BI Service was still young, Microsoft offered a straightforward way to work with data: you went to the 'Create' page, uploaded an Excel or CSV file directly through the browser, and Power BI generated a semantic model on the spot. No Power BI Desktop needed, no gateway configuration, nothing complicated.",
          },
          {
            type: "paragraph",
            text: "That convenience came with a cost. Models created this way were limited: you could not edit them in the browser, there was no scheduled refresh option, and you could not download them back. For anyone who needed a quick, static report, it worked. For anyone who needed live data, it was a trap.",
          },
          {
            type: "paragraph",
            text: "Microsoft decided to deprecate this flow, and did so in stages.",
          },
          {
            type: "heading",
            text: "The dates you need to know",
          },
          {
            type: "paragraph",
            text: "The deprecation happened in three phases:",
          },
          {
            type: "list",
            items: [
              "May 31, 2026: Creating new semantic models through the legacy flow was blocked. No one can start down that path anymore.",
              "July 31, 2026: Existing semantic models stopped refreshing. Reports still opened, but the data froze at that point in time. Anything updated in the source file after that date simply would not show up.",
              "August 31, 2026: The final deadline. Legacy semantic models are no longer available for querying. Reports linked to them return an error and will not open.",
            ],
          },
          {
            type: "paragraph",
            text: "If you are reading this after August 31, the damage may already have happened. But it can still be fixed.",
          },
          {
            type: "heading",
            text: "Who is affected?",
          },
          {
            type: "paragraph",
            text: "The good news is that this change does not affect everyone. It specifically impacts users who created semantic models by uploading Excel or CSV files directly through the Power BI Service web interface and have reports connected to those models.",
          },
          {
            type: "paragraph",
            text: "If you built your models in Power BI Desktop and published them to the Service, you are fine. If you use the Excel and CSV connectors inside Desktop and work with files on OneDrive or SharePoint, there is nothing to worry about either.",
          },
          {
            type: "paragraph",
            text: "The quickest way to identify legacy models is to check in Power BI Service whether they have the options to edit in the browser, download the file, or configure scheduled refresh. If none of those options appear, it is a legacy model.",
          },
          {
            type: "paragraph",
            text: "Tenant administrators can use the Power BI REST API to examine the ContentProviderType property of datasets and identify all legacy models across the organization at once.",
          },
          {
            type: "heading",
            text: "How to migrate",
          },
          {
            type: "paragraph",
            text: "The migration is not complicated, but it requires attention so nothing gets lost.",
          },
          {
            type: "paragraph",
            text: "Step 1: open Power BI Desktop. Use the 'Get Data' option to connect to the same Excel or CSV file that was feeding the legacy model. Desktop will create a new, modern semantic model with all available options.",
          },
          {
            type: "paragraph",
            text: "Step 2: publish to Power BI Service. After configuring transformations and validating the data, publish the model to the correct workspace.",
          },
          {
            type: "paragraph",
            text: "Step 3: rebind the reports. Old reports need to be pointed at the new semantic model. In Power BI Service, there is an option to reassign the data source of an existing report, which avoids the need to rebuild everything from scratch.",
          },
          {
            type: "paragraph",
            text: "If the Excel or CSV file is stored in OneDrive for Work or SharePoint, Power BI can automatically sync any changes within about an hour, with no gateway configuration required.",
          },
          {
            type: "paragraph",
            text: "For organizations looking to go further, moving data to Microsoft Fabric's OneLake is an option that eliminates duplication and centralizes everything in one place.",
          },
          {
            type: "heading",
            text: "Why did Microsoft do this?",
          },
          {
            type: "paragraph",
            text: "The legacy flow was technically inferior to what the platform has evolved to support. Maintaining two parallel systems, one modern and one old, generates maintenance costs, behavioral inconsistencies, and confusion for users.",
          },
          {
            type: "paragraph",
            text: "The deprecation forces a standardization that, in the end, benefits everyone who migrates: modern models support scheduled refresh, are editable, can be downloaded, and integrate better with the full Power BI and Fabric ecosystem.",
          },
          {
            type: "paragraph",
            text: "It is the kind of change that stings in the short term but makes sense over time.",
          },
          {
            type: "heading",
            text: "What to do now",
          },
          {
            type: "paragraph",
            text: "If you have not yet mapped your legacy models, that is the first step. Use Power BI Service to check workspace by workspace, or use the REST API for a complete tenant-wide view.",
          },
          {
            type: "paragraph",
            text: "Then prioritize the most-used reports. Start the migration with those, validate the data, and only then move on to lower-traffic ones.",
          },
          {
            type: "paragraph",
            text: "Do not wait until the last minute. The final deadline is August 31, and a broken report on the morning after is exactly the kind of problem nobody wants to explain to their manager on a Monday morning.",
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
