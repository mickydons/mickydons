"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Activity,
  ShieldCheck,
  Camera,
  BookOpen,
  Quote,
  Menu,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MickydonsLogoMark } from "@/components/MickydonsLogoMark";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Session Terminated",
      description: "Signed out of Mickydons Case Operations Desk.",
    });
    router.push("/admin/login");
  };

  const navGroups = [
    {
      label: "CASE OPERATIONS",
      items: [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Case Files", href: "/admin/recovery-files", icon: FileText },
        { name: "Client Records", href: "/admin/clients", icon: Users },
        { name: "Intelligence Feed", href: "/admin/intelligence-logs", icon: Activity },
      ]
    },
    {
      label: "EVIDENCE & TRUST",
      items: [
        { name: "Verification Proofs", href: "/admin/forensic-results", icon: ShieldCheck },
        { name: "Trust Assets", href: "/admin/trust-assets", icon: Camera },
        { name: "Case Studies", href: "/admin/case-studies", icon: Quote },
      ]
    },
    {
      label: "CONTENT & DESK",
      items: [
        { name: "Knowledge Hub", href: "/admin/articles", icon: BookOpen },
        { name: "Desk Settings", href: "/admin/settings", icon: Settings },
      ]
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#080D14] border-r border-[#172331] text-[#F1F5F7] select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#172331]/80 bg-[#0A1018]/60">
        <Link 
          href="/admin/dashboard" 
          className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.01]" 
          onClick={() => setIsOpen(false)}
        >
          {logoUrl ? (
            <div className="relative w-9 h-9 rounded-xl bg-[#111A24] border border-[#243447] overflow-hidden p-1 shadow-md">
              <Image src={logoUrl} alt="Logo" fill className="object-contain" unoptimized={true} />
            </div>
          ) : (
            <MickydonsLogoMark size={36} />
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-base font-bold tracking-tight text-[#F1F5F7] truncate leading-tight">
              Mickydons <span className="text-[#35D6D0]">Desk</span>
            </span>
            <span className="text-[9px] font-body font-bold text-[#8B9AA5] uppercase tracking-[0.14em] mt-0.5">
              CASE OPERATIONS
            </span>
          </div>
        </Link>
        <div className="mt-4 flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#0E1722] border border-[#1A2838] text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Node
          </span>
          <span className="font-mono text-[10px] text-[#8B9AA5]">v2.4</span>
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-body font-bold uppercase tracking-[0.16em] text-[#637587]">
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group",
                    isActive
                      ? "bg-gradient-to-r from-[#35D6D0]/15 to-transparent text-[#F1F5F7] font-semibold border-l-2 border-[#35D6D0]"
                      : "text-[#8B9AA5] hover:text-[#F1F5F7] hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-[#35D6D0]" : "text-[#8B9AA5] group-hover:text-[#35D6D0]"
                    )} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#35D6D0] opacity-80" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer & User Profile */}
      <div className="p-4 border-t border-[#172331]/80 bg-[#0A1018]/80 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#8B9AA5] hover:text-[#35D6D0] hover:bg-white/[0.03] transition-colors border border-transparent hover:border-[#1E2D3E]"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Site
          </span>
          <span className="text-[10px] uppercase font-mono text-[#637587]">Live</span>
        </Link>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0E1722] border border-[#1A2838]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#35D6D0]/20 to-[#C6A96B]/20 border border-[#35D6D0]/30 flex items-center justify-center text-[#35D6D0] font-bold text-xs uppercase shadow-sm">
            {userEmail?.[0] || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-[#F1F5F7] truncate">{userEmail?.split('@')[0] || "Investigator"}</div>
            <div className="text-[9px] text-[#8B9AA5] font-mono truncate">Case Specialist</div>
          </div>
          <button 
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-[#8B9AA5] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Nav Trigger Overlay (only visible on small screens) */}
      <div className="lg:hidden fixed top-3 left-4 z-[60]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-[#080D14]/90 backdrop-blur-md border-[#172331] shadow-2xl text-[#F1F5F7]">
              <Menu className="w-5 h-5 text-[#35D6D0]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-[#172331] w-72 bg-[#080D14]">
            <SheetHeader className="sr-only">
              <SheetTitle>Administrative Navigation</SheetTitle>
              <SheetDescription>Access case files, forensic results, and triage tools.</SheetDescription>
            </SheetHeader>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-[#172331] bg-[#080D14] hidden lg:flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <SidebarContent />
      </aside>
    </>
  );
}
