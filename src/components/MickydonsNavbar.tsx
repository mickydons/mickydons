"use client";

import Link from "next/link";
import { Shield, Menu, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { MickydonsLogoMark } from "@/components/MickydonsLogoMark";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Knowledge Hub", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function MickydonsNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
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

  const LogoContent = () => (
    <div className="flex items-center gap-3 group">
      {logoUrl ? (
        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-primary/5 border border-[#24313D]">
          <Image 
            src={logoUrl} 
            alt="Mickydons Logo" 
            fill 
            className="object-contain p-1"
            unoptimized={true}
          />
        </div>
      ) : (
        <MickydonsLogoMark size={42} />
      )}
      <div className="flex flex-col">
        <span className="font-headline text-xl sm:text-2xl font-bold tracking-tight leading-none text-[#F1F5F7]">
          Mickydons <span className="text-[#35D6D0]">Trace &amp; Recovery</span>
        </span>
        <span className="text-[9px] font-body text-[#8B9AA5] font-semibold uppercase tracking-[0.14em] mt-1.5 hidden sm:block">
          SCAM INVESTIGATION • ASSET TRACING • RECOVERY SUPPORT
        </span>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <header className="glass-header">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MickydonsLogoMark size={42} />
            <div className="flex flex-col">
              <span className="font-headline text-xl sm:text-2xl font-bold tracking-tight leading-none text-[#F1F5F7]">
                Mickydons <span className="text-[#35D6D0]">Trace &amp; Recovery</span>
              </span>
              <span className="text-[9px] font-body text-[#8B9AA5] font-semibold uppercase tracking-[0.14em] mt-1.5 hidden sm:block">
                SCAM INVESTIGATION • ASSET TRACING • RECOVERY SUPPORT
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="glass-header">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <LogoContent />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#8B9AA5] hover:text-[#35D6D0] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#35D6D0] transition-all group-hover:w-full shadow-sm shadow-[#35D6D0]"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2 px-3 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25">
            <div className="w-1.5 h-1.5 rounded-full bg-[#35D6D0] animate-pulse-green shadow-[0_0_8px_rgba(53,214,208,0.8)]" />
            <span className="text-[10px] font-body font-bold text-[#35D6D0] uppercase tracking-wider">Case Team Available</span>
          </div>
          <Button variant="default" size="sm" asChild className="bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-lg shadow-[#35D6D0]/25 font-body text-[13px] font-bold px-5 h-10 rounded-xl transition-all border border-[#8AF2E9]/40 uppercase tracking-wide">
            <Link href="#request">Free Case Review</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25">
            <div className="w-1.5 h-1.5 rounded-full bg-[#35D6D0] animate-pulse-green shadow-[0_0_8px_rgba(53,214,208,0.8)]" />
            <span className="text-[8px] font-body font-bold text-[#35D6D0] uppercase tracking-wider">Live</span>
          </div>
          <Button variant="default" size="sm" asChild className="h-9 px-3.5 bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] font-body text-xs font-bold rounded-lg border border-[#8AF2E9]/30 uppercase tracking-wide">
            <Link href="#request">Free Review</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#F1F5F7] hover:bg-[#111C26]">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0C131B] border-[#24313D] text-[#F1F5F7] p-0">
              <SheetHeader className="px-6 pt-10 text-left">
                <SheetTitle className="text-2xl font-headline font-bold text-[#F1F5F7]">Menu</SheetTitle>
                <SheetDescription className="text-[#8B9AA5]">
                  Access our professional recovery services and knowledge hub.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full pt-6 px-6 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-headline font-semibold text-[#F1F5F7] hover:text-[#35D6D0]"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-auto pb-10 flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-[#111C26] border border-[#24313D]">
                    <div className="flex items-center gap-2 text-[#35D6D0] font-bold text-xs mb-2">
                      <ShieldCheck className="w-4 h-4 text-[#35D6D0]" />
                      Forensic Intelligence
                    </div>
                    <p className="text-[10px] text-[#8B9AA5] mb-4">Our specialists are currently active and typically review case files in under 24 hours.</p>
                  </div>
                  <Button className="w-full justify-between h-12 bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] font-bold rounded-xl shadow-lg shadow-[#35D6D0]/20 border border-[#8AF2E9]/40" asChild>
                    <Link href="#request" onClick={() => setIsOpen(false)}>
                      START YOUR RECOVERY <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
