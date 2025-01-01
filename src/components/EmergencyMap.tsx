import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ChatDialog from "./emergency/ChatDialog";
import EmergencyMapView from "./emergency/EmergencyMapView";
import WorkersList from "./emergency/WorkersList";
import { EmergencyWorker, ChatMessage } from "@/types/emergency";

const EmergencyMap = () => {
  const [selectedWorker, setSelectedWorker] = useState<EmergencyWorker | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const userLocation = { lat: -8.783195, lng: 34.508523 };
  
  // Mock emergency workers data
  const workers: EmergencyWorker[] = [
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

  const chatHistory: ChatMessage[] = [
    { id: 1, sender: "Worker", message: "I'm on my way!", timestamp: "10:30 AM" },
    { id: 2, sender: "You", message: "Please hurry!", timestamp: "10:31 AM" },
    { id: 3, sender: "Worker", message: "ETA 5 minutes", timestamp: "10:32 AM" },
  ];

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

      {/* Map View */}
      <EmergencyMapView workers={workers} userLocation={userLocation} />

      {/* Workers List */}
      <WorkersList
        workers={workers}
        onNavigate={handleWorkerSelect}
        onChat={() => setShowChat(true)}
      />

      {/* Navigation Dialog */}
      <Dialog open={showNavigation} onOpenChange={setShowNavigation}>
        <DialogContent className="sm:max-w-[425px]">
          <EmergencyMapView 
            workers={selectedWorker ? [selectedWorker] : []} 
            userLocation={userLocation} 
          />
          <div className="flex gap-4 mt-4">
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
