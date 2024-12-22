import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmergencyMap from "@/components/EmergencyMap";
import EmergencyForm from "@/components/EmergencyForm";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Phone, Ambulance, Shield, Flame } from "lucide-react";

const Index = () => {
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleEmergencyClick = (service: string) => {
    setSelectedService(service);
    setShowEmergencyForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Ethio Alert</h1>
          <div className="flex gap-4">
            <Button variant="outline">አማርኛ</Button>
            <Button variant="outline">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Emergency Services */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Emergency Services</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("ambulance")}
              >
                <Ambulance className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="font-semibold text-lg">Ambulance</h3>
                <p className="text-sm text-gray-600">Medical Emergency</p>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("police")}
              >
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg">Police</h3>
                <p className="text-sm text-gray-600">Security Emergency</p>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("fire")}
              >
                <Flame className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="font-semibold text-lg">Fire Brigade</h3>
                <p className="text-sm text-gray-600">Fire Emergency</p>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("traffic")}
              >
                <MapPin className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg">Traffic Police</h3>
                <p className="text-sm text-gray-600">Traffic Emergency</p>
              </Card>
            </div>

            {/* Quick Call */}
            <Card className="p-6 bg-red-50">
              <div className="flex items-center gap-4">
                <Phone className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="font-semibold">Emergency Hotline</h3>
                  <p className="text-red-600 font-bold">911</p>
                </div>
                <Button 
                  className="ml-auto"
                  variant="destructive"
                  onClick={() => {
                    toast({
                      title: "Calling Emergency Services",
                      description: "Connecting to the nearest dispatcher...",
                    });
                  }}
                >
                  Call Now
                </Button>
              </div>
            </Card>
          </div>

          {/* Map Section */}
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <EmergencyMap />
          </div>
        </div>

        {/* Emergency Form Dialog */}
        {showEmergencyForm && (
          <EmergencyForm
            service={selectedService}
            onClose={() => setShowEmergencyForm(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Index;