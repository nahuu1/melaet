import { OnlineUsers } from "../social/OnlineUsers";
import { ChatHistory } from "../social/ChatHistory";

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const RightSidebar = ({ isOpen }: RightSidebarProps) => {
  return (
    <div className={`w-80 bg-white shadow-lg p-4 transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <OnlineUsers />
      <ChatHistory />
    </div>
  );
};