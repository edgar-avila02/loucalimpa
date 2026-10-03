import fs from 'node:fs';
import path from 'node:path';

const POST_IMAGES_DIR = path.resolve('public', 'images', 'posts');
if (!fs.existsSync(POST_IMAGES_DIR)) {
  fs.mkdirSync(POST_IMAGES_DIR, { recursive: true });
}

const postsData = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Erro ${res.status} ao baixar ${url}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Falha no download de ${url}:`, err.message);
    return false;
  }
}

async function run() {
  console.log(`--- Iniciando download das imagens dos ${postsData.length} posts ---`);
  let count = 0;
  for (const post of postsData) {
    const featuredMedia = post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0] : null;
    const mediaUrl = featuredMedia ? featuredMedia.source_url : null;
    if (mediaUrl) {
      const ext = path.extname(new URL(mediaUrl).pathname) || '.webp';
      const filename = `${post.slug}${ext}`;
      const dest = path.join(POST_IMAGES_DIR, filename);
      if (!fs.existsSync(dest)) {
        console.log(`[${++count}/${postsData.length}] Baixando imagem de: ${post.slug}`);
        await downloadFile(mediaUrl, dest);
      } else {
        count++;
      }
    }
  }
  console.log(`--- Download concluído! ${count} imagens processadas ---`);
}

run();
