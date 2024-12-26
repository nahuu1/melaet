import { Card } from "@/components/ui/card";
import { MapPin, User, MessageCircle, Navigation } from "lucide-react";

interface EmergencyWorker {
  id: number;
  name: string;
  type: string;
  distance: number;
  location: { lat: number; lng: number };
  rating: number;
  yearsOfExperience: number;
}

interface Props {
  worker: EmergencyWorker;
  onNavigate: (worker: EmergencyWorker) => void;
  onChat: () => void;
}

const EmergencyWorkerCard = ({ worker, onNavigate, onChat }: Props) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
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
        <div className="flex gap-2">
          <button 
            className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors"
            onClick={() => onNavigate(worker)}
          >
            <Navigation className="w-5 h-5 text-green-600" />
          </button>
          <button 
            className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors"
            onClick={onChat}
          >
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default EmergencyWorkerCard;