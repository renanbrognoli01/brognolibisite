import { ReactNode } from 'react';

export function MDXContent({ children }: { children: ReactNode }) {
  return (
    <article className="prose prose-invert max-w-3xl mx-auto py-12">
      <style>{`
        .prose h1 { font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; }
        .prose h2 { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
        .prose p { line-height: 1.75; margin-bottom: 1.25rem; }
        .prose a { color: rgb(0, 120, 212); text-decoration: underline; }
        .prose code { background-color: rgba(255, 255, 255, 0.1); padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
        .prose pre { background-color: rgb(20 20 20); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.5rem; padding: 1rem; }
      `}</style>
      {children}
    </article>
  );
}
