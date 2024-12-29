import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProfileSkillsProps {
  skills: string[];
  isEditing: boolean;
  onAddSkill: (skill: string) => void;
}

const ProfileSkills = ({ skills, isEditing, onAddSkill }: ProfileSkillsProps) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Skills</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-gray-100 px-3 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
      {isEditing && (
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            placeholder="Add a new skill"
          />
          <Button onClick={handleAddSkill}>Add</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileSkills;