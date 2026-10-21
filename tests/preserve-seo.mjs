import assert from "node:assert/strict";

// Run against a production build: node tests/preserve-seo.mjs http://127.0.0.1:3007
const base = process.argv[2] ?? "http://127.0.0.1:3007";
async function html(path, options) {
  const response = await fetch(base + path, options);
  assert.equal(response.status, 200, path);
  return response.text();
}
const sections = ["", "about", "studio", "guides", "videos", "articles", "materials", "products", "contact", "privacy", "terms"];
for (const locale of ["pt-br", "en"]) {
  const titles = new Set();
  for (const section of sections) {
    const path = "/" + locale + (section ? "/" + section : "");
    const content = await html(path);
    assert.match(content, new RegExp('lang="' + (locale === "pt-br" ? "pt-BR" : "en") + '"'));
    assert.ok(content.includes('rel="canonical" href="https://brognolibi.com' + path + '"'), path + " canonical");
    assert.ok(content.includes('hrefLang="pt-BR"'), path + " Portuguese alternate");
    assert.ok(content.includes('hrefLang="en"'), path + " English alternate");
    const title = content.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, path + " title");
    assert.ok(!titles.has(title), path + " duplicate title");
    titles.add(title);
  }
}
const articlePath = "/pt-br/articles/microsoft-fabric-free-vale-a-pena-2026";
const article = await html(articlePath);
assert.ok(article.includes("Microsoft Fabric Free vale a pena?"));
assert.match(article, /property="og:type" content="article"/);
assert.ok(article.includes('rel="canonical" href="https://brognolibi.com' + articlePath + '"'));
const account = await html("/pt-br/account");
assert.match(account, /name="robots" content="noindex, nofollow"/);
const spoofed = await html("/pt-br/studio?campaign=test", { headers: { "x-brognoli-pathname": "/en/account" } });
assert.ok(spoofed.includes('rel="canonical" href="https://brognolibi.com/pt-br/studio"'));
assert.ok(spoofed.includes('lang="pt-BR"'));
const missing = await fetch(base + "/pt-br/articles/this-article-does-not-exist");
assert.equal(missing.status, 404);
assert.match(await missing.text(), /noindex/);
const sitemap = await html("/sitemap.xml");
assert.ok(sitemap.includes("https://brognolibi.com" + articlePath));
assert.ok(sitemap.includes("https://brognolibi.com/en/articles/"));
for (const excluded of ["account", "login", "billing", "auth", "reset-password"]) assert.ok(!sitemap.includes("/" + excluded), excluded + " leaked into sitemap");
const robots = await html("/robots.txt");
assert.ok(robots.includes("Sitemap: https://brognolibi.com/sitemap.xml"));
console.log("PASS: localized route metadata, unique titles, article metadata, noindex, canonical header spoofing/query handling, 404, sitemap and robots.");
