import { Ambulance, Shield, Flame, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmergencyButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="destructive" className="flex items-center gap-2">
        <Ambulance className="w-4 h-4" />
        Ambulance
      </Button>
      <Button variant="destructive" className="flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Police
      </Button>
      <Button variant="destructive" className="flex items-center gap-2">
        <Flame className="w-4 h-4" />
        Fire
      </Button>
      <Button variant="destructive" className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Traffic
      </Button>
    </div>
  );
};