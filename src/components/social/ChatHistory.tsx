import { MessageSquare } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

const mockChats: ChatMessage[] = [
  {
    id: "1",
    sender: "John Doe",
    message: "Hey, are you available for an emergency repair?",
    timestamp: "10:30 AM"
  },
  {
    id: "2",
    sender: "Jane Smith",
    message: "I need assistance with my car",
    timestamp: "11:45 AM"
  },
  // Add more mock messages as needed
];

export const ChatHistory = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Chats</h2>
      <div className="space-y-4">
        {mockChats.map((chat) => (
          <div key={chat.id} className="flex items-start gap-3">
            <MessageSquare className="w-8 h-8 p-1 bg-gray-100 rounded-full shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{chat.sender}</span>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};