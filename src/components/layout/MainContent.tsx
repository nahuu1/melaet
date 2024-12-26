import { EmergencyMap } from "../emergency/EmergencyMap";
import { ServicesList } from "../services/ServicesList";
import { NearbyServices } from "../services/NearbyServices";

export const MainContent = () => {
  return (
    <main className="flex-1 p-6">
      <EmergencyMap />
      <ServicesList />
      <NearbyServices />
    </main>
  );
};