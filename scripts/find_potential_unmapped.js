import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('data/pages.json', 'utf-8'));
const allItems = [...posts, ...pages];

const amazonDirectLinks = new Set();
const otherLinks = new Set();

allItems.forEach(item => {
  const content = item.content.rendered;
  const regex = /href=["'](https?:\/\/[^"']+)["']/gi;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const url = m[1];
    if (url.includes('amzn.to') || url.includes('amazon.com')) {
      amazonDirectLinks.add(url);
    } else if (!url.includes('loucalimpa.com') && !url.includes('w.org') && !url.includes('gravatar') && !url.includes('google')) {
      otherLinks.add(url);
    }
  }
});

console.log('Links diretos da Amazon encontrados nos posts:', Array.from(amazonDirectLinks));
console.log('Outros links externos:', Array.from(otherLinks));
