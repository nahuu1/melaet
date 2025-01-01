import { EmergencyWorker } from "@/types/emergency";
import EmergencyWorkerCard from "./EmergencyWorkerCard";

interface WorkersListProps {
  workers: EmergencyWorker[];
  onNavigate: (worker: EmergencyWorker) => void;
  onChat: () => void;
}

const WorkersList = ({ workers, onNavigate, onChat }: WorkersListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {workers.map((worker) => (
        <EmergencyWorkerCard
          key={worker.id}
          worker={worker}
          onNavigate={onNavigate}
          onChat={onChat}
        />
      ))}
    </div>
  );
};

export default WorkersList;