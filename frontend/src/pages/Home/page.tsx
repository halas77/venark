import Navbar from "@/components/Navbar";
import Hero from "./Hero";
import Feature from "./Feature";
import Cta from "./Cta";
import Footer from "@/components/Footer";
import HowItWorks from "./HowItWorks";

export default function Home() {
  return (
    <div className="dark min-h-screen bg-background text-foreground max-w-7xl w-full mx-auto px-4">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Feature />
      <Cta />
      <Footer />
    </div>
  );
}
