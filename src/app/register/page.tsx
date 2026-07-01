"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { DocumentType } from "@/types/advertiser";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [documentType, setDocumentType] = useState<DocumentType>("cpf");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    document: "",
    companyName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function isCpfValid(cpf: string): boolean {
    if (!/^\d{11}$/.test(cpf)) return false;
    const calc = (digits: string, factor: number) =>
      digits.split("").reduce((sum, d) => sum + parseInt(d) * factor--, 0) % 11;
    const d1 = calc(cpf.slice(0, 9), 10) < 2 ? 0 : 11 - calc(cpf.slice(0, 9), 10);
    const d2 = calc(cpf.slice(0, 10), 11) < 2 ? 0 : 11 - calc(cpf.slice(0, 10), 11);
    return d1 === parseInt(cpf[9]) && d2 === parseInt(cpf[10]);
  }

  function isCnpjValid(cnpj: string): boolean {
    if (!/^\d{14}$/.test(cnpj)) return false;
    const calc = (digits: string, weights: number[]) =>
      weights.reduce((sum, w, i) => sum + parseInt(digits[i]) * w, 0) % 11;
    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const d1 = calc(cnpj, w1) < 2 ? 0 : 11 - calc(cnpj, w1);
    const d2 = calc(cnpj.slice(0, 13), w2) < 2 ? 0 : 11 - calc(cnpj.slice(0, 13), w2);
    return d1 === parseInt(cnpj[12]) && d2 === parseInt(cnpj[13]);
  }

  function validateStep1(): boolean {
    if (form.password !== form.confirmPassword) {
      setError("Senhas não conferem.");
      return false;
    }
    if (form.password.length < 6) {
      setError("Senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    setError("");
    return true;
  }

  function validateStep2(): boolean {
    const cleanDoc = form.document.replace(/\D/g, "");
    if (documentType === "cpf" && !isCpfValid(cleanDoc)) {
      setError("CPF inválido. Digite 11 números.");
      return false;
    }
    if (documentType === "cnpj" && !isCnpjValid(cleanDoc)) {
      setError("CNPJ inválido. Digite 14 números.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          documentType,
          document: form.document.replace(/\D/g, ""),
          companyName: form.companyName || undefined,
          phone: form.phone || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro ao criar conta.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-sm items-center justify-center px-4">
        <div className="w-full text-center">
          <div className="mb-4 text-5xl">🎉</div>
          <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
            Conta criada com sucesso!
          </h1>
          <p className="mt-2 text-sm text-paper-500">
            Sua conta de anunciante foi criada. Faça login para começar.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700"
          >
            Ir para Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm items-center justify-center px-4">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
            The<span className="text-accent-600">Paper</span>
          </h1>
          <p className="mt-1 text-sm text-paper-500">
            {step === 1 ? "Criar conta de anunciante" : "Dados cadastrais"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
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
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                  Confirmar senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
                />
              </div>

              <button
                type="button"
                onClick={() => validateStep1() && setStep(2)}
                className="w-full rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700"
              >
                Próximo
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                  Tipo de documento
                </label>
                <div className="mt-1 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setDocumentType("cpf")}
                    className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      documentType === "cpf"
                        ? "border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300"
                        : "border-paper-300 text-paper-600 hover:bg-paper-50 dark:border-paper-700 dark:text-paper-400"
                    }`}
                  >
                    CPF
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocumentType("cnpj")}
                    className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                      documentType === "cnpj"
                        ? "border-accent-500 bg-accent-50 text-accent-700 dark:bg-accent-950 dark:text-accent-300"
                        : "border-paper-300 text-paper-600 hover:bg-paper-50 dark:border-paper-700 dark:text-paper-400"
                    }`}
                  >
                    CNPJ
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="document" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                  {documentType === "cpf" ? "CPF" : "CNPJ"}
                </label>
                <input
                  id="document"
                  type="text"
                  required
                  placeholder={documentType === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
                  value={form.document}
                  onChange={(e) => update("document", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
                />
              </div>

              {documentType === "cnpj" && (
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                    Razão social / Nome fantasia
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={form.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
                  />
                </div>
              )}

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-lg border border-paper-300 px-4 py-2.5 text-sm font-medium text-paper-600 transition-colors hover:bg-paper-50 dark:border-paper-700 dark:text-paper-400"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading || !validateStep2()}
                  className="flex-1 rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
                >
                  {loading ? "Criando..." : "Criar conta"}
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-paper-500">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-accent-600 hover:text-accent-700">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
