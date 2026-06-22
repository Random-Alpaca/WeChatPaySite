import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Pricing from "@/components/Pricing";
import SavingsCalculator from "@/components/SavingsCalculator";
import ComparisonTable from "@/components/ComparisonTable";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Pricing />
        <SavingsCalculator />
        <ComparisonTable />
        <HowItWorks />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
