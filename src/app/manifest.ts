import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ThePaper — Hub de Notícias",
    short_name: "ThePaper",
    description: "Onde IA descobre, você decide, o mundo lê.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}