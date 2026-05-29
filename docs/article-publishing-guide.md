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

1. read the approved Trello card
2. extract the content correctly
3. add one new entry to `src/lib/articles-data.ts`
4. run `npm run build`
5. commit to `Maria_Articles`
6. open a PR to `main`

If `src/lib/articles-data.ts` is not changed, the article was not published correctly.

## The real Trello card structure

The approved Trello card is not a clean article payload by default.

Observed structure from the approved card in **Brognoli BI Conteúdo** > **Articles Approved**:

- card name = article title
- card description (`desc`) contains:
  - operational metadata
  - a PT-BR preview
  - extra notes like review status
- card attachment = the full PT+EN markdown article

### What to use as the content source

Use the **markdown attachment** as the primary source of truth.

Do not use the top section of the Trello card description as article content.

Ignore operational lines such as:

- `📅 Gerado: ...`
- `📊 PT: ... | EN: ...`
- `🎯 Status: ...`
- `📎 Versão completa ... anexada`
- `👇 Abaixo: versão PT-BR para revisão rápida`

Ignore divider markers like:

- `---`

Ignore editorial notes such as:

- `🇬🇧 Versão em inglês: ver anexo .md`

## What must be extracted from Trello

From the card and attachment, extract:

- `slug`
- `title`
- `summary`
- `author`
- `category`
- `publishedAt`
- `readingTime`
- `featured`
- `pt-br` content
- `en` content

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
- `intro`
- `sections`
- `conclusion` optional

### Rules for field mapping

#### `title`
Use the real article title, not the Trello card operational text.

#### `summary`
Write a clean editorial summary. Never use operational text like `Generated on`, `Awaiting review`, or similar.

#### `intro`
Use the opening paragraphs of the article.

#### `sections`
Use every major `##` heading as a section heading.

Each section should contain:
- `heading`
- `paragraphs`
- `bullets` only when the section clearly has bullet-style content

#### `conclusion`
Use only when the article clearly ends with a summary/closing section.

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
- `InformaÃ§Ãµes`
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
- sections are empty for a long article
- article does not appear in `/articles`
