# Louça Limpa - Blog Estático de Alta Performance (Astro + Cloudflare Pages)

Este projeto é a migração completa do site WordPress [loucalimpa.com](https://loucalimpa.com) para uma arquitetura moderna e estática com **Astro**, pronta para ser hospedada gratuitamente e com tráfego ilimitado na **Cloudflare Pages**.

---

## 🚀 Principais Vantagens

1. **Performance Máxima (Nota 100 no PageSpeed):** Sem banco de dados SQL pesado ou PHP. As páginas são geradas como HTML estático puro e distribuídas na CDN global da Cloudflare.
2. **Custo Zero de Hospedagem:** O plano gratuito da Cloudflare Pages oferece largura de banda ilimitada e SSL gratuito.
3. **Segurança Total:** Imune a invasões, falhas de plugins do WordPress ou ataques comuns da web.
4. **49 Redirecionamentos de Afiliados Preservados:** Todos os links de afiliados da Amazon (ex: `/brastemp-blf61ab`, `/electrolux-ls14e`, etc.) estão configurados no arquivo `public/_redirects` para redirecionamento 302 instantâneo no edge.
5. **SEO Intacto:**
   - URLs originais com barra final (`trailingSlash: always`).
   - Todos os 48 artigos, 7 páginas institucionais e 2 categorias preservadas.
   - Geração automática de `sitemap.xml` e `robots.txt`.
   - Marcações estruturadas Schema.org (JSON-LD) e OpenGraph.

---

## 🛠️ Comandos Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Gerar build de produção estático (dist/)
npm run build

# Visualizar build de produção localmente
npm run preview
```

---

## ☁️ Como Fazer o Deploy na Cloudflare Pages

1. Crie um repositório no seu GitHub (ex: `louca-limpa`).
2. Faça o push dos arquivos do projeto:
   ```bash
   git init
   git add .
   git commit -m "feat: migração completa do loucalimpa para Astro"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/louca-limpa.git
   git push -u origin main
   ```
3. No painel da **Cloudflare**:
   - Vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Selecione o repositório `louca-limpa`.
   - Configurações de Build:
     - **Framework preset:** `Astro`
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Clique em **Save and Deploy**.
4. Configure seu domínio customizado (`loucalimpa.com`) nas configurações do projeto na Cloudflare Pages.
