import fs from 'node:fs';
import path from 'node:path';

const posts = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const seoPath = path.resolve('data', 'seo_metadata.json');
const seo = fs.existsSync(seoPath) ? JSON.parse(fs.readFileSync(seoPath, 'utf-8')) : {};

// Remove URLs/atributos para contar só ocorrências no texto visível
const stripUrls = (html) => html
  .replace(/(src|href|srcset|data-[a-z-]+)="[^"]*"/gi, '')
  .replace(/https?:\/\/\S+/g, '');

let total = 0;
for (const p of posts) {
  const title = p.title?.rendered || '';
  const excerpt = p.excerpt?.rendered || '';
  const content = p.content?.rendered || '';
  const s = seo[p.slug] || {};
  const inTitle = (title.match(/2025/g) || []).length;
  const inExcerpt = (stripUrls(excerpt).match(/2025/g) || []).length;
  const inContentText = (stripUrls(content).match(/2025/g) || []).length;
  const inContentAll = (content.match(/2025/g) || []).length;
  const inSeo = ((s.title || '') + (s.description || '')).match(/2025/g)?.length || 0;
  if (inTitle || inExcerpt || inContentText || inSeo) {
    total++;
    console.log(`${p.slug} | title:${inTitle} excerpt:${inExcerpt} texto:${inContentText} (urls:${inContentAll - inContentText}) seo:${inSeo} | date:${p.date}`);
  }
}
console.log(`\nPosts com 2025 em texto: ${total} de ${posts.length}`);
