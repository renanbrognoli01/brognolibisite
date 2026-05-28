export interface Article {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  category: string;
  readingTime: number;
  featured: boolean;
}

export const articles: Article[] = [
  {
    slug: "guia-completo-de-dax-calculate-filter-context-e-otimiza-o-de-performance",
    title: "Guia Completo de DAX: CALCULATE, Filter Context e Otimização de Performance",
    summary: "Guia Completo de DAX: CALCULATE, Filter Context e Otimização de Performance",
    publishedAt: "2026-05-28",
    category: "Power BI",
    readingTime: 1,
    featured: false,
  },
];
