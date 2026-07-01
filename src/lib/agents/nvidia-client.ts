import OpenAI from "openai";

const BASE_URL = "https://integrate.api.nvidia.com/v1";

export const DEFAULT_MODEL = "meta/llama-3.1-70b-instruct";

export function createNvidiaClient() {
  return new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: BASE_URL,
  });
}