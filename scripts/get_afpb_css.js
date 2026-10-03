async function run() {
  const res = await fetch('https://loucalimpa.com/melhor-detergente-para-lava-loucas/');
  const html = await res.text();
  
  // Procura estilos inline com afpb
  const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  console.log(`Encontrados ${styleMatches.length} blocos <style>`);
  for (const style of styleMatches) {
    if (style.includes('afpb') || style.includes('review-list') || style.includes('product_photo')) {
      console.log('--- Bloco de estilo encontrado: ---');
      console.log(style.substring(0, 3000));
    }
  }
}
run();
