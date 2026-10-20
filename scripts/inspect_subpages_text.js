import fs from 'node:fs';

const pages = JSON.parse(fs.readFileSync('data/pages.json', 'utf-8'));
pages.forEach(p => {
  if (p.slug !== 'home') {
    console.log(`\n=================== PAGE: ${p.slug} (${p.title.rendered}) ===================`);
    console.log(p.content.rendered.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300));
  }
});
