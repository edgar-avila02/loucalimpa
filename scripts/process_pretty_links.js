import fs from 'node:fs';
import path from 'node:path';

const csvPath = path.resolve('data', 'pretty-links.csv');
const rawCsv = fs.readFileSync(csvPath, 'utf-8');

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  const header = lines[0].split(',');
  
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Regex para parse de CSV com valores entre aspas
    const row = [];
    let insideQuotes = false;
    let currentVal = '';
    
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        row.push(currentVal.trim());
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
    row.push(currentVal.trim());
    
    if (row.length >= 3) {
      records.push({
        id: parseInt(row[0]),
        slug: row[1],
        url: row[2],
        name: row[3],
        clicks: parseInt(row[14]) || 0
      });
    }
  }
  return records;
}

const records = parseCSV(rawCsv);
console.log(`Total de registros no CSV: ${records.length}`);

// Mapa de redirecionamentos
// Se houver duplicatas de slug, pega o que tem mais cliques
const redirectsMap = new Map();
const multiSegmentRedirects = [];

for (const record of records) {
  const cleanSlug = record.slug.trim();
  const lowerSlug = cleanSlug.toLowerCase();
  const url = record.url.trim();

  // Verifica se o slug contém barra interna (ex: samsung-dw50C6070fs/az)
  if (cleanSlug.includes('/')) {
    multiSegmentRedirects.push({ slug: cleanSlug, lowerSlug, url });
    // Também adicionamos a versão com traço se não existir
    const hyphenated = lowerSlug.replace(/\//g, '-');
    if (!redirectsMap.has(hyphenated)) {
      redirectsMap.set(hyphenated, url);
    }
    continue;
  }

  if (redirectsMap.has(lowerSlug)) {
    const existing = records.find(r => r.slug.toLowerCase() === lowerSlug && r.url === redirectsMap.get(lowerSlug));
    console.log(`Slug duplicado detectado: ${lowerSlug}`);
    console.log(`  Existente (${existing?.clicks || 0} cliques): ${redirectsMap.get(lowerSlug)}`);
    console.log(`  Novo (${record.clicks} cliques): ${url}`);
    if (record.clicks > (existing?.clicks || 0)) {
      redirectsMap.set(lowerSlug, url);
      console.log(`  -> Substituído pelo novo com mais cliques.`);
    } else {
      console.log(`  -> Mantido existente com mais cliques.`);
    }
  } else {
    redirectsMap.set(lowerSlug, url);
  }
}

// Salva em data/redirects.json
const redirectsObj = Object.fromEntries(redirectsMap);
fs.writeFileSync(path.resolve('data', 'redirects.json'), JSON.stringify(redirectsObj, null, 2), 'utf-8');
console.log(`Salvo data/redirects.json com ${Object.keys(redirectsObj).length} slugs.`);

// Gera public/_redirects
const redirectRules = [];

for (const [slug, target] of redirectsMap.entries()) {
  redirectRules.push(`/${slug} ${target} 302`);
  redirectRules.push(`/${slug}/ ${target} 302`);
}

// Adiciona as regras multi-segmento
for (const item of multiSegmentRedirects) {
  redirectRules.push(`/${item.slug} ${item.url} 302`);
  redirectRules.push(`/${item.slug}/ ${item.url} 302`);
  if (item.slug !== item.lowerSlug) {
    redirectRules.push(`/${item.lowerSlug} ${item.url} 302`);
    redirectRules.push(`/${item.lowerSlug}/ ${item.url} 302`);
  }
}

fs.writeFileSync(path.resolve('public', '_redirects'), redirectRules.join('\n') + '\n', 'utf-8');
console.log(`Salvo public/_redirects com ${redirectRules.length} regras.`);
