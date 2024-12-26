import { Bell, Mail, Menu, Search, User } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <header className="bg-[#1B8B34] text-white py-3 px-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 cursor-pointer" />
          <h1 className="text-2xl font-bold font-['Nyala']">Mella</h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for emergency services, locations, or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 cursor-pointer" />
          <Mail className="w-6 h-6 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
          <Button 
            variant="outline" 
            className="bg-[#2EA043] text-white border-none hover:bg-[#2EA043]/90"
          >
            አማርኛ
          </Button>
        </div>
      </div>
    </header>
  );
};