import { MickydonsNavbar } from "@/components/MickydonsNavbar";
import { MickydonsHero } from "@/components/MickydonsHero";
import { MickydonsProofLayer } from "@/components/MickydonsProofLayer";
import { MickydonsServices } from "@/components/MickydonsServices";
import { MickydonsScamCheck } from "@/components/MickydonsScamCheck";
import { MickydonsMethodology } from "@/components/MickydonsMethodology";
import { MickydonsSteps } from "@/components/MickydonsSteps";
import { MickydonsGuarantee } from "@/components/MickydonsGuarantee";
import { MickydonsTrustStrip } from "@/components/MickydonsTrustStrip";
import { MickydonsRecoveryForm } from "@/components/MickydonsRecoveryForm";
import { MickydonsTestimonials } from "@/components/MickydonsTestimonials";
import { MickydonsKnowledgeHub } from "@/components/MickydonsKnowledgeHub";
import { MickydonsContact } from "@/components/MickydonsContact";
import { MickydonsFooter } from "@/components/MickydonsFooter";
import { MickydonsStickyCTA } from "@/components/MickydonsStickyCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MickydonsNavbar />
      <main>
        <MickydonsHero />
        <MickydonsProofLayer />
        <MickydonsServices />
        <MickydonsScamCheck />
        <MickydonsMethodology />
        <MickydonsSteps />
        <MickydonsGuarantee />
        <MickydonsTrustStrip />
        <MickydonsRecoveryForm />
        <MickydonsTestimonials />
        <MickydonsKnowledgeHub />
        <MickydonsContact />
      </main>
      <MickydonsFooter />
      <MickydonsStickyCTA />
    </div>
  );
}
