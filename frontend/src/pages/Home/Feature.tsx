import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BrainCircuit, FileText, Globe, Rocket } from "lucide-react";

const features = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Decentralized Onboarding",
    description: "ENS-based identity verification and seamless client intake",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Smart Contract Agreements",
    description: "Automated, transparent service terms with crypto payments",
    gradient: "from-pink-500 to-blue-500",
  },
  {
    icon: <BrainCircuit className="h-8 w-8" />,
    title: "AI Content Generation",
    description: "Context-aware meme/viral content creation engine",
    gradient: "from-purple-500 to-blue-400",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Campaign Automation",
    description: "End-to-end automated campaign management",
    gradient: "from-pink-600 to-purple-400",
  },
];

const Feature = () => {
  return (
    <section className="relative pt-10 pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[20%] h-[800px] w-[1200px] -translate-x-1/2 bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">
            Cutting-edge technologies powering your marketing success
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative h-full   transition-colors rounded-3xl bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-2xl border border-white/10 hover:border-white/20">
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${feature.gradient}/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                />

                {/* Animated border */}
                <div className="absolute inset-0  p-px">
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                  />
                </div>

                <CardHeader className="p-6">
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}
                      />
                      <div
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${feature.gradient} text-white`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-100 to-pink-100 bg-clip-text text-transparent">
                    {feature.title}
                  </CardTitle>

                  <CardDescription className="mt-3  text-md text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
