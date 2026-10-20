import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const categories = JSON.parse(fs.readFileSync('data/categories.json', 'utf-8'));
const catMap = Object.fromEntries(categories.map(c => [c.id, c.slug]));

console.log('=== LISTA COMPLETA DOS 48 POSTS ===\n');

posts.forEach((p, i) => {
  const cats = (p.categories || []).map(id => catMap[id] || id).join(', ');
  const cleanTitle = p.title.rendered.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&').trim();
  console.log(`${i + 1}. [${cats}] ${p.slug}`);
  console.log(`   H1: "${cleanTitle}"`);
});
