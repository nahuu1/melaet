import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import EmergencyTracking from "./EmergencyTracking";

interface EmergencyFormProps {
  service: string;
  onClose: () => void;
}

const EmergencyForm = ({ service, onClose }: EmergencyFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showTracking, setShowTracking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Help is on the way!",
        description: "Emergency services have been notified and are heading to your location.",
      });
      setLoading(false);
      setShowTracking(true);
    }, 2000);
  };

  if (showTracking) {
    return <EmergencyTracking service={service} onClose={onClose} />;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {service.charAt(0).toUpperCase() + service.slice(1)} Emergency
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input placeholder="Current location will be auto-detected" disabled />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              placeholder="Please describe the emergency situation..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Number</label>
            <Input type="tel" placeholder="Your phone number" required />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={loading}>
              {loading ? "Sending..." : "Send Emergency Alert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyForm;