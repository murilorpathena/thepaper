# ThePaper — DESIGN.md

## Visual Identity

- **Brand**: ThePaper — "The" + "Paper", jornalismo inteligente
- **Tone**: Editorial, confiável, direto. Não é clickbait, não é chato.
- **Voice**: Autoritário mas acessível. Tom de um editor experiente.

## Typography

- **Headings**: Inter (sans-serif), bold, tracking-tight
- **Body**: Inter, 400 weight, 1.7 leading
- **Scale**: text-xs (12) → text-4xl (36) in standard Tailwind steps

## Color Palette

| Token | Light | Dark |
|---|---|---|
| `paper-50` | #fafaf9 | background |
| `paper-900` | #1c1917 | #f5f5f4 |
| `paper-950` | #0c0a09 | #fafaf9 |
| `accent-600` | #16a34a (green) | CTAs, links |
| `accent-100` | #dcfce7 | Badge bg |

## Spacing

- **Page max-width**: 1280px (max-w-7xl)
- **Article max-width**: 768px (max-w-3xl)
- **Gutters**: px-4 sm:px-6 lg:px-8
- **Section gap**: gap-6 grid default

## Component Conventions

- **Cards**: rounded-xl, border, bg-white, p-4 to p-6
- **Badges**: rounded-full, px-2.5 py-0.5, text-xs
- **Buttons**: rounded-lg, solid bg on primary, border on secondary
- **Forms**: rounded-lg border, focus:ring-2 focus:ring-accent-500/20
- **Links**: hover:text-accent-600 transition

## Patterns

- Content-first: generous whitespace, minimal chrome
- Dark mode via class strategy on <html>
- Interactive states: transition-colors on hover
- Loading: spinner animation (border-4 + border-t-accent-600)
- Error: centered message with retry button

## Anti-patterns (detected by `npx impeccable detect`)

- ❌ gradient-text
- ❌ side-stripe-border
- ❌ ai-color-palette
- ❌ glassmorphism
- ❌ purple gradients
- ❌ ghost cards