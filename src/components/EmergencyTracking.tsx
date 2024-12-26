import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface EmergencyTrackingProps {
  service: string;
  onClose: () => void;
}

const EmergencyTracking = ({ service, onClose }: EmergencyTrackingProps) => {
  // User's fixed location (destination)
  const userLocation = { lat: -8.783195, lng: 34.508523 };
  // Worker's starting location (about 1km away)
  const [workerLocation, setWorkerLocation] = useState({ 
    lat: userLocation.lat + 0.01, 
    lng: userLocation.lng + 0.01 
  });
  const [eta, setEta] = useState(5);
  
  useEffect(() => {
    // Simulate worker moving towards user's location
    const interval = setInterval(() => {
      setWorkerLocation(prev => {
        const newLat = prev.lat + (userLocation.lat - prev.lat) * 0.1;
        const newLng = prev.lng + (userLocation.lng - prev.lng) * 0.1;
        
        // Update ETA based on remaining distance
        const distance = Math.sqrt(
          Math.pow(userLocation.lat - newLat, 2) + 
          Math.pow(userLocation.lng - newLng, 2)
        );
        const newEta = Math.max(1, Math.round(distance * 500)); // Rough conversion to minutes
        setEta(newEta);
        
        return { lat: newLat, lng: newLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Generate route points between worker and user
  const routePoints = Array.from({ length: 5 }).map((_, i) => ({
    lat: workerLocation.lat + (userLocation.lat - workerLocation.lat) * (i / 4),
    lng: workerLocation.lng + (userLocation.lng - workerLocation.lng) * (i / 4)
  }));

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute left-4 top-4"
              onClick={onClose}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            Tracking {service.charAt(0).toUpperCase() + service.slice(1)} Response
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              Math.min(workerLocation.lng, userLocation.lng) - 0.01
            },${
              Math.min(workerLocation.lat, userLocation.lat) - 0.01
            },${
              Math.max(workerLocation.lng, userLocation.lng) + 0.01
            },${
              Math.max(workerLocation.lat, userLocation.lat) + 0.01
            }&layer=mapnik&marker=${workerLocation.lat},${workerLocation.lng}`}
            className="w-full h-full border-none"
          />
          
          {/* Route visualization */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                </marker>
              </defs>
              {routePoints.map((point, i) => {
                if (i === routePoints.length - 1) return null;
                const nextPoint = routePoints[i + 1];
                const x1 = (point.lng - (workerLocation.lng - 0.01)) / 0.02 * 100;
                const y1 = (point.lat - (workerLocation.lat - 0.01)) / 0.02 * 100;
                const x2 = (nextPoint.lng - (workerLocation.lng - 0.01)) / 0.02 * 100;
                const y2 = (nextPoint.lat - (workerLocation.lat - 0.01)) / 0.02 * 100;
                
                return (
                  <line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium">Estimated arrival time</p>
            <p className="text-lg font-bold">{eta} mins away</p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 bg-green-500 hover:bg-green-600">
              <Phone className="w-4 h-4 mr-2" />
              Voice Call
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onClose}>
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