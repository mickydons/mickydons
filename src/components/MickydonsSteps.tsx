import { ClipboardList, Search, Activity, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Tell us what happened",
    description: "Complete a short case assessment. You don't need to know exactly what went wrong.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "We review the evidence",
    description: "We look at the information you provide and determine what can be investigated.",
    icon: Search,
  },
  {
    step: "03",
    title: "We investigate the trail",
    description: "We examine available transaction, communication and digital evidence.",
    icon: Activity,
  },
  {
    step: "04",
    title: "You receive a clear action plan",
    description: "We explain what we found, what can be reported or pursued, and what your next steps are.",
    icon: CheckCircle2,
  },
];

export function MickydonsSteps() {
  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
            HOW RECOVERY WORKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-4 text-[#F1F5F7]">
            What happens <br className="hidden sm:inline" />
            <span className="text-[#35D6D0]">after you contact us?</span>
          </h2>
          <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed max-w-2xl mx-auto">
            We make every stage clear, transparent, and pressure-free. Here is how your case proceeds from the moment you reach out.
          </p>
        </div>

        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-[#24313D] -translate-y-1/2 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center relative group">
                <div className="w-20 h-20 rounded-full bg-[#111C26] border-2 border-[#24313D] flex items-center justify-center mb-6 group-hover:border-[#35D6D0]/60 transition-all shadow-xl">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#35D6D0] text-[#06090D] text-xs font-bold flex items-center justify-center shadow-lg font-mono">
                    {step.step}
                  </span>
                  <step.icon className="w-8 h-8 text-[#35D6D0]" />
                </div>
                <h3 className="text-[17px] font-body font-semibold mb-2 text-[#F1F5F7]">{step.title}</h3>
                <p className="text-[#8B9AA5] text-[14px] max-w-[240px] leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#111C26] border border-[#24313D]">
            <Clock className="w-5 h-5 text-[#35D6D0]" />
            <span className="text-[14px] font-body font-medium text-[#8B9AA5]">
              <strong className="text-[#F1F5F7]">Rapid Assessment:</strong> Initial file review completed in under 24 hours.
            </span>
          </div>

          <Button size="lg" asChild className="px-8 h-14 font-body text-[13px] sm:text-[14px] font-bold tracking-wide uppercase bg-[#35D6D0] text-[#06090D] hover:bg-[#8AF2E9] shadow-xl shadow-[#35D6D0]/25 transition-all hover:scale-105 rounded-xl border border-[#8AF2E9]/40">
            <Link href="#request" className="flex items-center gap-2">
              Start My Case Assessment <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
