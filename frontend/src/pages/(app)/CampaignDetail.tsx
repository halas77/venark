import { useReadContract } from "wagmi";
import Layout from "./Layout";
import {
  AGREEMENT_FACTORY_CONTARCT_ADDRESS,
  AGREEMENT_FACTORY_CONTRACT_ABI,
} from "@/utils/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { CampaignData } from "./MyCampaign";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Link2,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  File,
} from "lucide-react";

const CampaignDetail = () => {
  const [data, setData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const { id } = useParams();

  const { data: ipfsHash } = useReadContract({
    abi: AGREEMENT_FACTORY_CONTRACT_ABI,
    address: AGREEMENT_FACTORY_CONTARCT_ADDRESS,
    functionName: "ipfsHashes",
    args: [id],
  });

  useEffect(() => {
    const getCampaignData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ipfsHash) {
      getCampaignData();
    }
  }, [ipfsHash]);

  const generateContent = async () => {
    try {
      setGenerating(true);
      // Replace with your actual content generation API call
      const response = await axios.post("/api/generate-content", {
        campaignId: id,
        campaignData: data,
      });
      // Handle the generated content
      console.log("Generated content:", response.data);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">Loading campaign data...</p>
        </div>
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">No campaign data found</p>
        </div>
      </Layout>
    );

  const campaign = data[id as keyof typeof data];
  const isCampaignObject = typeof campaign === "object";

  return (
    <Layout>
      <div className="bg-black min-h-screen text-white p-4 md:p-8">
        <div className="w-full mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {isCampaignObject ? campaign.name : "Campaign"}
            </h1>
            <div className="flex gap-4">
              <Button
                onClick={generateContent}
                disabled={generating}
                className="gap-2 "
              >
                <File className="w-4 h-4" />
                {generating ? "Generating..." : "View Summary"}
              </Button>
              <Button
                onClick={generateContent}
                disabled={generating}
                className="gap-2 text-black"
                variant={"outline"}
              >
                <Rocket className="w-4 h-4" />
                {generating ? "Generating..." : "Generate Content"}
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Budget</span>
              </div>
              <p className="text-xl font-semibold mt-1">
                {isCampaignObject
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(campaign.amount) / 1000000)
                  : "$0"}
              </p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-4 h-4" />
                <span className="text-sm">Creator</span>
              </div>
              <p className="text-sm font-mono mt-1 truncate">{data.account}</p>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Link2 className="w-4 h-4" />
                <span className="text-sm">Website</span>
              </div>
              <a
                href={`https://${campaign.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm mt-1 block truncate"
              >
                {isCampaignObject && typeof campaign.link === "string"
                  ? campaign.link.replace(/^https?:\/\//, "")
                  : "No website"}
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h2 className="text-sm font-medium text-gray-400 mb-2">
              Description
            </h2>
            <p className="text-gray-200">
              {isCampaignObject ? campaign.desc : "No description available"}
            </p>
          </div>

          {/* Milestones */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h2 className="text-sm font-medium text-gray-400 mb-3">
              Milestones
            </h2>
            <div className="space-y-3">
              {isCampaignObject &&
                campaign.milestones?.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-800 rounded"
                  >
                    <div className="flex items-center gap-3">
                      {milestone.isApproved ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-yellow-400" />
                      )}
                      {idx === 0
                        ? "Initial Payment"
                        : idx === 1
                        ? "Second Payment"
                        : idx === 2
                        ? "Final Payment"
                        : ""}
                    </div>
                    <span className="font-medium">
                      ${Number(milestone.paymentAmount) / 1000000}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h2 className="text-sm font-medium text-gray-400 mb-3">Memes</h2>
              {isCampaignObject && campaign.meme?.length ? (
                <div className="space-y-2">
                  {campaign.meme.map((meme, idx) => (
                    <div key={idx} className="text-sm text-gray-300">
                      Meme {idx + 1}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No memes yet</p>
              )}
            </div>

            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h2 className="text-sm font-medium text-gray-400 mb-3">Tweets</h2>
              {isCampaignObject && campaign.tweets?.length ? (
                <div className="space-y-2">
                  {campaign.tweets.map((tweet, idx) => (
                    <div key={idx} className="text-sm text-gray-300">
                      Tweet {idx + 1}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No tweets yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetail;
