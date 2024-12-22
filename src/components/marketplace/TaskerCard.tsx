import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskerCardProps {
  name: string;
  rating: number;
  skills: string[];
  image: string;
  hourlyRate: number;
}

export const TaskerCard = ({ name, rating, skills, image, hourlyRate }: TaskerCardProps) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="p-4 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {skills.slice(0, 3).join(", ")}
          </div>
          <div className="text-sm font-semibold text-primary mt-1">
            ${hourlyRate}/hour
          </div>
        </div>
      </div>
    </Card>
  );
};