import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface ProfileData {
  displayName: string;
  bio: string;
  skills: string[];
  workHistory: {
    company: string;
    position: string;
    period: string;
  }[];
}

export const useProfileData = (userId: string | undefined) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: '',
    bio: '',
    skills: [],
    workHistory: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const storedData = localStorage.getItem(`profile_${userId}`);
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, [userId]);

  const saveProfile = async (data: ProfileData) => {
    if (!userId) return false;

    try {
      localStorage.setItem(`profile_${userId}`, JSON.stringify(data));
      setProfileData(data);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile"
      });
      return false;
    }
  };

  return { profileData, setProfileData, isLoading, saveProfile };
};