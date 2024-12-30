import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ServiceCard } from "@/components/services/ServiceCard";
import { useState } from "react";
import { ServiceDialog } from "@/components/services/ServiceDialog";

const mockProducts = [
  {
    id: "p1",
    name: "Traditional Coffee Set",
    provider: "Habesha Artifacts",
    type: "Home & Living",
    description: "Complete Ethiopian coffee ceremony set including jebena, cups, and tray.",
    price: 1200,
    distance: 1.8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f",
    location: "Piassa, Addis Ababa"
  },
  {
    id: "p2",
    name: "Organic Teff Flour",
    provider: "Ethiopian Grains",
    type: "Food & Groceries",
    description: "Premium quality teff flour for making injera and other traditional dishes.",
    price: 450,
    distance: 2.1,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df",
    location: "Merkato, Addis Ababa"
  },
  {
    id: "p3",
    name: "Traditional Dress",
    provider: "Ethio Fashion",
    type: "Clothing",
    description: "Handwoven Ethiopian traditional dress with beautiful embroidery.",
    price: 2500,
    distance: 3.0,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985",
    location: "Bole, Addis Ababa"
  },
  {
    id: "p4",
    name: "Organic Honey",
    provider: "Natural Honey",
    type: "Food & Groceries",
    description: "Pure, natural honey from Ethiopian highlands.",
    price: 350,
    distance: 2.5,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38",
    location: "Sarbet, Addis Ababa"
  },
  {
    id: "p5",
    name: "Handmade Basket",
    provider: "Ethiopian Crafts",
    type: "Home & Living",
    description: "Traditional Ethiopian mesob basket, handwoven from natural materials.",
    price: 800,
    distance: 1.5,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519940090049-11f0c0e9ee58",
    location: "Kazanchis, Addis Ababa"
  }
];

export const NearbyProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-semibold mb-6">Nearby Products</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {mockProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <ServiceCard
                {...product}
                onServiceClick={() => setSelectedProduct(product)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <ServiceDialog
        service={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};