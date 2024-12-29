import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, LogOut, Home, Car, Mail, User, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, Link } from "react-router-dom";
import EmergencyForm from "@/components/EmergencyForm";
import { MarketplaceSection } from "@/components/marketplace/MarketplaceSection";
import UserProfile from "@/components/UserProfile";
import EmergencyServices from "@/components/EmergencyServices";
import { Card } from "@/components/ui/card";
import { translations } from "@/translations";

const Index = () => {
  const [language, setLanguage] = useState<"english" | "amharic">("english");
  const t = translations[language];

  const handleEmergencyClick = (service: string) => {
    toast({
      title: "Emergency Service Selected",
      description: `You selected ${service} service. Help is on the way.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        <EmergencyServices 
          onEmergencyClick={handleEmergencyClick}
          translations={t}
        />
        <MarketplaceSection />
      </div>
    </div>
  );
};

export default Index;