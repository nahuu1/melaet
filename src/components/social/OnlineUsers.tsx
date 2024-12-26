import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface OnlineUser {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "away" | "offline";
}

interface OnlineUsersProps {
  onUserClick?: (userId: string) => void;
}

export const OnlineUsers = ({ onUserClick }: OnlineUsersProps) => {
  const [users, setUsers] = useState<OnlineUser[]>([]);

  useEffect(() => {
    const q = query(collection(db, "users"), where("status", "==", "online"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const onlineUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as OnlineUser));
      setUsers(onlineUsers);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Online Users</h2>
      <div className="space-y-3">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
            onClick={() => onUserClick?.(user.id)}
          >
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