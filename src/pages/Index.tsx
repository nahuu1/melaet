import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, LogOut, Home, Car, Mail, User, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import EmergencyForm from "@/components/EmergencyForm";
import { MarketplaceSection } from "@/components/marketplace/MarketplaceSection";
import UserProfile from "@/components/UserProfile";
import EmergencyServices from "@/components/EmergencyServices";
import { Card } from "@/components/ui/card";
import { NearbyServices } from "@/components/home/NearbyServices";

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
    services: {
      dogTraining: "Dog Training",
      heartCare: "Heart Care Service",
      homeRepair: "Home Repair",
      security: "Security Service",
      painting: "Painting",
      otherServices: "Other Services"
    }
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
    services: {
      dogTraining: "ውሻ ማሰልጠን",
      heartCare: "የልብ እንክብካቤ አገልግሎት",
      homeRepair: "የቤት ጥገና",
      security: "የጥበቃ አገልግሎት",
      painting: "ቀለም",
      otherServices: "ተጨማሪ ስራዎች"
    }
  }
};

const ServiceCard = ({ icon, title }: { icon: string; title: string }) => (
  <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
  </Card>
);

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
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="bg-[#1B8B34] text-white py-3 px-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-['Nyala']">{t.title}</h1>
          <div className="flex items-center gap-4">
            <Link to="/home" className="hover:text-gray-200">
              <Home className="w-5 h-5" />
            </Link>
            <Link to="/services" className="hover:text-gray-200">
              <Car className="w-5 h-5" />
            </Link>
            <Link to="/messages" className="hover:text-gray-200">
              <Mail className="w-5 h-5" />
            </Link>
            <Link to={`/profile/${user?.uid}`} className="hover:text-gray-200">
              <User className="w-5 h-5" />
            </Link>
            <Button 
              variant="outline" 
              className="bg-[#2EA043] text-white border-none hover:bg-[#2EA043]/90"
              onClick={toggleLanguage}
            >
              {t.language}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-start gap-8">
          {/* Left Sidebar */}
          <div className="w-1/4">
            <Card className="p-6 bg-white shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={user?.photoURL || '/placeholder.svg'} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h2 className="font-semibold text-lg">{user?.displayName || user?.email}</h2>
                  <p className="text-gray-600">0935344627</p>
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mt-2"></div>
                </div>
              </div>

              {/* Emergency Service Buttons */}
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                  onClick={() => handleEmergencyClick("ambulance")}
                >
                  <Phone className="w-4 h-4" />
                  {t.ambulance}
                </Button>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                  onClick={() => handleEmergencyClick("police")}
                >
                  <Phone className="w-4 h-4" />
                  {t.police}
                </Button>
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                  onClick={() => handleEmergencyClick("fire")}
                >
                  <Phone className="w-4 h-4" />
                  {t.fireBrigade}
                </Button>
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
                  onClick={() => handleEmergencyClick("traffic")}
                >
                  <Phone className="w-4 h-4" />
                  {t.trafficPolice}
                </Button>
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {t.emergencyHotline}
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for emergency services, locations, or keywords..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <ServiceCard icon="🐕" title={t.services.dogTraining} />
              <ServiceCard icon="❤️" title={t.services.heartCare} />
              <ServiceCard icon="🔨" title={t.services.homeRepair} />
              <ServiceCard icon="🛡️" title={t.services.security} />
              <ServiceCard icon="🎨" title={t.services.painting} />
              <ServiceCard icon="⚙️" title={t.services.otherServices} />
            </div>

            {/* Emergency Map */}
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg mb-8">
              <EmergencyServices
                onEmergencyClick={handleEmergencyClick}
                translations={t}
              />
            </div>

            {/* Nearby Services Section */}
            <NearbyServices />
          </div>
        </div>

        {showEmergencyForm && (
          <EmergencyForm
            service={selectedService}
            onClose={() => setShowEmergencyForm(false)}
          />
        )}
      </main>

      <footer className="bg-[#1B8B34] text-white py-4 text-center">
        <p>Made by Tech Space ET</p>
      </footer>
    </div>
  );
};

export default Index;
