# Sander Tattoo Ink — Landing Page

Landing page premium para estúdio de tatuagem, construída do zero com Next.js 15 (App
Router), TypeScript e TailwindCSS v4. Tema dark, tipografia serifada, micro animações
discretas e todo o conteúdo alimentado por arrays tipados.

## Stack

| Camada        | Tecnologia                                                    |
| ------------- | ------------------------------------------------------------- |
| Framework     | Next.js 15 · React 19 · TypeScript                            |
| Estilos       | TailwindCSS v4 (tokens em `@theme`)                           |
| Animação      | Framer Motion                                                 |
| Componentes   | Padrão shadcn/ui sobre Radix (Accordion, Tabs, Dialog, Label) |
| Ícones        | Lucide React (+ glifo próprio do WhatsApp)                    |
| Carrossel     | Embla Carousel + plugin de autoplay                           |
| Scroll        | React Intersection Observer                                   |
| Contadores    | React CountUp                                                 |
| Formulário    | React Hook Form + Zod                                         |

## Rodando o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm start          # serve o build
npm run typecheck  # tsc --noEmit
npm run lint
```

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_SITE_URL` — ele alimenta
canonical, sitemap, Open Graph e o JSON-LD.

## Estrutura

```
app/                     layout (fontes, metadata), page, globals.css, sitemap, robots, icon
components/
  common/                reveal, section-heading, logo, whatsapp-button
  icons/                 glifo do WhatsApp
  layout/                header, footer
  seo/                   JSON-LD (LocalBusiness + FAQPage)
  sections/              hero, about, stats, portfolio, features, timeline,
                         testimonials, faq, contact, cta
  ui/                    primitivos: button, accordion, tabs, dialog, input, label
data/                    navigation, about, portfolio, features, timeline,
                         testimonials, faq  ← todo o conteúdo vive aqui
hooks/                   use-scrolled, use-active-section, use-media-query,
                         use-lock-body-scroll
lib/                     site (config do estúdio), motion (variants), utils,
                         validations (Zod), whatsapp (deep link)
public/images/           arte de apoio (ver abaixo)
scripts/                 gerador das imagens de placeholder
```

### Onde editar o conteúdo

Nenhum texto fica preso dentro de componente. Para alterar o site:

- **Dados do estúdio** (telefone, WhatsApp, endereço, horários, Instagram): `lib/site.ts`.
  O JSON-LD, o rodapé, a seção de contato e todos os links de WhatsApp derivam desse arquivo.
- **Menu**: `data/navigation.ts` — o `id` precisa bater com o `id` da `<section>`
  correspondente (o scroll-spy do header usa esse mesmo array).
- **Portfólio**: `data/portfolio.ts` — categorias e obras. As obras são geradas a partir
  de `seeds`; troque por uma lista literal ao usar fotos reais.
- **Demais seções**: `data/about.ts`, `data/features.ts`, `data/timeline.ts`,
  `data/testimonials.ts`, `data/faq.ts`.

## Imagens

`public/images/` contém **placeholders procedurais** (não são fotografias): texturas de
tinta sobre pele geradas por `scripts/generate-images.mjs` com `sharp`, na paleta do
projeto. Servem para o layout nascer completo e devem ser substituídas pelas fotos reais
do estúdio, mantendo os mesmos nomes de arquivo — ou ajustando os caminhos nos arquivos
de `data/`.

Para regenerar:

```bash
node scripts/generate-images.mjs ./public/images
ONLY=hero node scripts/generate-images.mjs ./public/images   # apenas um arquivo
```

Ao trocar por fotos reais, mantenha as proporções (portfólio 4:5, hero retrato, CTA
panorâmico) e revise os textos `alt` em `data/`.

## Decisões de implementação

- **Formulário sem backend.** O briefing é montado e entregue no WhatsApp já formatado,
  que é como o estúdio realmente recebe orçamentos. A validação (Zod) roda antes disso.
  Para enviar a um CRM/e-mail, troque o corpo de `onSubmit` em
  `components/sections/contact.tsx` por uma Server Action.
- **Code splitting.** Tudo abaixo da dobra entra por `next/dynamic` mantendo SSR — o HTML
  continua completo para os crawlers e o bundle inicial fica menor.
- **Movimento contido.** Variants centralizadas em `lib/motion.ts` com uma única curva de
  easing; `prefers-reduced-motion` desliga parallax, autoplay do carrossel e transições.
- **Acessibilidade.** Navegação por teclado, skip link, `aria-current` no scroll-spy,
  foco visível, rótulos em todos os campos e alt descritivo em todas as imagens.

## Deploy

O projeto tem dois alvos de build, selecionados por variável de ambiente.

### Vercel (recomendado)

Importe o repositório, defina `NEXT_PUBLIC_SITE_URL` e faça o deploy — sem passos
extras. Mantém o runtime do Next: otimização de imagem sob demanda e headers HTTP
customizados.

### GitHub Pages (já configurado)

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente a cada push
na branch de desenvolvimento. Ele gera um export estático (`STATIC_EXPORT=true`) e o
envia para o Pages, que serve o site em
`https://<usuário>.github.io/<repositório>/`.

Como o Pages não roda Node, esse alvo desliga o otimizador de imagens
(`images.unoptimized`) e os headers customizados; as imagens já são WebP comprimido,
então são servidas como estão. Todo o resto é idêntico — a página é integralmente
pré-renderizada nos dois casos.

Detalhe importante para subpastas: o site fica em `/<repositório>/`, não na raiz do
domínio. O `basePath` cuida das rotas e dos assets do Next, mas arquivos de `public/`
precisam ser referenciados via `asset()` (`lib/assets.ts`) — é o que todos os
componentes e arquivos de `data/` já fazem. Ao adicionar uma imagem nova, use o
helper.

Para rodar o export localmente:

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/SANDER-TATOO npm run build
npx serve out   # ou qualquer servidor estático
```
