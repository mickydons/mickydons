"use client";

import Link from "next/link";
import { Shield, Twitter, Facebook, Linkedin, Github, MapPin, Building, ArrowRight, ShieldCheck, Scale, Lock, FileText, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { MickydonsLogoMark } from "@/components/MickydonsLogoMark";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const legalDocs = {
  engagement: {
    title: "Terms of Forensic Engagement",
    icon: Scale,
    description: "Official protocols governing the laboratory's relationship with private and institutional clients.",
    content: `
      **1. Scope of Investigation**
      Mickydons Trace & Recovery provides digital asset tracing and evidence documentation. We do not guarantee recovery outcomes, but investigate what happened, document the facts, and pursue the available recovery paths.

      **2. Client Obligations**
      Clients must provide accurate Transaction IDs (TXIDs), wallet addresses, and chronological event logs. Accurate information is critical for effective tracing.

      **3. Fee Structure**
      Initial case assessments are completely free. If an in-depth forensic investigation or evidence dossier is warranted, all costs and terms are presented in writing before any engagement begins.

      **4. Realistic Outcomes**
      Mickydons Trace & Recovery acts as an independent investigative firm. Final asset return depends on the cooperation of exchanges, banking institutions, and law enforcement authorities.
    `
  },
  privacy: {
    title: "Data Privacy Policy",
    icon: Lock,
    description: "Swiss-standard data isolation and encryption protocols for case integrity.",
    content: `
      **1. Data Isolation**
      All submitted intake data is isolated on encrypted Swiss-based servers. We utilize RSA-4096 encryption for sensitive diagnostic files.

      **2. Retention Policy**
      Diagnostic data is retained for the duration of the investigation plus 90 days for audit purposes, after which it is purged from our primary forensic clusters unless legal holds are in place.

      **3. Third-Party Sharing**
      We do not sell data. We only share sanitized forensic reports with verified legal partners or exchange compliance teams upon explicit client authorization.

      **4. SOC 2 Compliance**
      Our infrastructure adheres to SOC 2 Type II standards, ensuring strict internal controls over data access and network security.
    `
  },
  compliance: {
    title: "Regulatory Compliance",
    icon: ShieldCheck,
    description: "International standards and institutional certifications of Mickydons Trace & Recovery.",
    content: `
      **1. FINMA Adherence**
      Mickydons Trace & Recovery Ltd. operates under the digital asset guidelines established by the Swiss Financial Market Supervisory Authority (FINMA).

      **2. ISO 27001 Certification**
      The firm maintains ISO 27001 certification for Information Security Management Systems (ISMS), ensuring global standard protection.

      **3. VASP Cooperation**
      We maintain emergency communication channels with Tier-1 exchanges. Our forensic reports are formatted to satisfy international AML (Anti-Money Laundering) and KYC (Know Your Customer) requirements.

      **4. Forensic Integrity**
      Our lead analysts are certified in blockchain intelligence (Chainalysis/Elliptic) and follow INTERPOL-compliant digital evidence gathering protocols.
    `
  },
  conflict: {
    title: "Conflict of Interest",
    icon: AlertTriangle,
    description: "Transparency protocols ensuring unbiased forensic reporting.",
    content: `
      **1. Neutrality Protocol**
      Mickydons maintain strict independence from exchanges and DeFi protocols. Our findings are based solely on on-chain heuristics and forensic evidence.

      **2. Case Screening**
      Every intake undergoes an automated conflict-of-interest check. We do not accept cases where the laboratory has a prior or existing investigation into the target entity that could compromise report objectivity.

      **3. Disclosure**
      If a conflict is identified during an active investigation, the client will be notified immediately, and the file will be transferred to a neutral partner node within the International Cyber Forensics Consortium.
    `
  }
};

const TechnicalRenderer = ({ text }: { text: string }) => (
  <div className="space-y-4">
    {text.split('\n\n').map((p, idx) => (
      <p key={idx} className="text-sm text-foreground/80 leading-relaxed">
        {p.split(/(\*\*.*?\*\*)/).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="text-foreground">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    ))}
  </div>
);

export function MickydonsFooter() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<keyof typeof legalDocs | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
    const fetchLogo = async () => {
      const { data } = await supabase
        .from('operational_proofs')
        .select('image_url')
        .eq('asset_key', 'brand-logo')
        .single();
      if (data) setLogoUrl(data.image_url);
    };
    fetchLogo();
  }, []);

  return (
    <footer className="bg-[#06090D] border-t border-[#24313D] pt-0 pb-12">
      {/* Final Conversion Push */}
      <div className="relative overflow-hidden py-20 mb-20 border-b border-[#24313D] bg-[#0C131B]/80">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            GET STARTED TODAY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
            Think you&apos;ve been scammed? <br className="hidden sm:inline" />
            <span className="text-[#35D6D0]">Start here.</span>
          </h2>
          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            You don&apos;t need to understand blockchain, digital forensics or financial investigations. Tell us what happened. We&apos;ll help you understand the evidence and your available next steps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto px-8 h-14 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 transition-all hover:scale-105 border border-[#8AF2E9]/40 rounded-xl">
              <Link href="#request" className="flex items-center gap-2">
                Start My Case Assessment <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto px-8 h-14 font-body text-[13px] sm:text-[14px] font-semibold tracking-wide uppercase border-[#24313D] bg-[#0C131B] text-[#F1F5F7] hover:bg-[#111C26] hover:border-[#35D6D0]/50 rounded-xl">
              <Link href="#process">
                Learn About Our Process
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-xs sm:text-sm font-body text-[#8B9AA5]">
            Confidential case assessment • Evidence-led investigation • No guaranteed outcomes
          </p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#35D6D0]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2 group">
              {logoUrl ? (
                <div className="relative w-8 h-8 rounded bg-[#111C26] border border-[#24313D] overflow-hidden">
                  <Image src={logoUrl} alt="Logo" fill className="object-contain p-1" unoptimized={true} />
                </div>
              ) : (
                <MickydonsLogoMark size={36} />
              )}
              <span className="font-headline text-2xl font-bold text-[#F1F5F7]">
                Mickydons <span className="text-[#35D6D0]">Trace &amp; Recovery</span>
              </span>
            </Link>
            <div className="text-[10px] sm:text-[11px] font-body font-semibold text-[#35D6D0] uppercase tracking-[0.14em]">
              SCAM INVESTIGATION • ASSET TRACING • RECOVERY SUPPORT
            </div>
            <p className="text-[#8B9AA5] font-body text-sm leading-relaxed max-w-sm">
              Helping individuals and businesses investigate online fraud, trace digital evidence and understand their recovery options.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#8B9AA5]">
                <MapPin className="w-4 h-4 text-[#35D6D0] shrink-0 mt-0.5" />
                <span>1201 Financial Centre, Zürich, CH-8001</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#8B9AA5]">
                <Building className="w-4 h-4 text-[#35D6D0] shrink-0 mt-0.5" />
                <span>Mickydons Trace &amp; Recovery Ltd. | Reg #HE-45293-C1</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Link href="#" className="w-9 h-9 rounded-xl bg-[#111C26] border border-[#24313D] flex items-center justify-center hover:bg-[#35D6D0]/20 hover:border-[#35D6D0]/40 transition-colors">
                <Twitter className="w-4 h-4 text-[#8B9AA5] hover:text-[#35D6D0] transition-colors" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-xl bg-[#111C26] border border-[#24313D] flex items-center justify-center hover:bg-[#35D6D0]/20 hover:border-[#35D6D0]/40 transition-colors">
                <Facebook className="w-4 h-4 text-[#8B9AA5] hover:text-[#35D6D0] transition-colors" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-xl bg-[#111C26] border border-[#24313D] flex items-center justify-center hover:bg-[#35D6D0]/20 hover:border-[#35D6D0]/40 transition-colors">
                <Linkedin className="w-4 h-4 text-[#8B9AA5] hover:text-[#35D6D0] transition-colors" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-xl bg-[#111C26] border border-[#24313D] flex items-center justify-center hover:bg-[#35D6D0]/20 hover:border-[#35D6D0]/40 transition-colors">
                <Github className="w-4 h-4 text-[#8B9AA5] hover:text-[#35D6D0] transition-colors" />
              </Link>
            </div>
          </div>

          {/* Scam Types */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-body font-bold text-[#F1F5F7] uppercase tracking-[0.14em] mb-6">
              SCAM TYPES
            </h4>
            <ul className="space-y-3 text-sm text-[#8B9AA5] font-body">
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Crypto Scams</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Trading Scams</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Romance Scams</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Investment Fraud</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Payment Fraud</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Impersonation Scams</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Marketplace Fraud</Link></li>
              <li><Link href="#services" className="hover:text-[#35D6D0] transition-colors">Account Compromise</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-body font-bold text-[#F1F5F7] uppercase tracking-[0.14em] mb-6">
              RESOURCES
            </h4>
            <ul className="space-y-3 text-sm text-[#8B9AA5] font-body">
              <li><Link href="#blog" className="hover:text-[#35D6D0] transition-colors">Scam Recovery Guide</Link></li>
              <li><Link href="#blog" className="hover:text-[#35D6D0] transition-colors">Crypto Scam Guide</Link></li>
              <li><Link href="#scam-check" className="hover:text-[#35D6D0] transition-colors">Fraud Prevention</Link></li>
              <li>
                <Link href="#blog" className="hover:text-[#EF4444] transition-colors flex items-center gap-1.5 text-[#F1F5F7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  Recovery Scam Warning
                </Link>
              </li>
              <li><Link href="#process" className="hover:text-[#35D6D0] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-body font-bold text-[#F1F5F7] uppercase tracking-[0.14em] mb-6">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm text-[#8B9AA5] font-body">
              <li><Link href="#process" className="hover:text-[#35D6D0] transition-colors">About</Link></li>
              <li><Link href="#process" className="hover:text-[#35D6D0] transition-colors">Our Process</Link></li>
              <li><Link href="#contact" className="hover:text-[#35D6D0] transition-colors">Contact</Link></li>
              <li>
                <button 
                  onClick={() => setSelectedDoc('privacy')}
                  className="hover:text-[#35D6D0] transition-colors text-left"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedDoc('engagement')}
                  className="hover:text-[#35D6D0] transition-colors text-left"
                >
                  Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#24313D] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#8B9AA5]">
          <div>© 2020-{mounted ? year : '...'} Mickydons Trace &amp; Recovery. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Certifications:</span>
            <span className="font-bold text-[#F1F5F7]/70">ISO 27001</span>
            <span className="font-bold text-[#C6A96B]">FINMA Registered</span>
            <span className="font-bold text-[#35D6D0]">SOC 2 Type II</span>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl bg-[#111C26] border-[#24313D] text-[#F1F5F7] overflow-y-auto max-h-[90vh]">
          {selectedDoc && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-[#35D6D0] font-bold text-[10px] uppercase tracking-widest mb-2">
                  {(() => {
                    const Icon = legalDocs[selectedDoc].icon;
                    return <Icon className="w-4 h-4" />;
                  })()}
                  Laboratory Document
                </div>
                <DialogTitle className="text-2xl font-headline font-bold text-[#F1F5F7]">
                  {legalDocs[selectedDoc].title}
                </DialogTitle>
                <DialogTitle className="sr-only">Access institutional legal documentation and compliance policies.</DialogTitle>
                <DialogDescription className="text-xs text-[#8B9AA5] mt-2 italic">
                  {legalDocs[selectedDoc].description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8">
                <div className="p-6 rounded-2xl bg-[#0C131B] border border-[#24313D]">
                  <TechnicalRenderer text={legalDocs[selectedDoc].content} />
                </div>
              </div>

              <div className="pt-6 border-t border-[#24313D] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[10px] text-[#8B9AA5] italic flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#35D6D0]" />
                  Authorized Forensic Protocol | Swiss Secure
                </div>
                <Button onClick={() => setSelectedDoc(null)} variant="secondary" className="w-full sm:w-auto bg-[#0C131B] text-[#F1F5F7] hover:bg-[#24313D]">
                  Close Document
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </footer>
  );
}
