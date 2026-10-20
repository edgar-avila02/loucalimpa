import fs from 'node:fs';

const seoData = {
  // --- MELHORES (COMERCIAIS PERSUASIVOS) ---
  "melhor-lava-loucas": {
    "title": "Melhores Lava-Louças de 2026: Guia com as Top Opções",
    "description": "Conheça as melhores lava-louças de 2026! Avaliamos economia, funções e capacidade para você escolher o modelo perfeito para sua casa. Confira agora!"
  },
  "melhor-lava-louca-10-servico": {
    "title": "Melhores Lava-Louças 10 Serviços 2026: Top Modelos!",
    "description": "Procurando a melhor lava-louças de 10 serviços? Comparamos os modelos mais vendidos em economia, funções e espaço. Veja qual comprar hoje mesmo!"
  },
  "lava-loucas-vale-a-pena": {
    "title": "Lava-Louças Vale a Pena? Prós, Contras e Custos Reais",
    "description": "Será que comprar lava-louças vale a pena mesmo? Revelamos gastos de luz e água, tempo economizado e se compensa o investimento para sua família."
  },
  "melhor-detergente-para-lava-loucas": {
    "title": "Melhor Sabão Para Lava-Louças: Os 10 Tops de 2026!",
    "description": "Qual é o melhor detergente para lava-louças? Testamos cápsulas, pó e gel para mostrar quais removem gordura pesada sem manchar. Veja o ranking!"
  },
  "lava-loucas-midea-14-servico-e-boa": {
    "title": "Lava-Louças Midea 14 Serviços é Boa? Vale a Pena?",
    "description": "A lava-louças Midea 14 serviços realmente limpa panelas e economiza água? Veja nossa análise completa com prós, contras e melhor preço do mercado."
  },
  "melhor-lava-loucas-8-servicos": {
    "title": "Melhor Lava-Louças 8 Serviços: 6 Melhores de 2026!",
    "description": "Buscando uma lava-louças compacta e eficiente? Confira as 6 melhores lava-louças de 8 serviços de 2026 com excelente custo-benefício. Veja!"
  },
  "lava-louca-melhor-custo-beneficio": {
    "title": "Melhores Lava-Louças Custo-Benefício 2026: Top 10!",
    "description": "Economize dinheiro sem abrir mão da qualidade! Veja as 10 lava-louças com melhor custo-benefício do mercado e escolha a sua com segurança!"
  },
  "melhor-marca-de-lava-loucas": {
    "title": "Qual a Melhor Marca de Lava-Louças? Veja o Ranking!",
    "description": "Brastemp, Electrolux, Midea ou Samsung? Descubra qual é a melhor marca de lava-louças de 2026 com base em durabilidade, peças e satisfação!"
  },
  "qual-a-melhor-lava-loucas-que-lava-panelas": {
    "title": "Melhor Lava-Louças Que Lava Panelas: Top 12 de 2026",
    "description": "Precisa de uma lava-louças potente para panelas e travessas engorduradas? Conheça os 12 modelos mais eficientes com cesto ajustável. Confira!"
  },
  "lava-loucas-eos-e-boa": {
    "title": "Lava-Louças EOS é Boa Mesmo? Análise e Vale a Pena?",
    "description": "Quer saber se a lava-louças da marca EOS é boa e confiável? Analisamos a construção, programas de lavagem, ruído e custo-benefício. Descubra!"
  },
  "lava-louca-midea-8-servicos-e-boa": {
    "title": "Lava-Louças Midea 8 Serviços é Boa? Vale a Pena?",
    "description": "Pensando em comprar a Midea 8 serviços? Veja tudo sobre espaço interno, consumo, funções de limpeza e descubra se vale a pena para sua rotina!"
  },
  "lava-loucas-samsung-e-boa": {
    "title": "Lava-Louças Samsung é Boa? Veja a Análise Completa!",
    "description": "Descubra se a lava-louças Samsung de 10 serviços realmente vale o investimento. Avaliamos a tecnologia silenciosa, acabamento e durabilidade."
  },
  "lava-loucas-philco-e-boa": {
    "title": "Lava-Louças Philco é Boa? Veja Testes e Avaliação!",
    "description": "A lava-louças Philco compensa? Analisamos os modelos mais vendidos, desempenho contra sujeira difícil, economia e opiniões de quem comprou. Veja!"
  },
  "lava-loucas-gallant-e-boa": {
    "title": "Lava-Louças Gallant é Boa? Review e Vale a Pena?",
    "description": "Vale a pena comprar a lava-louças Gallant? Veja como ela se sai em eficiência, programas, ruído e se o preço baixo realmente compensa. Confira!"
  },

  // --- REVIEWS INDIVIDUAIS (COMERCIAIS PERSUASIVOS) ---
  "eos-ell10s-review": {
    "title": "Lava-Louças EOS ELL10S é Boa? Review e Vale a Pena?",
    "description": "Avaliação completa da lava-louças EOS ELL10S de 10 serviços. Conheça recursos, consumo, pontos fortes e veja se vale a pena comprar este modelo!"
  },
  "philco-pll10-review": {
    "title": "Philco PLL10 Lava-Louças é Boa? Review e Vale a Pena",
    "description": "Análise detalhada da lava-louças Philco PLL10. Veja o teste de lavagem, consumo de energia, vantagens, desvantagens e se compensa o investimento!"
  },
  "electrolux-ll10b-review": {
    "title": "Electrolux LL10B é Boa? Review da Lava-Louças Branca",
    "description": "Review sincero da lava-louças Electrolux LL10B 10 serviços. Veja testes de limpeza, programas, economia e descubra se é a melhor escolha para você!"
  },
  "samsung-dw50c6070fs-az-review": {
    "title": "Samsung DW50C6070FS é Boa? Review da Lava-Louças Inox",
    "description": "Confira o review da lava-louças Samsung DW50C6070FS em inox. Conheça as tecnologias exclusivas, nível de ruído, eficiência e se vale a pena comprar."
  },
  "brastemp-blf10bb-review": {
    "title": "Brastemp BLF10BB é Boa? Review da Lava-Louças 10 Serv",
    "description": "Análise completa da lava-louças Brastemp BLF10BB 10 serviços. Veja os ciclos de lavagem, eficiência contra gordura e descubra se vale a pena!"
  },
  "brastemp-blf10br-review": {
    "title": "Lava-Louças Brastemp BLF10BR é Boa? Review Completo!",
    "description": "Review detalhado da Brastemp BLF10BR inox 10 serviços. Descubra os diferenciais, consumo, prós e contras e se compensa para a sua cozinha!"
  },
  "electrolux-ll10x-review": {
    "title": "Electrolux LL10X é Boa? Review da Lava-Louças Inox!",
    "description": "Review completo da Electrolux LL10X 10 serviços inox. Veja capacidade, economia, funções inteligentes e se vale a pena investir nesse modelo."
  },

  // --- DÚVIDAS (INFORMACIONAIS DIRETOS E CLAROS) ---
  "quantos-servicos-lava-loucas": {
    "title": "Quantos Serviços Lava-Louças Deve Ter? Descubra Aqui",
    "description": "Descubra quantos serviços sua lava-louças precisa ter. Veja o tamanho ideal para famílias ou casais e evite desperdício de água e energia. Confira!"
  },
  "quanto-tempo-a-lava-louca-demora": {
    "title": "Quanto Tempo a Lava-Louça Demora? Veja a Duração Real",
    "description": "Saiba quanto tempo dura o ciclo de uma lava-louças, do modo rápido ao pesado. Entenda o tempo médio de cada lavagem e economize horas na cozinha!"
  },
  "como-colocar-tacas-na-lava-louca": {
    "title": "Como Colocar Taças na Lava-Louça Sem Quebrar ou Risco",
    "description": "Aprenda a posicionar taças na lava-louças com segurança total. Dicas simples para evitar quebras, manchas e preservar o brilho do cristal. Veja!"
  },
  "lava-louca-economiza-agua": {
    "title": "Lava-Louça Economiza Água? Veja Quanto Você Poupa Já",
    "description": "Descubra quanta água a lava-louças economiza em relação à lavagem manual. Veja dados reais e dicas práticas para gastar menos na conta de água!"
  },
  "posso-instalar-lava-louca-embaixo-do-cooktop": {
    "title": "Lava-Louça Embaixo do Cooktop: Pode Instalar ou Não?",
    "description": "Pode colocar lava-louça embaixo do cooktop? Entenda as regras de segurança, ventilação necessária e cuidados para planejar sua cozinha sem erros."
  },
  "pode-colocar-detergente-na-maquina-de-lavar-louca": {
    "title": "Pode Usar Detergente Comum na Lava-Louça? Cuidado!",
    "description": "Descubra por que você nunca deve usar detergente comum na lava-louças. Conheça os riscos de vazamento, danos e qual é o produto correto para usar."
  },
  "pode-colocar-lava-louca-em-cima-da-lava-e-seca": {
    "title": "Pode Colocar Lava-Louça em Cima da Lava e Seca? Veja",
    "description": "Dúvida comum na lavanderia: pode empilhar lava-louça sobre a lava e seca? Descubra os riscos de vibração, peso suportado e as melhores alternativas!"
  },
  "como-limpar-maquina-de-lavar-louca": {
    "title": "Como Limpar a Lava-Louças: Passo a Passo Sem Erros!",
    "description": "Guia prático para higienizar sua lava-louças por dentro e por fora. Elimine gordura, maus odores e mantenha a máquina potente com dicas fáceis!"
  },
  "como-usar-lava-louca-electrolux": {
    "title": "Como Usar Lava-Louça Electrolux: Dicas e Programas!",
    "description": "Aprenda a usar sua lava-louças Electrolux do jeito certo! Conheça cada programa, dosagem correta de sabão e cuidados para pratos sempre brilhantes."
  },
  "copo-stanley-pode-ir-na-lava-louca": {
    "title": "Copo Stanley Pode Ir na Lava-Louça? Descubra a Verdade",
    "description": "Seu copo Stanley pode ir na máquina de lavar louça? Veja o que o fabricante recomenda, como não estragar a pintura térmica e dicas de lavagem."
  },
  "tupperware-pode-ir-na-lava-louca": {
    "title": "Tupperware Pode Ir na Lava-Louça? Veja Como Cuidar!",
    "description": "Potes plásticos e Tupperware podem ir na lava-louças sem deformar? Confira as dicas essenciais de temperatura, cesto correto e símbolos de aviso!"
  },
  "panela-de-inducao-pode-ir-na-lava-louca": {
    "title": "Panela de Indução Pode Ir na Lava-Louça? Veja Riscos!",
    "description": "Sua panela de indução estraga na lava-louças? Entenda o impacto da máquina no fundo magnético e aprenda a lavar com total segurança sem danificar."
  },
  "como-limpar-lava-louca-brastemp": {
    "title": "Como Limpar Lava-Louças Brastemp: Guia Passo a Passo",
    "description": "Aprenda a limpar o filtro, as hélices e o interior da sua lava-louças Brastemp. Remova gorduras e odores para manter a louça impecável e brilhando!"
  },
  "como-usar-lava-louca-brastemp": {
    "title": "Como Usar Lava-Louça Brastemp: Dicas e Ciclos Certos",
    "description": "Guia prático para usar sua lava-louças Brastemp com máxima eficiência. Escolha os ciclos certos, organize as louças e economize sabão no dia a dia!"
  },
  "como-instalar-lava-louca-electrolux": {
    "title": "Como Instalar Lava-Louça Electrolux Sem Complicação!",
    "description": "Veja o passo a passo para instalar sua lava-louças Electrolux: ponto de água, esgoto e elétrica com segurança. Instale fácil e sem erros!"
  },
  "usar-secante-na-lava-louca-faz-mal": {
    "title": "Líquido Secante na Lava-Louça Faz Mal à Saúde? Veja!",
    "description": "Usar secante na lava-louças pode fazer mal ou deixar resíduos tóxicos? Entenda a composição do produto e para que ele serve exatamente na lavagem."
  },
  "pode-lavar-louca-com-sabao-em-po": {
    "title": "Pode Usar Sabão em Pó na Lava-Louça? Cuidado com Isso",
    "description": "Descubra o perigo de colocar sabão em pó de lavar roupa na máquina de lavar louça. Saiba quais produtos são permitidos para evitar danificar o motor."
  },
  "panela-de-ceramica-pode-ir-na-lava-louca": {
    "title": "Panela de Cerâmica Pode Ir na Lava-Louça? Saiba Tudo!",
    "description": "Panela de cerâmica estraga na lava-louças? Descubra quando é seguro colocar, cuidados com o revestimento antiaderente e como lavar sem arranhar."
  },
  "como-resetar-lava-louca-brastemp": {
    "title": "Como Resetar Lava-Louça Brastemp: Guia Fácil e Rápido",
    "description": "Sua lava-louças Brastemp travou ou está apitando? Veja o passo a passo para reiniciar a máquina e limpar erros no painel de forma rápida e segura!"
  },
  "como-instalar-lava-loucas-brastemp": {
    "title": "Como Instalar Lava-Louças Brastemp de Forma Segura!",
    "description": "Aprenda a instalar sua lava-louças Brastemp passo a passo. Dicas de encanamento de entrada, saída de esgoto e voltagem correta para não errar!"
  },
  "simbolo-que-pode-ir-na-lava-louca": {
    "title": "Símbolo da Lava-Louças: O Que Significa Cada Ícone?",
    "description": "Aprenda a identificar os símbolos de lava-louças em pratos, potes e panelas. Saiba quais utensílios são seguros para ir à máquina sem estragar."
  },
  "onde-colocar-a-lava-loucas-na-cozinha": {
    "title": "Onde Colocar a Lava-Louças na Cozinha? Melhores Locais",
    "description": "Descubra a melhor posição para instalar sua lava-louças na cozinha: ao lado da pia, embutida ou de bancada. Otimize espaço e fluxo de trabalho!"
  },
  "quais-panelas-podem-ir-na-lava-loucas": {
    "title": "Quais Panelas Podem Ir na Lava-Louças? Guia Completo!",
    "description": "Inox, alumínio, ferro ou cerâmica: quais panelas podem ir à lava-louças? Veja o guia definitivo para nunca estragar suas panelas na lavagem!"
  },
  "como-funciona-lava-loucas": {
    "title": "Como Funciona a Lava-Louças Por Dentro? Entenda Tudo!",
    "description": "Descubra como a lava-louças limpa louças engorduradas sem esponja. Entenda os jatos d'água aquecidos, filtros e ciclos de secagem automática!"
  },
  "posso-instalar-lava-louca-na-pia": {
    "title": "Posso Instalar Lava-Louça Direto na Pia? Veja Como!",
    "description": "Dá para instalar lava-louça na bancada ou pia da cozinha? Veja as exigências de espaço, conexão de torneira e escoamento para montar sem vazamentos."
  },
  "como-instalar-maquina-de-lavar-louca": {
    "title": "Como Instalar Máquina de Lavar Louça: Passo a Passo!",
    "description": "Tudo o que você precisa saber para instalar qualquer máquina de lavar louça: ferramentas, altura da mangueira, ligação hidráulica e elétrica."
  },

  // --- UNCATEGORIZED (INFORMACIONAL) ---
  "quanto-gasta-uma-lava-loucas-por-mes": {
    "title": "Quanto Gasta Uma Lava-Louças Por Mês? Veja Cálculos!",
    "description": "Descubra exatamente quanto uma lava-louças gasta na conta de luz e água por mês. Veja contas reais e surpreenda-se com a economia no final do mês!"
  }
};

// Validação dos 48 posts
const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'));
let errors = 0;

console.log('=== VALIDANDO METADADOS DE SEO DOS 48 POSTS ===\n');

posts.forEach(p => {
  const seo = seoData[p.slug];
  if (!seo) {
    console.error(`ERRO: Post ausente no seoData: ${p.slug}`);
    errors++;
    return;
  }

  const tLen = seo.title.length;
  const dLen = seo.description.length;

  if (tLen < 45 || tLen > 56) {
    console.warn(`AVISO título (${tLen}c): "${seo.title}" [${p.slug}]`);
    errors++;
  }
  if (dLen > 150) {
    console.error(`ERRO descrição (>150c: ${dLen}c): "${seo.description}" [${p.slug}]`);
    errors++;
  }
  if (dLen < 110) {
    console.warn(`AVISO descrição curta (${dLen}c): "${seo.description}" [${p.slug}]`);
  }
});

if (errors === 0) {
  console.log(`Sucesso! Todos os ${posts.length} posts validados perfeitamente.`);
  fs.writeFileSync('data/seo_metadata.json', JSON.stringify(seoData, null, 2), 'utf-8');
  console.log('Salvo com sucesso em data/seo_metadata.json!');
} else {
  console.log(`Encontrados ${errors} avisos/erros. Ajuste antes de salvar.`);
}
