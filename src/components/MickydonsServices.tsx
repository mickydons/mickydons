"use client";

import { useState } from "react";
import { Wallet, TrendingUp, ShieldAlert, Landmark, Activity, ArrowRight, ShieldCheck, Info, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

const services = [
  {
    id: "wallet",
    title: "Wallet Recovery",
    description: "Lost access to your private keys or seed phrase? We utilize advanced cryptographic recovery techniques.",
    icon: Wallet,
    content: "If you have lost your 12 or 24-word seed phrase, or the password to your digital wallet, professional recovery is still possible. We use high-performance computing clusters to simulate billions of password combinations based on your partial memory. Our process is non-invasive and ensures your assets are never at risk during the recovery attempts.",
  },
  {
    id: "investment",
    title: "Investment Scam Recovery",
    description: "Specialized tracing for stolen assets from fraudulent investment platforms and fake schemes.",
    icon: TrendingUp,
    content: "Investment scams often involve sophisticated 'liquidity' or 'yield' platforms. Our forensic team maps the flow of funds from these malicious smart contracts through multiple hops to identify the final exchange endpoints for reclamation. We prepare technical evidence bundles for exchange compliance teams to facilitate asset freezes.",
  },
  {
    id: "broker",
    title: "Bad Finance Broker",
    description: "Legal and technical assistance for victims of dishonest or unregulated financial brokers.",
    icon: Landmark,
    content: "If a broker has frozen your account or refused legitimate withdrawals under false pretenses, we can assist. We provide the institutional-grade forensic reports needed to initiate legal pressure and work with international regulatory bodies to release your capital from unscrupulous brokerage entities.",
  },
  {
    id: "trading",
    title: "Trading Scam Recovery",
    description: "Recovery services for capital stolen through manipulated trading apps and fake crypto exchanges.",
    icon: Activity,
    content: "Trading scams use fake data and high-pressure tactics to trick victims into 'topping up' their accounts. We use de-anonymization techniques to track the real movement of your crypto on the blockchain and identify the illicit operators behind the fraudulent interface.",
  },
  {
    id: "romance",
    title: "Romance Scam Recovery",
    description: "Confidential assistance for victims of pig-butchering and relationship-based crypto fraud.",
    icon: ShieldCheck,
    content: "Romance scams are complex and multi-layered, often involving long-term grooming. Our lab provides an empathetic and professional environment to trace stolen wealth across multiple blockchains and work with international authorities to secure freezes on criminal-controlled wallets.",
  },
  {
    id: "loan",
    title: "Loan Scam Recovery",
    description: "Assistance for victims of fraudulent lending platforms and advanced-fee loan traps.",
    icon: FileText,
    content: "Loan scams often promise quick capital but lead to 'advanced fee' fraud where victims pay 'insurance' or 'tax' to release a non-existent loan. Our forensic specialists identify the wallet signatures of these fraudulent lending platforms and track the destination of paid fees to initiate recovery through legal and exchange channels.",
  },
  {
    id: "crypto-assets",
    title: "Crypto Scam Recovery",
    description: "Investigation and evidence tracing for unauthorized transfers, phishing approvals, and fraudulent crypto platforms.",
    icon: Zap,
    content: "If you were tricked into connecting your wallet or sending crypto to a fraudulent address, we investigate the on-chain movement. We trace each hop across blockchains to document where your funds landed, preparing an evidence package for exchanges and legal authorities.",
  },
];

export function MickydonsServices() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="py-24 bg-[#06090D] border-y border-[#24313D]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            SCAM TYPES WE INVESTIGATE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
            We Help With <br className="hidden sm:inline" />
            <span className="text-[#35D6D0]">Different Types of Scams.</span>
          </h2>
          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed max-w-2xl mx-auto">
            Scammers use different methods—fake trading platforms, romance manipulation, or blocked withdrawals. We investigate what happened, document the facts, and pursue the available recovery paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="bg-[#111C26] border-[#24313D] hover:border-[#35D6D0]/60 group hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-2xl shadow-lg"
              onClick={() => setSelectedService(service)}
            >
              <CardHeader>
                <div className="p-3 w-fit rounded-xl bg-[#35D6D0]/10 text-[#35D6D0] mb-4 group-hover:bg-[#35D6D0] group-hover:text-[#06090D] transition-all duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-[17px] font-body font-semibold text-[#F1F5F7] group-hover:text-[#35D6D0] transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#8B9AA5] font-body text-[14px] leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 font-body text-[13px] font-semibold text-[#35D6D0] hover:text-[#8AF2E9] hover:gap-3 transition-all">
                  Examine case profile <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button size="lg" asChild className="px-8 h-14 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 transition-all hover:scale-105 rounded-xl border border-[#8AF2E9]/40">
            <Link href="#request" className="flex items-center gap-2">
              Start a Free Case Assessment <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
          <p className="text-sm text-[#8B9AA5] font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#35D6D0]" />
            Confidential review • No upfront fees for scams
          </p>
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-[#111C26] border-[#24313D] text-[#F1F5F7] overflow-y-auto max-h-[90vh]">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-[#35D6D0] font-bold text-xs uppercase tracking-widest mb-2">
                  <selectedService.icon className="w-4 h-4" />
                  Professional Service Insight
                </div>
                <DialogTitle className="text-2xl lg:text-3xl font-headline font-bold leading-tight text-[#F1F5F7]">
                  {selectedService.title} Guidance
                </DialogTitle>
                <DialogDescription className="text-[#8B9AA5] text-base mt-2">
                  Professional technical methodology and recovery roadmap.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                <div className="p-6 rounded-2xl bg-[#0C131B] border border-[#24313D]">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-[#35D6D0]/10 text-[#35D6D0] shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-[#F1F5F7]">Our Technical Approach</h4>
                      <p className="text-[#8B9AA5] leading-relaxed">
                        {selectedService.content}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0C131B] border border-[#24313D]">
                    <div className="text-[#C6A96B] font-bold text-[10px] uppercase tracking-widest mb-1">Standard Timeframe</div>
                    <div className="text-sm font-semibold text-[#F1F5F7]">3–7 Business Days</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0C131B] border border-[#24313D]">
                    <div className="text-[#35D6D0] font-bold text-[10px] uppercase tracking-widest mb-1">Success Rate</div>
                    <div className="text-sm font-semibold text-[#F1F5F7]">94% Technical Recovery</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#24313D] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#8B9AA5] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#35D6D0]" />
                    Institutional Grade Forensic Protocol
                  </div>
                  <Button onClick={() => setSelectedService(null)} variant="secondary" className="w-full sm:w-auto bg-[#0C131B] text-[#F1F5F7] hover:bg-[#24313D]">
                    Return to Services
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
