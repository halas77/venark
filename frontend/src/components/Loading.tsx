import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground max-w-7xl w-full mx-auto px-4">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl">
        {/* Main Loader Content */}
        <div className="relative z-10 text-center">
          <Loader2 size={50} className="text-white animate-spin mx-auto mb-7" />
          {/* Progress Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Initializing Marketing Agents
            </h2>
            <p className="text-muted-foreground text-sm">
              Be ready, we are cooking venarks for you
            </p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "linear" }}
            className="mt-8 h-2 bg-purple-500/10 rounded-full overflow-hidden"
          >
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-progress-glow" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
