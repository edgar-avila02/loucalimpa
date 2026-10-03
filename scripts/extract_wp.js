import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://loucalimpa.com/wp-json/wp/v2';
const DATA_DIR = path.resolve('data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function fetchAll(endpoint) {
  let page = 1;
  let allItems = [];
  while (true) {
    const url = `${BASE_URL}/${endpoint}?per_page=100&page=${page}&_embed=1`;
    console.log(`Buscando: ${url}`);
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 400 || res.status === 404) {
        // No more pages
        break;
      }
      console.error(`Erro ao buscar ${url}: ${res.statusText}`);
      break;
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      break;
    }
    allItems = allItems.concat(data);
    const totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
    console.log(`Recebidos ${data.length} itens (Página ${page}/${totalPages})`);
    if (page >= totalPages) {
      break;
    }
    page++;
  }
  return allItems;
}

async function run() {
  console.log('--- Iniciando extração de dados do Louça Limpa ---');
  
  console.log('\n1. Extraindo categorias...');
  const categories = await fetchAll('categories');
  fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2), 'utf-8');
  console.log(`Salvas ${categories.length} categorias em data/categories.json`);

  console.log('\n2. Extraindo páginas...');
  const pages = await fetchAll('pages');
  fs.writeFileSync(path.join(DATA_DIR, 'pages.json'), JSON.stringify(pages, null, 2), 'utf-8');
  console.log(`Salvas ${pages.length} páginas em data/pages.json`);

  console.log('\n3. Extraindo posts...');
  const posts = await fetchAll('posts');
  fs.writeFileSync(path.join(DATA_DIR, 'posts.json'), JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`Salvos ${posts.length} posts em data/posts.json`);

  console.log('\n--- Extração concluída com sucesso! ---');
}

run().catch(err => {
  console.error('Erro na extração:', err);
  process.exit(1);
});
