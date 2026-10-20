import fs from 'node:fs';

const pages = JSON.parse(fs.readFileSync('data/pages.json', 'utf-8'));
console.log('Total pages:', pages.length);
pages.forEach(p => {
  console.log(`- Slug: ${p.slug} | Title: ${p.title.rendered}`);
});
