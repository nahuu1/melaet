import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  image: string;
  lastSeen: string;
  isOnline: boolean;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Bethlehem Alemu",
    image: "/placeholder.svg",
    lastSeen: "2 minutes ago",
    isOnline: true,
  },
  {
    id: "2",
    name: "Tigist Haile",
    image: "/placeholder.svg",
    lastSeen: "5 minutes ago",
    isOnline: true,
  },
  {
    id: "3",
    name: "Yared Tedla",
    image: "/placeholder.svg",
    lastSeen: "1 hour ago",
    isOnline: false,
  },
  {
    id: "4",
    name: "Kidist Mengesha",
    image: "/placeholder.svg",
    lastSeen: "3 hours ago",
    isOnline: false,
  },
  {
    id: "5",
    name: "Solomon Kebede",
    image: "/placeholder.svg",
    lastSeen: "Just now",
    isOnline: true,
  },
  {
    id: "6",
    name: "Dawit Assefa",
    image: "/placeholder.svg",
    lastSeen: "30 minutes ago",
    isOnline: true,
  },
  {
    id: "7",
    name: "Meskerem Tadesse",
    image: "/placeholder.svg",
    lastSeen: "2 hours ago",
    isOnline: false,
  },
  {
    id: "8",
    name: "Abel Tesfaye",
    image: "/placeholder.svg",
    lastSeen: "4 hours ago",
    isOnline: false,
  },
];

const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      receiverId: "current",
      content: "Hello! Would you like to book a coffee ceremony?",
      timestamp: Date.now() - 3600000,
    },
  ],
  "2": [
    {
      id: "m2",
      senderId: "2",
      receiverId: "current",
      content: "Your food delivery will arrive in 20 minutes",
      timestamp: Date.now() - 7200000,
    },
  ],
};

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser) {
      setMessages(initialMessages[selectedUser.id] || []);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: "current",
      receiverId: selectedUser.id,
      content: newMessage,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/home" className="flex items-center text-blue-500 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
      
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        <div className="col-span-4 bg-white rounded-lg shadow overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="divide-y">
            {mockUsers.map(user => (
              <div
                key={user.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? "bg-gray-50" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.lastSeen}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-8 bg-white rounded-lg shadow flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedUser.image} />
                    <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{selectedUser.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedUser.isOnline ? "Online" : selectedUser.lastSeen}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === "current" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderId === "current"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit">Send</Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;