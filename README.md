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
public/images/           fotografias do estúdio (ver abaixo)
```

### Onde editar o conteúdo

Nenhum texto fica preso dentro de componente. Para alterar o site:

- **Dados do estúdio** (telefone, WhatsApp, endereço, horários, Instagram): `lib/site.ts`.
  O JSON-LD, o rodapé, a seção de contato e todos os links de WhatsApp derivam desse arquivo.
- **Menu**: `data/navigation.ts` — o `id` precisa bater com o `id` da `<section>`
  correspondente (o scroll-spy do header usa esse mesmo array).
- **Portfólio**: `data/portfolio.ts` — categorias e obras. Uma categoria sem obra
  publicada some do filtro sozinha, então basta adicionar entradas para novas abas
  aparecerem.
- **Demais seções**: `data/about.ts`, `data/features.ts`, `data/timeline.ts`,
  `data/testimonials.ts`, `data/faq.ts`.

## Imagens

`public/images/` traz fotografias reais do estúdio. Cada arquivo é um recorte
específico, não a foto inteira — o hero é vertical, o CTA é panorâmico, o portfólio é
4:5 — e todos são reencodados sem EXIF, o que remove as coordenadas de GPS que o iPhone
grava nas fotos.

| Arquivo | Onde aparece |
| --- | --- |
| `hero-tattoo.webp` | Hero |
| `studio.webp` | Coluna lateral da seção Sobre |
| `work-*.webp` | Portfólio (uma por obra) |
| `cta-bg.webp` | Fundo do CTA final |
| `faq-bg.webp` | Fundo do FAQ |
| `og-image.webp` | Prévia ao compartilhar (Open Graph), com o brasão sobreposto |
| `logo-mark.webp` | Brasão no cabeçalho e no rodapé |
| `logo.webp` | Brasão em tamanho maior: marca d'água do rodapé e dados estruturados |

O favicon e o ícone de iOS ficam em `app/icon.png` e `app/apple-icon.png` — o Next
os detecta pelo nome e injeta as tags sozinho. O brasão foi recortado do material
enviado pelo estúdio e teve o fundo preto removido por luminância, para assentar
tanto sobre o fundo do site quanto sobre fotografia.

### Publicando uma nova obra

1. Exporte a foto em **JPEG ou WebP** (o Next não lê HEIC), recortada em **4:5**, com
   cerca de **860px** de largura e qualidade ~75.
2. Salve em `public/images/`.
3. Acrescente uma entrada em `portfolioItems`, em `data/portfolio.ts`, com `category`,
   `title`, `meta` e um `alt` que descreva a tatuagem.

Nada além disso: o grid se reorganiza conforme a quantidade de peças e a aba da
categoria aparece assim que ela tiver a primeira obra.

Como o build estático não redimensiona imagens, exporte cada arquivo já no tamanho
final — uma foto de 4000px seria entregue inteira ao celular.

## Decisões de implementação

- **Nada de imagem fabricada.** O portfólio mostra apenas obras que existem, e os
  cards de depoimento usam monograma no lugar de retratos — inventar rostos de clientes
  seria enganoso. Os textos dos depoimentos, porém, ainda são fictícios e precisam ser
  substituídos por avaliações reais.
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
- **Celular tratado como caso principal, não como sobra.** Campos em 16px (abaixo
  disso o Safari do iOS dá zoom ao focar); alvos de toque de 44px; o overlay do
  portfólio aparece sem depender de `hover`, que não existe no toque; parallax
  desligado em ponteiro grosseiro (`pointer: coarse`), onde custa frames e quase não
  se percebe; `overflow-x: clip` na raiz para conter o deslocamento lateral das
  animações de entrada; e o botão flutuante do WhatsApp sai de cena sobre o
  formulário e o CTA final, onde cobriria os próprios campos que duplica.

## Deploy

O projeto tem dois alvos de build, selecionados por variável de ambiente.

### Vercel (recomendado)

Importe o repositório, defina `NEXT_PUBLIC_SITE_URL` e faça o deploy — sem passos
extras. Mantém o runtime do Next: otimização de imagem sob demanda e headers HTTP
customizados.

### GitHub Pages (no ar)

https://wellingthonala-byte.github.io/SANDER-TATOO/

O workflow `.github/workflows/deploy-pages.yml` roda a cada push na branch de
desenvolvimento: gera o export estático (`STATIC_EXPORT=true`) e faz push do
resultado para a branch `gh-pages`, de onde o Pages serve o site.

A publicação usa a branch em vez da action `deploy-pages` porque esta última exige
permissão para *criar* o site do Pages, que o `GITHUB_TOKEN` padrão não tem. Pelo
caminho da branch, basta `contents: write` — e o próprio surgimento da `gh-pages`
habilita o Pages automaticamente em repositórios públicos.

Não edite a branch `gh-pages` à mão: ela é sobrescrita (`push -f`) a cada deploy.

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
