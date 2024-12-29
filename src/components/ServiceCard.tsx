import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: string;
  title: string;
}

export const ServiceCard = ({ icon, title }: ServiceCardProps) => (
  <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
  </Card>
);