import ClientRegistryABI from "./ABIs/ClientRegistry.json";
import AgreementFactoryABI from "./ABIs/AgreementFactory.json";
import ServiceAgreementABI from "./ABIs/ServiceAgreement.json";
import { Flag, LayoutDashboard, CircleHelp, Crown } from "lucide-react";
import { GitBranch, Mail } from "lucide-react";

// ClientRegistry
export const CLIENT_REGISTRY_CONTRACT_ADDRESS =
  "0x9AFCbbeAC0318eE4F0d3682a423a98dbe393c2eD";
export const CLIENT_REGISTRY_ABI = ClientRegistryABI.abi;

// AgreementFactory
export const AGREEMENT_FACTORY_CONTARCT_ADDRESS =
  "0x15f1e23Df15aFbDB806d2da7CB84E4F65AaBA462";
export const AGREEMENT_FACTORY_CONTRACT_ABI = AgreementFactoryABI.abi;

// ServiceAgreement
export const SERVICE_AGREEMENT_CONTARCT_ADDRESS =
  "0x92A067eB63dA4EB2BD80D542dCC9b2397a5E5402";
export const SERVICE_AGREEMENT_CONTRACT_ABI = ServiceAgreementABI.abi;

// Receiver Account
export const RecieverAccount = "0x096680DE94034935EBB6BFA117a218110001A2F4";
export const USDCAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

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
