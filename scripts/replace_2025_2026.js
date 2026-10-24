import fs from 'node:fs';
import path from 'node:path';

// Troca 2025 -> 2026 apenas em texto (title, excerpt, content).
// Não toca em datas (date/modified), slugs nem URLs como /uploads/2025/09/...
const RE = /(?<![\/\w.-])2025(?![\/\w-])/g;

function processFile(file) {
  const fp = path.resolve('data', file);
  const list = JSON.parse(fs.readFileSync(fp, 'utf-8'));
  let count = 0;
  for (const item of list) {
    for (const field of ['title', 'excerpt', 'content']) {
      const v = item[field]?.rendered;
      if (typeof v !== 'string') continue;
      const n = (v.match(RE) || []).length;
      if (n) {
        item[field].rendered = v.replace(RE, '2026');
        count += n;
        console.log(`${file} | ${item.slug} | ${field}: ${n}`);
      }
    }
  }
  fs.writeFileSync(fp, JSON.stringify(list, null, 2), 'utf-8');
  return count;
}

const total = processFile('posts.json') + processFile('pages.json');
console.log(`\nTotal de substituições: ${total}`);
