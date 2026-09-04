import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F7] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111C26] border border-[#24313D] rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#35D6D0]/10 flex items-center justify-center mx-auto mb-6 text-[#35D6D0] border border-[#35D6D0]/20">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="text-[#35D6D0] font-mono text-sm font-bold uppercase tracking-widest mb-2">404 Exception</div>
        <h2 className="text-2xl lg:text-3xl font-bold font-headline mb-4 text-[#F1F5F7]">Node Not Found</h2>
        <p className="text-[#8B9AA5] text-sm mb-8 leading-relaxed">
          The requested forensic resource or endpoint could not be located on our secure network.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#35D6D0] text-[#06090D] font-bold rounded-xl hover:bg-[#8AF2E9] transition-all shadow-lg border border-[#8AF2E9]/40"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to HQ
        </Link>
      </div>
    </div>
  );
}
