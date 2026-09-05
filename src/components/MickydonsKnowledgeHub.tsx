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

  // Sanitize any em dashes into clean punctuation
  const cleanText = text.replace(/—/g, ', ');

  // Split by double newlines for paragraphs first
  const paragraphs = cleanText.split(/\n\n+/);

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

const getReadTime = (post: any) => {
  if (post?.readTime) return post.readTime;
  if (!post?.content) return "4 min read";
  const words = post.content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

export function MickydonsKnowledgeHub() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsPostsLoading(true);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setPosts(data);
      } else {
        setPosts([]);
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
        ) : posts.length === 0 ? (
          <div className="text-center py-16 px-4 border border-[#24313D] rounded-2xl bg-[#111C26]/50 mb-16">
            <BookOpen className="w-10 h-10 text-[#35D6D0] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-headline font-semibold text-[#F1F5F7] mb-1">No guides published yet</h3>
            <p className="text-sm text-[#8B9AA5] max-w-md mx-auto">
              Our case specialists publish regular fraud breakdowns and recovery guides. Check back soon or submit a case assessment directly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => {
              const isAlert = post.category === "Secondary Fraud Alert" || post.category === "Fraud Alert";
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
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        unoptimized={true}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0C131B] text-[#35D6D0]/40">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
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
                      <span className="text-xs text-[#8B9AA5] font-medium">{getReadTime(post)}</span>
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
          {posts.length > 6 && (
            <Button variant="outline" size="lg" className="px-8 h-14 font-body text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider border-[#24313D] bg-[#0C131B] text-[#F1F5F7] hover:bg-[#111C26] hover:border-[#35D6D0]/50 rounded-xl">
              Load More Articles
            </Button>
          )}
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
