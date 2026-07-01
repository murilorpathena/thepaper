"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="rounded-xl border border-accent-200 bg-accent-50 p-8 text-center dark:border-accent-800 dark:bg-accent-950">
        <p className="text-lg font-semibold text-accent-800 dark:text-accent-200">
          Inscrição confirmada!
        </p>
        <p className="mt-1 text-sm text-accent-600 dark:text-accent-400">
          Você receberá o ThePaper Weekly no seu email.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-paper-200 bg-paper-50 p-8 dark:border-paper-800 dark:bg-paper-900">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
          Receba o ThePaper Weekly
        </h2>
        <p className="mt-2 text-paper-500 dark:text-paper-400">
          Curadoria semanal com as notícias mais importantes, selecionadas por IA e editoriais por humanos.
        </p>

        {status === "error" && (
          <p className="mt-3 text-sm text-red-500">
            Erro ao inscrever. Tente novamente.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="email-newsletter" className="sr-only">Seu email</label>
          <input
            id="email-newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="flex-1 rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm text-paper-900 placeholder-paper-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50 dark:placeholder-paper-500"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
          >
            {status === "sending" ? "Enviando..." : "Inscrever"}
          </button>
        </form>

        <p className="mt-3 text-xs text-paper-400">
          Sem spam. Descadastre-se a qualquer momento.
        </p>
      </div>
    </section>
  );
}