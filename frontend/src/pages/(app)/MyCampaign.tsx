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
import { Link } from "react-router-dom";

function calculateCompletionPercentage(
  milestones: { isApproved: boolean; paymentAmount: number }[] | undefined
) {
  if (!milestones || milestones.length === 0) return 0;
  const completed = milestones.filter((m) => m.isApproved).length;
  return Math.round((completed / milestones.length) * 100);
}

export interface CampaignData {
  [key: string]:
    | {
        name: string;
        desc: string;
        link: string;
        amount: string;
        milestones: { isApproved: boolean; paymentAmount: number }[];
        memes: [];
        tweets: [];
      }
    | string
    | undefined;

  account: string;
}

const MyCampaign = () => {
  const [data, setData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);

  const companyName = localStorage.getItem("companyName");

  const { data: ipfsHash } = useReadContract({
    abi: AGREEMENT_FACTORY_CONTRACT_ABI,
    address: AGREEMENT_FACTORY_CONTARCT_ADDRESS,
    functionName: "ipfsHashes",
    args: [companyName],
  });

  useEffect(() => {
    if (!ipfsHash) return;

    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
          { timeout: 10000 }
        );
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("Request canceled:", error);
        } else {
          console.error("Error fetching campaign data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [ipfsHash]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">My Campaigns</h1>
            <p className="text-gray-400">
              Manage your active marketing campaigns
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-900">
                <div className="p-4 space-y-4">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-800 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-1/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded animate-pulse w-full"></div>
                    <div className="h-1 bg-gray-800 rounded-full animate-pulse w-full"></div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 bg-gray-800 rounded-sm animate-pulse"
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-800 rounded animate-pulse w-1/3"></div>
                    <div className="h-3 bg-gray-800 rounded animate-pulse w-1/3"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !data && (
          <Card className="bg-gray-900/50 border-gray-900 text-center p-12">
            <div className="space-y-4">
              <FileText className="h-12 w-12 mx-auto text-gray-600" />
              <h3 className="text-xl font-semibold text-white">
                No Campaigns Found
              </h3>
              <p className="text-gray-400">
                Create your first campaign agreement to get started
              </p>
              <Link to={"/services"}>
                <Button className="mt-4 bg-gradient-to-r from-purple-600/50 to-pink-500/50 hover:opacity-90">
                  Create Campaign
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Data State */}
        {!loading && companyName && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to={`/dashboard/${companyName}`}>
              <Card className="bg-gray-900/50 border-gray-900 hover:border-purple-500/30 transition-colors">
                <div className="p-4 space-y-3">
                  {/* Compact Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white truncate max-w-[180px]">
                      {typeof data[companyName] === "object" &&
                        data[companyName]?.name}
                    </h3>
                    <Badge className="bg-purple-500">
                      {(typeof data[companyName] === "object" &&
                        data[companyName]?.milestones?.filter(
                          (m) => m.isApproved
                        ).length) ||
                        0}
                      /
                      {(typeof data[companyName] === "object" &&
                        data[companyName]?.milestones?.length) ||
                        0}{" "}
                      Milestones
                    </Badge>
                  </div>

                  {/* Budget + Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-400 font-medium">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(
                          typeof data[companyName] === "object" &&
                            data[companyName]?.amount
                            ? Number(data[companyName].amount) / 1000000
                            : 0
                        )}
                      </span>
                      <span className="text-gray-400">
                        {calculateCompletionPercentage(
                          typeof data[companyName] === "object"
                            ? data[companyName]?.milestones
                            : undefined
                        )}
                        % complete
                      </span>
                    </div>

                    {/* Slim progress bar */}
                    <div className="w-full bg-gray-800 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-purple-100 to-pink-100 h-1 rounded-full"
                        style={{
                          width: `${calculateCompletionPercentage(
                            typeof data[companyName] === "object"
                              ? data[companyName]?.milestones
                              : undefined
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Milestone indicators */}
                  <div className="flex gap-1">
                    {typeof data[companyName] === "object" &&
                      data[companyName]?.milestones?.map((milestone, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-sm ${
                            milestone.isApproved
                              ? "bg-green-400"
                              : "bg-gray-700"
                          }`}
                          title={`Milestone ${
                            index + 1
                          }: $${milestone.paymentAmount.toLocaleString()}`}
                        />
                      ))}
                  </div>

                  {/* Compact footer */}
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <div className="flex items-center gap-1 truncate max-w-[120px]">
                      <Globe className="h-3 w-3 text-blue-400" />
                      <span>
                        {typeof data[companyName]?.link === "string"
                          ? data[companyName].link.replace(/^https?:\/\//, "")
                          : ""}
                      </span>
                    </div>
                    <span>
                      {data.account?.slice(0, 4)}...{data.account?.slice(-2)}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCampaign;
