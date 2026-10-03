# Louça Limpa - Blog de Alta Performance (Astro + Cloudflare)

Projeto completo de migração do blog WordPress [loucalimpa.com](https://loucalimpa.com) para arquitetura estática moderna em **Astro**, hospedado gratuitamente com tráfego ilimitado e CDN global na **Cloudflare**.

---

## 🚀 Arquitetura e Recursos Ativos

1. **Deploy Contínuo (CI/CD Automático):**
   - Repositório GitHub: `edgar-avila02/loucalimpa` (branch `main`).
   - Qualquer alteração enviada para o GitHub dispara a compilação e deploy automático na Cloudflare em menos de 1 minuto.

2. **56 Redirecionamentos de Afiliados (Pretty Links):**
   - Arquivo `public/_redirects` com 112 regras HTTP 302 direto no edge do Cloudflare.
   - Fallback de redirecionamento instantâneo via meta-refresh e JavaScript em `src/pages/[slug].astro`.

3. **340+ Imagens Locais e Independentes:**
   - Todas as fotos de produtos, artigos e ícones salvas em `public/wp-content/uploads/` e `public/images/external/`.
   - Zero dependência do servidor antigo ou CDNs externas.

4. **SEO e Rastreamento Integrados:**
   - **Google Tag oficial (`GT-WV3PJ9JW`):** Conectada ao Google Analytics 4 e Google Search Console.
   - **Smartlook Web SDK:** Gravação de sessões e mapas de calor ativo no `<head>`.
   - **Sitemap Dinâmico:** `https://loucalimpa.com/sitemap.xml`.
   - **Meta tags completas:** OpenGraph, Schema.org e Canonical URLs.

---

## 📁 Estrutura de Arquivos

* `data/posts.json` - Dados de todos os 48 artigos do blog.
* `data/pages.json` - Dados das 7 páginas institucionais.
* `data/categories.json` - Categorias do blog.
* `data/redirects.json` - Mapa dos 56 links de afiliados.
* `src/layouts/Layout.astro` - Layout base com header, footer, SEO, Google Analytics e Smartlook.
* `src/pages/[slug].astro` - Renderizador dos artigos, páginas e rotas de afiliados.
* `src/styles/global.css` - Design responsivo, tipografia e estilos dos blocos de review AFPB.

---

## 🛠️ Comandos Rápidos

```bash
# Iniciar servidor local de teste
npm run dev

# Gerar compilação estática
npm run build

# Enviar atualizações para a Cloudflare
git add .
git commit -m "sua mensagem"
git push origin main
```
