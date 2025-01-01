import { Card } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  AlertTriangle,
  Activity,
  Settings,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "text-blue-500" },
    { title: "Active Workers", value: "56", icon: Briefcase, color: "text-green-500" },
    { title: "Emergency Calls", value: "89", icon: AlertTriangle, color: "text-red-500" },
    { title: "Response Rate", value: "95%", icon: Activity, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Manage Users
              </Button>
              <Button className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Manage Workers
              </Button>
              <Button className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Reports
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">New worker registration</p>
                    <p className="text-sm text-gray-600">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;