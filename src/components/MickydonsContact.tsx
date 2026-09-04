import { Mail, Clock, CheckCircle2 } from "lucide-react";

const benefits = [
  "Free, confidential initial case assessment",
  "Clear, honest appraisal before you commit",
  "Independent on-chain transaction tracing",
  "Official evidence packets for police & exchange teams",
  "24/7 dedicated intake and case response",
];

export function MickydonsContact() {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35D6D0]/10 border border-[#35D6D0]/25 text-[#35D6D0] text-[12px] md:text-[13px] font-body font-semibold uppercase tracking-[0.12em] mb-4">
              DIRECT INVESTIGATIVE ACCESS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-headline font-normal leading-[1.15] tracking-tight mb-6 text-[#F1F5F7]">
              Need immediate answers? <br className="hidden sm:inline" />
              <span className="text-[#35D6D0]">Speak with an investigator.</span>
            </h2>
            <p className="text-[#8B9AA5] text-[15px] sm:text-[17px] font-body font-normal leading-relaxed mb-8">
              Every online scam leaves a digital fingerprint. Contact our triage desk directly to initiate an emergency evidence review through encrypted channels.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#35D6D0]/10 border border-[#35D6D0]/20 flex items-center justify-center text-[#35D6D0]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-body font-bold text-[#8B9AA5] uppercase tracking-wider">Encrypted Email Desk</div>
                  <div className="text-base sm:text-lg font-body font-semibold text-[#F1F5F7]">support@mickydons.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#35D6D0]/10 border border-[#35D6D0]/20 flex items-center justify-center text-[#35D6D0]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-body font-bold text-[#8B9AA5] uppercase tracking-wider">Operational Response</div>
                  <div className="text-base sm:text-lg font-body font-semibold text-[#F1F5F7]">24/7 Rapid File Review</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 rounded-3xl bg-[#111C26] border border-[#24313D] shadow-2xl backdrop-blur-md">
            <h3 className="text-[20px] font-body font-semibold mb-6 text-[#F1F5F7]">Why Victims Trust Mickydons</h3>
            <ul className="space-y-6">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#35D6D0] flex-shrink-0" />
                  <span className="text-lg font-medium text-[#F1F5F7]">{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-10 border-t border-[#24313D]">
              <div className="text-sm text-[#8B9AA5] leading-relaxed">Mickydons Trace &amp; Recovery is an independent investigative firm specializing in scam investigation, digital asset tracing, and victim recovery support.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}