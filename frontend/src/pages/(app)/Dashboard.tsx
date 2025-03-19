import Layout from "./Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart4,
  Rocket,
  Zap,
  AlertCircle,
  DollarSign,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Example data - replace with real data
  const recentActivities = [
    {
      campaign: "Summer Sale",
      status: "Active",
      impressions: "1.2M",
      date: "2024-03-15",
    },
    {
      campaign: "Product Launch",
      status: "Completed",
      impressions: "890K",
      date: "2024-03-10",
    },
    {
      campaign: "Holiday Special",
      status: "Paused",
      impressions: "450K",
      date: "2024-03-05",
    },
  ];

  const campaignMetrics = [
    { platform: "Social Media", percentage: 45 },
    { platform: "Search Engines", percentage: 30 },
    { platform: "Direct Traffic", percentage: 15 },
    { platform: "Email", percentage: 10 },
  ];

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, Alex
            </h1>
            <p className="text-gray-400">{new Date().toLocaleDateString()}</p>
          </div>
          <Link to={"/services"}>
            <Button variant={"secondary"} className="gap-2  hover:opacity-90">
              <Rocket className="h-4 w-4" />
              New Campaign
            </Button>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gray-900/50 border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/20">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Reach</p>
                <h2 className="text-2xl font-bold text-white">1.8M</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-pink-500/20">
                <Zap className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <p className="text-gray-400">Engagement Rate</p>
                <h2 className="text-2xl font-bold text-white">12.4%</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-900/50 border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/20">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Spent</p>
                <h2 className="text-2xl font-bold text-white">$24,500</h2>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Impact Section */}
          <Card className="lg:col-span-2 p-6 bg-gray-900/50 border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Campaign Impact
              </h3>
              <Button variant="ghost" className="text-purple-400">
                View Details
              </Button>
            </div>
            <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
              <BarChart4 className="h-16 w-16 text-gray-600" />
              {/* Replace with actual chart component */}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-gray-900/50 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Recent Activity
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Campaign</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Impressions</TableHead>
                  <TableHead className="text-right text-gray-400">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-white">
                      {activity.campaign}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          activity.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : activity.status === "Completed"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {activity.impressions}
                    </TableCell>
                    <TableCell className="text-right text-gray-300">
                      {activity.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6 bg-gray-900/50 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Platform Distribution
            </h3>
            <div className="space-y-4">
              {campaignMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-400" />
                    <span className="text-gray-300">{metric.platform}</span>
                  </div>
                  <span className="text-white">{metric.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-gray-900/50 border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 hover:bg-gray-800"
              >
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                Generate Report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 hover:bg-gray-800"
              >
                <Zap className="h-4 w-4 text-blue-400" />
                Optimize Campaigns
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 hover:bg-gray-800"
              >
                <DollarSign className="h-4 w-4 text-green-400" />
                Add Funds
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
