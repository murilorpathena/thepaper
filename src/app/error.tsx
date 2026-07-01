"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-paper-900 dark:text-paper-50">
          Algo deu errado
        </h1>
        <p className="mt-2 text-paper-500">
          {error.message || "Erro inesperado. Tente novamente."}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}