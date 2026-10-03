import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));

const detergentePost = posts.find(p => p.slug === 'melhor-detergente-para-lava-loucas');
const matchDetergente = detergentePost.content.rendered.match(/<div class="wp-block-afpb-review-list[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
console.log('=== AFPB REVIEW LIST (Detergente) ===');
console.log(matchDetergente ? matchDetergente[0] : 'Não encontrado');

const dezServicosPost = posts.find(p => p.slug === 'melhor-lava-louca-10-servico');
const matchDez = dezServicosPost.content.rendered.match(/<div class="wp-block-afpb-review-style-one[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
console.log('\n=== AFPB REVIEW STYLE ONE (10 Serviços) ===');
console.log(matchDez ? matchDez[0] : 'Não encontrado');
