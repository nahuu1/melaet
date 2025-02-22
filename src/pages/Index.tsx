import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, LogOut, Home, Car, Mail, User, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import EmergencyForm from "@/components/EmergencyForm";
import { MarketplaceSection } from "@/components/marketplace/MarketplaceSection";
import { Card } from "@/components/ui/card";
import { NearbyServices } from "@/components/home/NearbyServices";
import { NearbyProducts } from "@/components/home/NearbyProducts";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { EmergencyMapSection } from "@/components/home/EmergencyMapSection";
import { useIsMobile } from "@/hooks/use-mobile";
import PostForm from "@/components/social/PostForm";
import PostsList from "@/components/social/PostsList";
import { AppSidebar } from "@/components/AppSidebar";

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
    nearbyServices: "Nearby Services",
    nearbyProducts: "Nearby Products",
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
    title: "መላ",
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
    nearbyServices: "አቅራቢያ አገልግሎቶች",
    nearbyProducts: "አቅራቢያ ምርቶች",
    services: {
      dogTraining: "ውሻ ማሰልጠን",
      heartCare: "የልብ እንክብካቤ አገልግሎት",
      homeRepair: "የቤት ጥገና",
      security: "የጥበቃ አገልግሎት",
      painting: "ቀለም",
      ተጨማሪ ስራዎች: "ተጨማሪ ስራዎች"
    }
  }
};

const Index = () => {
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [language, setLanguage] = useState<"english" | "amharic">("english");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
      {/* Header */}
      <header className="bg-[#1B8B34] text-white py-3 px-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold font-['Nyala']">{t.title}</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="outline" 
              className="bg-[#2EA043] text-white border-none hover:bg-[#2EA043]/90 text-sm px-2 sm:px-4"
              onClick={toggleLanguage}
            >
              {t.language}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          {/* Hero Map Section */}
          <div className="w-full h-[60vh] relative">
            {(!isMobile || (isMobile && showEmergencyForm)) && (
              <EmergencyMapSection
                onEmergencyClick={handleEmergencyClick}
                translations={t}
              />
            )}
          </div>

          <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Left Sidebar */}
              {/* Main Content Area */}
              <div className="flex-1">
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for emergency services, locations, or keywords..."
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Social Feed Section */}
                <div className="mb-8">
                  <Card className="p-4">
                    <PostForm />
                  </Card>
                  <div className="mt-4">
                    <PostsList />
                  </div>
                </div>

                {/* Service Categories */}
                <ServiceCategories translations={t} />

                {/* Nearby Services Section */}
                <div className="mt-6 sm:mt-8">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t.nearbyServices}</h2>
                  <NearbyServices />
                </div>

                {/* Nearby Products Section */}
                <div className="mt-6 sm:mt-8">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t.nearbyProducts}</h2>
                  <NearbyProducts />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showEmergencyForm && (
        <EmergencyForm
          service={selectedService}
          onClose={() => setShowEmergencyForm(false)}
        />
      )}

      <footer className="bg-[#1B8B34] text-white py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>
              <a 
                href="http://techspace.rf.gd/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Made by Tech Space ET
              </a>
            </p>
            <div className="flex gap-4">
              <Link 
                to="/worker"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Worker Portal
              </Link>
              <Link 
                to="/admin"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
