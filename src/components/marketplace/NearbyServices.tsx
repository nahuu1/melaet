import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  distance: number;
  location: string;
  provider: {
    id: string;
    name: string;
    rating: number;
  };
  type: "service" | "product";
  image: string;
}

const nearbyServices: Service[] = [
  {
    id: "1",
    title: "Traditional Coffee Ceremony",
    description: "Authentic Ethiopian coffee ceremony service, including all traditional elements and fresh coffee beans.",
    price: 500,
    distance: 1.2,
    location: "Bole, Addis Ababa",
    provider: {
      id: "u1",
      name: "Bethlehem Alemu",
      rating: 4.8
    },
    type: "service",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Handwoven Ethiopian Scarves",
    description: "Beautiful handwoven scarves made with traditional Ethiopian patterns and premium cotton.",
    price: 800,
    distance: 2.5,
    location: "Piassa, Addis Ababa",
    provider: {
      id: "u2",
      name: "Kidist Haile",
      rating: 4.9
    },
    type: "product",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Traditional Dance Performance",
    description: "Professional Ethiopian traditional dance performance for events and celebrations.",
    price: 3000,
    distance: 3.1,
    location: "Kazanchis, Addis Ababa",
    provider: {
      id: "u3",
      name: "Yared Tadesse",
      rating: 4.7
    },
    type: "service",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Homemade Injera",
    description: "Fresh, homemade injera made with 100% teff flour, available for regular delivery.",
    price: 200,
    distance: 0.8,
    location: "Gerji, Addis Ababa",
    provider: {
      id: "u4",
      name: "Martha Gebru",
      rating: 5.0
    },
    type: "product",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Traditional Music Lessons",
    description: "Learn to play traditional Ethiopian instruments including Masinko and Krar.",
    price: 400,
    distance: 1.5,
    location: "Sarbet, Addis Ababa",
    provider: {
      id: "u5",
      name: "Dawit Mekonnen",
      rating: 4.8
    },
    type: "service",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Handmade Leather Bags",
    description: "Authentic Ethiopian leather bags, handcrafted with traditional designs.",
    price: 1200,
    distance: 2.0,
    location: "Mexico, Addis Ababa",
    provider: {
      id: "u6",
      name: "Solomon Bekele",
      rating: 4.6
    },
    type: "product",
    image: "/placeholder.svg"
  },
  {
    id: "7",
    title: "Ethiopian Cooking Classes",
    description: "Learn to cook traditional Ethiopian dishes with an experienced chef.",
    price: 600,
    distance: 1.7,
    location: "Summit, Addis Ababa",
    provider: {
      id: "u7",
      name: "Tigist Mengistu",
      rating: 4.9
    },
    type: "service",
    image: "/placeholder.svg"
  }
];

export const NearbyServices = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContact = (type: "call" | "message") => {
    if (!selectedService) return;

    if (type === "call") {
      toast({
        title: "Calling service provider",
        description: `Initiating call with ${selectedService.provider.name}...`,
      });
    } else {
      navigate(`/messages?userId=${selectedService.provider.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Nearby Services & Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearbyServices.map((service) => (
          <Card 
            key={service.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setSelectedService(service)}
          >
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {service.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold text-primary">ETB {service.price}</span>
              <span className="text-sm text-gray-500">{service.distance} km away</span>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedService && (
            <div className="space-y-4">
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="w-full h-48 object-cover rounded-md"
              />
              
              <p className="text-gray-600">{selectedService.description}</p>
              
              <div className="space-y-2">
                <p><strong>Price:</strong> ETB {selectedService.price}</p>
                <p><strong>Location:</strong> {selectedService.location}</p>
                <p><strong>Distance:</strong> {selectedService.distance} km</p>
                <p><strong>Provider:</strong> {selectedService.provider.name}</p>
                <p><strong>Rating:</strong> {selectedService.provider.rating}/5.0</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1"
                  onClick={() => handleContact("call")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {selectedService.type === "service" ? "Call Provider" : "Buy Now"}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleContact("message")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};