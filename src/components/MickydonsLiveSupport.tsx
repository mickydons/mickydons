"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function MickydonsLiveSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[70] flex flex-col items-end sm:bottom-28">
      {/* Chat Window */}
      <div
        className={cn(
          "mb-4 w-72 sm:w-80 rounded-2xl bg-[#111C26] border border-[#24313D] shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-[#35D6D0] p-4 flex items-center justify-between text-[#06090D]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#06090D]/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#06090D]" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#06090D] border-2 border-[#35D6D0] rounded-full animate-pulse-green shadow-[0_0_6px_rgba(53,214,208,1)]" />
            </div>
            <div>
              <div className="font-bold text-sm font-body text-[#06090D]">Mickydons Case Desk</div>
              <div className="text-[10px] font-semibold text-[#06090D]/80 flex items-center gap-1 font-body">
                <Activity className="w-3 h-3 animate-pulse text-[#06090D]" />
                Case Team Available
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-[#06090D]/10 p-1 rounded-lg transition-colors text-[#06090D]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-[#0C131B] rounded-xl p-3 text-xs leading-relaxed text-[#8B9AA5] font-body border border-[#24313D]">
            Hi! Our case team is currently available. To protect your information, all details should be submitted through our secure assessment form. Our team typically completes initial file reviews in <span className="text-[#35D6D0] font-bold">under 24 hours</span>.
          </div>
          
          <div className="pt-2 flex items-center justify-center gap-1.5 text-[9px] text-[#8B9AA5] opacity-70 font-body">
            <ShieldCheck className="w-3 h-3 text-[#35D6D0]" />
            Confidential Case Intake &amp; Evidence Protection
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative z-10 font-bold border border-[#8AF2E9]/40",
            isOpen ? "rotate-90" : "rotate-0"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#35D6D0] border-2 border-[#06090D] rounded-full z-20 animate-pulse-green shadow-[0_0_6px_rgba(53,214,208,0.8)]" />
        )}
      </div>
    </div>
  );
}