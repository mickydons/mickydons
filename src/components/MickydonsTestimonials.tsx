"use client";

import { GitBranch, Wallet, Globe, FolderArchive, FileText, Compass, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const investigationCapabilities = [
  {
    title: "Transaction Mapping",
    description: "Understand where funds moved.",
    detailedContext: "Trace multi-hop asset transfers from initial wallet outflows to destination deposit addresses.",
    icon: GitBranch,
    tag: "On-Chain Tracing",
  },
  {
    title: "Wallet Analysis",
    description: "Identify relevant wallet activity.",
    detailedContext: "Examine counterparty clusters, liquidity pools, and exchange account associations.",
    icon: Wallet,
    tag: "Address Attribution",
  },
  {
    title: "Platform Investigation",
    description: "Examine suspicious websites, platforms or services.",
    detailedContext: "Analyze hosting footprints, domain registration records, and fraudulent smart contracts.",
    icon: Globe,
    tag: "Platform Analysis",
  },
  {
    title: "Evidence Organization",
    description: "Turn scattered screenshots, messages and records into a structured case file.",
    detailedContext: "Consolidate chat logs, wire receipts, and blockchain evidence into an organized chronological index.",
    icon: FolderArchive,
    tag: "Evidence Standard",
  },
  {
    title: "Reporting Support",
    description: "Understand what information may be useful when reporting the fraud.",
    detailedContext: "Provide standardized documentation format required by cybercrime units and bank dispute departments.",
    icon: FileText,
    tag: "Reporting Dossier",
  },
  {
    title: "Recovery Path Assessment",
    description: "Determine which recovery or dispute options may be worth pursuing.",
    detailedContext: "Evaluate legal freeze eligibility, exchange compliance reporting, or jurisdiction referral viability.",
    icon: Compass,
    tag: "Path Feasibility",
  },
];

export function MickydonsTestimonials() {
  return (
    <section className="py-24 bg-[#06090D] border-t border-[#24313D] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#35D6D0]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            INVESTIGATIVE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
            What a recovery <br className="hidden sm:inline" />
            <span className="text-[#35D6D0]">investigation can uncover.</span>
          </h2>
          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed max-w-2xl mx-auto">
            Rather than making unsubstantiated outcome claims, we focus on what verifiable forensic evidence can uncover about your case.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {investigationCapabilities.map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-3xl bg-[#111C26] border border-[#24313D] hover:border-[#35D6D0]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#35D6D0]/10 border border-[#35D6D0]/20 flex items-center justify-center text-[#35D6D0] group-hover:scale-110 group-hover:bg-[#35D6D0] group-hover:text-[#06090D] transition-all duration-300">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-body font-bold text-[#8B9AA5] px-2.5 py-1 rounded-full bg-[#0C131B] border border-[#24313D] uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-[18px] font-body font-semibold text-[#F1F5F7] group-hover:text-[#35D6D0] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-[#F1F5F7] font-body font-medium text-[15px] mb-2">
                  {item.description}
                </p>
                <p className="text-[#8B9AA5] font-body text-[13px] leading-relaxed">
                  {item.detailedContext}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            asChild
            className="px-8 h-14 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 transition-all hover:scale-105 rounded-xl border border-[#8AF2E9]/40"
          >
            <Link href="#request" className="flex items-center gap-2">
              Start a Free Case Assessment <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xs text-[#8B9AA5] font-body font-semibold px-3.5 py-1 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/20">
            <ShieldCheck className="w-4 h-4 text-[#35D6D0]" />
            Evidence-led Tracing • No False Promises • Confidential Review
          </div>
        </div>
      </div>
    </section>
  );
}