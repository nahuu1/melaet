import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, User } from "lucide-react";

interface EmergencyWorker {
  id: number;
  name: string;
  type: string;
  distance: number;
  location: { lat: number; lng: number };
  rating: number;
  yearsOfExperience: number;
}

const EmergencyMap = () => {
  const [workers, setWorkers] = useState<EmergencyWorker[]>([]);
  const userLocation = { lat: -8.783195, lng: 34.508523 };

  useEffect(() => {
    // Simulate nearby emergency workers
    const mockWorkers: EmergencyWorker[] = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        type: "Ambulance",
        distance: 1.2,
        location: { lat: userLocation.lat + 0.01, lng: userLocation.lng + 0.01 },
        rating: 4.8,
        yearsOfExperience: 8
      },
      {
        id: 2,
        name: "Officer Michael Chen",
        type: "Police",
        distance: 1.5,
        location: { lat: userLocation.lat - 0.01, lng: userLocation.lng + 0.015 },
        rating: 4.9,
        yearsOfExperience: 12
      },
      {
        id: 3,
        name: "Capt. James Wilson",
        type: "Fire Brigade",
        distance: 2.1,
        location: { lat: userLocation.lat + 0.02, lng: userLocation.lng - 0.01 },
        rating: 4.7,
        yearsOfExperience: 15
      },
      {
        id: 4,
        name: "Dr. Emily Martinez",
        type: "Ambulance",
        distance: 2.4,
        location: { lat: userLocation.lat - 0.015, lng: userLocation.lng - 0.02 },
        rating: 4.6,
        yearsOfExperience: 6
      },
      {
        id: 5,
        name: "Officer David Kim",
        type: "Traffic Police",
        distance: 2.8,
        location: { lat: userLocation.lat + 0.025, lng: userLocation.lng + 0.02 },
        rating: 4.5,
        yearsOfExperience: 7
      },
      {
        id: 6,
        name: "Lt. Robert Brown",
        type: "Fire Brigade",
        distance: 3.2,
        location: { lat: userLocation.lat - 0.02, lng: userLocation.lng + 0.03 },
        rating: 4.9,
        yearsOfExperience: 10
      },
      {
        id: 7,
        name: "Dr. Lisa Wong",
        type: "Ambulance",
        distance: 3.5,
        location: { lat: userLocation.lat + 0.03, lng: userLocation.lng - 0.025 },
        rating: 4.7,
        yearsOfExperience: 9
      },
      {
        id: 8,
        name: "Officer Sarah Miller",
        type: "Police",
        distance: 3.8,
        location: { lat: userLocation.lat - 0.025, lng: userLocation.lng - 0.03 },
        rating: 4.8,
        yearsOfExperience: 11
      }
    ];

    setWorkers(mockWorkers);
  }, []);

  return (
    <div className="space-y-4">
      {/* Map */}
      <div className="w-full h-[400px] relative bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            userLocation.lng - 0.05
          },${
            userLocation.lat - 0.05
          },${
            userLocation.lng + 0.05
          },${
            userLocation.lat + 0.05
          }&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`}
          className="w-full h-full border-none"
        />
      </div>

      {/* Workers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {workers.map((worker) => (
          <Card key={worker.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{worker.name}</h3>
                <p className="text-sm text-gray-600">{worker.type}</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {worker.distance} km away
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">⭐</span>
                    {worker.rating}
                  </div>
                  <div className="text-sm text-gray-600">
                    {worker.yearsOfExperience} years exp.
                  </div>
                </div>
              </div>
              <button className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors">
                <Phone className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyMap;