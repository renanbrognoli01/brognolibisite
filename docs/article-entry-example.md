# Article Entry Example

The canonical example is **not fictional**.

The canonical example is the **real production article that is already published on the site**:

- slug: `guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance`
- source file: `src/lib/articles-data.ts`

## Required rule

When publishing a new article, inspect the **actual live article entry** above and mirror its structure.

Do not invent your own structure.
Do not simplify the object shape.
Do not create alternative field names.

## What must be copied from the real example

The new article must follow the exact same object pattern as the live DAX article:

- root object with:
  - `slug`
  - `featured`
  - `locales`

- locale objects with:
  - `title`
  - `summary`
  - `eyebrow`
  - `author`
  - `category`
  - `publishedAt`
  - `readingTime`
  - `body`

- `body` as an ordered array of blocks using only:
  - `paragraph`
  - `heading`
  - `code`
  - `list`

## Exact live example to inspect

Open:

- `src/lib/articles-data.ts`

Find the entry with:

- `slug: "guia-completo-de-dax-calculate-filter-context-e-otimizacao-de-performance"`

That object is the gold-standard reference.

## What the real example demonstrates

The live article already shows the expected production quality:

- real PT-BR with accents and `ç`
- real EN content
- editorial `summary`
- clean `heading` blocks
- proper DAX `code` blocks
- recap `list` blocks
- no Trello workflow residue

## Non-negotiable instruction

If your new article does not look structurally equivalent to the live DAX article entry, the publication is wrong.

Use the live DAX article as the model.
Do not use a hypothetical example.

