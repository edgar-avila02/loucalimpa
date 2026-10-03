import { posts, pages, categories } from '../lib/data.js';

export async function GET() {
  const siteUrl = 'https://loucalimpa.com';

  const staticUrls = [
    { loc: `${siteUrl}/`, lastmod: '2026-10-01' },
    ...categories.map(c => ({
      loc: `${siteUrl}/${c.slug}/`,
      lastmod: '2026-10-01'
    })),
    ...pages.filter(p => p.slug !== 'home').map(p => ({
      loc: `${siteUrl}/${p.slug}/`,
      lastmod: p.date ? p.date.split('T')[0] : '2026-10-01'
    }))
  ];

  const postUrls = posts.map(p => ({
    loc: `${siteUrl}/${p.slug}/`,
    lastmod: (p.modified || p.date || '').split('T')[0]
  }));

  const allUrls = [...staticUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
