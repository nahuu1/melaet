import { Dialog, DialogContent } from "@/components/ui/dialog";

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