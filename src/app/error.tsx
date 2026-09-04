"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Forensic Console Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111C26] border border-[#24313D] rounded-2xl p-8 text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 font-headline text-[#F1F5F7]">Diagnostic Notice</h2>
        <p className="text-[#8B9AA5] text-sm mb-6 leading-relaxed">
          The requested forensic module encountered an initialization delay.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#35D6D0] text-[#06090D] font-bold rounded-xl hover:bg-[#8AF2E9] transition-all shadow-lg border border-[#8AF2E9]/40"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}
