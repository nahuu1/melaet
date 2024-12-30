import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  name: string;
  provider: string;
  type: string;
  description: string;
  price: number;
  distance: number;
  rating: number;
  image: string;
  location: string;
}

const services: Service[] = [
  {
    id: "1",
    name: "Traditional Coffee Ceremony",
    provider: "Bethlehem Alemu",
    type: "Cultural Service",
    description: "Authentic Ethiopian coffee ceremony with traditional roasting and brewing methods",
    price: 300,
    distance: 1.2,
    rating: 4.8,
    image: "/placeholder.svg",
    location: "Bole, Addis Ababa"
  },
  {
    id: "2",
    name: "Home-cooked Ethiopian Meals",
    provider: "Tigist Haile",
    type: "Food Service",
    description: "Fresh, authentic Ethiopian dishes prepared and delivered to your location",
    price: 450,
    distance: 2.5,
    rating: 4.9,
    image: "/placeholder.svg",
    location: "Kazanchis, Addis Ababa"
  },
  {
    id: "3",
    name: "Traditional Dance Performance",
    provider: "Yared Tedla",
    type: "Entertainment",
    description: "Professional Ethiopian traditional dance performances for events",
    price: 1200,
    distance: 3.1,
    rating: 4.7,
    image: "/placeholder.svg",
    location: "Piassa, Addis Ababa"
  },
  {
    id: "4",
    name: "Amharic Language Tutoring",
    provider: "Kidist Mengesha",
    type: "Education",
    description: "Private Amharic language lessons for beginners to advanced learners",
    price: 400,
    distance: 0.8,
    rating: 4.9,
    image: "/placeholder.svg",
    location: "Sarbet, Addis Ababa"
  },
  {
    id: "5",
    name: "Traditional Clothing",
    provider: "Solomon Kebede",
    type: "Fashion",
    description: "Handmade traditional Ethiopian clothing and accessories",
    price: 800,
    distance: 1.5,
    rating: 4.6,
    image: "/placeholder.svg",
    location: "Mexico, Addis Ababa"
  },
  {
    id: "6",
    name: "Local Tour Guide",
    provider: "Dawit Assefa",
    type: "Tourism",
    description: "Personalized tours of historical and cultural sites in Addis Ababa",
    price: 600,
    distance: 2.0,
    rating: 4.8,
    image: "/placeholder.svg",
    location: "Entoto, Addis Ababa"
  },
  {
    id: "7",
    name: "Traditional Music Lessons",
    provider: "Meskerem Tadesse",
    type: "Music",
    description: "Learn to play traditional Ethiopian instruments",
    price: 350,
    distance: 1.7,
    rating: 4.7,
    image: "/placeholder.svg",
    location: "Gerji, Addis Ababa"
  },
  {
    id: "8",
    name: "Event Photography",
    provider: "Abel Tesfaye",
    type: "Photography",
    description: "Professional photography services for cultural events and ceremonies",
    price: 1500,
    distance: 2.8,
    rating: 4.8,
    image: "/placeholder.svg",
    location: "CMC, Addis Ababa"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const navigate = useNavigate();

  const handleMessageProvider = (service: Service) => {
    navigate("/messages");
    toast({
      title: "Chat initiated",
      description: `You can now chat with ${service.provider}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/home" className="flex items-center text-blue-500 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Local Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedService(service)}
          >
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={service.image} />
                <AvatarFallback>{service.provider[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.provider}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">{service.distance} km away</span>
                  <span className="text-sm text-gray-600">⭐ {service.rating}</span>
                </div>
                <p className="text-sm font-semibold mt-2">${service.price}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedService.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedService.image} />
                  <AvatarFallback>{selectedService.provider[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedService.provider}</h3>
                  <p className="text-sm text-gray-600">{selectedService.type}</p>
                </div>
              </div>
              <p className="text-gray-600">{selectedService.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{selectedService.location}</span>
                <span className="text-sm text-gray-600">{selectedService.distance} km away</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating: ⭐ {selectedService.rating}</span>
                <span className="font-semibold">${selectedService.price}</span>
              </div>
              <div className="flex gap-4 mt-4">
                <Button className="flex-1" onClick={() => {
                  toast({
                    title: "Call initiated",
                    description: `Calling ${selectedService.provider}...`,
                  });
                }}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleMessageProvider(selectedService)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Services;