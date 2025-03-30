import { Outlet } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import { useReadContract } from "wagmi";
import {
  CLIENT_REGISTRY_CONTRACT_ADDRESS,
  CLIENT_REGISTRY_ABI,
} from "@/utils/constants";
import PageLoader from "./Loading";
import Error from "./Error";

const ProtectedRoute = () => {
  const { address, isConnected } = useAppKitAccount();

  const {
    data: isOnboard,
    error,
    isPending,
  } = useReadContract({
    abi: CLIENT_REGISTRY_ABI,
    address: CLIENT_REGISTRY_CONTRACT_ADDRESS,
    functionName: "isOnboarded",
    args: [address],
  });

  if (isPending) {
    return <PageLoader />;
  }

  if (error) {
    return <Error />;
  }

  return isConnected && isOnboard ? <Outlet /> : <Error />;
};

export default ProtectedRoute;
