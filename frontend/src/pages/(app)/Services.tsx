import Layout from "./Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, DollarSign, FileText, Globe } from "lucide-react";
import { CustomSheet } from "./CustomSheet";
import { CustomModal } from "./CustomModal";

const Services = () => {
  // Example data - replace with real data
  const campaigns = [
    {
      id: 1,
      name: "Summer Sale 2024",
      budget: 5000,
      desc: "Lorem ipsum dolor sit, amet",
      date: "For One week",
      platform: "Multi-Platform",
    },
    {
      id: 2,
      name: "Product Launch",
      budget: 12000,
      desc: "Lorem ipsum dolor sit, amet",
      date: "For One Month",
      platform: "Social Media",
    },
    // Add more campaigns...
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Services</h1>
            <p className="text-gray-400">
              Create your marketing campaigns and track their progress.
            </p>
          </div>
          <Link to={"/services"}>
            <CustomSheet />
          </Link>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-gray-900/50 hover:border-gray-500/50 transition-all duration-300 rounded-2xl shadow-md hover:shadow-lg backdrop-blur-lg"
            >
              <div className="px-6 space-y-5">
                {/* Campaign Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {campaign.name}
                  </h3>
                </div>

                {/* Campaign Details */}
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-gray-100" />
                    <span className="font-medium">
                      Budget:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(campaign.budget)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-100" />
                    <span className="font-medium">
                      Platform: {campaign.platform}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-100" />
                    <span className="font-medium">{campaign.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <CustomModal campaign={campaign} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {campaigns.length === 0 && (
          <Card className="bg-gray-900/50 border-gray-900 text-center p-12">
            <div className="space-y-4">
              <FileText className="h-12 w-12 mx-auto text-gray-600" />
              <h3 className="text-xl font-semibold text-white">
                No Campaigns Found
              </h3>
              <p className="text-gray-400">
                Create your first campaign agreement to get started
              </p>
              <Button className="mt-4 bg-gradient-to-r from-gray-800 to-gray-700  hover:opacity-90">
                Create Campaign
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Services;
