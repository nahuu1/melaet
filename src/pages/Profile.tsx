import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import PostForm from "@/components/social/PostForm";
import PostsList from "@/components/social/PostsList";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  email: string;
  services?: string[];
  jobHistory?: {
    company: string;
    position: string;
    period: string;
  }[];
}

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">{profile.email}</h1>
        
        {profile.services && profile.services.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Services Offered</h2>
            <ul className="list-disc pl-5">
              {profile.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.jobHistory && profile.jobHistory.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Job History</h2>
            <div className="space-y-4">
              {profile.jobHistory.map((job, index) => (
                <div key={index} className="border-b pb-2">
                  <h3 className="font-semibold">{job.position}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

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