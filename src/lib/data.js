import fs from 'node:fs';
import path from 'node:path';

// Carrega os dados brutos salvos
const postsRaw = JSON.parse(fs.readFileSync(path.resolve('data', 'posts.json'), 'utf-8'));
const pagesRaw = JSON.parse(fs.readFileSync(path.resolve('data', 'pages.json'), 'utf-8'));
const categoriesRaw = JSON.parse(fs.readFileSync(path.resolve('data', 'categories.json'), 'utf-8'));
export const redirects = JSON.parse(fs.readFileSync(path.resolve('data', 'redirects.json'), 'utf-8'));
const seoMetadata = fs.existsSync(path.resolve('data', 'seo_metadata.json'))
  ? JSON.parse(fs.readFileSync(path.resolve('data', 'seo_metadata.json'), 'utf-8'))
  : {};

// Mapeamento de categorias por ID
export const categoriesMap = new Map();
categoriesRaw.forEach(cat => {
  categoriesMap.set(cat.id, {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    count: cat.count
  });
});

export const categories = categoriesRaw;

// Helper para obter imagem do post (local se existir, ou remota)
function getPostImage(post) {
  const exts = ['.webp', '.jpg', '.jpeg', '.png'];
  for (const ext of exts) {
    const localPath = path.resolve('public', 'images', 'posts', `${post.slug}${ext}`);
    if (fs.existsSync(localPath)) {
      return `/images/posts/${post.slug}${ext}`;
    }
  }
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return '/images/icone-maquina.webp';
}

// Helper para obter thumbnail otimizada para os cards
function getPostThumbnail(post) {
  const thumbPath = path.resolve('public', 'images', 'posts', 'thumbnails', `${post.slug}.webp`);
  if (fs.existsSync(thumbPath)) {
    return `/images/posts/thumbnails/${post.slug}.webp`;
  }
  return getPostImage(post);
}

// Processa todos os posts
export const posts = postsRaw.map(post => {
  const postCategories = (post.categories || []).map(id => categoriesMap.get(id)).filter(Boolean);
  const primaryCategory = postCategories[0] || { name: 'Geral', slug: 'geral' };
  
  // Format data
  const dateObj = new Date(post.date);
  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const cleanTitle = post.title.rendered.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&');
  const cleanExcerpt = (post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim();
  const seo = seoMetadata[post.slug] || {};

  return {
    id: post.id,
    slug: post.slug,
    title: cleanTitle,
    seoTitle: seo.title || cleanTitle,
    seoDescription: seo.description || cleanExcerpt || cleanTitle,
    content: post.content.rendered,
    excerpt: cleanExcerpt,
    date: post.date,
    formattedDate,
    modified: post.modified,
    categories: postCategories,
    primaryCategory,
    featuredImage: getPostImage(post),
    thumbnail: getPostThumbnail(post),
    author: 'Giovanna Harumi',
    isSticky: Boolean(post.sticky)
  };
});

// Processa as páginas institucionais
export const pages = pagesRaw.map(p => ({
  id: p.id,
  slug: p.slug,
  title: p.title.rendered.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&amp;/g, '&'),
  content: p.content.rendered,
  date: p.date
}));

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug);
}

export function getPageBySlug(slug) {
  return pages.find(p => p.slug === slug);
}

export function getPostsByCategory(categorySlug) {
  return posts.filter(p => p.categories.some(c => c.slug === categorySlug));
}
