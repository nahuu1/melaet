import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TaskerCard } from "./TaskerCard";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";

const featuredTasks = [
  {
    title: "Traditional Coffee Ceremony",
    description: "Looking for someone to perform a traditional Ethiopian coffee ceremony for a family gathering",
    budget: 150,
    category: "Cultural Events",
    location: "Addis Ababa",
  },
  {
    title: "Amharic Language Tutoring",
    description: "Need an experienced tutor for beginner Amharic lessons",
    budget: 40,
    category: "Education",
    location: "Bole",
  },
  {
    title: "Injera Delivery Service",
    description: "Weekly injera delivery needed for a restaurant",
    budget: 200,
    category: "Food Delivery",
    location: "Merkato",
  },
  {
    title: "Traditional Dance Performance",
    description: "Seeking performers for a wedding ceremony",
    budget: 300,
    category: "Entertainment",
    location: "Piassa",
  },
  {
    title: "Home-cooked Ethiopian Meal",
    description: "Need someone to prepare traditional Ethiopian dishes for 10 people",
    budget: 250,
    category: "Cooking",
    location: "Kazanchis",
  },
];

const topTaskers = [
  {
    name: "Kidist Abebe",
    rating: 4.9,
    skills: ["Coffee Ceremony", "Traditional Cooking", "Event Planning"],
    image: "/placeholder.svg",
    hourlyRate: 35,
  },
  {
    name: "Yohannes Tadesse",
    rating: 4.8,
    skills: ["Amharic Teaching", "Translation", "Cultural Guide"],
    image: "/placeholder.svg",
    hourlyRate: 40,
  },
  {
    name: "Bethlehem Alemu",
    rating: 4.9,
    skills: ["Traditional Dance", "Music", "Event Hosting"],
    image: "/placeholder.svg",
    hourlyRate: 45,
  },
  {
    name: "Solomon Kebede",
    rating: 4.7,
    skills: ["Delivery", "Errands", "Moving Help"],
    image: "/placeholder.svg",
    hourlyRate: 30,
  },
  {
    name: "Tigist Mengesha",
    rating: 4.8,
    skills: ["House Cleaning", "Organization", "Cooking"],
    image: "/placeholder.svg",
    hourlyRate: 35,
  },
];

export const MarketplaceSection = () => {
  const { user } = useAuth();
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    budget: "",
    category: "",
    location: ""
  });

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to post a task",
        variant: "destructive"
      });
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        ...newTask,
        userId: user.uid,
        timestamp: serverTimestamp(),
        budget: parseFloat(newTask.budget)
      });

      setNewTask({
        title: "",
        description: "",
        budget: "",
        category: "",
        location: ""
      });
      setShowAddTask(false);
      
      toast({
        title: "Success",
        description: "Your task has been posted!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post task. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-12 mt-8">
      <div className="bg-gradient-to-r from-red-50 to-yellow-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Find Skilled Ethiopian Service Providers</h2>
        <div className="max-w-2xl mx-auto relative">
          <Input 
            placeholder="Search for services or taskers..." 
            className="pl-10 h-12"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            Search
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setShowAddTask(!showAddTask)}>
          {showAddTask ? "Cancel" : "Post a New Task"}
        </Button>
      </div>

      {showAddTask && (
        <form onSubmit={handleAddTask} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <Input
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            required
          />
          <Input
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            required
          />
          <Input
            placeholder="Budget (ETB)"
            type="number"
            value={newTask.budget}
            onChange={(e) => setNewTask(prev => ({ ...prev, budget: e.target.value }))}
            required
          />
          <Input
            placeholder="Category"
            value={newTask.category}
            onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
            required
          />
          <Input
            placeholder="Location"
            value={newTask.location}
            onChange={(e) => setNewTask(prev => ({ ...prev, location: e.target.value }))}
            required
          />
          <Button type="submit" className="w-full">Post Task</Button>
        </form>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-4">Featured Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTasks.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Top Rated Taskers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTaskers.map((tasker, index) => (
            <TaskerCard key={index} {...tasker} />
          ))}
        </div>
      </div>
    </div>
  );
};
