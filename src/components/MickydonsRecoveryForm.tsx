"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Send, 
  Sparkles, 
  Loader2, 
  Phone, 
  ShieldAlert, 
  Key, 
  Landmark, 
  Zap, 
  ArrowLeft, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Mail,
  User,
  Activity,
  FileText,
  Wallet,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { aiDraftRecoveryMessage } from "@/ai/flows/ai-draft-recovery-message";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(6, "Invalid phone number."),
  recoveryType: z.string().min(1, "Please select a recovery type."),
  estimatedValue: z.string().min(1, "Please estimate the value."),
  message: z.string().min(20, "Please provide more details (min 20 chars)."),
});

const funnelOptions = [
  { id: "investment", label: "Investment Scam", icon: TrendingUp, description: "Fraudulent platforms, fake yield or liquidity schemes." },
  { id: "broker", label: "Bad Broker", icon: Landmark, description: "Unregulated brokers, frozen accounts or withdrawal refusals." },
  { id: "trading", label: "Trading Scam", icon: Activity, description: "Manipulated apps, fake exchanges and high-pressure tactics." },
  { id: "romance", label: "Romance Scam", icon: ShieldCheck, description: "Pig-butchering and relationship-based crypto fraud." },
  { id: "loan", label: "Loan Scam", icon: FileText, description: "Advanced fee fraud and fraudulent lending traps." },
  { id: "wallet", label: "Wallet Recovery", icon: Wallet, description: "Lost seed phrases, forgotten passwords or device failure." },
  { id: "crypto-assets", label: "Assets Recovery", icon: Zap, description: "Stolen NFTs, DeFi exploits and cross-chain asset loss." },
];

export function MickydonsRecoveryForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0); 
  const [isDrafting, setIsDrafting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      recoveryType: "",
      estimatedValue: "",
      message: "",
    },
  });

  const progress = step === 0 ? 33 : step === 1 ? 66 : 100;
  const stepLabel = step < 2 ? "Step 1 of 2: Lab Assessment (30s)" : "Step 2 of 2: Technical Summary (1m)";

  const handleSelectType = (id: string) => {
    form.setValue("recoveryType", id);
    setStep(1);
  };

  const handleNextToFinal = async () => {
    const isValidValue = await form.trigger("estimatedValue");
    if (isValidValue) {
      setStep(2);
    }
  };

  const handleAIDraft = async () => {
    const recoveryType = form.getValues("recoveryType");
    const estimatedValue = form.getValues("estimatedValue");
    const userMessage = form.getValues("message");

    if (!userMessage || userMessage.length < 10) {
      toast({
        title: "More Details Needed",
        description: "Please enter a brief description of your situation first.",
        variant: "destructive",
      });
      return;
    }

    setIsDrafting(true);
    try {
      const result = await aiDraftRecoveryMessage({
        recoveryType,
        estimatedValue: estimatedValue || "Unknown",
        userMessage,
      });
      form.setValue("message", result.draftedMessage);
      toast({
        title: "Forensic Analysis Complete",
        description: "Technical report enhanced for investigative review.",
      });
    } catch (error) {
      toast({
        title: "Lab Assistant Error",
        description: "Could not process technical data at this time.",
        variant: "destructive",
      });
    } finally {
      setIsDrafting(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('recovery_requests')
        .insert([{
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          recovery_type: values.recoveryType,
          estimated_value: values.estimatedValue,
          message: values.message,
          status: 'Pending'
        }]);

      if (error) throw error;

      toast({
        title: "Forensic Intake Initiated",
        description: "A lead analyst will review your encrypted file and contact you in < 24h.",
      });
      
      form.reset();
      setStep(0);
    } catch (error: any) {
      toast({
        title: "Transmission Failed",
        description: "The secure uplink failed. Please try again or email the lab directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="request" className="py-24 bg-gradient-to-b from-transparent to-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
              CASE ASSESSMENT
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
              Start with <br className="hidden sm:inline" />
              <span className="text-[#35D6D0]">what you know.</span>
            </h2>
            <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed max-w-2xl mx-auto">
              You don&apos;t need to have all the answers before you contact us. Give us the information you have, and we&apos;ll help organize the case.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Authority & Trust */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-3xl bg-[#111C26] border border-[#24313D] shadow-xl">
                <div className="flex items-center gap-3 text-[#35D6D0] font-bold mb-4">
                  <ShieldCheck className="w-6 h-6 text-[#35D6D0]" />
                  What to Expect
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#35D6D0] shrink-0" />
                    <span className="text-sm text-[#F1F5F7]">End-to-end encrypted communication via secure Swiss servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#35D6D0] shrink-0" />
                    <span className="text-sm text-[#F1F5F7]">Completely free initial review with no obligations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C6A96B] shrink-0" />
                    <span className="text-sm text-[#C6A96B] font-medium">Direct review by experienced blockchain investigators.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#0C131B] border border-[#24313D]">
                <h3 className="font-bold text-lg mb-3 text-[#F1F5F7]">Confidential Case Assessment</h3>
                <p className="text-sm text-[#8B9AA5] leading-relaxed mb-4">
                  All details you share are treated with strict confidentiality. An investigator will review the information provided to identify any actionable digital trail.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-[#35D6D0]">
                  <Activity className="w-4 h-4 text-[#35D6D0]" />
                  Encrypted &amp; Access-Controlled
                </div>
              </div>
            </div>

            {/* Right Column: Funnel Form */}
            <div className="lg:col-span-8">
              <div className="p-8 rounded-3xl bg-[#111C26] border border-[#24313D] shadow-2xl relative overflow-hidden">
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-[#35D6D0] uppercase tracking-wider">{stepLabel}</span>
                    <span className="text-xs text-[#8B9AA5]">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-1.5 bg-[#0C131B]" />
                </div>

                {step === 0 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-2xl font-headline font-bold mb-2 text-[#F1F5F7]">Case Categorization</h3>
                    <p className="text-[#8B9AA5] mb-8 text-sm">Select the technical category that best describes your loss situation.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {funnelOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectType(opt.id)}
                          className="flex flex-col items-start p-6 rounded-2xl bg-[#0C131B] border border-[#24313D] hover:border-[#35D6D0]/60 hover:bg-[#0C131B]/80 transition-all group text-left"
                        >
                          <div className="p-3 rounded-xl bg-[#35D6D0]/10 text-[#35D6D0] mb-4 group-hover:scale-110 group-hover:bg-[#35D6D0] group-hover:text-[#06090D] transition-all duration-300">
                            <opt.icon className="w-6 h-6" />
                          </div>
                          <div className="font-bold mb-1 text-[#F1F5F7]">{opt.label}</div>
                          <div className="text-xs text-[#8B9AA5] leading-relaxed line-clamp-2">{opt.description}</div>
                          <div className="mt-4 text-xs font-bold text-[#35D6D0] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Categorize <ChevronRight className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button 
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex items-center gap-2 text-sm text-[#8B9AA5] hover:text-[#35D6D0] mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Categorization
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6 text-[#F1F5F7]">Valuation Analysis</h3>
                    
                    <Form {...form}>
                      <div className="space-y-8">
                        <FormField
                          control={form.control}
                          name="estimatedValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-semibold flex items-center gap-2 text-[#F1F5F7]">
                                <TrendingUp className="w-5 h-5 text-[#35D6D0]" />
                                Estimated Amount Lost (USD)
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9AA5] font-bold font-mono">$</span>
                                  <Input placeholder="e.g. 50,000" className="h-16 pl-8 text-2xl font-bold font-mono bg-[#0C131B] border-[#24313D] text-[#F1F5F7] focus:border-[#35D6D0]" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button onClick={handleNextToFinal} className="w-full h-16 text-base md:text-lg font-bold bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 rounded-xl transition-all hover:scale-[1.01] border border-[#8AF2E9]/40">
                          Continue to Case Details <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-sm text-[#8B9AA5] hover:text-[#35D6D0] mb-6 transition-colors font-body"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Amount
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6 text-[#F1F5F7]">Contact & Case Details</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-[#F1F5F7]">
                                  <User className="w-4 h-4 text-[#35D6D0]" /> Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} className="bg-[#0C131B] border-[#24313D] text-[#F1F5F7] focus:border-[#35D6D0]" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-[#F1F5F7]">
                                  <Mail className="w-4 h-4 text-[#35D6D0]" /> Email Address
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" {...field} className="bg-[#0C131B] border-[#24313D] text-[#F1F5F7] focus:border-[#35D6D0]" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-[#F1F5F7]">
                                <Phone className="w-4 h-4 text-[#35D6D0]" /> Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="+1..." {...field} className="bg-[#0C131B] border-[#24313D] text-[#F1F5F7] focus:border-[#35D6D0]" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-[#F1F5F7]">Tell Us What Happened</FormLabel>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 text-[#35D6D0] gap-1.5 px-2 hover:bg-[#35D6D0]/10 hover:text-[#8AF2E9]"
                                  onClick={handleAIDraft}
                                  disabled={isDrafting}
                                >
                                  {isDrafting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-[#35D6D0]" />}
                                  AI Description Assistant
                                </Button>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Explain what platform, broker, or individual you interacted with, and what occurred. Include transaction hashes (TXIDs) or website links if available." 
                                  className="min-h-[140px] bg-[#0C131B] border-[#24313D] text-[#F1F5F7] focus:border-[#35D6D0]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full h-16 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 rounded-xl transition-all hover:scale-[1.01] border border-[#8AF2E9]/40"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>Submitting Case Details... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
                          ) : (
                            <>Submit Case for Initial Review <Send className="ml-2 w-4 h-4" /></>
                          )}
                        </Button>
                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#8B9AA5]">
                          <Lock className="w-3.5 h-3.5 text-[#35D6D0]" />
                          <span>Your information is treated confidentially.</span>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
