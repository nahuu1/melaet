import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Posts = ({ userId }: { userId: string }) => {
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        content: newPost,
        timestamp: serverTimestamp(),
      });
      setNewPost("");
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {user && (
        <Card className="p-4">
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={!newPost.trim()}>
              Post
            </Button>
          </form>
        </Card>
      )}
      {/* Posts list will be added here */}
    </div>
  );
};