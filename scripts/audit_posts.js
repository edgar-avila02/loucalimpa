import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
console.log(`Auditoria dos ${posts.length} posts do blog Louça Limpa:\n`);

const results = [];

posts.forEach((post, i) => {
  const content = post.content.rendered;
  const hasAfpbList = content.includes('wp-block-afpb-review-list');
  const hasAfpbStyleOne = content.includes('wp-block-afpb-review-style-one');
  const has8l = content.includes('8l-affiliate-block');
  const hasTable = content.includes('<table');
  const hasImages = (content.match(/<img\b/gi) || []).length;
  
  results.push({
    index: i + 1,
    slug: post.slug,
    title: post.title.rendered.substring(0, 40),
    afpbList: hasAfpbList,
    afpbStyleOne: hasAfpbStyleOne,
    has8l,
    hasTable,
    imagesCount: hasImages
  });
});

console.table(results);
