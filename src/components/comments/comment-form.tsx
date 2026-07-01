"use client";

import { useState } from "react";

export function CommentForm({
  articleId,
  onCommentPosted,
}: {
  articleId: string;
  onCommentPosted?: () => void;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setSending(true);
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, text: text.trim() }),
      });
      setText("");
      onCommentPosted?.();
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="comment" className="block text-sm font-medium text-paper-700 dark:text-paper-300">
        Deixe seu comentário
      </label>
      <textarea
        id="comment"
        required
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que você achou desta notícia?"
        className="block w-full rounded-lg border border-paper-300 bg-white px-4 py-2.5 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-paper-700 dark:bg-paper-950 dark:text-paper-50"
      />
      <button
        type="submit"
        disabled={sending || !text.trim()}
        className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
      >
        {sending ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
}