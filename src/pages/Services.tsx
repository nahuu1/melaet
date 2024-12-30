import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceDialog } from "@/components/services/ServiceDialog";

const services = [
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
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

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
          <ServiceCard
            key={service.id}
            {...service}
            onServiceClick={() => setSelectedService(service)}
          />
        ))}
      </div>

      <ServiceDialog
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};

export default Services;