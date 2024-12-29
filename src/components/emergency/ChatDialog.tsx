import { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: ChatMessage[];
}

const ChatDialog = ({ open, onOpenChange, messages }: Props) => {
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!open) {
      // Cleanup subscription when dialog closes
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
      return;
    }

    // Set up messages listener
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(messagesQuery, 
      (snapshot) => {
        // Handle updates
      },
      (error) => {
        console.error("Error listening to messages:", error);
      }
    );

    unsubscribeRef.current = unsubscribe;

    // Cleanup on unmount or when dialog closes
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === "You"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-sm font-semibold">{message.sender}</p>
                <p>{message.message}</p>
                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;