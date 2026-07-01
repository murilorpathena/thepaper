import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-paper-300 dark:text-paper-700">
          404
        </h1>
        <p className="mt-4 text-lg text-paper-500">
          Página não encontrada.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-700"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}