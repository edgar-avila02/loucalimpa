import fs from 'node:fs';
import path from 'node:path';

const posts = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const pages = JSON.parse(fs.readFileSync(path.resolve('data', 'pages.json'), 'utf-8'));
const stripUrls = (html) => html
  .replace(/(src|href|srcset|data-[a-z-]+)="[^"]*"/gi, '')
  .replace(/https?:\/\/\S+/g, '');

for (const [label, list] of [['POST', posts], ['PAGE', pages]]) {
  for (const p of list) {
    for (const field of ['title', 'excerpt', 'content']) {
      const txt = stripUrls(p[field]?.rendered || '');
      let m; const re = /2025/g;
      while ((m = re.exec(txt))) {
        console.log(`[${label}] ${p.slug} (${field}): ...${txt.slice(Math.max(0, m.index - 70), m.index + 40).replace(/\s+/g, ' ')}...`);
      }
    }
  }
}
