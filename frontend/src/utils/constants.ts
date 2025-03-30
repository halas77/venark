import ClientRegistryABI from "./ABIs/ClientRegistry.json";
import AgreementFactoryABI from "./ABIs/AgreementFactory.json";
import ServiceAgreementABI from "./ABIs/ServiceAgreement.json";
import ERC20ABI from "./ABIs/ERC20.json";
import { Flag, LayoutDashboard, CircleHelp, Crown } from "lucide-react";
import { GitBranch, Mail } from "lucide-react";

// ClientRegistry
export const CLIENT_REGISTRY_CONTRACT_ADDRESS =
  "0x9AFCbbeAC0318eE4F0d3682a423a98dbe393c2eD";
export const CLIENT_REGISTRY_ABI = ClientRegistryABI.abi;

// AgreementFactory
export const AGREEMENT_FACTORY_CONTARCT_ADDRESS =
  "0xE0Ba419C4a1BCc4897CFA10135E5964779B072B7";
export const AGREEMENT_FACTORY_CONTRACT_ABI = AgreementFactoryABI.abi;

// ServiceAgreement
export const SERVICE_AGREEMENT_CONTARCT_ADDRESS =
  "0x92A067eB63dA4EB2BD80D542dCC9b2397a5E5402";
export const SERVICE_AGREEMENT_CONTRACT_ABI = ServiceAgreementABI.abi;

// ERC20
export const ERC20_CONTRACT_ABI = ERC20ABI.abi;

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

export interface Milestone {
  paymentAmount: number;
  // milestoneDesc?: string;
  isApproved: boolean;
}

export interface Campaign {
  id: number;
  name: string;
  budget: number;
  desc: string;
  date: string;
  milestones: Milestone[];
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Summer Sale 2024",
    budget: 5000000,
    desc: "Seasonal promotions",
    date: "One Month",
    milestones: [
      {
        paymentAmount: 1000000,
        // milestoneDesc: "Initial setup",
        isApproved: false,
      },
      {
        paymentAmount: 2000000,
        // milestoneDesc: "Mid-review",
        isApproved: false,
      },
      {
        paymentAmount: 2000000,
        // milestoneDesc: "Final report",
        isApproved: false,
      },
    ],
  },
  {
    id: 2,
    name: "Product Launch",
    budget: 12000000,
    desc: "New flagship product",
    date: "Three Month",
    milestones: [
      {
        paymentAmount: 4000000,
        // milestoneDesc: "Pre-launch",
        isApproved: false,
      },
      {
        paymentAmount: 5000000,
        // milestoneDesc: "Launch day",
        isApproved: false,
      },
      {
        paymentAmount: 3000000,
        // milestoneDesc: "Analysis",
        isApproved: false,
      },
    ],
  },
];
