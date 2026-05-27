# brognolibisite

Official website for Brognoli BI and BROGNOLI Studio.

## Stack

- Next.js
- TypeScript
- App Router
- Tailwind CSS

## Local development

```bash
npm run dev
```

Open [http://localhost:3000/pt-br](http://localhost:3000/pt-br).

## Current structure

- `pt-br` and `en` localized routes
- Home
- About
- BROGNOLI Studio
- Pocket Guides
- Videos
- Articles
- Products
- Contact
- Download
- Privacy
- Terms

## Studio download configuration

Set these public environment variables in the site deployment to power the Studio download page:

- `NEXT_PUBLIC_STUDIO_WINDOWS_DOWNLOAD_URL`
- `NEXT_PUBLIC_STUDIO_WINDOWS_VERSION`
- `NEXT_PUBLIC_STUDIO_WINDOWS_MIN_OS`
- `NEXT_PUBLIC_STUDIO_WINDOWS_SHA256`

Recommended initial setup:

- Point `NEXT_PUBLIC_STUDIO_WINDOWS_DOWNLOAD_URL` to the direct GitHub Release asset URL, for example:
  - `https://github.com/renanbrognoli01/Dax_Descriptions/releases/latest/download/BROGNOLI-Studio-Setup.exe`

This keeps the website professional and simple now, while preserving the option to move the installer to a CDN later without changing the page structure.
