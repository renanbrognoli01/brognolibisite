import Image from "next/image";

import Link from "next/link";

import { PrimaryButton, SecondaryButton, Container } from "@/components/ui";

import { StudioExplorer } from "@/components/studio-explorer";

import type { Locale } from "@/lib/i18n";



export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {

  const { locale } = await params;

  const pt = locale === "pt-br";

  const resources = pt ? [

    ["Guias de bolso", "Excel e Power BI, para consultar durante o trabalho.", "guides"],

    ["Artigos", "DAX, modelagem e as mudanças no mundo dos dados.", "articles"],

    ["Vídeos", "Tutoriais e demonstrações, direto na ferramenta.", "videos"],

    ["Materiais", "Arquivos para baixar e usar nos seus projetos.", "materials"],

    ["Outros produtos", "Conheça também o Calmia e os demais projetos.", "products"],

  ] : [

    ["Pocket guides", "Excel and Power BI references to keep beside your work.", "guides"],

    ["Articles", "DAX, modeling, and changes in the data world.", "articles"],

    ["Videos", "Tutorials and demonstrations inside the tools.", "videos"],

    ["Materials", "Files to download and use in your projects.", "materials"],

    ["Other products", "Explore Calmia and the other projects.", "products"],

  ];

  return <div className="editorial-home">

    <Container>

      <section className="home-opening">

        <h1>{pt ? <>Power BI.<br />Feito <span className="inline-portrait"><Image src="/media/renan 2.png" alt="Renan Brognoli" fill priority sizes="180px" /></span> por Renan.</> : <>Power BI.<br />Built <span className="inline-portrait"><Image src="/media/renan 2.png" alt="Renan Brognoli" fill priority sizes="180px" /></span> by Renan.</>}</h1>

        <div className="opening-bottom">

          <p>{pt ? "Sou Renan Brognoli. Crio ferramentas e compartilho o que aprendo trabalhando com Power BI, Excel e modelos de dados." : "I’m Renan Brognoli. I build tools and share what I learn working with Power BI, Excel, and data models."}</p>

          <PrimaryButton href={`/${locale}/studio`}>{pt ? "Conhecer o Studio" : "Explore Studio"}</PrimaryButton>

        </div>

      </section>

      <section className="home-work" aria-labelledby="work-title">

        <div className="section-opening">

          <h2 id="work-title">{pt ? "Seu modelo, por dentro." : "Inside your data model."}</h2>

          <div><p>{pt ? "BROGNOLI Studio reúne criação DAX, análise e documentação em um aplicativo Windows conectado ao seu Power BI." : "BROGNOLI Studio brings DAX creation, analysis, and documentation into a Windows app connected to your Power BI."}</p><Link className="text-link" href={`/${locale}/studio`}>{pt ? "Ver ferramentas e planos" : "See tools and plans"} ↗</Link></div>

        </div>

        <StudioExplorer locale={locale} />
        <div className="work-details"><figure><div data-ui className="work-detail-image"><Image src="/media/documentation creator.png" alt="Documentation Creator" fill sizes="(max-width:767px) 90vw, 45vw" className="object-contain" /></div><figcaption>{pt ? "Documentação que acompanha o modelo." : "Documentation that follows the model."}</figcaption></figure><figure><div data-ui className="work-detail-image"><Image src="/media/measure optimization.png" alt="Measure Optimization" fill sizes="(max-width:767px) 90vw, 45vw" className="object-contain" /></div><figcaption>{pt ? "DAX com espaço para revisar e melhorar." : "DAX with room to review and improve."}</figcaption></figure></div>

      </section>

    </Container>

    <section className="home-author" aria-labelledby="author-title">

      <Container><div className="author-layout">

        <figure><div className="author-photo"><Image src="/media/renan 3.png" alt="Renan Brognoli" fill sizes="(max-width: 768px) 90vw, 40vw" className="object-contain object-bottom" /></div></figure>

        <div><h2 id="author-title">{pt ? "Da prática para a ferramenta." : "From practice to product."}</h2><p>{pt ? "Mais de uma década trabalhando com BI, Excel, dashboards e performance. O Studio e os materiais deste site nasceram dessa rotina: entender o modelo, resolver o problema e deixar o próximo trabalho mais simples." : "More than a decade working with BI, Excel, dashboards, and performance. Studio and the resources on this site grew out of that daily work: understand the model, solve the problem, and make the next project easier."}</p><SecondaryButton href={`/${locale}/about`}>{pt ? "Minha trajetória" : "My background"}</SecondaryButton>

        <div className="credential-strip">{["Data Analyst Associate", "Microsoft Certified Trainer", "MCSA BI Reporting", "Excel Associate"].map((name,i)=><figure key={name}><Image src={`/media/certificacao ${i+1}.png`} alt={name} width={96} height={96} /><figcaption>{name}</figcaption></figure>)}</div></div>

      </div></Container>

    </section>

    <Container><section className="home-reading" aria-labelledby="reading-title"><div><h2 id="reading-title">{pt ? "Para ter à mão." : "Keep these close."}</h2><p>{pt ? "Uma dúvida no meio do projeto? Comece por aqui." : "A question in the middle of a project? Start here."}</p></div><div className="resource-list">{resources.map(([name,description,path])=><Link href={`/${locale}/${path}`} key={path}><div><h3>{name}</h3><p>{description}</p></div><span aria-hidden="true">↗</span></Link>)}</div></section>

    <section className="home-contact" aria-labelledby="contact-title"><h2 id="contact-title">{pt ? "Vamos falar de dados?" : "Let’s talk about data."}</h2><PrimaryButton href={`/${locale}/contact`}>{pt ? "Entrar em contato" : "Get in touch"}</PrimaryButton></section></Container>

    </div>;

}
