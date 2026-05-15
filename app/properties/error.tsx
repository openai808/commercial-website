"use client";

import { useEffect } from "react";

type PropertiesErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PropertiesError({ error, reset }: PropertiesErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-white px-6 py-20 text-center text-[#000759] md:px-10">
      <h1 className="text-xl font-semibold">Unable to load properties</h1>
      <p className="mt-3 text-sm text-[#4a5f9a]">
        Something went wrong while fetching listings. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-[#23408e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1d3575]"
      >
        Try again
      </button>
    </main>
  );
}
