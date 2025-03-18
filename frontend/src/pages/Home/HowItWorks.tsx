import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LockKeyhole,
  PenLine,
  BrainCircuit,
  LayoutDashboard,
  Rocket,
  Sparkles,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "NFT-Gated Access",
      description:
        "Create your account with decentralized identity and verify NFT ownership",
      icon: <LockKeyhole className="w-8 h-8" />,
      visual: (
        <motion.div className="relative p-4" whileHover={{ rotate: -2 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-500/30 blur-2xl rounded-xl" />
          <div className="relative border border-white/20 rounded-lg p-4 bg-background">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full" />
              <div>
                <h3 className="font-semibold">Membership NFT</h3>
                <p className="text-sm text-muted-foreground">#0001</p>
              </div>
            </div>
            <div className="mt-4 border-t border-white/10 pt-4">
              <Badge className="bg-purple-600/20 text-purple-300">
                Access Granted
              </Badge>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "On-Chain Agreement",
      description:
        "Sign smart contract defining campaign terms & crypto payments",
      icon: <PenLine className="w-8 h-8" />,
      visual: (
        <motion.div className="relative" whileHover={{ y: -5 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 to-blue-500/30 blur-2xl rounded-xl" />
          <div className="relative border border-white/20 rounded-lg p-6 bg-background">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-6 bg-gradient-to-r from-pink-500 to-blue-400 rounded-full" />
              <h3 className="font-mono text-sm">ServiceAgreement.sol</h3>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-white/10 rounded w-full animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Sign Contract
              </Button>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "AI Content Generation",
      description: "Our neural networks create viral-ready marketing content",
      icon: <BrainCircuit className="w-8 h-8" />,
      visual: (
        <motion.div className="relative group" whileHover={{ scale: 1.05 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-500/30 blur-2xl rounded-xl" />
          <div className="relative border border-white/20 rounded-lg overflow-hidden bg-background">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span>Generating Content...</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-16 bg-white/5 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "Dashboard Control",
      description: "Monitor and manage campaigns in real-time",
      icon: <LayoutDashboard className="w-8 h-8" />,
      visual: (
        <motion.div
          className="relative border border-white/20 rounded-xl bg-background overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-500/30 blur-2xl" />
          <div className="relative p-4">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-6 h-6 text-purple-400" />
              <h3 className="font-semibold">Campaign Dashboard</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>AI Content</span>
                <Badge className="bg-green-500/20 text-green-400">Live</Badge>
              </div>
              <div className="h-1 bg-white/10 rounded-full">
                <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">
                    Engagement
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold">1.2M</div>
                  <div className="text-sm text-muted-foreground">Reach</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold">$4.8K</div>
                  <div className="text-sm text-muted-foreground">Spent</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge
            variant="outline"
            className="mb-4 border-purple-300 bg-purple-900/20 text-purple-200 text-lg"
          >
            Process Flow
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-100 to-pink-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            From NFT access to viral campaigns - all in four simple steps
          </p>
        </div>

        <div className="grid  md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-background/50 border-white/10 hover:border-purple-500/30 transition-colors ">
                <div className="p-6">
                  <div className="flex justify-between items-center w-full">
                    <div className="mb-4 text-purple-400">{step.icon}</div>
                    <p className="text-4xl font-semibold text-muted-foreground">
                      0{index + 1}
                    </p>
                  </div>
                  <h3 className="text-3xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {step.description}
                  </p>
                  {step.visual}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
