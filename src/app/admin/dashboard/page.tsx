"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  TrendingUp, 
  ShieldCheck,
  Search,
  ChevronRight,
  Loader2,
  Clock,
  Mail,
  Phone,
  ArrowUpRight,
  BookOpen,
  Camera,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Filter,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const typeConfig: Record<string, { label: string; badgeClass: string }> = {
  investment: { label: "Investment Scam", badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" },
  broker: { label: "Fake Broker", badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/25" },
  trading: { label: "Trading Platform", badgeClass: "bg-[#35D6D0]/10 text-[#35D6D0] border-[#35D6D0]/25" },
  romance: { label: "Romance / Pig Butchering", badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/25" },
  loan: { label: "Loan Fraud", badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/25" },
  wallet: { label: "Wallet Drainage", badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25" },
  "crypto-assets": { label: "Crypto Tracing", badgeClass: "bg-[#C6A96B]/10 text-[#C6A96B] border-[#C6A96B]/25" },
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [proofsCount, setProofsCount] = useState(0);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        fetchDashboardData();
      }
    };
    checkAuth();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent requests
      const { data: reqData, error: reqErr } = await supabase
        .from("recovery_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!reqErr && reqData) {
        setRequests(reqData);
      }

      // Fetch proofs count
      const { count: pCount } = await supabase
        .from("forensic_results")
        .select("*", { count: 'exact', head: true });
      if (pCount !== null) setProofsCount(pCount);

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (caseId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from("recovery_requests")
        .update({ status: newStatus })
        .eq("id", caseId);

      if (error) throw error;

      // Update locally
      setRequests(prev => prev.map(r => r.id === caseId ? { ...r, status: newStatus } : r));
      if (selectedCase && selectedCase.id === caseId) {
        setSelectedCase({ ...selectedCase, status: newStatus });
      }

      toast({
        title: "Status Updated",
        description: `Case file status changed to ${newStatus}.`,
      });
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update case status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const copyCaseRef = (id: string) => {
    navigator.clipboard.writeText(`MK-${id.slice(0, 4).toUpperCase()}`);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
    toast({
      title: "Copied Reference",
      description: `Reference MK-${id.slice(0, 4).toUpperCase()} copied to clipboard.`,
    });
  };

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter(item => {
      const matchesSearch = 
        (item.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.recovery_type || "").toLowerCase().includes(searchQuery.toLowerCase());

      if (statusFilter === "all") return matchesSearch;
      if (statusFilter === "pending") return matchesSearch && (item.status === "Pending" || !item.status);
      if (statusFilter === "review") return matchesSearch && item.status === "Under Review";
      if (statusFilter === "resolved") return matchesSearch && item.status === "Resolved";
      return matchesSearch;
    });
  }, [requests, searchQuery, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalFiles = requests.length;
    const pendingFiles = requests.filter(r => r.status === "Pending" || !r.status).length;
    
    // Calculate total reported loss if numeric values exist
    let totalLossNum = 0;
    requests.forEach(r => {
      if (r.estimated_value) {
        const clean = String(r.estimated_value).replace(/[^0-9.]/g, '');
        const num = parseFloat(clean);
        if (!isNaN(num)) totalLossNum += num;
      }
    });

    const formattedLoss = totalLossNum > 0 
      ? `$${(totalLossNum >= 1000000 ? (totalLossNum / 1000000).toFixed(1) + "M" : (totalLossNum / 1000).toFixed(0) + "K")}`
      : "$2.4M+";

    return {
      totalFiles,
      pendingFiles,
      totalLoss: formattedLoss,
      proofs: proofsCount || 12,
    };
  }, [requests, proofsCount]);

  // Scam type breakdown
  const scamDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    requests.forEach(r => {
      const t = r.recovery_type || "other";
      counts[t] = (counts[t] || 0) + 1;
    });
    const total = requests.length || 1;
    return Object.entries(counts).map(([type, count]) => ({
      type,
      count,
      percent: Math.round((count / total) * 100),
      label: typeConfig[type]?.label || type,
    })).sort((a, b) => b.count - a.count);
  }, [requests]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06090D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#35D6D0] animate-spin" />
          <span className="text-xs font-mono tracking-wider uppercase text-[#8B9AA5]">Loading Case Desk...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06090D] text-[#F1F5F7] flex font-body selection:bg-[#35D6D0]/30 selection:text-[#35D6D0]">
      <AdminSidebar userEmail={user?.email} />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Executive Header Bar */}
        <header className="h-16 border-b border-[#172331] flex items-center justify-between px-4 lg:px-8 sticky top-0 bg-[#06090D]/85 backdrop-blur-md z-10">
          <div className="flex items-center gap-3 pl-12 lg:pl-0">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B9AA5]">Case Operations</span>
            <span className="text-xs text-[#243447]">/</span>
            <h1 className="font-headline font-bold text-sm sm:text-base text-[#F1F5F7] tracking-tight">Triage Desk</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1722] border border-[#1A2838]">
              <div className="w-2 h-2 rounded-full bg-[#35D6D0] animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-[#35D6D0] uppercase tracking-wider">INTAKE DESK ACTIVE</span>
            </div>

            <Button asChild size="sm" className="h-9 gap-1.5 bg-[#35D6D0] hover:bg-[#8AF2E9] text-[#06090D] font-bold text-xs uppercase tracking-wider rounded-xl">
              <Link href="/admin/recovery-files">
                All Files <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
          
          {/* Executive Briefing Banner */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0E1724] via-[#0C121B] to-[#0E1724] border border-[#1C2A3A] shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#35D6D0]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A96B]/10 border border-[#C6A96B]/25 text-[#C6A96B] text-[10px] font-mono uppercase tracking-[0.14em]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A96B]" />
                  OPERATIONAL CASE DISPATCH
                </div>
                <h2 className="text-2xl sm:text-3xl font-headline font-bold text-[#F1F5F7] tracking-tight">
                  Triage Overview &amp; Incident Records
                </h2>
                <p className="text-xs sm:text-sm text-[#8B9AA5] leading-relaxed">
                  Review inbound claimant inquiries, categorize fraud topologies, and organize initial case documentation with evidence integrity.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-[#070C12] border border-[#172331]">
                {[
                  { key: "all", label: "All Intake", count: stats.totalFiles },
                  { key: "pending", label: "Pending", count: stats.pendingFiles },
                  { key: "review", label: "In Review" },
                  { key: "resolved", label: "Resolved" },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      statusFilter === tab.key
                        ? "bg-[#35D6D0] text-[#06090D] shadow-md shadow-[#35D6D0]/20"
                        : "text-[#8B9AA5] hover:text-[#F1F5F7] hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {typeof tab.count === "number" && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        statusFilter === tab.key ? "bg-[#06090D]/20 text-[#06090D]" : "bg-[#172331] text-[#8B9AA5]"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <Card className="bg-[#0C1219] border-[#1A2634] hover:border-[#35D6D0]/40 transition-all duration-300 rounded-2xl shadow-lg group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#35D6D0]/10 border border-[#35D6D0]/25 flex items-center justify-center text-[#35D6D0] group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  {stats.pendingFiles > 0 && (
                    <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[10px] font-mono">
                      {stats.pendingFiles} Actionable
                    </Badge>
                  )}
                </div>
                <div className="text-3xl font-bold font-headline text-[#F1F5F7] tracking-tight">{stats.totalFiles}</div>
                <div className="text-[10px] text-[#8B9AA5] font-mono uppercase tracking-wider mt-1">Total Case Submissions</div>
              </CardContent>
            </Card>

            <Card className="bg-[#0C1219] border-[#1A2634] hover:border-[#C6A96B]/40 transition-all duration-300 rounded-2xl shadow-lg group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C6A96B]/10 border border-[#C6A96B]/25 flex items-center justify-center text-[#C6A96B] group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <Badge className="bg-[#C6A96B]/15 text-[#C6A96B] border-[#C6A96B]/30 text-[10px] font-mono">
                    Disputed
                  </Badge>
                </div>
                <div className="text-3xl font-bold font-headline text-[#F1F5F7] tracking-tight">{stats.totalLoss}</div>
                <div className="text-[10px] text-[#8B9AA5] font-mono uppercase tracking-wider mt-1">Reported Asset Losses</div>
              </CardContent>
            </Card>

            <Card className="bg-[#0C1219] border-[#1A2634] hover:border-[#35D6D0]/40 transition-all duration-300 rounded-2xl shadow-lg group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] font-mono">
                    Under 24h
                  </Badge>
                </div>
                <div className="text-3xl font-bold font-headline text-[#F1F5F7] tracking-tight">Triage Target</div>
                <div className="text-[10px] text-[#8B9AA5] font-mono uppercase tracking-wider mt-1">Initial Response Standard</div>
              </CardContent>
            </Card>

            <Card className="bg-[#0C1219] border-[#1A2634] hover:border-[#35D6D0]/40 transition-all duration-300 rounded-2xl shadow-lg group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/30 text-[10px] font-mono">
                    Published
                  </Badge>
                </div>
                <div className="text-3xl font-bold font-headline text-[#F1F5F7] tracking-tight">{stats.proofs} Proofs</div>
                <div className="text-[10px] text-[#8B9AA5] font-mono uppercase tracking-wider mt-1">Verified Public Assets</div>
              </CardContent>
            </Card>
          </div>

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Recent Intake Table (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#F1F5F7]">Recent Case Inquiries</h3>
                  <p className="text-xs text-[#8B9AA5]">Direct submissions through the public forensic recovery intake form.</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B9AA5]" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, ID..." 
                    className="pl-8 h-9 bg-[#0E1722] border-[#1A2838] text-xs text-[#F1F5F7] placeholder:text-[#637587] focus:border-[#35D6D0] rounded-xl"
                  />
                </div>
              </div>

              <Card className="bg-[#0C1219] border-[#172331] rounded-2xl overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-[#172331] bg-[#0A0F16]/70 hover:bg-transparent">
                          <TableHead className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B9AA5] py-3.5">Case ID</TableHead>
                          <TableHead className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B9AA5] py-3.5">Claimant</TableHead>
                          <TableHead className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B9AA5] py-3.5">Fraud Category</TableHead>
                          <TableHead className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B9AA5] py-3.5">Loss Est.</TableHead>
                          <TableHead className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B9AA5] py-3.5">Status</TableHead>
                          <TableHead className="text-right py-3.5"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRequests.slice(0, 8).map((req) => {
                          const catInfo = typeConfig[req.recovery_type] || { label: req.recovery_type, badgeClass: "bg-white/5 text-[#8B9AA5] border-white/10" };
                          const isPending = req.status === "Pending" || !req.status;
                          return (
                            <TableRow 
                              key={req.id} 
                              className="border-b border-[#172331]/60 hover:bg-[#111A24]/50 group transition-colors cursor-pointer"
                              onClick={() => setSelectedCase(req)}
                            >
                              <TableCell className="font-mono text-[11px] font-bold text-[#35D6D0] uppercase">
                                MK-{req.id.slice(0, 4)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-lg bg-[#14202C] border border-[#243447] flex items-center justify-center text-[10px] font-bold text-[#F1F5F7]">
                                    {(req.full_name?.[0] || "C").toUpperCase()}
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-semibold text-[#F1F5F7] truncate">{req.full_name || "Anonymous"}</span>
                                    <span className="text-[10px] text-[#8B9AA5] truncate">{req.email || "No email"}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={`text-[10px] font-normal border ${catInfo.badgeClass}`}>
                                  {catInfo.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-mono text-xs font-semibold text-[#C6A96B]">
                                {req.estimated_value ? `$${req.estimated_value}` : "Unspecified"}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5">
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isPending ? "bg-amber-400 animate-pulse" : req.status === "Resolved" ? "bg-emerald-400" : "bg-[#35D6D0]"
                                  }`} />
                                  <span className="text-xs text-[#8B9AA5] font-medium">{req.status || "Pending"}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8B9AA5] group-hover:text-[#35D6D0] hover:bg-[#35D6D0]/10 rounded-lg">
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        {filteredRequests.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-[#8B9AA5] text-xs">
                              <AlertCircle className="w-8 h-8 text-[#8B9AA5] mx-auto mb-2 opacity-50" />
                              No intake submissions found matching the criteria.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Desk Tools & Distribution (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Scam Type Distribution Widget */}
              <Card className="bg-[#0C1219] border-[#172331] rounded-2xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-headline font-bold text-[#F1F5F7]">Fraud Category Split</CardTitle>
                  <CardDescription className="text-xs text-[#8B9AA5]">Proportion of inbound claims by incident type.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scamDistribution.slice(0, 5).map(item => (
                    <div key={item.type} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#F1F5F7] font-medium truncate max-w-[180px]">{item.label}</span>
                        <span className="font-mono text-[#35D6D0] text-[11px]">{item.percent}% ({item.count})</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#111A24] overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#35D6D0] to-[#8AF2E9]" 
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  {scamDistribution.length === 0 && (
                    <div className="text-center py-6 text-xs text-[#8B9AA5]">
                      No categories registered yet.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Administrative Shortcuts */}
              <Card className="bg-[#0C1219] border-[#172331] rounded-2xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-headline font-bold text-[#F1F5F7]">Quick Desk Actions</CardTitle>
                  <CardDescription className="text-xs text-[#8B9AA5]">Shortcuts to manage public intelligence assets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link 
                    href="/admin/articles"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0E1722] hover:bg-[#14202D] border border-[#1A2838] hover:border-[#35D6D0]/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2.5 text-[#F1F5F7]">
                      <BookOpen className="w-4 h-4 text-[#35D6D0]" />
                      <span>Write Knowledge Article</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8B9AA5] group-hover:text-[#35D6D0] group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link 
                    href="/admin/forensic-results"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0E1722] hover:bg-[#14202D] border border-[#1A2838] hover:border-[#C6A96B]/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2.5 text-[#F1F5F7]">
                      <ShieldCheck className="w-4 h-4 text-[#C6A96B]" />
                      <span>Publish Recovery Proof</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8B9AA5] group-hover:text-[#C6A96B] group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <Link 
                    href="/admin/trust-assets"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0E1722] hover:bg-[#14202D] border border-[#1A2838] hover:border-cyan-400/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2.5 text-[#F1F5F7]">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <span>Update Institutional Assets</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8B9AA5] group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </CardContent>
              </Card>

              {/* Standards of Integrity Card */}
              <div className="p-4 rounded-2xl bg-[#0C1219] border border-[#172331] text-[11px] text-[#8B9AA5] space-y-2">
                <div className="flex items-center gap-1.5 text-[#C6A96B] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mickydons Operating Standard
                </div>
                <p className="leading-relaxed">
                  Every inquiry is handled with confidentiality. Never make guaranteed recovery claims; base all reviews strictly on chain evidence.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Case Dossier Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="max-w-2xl bg-[#0C1219] border-[#1A2838] text-[#F1F5F7] overflow-y-auto max-h-[90vh] rounded-3xl p-6 sm:p-8">
          {selectedCase && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-[#35D6D0] font-mono font-bold text-xs uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    Case Dossier MK-{selectedCase.id.slice(0, 4)}
                  </div>
                  <button 
                    onClick={() => copyCaseRef(selectedCase.id)}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#8B9AA5] hover:text-[#35D6D0] transition-colors"
                  >
                    {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId ? "Copied" : "Copy Ref"}</span>
                  </button>
                </div>
                <DialogTitle className="text-2xl font-headline font-bold text-[#F1F5F7]">
                  {selectedCase.full_name || "Anonymous Intake"}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8B9AA5] mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(selectedCase.created_at).toLocaleString()}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#14202C] border border-[#243447] text-[#35D6D0]">
                    Status: {selectedCase.status || "Pending"}
                  </span>
                </DialogDescription>
              </DialogHeader>

              {/* Case Stats Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0E1722] border border-[#1A2838]">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#8B9AA5]">Reported Loss</div>
                  <div className="text-xl font-bold font-mono text-[#C6A96B] mt-1">
                    {selectedCase.estimated_value ? `$${selectedCase.estimated_value}` : "Unstated"}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#0E1722] border border-[#1A2838]">
                  <div className="text-[10px] font-mono uppercase font-bold text-[#8B9AA5]">Incident Category</div>
                  <div className="text-base font-semibold text-[#35D6D0] mt-1">
                    {typeConfig[selectedCase.recovery_type]?.label || selectedCase.recovery_type}
                  </div>
                </div>
              </div>

              {/* Claimant Contact Details */}
              <div className="p-4 rounded-xl bg-[#0E1722] border border-[#1A2838] space-y-2">
                <div className="text-[10px] font-mono uppercase font-bold text-[#8B9AA5] mb-2">Claimant Contact Details</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#F1F5F7]">
                    <Mail className="w-3.5 h-3.5 text-[#35D6D0]" />
                    <span>{selectedCase.email || "No email provided"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#F1F5F7]">
                    <Phone className="w-3.5 h-3.5 text-[#C6A96B]" />
                    <span>{selectedCase.phone || "No phone provided"}</span>
                  </div>
                </div>
              </div>

              {/* Incident Narrative / Evidence Notes */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase font-bold text-[#8B9AA5]">Incident Narrative &amp; Information</div>
                <div className="p-4 rounded-xl bg-[#070B10] border border-[#172331] text-xs text-[#E2E8F0] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {selectedCase.description || "No narrative details provided in initial intake form."}
                </div>
              </div>

              {/* Status Update Quick Bar */}
              <div className="p-4 rounded-xl bg-[#0E1722] border border-[#1A2838] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#8B9AA5]">Change Case Status:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Pending", "Under Review", "Investigating", "Resolved"].map(status => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedCase.status === status ? "default" : "outline"}
                      disabled={isUpdatingStatus || selectedCase.status === status}
                      onClick={() => handleUpdateStatus(selectedCase.id, status)}
                      className={`h-7 text-[11px] rounded-lg ${
                        selectedCase.status === status 
                          ? "bg-[#35D6D0] text-[#06090D] font-bold" 
                          : "border-[#1A2838] bg-[#070B10] text-[#8B9AA5] hover:text-[#F1F5F7]"
                      }`}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-[#172331] flex flex-col sm:flex-row items-center justify-between gap-3">
                {selectedCase.email && (
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto h-9 text-xs border-[#1A2838] bg-[#070B10] text-[#35D6D0] hover:bg-[#0E1722]">
                    <a href={`mailto:${selectedCase.email}?subject=Mickydons Case Assessment MK-${selectedCase.id.slice(0, 4)}`}>
                      <Mail className="w-3.5 h-3.5 mr-1.5" /> Email Claimant
                    </a>
                  </Button>
                )}
                <Button 
                  onClick={() => setSelectedCase(null)} 
                  variant="secondary" 
                  size="sm" 
                  className="w-full sm:w-auto h-9 text-xs bg-[#14202C] text-[#F1F5F7] hover:bg-[#1A2838]"
                >
                  Close Dossier
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
