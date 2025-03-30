import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppKitAccount } from "@reown/appkit/react";
import { useReadContract } from "wagmi";
import {
  CLIENT_REGISTRY_CONTRACT_ADDRESS,
  CLIENT_REGISTRY_ABI,
} from "@/utils/constants";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const { address, isConnected } = useAppKitAccount();

  const { data: isOnboard } = useReadContract({
    abi: CLIENT_REGISTRY_ABI,
    address: CLIENT_REGISTRY_CONTRACT_ADDRESS,
    functionName: "isOnboarded",
    args: [address],
  });

  const navigateToOnboard = () => {
    if (isOnboard && isConnected) {
      navigate("/dashboard");
    } else {
      navigate("/onboard");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur max-w-7xl z-50 ${
        isScrolled ? "bg-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <div className="relative"></div>
          <span className="bg-gradient-to-r from-purple-100 to-pink-200 bg-clip-text text-3xl font-bold tracking-tighter text-transparent font-serif uppercase">
            venark.
          </span>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={navigateToOnboard}
            size="lg"
            className="group relative overflow-hidden rounded-xl px-8 text-lg font-semibold  transition-all hover:scale-105 hover:shadow-xl hover:brightness-110 text-white bg-gradient-to-r from-purple-400 to-pink-400 py-6"
          >
            {isOnboard ? "Dashboard" : "Get Started"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
