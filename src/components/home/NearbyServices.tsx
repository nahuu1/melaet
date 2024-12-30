import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ServiceCard } from "@/components/services/ServiceCard";
import { useState } from "react";
import { ServiceDialog } from "@/components/services/ServiceDialog";

const mockServices = [
  {
    id: "1",
    name: "Plumbing Service",
    provider: "Abel Demissie",
    type: "Home Service",
    description: "Professional plumbing services for your home and office. Available 24/7 for emergencies.",
    price: 500,
    distance: 2.3,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    location: "Bole, Addis Ababa"
  },
  {
    id: "2",
    name: "House Cleaning",
    provider: "Tigist Haile",
    type: "Cleaning Service",
    description: "Professional house cleaning services with eco-friendly products.",
    price: 300,
    distance: 1.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    location: "Kazanchis, Addis Ababa"
  },
  {
    id: "3",
    name: "Laptop Repair",
    provider: "Dawit Mengistu",
    type: "Tech Service",
    description: "Expert laptop and computer repair services. All brands supported.",
    price: 800,
    distance: 3.2,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    location: "Piassa, Addis Ababa"
  },
  {
    id: "4",
    name: "Car Mechanic",
    provider: "Solomon Kebede",
    type: "Auto Service",
    description: "Professional auto repair and maintenance services.",
    price: 1200,
    distance: 4.1,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    location: "Megenagna, Addis Ababa"
  },
  {
    id: "5",
    name: "Web Development",
    provider: "Bethel Tadesse",
    type: "Tech Service",
    description: "Custom website development and maintenance services.",
    price: 15000,
    distance: 2.8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    location: "Sarbet, Addis Ababa"
  }
];

export const NearbyServices = () => {
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-semibold mb-6">Nearby Services</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {mockServices.map((service) => (
            <CarouselItem key={service.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <ServiceCard
                {...service}
                onServiceClick={() => setSelectedService(service)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <ServiceDialog
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};