# ThePaper

## Product Brief

**What it is:** A semi-automated news hub where AI agents crawl, write, and score news articles, and a human editor approves what gets published.

**Users:** Mixed audience — young readers who consume fast content (bullet points, audio, short video) and adults seeking deeper analysis.

**Brand voice:** Editorial, trustworthy, sharp. Not clickbait, not boring. Authoritative but accessible.

**Key differentiators:**
1. AI curation + human editorial filter
2. Native multi-format: full text, bullet summary, audio (TTS)
3. Gamification: XP, badges, streaks, weekly ranking
4. Newsletter + community comments
5. Hyperlocal + global content mix

**Anti-references (what we DON'T want):**
- Purple gradients, glassmorphism, ghost cards
- "Boost your productivity" tone
- Over-rounded corners, AI-generated color palettes
- Generic stock photos of people shaking hands
- Popup overload

## Design Direction

- **Typography:** Clean, highly readable serif or neutral sans for body. Strong headline hierarchy.
- **Color:** Minimal palette. Off-white backgrounds, dark charcoal text, a single accent for CTAs and links.
- **Spacing:** Generous whitespace. Content-first layout.
- **Mode:** Full dark mode support, system-preference driven.
- **Layout:** Traditional reading layout — wide enough for comfort, never full-bleed.

## Pages

| Route | Purpose |
|---|---|
| `/` | Curated news feed (editor-approved) |
| `/artigo/[slug]` | Full article with audio + multi-format |
| `/categoria/[slug]` | Category filter |
| `/perfil/[id]` | User profile with gamification stats |
| `/ranking` | Weekly reader rankings |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Approval queue + analytics |
| `/admin/dashboard/aprovacao` | Approve/reject/edit articles |
| `/admin/dashboard/banners` | Manage sponsored banners |
| `/admin/dashboard/publi` | Manage sponsored content |
| `/admin/dashboard/receita` | Revenue reports |