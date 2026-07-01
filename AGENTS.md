<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Multi-Role Platform (Advertisers + Stripe + Admin)

### Architecture
- **Roles**: `admin` | `advertiser` | `reader` — stored in Appwrite DB collection `ad_profiles`
- **Login flow**: Client creates session → gets userId → POST to `/api/auth/role` → redirects based on `role`
- **Registration**: `POST /api/auth/register` creates Appwrite account + `ad_profiles` document
- **Proxy**: Protects `/admin/dashboard/*` and `/advertiser/dashboard/*` via session cookie check
- **Important**: Appwrite Web SDK (`appwrite` npm) is client-side only — no `Users` service. Admin SDK uses `setDevKey`. Cannot call `account.updatePrefs(userId, prefs)` — use DB collection instead.

### Routes
| Route | Description |
|-------|-------------|
| `/login` | Unified login — detects role via `/api/auth/role` and redirects |
| `/register` | Registration with CPF/CNPJ, company name, phone |
| `/advertiser/dashboard` | Advertiser overview + ad formats with pricing |
| `/advertiser/dashboard/ads` | List of own ad campaigns |
| `/advertiser/dashboard/ads/new` | Create ad campaign (passes userId from client) |
| `/advertiser/dashboard/billing` | Payment history |
| `/admin/dashboard/anunciantes` | Manage advertisers |
| `/admin/dashboard/precos` | View ad pricing (static from AD_FORMATS) |
| `/admin/dashboard/cobrancas` | Payment history |
| `/api/auth/register` | POST — creates account + ad_profiles document (admin SDK) |
| `/api/auth/role` | POST `{ userId }` → returns `{ role }` |
| `/api/ad-campaigns` | POST — creates ad campaign (admin SDK, `userId` from body) |
| `/api/stripe/create-payment-intent` | POST — creates Stripe PaymentIntent for approved campaign |
| `/api/stripe/webhook` | POST — handles payment success/failure, updates campaign status |

### Ad Formats (src/types/advertiser.ts)
Priced in cents (BRL): Artigo Patrocinado (R$500), Banner Header (R$150), Sidebar (R$100), Entre Artigos (R$80), Footer (R$120), Nativo (R$250), Newsletter (R$200).

### Campaign Status Flow
`draft` → `pending_review` → `approved` | `rejected` → `payment_pending` → `paid` → `published` → `expired`

### Key Constraints
- `ad_campaigns` API route needs `userId` from client body — Appwrite client SDK can't run server-side
- `account.create()` in v26 uses params object `({ userId, email, password, name })` not positional args
- Stripe not installed in package.json initially — run `npm install stripe @stripe/stripe-js`
- Test users script at `scripts/create-test-users.mjs` (admin + advertiser)
- Appwrite collection IDs: `ad_campaigns`, `ad_profiles` — must be created via setup script

### What Permissions for Appwrite API Key
1. `databases.read` — read database, collections, documents
2. `databases.write` — create/update/delete collections, attributes, documents  
3. `users.read` — read users
4. `users.write` — create/update users (for setting up test users)
5. `storage.read` — read uploaded ad images
6. `storage.write` — upload ad images
