
"use client";

import { Search, FolderOpen, Network, Compass, ShieldCheck, Zap } from "lucide-react";

const investigationSteps = [
  {
    step: "01",
    title: "Understand What Happened",
    description: "We review your account of the incident and identify how the scam unfolded.",
    icon: Search,
    detailTag: "Case Intake Review",
  },
  {
    step: "02",
    title: "Collect the Evidence",
    description: "Transaction records, wallet addresses, emails, messages, websites, screenshots and other relevant information can help establish the trail.",
    icon: FolderOpen,
    detailTag: "Evidence Preservation",
  },
  {
    step: "03",
    title: "Trace the Digital Trail",
    description: "We analyze available transaction and digital evidence to identify connections, movements and relevant entities.",
    icon: Network,
    detailTag: "Multi-Hop Tracing",
  },
  {
    step: "04",
    title: "Map Your Options",
    description: "We explain the findings and identify practical reporting, dispute or recovery paths that may apply.",
    icon: Compass,
    detailTag: "Actionable Pathways",
  },
];

export function MickydonsMethodology() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#35D6D0]" />
              INVESTIGATION METHODOLOGY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
              How we investigate <br className="hidden sm:inline" />
              <span className="text-[#35D6D0]">a scam.</span>
            </h2>
            <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed">
              We turn scattered information into a clear picture of what happened.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#111C26] border border-[#24313D] backdrop-blur-sm shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-[#35D6D0]/10 flex items-center justify-center text-[#35D6D0]">
                <Zap className="w-6 h-6 text-[#35D6D0]" />
              </div>
              <div>
                <div className="text-[11px] font-body font-bold text-[#8B9AA5] uppercase tracking-wider">Investigative Status</div>
                <div className="text-lg font-bold font-body text-[#F1F5F7]">Active Case Triage</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {investigationSteps.map((step) => (
            <div key={step.step} className="group p-1 rounded-[2rem] bg-gradient-to-br from-[#24313D] to-transparent hover:from-[#35D6D0]/40 transition-all duration-500">
              <div className="bg-[#111C26] h-full p-8 lg:p-10 rounded-[1.9rem] flex flex-col sm:flex-row gap-6 lg:gap-8 items-start transition-all border border-[#24313D]/60 shadow-xl">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#35D6D0]/10 flex items-center justify-center text-[#35D6D0] group-hover:scale-110 group-hover:bg-[#35D6D0] group-hover:text-[#06090D] transition-all duration-500 border border-[#35D6D0]/20">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-bold text-[#35D6D0] px-2.5 py-0.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25">
                      STEP {step.step}
                    </span>
                    <span className="text-[10px] font-body font-semibold text-[#8B9AA5] uppercase tracking-wider">
                      {step.detailTag}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-body font-semibold text-[#F1F5F7] group-hover:text-[#35D6D0] transition-colors">
                    {step.step} — {step.title}
                  </h3>
                  <p className="text-[#8B9AA5] font-body text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[#8B9AA5] opacity-70 hover:opacity-100 transition-all duration-700">
          <div className="flex items-center gap-2 font-bold text-sm tracking-tighter">
            <span className="text-[#35D6D0] text-lg">●</span> CHAINALYSIS PARTNER
          </div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tighter">
            <span className="text-[#35D6D0] text-lg">●</span> ELLIPTIC CERTIFIED
          </div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tighter">
            <span className="text-[#35D6D0] text-lg">●</span> INTERPOL COMPLIANT
          </div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tighter">
            <span className="text-[#C6A96B] text-lg">●</span> TRM LABS VALIDATED
          </div>
          <div className="flex items-center gap-2 font-bold text-sm tracking-tighter">
            <span className="text-[#C6A96B] text-lg">●</span> SWISS FINMA REGISTERED
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#35D6D0]/5 rounded-full blur-[140px] -z-10 pointer-events-none"></div>
    </section>
  );
}
