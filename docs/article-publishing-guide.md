# Article Publishing Guide

This repository already contains the full article architecture. Do not redesign it.

## Repository and branch

- Repository: `renanbrognoli01/brognolibisite`
- Working branch for article publication: `Maria_Articles`

Never publish directly to `main`.
Never use `development` for article publication.

## Current article architecture

The article system already exists and must be reused exactly as it is.

Important files:

- `src/lib/articles-data.ts`
- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/articles/[slug]/page.tsx`

### How it works

1. `src/lib/articles-data.ts`
   - single source of truth for all article content and metadata
   - every new article must be added here

2. `src/app/[locale]/articles/page.tsx`
   - automatically renders the article listing
   - reads from `articles-data.ts`
   - must not be redesigned for each article

3. `src/app/[locale]/articles/[slug]/page.tsx`
   - generic dynamic route
   - automatically renders any article based on `slug`
   - must not be replaced with a manual per-article route

## Main rule

Publishing an article means:

1. read the Trello card from the publication-ready list
2. extract the content correctly
3. add one new entry to `src/lib/articles-data.ts`
4. run `npm run build`
5. commit to `Maria_Articles`
6. open a PR to `main`

If `src/lib/articles-data.ts` is not changed, the article was not published correctly.

## The real Trello card structure

Cards in **Brognoli BI Conteúdo** > **🌐 Artigo: Publicar no Site** contain:

- card name = article title
- card description (`desc`) = operational metadata plus a PT-BR preview
- markdown attachment = the full PT + EN article

### What to use as the content source

Use the **markdown attachment** as the primary source of truth.

Do not use the top section of the Trello card description as article content.

Ignore operational lines such as:

- `Gerado: ...`
- `PT: ... | EN: ...`
- `Status: ...`
- `Versao completa ... anexada`
- `Abaixo: versao PT-BR para revisao rapida`
- `Versao em ingles: ver anexo .md`

Also ignore divider markers like:

- `---`

## Current content model in `articles-data.ts`

Each article uses:

- `slug`
- `featured`
- `locales`
  - `pt-br`
  - `en`

Each locale contains:

- `title`
- `summary`
- `eyebrow` optional
- `author`
- `category`
- `publishedAt`
- `readingTime`
- `body`

### Body block types

The `body` field is an ordered array of blocks. Each block is one of:

- `{ type: "paragraph", text: string }`
- `{ type: "heading", text: string }`
- `{ type: "code", language?: string, code: string }`
- `{ type: "list", items: string[] }`

## Rules for field mapping

### `title`
Use the real article title from the markdown attachment.

### `summary`
Write a clean editorial summary. Never use operational text.

### `body`
Convert the markdown article into ordered display blocks:

- opening paragraphs become `paragraph`
- each major `##` heading becomes `heading`
- fenced code blocks become `code`
- bullet recap lists become `list`

Do not keep raw markdown fences inside paragraph text.

## Internationalization rules

Both locales are required:

- `pt-br`
- `en`

Rules:

- `pt-br` must be real Portuguese
- `en` must be real English
- never place Portuguese inside the `en` locale
- never leave one locale empty

## Encoding rules

All article text must be UTF-8.

You must detect and fix broken encoding such as:

- `VÃ­deos`
- `InstalaÃ§Ã£o`
- `VocÃª`
- `Informações` rendered incorrectly
- `MistÃ©rio`

If broken encoding appears, fix it before commit.

## Forbidden changes

Do not change unless explicitly instructed:

- `package.json`
- `package-lock.json`
- header
- footer
- Studio page
- billing pages
- login pages
- download pages
- release manifest
- site navigation
- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/articles/[slug]/page.tsx`

For normal article publication, only `src/lib/articles-data.ts` should be changed.

## Validation checklist

Before commit:

1. ensure branch is `Maria_Articles`
2. change only `src/lib/articles-data.ts`
3. confirm no dependency changes
4. run:

```bash
npm run build
```

5. continue only if build passes
6. verify:
   - `/pt-br/articles`
   - `/en/articles`
   - `/pt-br/articles/<slug>`
   - `/en/articles/<slug>`
7. confirm:
   - article appears in listing
   - article page opens
   - PT-BR is correct
   - EN is correct
   - no operational Trello text was published

## Hard failure conditions

The PR is wrong if any of these is true:

- `src/lib/articles-data.ts` was not changed
- `package.json` changed
- `package-lock.json` changed
- manual article route was created
- PT-BR contains operational notes
- EN contains Portuguese
- the article does not appear in `/articles`
