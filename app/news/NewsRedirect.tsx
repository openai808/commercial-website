"use client";

import { useEffect } from "react";

export default function NewsRedirect({ url }: { url: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(url);
    }, 150);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-white px-6 text-center text-[#000759]">
      <svg
        className="h-8 w-8 animate-spin text-[#23408e] motion-reduce:animate-none"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <p className="text-sm text-[#4a5f9a]" role="status" aria-live="polite">
        Redirecting you to RE/MAX News…
      </p>
      <a
        href={url}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-[#23408e] underline underline-offset-2 hover:text-[#1d3575]"
      >
        Click here if you are not redirected automatically
      </a>
    </main>
  );
}
