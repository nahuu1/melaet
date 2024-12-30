import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, UserPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditableProfile from "@/components/profile/EditableProfile";
import { mockUsers } from "@/data/mockData";
import { Card } from "@/components/ui/card";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Find the user from mock data
  const currentUser = mockUsers.find(user => user.id === userId) || mockUsers[0];
  const isOwnProfile = userId === mockUsers[0].id; // Assuming first user is "logged in" user

  const handleMessage = () => {
    navigate(`/messages?userId=${currentUser.id}`);
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Cover Photo */}
        <div className="relative w-full h-[200px] md:h-[300px] bg-gray-300 rounded-t-lg overflow-hidden mb-16">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
            alt="Cover"
            className="w-full h-full object-cover"
          />
          
          {/* Profile Picture */}
          <div className="absolute -bottom-12 left-8 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
            <img
              src={currentUser.photoURL || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
              alt={currentUser.displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Actions */}
        <div className="flex justify-end gap-2 mb-6">
          {!isOwnProfile && (
            <>
              <Button onClick={handleMessage}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </Button>
            </>
          )}
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Profile
          </Button>
        </div>

        {/* Profile Info */}
        <Card className="p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{currentUser.displayName}</h1>
          <p className="text-gray-600 mb-4">{currentUser.bio}</p>
          
          <div className="flex gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Location:</span> Addis Ababa, Ethiopia
            </div>
            <div>
              <span className="font-semibold">Joined:</span> January 2024
            </div>
          </div>
        </Card>

        {/* Editable Profile Section (only shown if it's the user's own profile) */}
        {isOwnProfile && <EditableProfile />}
      </div>
    </div>
  );
};

export default Profile;