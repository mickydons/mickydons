"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, FileText, Globe, Scale, ExternalLink, Activity, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export function MickydonsProofLayer() {
  const [proofs, setProofs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProofs = async () => {
      const { data, error } = await supabase
        .from("forensic_results")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2); // Keep the design clean with top 2 recent proofs
      
      if (!error && data) {
        setProofs(data);
      }
      setIsLoading(false);
    };
    fetchProofs();
  }, []);

  return (
    <section className="py-20 bg-[#0C131B]/60 border-y border-[#24313D]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            STANDARDS & CERTIFICATIONS
          </div>
          <h2 className="text-3xl lg:text-4xl font-headline font-normal mb-4 text-[#F1F5F7]">Verified Investigation Standards</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center text-[#8B9AA5]">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#C6A96B]" />
              <span className="font-bold text-xs tracking-widest uppercase">FINMA Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#35D6D0]" />
              <span className="font-bold text-xs tracking-widest uppercase">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#35D6D0]" />
              <span className="font-bold text-xs tracking-widest uppercase">Global Forensic Network</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-body font-semibold flex items-center gap-2 text-[#F1F5F7]">
                <Activity className="text-[#35D6D0] w-5 h-5" />
                Case Evidence Trails & Tracing Files
              </h3>
              <p className="text-xs text-[#35D6D0] font-body font-semibold cursor-help border-b border-[#35D6D0]/30">
                Sanitized evidence files available for legal review
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 text-[#35D6D0] animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proofs.map((proof) => (
                  <Card key={proof.id} className="bg-[#111C26] border-[#24313D] overflow-hidden group rounded-2xl">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={proof.image_url}
                        alt={proof.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06090D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-widest bg-[#35D6D0] text-[#06090D] px-2.5 py-1 rounded-md font-mono">
                          Forensic ID: {proof.forensic_id}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-[#F1F5F7]">{proof.label}</div>
                        <div className="text-xs text-[#8B9AA5]">{proof.date}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#8B9AA5]" />
                    </CardContent>
                  </Card>
                ))}
                {proofs.length === 0 && (
                  <div className="col-span-full p-8 rounded-2xl border border-dashed border-[#24313D] bg-[#0C131B] text-center">
                    <p className="text-[#8B9AA5] text-sm italic">Laboratory results pending authentication...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#111C26] p-8 rounded-3xl border border-[#24313D] shadow-xl">
            <h3 className="text-xl font-headline font-bold mb-6 text-[#F1F5F7]">Institutional Credibility</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-2.5 rounded-xl bg-[#C6A96B]/10 h-fit border border-[#C6A96B]/20">
                  <ShieldCheck className="w-5 h-5 text-[#C6A96B]" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-1 text-[#F1F5F7]">Entity Registration</div>
                  <div className="text-[#8B9AA5] text-sm">Mickydons Trace &amp; Recovery Ltd.</div>
                  <div className="text-[#C6A96B] font-mono text-xs mt-1">Reg #HE-45293-C1</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2.5 rounded-xl bg-[#35D6D0]/10 h-fit border border-[#35D6D0]/20">
                  <Globe className="w-5 h-5 text-[#35D6D0]" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-1 text-[#F1F5F7]">Investigation HQ</div>
                  <div className="text-[#8B9AA5] text-sm leading-relaxed">
                    1201 Financial Centre<br />
                    Zürich, Switzerland, 8001
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[#24313D]">
                <p className="text-xs text-[#8B9AA5] leading-relaxed italic">
                  *Mickydons Trace &amp; Recovery operates under strict Swiss digital privacy laws and adheres to international digital asset tracing standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
