import React from "react";
import { Button } from "@/components/ui/button";
import { useDisconnect } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { disconnect } = useDisconnect();

  const navigate = useNavigate();

  const handleDisconnect = async () => {
    await disconnect();
    navigate("/");
  };

  return (
    <div className={`w-full ${className}`}>
      <nav className="h-16 flex justify-between lg:justify-end items-center bg-gray-900/50 text-gray-200 relative z-10 px-5">
        <div className="relative flex items-center space-x-4">
          <div className="relative group cursor-pointer">
            <Button
              onClick={handleDisconnect}
              variant="ghost"
              className="rounded-xl px-4 py-2 text-gray-100 hover:text-white transition-all duration-300 hover:bg-gray-900/50 bg-gradient-to-r from-purple-600/50 to-pink-500/50"
            >
              <span className="font-medium">Disconnect</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
