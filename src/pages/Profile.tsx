import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import PostForm from "@/components/social/PostForm";
import PostsList from "@/components/social/PostsList";
import EditableProfile from "@/components/profile/EditableProfile";
import UserProfile from "@/components/UserProfile";
import MessagesList from "@/components/chat/MessagesList";

const Profile = () => {
  const { userId } = useParams();
  const mockUser = {
    email: "user@example.com",
    uid: userId
  };
  const language = "english";

  const translations = {
    userStatus: language === "english" ? "Active" : "ንቁ",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile 
        email={mockUser.email}
        language={language}
        translations={translations}
      />

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <MessagesList />
      </div>

      <EditableProfile />

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
        <PostForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <PostsList />
      </div>
    </div>
  );
};

export default Profile;