import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { EmergencyWorker } from "@/types/emergency";

interface EmergencyMapViewProps {
  workers: EmergencyWorker[];
  userLocation: { lat: number; lng: number };
}

const EmergencyMapView = ({ workers, userLocation }: EmergencyMapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map('emergency-map').setView([userLocation.lat, userLocation.lng], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Add user location marker
      L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
          className: 'bg-blue-500 w-4 h-4 rounded-full border-2 border-white',
          iconSize: [16, 16]
        })
      })
        .addTo(mapRef.current)
        .bindPopup('Your Location');

      // Add worker markers
      workers.forEach(worker => {
        const workerIcon = L.divIcon({
          className: `bg-${getWorkerColor(worker.type)} w-4 h-4 rounded-full border-2 border-white`,
          iconSize: [16, 16]
        });

        L.marker([worker.location.lat, worker.location.lng], { icon: workerIcon })
          .addTo(mapRef.current!)
          .bindPopup(`${worker.name} (${worker.type})<br>Distance: ${worker.distance.toFixed(1)}km`);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [workers, userLocation]);

  return (
    <div id="emergency-map" className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg" />
  );
};

const getWorkerColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'ambulance':
      return 'red-500';
    case 'police':
      return 'blue-500';
    case 'fire brigade':
      return 'orange-500';
    case 'traffic police':
      return 'green-500';
    default:
      return 'gray-500';
  }
};

export default EmergencyMapView;