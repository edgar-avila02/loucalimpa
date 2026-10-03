import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf8'));
const pages = JSON.parse(fs.readFileSync('data/pages.json', 'utf8'));
const existingRedirects = JSON.parse(fs.readFileSync('data/redirects.json', 'utf8'));
const allItems = [...posts, ...pages];

const knownSlugs = new Set([
  ...posts.map(p => p.slug.toLowerCase()),
  ...pages.map(p => p.slug.toLowerCase()),
  'melhores', 'duvidas', 'review', 'geral', 'home',
  'wp-content', 'wp-admin', 'wp-json', 'feed', 'comments', 'tag', 'category', 'author'
]);

const foundSlugs = new Set();

allItems.forEach(item => {
  const content = item.content.rendered;
  // Match http, https, www, or relative links
  const regex = /href=["'](?:https?:\/\/(?:www\.)?loucalimpa\.com)?\/([a-zA-Z0-9\-_]+)\/?["']/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const slug = m[1].toLowerCase();
    if (
      !knownSlugs.has(slug) && 
      !slug.startsWith('#') && 
      !slug.endsWith('.css') && 
      !slug.endsWith('.js') && 
      !slug.endsWith('.png') && 
      !slug.endsWith('.webp') && 
      !slug.endsWith('.jpg')
    ) {
      foundSlugs.add(slug);
    }
  }
});

console.log('Total de slugs encontrados:', foundSlugs.size);
const newSlugs = Array.from(foundSlugs).filter(s => !existingRedirects[s]);
console.log('Novos slugs que não estavam em redirects.json:', newSlugs);
