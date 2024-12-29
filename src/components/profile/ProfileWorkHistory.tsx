import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WorkHistoryEntry {
  company: string;
  position: string;
  period: string;
}

interface ProfileWorkHistoryProps {
  workHistory: WorkHistoryEntry[];
  isEditing: boolean;
  onAddWorkHistory: (entry: WorkHistoryEntry) => void;
}

const ProfileWorkHistory = ({ workHistory, isEditing, onAddWorkHistory }: ProfileWorkHistoryProps) => {
  const [newWorkHistory, setNewWorkHistory] = useState<WorkHistoryEntry>({
    company: '',
    position: '',
    period: ''
  });

  const handleAddWorkHistory = () => {
    if (newWorkHistory.company && newWorkHistory.position && newWorkHistory.period) {
      onAddWorkHistory({ ...newWorkHistory });
      setNewWorkHistory({
        company: '',
        position: '',
        period: ''
      });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Work History</label>
      <div className="space-y-4">
        {workHistory.map((work, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold">{work.position}</h3>
            <p className="text-gray-600">{work.company}</p>
            <p className="text-sm text-gray-500">{work.period}</p>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="mt-4 space-y-2">
          <Input
            value={newWorkHistory.company}
            onChange={e => setNewWorkHistory(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Company"
          />
          <Input
            value={newWorkHistory.position}
            onChange={e => setNewWorkHistory(prev => ({ ...prev, position: e.target.value }))}
            placeholder="Position"
          />
          <Input
            value={newWorkHistory.period}
            onChange={e => setNewWorkHistory(prev => ({ ...prev, period: e.target.value }))}
            placeholder="Period (e.g., 2020-2022)"
          />
          <Button onClick={handleAddWorkHistory}>Add Work History</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileWorkHistory;