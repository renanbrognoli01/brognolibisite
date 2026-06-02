# AI-to-AI Article Execution Guide

This document is written for autonomous coding agents that must publish articles to the website repository **`renanbrognoli01/brognolibisite`** with production-grade quality.

Follow this document as the highest-priority operational guide for article publication.

## Mission

Your task is to take one Trello article from the website-publication list and publish it to the website **without changing the site architecture, breaking the build, degrading the design, or introducing editorial corruption**.

You are not building a blog system.
You are not redesigning article rendering.
You are publishing one article into an existing architecture.

## Repository and branch

- Repository: `renanbrognoli01/brognolibisite`
- Publication branch: `Maria_Articles`

Never publish directly to `main`.
Never use `development` for article publication.

## Required repo files

These files define the article system and must be treated as stable:

- `src/lib/articles-data.ts`
- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/articles/[slug]/page.tsx`

## Canonical live reference

The canonical structural example is the **real published DAX article** already present in:

- `src/lib/articles-data.ts`

Find the entry with slug:

- `guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance`

Every new article must mirror that live entry structurally.
Do not use an invented format.

### Stability rule

For normal article publication:

- `src/lib/articles-data.ts` **must** change
- `src/app/[locale]/articles/page.tsx` **must not** change
- `src/app/[locale]/articles/[slug]/page.tsx` **must not** change

If your diff changes the renderer or listing page during routine publication, the task is wrong unless the human explicitly asked for a rendering-system change.

## Trello source-of-truth rules

Website publication cards live in:

- Board: `Brognoli BI Conteúdo`
- List: `🌐 Artigo: Publicar no Site`

Each card in this list contains multiple content layers:

1. **Card name**
   - editorial title preview
   - useful as a cross-check

2. **Card description**
   - contains operational metadata
   - may contain a PT-BR quick preview
   - is **not** the canonical full publication source

3. **Markdown attachment (`.md`)**
   - contains the full PT-BR + EN article
   - this is the **canonical publication source**

## Source priority

Use this priority order:

1. markdown attachment
2. card name for title cross-check
3. card description only for sanity checking, never as the main article source

If the markdown attachment exists, you must use it.

## Trello text that must never be published

If any of the following appears in the website article, the publication is wrong:

- `Gerado: ...`
- `PT: ... | EN: ...`
- `Status: ...`
- `Versão completa ... anexada`
- `Abaixo: versão PT-BR para revisão rápida`
- `Versão em inglês: ver anexo .md`
- divider-only markers such as `---`

These are workflow artifacts, not article content.

## Current content model

All article content lives in `src/lib/articles-data.ts`.

Each article entry must follow this structure:

```ts
{
  slug: string,
  featured?: boolean,
  locales: {
    "pt-br": {
      title: string,
      summary: string,
      eyebrow?: string,
      author: string,
      category: string,
      publishedAt: string,
      readingTime: string,
      body: ArticleBlock[]
    },
    en: {
      title: string,
      summary: string,
      eyebrow?: string,
      author: string,
      category: string,
      publishedAt: string,
      readingTime: string,
      body: ArticleBlock[]
    }
  }
}
```

### Supported `ArticleBlock` types

```ts
{ type: "paragraph", text: string }
{ type: "heading", text: string }
{ type: "code", code: string, language?: string }
{ type: "list", items: string[] }
```

The live DAX article already demonstrates this model correctly.
Use it as the reference implementation.

## Editorial mapping algorithm

Convert the markdown article into `body` blocks using the following exact logic:

### Paragraphs

Normal prose paragraphs become:

```ts
{ type: "paragraph", text: "..." }
```

### Headings

Major section headings from markdown, especially `##`, become:

```ts
{ type: "heading", text: "..." }
```

Do not turn every line into a heading.
Only use headings for true structural sections.

### Code blocks

Fenced DAX code blocks become:

```ts
{ type: "code", language: "dax", code: "..." }
```

Do not leave triple backticks inside paragraph text.
Do not flatten code into prose.

### Lists

Summary bullets or recap bullets become:

```ts
{ type: "list", items: ["...", "..."] }
```

Do not force every small inline list into a `list` block.
Use list blocks when the source article clearly presents a recap or bullet structure.

## Metadata rules

### `slug`

The slug must be:

- lowercase
- ASCII
- hyphen-separated
- stable
- short enough to be readable

Example:

- `guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance`

### `title`

Use the real editorial title.
Do not shorten it unless necessary for correctness.

### `summary`

Write a clean editorial summary.
It must sound like a real website excerpt, not a workflow note.

Bad summary:

- `Gerado em 2026-05-28`
- `Versão completa anexada`

Good summary:

- concise
- editorial
- reflects the actual article

### `eyebrow`

Use a short thematic eyebrow such as:

- `Power BI e DAX`
- `Power BI and DAX`

### `author`

Use the intended author name already established in the site content.

### `category`

Use a clean category label such as:

- `Power BI`
- `Analytics`

### `publishedAt`

Use ISO-style date string already used by the repo:

- `2026-05-29`

### `readingTime`

Use a concise site-facing value:

- `10 min`
- `9 min`

## Internationalization rules

Both locales are mandatory:

- `pt-br`
- `en`

### PT-BR rules

The Portuguese version must:

- preserve accents correctly
- preserve `ç`
- preserve natural punctuation
- read like a polished article

### EN rules

The English version must:

- be genuinely English
- not contain Portuguese leakage
- not be a placeholder

### Hard failure examples

These are failures:

- Portuguese text inside `en`
- English locale left empty
- PT-BR missing accents due to bad encoding

## Encoding rules

All published text must be valid UTF-8.

You must actively detect and eliminate mojibake such as:

- `MistÃ©rio`
- `VocÃª`
- `InstalaÃ§Ã£o`
- `InformaÃ§Ãµes`
- `nÃ£o`
- `fÃ³rmula`

If mojibake appears anywhere in PT-BR content, the task is not ready.

## Quality bar

The article must feel like a production editorial page, not a data dump.

That means:

- headings are used intentionally
- paragraphs read naturally
- code blocks are clean
- summaries are editorial
- no operational Trello residue
- no broken encoding
- no malformed locale content

## What must never happen

The following are automatic failures:

1. `src/lib/articles-data.ts` was not changed
2. `package.json` changed
3. `package-lock.json` changed
4. a manual route file was created
5. `src/app/[locale]/articles/page.tsx` was edited without explicit instruction
6. `src/app/[locale]/articles/[slug]/page.tsx` was edited without explicit instruction
7. PT-BR contains operational Trello notes
8. EN contains Portuguese
9. code fences were left as raw markdown inside paragraph text
10. article does not appear on `/articles`

## Validation procedure

Before commit, perform this exact validation:

1. confirm you are on `Maria_Articles`
2. confirm the diff contains `src/lib/articles-data.ts`
3. confirm `package.json` is unchanged
4. confirm `package-lock.json` is unchanged
5. run:

```bash
npm run build
```

6. continue only if build succeeds
7. validate these routes:
   - `/pt-br/articles`
   - `/en/articles`
   - `/pt-br/articles/<slug>`
   - `/en/articles/<slug>`
8. confirm:
   - article appears in the listing
   - article page opens
   - PT-BR reads correctly
   - EN reads correctly
   - no mojibake exists
   - no operational Trello lines were published

## Commit policy

Use a direct commit message, for example:

- `Publish article: Guia Completo de DAX`
- `Add DAX article from Trello publish-to-site list`

## Final operational rule

For normal article publication:

- **extract from Trello**
- **transform into `ArticleBlock[]`**
- **publish only through `src/lib/articles-data.ts`**
- **validate build**
- **open PR**

Do not redesign.
Do not improvise architecture.
Do not leak workflow text.
Do not degrade language quality.
