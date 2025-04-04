import Layout from "./Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Globe } from "lucide-react";
import axios from "axios";
import { useReadContract } from "wagmi";
import {
  AGREEMENT_FACTORY_CONTARCT_ADDRESS,
  AGREEMENT_FACTORY_CONTRACT_ABI,
} from "@/utils/constants";
import { useEffect, useState } from "react";

function calculateCompletionPercentage(
  milestones: { isApproved: boolean; paymentAmount: number }[] | undefined
) {
  if (!milestones || milestones.length === 0) return 0;
  const completed = milestones.filter((m) => m.isApproved).length;
  return Math.round((completed / milestones.length) * 100);
}

const MyCampaign = () => {
  interface CampaignData {
    Venark?: {
      name: string;
      link: string;
      amount: string;
      milestones: { isApproved: boolean; paymentAmount: number }[];
    };
    account: string;
  }

  const [data, setData] = useState<CampaignData | null>(null);

  const { data: ipfsHash } = useReadContract({
    abi: AGREEMENT_FACTORY_CONTRACT_ABI,
    address: AGREEMENT_FACTORY_CONTARCT_ADDRESS,
    functionName: "ipfsHashes",
    args: ["Venark"],
  });

  useEffect(() => {
    const getCampaignData = async () => {
      const response = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
      );

      setData(response.data);
    };

    getCampaignData();
  }, [ipfsHash]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Campaign Agreements
            </h1>
            <p className="text-gray-400">
              Manage your active marketing campaigns
            </p>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            key={data?.Venark?.name}
            className="bg-gray-900/50 border-gray-900 hover:border-purple-500/30 transition-colors"
          >
            <div className="p-4 space-y-3">
              {/* Compact Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white truncate max-w-[180px]">
                  {data?.Venark?.name}
                </h3>
                <Badge className="bg-purple-500">
                  {data?.Venark?.milestones?.filter((m) => m.isApproved)
                    .length || 0}
                  /{data?.Venark?.milestones?.length || 0} Milestones
                </Badge>
              </div>

              {/* Budget + Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-400 font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(data?.Venark?.amount || 0))}
                  </span>
                  <span className="text-gray-400">
                    {calculateCompletionPercentage(data?.Venark?.milestones)}%
                    complete
                  </span>
                </div>

                {/* Slim progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-purple-100 to-pink-100 h-1 rounded-full"
                    style={{
                      width: `${calculateCompletionPercentage(
                        data?.Venark?.milestones
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Milestone indicators - very compact */}
              <div className="flex gap-1">
                {data?.Venark?.milestones?.map((milestone, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-sm ${
                      milestone.isApproved ? "bg-green-400" : "bg-gray-700"
                    }`}
                    title={`Milestone ${index + 1}: ${
                      milestone.paymentAmount / 1000
                    }k`}
                  />
                ))}
              </div>

              {/* Compact footer */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex items-center gap-1 truncate max-w-[120px]">
                  <Globe className="h-3 w-3 text-blue-400" />
                  <span>{data?.Venark?.link?.replace(/^https?:\/\//, "")}</span>
                </div>
                <span>
                  {data?.account?.slice(0, 4)}...{data?.account?.slice(-2)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Empty State */}
        {!data && (
          <Card className="bg-gray-900/50 border-gray-900 text-center p-12">
            <div className="space-y-4">
              <FileText className="h-12 w-12 mx-auto text-gray-600" />
              <h3 className="text-xl font-semibold text-white">
                No Campaigns Found
              </h3>
              <p className="text-gray-400">
                Create your first campaign agreement to get started
              </p>
              <Button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90">
                Create Campaign
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyCampaign;
