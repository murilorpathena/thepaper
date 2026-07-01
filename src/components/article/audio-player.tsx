"use client";

import { useState, useRef } from "react";

export function AudioPlayer({ audioUrl, title }: { audioUrl: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-paper-200 bg-paper-50 p-3 dark:border-paper-800 dark:bg-paper-900">
      <button
        onClick={toggle}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white transition-colors hover:bg-accent-700"
        aria-label={playing ? "Pausar" : "Ouvir"}
      >
        {playing ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-paper-900 dark:text-paper-50">
          {playing ? "Tocando..." : "Ouvir artigo"}
        </p>
        <p className="text-xs text-paper-400">{title}</p>
      </div>
      <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
    </div>
  );
}