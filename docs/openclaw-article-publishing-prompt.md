# OpenClaw Article Publishing Prompt

You are publishing one approved article to the repository **`renanbrognoli01/brognolibisite`**.

Your job is to publish the article **without breaking the website, the Vercel build, the article listing, the route structure, or the editorial quality bar**.

## Mandatory documents

Before doing any work, read these files:

- `docs/ai-article-execution-guide.md`
- `docs/article-publishing-guide.md`
- `docs/article-entry-example.md`

If any instruction conflicts, follow this priority:

1. `docs/ai-article-execution-guide.md`
2. `docs/article-publishing-guide.md`
3. `docs/article-entry-example.md`

## Canonical live example

Your canonical example is the **real published DAX article entry** in:

- `src/lib/articles-data.ts`

Find the entry with slug:

- `guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance`

When creating a new article, mirror that live entry structurally.
Do not invent a new object format.

## Repository and branch

- Repository: `renanbrognoli01/brognolibisite`
- Required branch: `Maria_Articles`

Never publish directly to `main`.
Never use `development`.

## Core publication rule

For normal article publication, **only** `src/lib/articles-data.ts` should change.

If your diff does not include `src/lib/articles-data.ts`, the article was not published correctly.

If your diff includes any of the following during normal publication, stop and review because the task is probably wrong:

- `src/app/[locale]/articles/page.tsx`
- `src/app/[locale]/articles/[slug]/page.tsx`
- `package.json`
- `package-lock.json`

## Trello source rules

Approved article cards contain:

1. card name
2. card description
3. markdown attachment

Use the **markdown attachment** as the canonical source.
Use the card name only as a title cross-check.
Do not use the Trello description as the main content source.

Never publish workflow lines such as:

- `Gerado: ...`
- `Status: ...`
- `Versão completa ... anexada`
- `Abaixo: versão PT-BR para revisão rápida`
- `Versão em inglês: ver anexo .md`

## Content model

Each article entry must match the existing `articles-data.ts` structure:

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

### Allowed body block types

- `{ type: "paragraph", text: string }`
- `{ type: "heading", text: string }`
- `{ type: "code", code: string, language?: string }`
- `{ type: "list", items: string[] }`

## Conversion rules

Convert markdown to `body` blocks as follows:

- prose paragraph -> `paragraph`
- major `##` heading -> `heading`
- fenced code block -> `code`
- recap bullets -> `list`

Do not leave raw triple-backtick fences inside paragraph text.

## Locale rules

Both locales are required:

- `pt-br`
- `en`

### PT-BR requirements

- proper Portuguese
- valid accents
- valid `ç`
- no mojibake

### EN requirements

- real English
- no Portuguese leakage
- no placeholders

## Hard failure conditions

The publication is wrong if any of these is true:

- `src/lib/articles-data.ts` did not change
- `package.json` changed
- `package-lock.json` changed
- a manual route file was created
- PT-BR contains operational notes
- EN contains Portuguese
- mojibake exists
- article does not appear in `/articles`

## Validation procedure

Before commit:

1. confirm branch is `Maria_Articles`
2. confirm only intended files changed
3. run:

```bash
npm run build
```

4. only continue if build passes
5. validate:
   - `/pt-br/articles`
   - `/en/articles`
   - `/pt-br/articles/<slug>`
   - `/en/articles/<slug>`
6. confirm:
   - article appears in listing
   - article page opens
   - PT-BR is clean
   - EN is clean
   - no Trello workflow text leaked

## Commit style

Use a direct message such as:

- `Publish article: <title>`
- `Add approved article from Trello`

## Final rule

Do not invent a new architecture.
Do not redesign the page.
Do not improvise.

Extract from Trello.
Transform into the existing `ArticleBlock[]` format.
Publish through `src/lib/articles-data.ts`.
Validate.
Commit.
Open PR.
