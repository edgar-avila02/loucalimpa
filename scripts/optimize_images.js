import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function getFiles(dir, exts = ['.webp', '.jpg', '.jpeg', '.png']) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath, exts));
      } else {
        const ext = path.extname(file).toLowerCase();
        if (exts.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    console.error('Erro lendo dir:', dir, err);
  }
  return results;
}

async function optimizeImages() {
  const targetDirs = [
    path.resolve('public', 'images'),
    path.resolve('public', 'wp-content')
  ];

  let allImages = [];
  for (const dir of targetDirs) {
    if (fs.existsSync(dir)) {
      allImages = allImages.concat(getFiles(dir));
    }
  }

  console.log(`Encontradas ${allImages.length} imagens nos diretórios.`);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  let optimizedCount = 0;

  for (const imgPath of allImages) {
    const originalStat = fs.statSync(imgPath);
    const originalSize = originalStat.size;
    totalOriginalBytes += originalSize;

    try {
      // Lê o buffer diretamente para não travar o arquivo no Windows
      const inputBuffer = fs.readFileSync(imgPath);
      const metadata = await sharp(inputBuffer).metadata();
      const needsResize = (metadata.width && metadata.width > 1200) || (metadata.height && metadata.height > 1200);
      const isOversized = originalSize > 80 * 1024; // > 80 KB

      if (!needsResize && !isOversized) {
        totalOptimizedBytes += originalSize;
        continue;
      }

      const ext = path.extname(imgPath).toLowerCase();
      let pipeline = sharp(inputBuffer).rotate();

      if (needsResize) {
        pipeline = pipeline.resize({
          width: 1200,
          height: 1200,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      let optimizedBuffer;
      if (ext === '.webp') {
        optimizedBuffer = await pipeline
          .webp({ quality: 80, effort: 5 })
          .toBuffer();
      } else if (ext === '.jpg' || ext === '.jpeg') {
        optimizedBuffer = await pipeline
          .jpeg({ quality: 80, mozjpeg: true })
          .toBuffer();
      } else if (ext === '.png') {
        optimizedBuffer = await pipeline
          .png({ compressionLevel: 9, palette: true })
          .toBuffer();
      }

      if (optimizedBuffer && optimizedBuffer.length < originalSize) {
        fs.writeFileSync(imgPath, optimizedBuffer);
        optimizedCount++;
        totalOptimizedBytes += optimizedBuffer.length;
        const savedKB = ((originalSize - optimizedBuffer.length) / 1024).toFixed(1);
        console.log(`✓ Otimizado [${savedKB} KB salvos]: ${path.relative(process.cwd(), imgPath)} (${(originalSize/1024).toFixed(0)}KB -> ${(optimizedBuffer.length/1024).toFixed(0)}KB, ${metadata.width}x${metadata.height} -> máx 1200)`);
      } else {
        totalOptimizedBytes += originalSize;
      }
    } catch (err) {
      console.error(`Erro ao otimizar ${imgPath}:`, err.message);
      totalOptimizedBytes += originalSize;
    }
  }

  const savedTotalMB = ((totalOriginalBytes - totalOptimizedBytes) / (1024 * 1024)).toFixed(2);
  const origMB = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const finalMB = (totalOptimizedBytes / (1024 * 1024)).toFixed(2);

  console.log('\n--- RESUMO DA OTIMIZAÇÃO ---');
  console.log(`Total de imagens verificadas: ${allImages.length}`);
  console.log(`Imagens reduzidas: ${optimizedCount}`);
  console.log(`Tamanho original: ${origMB} MB`);
  console.log(`Tamanho otimizado: ${finalMB} MB`);
  console.log(`Economia total: ${savedTotalMB} MB (${(((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) * 100).toFixed(1)}%)`);
}

optimizeImages();
