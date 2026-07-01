"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/appwrite/client";
import { AD_FORMATS, type AdFormatType } from "@/types/advertiser";
import { formatPriceCents } from "@/lib/stripe/client";

export default function NewAdPage() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("format") as AdFormatType | null;
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const { account } = createClient();
    account.get().then((u) => setUserId(u.$id)).catch(() => router.push("/login"));
  }, [router]);

  const [selectedFormat, setSelectedFormat] = useState<AdFormatType | null>(preselected);
  const [form, setForm] = useState({
    title: "",
    description: "",
    targetUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const selectedFormatData = AD_FORMATS.find((f) => f.id === selectedFormat);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFormat) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/ad-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: selectedFormat,
          title: form.title,
          description: form.description,
          targetUrl: form.targetUrl,
          userId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro ao criar anúncio.");
      }

      router.push("/advertiser/dashboard/ads");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar anúncio.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/advertiser/dashboard/ads"
          className="text-sm text-paper-500 hover:text-paper-700"
        >
          ← Meus Anúncios
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-paper-900 dark:text-paper-50">
          Novo Anúncio
        </h1>
      </div>

      {!selectedFormat ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AD_FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setSelectedFormat(fmt.id)}
              className="rounded-xl border border-paper-200 bg-white p-5 text-left transition-all hover:border-accent-400 hover:shadow-md dark:border-paper-800 dark:bg-paper-900"
            >
              <h3 className="font-semibold text-paper-900 dark:text-paper-50">
                {fmt.name}
              </h3>
              <p className="mt-1 text-xs text-paper-400">{fmt.description}</p>
              <p className="mt-2 text-lg font-bold text-accent-600">
                {formatPriceCents(fmt.priceCents)}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
          <div className="rounded-xl border border-accent-200 bg-accent-50 p-4 dark:border-accent-800 dark:bg-accent-950">
            <p className="text-sm font-medium text-accent-800 dark:text-accent-200">
              Formato: {selectedFormatData?.name}
            </p>
            <p className="text-xs text-accent-600 dark:text-accent-400">
              {selectedFormatData?.description} —{" "}
              <strong>{formatPriceCents(selectedFormatData?.priceCents ?? 0)}</strong>
            </p>
            <button
              type="button"
              onClick={() => setSelectedFormat(null)}
              className="mt-2 text-xs text-accent-600 underline hover:text-accent-800"
            >
              Trocar formato
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-paper-700 dark:text-paper-300">
              Título do anúncio
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-paper-700 dark:text-paper-300">
              Descrição / Briefing
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-paper-700 dark:text-paper-300">
              URL de destino
            </label>
            <input
              type="url"
              value={form.targetUrl}
              onChange={(e) => update("targetUrl", e.target.value)}
              placeholder="https://"
              className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-paper-300 px-4 py-2.5 text-sm font-medium text-paper-600 hover:bg-paper-50 dark:border-paper-700 dark:text-paper-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar para revisão"}
            </button>
          </div>

          <p className="text-xs text-paper-400">
            Após enviar, seu anúncio passará por revisão da nossa equipe. Se aprovado,
            você receberá um link de pagamento para ativar a campanha.
          </p>
        </form>
      )}
    </div>
  );
}
