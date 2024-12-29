import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  initialMessage?: string;
}

const dummyUsers: User[] = [
  { 
    id: "1", 
    name: "Abebe Kebede", 
    avatar: "/placeholder.svg", 
    lastSeen: "2 min ago",
    initialMessage: "ሰላም! እንደምን አለህ/ሽ?"
  },
  { 
    id: "2", 
    name: "Tigist Haile", 
    avatar: "/placeholder.svg", 
    lastSeen: "5 min ago",
    initialMessage: "የቡና ሥነ-ሥርዓት አገልግሎት እፈልጋለሁ"
  },
  { 
    id: "3", 
    name: "Dawit Mengistu", 
    avatar: "/placeholder.svg", 
    lastSeen: "1 hour ago",
    initialMessage: "መኪናዬን ለማሰር አገልግሎት እፈልጋለሁ"
  },
  { 
    id: "4", 
    name: "Hirut Assefa", 
    avatar: "/placeholder.svg", 
    lastSeen: "3 hours ago",
    initialMessage: "ለሰርግ ፎቶግራፍ አገልግሎት እፈልጋለሁ"
  },
  { 
    id: "5", 
    name: "Yohannes Tadesse", 
    avatar: "/placeholder.svg", 
    lastSeen: "1 day ago",
    initialMessage: "እባክዎ የቤት ጽዳት አገልግሎትዎን ይንገሩኝ"
  }
];

const MessagesList = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem("chat_messages");
    const initialMessages = stored ? JSON.parse(stored) : [];
    
    // Add initial messages for each user if none exist
    if (initialMessages.length === 0) {
      return dummyUsers.filter(user => user.initialMessage).map(user => ({
        id: `initial-${user.id}`,
        senderId: user.id,
        receiverId: "current-user",
        content: user.initialMessage || "",
        timestamp: new Date(Date.now() - Math.random() * 1000000).toISOString()
      }));
    }
    
    return initialMessages;
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const currentUserId = "current-user";

  const handleSendMessage = () => {
    if (!selectedUser || !newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      receiverId: selectedUser.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    localStorage.setItem("chat_messages", JSON.stringify(updatedMessages));
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };

  const getConversationMessages = () => {
    if (!selectedUser) return [];
    return messages.filter(
      (msg) =>
        (msg.senderId === currentUserId && msg.receiverId === selectedUser.id) ||
        (msg.senderId === selectedUser.id && msg.receiverId === currentUserId)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] gap-4">
      {/* Users list */}
      <div className="w-full md:w-1/3 border rounded-lg">
        <ScrollArea className="h-full">
          {dummyUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100 ${
                selectedUser?.id === user.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <Avatar>
                <img src={user.avatar} alt={user.name} />
              </Avatar>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">Last seen {user.lastSeen}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 border rounded-lg flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <img src={selectedUser.avatar} alt={selectedUser.name} />
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">
                    Last seen {selectedUser.lastSeen}
                  </p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {getConversationMessages().map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.senderId === currentUserId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesList;