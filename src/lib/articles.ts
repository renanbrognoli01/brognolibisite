import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.join(process.cwd(), 'src/content/articles');

export interface ArticleMetadata {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

export interface Article extends ArticleMetadata {
  slug: string;
  content: string;
  language: 'pt' | 'en';
}

export function getArticleSlugs(language: 'pt' | 'en'): string[] {
  const dir = path.join(ARTICLES_DIR, language);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
}

export function getArticle(slug: string, language: 'pt' | 'en'): Article | null {
  try {
    const filePath = path.join(ARTICLES_DIR, language, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return { slug, content, language, ...(data as ArticleMetadata) };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(language: 'pt' | 'en'): Article[] {
  const slugs = getArticleSlugs(language);
  return slugs.map(slug => getArticle(slug, language)).filter(a => a !== null) as Article[];
}
