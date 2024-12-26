import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  content: string;
  userId: string;
  userEmail: string;
  timestamp: any;
}

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(newPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{post.userEmail}</h3>
              <p className="text-sm text-gray-500">
                {post.timestamp ? formatDistanceToNow(post.timestamp.toDate(), { addSuffix: true }) : 'Just now'}
              </p>
            </div>
          </div>
          <p className="mt-2">{post.content}</p>
        </Card>
      ))}
    </div>
  );
};

export default PostsList;