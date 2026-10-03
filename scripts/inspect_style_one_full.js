import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const dezServicosPost = posts.find(p => p.slug === 'melhor-lava-louca-10-servico');
const idx = dezServicosPost.content.rendered.indexOf('wp-block-afpb-review-style-one');
console.log(dezServicosPost.content.rendered.substring(idx - 10, idx + 2500));
