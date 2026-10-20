import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const categories = JSON.parse(fs.readFileSync('data/categories.json', 'utf-8'));
const catMap = Object.fromEntries(categories.map(c => [c.id, c.slug]));

const results = posts.map(p => {
  const cSlugs = (p.categories || []).map(id => catMap[id] || id);
  const cleanTitle = p.title.rendered.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&');
  const cleanExcerpt = (p.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim();
  
  return {
    slug: p.slug,
    categories: cSlugs,
    h1: cleanTitle,
    excerpt: cleanExcerpt
  };
});

fs.writeFileSync('scripts/all_posts_audit.json', JSON.stringify(results, null, 2), 'utf-8');
console.log('Saved all_posts_audit.json with', results.length, 'posts.');
