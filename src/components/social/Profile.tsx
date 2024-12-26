import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Posts } from "./Posts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";

interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
  bio?: string;
}

export const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error fetching user profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>User not found</div>;
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
          {userId && <Posts userId={userId} />}
        </CardContent>
      </Card>
    </div>
  );
};