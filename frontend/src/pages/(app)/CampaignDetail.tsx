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

const CampaignDetail = () => {
  const [data, setData] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.log("response", response);
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

  return (
    <Layout>
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">Loading...</p>
        </div>
      )}
      {!loading && !data && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">No data found</p>
        </div>
      )}
      {!loading && data && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white">Data found</p>
        </div>
      )}
      {id && data && (
        <div className="bg-[#0f0f0f] min-h-screen text-white p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Campaign Title */}
            <h1 className="text-3xl font-bold text-white">
              {" "}
              {typeof data[id] === "object" && data[id]?.name}
            </h1>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1a1a1a] p-6 rounded-2xl shadow-lg">
              <div>
                <p className="text-sm text-gray-400">Amount Requested</p>
                <p className="text-xl font-semibold text-green-400">
                  <span className="text-purple-400 font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      typeof data[id] === "object" && data[id]?.amount
                        ? Number(data[id].amount) / 1000000
                        : 0
                    )}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Creator Address</p>
                <p className="text-sm break-all">{data.account}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-400">Description</p>
                {typeof data[id] === "object" && data[id]?.desc}
              </div>
              <div>
                <p className="text-sm text-gray-400">Website</p>
                <a
                  href={`https://${data.link}`}
                  className="text-blue-400 underline hover:text-blue-300 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {typeof data[id]?.link === "string"
                    ? data[id].link.replace(/^https?:\/\//, "")
                    : ""}
                </a>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Milestones</h2>
              <ul className="space-y-4">
                {typeof data[id] === "object" &&
                  data[id]?.milestones?.map((milestone, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-[#262626] px-4 py-3 rounded-lg"
                    >
                      <span className="text-gray-300">Payment {idx + 1}</span>
                      <span className="text-green-300">
                        ${milestone.paymentAmount.toLocaleString()}
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          milestone.isApproved
                            ? "bg-green-700 text-green-100"
                            : "bg-yellow-700 text-yellow-100"
                        }`}
                      >
                        {milestone.isApproved ? "Approved" : "Pending"}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Empty Data Info */}
            <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-2">Memes</h2>
              {typeof data[id] === "object" && data[id].meme.length === 0 ? (
                <p className="text-gray-500 italic">No memes uploaded.</p>
              ) : (
                <ul>{/* Map memes if any */}</ul>
              )}
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold mb-2">Tweets</h2>
              {typeof data[id] === "object" && data[id].tweets.length === 0 ? (
                <p className="text-gray-500 italic">No tweets linked.</p>
              ) : (
                <ul>{/* Map tweets if any */}</ul>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CampaignDetail;
