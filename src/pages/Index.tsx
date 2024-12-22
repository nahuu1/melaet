import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmergencyMap from "@/components/EmergencyMap";
import EmergencyForm from "@/components/EmergencyForm";
import { toast } from "@/components/ui/use-toast";
import { MapPin, Phone, Ambulance, Shield, Flame, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const translations = {
  english: {
    title: "Ethio Alert",
    language: "አማርኛ",
    signIn: "Sign In",
    emergencyServices: "Emergency Services",
    ambulance: "Ambulance",
    medicalEmergency: "Medical Emergency",
    police: "Police",
    securityEmergency: "Security Emergency",
    fireBrigade: "Fire Brigade",
    fireEmergency: "Fire Emergency",
    trafficPolice: "Traffic Police",
    trafficEmergency: "Traffic Emergency",
    emergencyHotline: "Emergency Hotline",
    callNow: "Call Now",
    userName: "Nahusenay Zewdu",
    userStatus: "Active",
  },
  amharic: {
    title: "ኢትዮ አለርት",
    language: "English",
    signIn: "ግባ",
    emergencyServices: "የድንገተኛ አደጋ አገልግሎቶች",
    ambulance: "አምቡላንስ",
    medicalEmergency: "የሕክምና አደጋ",
    police: "ፖሊስ",
    securityEmergency: "የደህንነት አደጋ",
    fireBrigade: "እሳት አደጋ መከላከያ",
    fireEmergency: "የእሳት አደጋ",
    trafficPolice: "የትራፊክ ፖሊስ",
    trafficEmergency: "የትራፊክ አደጋ",
    emergencyHotline: "የአደጋ ጊዜ የስልክ መስመር",
    callNow: "አሁን ይደውሉ",
    userName: "ናሁሰናይ ዘውዱ",
    userStatus: "አክቲቭ",
  }
};

const Index = () => {
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [language, setLanguage] = useState<"english" | "amharic">("english");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const t = translations[language];

  const handleEmergencyClick = (service: string) => {
    setSelectedService(service);
    setShowEmergencyForm(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/landing");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === "english" ? "amharic" : "english");
    toast({
      title: language === "english" ? "ቋንቋ ተቀይሯል" : "Language Changed",
      description: language === "english" ? "ወደ አማርኛ ተቀይሯል" : "Changed to English",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">{t.title}</h1>
          <div className="flex gap-4 items-center">
            <Button variant="outline" onClick={toggleLanguage}>
              {t.language}
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* User Information */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{user?.email}</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">0935344627</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {t.userStatus}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Emergency Services */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.emergencyServices}</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("ambulance")}
              >
                <Ambulance className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="font-semibold text-lg">{t.ambulance}</h3>
                <p className="text-sm text-gray-600">{t.medicalEmergency}</p>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("police")}
              >
                <Shield className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-semibold text-lg">{t.police}</h3>
                <p className="text-sm text-gray-600">{t.securityEmergency}</p>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("fire")}
              >
                <Flame className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="font-semibold text-lg">{t.fireBrigade}</h3>
                <p className="text-sm text-gray-600">{t.fireEmergency}</p>
              </Card>

              <Card 
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleEmergencyClick("traffic")}
              >
                <MapPin className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg">{t.trafficPolice}</h3>
                <p className="text-sm text-gray-600">{t.trafficEmergency}</p>
              </Card>
            </div>

            {/* Quick Call */}
            <Card className="p-6 bg-red-50">
              <div className="flex items-center gap-4">
                <Phone className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="font-semibold">{t.emergencyHotline}</h3>
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
                  {t.callNow}
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