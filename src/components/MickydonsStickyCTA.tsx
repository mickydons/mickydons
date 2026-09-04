"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MickydonsLogoMark } from "@/components/MickydonsLogoMark";

export function MickydonsStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Show the sticky CTA after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[60] p-4 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[#111C26]/95 backdrop-blur-xl border border-[#24313D] rounded-2xl p-3.5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-3 px-4 border-r border-[#24313D]">
            <MickydonsLogoMark size={32} />
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#35D6D0]">Priority Case Intake</div>
              <div className="text-[10px] font-semibold text-[#8B9AA5] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#35D6D0] shadow-[0_0_4px_rgba(53,214,208,0.6)]" />
                Case Team Available
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-end gap-2 w-full">
            <Button size="lg" asChild className="w-full sm:w-auto h-12 px-8 gap-2 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 rounded-xl transition-all hover:scale-105 border border-[#8AF2E9]/40">
              <Link href="#request" className="flex items-center gap-2">
                Start My Case Assessment <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}