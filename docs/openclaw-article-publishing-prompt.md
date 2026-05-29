# OpenClaw Article Publishing Prompt

You are publishing articles to the repository **`renanbrognoli01/brognolibisite`**.

Your job is to publish a Trello-approved article **without breaking the website, the Vercel build, the article listing, or the existing article system**.

## Repository and branch

- Repository: `renanbrognoli01/brognolibisite`
- Required branch: `Maria_Articles`

Never publish directly to `main`.
Never use `development`.

## Current article system

The article architecture already exists and must be reused exactly as it is.

Important files:

- `src/lib/articles-data.ts`
- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/articles/[slug]/page.tsx`

### Main rule

Publishing an article means:

1. read the approved Trello card
2. extract the article correctly
3. add exactly one new article entry to `src/lib/articles-data.ts`
4. run the build
5. commit to `Maria_Articles`
6. open a PR to `main`

If `src/lib/articles-data.ts` is not changed, the article was not published correctly.

## Trello parsing rules

Approved cards in Trello contain two different sources:

1. **card description**
   - contains operational metadata
   - contains a PT-BR preview
   - is not the full clean publication source

2. **markdown attachment**
   - contains the full PT + EN article
   - must be treated as the main content source

### Ignore the following Trello description lines

Do not publish lines like:

- `Gerado: ...`
- `PT: ... | EN: ...`
- `Status: ...`
- `Versao completa ... anexada`
- `Abaixo: versao PT-BR para revisao rapida`
- `Versao em ingles: ver anexo .md`

Also ignore divider lines like:

- `---`

## What you must extract

From the Trello card and attachment, extract:

- `slug`
- `title`
- `summary`
- `author`
- `category`
- `publishedAt`
- `readingTime`
- `featured`
- full `pt-br` content
- full `en` content

## Required content model

Each article entry in `src/lib/articles-data.ts` must follow the existing structure:

- `slug`
- `featured`
- `locales`
  - `pt-br`
  - `en`

Each locale must contain:

- `title`
- `summary`
- `eyebrow` optional
- `author`
- `category`
- `publishedAt`
- `readingTime`
- `body`

## Editorial mapping rules

### `title`
Use the real editorial article title.

### `summary`
Write a clean editorial summary.
Do not copy operational text.

### `body`
Convert the markdown article into ordered blocks:

- regular paragraphs become `{ type: "paragraph", text: ... }`
- each major `##` heading becomes `{ type: "heading", text: ... }`
- fenced code blocks become `{ type: "code", language: "dax", code: ... }`
- bullet recap lists become `{ type: "list", items: [...] }`

Do not keep raw markdown fences inside paragraph text.

## Internationalization rules

Both locales are required:

- `pt-br`
- `en`

Rules:

- `pt-br` must contain correct Portuguese
- `en` must contain real English
- never place Portuguese inside `en`
- never leave one locale empty

## Encoding rules

All text must be UTF-8.

You must detect and fix broken text such as:

- `VÃ­deos`
- `InstalaÃ§Ã£o`
- `VocÃª`
- `InformaÃ§Ãµes`
- `MistÃ©rio`

If broken encoding appears, fix it before commit.

## Files you must not change

Do not change:

- `package.json`
- `package-lock.json`
- header
- footer
- Studio page
- billing pages
- login pages
- download pages
- release manifest
- navigation
- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/articles/[slug]/page.tsx`

For normal article publication, only `src/lib/articles-data.ts` should change.

## Forbidden actions

Do not:

- add dependencies
- use MDX
- use `next-mdx-remote`
- use `gray-matter`
- use Supabase for articles
- create a manual route file for the article
- redesign the article system

## Validation checklist

Before commit:

1. ensure branch is `Maria_Articles`
2. change only `src/lib/articles-data.ts`
3. confirm no dependency changes
4. run:

```bash
npm run build
```

5. only continue if build passes
6. validate:
   - `/pt-br/articles`
   - `/en/articles`
   - `/pt-br/articles/<slug>`
   - `/en/articles/<slug>`
7. confirm:
   - article appears in the article listing
   - article page opens correctly
   - PT-BR content is real article content
   - EN content is real English
   - no Trello operational notes were published

## Hard failure conditions

The publication is wrong if any of these happens:

- `src/lib/articles-data.ts` was not changed
- `package.json` changed
- `package-lock.json` changed
- a manual route file was created
- PT-BR contains internal process notes
- EN contains Portuguese
- article does not appear in `/articles`

## Commit style

Use commit messages such as:

- `Publish article: Guia Completo de DAX`
- `Add article entry for guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance`
