import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center relative overflow-hidden"
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 bg-purple-400/50 rounded-full"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 1,
          }}
        />
      ))}

      {/* Success icon */}
      <div className="mx-auto mb-8 flex justify-center items-center relative">
        <div className="relative h-32 w-32 flex justify-center items-center">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <Check className="h-20 w-24 text-white relative z-10 mx-auto animate-check-bounce" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
          Launch Sequence Complete
        </h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto text-xl">
          Your autonomous marketing dashboard is powered up and ready for action
        </p>

        {/* Animated button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/dashboard">
            <Button
              size="lg"
              className="group relative rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-400 px-12 py-7 text-lg shadow-2xl text-white"
            >
              <span className="relative z-10 flex items-center gap-3">
                Go to Dashboard
              </span>
              <Rocket />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Success;
