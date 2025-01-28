import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, MapPin, Phone, AlertCircle } from "lucide-react";
import EmergencyMapView from "@/components/emergency/EmergencyMapView";

interface EmergencyUnit {
  id: number;
  name: string;
  type: string;
  status: "available" | "responding" | "busy";
  location: { lat: number; lng: number };
  currentEmergency?: {
    id: number;
    type: string;
    location: { lat: number; lng: number };
    patientName: string;
    contactNumber: string;
    description: string;
  };
}

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState<EmergencyUnit[]>([
    {
      id: 1,
      name: "Ambulance Unit 1",
      type: "Ambulance",
      status: "available",
      location: { lat: -8.783195, lng: 34.508523 }
    },
    {
      id: 2,
      name: "Fire Unit 1",
      type: "Fire Brigade",
      status: "responding",
      location: { lat: -8.785195, lng: 34.506523 },
      currentEmergency: {
        id: 1,
        type: "Fire Emergency",
        location: { lat: -8.786195, lng: 34.507523 },
        patientName: "John Doe",
        contactNumber: "+251912345678",
        description: "Building fire at commercial complex"
      }
    },
    {
      id: 3,
      name: "Police Unit 1",
      type: "Police",
      status: "busy",
      location: { lat: -8.781195, lng: 34.509523 },
      currentEmergency: {
        id: 2,
        type: "Security Emergency",
        location: { lat: -8.782195, lng: 34.510523 },
        patientName: "Jane Smith",
        contactNumber: "+251987654321",
        description: "Security incident at residential area"
      }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "responding":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStatusChange = (unitId: number, newStatus: "available" | "responding" | "busy") => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, status: newStatus } : unit
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Emergency Response Dashboard</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-4 mb-6">
              <EmergencyMapView 
                workers={units.map(unit => ({
                  id: unit.id,
                  name: unit.name,
                  type: unit.type,
                  distance: 0,
                  location: unit.location,
                  rating: 4.5,
                  yearsOfExperience: 5
                }))} 
                userLocation={{ lat: -8.783195, lng: 34.508523 }}
              />
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Emergency Units</h2>
            {units.map((unit) => (
              <Card key={unit.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{unit.name}</h3>
                  <Badge className={getStatusColor(unit.status)}>
                    {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{unit.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      Location: ({unit.location.lat.toFixed(3)}, {unit.location.lng.toFixed(3)})
                    </span>
                  </div>
                </div>

                {unit.currentEmergency && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">Current Emergency</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p>{unit.currentEmergency.description}</p>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{unit.currentEmergency.contactNumber}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    variant={unit.status === "available" ? "default" : "outline"}
                    onClick={() => handleStatusChange(unit.id, "available")}
                    className="flex-1"
                  >
                    Available
                  </Button>
                  <Button
                    size="sm"
                    variant={unit.status === "responding" ? "default" : "outline"}
                    onClick={() => handleStatusChange(unit.id, "responding")}
                    className="flex-1"
                  >
                    Responding
                  </Button>
                  <Button
                    size="sm"
                    variant={unit.status === "busy" ? "default" : "outline"}
                    onClick={() => handleStatusChange(unit.id, "busy")}
                    className="flex-1"
                  >
                    Busy
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;