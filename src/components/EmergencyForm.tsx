import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Image, Video, AlertOctagon } from "lucide-react";
import EmergencyTracking from "./EmergencyTracking";

interface EmergencyFormProps {
  service: string;
  onClose: () => void;
}

const EmergencyForm = ({ service, onClose }: EmergencyFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

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
            {service === "crime" ? "Report Crime" : service.charAt(0).toUpperCase() + service.slice(1) + " Emergency"}
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
            <label className="text-sm font-medium">Attach Evidence</label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Image className="w-4 h-4 mr-2" />
                Images
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('video-upload')?.click()}
              >
                <Video className="w-4 h-4 mr-2" />
                Videos
              </Button>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-600">
                {files.length} file(s) selected
              </p>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button 
              type="button" 
              variant="destructive" 
              className="flex-1"
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  toast({
                    title: "SOS Alert Sent!",
                    description: "Emergency services are being dispatched immediately.",
                  });
                  setLoading(false);
                  setShowTracking(true);
                }, 1000);
              }}
            >
              <AlertOctagon className="w-4 h-4 mr-2" />
              SOS
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Alert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyForm;