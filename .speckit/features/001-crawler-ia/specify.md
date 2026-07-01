# Feature 001: Crawler IA

## Description
Sistema de agentes IA que crawleiam notícias de múltiplas fontes, processam o conteúdo e geram artigos prontos para aprovação editorial.

## User Stories
- Como editor, quero que a IA busque notícias automaticamente de fontes configuradas para não precisar procurar manualmente.
- Como editor, quero que cada notícia venha com título, resumo, bullet points e score de viralização para aprovar rapidamente.
- Como editor, quero configurar quais fontes e categorias o crawler deve monitorar.

## Success Criteria
- Crawler roda em schedule a cada 1h
- 30+ fontes configuradas (RSS, Twitter, Reddit, Google News)
- Artigo processado em < 30s após crawl
- Score de viralização calculado com precisão > 80%