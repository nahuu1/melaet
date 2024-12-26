import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

export const ServicesList = () => {
  const services = [
    { id: 1, name: "Emergency Services", icon: "🚑" },
    { id: 2, name: "Medical Care", icon: "🏥" },
    { id: 3, name: "Home Services", icon: "🏠" },
    { id: 4, name: "Transportation", icon: "🚗" },
  ];

  return (
    <div className="mt-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">{service.icon}</div>
            <h3 className="font-medium">{service.name}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};