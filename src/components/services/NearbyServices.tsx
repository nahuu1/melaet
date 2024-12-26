import { Card } from "../ui/card";
import { MapPin } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  distance: number;
  image: string;
}

const mockServices: Service[] = [
  {
    id: "1",
    title: "Emergency Plumbing Service",
    description: "24/7 emergency plumbing repairs and maintenance",
    distance: 1.2,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Mobile Car Mechanic",
    description: "On-site car repair and diagnostics",
    distance: 2.5,
    image: "/placeholder.svg"
  },
  // Add more mock services as needed
];

export const NearbyServices = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Nearby Services</h2>
      <div className="grid gap-4">
        {mockServices.map((service) => (
          <Card key={service.id} className="p-4">
            <div className="flex gap-4">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {service.distance} km away
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};