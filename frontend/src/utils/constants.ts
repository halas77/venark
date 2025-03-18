import onboardABI from "./abis/client-registry.json";
import agreementABI from "./abis/service-agreement.json";
import { Flag, LayoutDashboard, CircleHelp, Crown } from "lucide-react";
import { GitBranch, Mail } from "lucide-react";

// onboard
export const ONBOARD_CONTARCT_ADDRESS =
  "0x91DFcdCbF56d9615eDdFe1657A3752e75fF23712";
export const ONBOARD_CONTRACT_ABI = onboardABI.abi;

// agreement
export const AGREEMENT_CONTARCT_ADDRESS =
  "0x9e13201c504c41970dd1E5E10f7B8b06c5Cb9883";
export const AGREEMENT_CONTRACT_ABI = agreementABI.abi;

export const dashboardContent = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Campaigns", href: "/campaigns", icon: Flag },
  { label: "Services", href: "/services", icon: Crown },
  { label: "Help", href: "/help", icon: CircleHelp },
];

export const socialLinks = [
  {
    icon: GitBranch,
    href: "https://github.com/halas77",
  },
  {
    icon: Mail,
    href: "mailto:dawitm777@gmail.com",
  },
];
