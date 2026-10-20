async function checkAll() {
  const urls = [
    "https://loucalimpa.com/melhor-lava-loucas/",
    "https://loucalimpa.com/quantos-servicos-lava-loucas/",
    "https://loucalimpa.com/quanto-tempo-a-lava-louca-demora/",
    "https://loucalimpa.com/eos-ell10s-review/"
  ];
  for (const url of urls) {
    const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
    const html = await res.text();
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    console.log(`URL: ${url}`);
    console.log(`  <title>: ${titleMatch ? titleMatch[1] : 'null'}`);
    console.log(`  <meta desc>: ${descMatch ? descMatch[1] : 'null'}`);
  }
}
checkAll();
