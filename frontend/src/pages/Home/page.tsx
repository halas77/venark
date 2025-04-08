import Hero from "./Hero";
import Feature from "./Feature";
import Cta from "./Cta";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
