import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmergencyWorkerCard from "./emergency/EmergencyWorkerCard";
import ChatDialog from "./emergency/ChatDialog";

interface EmergencyWorker {
  id: number;
  name: string;
  type: string;
  distance: number;
  location: { lat: number; lng: number };
  rating: number;
  yearsOfExperience: number;
}

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

const EmergencyMap = () => {
  const [workers, setWorkers] = useState<EmergencyWorker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<EmergencyWorker | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const userLocation = { lat: -8.783195, lng: 34.508523 };
  const [chatHistory] = useState<ChatMessage[]>([
    { id: 1, sender: "Worker", message: "I'm on my way!", timestamp: "10:30 AM" },
    { id: 2, sender: "You", message: "Please hurry!", timestamp: "10:31 AM" },
    { id: 3, sender: "Worker", message: "ETA 5 minutes", timestamp: "10:32 AM" },
  ]);

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

  const handleWorkerSelect = (worker: EmergencyWorker) => {
    setSelectedWorker(worker);
    setShowNavigation(true);
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

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
          <EmergencyWorkerCard
            key={worker.id}
            worker={worker}
            onNavigate={handleWorkerSelect}
            onChat={() => setShowChat(true)}
          />
        ))}
      </div>

      {/* Navigation Dialog */}
      <Dialog open={showNavigation} onOpenChange={setShowNavigation}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="h-[400px] relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                userLocation.lng - 0.02
              },${
                userLocation.lat - 0.02
              },${
                userLocation.lng + 0.02
              },${
                userLocation.lat + 0.02
              }&layer=mapnik&marker=${userLocation.lat},${userLocation.lng}`}
              className="w-full h-full border-none"
            />
          </div>
          <div className="flex gap-4">
            <Button className="flex-1" onClick={() => setShowNavigation(false)}>
              Voice Call
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => setShowNavigation(false)}
            >
              End Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat History Dialog */}
      <ChatDialog
        open={showChat}
        onOpenChange={setShowChat}
        messages={chatHistory}
      />

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 py-4 border-t">
        Made by Tech Space ET
      </footer>
    </div>
  );
};

export default EmergencyMap;
