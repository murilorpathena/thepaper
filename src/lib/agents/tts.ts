import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function textToSpeech(text: string): Promise<string | null> {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text.slice(0, 4000),
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    // TODO: Upload to Appwrite Storage and return URL
    return "audio-url-here";
  } catch {
    return null;
  }
}