export interface EmergencyWorker {
  id: number;
  name: string;
  type: string;
  distance: number;
  location: { lat: number; lng: number };
  rating: number;
  yearsOfExperience: number;
}

export interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}