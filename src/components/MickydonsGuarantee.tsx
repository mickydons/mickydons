
"use client";

import { ShieldCheck, Lock, Scale, MessageSquare, FileCheck, CheckCircle2 } from "lucide-react";

const commitments = [
  {
    title: "Confidentiality",
    description: "Your case details are handled with discretion.",
    icon: Lock,
    isHighlight: false,
  },
  {
    title: "Evidence-led Investigation",
    description: "We base our work on available evidence rather than assumptions.",
    icon: FileCheck,
    isHighlight: false,
  },
  {
    title: "Honest Expectations",
    description: "We explain what is possible—and what isn't.",
    icon: Scale,
    isHighlight: false,
  },
  {
    title: "Clear Case Updates",
    description: "You should know what has been reviewed and what happens next.",
    icon: MessageSquare,
    isHighlight: false,
  },
  {
    title: "No Guaranteed Recovery Claims",
    description: "Every case is different. We do not promise an outcome before the evidence supports it.",
    icon: ShieldCheck,
    isHighlight: true,
  },
];

export function MickydonsGuarantee() {
  return (
    <section className="py-24 bg-[#0C131B]/60 border-y border-[#24313D]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6A96B]/10 border border-[#C6A96B]/25 text-[#C6A96B] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A96B]" />
            OUR INVESTIGATIVE APPROACH
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
            Our Commitment <br className="hidden sm:inline" />
            <span className="text-[#35D6D0]">to Your Case.</span>
          </h2>
          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed max-w-2xl mx-auto">
            We focus on evidence, digital traces and clear documentation—not empty promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {commitments.map((item) => (
            <div
              key={item.title}
              className={`flex flex-col sm:flex-row gap-5 p-7 sm:p-8 rounded-3xl bg-[#111C26] border transition-all group shadow-xl ${
                item.isHighlight
                  ? "md:col-span-2 border-[#C6A96B]/40 hover:border-[#C6A96B] bg-gradient-to-r from-[#111C26] via-[#111C26] to-[#C6A96B]/5"
                  : "border-[#24313D] hover:border-[#35D6D0]/50"
              }`}
            >
              <div className="shrink-0">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border ${
                    item.isHighlight
                      ? "bg-[#C6A96B]/10 text-[#C6A96B] border-[#C6A96B]/30"
                      : "bg-[#35D6D0]/10 text-[#35D6D0] border-[#35D6D0]/20"
                  }`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`text-[17px] sm:text-[18px] font-body font-semibold transition-colors ${
                      item.isHighlight
                        ? "text-[#F1F5F7] group-hover:text-[#C6A96B]"
                        : "text-[#F1F5F7] group-hover:text-[#35D6D0]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.isHighlight && (
                    <span className="text-[10px] font-body font-bold text-[#C6A96B] px-2.5 py-0.5 rounded-full bg-[#C6A96B]/10 border border-[#C6A96B]/25 uppercase tracking-wider shrink-0">
                      Standard of Integrity
                    </span>
                  )}
                </div>
                <p className="text-[#8B9AA5] font-body text-[14px] sm:text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-[#111C26] border border-[#24313D] text-center shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#35D6D0]" />
              <span className="font-semibold text-sm sm:text-base text-[#F1F5F7]">Discreet Information Protection</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#35D6D0]" />
              <span className="font-semibold text-sm sm:text-base text-[#F1F5F7]">Documented Evidence Files</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#35D6D0]" />
              <span className="font-semibold text-sm sm:text-base text-[#F1F5F7]">Realistic Recovery Expectations</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-[#8B9AA5] font-body italic">
            &ldquo;We investigate what happened, trace the available evidence, and explain your genuine options.&rdquo; — Mickydons Investigation Desk
          </p>
        </div>
      </div>
    </section>
  );
}
