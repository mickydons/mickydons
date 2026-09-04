"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, Loader2, FileText, ShieldCheck, BookOpen, ShieldAlert, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { aiAnswerKnowledgeQuestion } from "@/ai/flows/ai-answer-knowledge-question";

const iconMap = {
  "Security": ShieldAlert,
  "Recovery": BookOpen,
  "Legal": Zap,
};

// Helper to render formatted text (bold and accent colors)
const TechnicalRenderer = ({ text }: { text: string }) => {
  if (!text) return null;

  // Split by double newlines for paragraphs first
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-4">
      {paragraphs.map((p, idx) => {
        // Convert literal \n to real line breaks if they exist
        const sanitizedP = p.replace(/\\n/g, '\n');
        
        // Split by lines within paragraph
        const lines = sanitizedP.split('\n');

        return (
          <p key={idx} className="text-base text-foreground/90 leading-relaxed">
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {line.split(/(\*\*.*?\*\*|\[accent\].*?\[\/accent\])/).map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('[accent]') && part.endsWith('[/accent]')) {
                    return <span key={pIdx} className="text-accent font-bold">{part.slice(8, -9)}</span>;
                  }
                  return part;
                })}
                {lIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

const defaultGuides = [
  {
    id: "guide-1",
    title: "I Lost Crypto to a Scam. What Should I Do First?",
    category: "Emergency Action",
    description: "Crucial first-response steps to prevent further wallet compromises and secure the digital evidence before transaction trails fade.",
    image_url: "https://picsum.photos/seed/mkguide1/600/400",
    readTime: "4 min read",
    content: `**Immediate Actions (First 24 Hours)**\n\nWhen cryptocurrency is sent to an unauthorized or fraudulent address, speed is vital. The first response must prioritize containment:\n\n1. **Revoke Token Approvals Immediately**: If you signed a malicious smart contract approval, disconnect your wallet from all decentralized applications using revoking tools or move any remaining uncompromised assets to a newly generated cold wallet.\n\n2. **Preserve Exact Transaction Hashes (TXIDs)**: Copy the transaction hashes, sending addresses, and receiving addresses directly from the blockchain explorer (Etherscan, BscScan, etc.). Do not rely solely on screenshot views.\n\n3. **Cease All Contact with the Scammer**: Do not alert the scammer that you suspect fraud while you are archiving chat logs. Any sudden confrontation may cause them to delete messaging channels or burner websites.\n\n4. **Never Pay "Withdrawal Fees" or "Taxes"**: Scammers will insist that paying a final 10%–20% fee will release your locked balance. This is an advance-fee trap; no funds will be released.`,
  },
  {
    id: "guide-2",
    title: "How to Tell if an Investment Platform Is Fake",
    category: "Fraud Detection",
    description: "Key red flags that expose fabricated trading dashboards, simulated account balances, and unbonded offshore entities.",
    image_url: "https://picsum.photos/seed/mkguide2/600/400",
    readTime: "5 min read",
    content: `**Understanding Simulated Trading Platforms**\n\nMany investment scams create convincing web platforms displaying live charts, growing balances, and trading logs. In reality, no actual trading occurs—the numbers are manually controlled by the fraudsters.\n\n**Common Red Flags:**\n\n- **Guaranteed Returns**: Legitimate financial investments never guarantee fixed daily or weekly yields (e.g. "2% daily ROI").\n- **Recently Registered Domain**: Fraudulent platforms frequently cycle domains every 60–90 days. A WHOIS lookup showing a domain registered only months ago claiming decades of history is a major alert.\n- **Fake Regulatory Licenses**: Scammers paste forged certificates from regulatory bodies like the FCA, FINMA, or SEC, often using stolen corporate numbers from real firms.\n- **Blocked Withdrawals**: When you attempt to withdraw profits, the platform demands extra payments for "liquidity verification," "anti-money laundering fees," or "capital gains tax."`,
  },
  {
    id: "guide-3",
    title: "Someone Online Asked Me for Money. Could It Be a Romance Scam?",
    category: "Social Engineering",
    description: "Understanding relationship-based financial fraud (pig butchering) and why emotional manipulation precedes the financial trap.",
    image_url: "https://picsum.photos/seed/mkguide3/600/400",
    readTime: "6 min read",
    content: `**The Mechanics of 'Pig Butchering' (Sha Zhu Pan)**\n\nRomance and relationship scams rarely ask for money right away. Fraudsters invest weeks or months building trust, affection, and emotional intimacy.\n\n**How the Trap Develops:**\n\n1. **The 'Wrong Number' or Dating App Introduction**: The fraudster appears friendly, wealthy, and charismatic, quickly steering the conversation to encrypted messaging apps like WhatsApp or Telegram.\n2. **The Passive Flex**: They casually mention their financial success, attributing it to an uncle, mentor, or proprietary trading bot with "inside knowledge."\n3. **The Small Test Deposit**: They invite you to test a platform with $500 or $1,000, allowing you to withdraw a small profit to make the platform feel legitimate.\n4. **The Major Loss**: Once you invest significant savings or take out loans, the platform freezes, the mentors disappear, and demands for unlock fees begin.\n\n**Key Rule**: If someone you have never met in person advises you to invest in cryptocurrency, it is almost certainly a scam.`,
  },
  {
    id: "guide-4",
    title: "Can Stolen Cryptocurrency Be Traced?",
    category: "Digital Forensics",
    description: "How blockchain ledgers record every transaction hop, and why mixers and privacy tools do not provide total anonymity.",
    image_url: "https://picsum.photos/seed/mkguide4/600/400",
    readTime: "4 min read",
    content: `**Public Ledgers vs. Anonymity Myth**\n\nOne of the most persistent misconceptions about cryptocurrency is that it is completely anonymous. In truth, major blockchains (Bitcoin, Ethereum, Tron, Solana) are **pseudonymous, immutable public ledgers**.\n\n**How Tracing Works:**\n\n- **Every Hop Is Permanent**: When a scammer moves funds through 5, 10, or 20 intermediary wallets to obscure the trail, every single transaction hash is permanently logged on-chain.\n- **Clustering Heuristics**: Forensic analysis connects disparate wallet addresses by examining transaction patterns, fee inputs, and shared spending behavior.\n- **Centralized Exchange Off-Ramps**: Scammers cannot spend raw cryptocurrency in the real world indefinitely; they must deposit to centralized exchanges (CEXs) that enforce Know-Your-Customer (KYC) identity verification.\n- **Attribution**: Once a deposit address is identified at an exchange, official legal subpoenas can link the digital trail to real-world identities, IP addresses, and bank accounts.`,
  },
  {
    id: "guide-5",
    title: "What Evidence Should I Save After a Scam?",
    category: "Evidence Preservation",
    description: "A complete checklist of records, TXIDs, wire receipts, platform URLs, and chat logs required for legal and police reports.",
    image_url: "https://picsum.photos/seed/mkguide5/600/400",
    readTime: "3 min read",
    content: `**Building an Actionable Evidence File**\n\nWhen reporting fraud to police agencies, banks, or blockchain intelligence teams, the quality and structure of your evidence determines the speed of response:\n\n**Essential Evidence Checklist:**\n\n- **Transaction Records**: Export CSV logs and record the exact TXID (hash), date/time, sending wallet, and destination wallet for every outgoing transfer.\n- **Complete Unedited Chat Logs**: Export full chat exports from WhatsApp, Telegram, or email with visible timestamps, profile IDs, and phone numbers. Do not delete any conversation threads.\n- **Platform URLs & Account Screenshots**: Save the exact web addresses of the fraudulent platforms, account dashboards showing deposited balances, and deposit instructions.\n- **Bank & Wire Receipts**: Document fiat-to-crypto on-ramps (e.g., transfers to Coinbase, Kraken, or Binance) with bank statement references.\n- **Save in Original Quality**: Do not crop screenshots; preserve full browser bars and phone notification trays where possible.`,
  },
  {
    id: "guide-6",
    title: "I Paid a Recovery Company Already. Could That Be Another Scam?",
    category: "Secondary Fraud Alert",
    description: "Warning signs of secondary recovery scams that specifically prey on previous fraud victims with fake recovery promises.",
    image_url: "https://picsum.photos/seed/mkguide6/600/400",
    readTime: "5 min read",
    content: `**The Danger of Recovery Room Fraud**\n\nVictims who have lost funds online are frequently placed on 'sucker lists' and targeted by secondary recovery scammers. These fraudsters often pose as ethical hackers, international recovery lawyers, or government task forces claiming they have already seized your funds.\n\n**How to Spot a Secondary Recovery Scam:**\n\n- **Unsolicited Contact**: Someone contacts you on Telegram, Instagram, or email claiming they saw your post or tracked your stolen funds without you contacting them.\n- **Guaranteed Money Back**: They guarantee that 100% of your funds can be 'hacked back' or reversed from the blockchain. No legitimate entity can alter blockchain history.\n- **Demands for Upfront Crypto Fees**: They ask you to pay an 'activation code,' 'tax fee,' or 'server deposit' before releasing your supposed recovered funds.\n- **Impersonating Regulatory Officials**: They send official-looking PDF certificates bearing FBI, Interpol, or FCA seals demanding payment.\n\n**Mickydons Standard**: We never guarantee recovery, never charge fees to 'unlock' recovered funds, and never conduct unsolicited outreach on social media.`,
  },
];

export function MickydonsKnowledgeHub() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>(defaultGuides);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data && data.length > 0) {
        // Merge or set posts
        setPosts([...defaultGuides, ...data]);
      } else {
        setPosts(defaultGuides);
      }
      setIsPostsLoading(false);
    };
    fetchPosts();
  }, []);

  const handleAskAI = async () => {
    if (!question) return;
    setIsLoading(true);
    setAiAnswer("");
    try {
      const result = await aiAnswerKnowledgeQuestion({
        question,
        contextArticles: posts.map(p => p.description),
      });
      setAiAnswer(result.answer);
    } catch (error) {
      setAiAnswer("Sorry, I couldn't find an answer to that. Please contact our triage desk directly for case review.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog" className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
              SCAM RECOVERY GUIDE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
              Scam Recovery <br className="hidden sm:inline" />
              <span className="text-[#35D6D0]">Guide.</span>
            </h2>
            <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed">
              Straightforward answers for people trying to understand what happened and what to do next.
            </p>
          </div>
          
          <div className="w-full lg:max-w-md p-6 rounded-2xl bg-[#111C26] border border-[#24313D] backdrop-blur-sm shadow-xl">
            <div className="flex items-center gap-2 text-[#35D6D0] font-body font-bold text-sm mb-4">
              <Sparkles className="w-4 h-4 text-[#35D6D0]" />
              Ask our AI Investigator
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="e.g. How do I tell if a platform is fake?" 
                className="bg-[#0C131B] border-[#24313D] text-[#F1F5F7] text-sm focus:border-[#35D6D0]" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <Button size="icon" onClick={handleAskAI} disabled={isLoading} className="bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9]">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {aiAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-[#0C131B] border border-[#24313D] text-sm animate-in fade-in slide-in-from-top-2 text-[#F1F5F7] leading-relaxed">
                {aiAnswer}
              </div>
            )}
          </div>
        </div>

        {isPostsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#35D6D0] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => {
              const isAlert = post.category === "Secondary Fraud Alert";
              return (
                <Card 
                  key={post.id} 
                  className={`bg-[#111C26] overflow-hidden group transition-all cursor-pointer rounded-2xl shadow-xl flex flex-col justify-between ${
                    isAlert 
                      ? "border-[#EF4444]/40 hover:border-[#EF4444] bg-gradient-to-b from-[#111C26] to-[#EF4444]/5" 
                      : "border-[#24313D] hover:border-[#35D6D0]/50"
                  }`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative aspect-video overflow-hidden bg-[#0C131B]">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-body font-bold uppercase tracking-wider ${
                      isAlert 
                        ? "bg-[#EF4444] text-[#F1F5F7]" 
                        : "bg-[#35D6D0] text-[#06090D]"
                    }`}>
                      {post.category}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-[17px] font-body font-semibold mb-3 transition-colors ${
                        isAlert ? "text-[#F1F5F7] group-hover:text-[#EF4444]" : "text-[#F1F5F7] group-hover:text-[#35D6D0]"
                      }`}>
                        {post.title}
                      </h3>
                      <p className="text-[#8B9AA5] font-body text-[14px] leading-relaxed mb-6 line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#24313D]/60">
                      <span className="text-xs text-[#8B9AA5] font-medium">{post.readTime || "4 min read"}</span>
                      <span className={`flex items-center gap-1.5 font-body text-[13px] font-semibold transition-all group-hover:gap-2.5 ${
                        isAlert ? "text-[#EF4444]" : "text-[#35D6D0]"
                      }`}>
                        Read guide <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button variant="outline" size="lg" className="px-8 h-14 font-body text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider border-[#24313D] bg-[#0C131B] text-[#F1F5F7] hover:bg-[#111C26] hover:border-[#35D6D0]/50 rounded-xl">
            Load More Articles
          </Button>
          <Button size="lg" asChild className="px-8 h-14 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 rounded-xl border border-[#8AF2E9]/40 transition-all hover:scale-105">
            <Link href="#request" className="flex items-center gap-2">
              Start a Free Case Assessment <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl bg-[#111C26] border-[#24313D] text-[#F1F5F7] overflow-y-auto max-h-[90vh]">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-[#35D6D0] font-bold text-xs uppercase tracking-widest mb-2">
                  <BookOpen className="w-4 h-4 text-[#35D6D0]" />
                  {selectedPost.category} Guidance
                </div>
                <DialogTitle className="text-2xl lg:text-3xl font-headline font-bold leading-tight text-[#F1F5F7]">
                  {selectedPost.title}
                </DialogTitle>
                <DialogDescription className="text-[#8B9AA5] text-base mt-2">
                  {selectedPost.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <TechnicalRenderer text={selectedPost.content} />
              </div>
              <div className="mt-8 pt-6 border-t border-[#24313D] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#8B9AA5] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#35D6D0]" />
                  Verified Forensic Insight
                </div>
                <Button onClick={() => setSelectedPost(null)} variant="secondary" className="w-full sm:w-auto bg-[#0C131B] text-[#F1F5F7] hover:bg-[#24313D]">
                  Close Article
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
