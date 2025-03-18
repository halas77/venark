import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-tl -z-20 blur-[50px] md:blur-[100px] w-[80vw] h-[70vh] rounded-full from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-rotate" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaaaaa2e_1px,transparent_1px),linear-gradient(to_bottom,#aaaaaa2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_110%)] ">
        <motion.div
          className="absolute inset-0 bg-grid-white/[0.02]"
          animate={{ opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        <Badge
          variant="outline"
          className="mb-4 border-purple-200 rounded-xl px-4 text-lg text-purple-200"
        >
          Future of Web3 Marketing
        </Badge>
        <h1 className="mx-auto max-w-5xl text-6xl font-bold leading-tight">
          Autonomous Marketing Solutions Powered by <br />
          <span className="bg-gradient-to-r from-purple-100 to-pink-200 bg-clip-text text-transparent">
            AI Agents & Blockchain
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
          Next-gen marketing agency combining decentralized identity, smart
          contracts, and AI creativity for viral Web3 campaigns.
        </p>
        <div className="mt-8 flex justify-center gap-4 ">
          <Button
            size="lg"
            className="z-20 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-purple-500/30"
          >
            Launch Campaign
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
          <a href="#how-it-works">
            <Button
              size="lg"
              variant="outline"
              className="z-20 text-lg px-8 py-6 rounded-xl border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm"
            >
              How It Works
              <Lightbulb className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
