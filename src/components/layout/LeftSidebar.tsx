import { UserProfile } from "../user/UserProfile";
import { EmergencyButtons } from "../emergency/EmergencyButtons";

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LeftSidebar = ({ isOpen }: LeftSidebarProps) => {
  return (
    <div className={`w-80 bg-white shadow-lg p-4 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <UserProfile />
      <EmergencyButtons />
    </div>
  );
};