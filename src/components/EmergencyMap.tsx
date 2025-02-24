
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
  
  // Addis Ababa coordinates
  const userLocation = { lat: 9.0222, lng: 38.7468 };
  
  // Mock emergency workers data for Addis Ababa
  const workers: EmergencyWorker[] = [
    {
      id: 1,
      name: "Black Lion Hospital",
      type: "Hospital",
      distance: 1.2,
      location: { lat: 9.0172, lng: 38.7488 },
      rating: 4.8,
      yearsOfExperience: 50
    },
    {
      id: 2,
      name: "Bole Police Station",
      type: "Police",
      distance: 1.5,
      location: { lat: 9.0137, lng: 38.7892 },
      rating: 4.9,
      yearsOfExperience: 25
    },
    {
      id: 3,
      name: "St. Paul's Hospital",
      type: "Hospital",
      distance: 2.1,
      location: { lat: 9.0299, lng: 38.7519 },
      rating: 4.7,
      yearsOfExperience: 40
    },
    {
      id: 4,
      name: "Kirkos Police Station",
      type: "Police",
      distance: 2.4,
      location: { lat: 9.0185, lng: 38.7578 },
      rating: 4.6,
      yearsOfExperience: 20
    },
    {
      id: 5,
      name: "Zewditu Hospital",
      type: "Hospital",
      distance: 1.8,
      location: { lat: 9.0135, lng: 38.7515 },
      rating: 4.7,
      yearsOfExperience: 35
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
      <div className="h-[400px]">
        <EmergencyMapView workers={workers} userLocation={userLocation} />
      </div>

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
    </div>
  );
};

export default EmergencyMap;
