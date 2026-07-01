import { createNvidiaClient, DEFAULT_MODEL } from "../nvidia-client";

const client = createNvidiaClient();

export async function generateSeoMetadata(
  title: string,
  summary: string,
  content: string
) {
  try {
    const response = await client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Generate SEO metadata in valid JSON. No markdown, no comments.",
        },
        {
          role: "user",
          content: `Title: ${title}\nSummary: ${summary}\nContent: ${content.slice(0, 2000)}\n\nReturn JSON: { slug, metaDescription, keywords, ogImagePrompt }`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0]?.message?.content ?? "{}";
    const cleaned = text.replace(/```json\s*|\s*```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80),
      metaDescription: summary.slice(0, 160),
      keywords: [],
    };
  }
}