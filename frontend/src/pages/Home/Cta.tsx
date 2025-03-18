import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="relative pt-10 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-3xl animate-pulse" />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              x: Math.random() * 400 - 200,
              y: Math.random() * 200 - 100,
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-white/20 bg-background/50 backdrop-blur-xl p-8 shadow-2xl"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-600/30 via-pink-500/30 to-blue-600/30" />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl border-[0.5px] border-white/10" />

          <div className="text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent pb-8"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              Ready to Automate Your Marketing?
            </motion.h2>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Deploy your first AI-powered marketing campaign in minutes with
              crypto-native payments
            </motion.p>

            <motion.div
              className="mt-12 flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 px-12 py-8 text-lg font-semibold shadow-xl text-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Now
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
