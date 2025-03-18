import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import {
  AppKitNetwork,
  // mainnet,
  baseSepolia,
  // base,
} from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const projectId = "241e20e1f54d7e7b3226dcce2f7e3c3e";

const metadata = {
  name: "Venark",
  description:
    "Autonomous Marketing Solutions Powered by AI Agents & Blockchain",
  url: "https://example.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  // mainnet,
  // base,
  baseSepolia,
];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
