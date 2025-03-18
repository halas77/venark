import { motion } from "framer-motion";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect } from "react";

interface WalletComponentProps {
  setWalletConnected: (connected: boolean) => void;
  setActiveStep: (step: number) => void;
}

const WalletComponet: React.FC<WalletComponentProps> = ({ setActiveStep }) => {
  const { isConnected } = useAppKitAccount();

  useEffect(() => {
    if (isConnected) {
      setActiveStep(1);
    }
  }, [isConnected, setActiveStep]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
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
      <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
      <p className="text-gray-300 text-lg mb-8">
        Secure access to decentralized marketing tools
      </p>

      <div className="flex justify-center">
        <appkit-button />
      </div>
    </motion.div>
  );
};

export default WalletComponet;
