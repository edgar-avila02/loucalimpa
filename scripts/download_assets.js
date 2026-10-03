import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_IMAGES_DIR = path.resolve('public', 'images');
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

const assets = [
  {
    name: 'logo.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2024/09/Logo-do-Louca-Limpa.webp'
  },
  {
    name: 'favicon.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2024/09/cropped-Logo-do-Louca-Limpa-150x150.webp'
  },
  {
    name: 'icone-maquina.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2024/12/Icone-de-maquina-de-lavar-louca-1.webp'
  },
  {
    name: 'giovanna-harumi.jpg',
    url: 'https://loucalimpa.com/wp-content/uploads/2024/09/Giovanna-Harumi-1024x683.jpg'
  },
  {
    name: 'globo.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2025/04/Globo.webp'
  },
  {
    name: 'uol.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2025/04/Logo-da-UOL.webp'
  },
  {
    name: 'exame.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2025/04/Exame.webp'
  },
  {
    name: 'terra.webp',
    url: 'https://loucalimpa.com/wp-content/uploads/2025/04/Terra.webp'
  }
];

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Erro ao baixar ${url}: ${res.statusText}`);
      return;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`Baixado com sucesso: ${path.basename(destPath)}`);
  } catch (err) {
    console.error(`Falha no download de ${url}:`, err.message);
  }
}

async function run() {
  console.log('--- Baixando assets principais ---');
  for (const asset of assets) {
    const dest = path.join(PUBLIC_IMAGES_DIR, asset.name);
    console.log(`Baixando: ${asset.name}...`);
    await downloadFile(asset.url, dest);
  }
  console.log('--- Concluído o download dos assets ---');
}

run();
