import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import PostForm from "@/components/social/PostForm";
import PostsList from "@/components/social/PostsList";
import EditableProfile from "@/components/profile/EditableProfile";
import { mockUsers } from "@/data/mockData";

interface UserProfile {
  email: string;
  displayName: string;
  bio: string;
  skills: string[];
  workHistory: {
    company: string;
    position: string;
    period: string;
  }[];
}

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate current user - in a real app this would come from auth
  const currentUserId = "current";
  const isOwnProfile = userId === currentUserId;

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundUser = mockUsers.find(user => user.id === userId) || mockUsers[0];
      setProfile({
        email: foundUser.email,
        displayName: foundUser.displayName,
        bio: foundUser.bio,
        skills: foundUser.skills,
        workHistory: foundUser.workHistory
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!profile) {
    return <div className="container mx-auto px-4 py-8">Profile not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isOwnProfile ? (
        <EditableProfile />
      ) : (
        <Card className="p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">{profile.displayName}</h1>
          <p className="text-gray-600 mb-4">{profile.email}</p>
          <p className="mb-6">{profile.bio}</p>
          
          {profile.skills && profile.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
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
                {profile.workHistory.map((job, index) => (
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
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <PostsList />
      </div>
    </div>
  );
};

export default Profile;