import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Gem, Loader2 } from "lucide-react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";

import { useEffect } from "react";
import {
  ONBOARD_CONTARCT_ADDRESS,
  ONBOARD_CONTRACT_ABI,
} from "@/utils/constants";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";

interface MintNFTProps {
  setActiveStep: (step: number) => void;
}

const MintNFT = ({ setActiveStep }: MintNFTProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5]);

  const navigate = useNavigate();

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { address } = useAppKitAccount();

  const { data: isOnboard } = useReadContract({
    abi: ONBOARD_CONTRACT_ABI,
    address: ONBOARD_CONTARCT_ADDRESS,
    functionName: "isOnboarded",
    args: [address],
  });

  const handleMintNFT = async () => {
    writeContract({
      address: ONBOARD_CONTARCT_ADDRESS,
      abi: ONBOARD_CONTRACT_ABI,
      functionName: "onboardClient",
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      setActiveStep(2);
    }

    if (isOnboard) {
      navigate("/dashboard");
    }
  }, [isConfirmed, setActiveStep, isOnboard, navigate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
        Membership Access Pass
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
        Mint your exclusive NFT to unlock full platform features
      </p>

      <div></div>

      <div
        className="relative group mx-auto max-w-xs"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(400px at ${mouseX}px ${mouseY}px, rgba(192,132,252,0.15), transparent)`,
          }}
        />

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

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
        >
          <Card className="relative p-6 bg-background border-white/20 overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600/30 via-pink-500/30 to-transparent opacity-30" />

            <div className="relative aspect-square bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-xl mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Gem className="h-16 w-16 text-purple-400/30" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-100 to-pink-100 bg-clip-text text-transparent">
                Venark Access Pass
              </h3>
              <p className="text-sm text-muted-foreground">
                Genesis Membership
              </p>
            </motion.div>

            <div className="absolute -inset-2 -z-10 bg-gradient-to-r from-purple-600/30 to-pink-500/30 blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
          </Card>
        </motion.div>
      </div>

      <motion.div className="mt-8" whileHover={{ scale: 1.05 }}>
        <Button
          size="lg"
          onClick={handleMintNFT}
          disabled={isConfirming}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 px-12 py-8 text-lg shadow-2xl text-white"
        >
          {isConfirming ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Minting...</span>
            </div>
          ) : (
            <>Mint Membership NFT</>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default MintNFT;
