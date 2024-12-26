import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Posts } from "./Posts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
  bio?: string;
}

export const Profile = ({ userId }: { userId: string }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profile.photoURL} />
              <AvatarFallback>
                {profile.displayName?.[0] || profile.email?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{profile.displayName || profile.email}</CardTitle>
              {profile.bio && <p className="text-sm text-gray-500">{profile.bio}</p>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Posts userId={userId} />
        </CardContent>
      </Card>
    </div>
  );
};