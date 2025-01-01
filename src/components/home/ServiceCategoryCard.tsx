import { Card } from "@/components/ui/card";

interface ServiceCategoryCardProps {
  icon: string;
  title: string;
}

export const ServiceCategoryCard = ({ icon, title }: ServiceCategoryCardProps) => {
  return (
    <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
    </Card>
  );
};