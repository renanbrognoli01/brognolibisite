"use client";
import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
const tools = [
  { name: "Data Model Analyzer", src: "/media/data model analyzer.png", pt: "Veja tabelas, colunas e os campos que conectam os relacionamentos.", en: "Inspect tables, columns, and the fields connecting relationships." },
  { name: "Documentation Creator", src: "/media/documentation creator.png", pt: "Documente o modelo e exporte em HTML, PDF ou Wiki DevOps.", en: "Document your model and export to HTML, PDF, or Wiki DevOps." },
  { name: "DAX Creator", src: "/media/dax creator.png", pt: "Crie medidas com o contexto do seu modelo Power BI.", en: "Create measures with context from your Power BI model." },
  { name: "Performance Analyzer", src: "/media/performance analyzer.png", pt: "Investigue gargalos e encontre o que merece atenção.", en: "Investigate bottlenecks and find what needs attention." },
];
export function StudioExplorer({locale}:{locale:Locale}) {
 const [active,setActive]=useState(0);
 return <div className="studio-explorer"><div className="explorer-options" aria-label={locale==='pt-br'?'Explorar ferramentas':'Explore tools'}>{tools.map((tool,i)=><button key={tool.name} type="button" aria-pressed={i===active} onClick={()=>setActive(i)}><span>{tool.name}</span><span aria-hidden="true">{i===active?'↘':'↗'}</span></button>)}</div><div className="explorer-views">{tools.map((tool,i)=><figure key={tool.name} hidden={i!==active}><div className="explorer-image" data-ui><Image src={tool.src} alt={tool.name} fill sizes="(max-width:768px) 100vw, 85vw" className="object-contain" /></div><figcaption>{locale==='pt-br'?tool.pt:tool.en}</figcaption></figure>)}</div></div>;
}
