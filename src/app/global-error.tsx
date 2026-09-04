"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#06090D] text-[#F1F5F7] flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111C26] border border-[#24313D] rounded-2xl p-8 text-center shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 font-headline text-[#F1F5F7]">Forensic Lab Diagnostics</h2>
          <p className="text-[#8B9AA5] text-sm mb-6 leading-relaxed">
            The forensic intelligence console encountered an unexpected operational exception.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#35D6D0] text-[#06090D] font-bold rounded-xl hover:bg-[#8AF2E9] transition-all shadow-lg border border-[#8AF2E9]/40"
          >
            Re-initialize Console
          </button>
        </div>
      </body>
    </html>
  );
}
