import { Outlet } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import { useReadContract } from "wagmi";
import {
  ONBOARD_CONTARCT_ADDRESS,
  ONBOARD_CONTRACT_ABI,
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
    abi: ONBOARD_CONTRACT_ABI,
    address: ONBOARD_CONTARCT_ADDRESS,
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
