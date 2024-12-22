import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  title: string;
  description: string;
  budget: number;
  category: string;
  location: string;
}

export const TaskCard = ({ title, description, budget, category, location }: TaskCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <Badge variant="secondary" className="w-fit">{category}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{location}</span>
          <span className="font-semibold text-primary">${budget}</span>
        </div>
      </CardContent>
    </Card>
  );
};