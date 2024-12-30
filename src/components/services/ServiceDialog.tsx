import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ServiceDialogProps {
  service: {
    name: string;
    provider: string;
    type: string;
    description: string;
    price: number;
    distance: number;
    rating: number;
    image: string;
    location: string;
  } | null;
  onClose: () => void;
}

export const ServiceDialog = ({ service, onClose }: ServiceDialogProps) => {
  const navigate = useNavigate();

  if (!service) return null;

  const handleMessageClick = () => {
    navigate("/messages");
    toast({
      title: "Chat initiated",
      description: `You can now chat with ${service.provider}`,
    });
  };

  const handleCallClick = () => {
    toast({
      title: "Calling service provider",
      description: `Initiating call with ${service.provider}...`,
    });
  };

  return (
    <Dialog open={!!service} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={service.image} alt={service.provider} />
              <AvatarFallback>{service.provider[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{service.provider}</h3>
              <p className="text-sm text-gray-600">{service.type}</p>
            </div>
          </div>
          <p className="text-gray-600">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{service.location}</span>
            <span className="text-sm text-gray-600">{service.distance} km away</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Rating: ⭐ {service.rating}</span>
            <span className="font-semibold">${service.price}</span>
          </div>
          <div className="flex gap-4 mt-4">
            <Button className="flex-1" onClick={handleCallClick}>
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleMessageClick}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};