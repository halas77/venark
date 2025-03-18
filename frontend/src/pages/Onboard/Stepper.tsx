import { Check, Gem, Rocket, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface StepperProps {
  activeStep: number;
}

const Stepper = ({ activeStep }: StepperProps) => {
  const steps = [
    {
      title: "Connect Wallet",
      icon: <Wallet className="h-5 w-5 text-white" />,
      description: "Link your Web3 wallet to get started",
    },
    {
      title: "Mint Membership NFT",
      icon: <Gem className="h-5 w-5 text-white" />,
      description: "Claim your exclusive access pass",
    },
    {
      title: "Dashboard Access",
      icon: <Rocket className="h-5 w-5 text-white" />,
      description: "Launch your marketing campaigns",
    },
  ];

  return (
    <div className="flex justify-between relative mb-12">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center relative z-10">
          <motion.div
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors
                  ${
                    activeStep >= index
                      ? "bg-gradient-to-br from-purple-400 to-pink-400 text-white"
                      : "bg-white/40"
                  }`}
          >
            {activeStep > index ? <Check className="h-6 w-6" /> : step.icon}
          </motion.div>
          <span
            className={`mt-2 text-sm font-medium ${
              activeStep >= index ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`absolute top-6 left-40 w-32 h-[2px] ${
                activeStep > index
                  ? "bg-gradient-to-r from-purple-600 to-pink-500"
                  : "bg-white/50"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
