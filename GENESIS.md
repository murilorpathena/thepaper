# GENESIS — ThePaper

> Plataforma semi-automática de curadoria de notícias com redatores IA, aprovação editorial humana e monetização multi-canal.

---

## Sumário

- [Visão & Missão](#visão--missão)
- [Stack Tecnológica](#stack-tecnológica)
- [Metodologia SDD](#metodologia-sdd)
- [Arquitetura](#arquitetura)
- [Design System (Impeccable)](#design-system-impeccable)
- [Diferenciais](#diferenciais)
- [Roadmap de Implementação (12 semanas)](#roadmap-de-implementação-12-semanas)
- [Sistema de Monetização](#sistema-de-monetização)
- [Os Funcionários IA](#os-funcionários-ia)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Métricas de Sucesso](#métricas-de-sucesso)

---

## Visão & Missão

**Visão**: Ser o hub de notícias inteligente que combina o melhor da curadoria algorítmica com o crivo editorial humano, entregando conteúdo relevante, viralizável e confiável.

**Missão**: Democratizar o acesso a notícias de qualidade através de um sistema semi-automático onde IA descobre e redige, mas humanos decidem o que vai ao ar.

**Público-alvo**: Público misto — desde jovens que consomem conteúdo rápido (bullet points, áudio, vídeo curto) até adultos que buscam análise aprofundada.

---

## Stack Tecnológica

| Camada | Tecnologia | Função |
|---|---|---|
| **Backend** | Appwrite (Cloud) | Auth, Database, Storage, Functions, Messaging |
| **Frontend** | Next.js 14+ (App Router) | SSR/SSG, SEO, performance |
| **Deploy** | Vercel | Hosting + Edge Functions + Analytics |
| **Design** | Impeccable Skill | Vocabulário de design, DESIGN.md, Live Mode |
| **Metodologia** | Spec-Driven Development | `specify-cli` para specs executáveis |
| **IA** | OpenAI API / Anthropic API | Crawl, sumarização, reescrita, TTS |
| **Monetização** | EVADAV + Google AdSense | Push, Popunder, Native, Display |
| **Newsletter** | Resend / SendGrid | Email marketing automatizado |

---

## Metodologia SDD

O projeto seguirá Spec-Driven Development (SDD) usando GitHub Spec-Kit. Cada feature passa por 5 estágios:

```
Constitution → Specify → Plan → Tasks → Implement
```

### Features do Projeto

| # | Feature | Status | Estágio |
|---|---|---|---|
| 001 | Crawler IA | Pendente | — |
| 002 | Dashboard de Aprovação | Pendente | — |
| 003 | Site Frontend | Pendente | — |
| 004 | Gamificação | Pendente | — |
| 005 | Monetização | Pendente | — |
| 006 | Newsletter + Comunidade | Pendente | — |

Cada feature terá sua própria pasta em `.speckit/features/NNN-nome/` com `specify.md`, `plan.md`, `tasks.md` e `checklist.md`.

---

## Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                     Vercel (Next.js)                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Páginas  │  │  API      │  │  Edge Functions   │  │
│  │  (SSR)    │  │  Routes   │  │  (rewrites/auth)  │  │
│  └────┬─────┘  └────┬─────┘  └────────┬──────────┘  │
│       └──────────────┼─────────────────┘              │
└──────────────────────┼────────────────────────────────┘
                       │ HTTPS
┌──────────────────────┼────────────────────────────────┐
│              Appwrite Cloud                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Auth     │ │Database  │ │ Storage  │ │Functions │ │
│  │  (JWT)    │ │(articles,│ │(images,  │ │(crawler, │ │
│  │           │ │ users,   │ │  audio)  │ │  TTS,    │ │
│  │           │ │ comments)│ │          │ │  cron)   │ │
│  └──────────┘ └──────────┘ └──────────┘ └────┬─────┘ │
└──────────────────────────────────────────────┼───────┘
                                               │
┌──────────────────────────────────────────────┼───────┐
│                                    APIs Externas       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ OpenAI   │ │ Twitter  │ │  Reddit  │ │  RSS     │ │
│  │ Anthropic│ │ API      │ │  API     │ │  Feeds   │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└────────────────────────────────────────────────────────┘
```

### Fluxo de Conteúdo

```
1. CRAWL ──▶ 2. PROCESSAMENTO IA ──▶ 3. DASHBOARD ──▶ 4. APROVAÇÃO ──▶ 5. PUBLICAÇÃO
                 │                        │
                 ├─ Sumarização            ├─ Nota de viralização
                 ├─ Reescrita              ├─ Score de engajamento previsto
                 ├─ Título alternativo     ├─ Sugestão de categoria/tags
                 ├─ Tags/SEO               └─ Preview multi-formato
                 └─ TTS (áudio)
```

---

## Design System (Impeccable)

O design do ThePaper seguirá o vocabulário Impeccable. Na Fase 1 rodaremos:

```bash
npx impeccable install
/impeccable init          # Cria PRODUCT.md + DESIGN.md
```

### Comandos Impeccable a serem usados por fase

| Fase | Comando | Aplicação |
|---|---|---|
| Fundação | `/impeccable init` | Criar PRODUCT.md e DESIGN.md |
| Site | `/impeccable shape` | Planejar layout e UX |
| Site | `/impeccable craft` | Design + build do frontend |
| Site | `/impeccable typeset` | Tipografia do portal |
| Site | `/impeccable colorize` | Paleta de cores editorial |
| Site | `/impeccable layout` | Grid, spacing, hierarquia |
| Iteração | `/impeccable critique` | Review de design |
| Iteração | `/impeccable polish` | Refinamento final |
| Iteração | `/impeccable harden` | Edge cases, i18n, erros |
| Live | `/impeccable live` | Iterar no browser |
| Sistema | `/impeccable document` | Gerar DESIGN.md final |

### Diretrizes de Design

- **Tom editorial**: Sério mas acessível, clean, tipografia de qualidade
- **Modo Leitura**: Foco no conteúdo, sem distrações
- **Suporte multi-formato**: Texto, áudio, bullet points, vídeo curto
- **Dark mode**: Nativo, bem implementado
- **Anti-padrões a evitar**: Glassmorphism, gradient text, sombras exageradas, cores AI-palette (detectado pelo `impeccable detect`)

---

## Diferenciais

O ThePaper combina 5 diferenciais para criar um ecossistema único que atrai público misto e gera recorrência:

### 1. Curadoria IA + Humano
- IA crawleia ~50-100 notícias/dia de múltiplas fontes
- IA redige cada notícia com: título principal + 3 alternativas, resumo bullet points, versão completa, nota de viralização prevista
- Você (editor-chefe) aprova, edita ou rejeita cada uma
- Publicação automática após aprovação
- **Valor**: Qualidade editorial sem o trabalho braçal de escrever tudo

### 2. Multi-formato Nativo
Cada notícia é automaticamente convertida em:
- **Texto completo** — leitura tradicional
- **Resumo bullet points** — consumo rápido (mobile)
- **Áudio (TTS)** — ouvir enquanto dirige/exercita
- **Vídeo curto** (futuro) — formato Reels/Shorts com imagens + narração IA
- **Valor**: Atinge diferentes perfis de consumo no mesmo artigo

### 3. Gamificação
- **XP**: Pontos por tempo de leitura, comentários, compartilhamentos, visitas diárias
- **Badges**: Leitor Bronze → Prata → Ouro → Platina, Curioso, Viralizador, etc.
- **Ranking semanal**: Top leitores da semana (anônimo ou com nickname)
- **Streaks**: Dias consecutivos de leitura (ex: "7 dias seguidos = badge Fogo")
- **Valor**: Engajamento recorrente e fidelização

### 4. Newsletter + Comunidade
- **Newsletter semanal**: "ThePaper Weekly" — curadoria IA com seleção sua, seções fixas + editor's note
- **Seção de comentários**: Com moderação IA (filtro automático de spam/toxidade), upvote/downvote
- **Espaço do leitor**: Leitores podem sugerir pautas (votação popular)
- **Valor**: Relacionamento direto com audiência, tráfego recorrente via email

### 5. Hyperlocal + Global
- Detecção de localização via IP (cidade/estado)
- Seção "Aqui Perto" com notícias relevantes à região do leitor
- Categorias de interesse selecionáveis: Política, Tech, Esportes, Entretenimento, Saúde, Economia, Ciência
- Feed personalizado combinando: Hyperlocal + Interesses + Trending Global
- **Valor**: Cada leitor tem uma experiência única e relevante

---

## Roadmap de Implementação (12 semanas)

### Fase 1 — Fundação (Semanas 1-2)

**Objetivo**: Setup do projeto, infraestrutura, CI/CD, design tokens

| Tarefa | Detalhes | SDD |
|---|---|---|
| Inicializar SDD | `specify init` + Constitution | ✅ |
| Setup Appwrite | Criar projeto, configurar Auth, Database, Storage, Functions | — |
| Setup Next.js | `npx create-next-app`, App Router, TypeScript, Tailwind | — |
| Setup Vercel | Repo conectado, CI/CD, domínio, variáveis de ambiente | — |
| Impeccable init | `npx impeccable install`, `/impeccable init`, criar `PRODUCT.md` + `DESIGN.md` | ✅ |
| Design tokens | Paleta, tipografia, spacing — via `/impeccable colorize` + `/impeccable typeset` | ✅ |
| Schemas Appwrite | Collections: `articles`, `users`, `comments`, `gamification`, `ads`, `newsletter` | — |
| Autenticação | Appwrite Auth (email + Google OAuth) | ✅ |

**Feature SDD**: Iniciar `001-crawler-ia` (Specify → Plan)

### Fase 2 — Core do Crawler IA (Semanas 3-4)

**Objetivo**: Agentes IA funcionais, pipeline de conteúdo, dashboard

| Tarefa | Detalhes | SDD |
|---|---|---|
| Crawler — RSS Feeds | Coletar de fontes configuráveis (G1, UOL, BBC, TechCrunch, etc.) | ✅ |
| Crawler — Twitter/X | Buscar trending topics + contas selecionadas | ✅ |
| Crawler — Reddit | Rastrear subreddits populares + trending | ✅ |
| Crawler — Google News | RSS + scraping de trending | ✅ |
| Agente de Sumarização | OpenAI/Anthropic: resumir notícia em 3 parágrafos + bullet points | ✅ |
| Agente de Reescrita | Reescrever com voz própria, mantendo factualidade | ✅ |
| Agente de SEO | Gerar slug, meta description, tags, OG image | ✅ |
| Agente de Viralização | Score de viralização (0-100), sugestão de headline clickbait (opcional) | ✅ |
| Appwrite Functions | Schedule functions para rodar crawlers a cada 1h | — |
| Dashboard de Aprovação | Lista de artigos pendentes, aprovados, rejeitados | ✅ |
| Editor de artigo | Preview multi-formato, edição inline, aprovação 1-clique | ✅ |

**Feature SDD**: `001-crawler-ia` (Tasks → Implement) + `002-dashboard-aprovacao` (Specify → Plan)

### Fase 3 — Site e Experiência do Usuário (Semanas 5-7)

**Objetivo**: Portal completo com todos os diferenciais

| Tarefa | Detalhes | SDD |
|---|---|---|
| Home Page | Feed curado (aprovado por você), dividido em seções | ✅ |
| Página de Categoria | Filtro por categoria + hyperlocal | ✅ |
| Página do Artigo | Leitura, áudio player, botões de compartilhamento, gamificação | ✅ |
| Multi-formato | Toggle texto/resumo, player de áudio TTS | ✅ |
| Modo Leitura | Clean, tipografia impecável, sem distrações | ✅ |
| Gamificação | XP, badges, streaks, ranking — backend + frontend | ✅ |
| Comentários | Sistema de comments com moderação IA | ✅ |
| Newsletter | Página de inscrição, template de email, Resend integration | ✅ |
| Seção Hyperlocal | Detecção por IP + feed local | ✅ |
| Perfil do Leitor | Histórico, badges, XP, configurações | ✅ |
| Dark Mode | Suporte nativo via Tailwind + system preference | ✅ |
| SEO | Sitemap dinâmico, Open Graph, meta tags por artigo | ✅ |
| PWA | Service worker, install prompt, cache offline | ✅ |

**Feature SDD**: `003-site-frontend` + `004-gamificacao` (completas)

### Fase 4 — Monetização (Semanas 8-9)

**Objetivo**: Implementar todas as fontes de receita

| Tarefa | Detalhes | SDD |
|---|---|---|
| EVADAV — Push Notification | SDK EVADAV + opt-in flow + segmentação | ✅ |
| EVADAV — Popunder | Trigger em links de saída | ✅ |
| EVADAV — Native Widget | Widget de recomendação entre artigos | ✅ |
| Google AdSense | Banners In-page + Display responsivo | ✅ |
| Banners Patrocinados | Admin panel para criar banners + cobrar por período | ✅ |
| Notícias Publi | Empresa envia briefing → IA redige → você aprova → publicado como "Patrocinado" | ✅ |
| Relatórios de Receita | Dashboard com earnings por fonte, gráficos, export CSV | ✅ |
| Ad Placement Engine | Posicionamento inteligente de ads sem prejudicar UX | ✅ |

**Feature SDD**: `005-monetizacao`

### Fase 5 — Lançamento e Iteração (Semanas 10-12)

**Objetivo**: Polimento, testes, beta, lançamento

| Tarefa | Detalhes | SDD |
|---|---|---|
| Testes de Carga | K6 ou similar para simular tráfego | — |
| Segurança | Rate limiting, SQL injection, XSS, CORS | ✅ |
| Performance | Lighthouse 90+, Core Web Vitals | ✅ |
| Impeccable Audit | `/impeccable critique` + `/impeccable audit` + `/impeccable polish` | ✅ |
| Beta Fechado | 50-100 usuários convidados, feedback | — |
| Landing Page | Página de apresentação + captura de email | ✅ |
| SEO Final | Google Search Console, indexação, analytics | — |
| Lançamento | Vercel deploy, domínio final, redes sociais | — |
| Pós-lançamento | Correção de bugs, primeiras otimizações | — |

**Feature SDD**: `006-newsletter` + revisão geral

---

## Sistema de Monetização

### 1. EVADAV

| Formato | Local | CPC/CPM Esperado |
|---|---|---|
| Push Notification | Opt-in ao entrar no site | ~$2-5 CPM |
| Popunder | Ao clicar em links externos | ~$1-3 CPM |
| Native Widget | Entre artigos, sidebar | ~$3-8 CPM |

### 2. Google AdSense

| Formato | Local | Observação |
|---|---|---|
| Display Banner | Header, sidebar, footer | Responsivo |
| In-page | Entre parágrafos do artigo | Máximo 2 por página |

### 3. Banners Patrocinados (Venda Direta)

- **Preço sugerido**: ~R$ 500-2000/semana dependendo do tráfego
- **Entrega**: Banner na home + sidebar + página de categoria relevante
- **Relatório**: Impressões, cliques, CTR enviado ao cliente

### 4. Notícias Publi (Sponsored Content)

- **Processo**: Cliente envia briefing → IA redige → você revisa → publicado com tag "Patrocinado"
- **Preço sugerido**: ~R$ 1000-5000 por publi (depende do tráfego)
- **Entrega**: Artigo permanente no site, destaque na home por 7 dias, newsletter menciona
- **Transparência**: Sempre marcado como conteúdo patrocinado

### 5. Premium (Roadmap Futuro)

- **Pago**: R$ 9,90/mês — leitura sem ads + conteúdo exclusivo + selo "Apoiador" no perfil
- **Foco inicial**: Construir audiência primeiro, depois lançar premium

### Projeção de Receita (Mês 6+)

| Fonte | Estimativa Mensal |
|---|---|
| EVADAV | ~$100-500 (depende de tráfego) |
| AdSense | ~$50-300 |
| Banners Patrocinados | ~R$ 2000-8000 |
| Notícias Publi | ~R$ 2000-10000 |
| **Total** | **~R$ 4000-20000+** |

---

## Os Funcionários IA

O ThePaper terá "funcionários" IA com nomes e personalidades:

### 1. **Victor — Crawler Chefe**
- **Função**: Rastrear 50+ fontes 24/7
- **Personalidade**: Curioso incansável, sempre encontra algo novo
- **Tecnologia**: Appwrite Functions + RSS/APIs

### 2. **Lara — Redatora Sênior**
- **Função**: Re-escrever notícias com voz própria, gerar títulos
- **Personalidade**: Jornalista experiente, direta ao ponto
- **Tecnologia**: OpenAI GPT-4 / Claude API

### 3. **Max — Analista de Viralização**
- **Função**: Calcular score de viralização, sugerir ângulos
- **Personalidade":** Data-driven, analítico, frio
- **Tecnologia**: LLM + heurísticas de engajamento

### 4. **Elena — Produtora de Áudio**
- **Função**: Converter texto em áudio natural (TTS)
- **Personalidade**: Locutora profissional, tom neutro
- **Tecnologia**: ElevenLabs / OpenAI TTS

### 5. **Zeca — Moderador**
- **Função**: Moderar comentários, filtrar spam/toxidade
- **Personalidade**: Paciente, justo, imparcial
- **Tecnologia**: LLM + regex + análise de sentimento

### 6. **Nina — Curadora da Newsletter**
- **Função**: Selecionar melhores artigos da semana, escrever resumo
- **Personalidade**: Editorial, criativa, cativante
- **Tecnologia**: LLM + template engine

---

## Estrutura de Diretórios

```
thepaper/
│
├── .speckit/                          # SDD artifacts
│   ├── constitution.md                 # Princípios do projeto
│   ├── features/
│   │   ├── 001-crawler-ia/
│   │   │   ├── specify.md
│   │   │   ├── plan.md
│   │   │   ├── tasks.md
│   │   │   └── checklist.md
│   │   ├── 002-dashboard-aprovacao/
│   │   ├── 003-site-frontend/
│   │   ├── 004-gamificacao/
│   │   ├── 005-monetizacao/
│   │   └── 006-newsletter/
│   └── .claude/
│       └── commands/
│
├── .impeccable/                       # Impeccable config
│   └── config.json
│
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (site)/                    # Páginas públicas
│   │   │   ├── page.tsx              # Home
│   │   │   ├── artigo/
│   │   │   │   └── [slug]/page.tsx   # Página do artigo
│   │   │   ├── categoria/
│   │   │   │   └── [slug]/page.tsx   # Por categoria
│   │   │   ├── perfil/
│   │   │   │   └── [id]/page.tsx     # Perfil do leitor
│   │   │   └── ranking/page.tsx      # Ranking gamificação
│   │   ├── (admin)/                  # Dashboard privado
│   │   │   ├── login/page.tsx        # Login admin
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          # Dashboard geral
│   │   │   │   ├── aprovacao/        # Aprovação de artigos
│   │   │   │   ├── artigos/          # Gerenciar artigos
│   │   │   │   ├── banners/          # Banners patrocinados
│   │   │   │   ├── publi/            # Notícias publi
│   │   │   │   └── receita/          # Relatórios de receita
│   │   └── api/                      # Route Handlers
│   │       ├── articles/
│   │       ├── auth/
│   │       ├── comments/
│   │       ├── gamification/
│   │       ├── newsletter/
│   │       └── webhooks/
│   │
│   ├── components/
│   │   ├── layout/                   # Header, Footer, Sidebar
│   │   ├── article/                  # Card, FullArticle, AudioPlayer
│   │   ├── gamification/             # XPBar, Badge, StreakBadge
│   │   ├── comments/                 # CommentList, CommentForm
│   │   ├── newsletter/               # SignupForm
│   │   ├── ads/                      # EvadavPush, EvadavPopunder, AdSense, Banner
│   │   └── ui/                       # Base UI components (Impeccable)
│   │
│   ├── lib/
│   │   ├── appwrite/
│   │   │   ├── client.ts            # SDK client-side
│   │   │   ├── admin.ts             # SDK admin (server-only)
│   │   │   └── schemas.ts           # Database types
│   │   ├── agents/
│   │   │   ├── crawler/
│   │   │   │   ├── rss.ts
│   │   │   │   ├── twitter.ts
│   │   │   │   ├── reddit.ts
│   │   │   │   └── google-news.ts
│   │   │   ├── writer/
│   │   │   │   ├── summarizer.ts
│   │   │   │   ├── rewriter.ts
│   │   │   │   └── seo.ts
│   │   │   ├── viral-score.ts
│   │   │   ├── tts.ts
│   │   │   └── moderator.ts
│   │   ├── ads/
│   │   │   ├── evadav.ts
│   │   │   ├── adsense.ts
│   │   │   └── placement-engine.ts
│   │   ├── gamification/
│   │   │   ├── xp-rules.ts
│   │   │   ├── badges.ts
│   │   │   └── streaks.ts
│   │   └── utils/
│   │       ├── seo.ts
│   │       └── geo.ts               # Geolocalização
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css               # Design tokens
│   │
│   └── types/
│       ├── article.ts
│       ├── user.ts
│       ├── gamification.ts
│       └── ads.ts
│
├── DESIGN.md                         # Gerado pelo Impeccable
├── PRODUCT.md                        # Brief do produto (Impeccable)
├── GENESIS.md                        # Este documento
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Métricas de Sucesso

### MVP (Mês 1-2)

| Métrica | Meta |
|---|---|
| Artigos publicados/dia | 5-10 |
| Fontes crawleadas | 30+ |
| Tempo de aprovação por artigo | < 5 min |

### Lançamento (Mês 3)

| Métrica | Meta |
|---|---|
| Visitantes únicos/mês | 5.000+ |
| Pageviews/mês | 20.000+ |
| Artigos publicados/dia | 10-15 |
| Taxa de aprovação | ~30% (do crawleado) |

### Crescimento (Mês 6+)

| Métrica | Meta |
|---|---|
| Visitantes únicos/mês | 50.000+ |
| Pageviews/mês | 200.000+ |
| Receita mensal | R$ 4.000+ |
| Newsletter subscribers | 2.000+ |
| Daily active users | 5.000+ |
| Streak rate (7+ dias) | 20%+ |

---

## Primeiros Passos (Agora)

```bash
# 1. Inicializar o projeto Next.js
npx create-next-app@latest thepaper --typescript --tailwind --app --src-dir

# 2. Entrar no diretório
cd thepaper

# 3. Instalar Impeccable
npx impeccable install

# 4. Criar brief do produto e design system
/impeccable init

# 5. Inicializar SDD
specify init . --ai claude

# 6. Estabelecer princípios
/speckit.constitution
```

---

> **ThePaper** — Onde IA descobre, você decide, o mundo lê.