import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import PostForm from "@/components/social/PostForm";
import PostsList from "@/components/social/PostsList";
import { useAuth } from "@/contexts/AuthContext";
import EditableProfile from "@/components/profile/EditableProfile";
import UserProfile from "@/components/UserProfile";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isOwnProfile = user?.uid === userId;
  const [language, setLanguage] = useState<"english" | "amharic">("english");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const translations = {
    userStatus: language === "english" ? "Active" : "ንቁ",
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!profile) {
    return <div className="container mx-auto px-4 py-8">Profile not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile 
        email={profile.email} 
        language={language}
        translations={translations}
      />

      {isOwnProfile ? (
        <EditableProfile />
      ) : (
        <Card className="p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">{profile.email}</h1>
          <div className="space-y-4">
            {profile.bio && (
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p>{profile.bio}</p>
              </div>
            )}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {profile.workHistory && profile.workHistory.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Work History</h2>
                <div className="space-y-4">
                  {profile.workHistory.map((work: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-4 rounded">
                      <h3 className="font-semibold">{work.position}</h3>
                      <p className="text-gray-600">{work.company}</p>
                      <p className="text-sm text-gray-500">{work.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {user && user.uid === userId && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
          <PostForm />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <PostsList />
      </div>
    </div>
  );
};

export default Profile;