import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useAppKitAccount } from "@reown/appkit/react";
import {
  Campaign,
  ERC20_CONTRACT_ABI,
  RecieverAccount,
  USDCAddress,
} from "../../utils/constants";
import {
  AGREEMENT_FACTORY_CONTARCT_ADDRESS,
  AGREEMENT_FACTORY_CONTRACT_ABI,
  SERVICE_AGREEMENT_CONTRACT_ABI,
} from "../../utils/constants";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CustomModal({ campaign }: { campaign: Campaign }) {
  const [page, setPage] = useState("agreement");
  const [isAllowed, setIsAllowed] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { address } = useAppKitAccount();
  const { data: agreementHash, writeContract: agreementWriteContract } =
    useWriteContract();
  const { data: allowanceHash, writeContract: allowanceWriteContract } =
    useWriteContract();
  const { data: paymentHash, writeContract: paymentWriteContract } =
    useWriteContract();

  const {
    isLoading: isAgreementHashConfirming,
    isSuccess: isAgreementHashConfirmed,
  } = useWaitForTransactionReceipt({
    hash: agreementHash,
  });

  const {
    isLoading: isAllowanceHashConfirming,
    isSuccess: isAllowanceHashConfirmed,
  } = useWaitForTransactionReceipt({
    hash: allowanceHash,
  });

  const {
    isLoading: isPaymentHashConfirming,
    isSuccess: isPaymenteHashConfirmed,
  } = useWaitForTransactionReceipt({
    hash: paymentHash,
  });

  const { data: agreementContract } = useReadContract({
    abi: AGREEMENT_FACTORY_CONTRACT_ABI,
    address: AGREEMENT_FACTORY_CONTARCT_ADDRESS,
    functionName: "agreementContracts",
    args: [address],
  });

  const approveAllowance = () => {
    allowanceWriteContract({
      abi: ERC20_CONTRACT_ABI,
      address: USDCAddress,
      functionName: "approve",
      args: [agreementContract, campaign.budget],
    });
  };

  const pay = () => {
    paymentWriteContract({
      abi: SERVICE_AGREEMENT_CONTRACT_ABI,
      // @ts-ignore
      address: agreementContract,
      functionName: "depositPayment",
    });
  };

  const onSubmit = async (data: any) => {
    const milestones = campaign.milestones;
    const amount = campaign.budget;

    if (!milestones || !amount) {
      return;
    }

    agreementWriteContract({
      address: AGREEMENT_FACTORY_CONTARCT_ADDRESS,
      abi: AGREEMENT_FACTORY_CONTRACT_ABI,
      functionName: "createAgreement",
      args: [RecieverAccount, address, USDCAddress, amount, milestones],
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAgreementHashConfirmed) {
      setPage("payment");
      reset();
    }

    if (isAllowanceHashConfirmed) {
      setIsAllowed(true);
    }

    if (isPaymenteHashConfirmed) {
      navigate("/campaigns");
    }
  }, [
    setIsAllowed,
    isAllowanceHashConfirmed,
    isAgreementHashConfirmed,
    isPaymenteHashConfirmed,
    navigate,
    reset,
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="group">
          <span>Use template</span>
        </Button>
      </DialogTrigger>
      {page === "agreement" ? (
        <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-semibold text-white">
                Create Agreement
              </DialogTitle>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Based on "{campaign?.name}" template
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
            <div className="space-y-3">
              <div>
                <Label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-300"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  {...register("companyName", { required: true })}
                  placeholder="Acme Inc."
                  className="mt-1 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:ring-1 focus:ring-blue-500/30 text-white transition-colors"
                />
              </div>

              <div>
                <Label
                  htmlFor="companyDesc"
                  className="text-sm font-medium text-gray-300"
                >
                  Description
                </Label>
                <Textarea
                  id="companyDesc"
                  {...register("companyDesc")}
                  placeholder="Brief description of your company"
                  className="mt-1 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:ring-1 focus:ring-blue-500/30 text-white transition-colors min-h-[100px]"
                />
              </div>

              <div>
                <Label
                  htmlFor="companyURL"
                  className="text-sm font-medium text-gray-300"
                >
                  Website URL
                </Label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-700/50 text-gray-400 text-sm">
                    https://
                  </span>
                  <Input
                    id="companyURL"
                    {...register("companyURL")}
                    placeholder="yourcompany.com"
                    className="rounded-l-none border-l-0 border-gray-700 bg-gray-800/50 hover:bg-gray-800/70 focus:bg-gray-800/70 focus:ring-1 focus:ring-blue-500/30 text-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                disabled={isAgreementHashConfirming}
                variant={"outline"}
                type="submit"
                className="w-full py-5"
              >
                {isAgreementHashConfirming ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <>Generate Agreement</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-md bg-gradient-to-b from-gray-900 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-xl shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Payment Process
              </DialogTitle>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Complete these steps to finalize your payment
            </p>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Payment Amount */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
              <p className="text-center text-gray-300">
                You are about to pay:{" "}
                <span className="font-bold text-white">
                  {campaign.budget / 1000000} USDC
                </span>
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 h-full w-px bg-gray-700/80"></div>

              {/* Step 1 - Allowance */}
              <div className="relative flex items-start gap-4 pb-6">
                <div
                  className={`z-10 flex-shrink-0 mt-1 flex items-center justify-center h-8 w-8 rounded-full ${
                    isAllowed
                      ? "bg-green-500/20 ring-2 ring-green-400"
                      : "bg-blue-500/20 ring-2 ring-blue-400"
                  }`}
                >
                  {isAllowed ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <span className="text-sm font-medium text-blue-400">1</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-sm font-medium ${
                      isAllowed ? "text-green-400" : "text-white"
                    }`}
                  >
                    {isAllowed ? "Allowance Approved" : "Approve Allowance"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Authorize the contract to spend your USDC
                  </p>
                  {!isAllowed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={approveAllowance}
                      disabled={isAllowanceHashConfirming}
                      className="mt-2"
                    >
                      {isAllowanceHashConfirming ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Approve"
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Step 2 - Payment */}
              <div className="relative flex items-start gap-4">
                <div
                  className={`z-10 flex-shrink-0 mt-1 flex items-center justify-center h-8 w-8 rounded-full ${
                    isAllowed
                      ? isPaymentHashConfirming
                        ? "bg-purple-500/20 ring-2 ring-purple-400"
                        : "bg-blue-500/20 ring-2 ring-blue-400"
                      : "bg-gray-700/50 ring-2 ring-gray-600"
                  }`}
                >
                  {isPaymentHashConfirming ? (
                    <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                  ) : isAllowed ? (
                    <span className="text-sm font-medium text-blue-400">2</span>
                  ) : (
                    <span className="text-sm font-medium text-gray-500">2</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-sm font-medium ${
                      isPaymentHashConfirming
                        ? "text-purple-400"
                        : isAllowed
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {isPaymentHashConfirming
                      ? "Processing Payment"
                      : "Complete Payment"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {isAllowed
                      ? "Finalize the transaction"
                      : "Waiting for allowance approval"}
                  </p>
                  {isAllowed && (
                    <Button
                      size="sm"
                      variant={"outline"}
                      onClick={pay}
                      disabled={isPaymentHashConfirming}
                    >
                      {isPaymentHashConfirming ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Pay Now"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
