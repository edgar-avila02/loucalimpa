import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const afpbPosts = posts.filter(p => p.content.rendered.includes('afpb'));

console.log(`Encontrados ${afpbPosts.length} posts com blocos afpb:`);
afpbPosts.forEach(p => {
  const listMatches = (p.content.rendered.match(/class="[^"]*afpb[^"]*"/g) || []).length;
  console.log(`- ${p.slug}: ${listMatches} ocorrências`);
});
