import fs from 'node:fs';

async function fetchCss() {
  const htmlRes = await fetch("http://melhoresfones.com/");
  const html = await htmlRes.text();
  const match = html.match(/href="(\/_astro\/[^"]+\.css)"/);
  if (!match) {
    console.log("No CSS found in HTML");
    return;
  }
  const cssUrl = "http://melhoresfones.com" + match[1];
  console.log("Fetching CSS from:", cssUrl);
  const cssRes = await fetch(cssUrl);
  const css = await cssRes.text();
  fs.writeFileSync("scripts/melhoresfones.css", css, "utf-8");
  console.log("Saved scripts/melhoresfones.css with length:", css.length);
}
fetchCss();
