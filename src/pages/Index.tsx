import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, LogOut } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EmergencyForm from "@/components/EmergencyForm";
import { MarketplaceSection } from "@/components/marketplace/MarketplaceSection";
import UserProfile from "@/components/UserProfile";
import EmergencyServices from "@/components/EmergencyServices";
import { Card } from "@/components/ui/card"; // Added the missing import

const translations = {
  english: {
    title: "Mella",
    language: "አማርኛ",
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
    userStatus: "Active",
  },
  amharic: {
    title: "ኢትዮ አለርት",
    language: "English",
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
          <h1 className="text-2xl font-bold text-red-600 font-['Nyala']">{t.title}</h1>
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
        {/* User Profile */}
        <UserProfile 
          email={user?.email} 
          language={language}
          translations={t}
        />

        {/* Emergency Services */}
        <EmergencyServices 
          onEmergencyClick={handleEmergencyClick}
          translations={t}
        />

        {/* Quick Call */}
        <div className="mt-8">
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

        {/* Marketplace Section */}
        <MarketplaceSection />

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