import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UserProfileProps {
  email?: string | null;
}

export const UserProfile = ({ email = "user@example.com" }: UserProfileProps) => {
  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 p-3 rounded-full">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{email}</h3>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Online</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};