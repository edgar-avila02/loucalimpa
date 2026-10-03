import fs from 'node:fs';
import path from 'node:path';

const posts = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const post = posts.find(p => p.slug === 'melhor-lava-louca-10-servico');
const imgs = [];
const regex = /<img[^>]+src=["']([^"']+)["']/gi;
let m;
while ((m = regex.exec(post.content.rendered)) !== null) {
  imgs.push(m[1]);
}
console.log('Imagens do post melhor-lava-louca-10-servico:');
imgs.forEach(i => console.log(' -', i));
