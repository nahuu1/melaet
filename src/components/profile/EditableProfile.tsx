import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { mockUsers } from '@/data/mockData';

interface ProfileData {
  displayName: string;
  bio: string;
  skills: string[];
  workHistory: {
    company: string;
    position: string;
    period: string;
  }[];
}

const EditableProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    bio: '',
    skills: [],
    workHistory: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [newWorkHistory, setNewWorkHistory] = useState({
    company: '',
    position: '',
    period: ''
  });

  useEffect(() => {
    // Simulate fetching profile data
    const currentUser = mockUsers[0]; // Use first mock user as current user
    setProfileData({
      displayName: currentUser.displayName,
      bio: currentUser.bio,
      skills: currentUser.skills,
      workHistory: currentUser.workHistory
    });
  }, []);

  const handleSave = async () => {
    try {
      // Simulate saving to backend
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile"
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const addWorkHistory = () => {
    if (newWorkHistory.company && newWorkHistory.position && newWorkHistory.period) {
      setProfileData(prev => ({
        ...prev,
        workHistory: [...prev.workHistory, newWorkHistory]
      }));
      setNewWorkHistory({
        company: '',
        position: '',
        period: ''
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <Input
            value={profileData.displayName}
            onChange={e => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <Textarea
            value={profileData.bio}
            onChange={e => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {profileData.skills.map((skill, index) => (
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
              <Button onClick={addSkill}>Add</Button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Work History</label>
          <div className="space-y-4">
            {profileData.workHistory.map((work, index) => (
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
              <Button onClick={addWorkHistory}>Add Work History</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EditableProfile;