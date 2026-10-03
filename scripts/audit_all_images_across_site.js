import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Analisando ${htmlFiles.length} páginas HTML geradas em dist/...`);

const missingLocalImages = [];
const externalImages = [];
let totalImagesChecked = 0;

for (const htmlFile of htmlFiles) {
  const relPage = path.relative(distDir, htmlFile);
  // Ignora páginas de redirecionamento puro se houver
  const content = fs.readFileSync(htmlFile, 'utf-8');
  if (content.includes('Redirecionando para a oferta...')) continue;

  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    totalImagesChecked++;
    const src = match[1];

    if (src.startsWith('/')) {
      // Caminho relativo ao root de dist
      // Remove query string ou hash se houver
      const cleanPath = src.split('?')[0].split('#')[0];
      const diskPath = path.join(distDir, cleanPath.replace(/^\//, '').replace(/\//g, path.sep));
      if (!fs.existsSync(diskPath)) {
        missingLocalImages.push({ page: relPage, src, diskPath });
      }
    } else if (src.startsWith('http://') || src.startsWith('https://')) {
      externalImages.push({ page: relPage, src });
    }
  }
}

console.log(`\nResultado da auditoria:`);
console.log(`Total de tags <img> verificadas: ${totalImagesChecked}`);
console.log(`Imagens locais ausentes (404 no disco): ${missingLocalImages.length}`);
console.log(`Imagens ainda apontando para URLs externas: ${externalImages.length}`);

if (missingLocalImages.length > 0) {
  console.log(`\nImagens ausentes detectadas:`);
  missingLocalImages.slice(0, 20).forEach(m => {
    console.log(`  Página: ${m.page}`);
    console.log(`    Src: ${m.src}`);
  });
}

if (externalImages.length > 0) {
  console.log(`\nExemplos de imagens externas ainda presentes:`);
  externalImages.slice(0, 10).forEach(m => {
    console.log(`  Página: ${m.page}`);
    console.log(`    Src: ${m.src}`);
  });
}
