import { Card } from "@/components/ui/card";
import { Ambulance, Shield, Flame, MapPin } from "lucide-react";
import EmergencyMap from "./EmergencyMap";

interface EmergencyServicesProps {
  onEmergencyClick: (service: string) => void;
  translations: {
    emergencyServices: string;
    ambulance: string;
    medicalEmergency: string;
    police: string;
    securityEmergency: string;
    fireBrigade: string;
    fireEmergency: string;
    trafficPolice: string;
    trafficEmergency: string;
  };
}

export const EmergencyServices = ({ onEmergencyClick, translations }: EmergencyServicesProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {translations.emergencyServices}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onEmergencyClick("ambulance")}
          >
            <Ambulance className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="font-semibold text-lg">{translations.ambulance}</h3>
            <p className="text-sm text-gray-600">{translations.medicalEmergency}</p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onEmergencyClick("police")}
          >
            <Shield className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg">{translations.police}</h3>
            <p className="text-sm text-gray-600">{translations.securityEmergency}</p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onEmergencyClick("fire")}
          >
            <Flame className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="font-semibold text-lg">{translations.fireBrigade}</h3>
            <p className="text-sm text-gray-600">{translations.fireEmergency}</p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onEmergencyClick("traffic")}
          >
            <MapPin className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg">{translations.trafficPolice}</h3>
            <p className="text-sm text-gray-600">{translations.trafficEmergency}</p>
          </Card>
        </div>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
        <EmergencyMap />
      </div>
    </div>
  );
};