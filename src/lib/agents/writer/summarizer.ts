import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ProcessedArticle {
  title: string;
  summary: string;
  content: string;
  bulletPoints: string[];
  headlineAlternatives: string[];
  viralScore: number;
  tags: string[];
  seoMetaDescription: string;
  seoKeywords: string[];
  readTimeMinutes: number;
}

export async function processWithAI(
  rawTitle: string,
  rawDescription: string,
  source: string
): Promise<ProcessedArticle> {
  const prompt = `Você é o redator-chefe do ThePaper, um hub de notícias. 
Transforme a notícia abaixo em um artigo completo no estilo editorial do ThePaper.

Título original: ${rawTitle}
Descrição original: ${rawDescription}
Fonte: ${source}

Gere um JSON com:
{
  "title": "Título principal (máx 100 chars)",
  "summary": "Resumo em 2-3 frases",
  "content": "Artigo completo com 3-5 parágrafos",
  "bulletPoints": ["4-6 bullet points principais"],
  "headlineAlternatives": ["3 títulos alternativos para teste A/B"],
  "viralScore": número de 0-100,
  "tags": ["3-6 tags relevantes"],
  "seoMetaDescription": "Meta description para SEO (máx 160 chars)",
  "seoKeywords": ["3-5 palavras-chave SEO"],
  "readTimeMinutes": número estimado de minutos de leitura
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um jornalista IA especializado em reescrever notícias. Seu tom é editorial, preciso e acessível. Responda apenas com JSON válido.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content ?? "{}";
    return JSON.parse(text) as ProcessedArticle;
  } catch (error) {
    console.error("Erro no processamento IA:", error);
    return {
      title: rawTitle,
      summary: rawDescription,
      content: rawDescription,
      bulletPoints: [],
      headlineAlternatives: [],
      viralScore: 50,
      tags: [],
      seoMetaDescription: rawDescription.slice(0, 160),
      seoKeywords: [],
      readTimeMinutes: 3,
    };
  }
}