import type { Locale } from "@/lib/i18n";

type HeroData = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type HomeData = {
  hero: HeroData;
  quickStats: { label: string; value: string }[];
  sections: {
    id: string;
    title: string;
    description: string;
    href: string;
  }[];
};

type AboutData = {
  introTitle: string;
  intro: string[];
  timelineTitle: string;
  timeline: { year: string; title: string; description: string }[];
  certificationsTitle: string;
  certifications: string[];
};

type StudioData = {
  title: string;
  heroText: string;
  benefits: string[];
  features: { title: string; description: string }[];
  plansTitle: string;
  plans: { name: string; price: string; credits: string; note: string }[];
};

type GuidesData = {
  title: string;
  description: string;
  groups: {
    title: string;
    accent: "powerbi" | "excel";
    entries: { language: string; salesPage: string; buyLink: string }[];
  }[];
};

type ProductsData = {
  title: string;
  description: string;
  items: {
    name: string;
    summary: string;
    details: string[];
    links: { label: string; href: string; pending?: boolean }[];
  }[];
};

type ContactData = {
  title: string;
  description: string;
  email: string;
  linkedin: string;
  instagramLabel: string;
};

type ArticlesData = {
  title: string;
  description: string;
  placeholderTitle: string;
  placeholderBody: string;
};

type PrivacyTermsData = {
  title: string;
  sections: { title: string; body: string[] }[];
};

type SharedData = {
  siteTitle: string;
  nav: { label: string; href: string }[];
  footerText: string;
  languageLabel: string;
  home: HomeData;
  about: AboutData;
  studio: StudioData;
  guides: GuidesData;
  products: ProductsData;
  contact: ContactData;
  articles: ArticlesData;
  privacy: PrivacyTermsData;
  terms: PrivacyTermsData;
};

export const sharedChannels = {
  pt: "https://www.youtube.com/@renanbrognolibr",
  en: "https://www.youtube.com/@renanbrognoliint",
  linkedin: "https://www.linkedin.com/in/renan-brognoli",
  calmiaPilot: "https://renanbrognoli01.github.io/",
};

export const studioScreenshots = [
  "/media/dax creator.png",
  "/media/measure optimization.png",
  "/media/background generator.png",
  "/media/theme creator.png",
  "/media/performance analyzer.png",
  "/media/data model analyzer.png",
  "/media/best practice checker.png",
  "/media/model translator.png",
];

export const siteData: Record<Locale, SharedData> = {
  "pt-br": {
    siteTitle: "Brognoli BI",
    nav: [
      { label: "Home", href: "/pt-br" },
      { label: "Sobre mim", href: "/pt-br/about" },
      { label: "BROGNOLI Studio", href: "/pt-br/studio" },
      { label: "Guias de bolso", href: "/pt-br/guides" },
      { label: "Vídeos", href: "/pt-br/videos" },
      { label: "Artigos", href: "/pt-br/articles" },
      { label: "Produtos", href: "/pt-br/products" },
      { label: "Contato", href: "/pt-br/contact" },
    ],
    footerText:
      "Power BI, Excel e Analytics com foco em performance, clareza e produtividade.",
    languageLabel: "Idioma",
    home: {
      hero: {
        eyebrow: "Bem-vindo ao universo Brognoli BI",
        title: "Power BI, Excel e Analytics com mais performance, clareza e produtividade.",
        description:
          "Sou Renan Brognoli, especialista em Power BI, Excel e Analytics. Aqui você encontra software, conteúdo, guias práticos e produtos para acelerar análises e gerar mais valor com dados.",
        primaryCta: { label: "Conheça o BROGNOLI Studio", href: "/pt-br/studio" },
        secondaryCta: { label: "Sobre mim", href: "/pt-br/about" },
      },
      quickStats: [
        { label: "anos de experiência", value: "10+" },
        { label: "dashboards e soluções entregues", value: "200+" },
        { label: "atuação nacional e internacional", value: "Global" },
      ],
      sections: [
        {
          id: "studio",
          title: "BROGNOLI Studio",
          description:
            "Uma plataforma completa para Power BI com IA, produtividade, documentação, diagnóstico e criação visual.",
          href: "/pt-br/studio",
        },
        {
          id: "guides",
          title: "Guias de bolso",
          description:
            "Ebooks práticos de Excel e Power BI para orientar sua rotina, resolver dúvidas e acelerar sua evolução.",
          href: "/pt-br/guides",
        },
        {
          id: "videos",
          title: "Vídeos e conteúdo",
          description:
            "Acesse meus canais em português e inglês com dicas, novidades e conteúdo prático sobre dados.",
          href: "/pt-br/videos",
        },
        {
          id: "products",
          title: "Outros produtos",
          description:
            "Conheça o ecossistema Brognoli, incluindo soluções digitais como o Calmia e futuras iniciativas.",
          href: "/pt-br/products",
        },
      ],
    },
    about: {
      introTitle: "Sobre Renan Brognoli",
      intro: [
        "Sou brasileiro, natural de Porto Alegre, Rio Grande do Sul, e atuo há mais de uma década com BI, analytics e otimização de indicadores.",
        "Me formei em Administração pela UFRGS em 2010 e também concluí um MBA em Business Analytics. Meu primeiro contato mais profundo com analytics veio através do Excel, em 2013, quando percebi o potencial transformador dos dados no dia a dia das empresas.",
        "Em 2016 mergulhei no universo do Power BI. Desde então, venho combinando estudo constante, prática em projetos reais e contato com clientes nacionais e internacionais para construir soluções de alto impacto em dados, dashboards e Analysis Services.",
      ],
      timelineTitle: "Trajetória",
      timeline: [
        {
          year: "2010",
          title: "Formação em Administração",
          description: "Graduação pela UFRGS e desenvolvimento da base analítica de negócios.",
        },
        {
          year: "2013",
          title: "Primeiros passos fortes com Excel",
          description:
            "Início do foco em analytics, automações e exploração prática do potencial dos dados.",
        },
        {
          year: "2016",
          title: "Entrada profunda no Power BI",
          description:
            "Aprofundamento em BI, modelagem, visualização e melhores práticas de mercado.",
        },
        {
          year: "2016–2025",
          title: "Consultoria, projetos e escala",
          description:
            "Criação e otimização de mais de 200 dashboards e soluções analíticas para diferentes empresas.",
        },
        {
          year: "2025",
          title: "Microsoft Certified Trainer",
          description: "Reconhecimento como MCT e reforço da atuação em educação e capacitação.",
        },
        {
          year: "2026",
          title: "Lançamento do BROGNOLI Studio",
          description:
            "Criação de uma ferramenta completa para analytics, Power BI e produtividade com IA.",
        },
      ],
      certificationsTitle: "Certificações e foco profissional",
      certifications: [
        "Microsoft Certified: Data Analyst Associate",
        "Certificações em Power BI e Excel",
        "Microsoft Certified Trainer (MCT) desde 2025",
        "Atuação contínua em conteúdo técnico, produtividade e software para analytics",
      ],
    },
    studio: {
      title: "BROGNOLI Studio",
      heroText:
        "O BROGNOLI Studio é um software completo para Power BI e analytics. Ele combina automação, melhores práticas e inteligência artificial para reduzir tarefas repetitivas e devolver tempo para o que realmente importa: analisar, decidir e gerar valor com dados.",
      benefits: [
        "Criação, otimização e documentação de medidas DAX",
        "Análise de performance, server timings e diagnóstico de modelo",
        "Theme Creator e Background Generator com suporte a IA",
        "Tradução de modelo, calculation groups e governança",
        "Mais velocidade, autonomia e consistência para profissionais e equipes",
      ],
      features: [
        {
          title: "DAX e produtividade",
          description:
            "Crie, formate, documente e otimize medidas com contexto do modelo semântico completo.",
        },
        {
          title: "Governança e qualidade",
          description:
            "Analise objetos, padrões, relações e melhores práticas para manter modelos mais sólidos.",
        },
        {
          title: "Performance e diagnóstico",
          description:
            "Investigue queries, tempos de execução e gargalos com ferramentas inspiradas nos fluxos mais avançados do ecossistema.",
        },
        {
          title: "Criação visual com IA",
          description:
            "Gere backgrounds, temas e estruturas visuais para dashboards de maneira muito mais ágil.",
        },
      ],
      plansTitle: "Planos e trial",
      plans: [
        { name: "Light", price: "R$ 9,90/mês", credits: "0 créditos", note: "API própria ou modo manual" },
        { name: "Starter", price: "R$ 29/mês", credits: "2.000 créditos", note: "Uso leve com IA do Studio" },
        { name: "Pro", price: "R$ 59/mês", credits: "6.000 créditos", note: "Melhor custo-benefício" },
        { name: "Expert", price: "R$ 119/mês", credits: "15.000 créditos", note: "Uso avançado" },
        { name: "Business", price: "R$ 299/mês", credits: "50.000 créditos", note: "Empresas e equipes" },
      ],
    },
    guides: {
      title: "Guias de bolso",
      description:
        "Ebooks práticos para acelerar a curva de aprendizado em Excel e Power BI, com foco em execução, clareza e resolução rápida de dúvidas.",
      groups: [
        {
          title: "Guia de bolso de Excel",
          accent: "excel",
          entries: [
            {
              language: "Português",
              salesPage: "https://go.hotmart.com/Q93378473U",
              buyLink: "https://pay.hotmart.com/Q93378473U?bid=1779474837044",
            },
            {
              language: "English",
              salesPage: "https://go.hotmart.com/Y93378951H",
              buyLink: "https://pay.hotmart.com/Y93378951H",
            },
          ],
        },
        {
          title: "Guia de bolso de Power BI",
          accent: "powerbi",
          entries: [
            {
              language: "Português",
              salesPage: "https://go.hotmart.com/V93318907V",
              buyLink: "https://pay.hotmart.com/V93318907V",
            },
            {
              language: "English",
              salesPage: "https://go.hotmart.com/Q93372100M",
              buyLink: "https://pay.hotmart.com/Q93372100M",
            },
          ],
        },
      ],
    },
    products: {
      title: "Meus outros produtos",
      description:
        "Conheça outros projetos do ecossistema Brognoli, combinando tecnologia, bem-estar e soluções digitais.",
      items: [
        {
          name: "Calmia",
          summary:
            "Assistente de terapia com registro de pensamentos disfuncionais, humor e gratidão, com possibilidade de compartilhamento em tempo real com o terapeuta.",
          details: [
            "Registro de humor e acompanhamento contínuo",
            "Diário de gratidão e reflexões",
            "Registro de pensamentos disfuncionais",
            "Experiência pensada para apoio prático e constância",
          ],
          links: [
            { label: "Site piloto", href: sharedChannels.calmiaPilot },
            { label: "Apple Store", href: "#", pending: true },
            { label: "Play Store", href: "#", pending: true },
          ],
        },
      ],
    },
    contact: {
      title: "Contato",
      description:
        "Fale comigo para parcerias, produtos, conteúdo, treinamentos e oportunidades relacionadas a Power BI, Excel e Analytics.",
      email: "renan.brognoli@brognolibi.com",
      linkedin: sharedChannels.linkedin,
      instagramLabel: "Instagram profissional em breve",
    },
    articles: {
      title: "Artigos",
      description:
        "Aqui você vai encontrar novidades sobre BI, tecnologia, produtividade e análises sobre o universo de dados.",
      placeholderTitle: "Novos artigos em breve",
      placeholderBody:
        "Esta área já está preparada para receber conteúdo. Em breve, artigos originais vão aparecer aqui com dicas, tendências e análises do mercado.",
    },
    privacy: {
      title: "Política de privacidade",
      sections: [
        {
          title: "Coleta de informações",
          body: [
            "Podemos coletar dados enviados voluntariamente por formulários de contato, cadastro, interesse comercial ou acesso a produtos.",
            "Também podemos utilizar ferramentas de analytics e métricas para entender o uso do site e melhorar a experiência.",
          ],
        },
        {
          title: "Uso das informações",
          body: [
            "As informações são utilizadas para responder contatos, melhorar produtos, comunicar novidades e oferecer suporte.",
            "Não vendemos dados pessoais. Qualquer compartilhamento com terceiros ocorre apenas quando necessário para operação do serviço, pagamento ou cumprimento legal.",
          ],
        },
        {
          title: "Segurança e direitos",
          body: [
            "Adotamos medidas razoáveis para proteger dados pessoais.",
            "Você pode solicitar atualização, correção ou exclusão dos seus dados, quando aplicável, entrando em contato pelo e-mail informado no site.",
          ],
        },
      ],
    },
    terms: {
      title: "Termos de uso",
      sections: [
        {
          title: "Uso do site e dos conteúdos",
          body: [
            "O conteúdo deste site tem finalidade informativa, educacional e comercial relacionada aos produtos e serviços do ecossistema Brognoli.",
            "É proibido reproduzir ou redistribuir materiais sem autorização quando isso violar direitos autorais ou regras de uso do produto.",
          ],
        },
        {
          title: "Produtos e serviços",
          body: [
            "Produtos digitais, softwares, ebooks e outros materiais podem ter regras específicas de uso, licença, pagamento e suporte.",
            "Sempre que houver termos adicionais para um produto, eles prevalecem sobre este documento geral.",
          ],
        },
        {
          title: "Limitação e responsabilidade",
          body: [
            "Fazemos o possível para manter informações atualizadas, mas não garantimos ausência total de erros, indisponibilidade ou mudanças futuras.",
            "O uso das soluções e conteúdos é de responsabilidade do usuário, respeitando as finalidades previstas e a legislação aplicável.",
          ],
        },
      ],
    },
  },
  en: {
    siteTitle: "Brognoli BI",
    nav: [
      { label: "Home", href: "/en" },
      { label: "About", href: "/en/about" },
      { label: "BROGNOLI Studio", href: "/en/studio" },
      { label: "Pocket Guides", href: "/en/guides" },
      { label: "Videos", href: "/en/videos" },
      { label: "Articles", href: "/en/articles" },
      { label: "Products", href: "/en/products" },
      { label: "Contact", href: "/en/contact" },
    ],
    footerText:
      "Power BI, Excel, and Analytics with a strong focus on performance, clarity, and productivity.",
    languageLabel: "Language",
    home: {
      hero: {
        eyebrow: "Welcome to the Brognoli BI universe",
        title: "Power BI, Excel, and Analytics with more performance, clarity, and productivity.",
        description:
          "I am Renan Brognoli, a specialist in Power BI, Excel, and Analytics. Here you will find software, practical content, guides, and products designed to accelerate analysis and create more value from data.",
        primaryCta: { label: "Explore BROGNOLI Studio", href: "/en/studio" },
        secondaryCta: { label: "About me", href: "/en/about" },
      },
      quickStats: [
        { label: "years of experience", value: "10+" },
        { label: "dashboards and analytical solutions", value: "200+" },
        { label: "national and international reach", value: "Global" },
      ],
      sections: [
        {
          id: "studio",
          title: "BROGNOLI Studio",
          description:
            "A complete Power BI platform with AI, productivity tools, documentation, diagnostics, and visual creation.",
          href: "/en/studio",
        },
        {
          id: "guides",
          title: "Pocket guides",
          description:
            "Practical Excel and Power BI ebooks to support daily execution, solve common questions, and accelerate growth.",
          href: "/en/guides",
        },
        {
          id: "videos",
          title: "Videos and content",
          description:
            "Access my Portuguese and English channels with tutorials, updates, and practical analytics insights.",
          href: "/en/videos",
        },
        {
          id: "products",
          title: "Other products",
          description:
            "Discover the Brognoli ecosystem, including digital solutions such as Calmia and future products.",
          href: "/en/products",
        },
      ],
    },
    about: {
      introTitle: "About Renan Brognoli",
      intro: [
        "I am Brazilian, originally from Porto Alegre in southern Brazil, and I have been working with BI, analytics, and KPI optimization for more than a decade.",
        "I graduated in Business Administration from UFRGS in 2010 and later earned an MBA in Business Analytics. My deeper connection with analytics started in 2013 through Excel, when I realized how transformative data could be in real business contexts.",
        "In 2016 I immersed myself in Power BI. Since then, I have combined continuous study, hands-on delivery, and national and international client work to build impactful data solutions, dashboards, and Analysis Services projects.",
      ],
      timelineTitle: "Journey",
      timeline: [
        {
          year: "2010",
          title: "Business degree",
          description: "Graduated from UFRGS and built a strong business analytics foundation.",
        },
        {
          year: "2013",
          title: "Excel-driven analytics growth",
          description:
            "Began a stronger focus on analytics, automation, and practical data problem-solving.",
        },
        {
          year: "2016",
          title: "Deep dive into Power BI",
          description:
            "Expanded into BI, modeling, visualization, and market best practices at a deeper level.",
        },
        {
          year: "2016–2025",
          title: "Consulting and delivery at scale",
          description:
            "Built and optimized more than 200 dashboards and analytical solutions across different companies and industries.",
        },
        {
          year: "2025",
          title: "Microsoft Certified Trainer",
          description: "Expanded educational and training work as an official Microsoft trainer.",
        },
        {
          year: "2026",
          title: "BROGNOLI Studio launch",
          description:
            "Created a complete analytics and Power BI productivity platform powered by AI.",
        },
      ],
      certificationsTitle: "Certifications and professional focus",
      certifications: [
        "Microsoft Certified: Data Analyst Associate",
        "Power BI and Excel certifications",
        "Microsoft Certified Trainer (MCT) since 2025",
        "Ongoing focus on technical content, productivity, and analytics software",
      ],
    },
    studio: {
      title: "BROGNOLI Studio",
      heroText:
        "BROGNOLI Studio is a complete software platform for Power BI and analytics. It combines automation, best practices, and artificial intelligence to reduce repetitive work and give professionals more time to focus on decisions and business value.",
      benefits: [
        "DAX creation, formatting, documentation, and optimization",
        "Performance analysis, server timings, and model diagnostics",
        "Theme Creator and Background Generator with AI support",
        "Model translation, calculation groups, and governance workflows",
        "More speed, autonomy, and consistency for analysts and teams",
      ],
      features: [
        {
          title: "DAX and productivity",
          description:
            "Create, format, document, and improve measures using the full semantic model context.",
        },
        {
          title: "Governance and quality",
          description:
            "Inspect objects, standards, relationships, and best practices to keep models healthier.",
        },
        {
          title: "Performance and diagnostics",
          description:
            "Investigate query behavior, execution times, and bottlenecks with advanced workflows.",
        },
        {
          title: "Visual creation with AI",
          description:
            "Generate dashboard backgrounds, themes, and visual structures in a much faster way.",
        },
      ],
      plansTitle: "Plans and trial",
      plans: [
        { name: "Light", price: "US$ 4.90/month", credits: "0 credits", note: "Bring your own API or manual mode" },
        { name: "Starter", price: "US$ 9.90/month", credits: "2,000 credits", note: "Light usage with Studio AI" },
        { name: "Pro", price: "US$ 19.90/month", credits: "6,000 credits", note: "Best value" },
        { name: "Expert", price: "US$ 39.90/month", credits: "15,000 credits", note: "Advanced user" },
        { name: "Business", price: "US$ 99.90/month", credits: "50,000 credits", note: "Teams and companies" },
      ],
    },
    guides: {
      title: "Pocket guides",
      description:
        "Practical ebooks designed to accelerate learning in Excel and Power BI with a strong focus on execution and real-world productivity.",
      groups: [
        {
          title: "Excel pocket guide",
          accent: "excel",
          entries: [
            {
              language: "Portuguese",
              salesPage: "https://go.hotmart.com/Q93378473U",
              buyLink: "https://pay.hotmart.com/Q93378473U?bid=1779474837044",
            },
            {
              language: "English",
              salesPage: "https://go.hotmart.com/Y93378951H",
              buyLink: "https://pay.hotmart.com/Y93378951H",
            },
          ],
        },
        {
          title: "Power BI pocket guide",
          accent: "powerbi",
          entries: [
            {
              language: "Portuguese",
              salesPage: "https://go.hotmart.com/V93318907V",
              buyLink: "https://pay.hotmart.com/V93318907V",
            },
            {
              language: "English",
              salesPage: "https://go.hotmart.com/Q93372100M",
              buyLink: "https://pay.hotmart.com/Q93372100M",
            },
          ],
        },
      ],
    },
    products: {
      title: "Other products",
      description:
        "Discover other solutions from the Brognoli ecosystem, combining technology, digital products, and well-being.",
      items: [
        {
          name: "Calmia",
          summary:
            "A therapy assistant focused on dysfunctional thought records, mood tracking, and gratitude journaling, with real-time sharing for therapists.",
          details: [
            "Mood tracking and continuity",
            "Gratitude journaling",
            "Dysfunctional thought records",
            "A practical experience designed for consistency and support",
          ],
          links: [
            { label: "Pilot website", href: sharedChannels.calmiaPilot },
            { label: "Apple Store", href: "#", pending: true },
            { label: "Play Store", href: "#", pending: true },
          ],
        },
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Reach out for partnerships, products, content, training, or opportunities related to Power BI, Excel, and Analytics.",
      email: "renan.brognoli@brognolibi.com",
      linkedin: sharedChannels.linkedin,
      instagramLabel: "Professional Instagram coming soon",
    },
    articles: {
      title: "Articles",
      description:
        "This is where BI news, analytics perspectives, productivity ideas, and technology insights will be published.",
      placeholderTitle: "New articles coming soon",
      placeholderBody:
        "This section is already prepared to receive content. Original articles will appear here soon with practical ideas, trends, and analysis.",
    },
    privacy: {
      title: "Privacy policy",
      sections: [
        {
          title: "Information we collect",
          body: [
            "We may collect information voluntarily submitted through contact forms, sign-up flows, product interest forms, or support requests.",
            "We may also use analytics tools to understand how the website is used and improve the overall experience.",
          ],
        },
        {
          title: "How information is used",
          body: [
            "Information is used to respond to contacts, improve products, communicate updates, and provide support.",
            "We do not sell personal data. Any sharing with third parties is limited to what is necessary for operations, payments, or legal compliance.",
          ],
        },
        {
          title: "Security and user rights",
          body: [
            "Reasonable measures are used to protect personal information.",
            "You may request updates, corrections, or deletion of your data where applicable by contacting the email listed on this website.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of use",
      sections: [
        {
          title: "Use of website and content",
          body: [
            "The content on this website is intended for informational, educational, and commercial purposes related to Brognoli products and services.",
            "Reproducing or redistributing materials without authorization is prohibited whenever it violates copyrights or product-specific rules.",
          ],
        },
        {
          title: "Products and services",
          body: [
            "Digital products, software, ebooks, and other materials may have specific rules about usage, licensing, payment, and support.",
            "Whenever a product has additional terms, they take precedence over this general document.",
          ],
        },
        {
          title: "Limitation and responsibility",
          body: [
            "We make every reasonable effort to keep information updated, but we cannot guarantee that the website will always be free from errors, downtime, or future changes.",
            "The use of any product or content is the responsibility of the user and must comply with intended purposes and applicable laws.",
          ],
        },
      ],
    },
  },
};
