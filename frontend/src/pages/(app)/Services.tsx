import Layout from "./Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, Milestone, Plus } from "lucide-react";
import { CustomSheet } from "./CustomSheet";
import { CustomModal } from "./CustomModal";
import { campaigns } from "@/utils/constants";

const Services = () => {
  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-white">Service</h1>
            <p className="text-sm text-gray-400">
              Create new agreement using our template or your own requirment
            </p>
          </div>
          <CustomSheet />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors"
            >
              <div className="p-4 space-y-4">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">{campaign.name}</h3>
                    <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800/50 rounded border border-gray-600">
                      {campaign.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{campaign.desc}</p>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-white">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    }).format(campaign.budget / 1000000)}
                  </span>
                </div>

                {/* Milestones */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Milestone className="h-4 w-4" />
                    <span>Milestones</span>
                  </div>
                  <div className="space-y-1.5">
                    {campaign.milestones.slice(0, 3).map((milestone, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-300 truncate max-w-[120px]">
                          {index === 0
                            ? "Initial Payment"
                            : index === 1
                            ? "Second Payment"
                            : index === 2
                            ? "Final Payment"
                            : ""}
                        </span>
                        <span className="text-gray-400">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                          }).format(milestone.paymentAmount / 1000000)}
                        </span>
                      </div>
                    ))}
                    {campaign.milestones.length > 3 && (
                      <div className="text-xs text-gray-500 pt-1">
                        +{campaign.milestones.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Action */}
                <CustomModal campaign={campaign} />
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {campaigns.length === 0 && (
          <Card className="border-gray-800 text-center p-8">
            <div className="space-y-3">
              <FileText className="h-6 w-6 mx-auto text-gray-600" />
              <h3 className="text-sm font-medium text-white">
                No campaigns yet
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Create your first campaign
              </p>
              <Button size="sm" className="gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>New Campaign</span>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Services;
