import fs from 'node:fs';
import path from 'node:path';

const posts = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const pages = JSON.parse(fs.readFileSync(path.resolve('data', 'pages.json'), 'utf-8'));
const all = [...posts, ...pages];

const imgUrls = new Set();
const wpUploads = new Set();
const amazonImgs = new Set();
const otherImgs = new Set();

for (const item of all) {
  const html = item.content?.rendered || '';
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const src = match[1];
    imgUrls.add(src);
    if (src.includes('wp-content/uploads')) {
      wpUploads.add(src);
    } else if (src.includes('amazon') || src.includes('media-amazon') || src.includes('ssl-images-amazon')) {
      amazonImgs.add(src);
    } else {
      otherImgs.add(src);
    }
  }
}

console.log('Total de imagens únicas encontradas no HTML:', imgUrls.size);
console.log('wp-content/uploads:', wpUploads.size);
console.log('Amazon CDN:', amazonImgs.size);
console.log('Outras:', otherImgs.size);

console.log('\nExemplos de wp-content/uploads:');
Array.from(wpUploads).slice(0, 10).forEach(u => console.log(' -', u));

console.log('\nExemplos de Amazon CDN:');
Array.from(amazonImgs).slice(0, 5).forEach(u => console.log(' -', u));

console.log('\nExemplos de Outras:');
Array.from(otherImgs).slice(0, 5).forEach(u => console.log(' -', u));
