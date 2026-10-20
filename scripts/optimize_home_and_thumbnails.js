import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function optimizeHomeAssets() {
  console.log('--- 1. OTIMIZANDO ATIVOS ESTÁTICOS DA HOME ---');

  // 1. Logo (exibido em 48x48 -> 96x96 Retina)
  const logoPath = path.resolve('public', 'images', 'logo.webp');
  if (fs.existsSync(logoPath)) {
    const origSize = fs.statSync(logoPath).size;
    const logoBuf = fs.readFileSync(logoPath);
    const optimizedLogo = await sharp(logoBuf)
      .resize(96, 96, { fit: 'contain' })
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    fs.writeFileSync(logoPath, optimizedLogo);
    console.log(`Logo otimizado: ${(origSize/1024).toFixed(1)} KB -> ${(optimizedLogo.length/1024).toFixed(1)} KB`);
  }

  // 2. Ícone Máquina Hero (exibido em 296x235 -> máx 480px largura)
  const heroPath = path.resolve('public', 'images', 'icone-maquina.webp');
  if (fs.existsSync(heroPath)) {
    const origSize = fs.statSync(heroPath).size;
    const heroBuf = fs.readFileSync(heroPath);
    const optimizedHero = await sharp(heroBuf)
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    fs.writeFileSync(heroPath, optimizedHero);
    console.log(`Ícone Hero otimizado: ${(origSize/1024).toFixed(1)} KB -> ${(optimizedHero.length/1024).toFixed(1)} KB`);
  }

  // 3. Foto da Giovanna (exibida em círculo 240x240 -> 480x480 square WebP)
  const authorJpg = path.resolve('public', 'images', 'giovanna-harumi.jpg');
  const authorWebp = path.resolve('public', 'images', 'giovanna-harumi.webp');
  if (fs.existsSync(authorJpg)) {
    const origSize = fs.statSync(authorJpg).size;
    const authorBuf = fs.readFileSync(authorJpg);
    const optimizedAuthor = await sharp(authorBuf)
      .resize(480, 480, { fit: 'cover', position: 'top' })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    fs.writeFileSync(authorWebp, optimizedAuthor);
    // Também atualiza o jpg caso algum arquivo antigo use
    const optimizedJpg = await sharp(authorBuf)
      .resize(480, 480, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(authorJpg, optimizedJpg);
    console.log(`Foto Giovanna otimizada (WebP): ${(origSize/1024).toFixed(1)} KB -> ${(optimizedAuthor.length/1024).toFixed(1)} KB`);
  }

  // 4. Converter PNGs de posts para WebP
  const postsDir = path.resolve('public', 'images', 'posts');
  const pngFiles = ['como-colocar-tacas-na-lava-louca.png', 'como-limpar-maquina-de-lavar-louca.png'];
  for (const png of pngFiles) {
    const pPath = path.join(postsDir, png);
    if (fs.existsSync(pPath)) {
      const origSize = fs.statSync(pPath).size;
      const buf = fs.readFileSync(pPath);
      const webpPath = pPath.replace(/\.png$/, '.webp');
      const webpBuf = await sharp(buf)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(webpPath, webpBuf);
      fs.unlinkSync(pPath); // remove png antigo
      console.log(`PNG convertido para WebP: ${png} -> ${path.basename(webpPath)} (${(origSize/1024).toFixed(1)} KB -> ${(webpBuf.length/1024).toFixed(1)} KB)`);
    }
  }

  // 5. Gerar Thumbnails leves (480x300, proporção 16:10 dos cards) para TODOS os posts
  console.log('\n--- 2. GERANDO THUMBNAILS LEVES PARA OS CARDS (480x300) ---');
  const thumbsDir = path.resolve('public', 'images', 'posts', 'thumbnails');
  if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync(thumbsDir, { recursive: true });
  }

  const postFiles = fs.readdirSync(postsDir).filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f));
  let thumbsCount = 0;
  let totalThumbBytes = 0;

  for (const f of postFiles) {
    const srcPath = path.join(postsDir, f);
    const slugName = path.basename(f, path.extname(f));
    const destPath = path.join(thumbsDir, `${slugName}.webp`);

    try {
      const buf = fs.readFileSync(srcPath);
      const thumbBuf = await sharp(buf)
        .resize(480, 300, { fit: 'cover', position: 'center' })
        .webp({ quality: 75, effort: 5 })
        .toBuffer();

      fs.writeFileSync(destPath, thumbBuf);
      thumbsCount++;
      totalThumbBytes += thumbBuf.length;
    } catch (err) {
      console.error(`Erro ao gerar thumb para ${f}:`, err.message);
    }
  }

  console.log(`Gerados ${thumbsCount} thumbnails leves.`);
  console.log(`Média de tamanho por thumbnail: ${(totalThumbBytes / thumbsCount / 1024).toFixed(1)} KB`);
}

optimizeHomeAssets();
