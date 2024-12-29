import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
    let isMounted = true;

    const fetchProfile = async () => {
      if (!userId) return;
      
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          setProfileData({
            displayName: data.displayName || '',
            bio: data.bio || '',
            skills: data.skills || [],
            workHistory: data.workHistory || []
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (isMounted) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load profile data"
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();
    return () => { isMounted = false; };
  }, [userId]);

  const saveProfile = async (data: ProfileData) => {
    if (!userId) return;

    try {
      const docRef = doc(db, 'users', userId);
      await setDoc(docRef, data, { merge: true });
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