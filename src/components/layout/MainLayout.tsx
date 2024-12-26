import { useState } from "react";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { MainContent } from "./MainContent";
import { Header } from "./Header";

export const MainLayout = () => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftSidebar isOpen={showLeftSidebar} />
        <MainContent />
        <RightSidebar isOpen={showRightSidebar} onToggle={() => setShowRightSidebar(!showRightSidebar)} />
      </div>
    </div>
  );
};