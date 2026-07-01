"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/appwrite/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { account } = createClient();
      await account.createEmailPasswordSession(email, password);

      const user = await account.get();

      const res = await fetch("/api/auth/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.$id }),
      });
      const data = await res.json();
      const role = data.role as string;

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "advertiser") {
        router.push("/advertiser/dashboard");
      } else {
        router.push("/");
      }
    } catch {
      setError("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm items-center justify-center px-4">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
            The<span className="text-accent-600">Paper</span>
          </h1>
          <p className="mt-1 text-sm text-paper-500">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-paper-500">
          Ainda não tem conta?{" "}
          <Link href="/register" className="font-medium text-accent-600 hover:text-accent-700">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
