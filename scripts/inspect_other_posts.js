import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const slugs = [
  'quais-panelas-podem-ir-na-lava-loucas',
  'como-limpar-maquina-de-lavar-louca',
  'panela-de-inducao-pode-ir-na-lava-louca',
  'quanto-tempo-a-lava-louca-demora'
];

slugs.forEach(slug => {
  const p = posts.find(x => x.slug === slug);
  if (p) {
    const imgTags = p.content.rendered.match(/<img\b[^>]*>/gi) || [];
    console.log(`\n=== Post: ${slug} (${imgTags.length} imagens internas) ===`);
    imgTags.forEach(img => console.log(img.substring(0, 150)));
  }
});
