"use client";

import { useState } from "react";

interface PendingArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  viralScore: number;
  receivedAt: string;
}

const MOCK_PENDING: PendingArticle[] = [
  {
    id: "1",
    title: "Startup brasileira levanta R$ 200 milhões em rodada série B",
    summary: "Empresa de IA pretende expandir operações para toda América Latina.",
    category: "Tecnologia",
    source: "TechCrunch",
    viralScore: 88,
    receivedAt: "2026-07-01T10:30:00",
  },
  {
    id: "2",
    title: "Chuvas intensas no Sul: defesa civil emite alerta máximo",
    summary: "Previsão indica acumulado de 200mm nas próximas 48 horas em três estados.",
    category: "Brasil",
    source: "G1",
    viralScore: 94,
    receivedAt: "2026-07-01T09:15:00",
  },
];

export default function AprovacaoPage() {
  const [articles, setArticles] = useState(MOCK_PENDING);

  function handleAction(id: string, action: "approved" | "rejected") {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Aprovação de Artigos
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Revise os artigos gerados pela IA e aprove ou rejeite.
      </p>

      <div className="mt-6 space-y-4">
        {articles.length === 0 && (
          <p className="py-12 text-center text-sm text-paper-400">
            Nenhum artigo pendente de aprovação.
          </p>
        )}

        {articles.map((article) => (
          <div
            key={article.id}
            className="rounded-xl border border-paper-200 bg-white p-5 dark:border-paper-800 dark:bg-paper-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-medium text-accent-800 dark:bg-accent-900 dark:text-accent-200">
                    {article.category}
                  </span>
                  <span className="text-xs text-paper-400">{article.source}</span>
                </div>
                <h3 className="font-semibold text-paper-900 dark:text-paper-50">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-paper-500 dark:text-paper-400">
                  {article.summary}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-paper-400">
                  <span>Score Viral: {article.viralScore}/100</span>
                  <span>
                    Recebido:{" "}
                    {new Date(article.receivedAt).toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 border-t border-paper-100 pt-4 dark:border-paper-800">
              <button
                onClick={() => handleAction(article.id, "approved")}
                className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700"
              >
                Aprovar
              </button>
              <button
                onClick={() => handleAction(article.id, "rejected")}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              >
                Rejeitar
              </button>
              <button className="rounded-lg border border-paper-300 px-4 py-2 text-sm font-medium text-paper-600 transition-colors hover:bg-paper-50 dark:border-paper-700 dark:text-paper-400 dark:hover:bg-paper-800">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}