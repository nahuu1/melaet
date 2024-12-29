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

// Move translations to a separate file to reduce file size
<lov-write file_path="src/translations/index.ts">
export const translations = {
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