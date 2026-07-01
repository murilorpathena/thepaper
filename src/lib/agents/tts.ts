/**
 * TTS (Text-to-Speech).
 * NVIDIA NIM não oferece TTS via API padrão.
 * Opções futuras: NVIDIA Riva, ElevenLabs, ou Web Speech API (browser).
 */

export async function textToSpeech(text: string): Promise<string | null> {
  // TODO: Integrar com serviço de TTS (ElevenLabs, Google Cloud TTS, etc.)
  console.warn("TTS não configurado. textToSpeech retornando null.");
  return null;
}