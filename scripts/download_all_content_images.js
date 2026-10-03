import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';

const posts = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const pages = JSON.parse(fs.readFileSync(path.resolve('data', 'pages.json'), 'utf-8'));
const all = [...posts, ...pages];

const OLD_SERVER_IP = '45.77.115.176';

// Mapeia todas as URLs de imagem no conteúdo
const imgUrls = new Set();
for (const item of all) {
  const html = item.content?.rendered || '';
  const regex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    imgUrls.add(match[1]);
  }
  // Também mapeia srcset se houver
  const srcsetRegex = /srcset=["']([^"']+)["']/gi;
  while ((match = srcsetRegex.exec(html)) !== null) {
    const parts = match[1].split(',');
    for (const part of parts) {
      const u = part.trim().split(/\s+/)[0];
      if (u) imgUrls.add(u);
    }
  }
}

console.log(`Encontradas ${imgUrls.size} URLs de imagens totais (src e srcset).`);

function downloadFromOldServer(urlPath, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve('already_exists');
    }

    const options = {
      hostname: OLD_SERVER_IP,
      port: 443,
      path: urlPath,
      method: 'GET',
      headers: {
        'Host': 'loucalimpa.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      servername: 'loucalimpa.com',
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve('ok');
        });
      } else {
        resolve(`http_${res.statusCode}`);
      }
    });

    req.on('error', (err) => {
      resolve(`error_${err.message}`);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve('timeout');
    });

    req.end();
  });
}

function downloadStandardUrl(urlStr, destPath) {
  return new Promise((resolve) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve('already_exists');
    }

    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'https:' ? https : http;

      const req = client.get(urlStr, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      }, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve('ok');
          });
        } else {
          resolve(`http_${res.statusCode}`);
        }
      });

      req.on('error', (err) => resolve(`error_${err.message}`));
      req.setTimeout(10000, () => {
        req.destroy();
        resolve('timeout');
      });
    } catch (e) {
      resolve(`invalid_url`);
    }
  });
}

async function run() {
  let downloadedCount = 0;
  let alreadyCount = 0;
  let errorCount = 0;

  for (const rawUrl of imgUrls) {
    if (rawUrl.includes('wp-content/uploads/')) {
      // Extrai o caminho relativo após /wp-content/uploads/
      const match = rawUrl.match(/\/wp-content\/uploads\/(.+)$/);
      if (match) {
        const relPath = match[1].split('?')[0]; // remove query params se houver
        const destPath = path.resolve('public', 'wp-content', 'uploads', relPath);
        const urlPath = `/wp-content/uploads/${relPath}`;

        const res = await downloadFromOldServer(urlPath, destPath);
        if (res === 'ok') {
          downloadedCount++;
          console.log(`[BAIXADO] ${relPath}`);
        } else if (res === 'already_exists') {
          alreadyCount++;
        } else {
          console.warn(`[FALHA ${res}] ${relPath}`);
          errorCount++;
        }
      }
    } else if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      // Para imagens externas (Amazon, Supabase, etc), salva em public/images/external/
      try {
        const parsed = new URL(rawUrl);
        const fileName = path.basename(parsed.pathname) || 'image.webp';
        const destPath = path.resolve('public', 'images', 'external', fileName);

        const res = await downloadStandardUrl(rawUrl, destPath);
        if (res === 'ok') {
          downloadedCount++;
          console.log(`[EXTERNA BAIXADA] ${fileName}`);
        } else if (res === 'already_exists') {
          alreadyCount++;
        } else {
          errorCount++;
        }
      } catch (e) {
        // Ignora
      }
    }
  }

  console.log(`\nResumo:`);
  console.log(`- Baixadas agora: ${downloadedCount}`);
  console.log(`- Já existiam: ${alreadyCount}`);
  console.log(`- Falhas: ${errorCount}`);
}

run();
