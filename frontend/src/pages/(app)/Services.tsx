import Layout from "./Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { DollarSign, FileText, Globe, Link as LinkIcon } from "lucide-react";
import { SheetDemo } from "./CustomSheet";

const Services = () => {
  // Example data - replace with real data
  const campaigns = [
    {
      id: 1,
      name: "Summer Sale 2024",
      status: "active",
      budget: 5000,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      platform: "Multi-Platform",
      agreementId: "AG-123456",
      progress: 65,
    },
    {
      id: 2,
      name: "Product Launch",
      status: "pending",
      budget: 12000,
      startDate: "2024-09-01",
      endDate: "2024-12-31",
      platform: "Social Media",
      agreementId: "AG-789012",
      progress: 20,
    },
    // Add more campaigns...
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-orange-500/20 text-orange-400";
      case "completed":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Predefined Services
            </h1>
            <p className="text-gray-400">
              Create your marketing campaigns and track their progress.
            </p>
          </div>
          <Link to={"/services"}>
            
            <SheetDemo />
          </Link>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-gray-900/50 border-gray-900 hover:border-purple-500/30 transition-colors"
            >
              <div className="p-6 space-y-4">
                {/* Campaign Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {campaign.name}
                    </h3>
                    <Badge
                      className={`mt-2 ${getStatusColor(campaign.status)}`}
                    >
                      {campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-100 to-pink-100 h-2 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{campaign.progress}% Completed</span>
                    <span>
                      {campaign.startDate} - {campaign.endDate}
                    </span>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <DollarSign className="h-4 w-4 text-purple-400" />
                    <span className="text-white">
                      Budget:{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(campaign.budget)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span className="text-white">
                      Platform: {campaign.platform}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <LinkIcon className="h-4 w-4 text-green-400" />
                    <span className="text-white">
                      Agreement ID: {campaign.agreementId}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="secondary" className="w-full ">
                    <FileText className="h-4 w-4 mr-2" />
                    Details
                  </Button>
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

export default Services;
