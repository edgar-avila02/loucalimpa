import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
for (const post of posts) {
  if (post.content.rendered.includes('wp-block-afpb-review-style-one')) {
    console.log(`\n=== Post: ${post.slug} ===`);
    const match = post.content.rendered.match(/<div class="wp-block-afpb-review-style-one[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
    if (match) {
      console.log(match[0].substring(0, 1500));
    }
    break;
  }
}
