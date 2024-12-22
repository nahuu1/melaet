import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const EmergencyMap = () => {
  return (
    <Card className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center p-4">
        <p className="text-gray-600">Interactive map will be implemented here</p>
        <p className="text-sm text-gray-500">Shows nearby emergency responders</p>
      </div>
    </Card>
  );
};

export default EmergencyMap;