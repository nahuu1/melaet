import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff } from "lucide-react";
import { useState, useEffect } from "react";

interface EmergencyTrackingProps {
  service: string;
  onClose: () => void;
}

const EmergencyTracking = ({ service, onClose }: EmergencyTrackingProps) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: -8.783195, lng: 34.508523 });
  
  useEffect(() => {
    // Simulate moving location
    const interval = setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + 0.0001 * (Math.random() - 0.5),
        lng: prev.lng + 0.0001 * (Math.random() - 0.5)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Tracking {service.charAt(0).toUpperCase() + service.slice(1)} Response
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentLocation.lng - 0.01},${currentLocation.lat - 0.01},${currentLocation.lng + 0.01},${currentLocation.lat + 0.01}&layer=mapnik&marker=${currentLocation.lat},${currentLocation.lng}`}
            className="w-full h-full border-none"
          />
          
          {/* Route line simulation */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-full w-1 bg-green-500 opacity-50 absolute left-1/2 transform -translate-x-1/2" />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium">Estimated arrival time</p>
            <p className="text-lg font-bold">5 mins away</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              Economy
            </Button>
            <Button variant="outline" className="w-full">
              Luxury
            </Button>
            <Button variant="outline" className="w-full">
              Family
            </Button>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-green-500 hover:bg-green-600">
              <Phone className="w-4 h-4 mr-2" />
              Voice Call
            </Button>
            <Button variant="destructive" className="flex-1">
              <PhoneOff className="w-4 h-4 mr-2" />
              End Call
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyTracking;