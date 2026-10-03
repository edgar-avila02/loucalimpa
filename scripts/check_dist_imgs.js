import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync(path.resolve('dist', 'melhor-lava-louca-10-servico', 'index.html'), 'utf-8');
const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
let match;
console.log('Imagens em dist/melhor-lava-louca-10-servico/index.html:');
while ((match = regex.exec(html)) !== null) {
  console.log(`- Alt: "${match[2]}" -> Src: "${match[1]}"`);
}
