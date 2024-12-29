import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import PostForm from "@/components/social/PostForm";
import PostsList from "@/components/social/PostsList";
import { useAuth } from "@/contexts/AuthContext";
import EditableProfile from "@/components/profile/EditableProfile";
import UserProfile from "@/components/UserProfile";
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { profileData, isLoading } = useProfileData(userId);
  const isOwnProfile = user?.uid === userId;
  const language = "english"; // Default to English for now

  const translations = {
    userStatus: language === "english" ? "Active" : "ንቁ",
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile 
        email={user?.email || ""}
        language={language}
        translations={translations}
      />

      {isOwnProfile ? (
        <EditableProfile />
      ) : (
        <Card className="p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">{profileData.displayName || "User Profile"}</h1>
          <div className="space-y-4">
            {profileData.bio && (
              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p>{profileData.bio}</p>
              </div>
            )}
            {profileData.skills && profileData.skills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill: string, index: number) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {profileData.workHistory && profileData.workHistory.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Work History</h2>
                <div className="space-y-4">
                  {profileData.workHistory.map((work: any, index: number) => (
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