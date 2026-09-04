"use client";

import { AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2, Lock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const warningSigns = [
  {
    id: 1,
    text: "You're being asked to pay a fee before withdrawing your money.",
    category: "Advance Fee Trap",
    highlight: "pay a fee before withdrawing",
  },
  {
    id: 2,
    text: "A platform shows profits but won't let you withdraw.",
    category: "Fabricated Balances",
    highlight: "shows profits but won't let you withdraw",
  },
  {
    id: 3,
    text: "Someone promises guaranteed investment returns.",
    category: "Unrealistic Promise",
    highlight: "guaranteed investment returns",
  },
  {
    id: 4,
    text: "A person you've met online repeatedly asks for financial help.",
    category: "Relationship Fraud",
    highlight: "person you've met online repeatedly asks for financial help",
  },
  {
    id: 5,
    text: "You're told to send cryptocurrency to “unlock” your account.",
    category: "Wallet Drainer",
    highlight: "send cryptocurrency to “unlock” your account",
  },
  {
    id: 6,
    text: "Someone claims they can recover your lost funds—but asks for payment first.",
    category: "Recovery Scam",
    highlight: "claims they can recover your lost funds—but asks for payment first",
  },
  {
    id: 7,
    text: "A website or company has stopped responding after receiving your money.",
    category: "Communication Blackout",
    highlight: "stopped responding after receiving your money",
  },
];

export function MickydonsScamCheck() {
  return (
    <section id="scam-check" className="py-24 bg-[#06090D] relative overflow-hidden border-b border-[#24313D]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#35D6D0]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#EF4444]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/25 text-[#EF4444] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
            EARLY FRAUD DIAGNOSTIC
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
            Not sure if it&apos;s a scam?
          </h2>
          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed max-w-2xl mx-auto">
            Some fraud starts with a convincing investment opportunity. Others begin with a relationship, a job offer or a simple message.
          </p>
        </div>

        {/* Diagnostic Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0C131B] border border-[#24313D] shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 pb-6 mb-8 border-b border-[#24313D]">
              <div className="w-10 h-10 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] shrink-0">
                <ShieldAlert className="w-5 h-5 text-[#EF4444]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-body font-semibold text-[#F1F5F7]">
                  You may be dealing with fraud if:
                </h3>
                <p className="text-xs sm:text-sm font-body text-[#8B9AA5]">
                  Check if any of these common scam red flags match your experience:
                </p>
              </div>
            </div>

            {/* Warning Signs List */}
            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 mb-10">
              {warningSigns.map((sign, idx) => (
                <div
                  key={sign.id}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-[#111C26]/90 border border-[#24313D] hover:border-[#EF4444]/40 hover:bg-[#111C26] transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/25 flex items-center justify-center text-[#EF4444] font-body font-bold text-xs shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] sm:text-[16px] font-body text-[#F1F5F7] leading-relaxed">
                      {sign.text}
                    </p>
                  </div>
                  <span className="hidden sm:inline-block text-[10px] font-body font-bold text-[#8B9AA5] px-2.5 py-1 rounded-full bg-[#0C131B] border border-[#24313D] uppercase tracking-wider shrink-0">
                    {sign.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Callout & Direct CTA */}
            <div className="pt-8 border-t border-[#24313D] flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-transparent via-[#35D6D0]/5 to-transparent p-4 sm:p-6 rounded-2xl">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-base font-body font-semibold text-[#F1F5F7] flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35D6D0] animate-pulse" />
                  Recognize any of these warning signs?
                </div>
                <p className="text-xs sm:text-sm font-body text-[#8B9AA5]">
                  Do not send additional funds. An investigator can review your case for free.
                </p>
              </div>

              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto h-14 px-8 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 rounded-xl transition-all hover:scale-105 border border-[#8AF2E9]/40 shrink-0"
              >
                <Link href="#request" className="flex items-center gap-2">
                  Talk to a Case Specialist <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
