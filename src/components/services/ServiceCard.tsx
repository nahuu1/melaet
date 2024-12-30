import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
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
  onServiceClick: (service: ServiceCardProps) => void;
}

export const ServiceCard = ({ 
  name, 
  provider, 
  type, 
  description, 
  price, 
  distance, 
  rating, 
  image, 
  location,
  onServiceClick,
  ...props
}: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-all"
      onClick={() => onServiceClick({ name, provider, type, description, price, distance, rating, image, location, ...props })}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={image} alt={provider} />
          <AvatarFallback>{provider[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{provider}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600">{distance} km away</span>
            <span className="text-sm text-gray-600">⭐ {rating}</span>
          </div>
          <p className="text-sm font-semibold mt-2">${price}</p>
        </div>
      </div>
    </Card>
  );
};