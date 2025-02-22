
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ServiceCard } from "@/components/services/ServiceCard";
import { useState } from "react";
import { ServiceDialog } from "@/components/services/ServiceDialog";

const mockServices = [
  {
    id: "1",
    name: "Black Lion Hospital",
    provider: "Government Hospital",
    type: "Medical Service",
    description: "Ethiopia's largest specialized hospital providing comprehensive medical care.",
    price: 0,
    distance: 1.2,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2",
    location: "Tikur Anbessa, Addis Ababa"
  },
  {
    id: "2",
    name: "Bole Police Station",
    provider: "Federal Police",
    type: "Emergency Service",
    description: "24/7 police service for the Bole area.",
    price: 0,
    distance: 1.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590477329276-8b3133e0f581",
    location: "Bole, Addis Ababa"
  },
  {
    id: "3",
    name: "St. Paul's Hospital",
    provider: "Government Hospital",
    type: "Medical Service",
    description: "Major referral hospital with comprehensive medical facilities.",
    price: 0,
    distance: 2.1,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    location: "Gulele, Addis Ababa"
  },
  {
    id: "4",
    name: "Kirkos Police Station",
    provider: "Federal Police",
    type: "Emergency Service",
    description: "Central police station serving the Kirkos area.",
    price: 0,
    distance: 2.4,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1617876139067-714f6c6f0bec",
    location: "Kirkos, Addis Ababa"
  },
  {
    id: "5",
    name: "Zewditu Hospital",
    provider: "Government Hospital",
    type: "Medical Service",
    description: "Public hospital providing general and specialized care.",
    price: 0,
    distance: 1.8,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578991624414-276ef23a534f",
    location: "Lideta, Addis Ababa"
  }
];

export const NearbyServices = () => {
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-semibold mb-6">Nearby Emergency Services</h2>
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
