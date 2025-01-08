import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Camera, Clock, MapPin, User, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmergencyMapView from "@/components/emergency/EmergencyMapView";

const translations = {
  english: {
    title: "Worker Dashboard",
    status: {
      online: "Online",
      offline: "Offline"
    },
    backHome: "Back to Home",
    workerInfo: {
      id: "ID",
      role: "Emergency Medical Technician",
      scanId: "Scan ID"
    },
    location: "Current Location",
    previousWork: "Previous Work",
    nearbyEmergencies: "Nearby Emergencies",
    actions: {
      accept: "Accept",
      ignore: "Ignore"
    }
  },
  amharic: {
    title: "የሰራተኛ ዳሽቦርድ",
    status: {
      online: "በመስመር ላይ",
      offline: "ከመስመር ውጭ"
    },
    backHome: "ወደ መነሻ ተመለስ",
    workerInfo: {
      id: "መታወቂያ",
      role: "የድንገተኛ ሕክምና ቴክኒሺያን",
      scanId: "መታወቂያ ስካን"
    },
    location: "አሁን ያለዎት ቦታ",
    previousWork: "ያለፉ ስራዎች",
    nearbyEmergencies: "አቅራቢያ ያሉ ድንገተኛ ጊዜዎች",
    actions: {
      accept: "ተቀበል",
      ignore: "አልቀበልም"
    }
  }
};

const WorkerDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [language, setLanguage] = useState<"english" | "amharic">("english");
  const navigate = useNavigate();

  const t = translations[language];

  const workerLocation = { lat: -8.783195, lng: 34.508523 };
  const emergencyLocation = { lat: -8.785195, lng: 34.510523 };

  const previousWork = [
    { id: 1, type: "Medical Emergency", date: "2024-02-20", status: "Completed", payment: "50 Birr" },
    { id: 2, type: "Fire Emergency", date: "2024-02-19", status: "Completed", payment: "75 Birr" },
  ];

  const nearbyEmergencies = [
    { id: 1, type: "Medical", distance: "0.5km", status: "Urgent", address: "123 Main St" },
    { id: 2, type: "Police", distance: "1.2km", status: "Medium", address: "456 Oak Ave" },
  ];

  const workers = [
    {
      id: 1,
      name: "Nahusenay Zewdu",
      type: "Medical Emergency",
      distance: 1.2,
      location: workerLocation,
      rating: 4.8,
      yearsOfExperience: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>{t.status.offline}</span>
              <Switch
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
              <span>{t.status.online}</span>
            </div>
            <Button 
              variant="outline"
              onClick={() => setLanguage(prev => prev === "english" ? "amharic" : "english")}
              className="mr-2"
            >
              {language === "english" ? "አማርኛ" : "English"}
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
            >
              {t.backHome}
            </Button>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Nahusenay Zewdu</h2>
              <p className="text-gray-600">{t.workerInfo.id}: W123456</p>
              <p className="text-gray-600">{t.workerInfo.role}</p>
            </div>
          </div>
          <Button 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => alert("Opening ID Scanner...")}
          >
            <Camera className="w-4 h-4" />
            {t.workerInfo.scanId}
          </Button>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">{t.location}</h3>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <EmergencyMapView 
              workers={workers}
              userLocation={emergencyLocation}
            />
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {t.previousWork}
            </h3>
            <div className="space-y-4">
              {previousWork.map((work) => (
                <div key={work.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{work.type}</p>
                      <p className="text-sm text-gray-600">{work.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-medium">{work.payment}</p>
                      <p className="text-sm text-gray-600">{work.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t.nearbyEmergencies}
            </h3>
            <div className="space-y-4">
              {nearbyEmergencies.map((emergency) => (
                <div key={emergency.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{emergency.type} Emergency</p>
                      <p className="text-sm text-gray-600">{emergency.address}</p>
                      <p className="text-sm text-gray-600">{emergency.distance} away</p>
                    </div>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">{t.actions.accept}</Button>
                      <Button size="sm" variant="outline" className="w-full">{t.actions.ignore}</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;