import EmergencyServices from "@/components/EmergencyServices";

interface EmergencyMapSectionProps {
  onEmergencyClick: (service: string) => void;
  translations: any;
}

export const EmergencyMapSection = ({ onEmergencyClick, translations }: EmergencyMapSectionProps) => {
  return (
    <div className="h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-lg mb-6 sm:mb-8 w-full">
      <EmergencyServices
        onEmergencyClick={onEmergencyClick}
        translations={translations}
      />
    </div>
  );
};