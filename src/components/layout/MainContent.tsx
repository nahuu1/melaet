import { EmergencyServices } from "@/components/EmergencyServices";
import { ServicesList } from "@/components/services/ServicesList";
import { NearbyServices } from "@/components/services/NearbyServices";

export const MainContent = () => {
  return (
    <main className="flex-1 p-6">
      <ServicesList />
      <EmergencyServices 
        onEmergencyClick={(service) => console.log(`Emergency ${service} clicked`)}
        translations={{
          emergencyServices: "Emergency Services",
          ambulance: "Ambulance",
          medicalEmergency: "Medical Emergency",
          police: "Police",
          securityEmergency: "Security Emergency",
          fireBrigade: "Fire Brigade",
          fireEmergency: "Fire Emergency",
          trafficPolice: "Traffic Police",
          trafficEmergency: "Traffic Emergency"
        }}
      />
      <NearbyServices />
    </main>
  );
};