import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import ProfileSkills from './ProfileSkills';
import ProfileWorkHistory from './ProfileWorkHistory';
import { toast } from '@/components/ui/use-toast';

const EditableProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    skills: [] as string[],
    workHistory: [] as { company: string; position: string; period: string }[]
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('user_profile');
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
    setIsLoading(false);
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('user_profile', JSON.stringify(profileData));
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    }
  };

  const handleAddSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const handleAddWorkHistory = (workEntry: { company: string; position: string; period: string }) => {
    setProfileData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, workEntry]
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

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

        <ProfileSkills
          skills={profileData.skills}
          isEditing={isEditing}
          onAddSkill={handleAddSkill}
        />

        <ProfileWorkHistory
          workHistory={profileData.workHistory}
          isEditing={isEditing}
          onAddWorkHistory={handleAddWorkHistory}
        />
      </div>
    </Card>
  );
};

export default EditableProfile;