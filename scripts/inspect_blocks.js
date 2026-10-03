import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const classCounts = {};
const tagPatterns = new Set();

posts.forEach(post => {
  const content = post.content.rendered;
  const regex = /class=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    match[1].split(/\s+/).forEach(cls => {
      classCounts[cls] = (classCounts[cls] || 0) + 1;
    });
  }

  // Detecta padrões específicos
  if (content.includes('afpb')) tagPatterns.add(`afpb: ${post.slug}`);
  if (content.includes('8l-affiliate-block')) tagPatterns.add(`8l: ${post.slug}`);
  if (content.includes('wp-block-image')) tagPatterns.add(`wp-image: ${post.slug}`);
});

console.log('Posts com afpb:', Array.from(tagPatterns).filter(x => x.startsWith('afpb:')));
console.log('Posts com 8l:', Array.from(tagPatterns).filter(x => x.startsWith('8l:')));

const relevantClasses = Object.keys(classCounts).filter(c => 
  c.includes('afpb') || c.includes('product') || c.includes('review') || c.includes('badge') || c.includes('affiliate')
);

console.log('\nClasses relevantes encontradas:', relevantClasses);
