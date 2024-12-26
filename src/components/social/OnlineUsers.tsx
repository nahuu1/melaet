import { User } from "lucide-react";

interface OnlineUser {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "away" | "offline";
}

const mockUsers: OnlineUser[] = [
  { id: "1", name: "John Doe", status: "online" },
  { id: "2", name: "Jane Smith", status: "away" },
  // Add more mock users as needed
];

export const OnlineUsers = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Online Users</h2>
      <div className="space-y-3">
        {mockUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-8 h-8 p-1 bg-gray-100 rounded-full" />
              )}
              <span 
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                  ${user.status === "online" ? "bg-green-500" : 
                    user.status === "away" ? "bg-yellow-500" : "bg-gray-500"}`}
              />
            </div>
            <span className="text-sm">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};