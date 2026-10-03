import fs from 'node:fs';
import path from 'node:path';

const posts = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const post = posts.find(p => p.slug.includes('10-servico'));

if (!post) {
  console.log('Post não encontrado! Slugs disponíveis que contêm 10:');
  posts.filter(p => p.slug.includes('10')).forEach(p => console.log(p.slug));
} else {
  console.log('Encontrado post:', post.slug, post.title.rendered);
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
  let match;
  console.log('\nImagens do post:');
  while ((match = regex.exec(post.content.rendered)) !== null) {
    console.log(`- Alt: "${match[2]}" -> Src: "${match[1]}"`);
  }
}
