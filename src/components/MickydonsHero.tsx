"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  AlertTriangle,
  Globe,
  Wallet,
  ArrowDownRight,
  Building2,
  FileCheck,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const investigationTrail = [
  {
    step: 1,
    id: "scammer",
    title: "SCAMMER",
    category: "SUSPICIOUS / FLAGGED",
    description: "Fraudulent promoter, impersonator, or syndicate",
    color: "#EF4444",
    badgeBg: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30",
    glowDot: "bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    icon: AlertTriangle,
  },
  {
    step: 2,
    id: "website",
    title: "Fake Website",
    category: "SUSPICIOUS / FLAGGED",
    description: "Manipulated trading app or phishing link",
    color: "#EF4444",
    badgeBg: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30",
    glowDot: "bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    icon: Globe,
  },
  {
    step: 3,
    id: "wallet",
    title: "Wallet / Account",
    category: "CASE ORIGIN",
    description: "Victim transfer point & initial unauthorized outflow",
    color: "#C6A96B",
    badgeBg: "bg-[#C6A96B]/15 text-[#C6A96B] border-[#C6A96B]/35",
    glowDot: "bg-[#C6A96B] shadow-[0_0_8px_rgba(198,169,107,0.8)]",
    icon: Wallet,
  },
  {
    step: 4,
    id: "transaction",
    title: "Transaction",
    category: "DIGITAL TRAIL",
    description: "Multi-hop on-chain transfer tracing",
    color: "#35D6D0",
    badgeBg: "bg-[#35D6D0]/10 text-[#35D6D0] border-[#35D6D0]/30",
    glowDot: "bg-[#35D6D0] shadow-[0_0_8px_rgba(53,214,208,0.8)]",
    icon: ArrowDownRight,
  },
  {
    step: 5,
    id: "exchange",
    title: "Exchange",
    category: "DIGITAL TRAIL",
    description: "Centralized exchange deposit address identified",
    color: "#35D6D0",
    badgeBg: "bg-[#35D6D0]/10 text-[#35D6D0] border-[#35D6D0]/30",
    glowDot: "bg-[#35D6D0] shadow-[0_0_8px_rgba(53,214,208,0.8)]",
    icon: Building2,
  },
  {
    step: 6,
    id: "evidence",
    title: "Evidence",
    category: "VERIFIED EVIDENCE",
    description: "Standardized forensic dossier formatted for authorities",
    color: "#4DB89A",
    badgeBg: "bg-[#4DB89A]/15 text-[#4DB89A] border-[#4DB89A]/35",
    glowDot: "bg-[#4DB89A] shadow-[0_0_8px_rgba(77,184,154,0.8)]",
    icon: FileCheck,
  },
  {
    step: 7,
    id: "recovery",
    title: "Recovery Path",
    category: "VERIFIED RESOLUTION",
    description: "Targeted freeze filing & exchange compliance review",
    color: "#4DB89A",
    badgeBg: "bg-[#4DB89A]/15 text-[#4DB89A] border-[#4DB89A]/35",
    glowDot: "bg-[#4DB89A] shadow-[0_0_8px_rgba(77,184,154,0.8)]",
    icon: ShieldCheck,
  },
];

export function MickydonsHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 lg:pt-32 lg:pb-40 hero-glow">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT - Problem First, Empathetic & Authoritative */}
        <div className="z-10 transition-all duration-700 animate-in fade-in slide-in-from-left-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D6D0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D6D0] shadow-[0_0_8px_rgba(53,214,208,0.8)]"></span>
            </span>
            SCAM INVESTIGATION • ASSET TRACING • RECOVERY SUPPORT
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[70px] font-headline font-normal leading-[1.08] tracking-tight mb-6 text-[#F1F5F7]">
            Scammed online? <br />
            <span className="text-[#35D6D0]">Let&apos;s trace what happened.</span>
          </h1>

          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed mb-8 max-w-xl">
            Lost money to a crypto scam, fake investment platform, romance scam, impersonator, or online fraudster? Mickydons helps you understand what happened, preserve the evidence, trace the available digital trail, and identify the next steps toward recovery.
          </p>

          {/* CTA Group - 13-14px Manrope 700 buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <Button size="lg" asChild className="h-14 px-8 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 hover:shadow-[#35D6D0]/40 transition-all hover:scale-105 border border-[#8AF2E9]/40 rounded-xl">
              <Link href="#request" className="flex items-center gap-2">
                Start a Free Case Assessment <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-8 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase border-[#24313D] bg-[#0C131B]/80 text-[#F1F5F7] hover:bg-[#111C26] hover:border-[#35D6D0]/50 rounded-xl transition-all">
              <Link href="#process" className="flex items-center gap-2">
                <Play className="mr-1 w-4 h-4 fill-current text-[#35D6D0]" /> How Recovery Works
              </Link>
            </Button>
          </div>

          {/* Small reassurance underneath */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-[13px] font-body text-[#8B9AA5] pt-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#35D6D0]" />
            <span className="font-medium text-[#F1F5F7]">Confidential</span>
            <span className="text-[#24313D]">•</span>
            <span className="font-medium text-[#F1F5F7]">Evidence-led</span>
            <span className="text-[#24313D]">•</span>
            <span className="font-semibold text-[#C6A96B]">No recovery guarantees</span>
          </div>
        </div>

        {/* RIGHT SIDE - Purposeful Case Investigation Trail */}
        <div className="relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
          <div className="w-full relative p-4 sm:p-6 rounded-[2.2rem] bg-[#111C26]/95 border border-[#24313D] backdrop-blur-2xl shadow-2xl overflow-hidden glow-intelligence">
            {/* Header with Case Flow & Color Legend */}
            <div className="pb-3 mb-3 border-b border-[#24313D] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D6D0] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D6D0]"></span>
                </span>
                <span className="font-body font-bold text-[#F1F5F7] tracking-wider uppercase text-[11px]">
                  Case Investigation Trail
                </span>
              </div>
              
              {/* Purposeful Color Legend */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] font-body text-[#8B9AA5]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" /> Suspicious
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#C6A96B]" /> Case Origin
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#35D6D0]" /> Digital Trail
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4DB89A]" /> Verified Evidence
                </span>
              </div>
            </div>

            {/* Step-by-Step Flow */}
            <div className="space-y-1.5">
              {investigationTrail.map((item, idx) => {
                const Icon = item.icon;
                const isLast = idx === investigationTrail.length - 1;

                return (
                  <div key={item.id} className="relative">
                    <div className="group flex items-center gap-3 p-2 rounded-xl bg-[#0C131B]/80 border border-[#24313D]/70 hover:border-[#35D6D0]/40 transition-all">
                      {/* Left icon circle with status glow */}
                      <div className="relative shrink-0">
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border transition-transform group-hover:scale-105"
                          style={{
                            backgroundColor: `${item.color}15`,
                            borderColor: `${item.color}40`,
                            color: item.color,
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${item.glowDot}`} />
                      </div>

                      {/* Content block */}
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
                        <div className="flex items-baseline gap-2 truncate">
                          <span
                            className="font-body font-bold text-xs sm:text-[13px] tracking-tight"
                            style={{ color: item.color }}
                          >
                            {item.title}
                          </span>
                          <span className="text-[11px] sm:text-xs text-[#8B9AA5] font-body truncate hidden md:inline">
                            {item.description}
                          </span>
                        </div>
                        <span
                          className={`self-start sm:self-auto text-[9px] sm:text-[10px] font-body font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${item.badgeBg}`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Downward Connector Arrow */}
                    {!isLast && (
                      <div className="flex items-center justify-center my-0.5">
                        <ChevronDown className="w-3 h-3 text-[#8B9AA5]/40 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Authenticity Footer */}
            <div className="mt-3 pt-2 border-t border-[#24313D] flex items-center justify-between text-[10px] font-mono text-[#8B9AA5]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4DB89A]" />
                <span className="uppercase tracking-wider">Trace Active • 50+ Blockchains</span>
              </span>
              <span className="text-[#35D6D0] font-bold">CASE REF: #MK-TRC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
