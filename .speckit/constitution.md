# ThePaper — Constitution

## Core Principles

1. **Quality over quantity**: IA sugere 50-100 artigos/dia, no máximo 15 são publicados.
2. **AI-native, human-approved**: IA escreve, humano decide. Nada publicado sem aprovação editorial.
3. **Factualidade primeiro**: Toda notícia deve ser verificável contra fonte original.
4. **Transparência**: Conteúdo patrocinado sempre identificado. Tags e fontes sempre visíveis.
5. **Multi-formato**: Toda notícia deve ser entregável em texto, resumo e áudio.
6. **Performance**: Lighthouse 90+ em todas as páginas. Core Web Vitals verdes.
7. **Acessibilidade**: WCAG 2.1 AA. Contraste, navegação por teclado, screen readers.

## Tech Stack

- **Runtime**: Node.js 20+ via Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS v4, TypeScript strict
- **Backend**: Appwrite Cloud (Auth, Database, Storage, Functions)
- **Deploy**: Vercel
- **Design**: Impeccable vocabulary (DESIGN.md)
- **IA**: NVIDIA NIM (Llama 3.1 70B) via API compatível com OpenAI

## Code Standards

- TypeScript strict mode
- Server Components por padrão, Client Components só quando necessário
- Sem importações de lado do servidor em client components
- Variáveis de ambiente via `NEXT_PUBLIC_` para client, sem prefixo para server
- Testes: unitários com Vitest (futuro)