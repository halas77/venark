import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import WalletComponent from "./Wallet";
import MintNFT from "./MintNFT";
import Success from "./Success";
import Stepper from "./Stepper";
import { Rocket, Sparkles } from "lucide-react";

const Onboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [, setWalletConnected] = useState(false);

  return (
    <div className="dark min-h-screen bg-background text-foreground max-w-7xl w-full mx-auto px-4">
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-tl -z-20 blur-[50px] md:blur-[100px] w-[80vw] h-[60vh] rounded-full from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-rotate" />
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#aaaaaa2e_1px,transparent_1px),linear-gradient(to_bottom,#aaaaaa2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_110%)] ">
          <motion.div
            className="absolute inset-0 bg-grid-white/[0.02]"
            animate={{ opacity: [0.3, 0.4, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        <motion.div className="w-full max-w-4xl">
          <Card className="relative p-8 bg-background/90 backdrop-blur-xl border-white/20 overflow-hidden">
            <div className="absolute inset-0 rounded-xl p-px bg-gradient-to-br from-purple-600/30 via-pink-500/30 to-transparent pointer-events-none " />

            <div className="relative z-10">
              <Stepper activeStep={activeStep} />

              <motion.div key={activeStep} className="space-y-8 mt-12">
                {activeStep === 0 && (
                  <WalletComponent
                    setActiveStep={setActiveStep}
                    setWalletConnected={setWalletConnected}
                  />
                )}

                {activeStep === 1 && <MintNFT setActiveStep={setActiveStep} />}

                {activeStep === 2 && <Success />}
              </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <Sparkles className="absolute -top-20 -right-20 h-64 w-64 text-purple-500/10 animate-pulse" />
            <Rocket className="absolute -bottom-20 -left-20 h-64 w-64 text-pink-500/10 animate-float" />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboard;
