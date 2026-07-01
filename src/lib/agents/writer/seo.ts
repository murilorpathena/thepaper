import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSeoMetadata(
  title: string,
  summary: string,
  content: string
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate SEO metadata. Respond only with JSON: { slug, metaDescription, keywords, ogImagePrompt }",
        },
        {
          role: "user",
          content: `Title: ${title}\nSummary: ${summary}\nContent: ${content.slice(0, 2000)}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content ?? "{}";
    return JSON.parse(text);
  } catch {
    return {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80),
      metaDescription: summary.slice(0, 160),
      keywords: [],
    };
  }
}