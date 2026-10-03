import fs from 'node:fs';
import path from 'node:path';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('data/pages.json', 'utf-8'));
const categories = JSON.parse(fs.readFileSync('data/categories.json', 'utf-8'));

const knownSlugs = new Set([
  ...posts.map(p => p.slug),
  ...pages.map(p => p.slug),
  ...categories.map(c => c.slug),
  'wp-content',
  'wp-admin',
  'wp-json',
  'feed',
  'comments',
  'review'
]);

// Extrai todos os links href="https://loucalimpa.com/..."
const regex = /href=["']https:\/\/loucalimpa\.com\/([a-zA-Z0-9\-_]+)\/?["']/g;
const candidateSlugs = new Set();

for (const post of posts) {
  let match;
  while ((match = regex.exec(post.content.rendered)) !== null) {
    const slug = match[1];
    if (!knownSlugs.has(slug)) {
      candidateSlugs.add(slug);
    }
  }
}

console.log(`Encontrados ${candidateSlugs.size} possíveis links de redirecionamento de afiliados:`, Array.from(candidateSlugs));

async function resolveRedirects() {
  const redirects = {};
  for (const slug of candidateSlugs) {
    const url = `https://loucalimpa.com/${slug}`;
    try {
      const res = await fetch(url, { redirect: 'manual' });
      const loc = res.headers.get('location');
      if (loc) {
        console.log(`[301/302] /${slug} -> ${loc}`);
        redirects[slug] = loc;
      } else {
        console.log(`[Status ${res.status}] /${slug} (sem location)`);
      }
    } catch (e) {
      console.error(`Erro ao checar /${slug}:`, e.message);
    }
  }

  fs.writeFileSync('data/redirects.json', JSON.stringify(redirects, null, 2), 'utf-8');
  console.log(`Salvos ${Object.keys(redirects).length} redirecionamentos em data/redirects.json`);

  // Gera public/_redirects para Cloudflare Pages
  const lines = Object.entries(redirects).map(([slug, target]) => `/${slug} ${target} 302`);
  fs.writeFileSync('public/_redirects', lines.join('\n'), 'utf-8');
  console.log(`Gerado public/_redirects para Cloudflare Pages!`);
}

resolveRedirects();
