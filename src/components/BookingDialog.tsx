import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Check } from "lucide-react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ open, onOpenChange }: BookingDialogProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    course: "",
    topic: "",
    preferredDateTime: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hello ORTIMI! I just booked a session.\n\nName: ${formData.fullName}\nCourse: ${formData.course}\nTopic: ${formData.topic}\nPreferred Time: ${formData.preferredDateTime}`
    );
    window.open(`https://wa.me/2348000000000?text=${message}`, "_blank");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        course: "",
        topic: "",
        preferredDateTime: "",
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-md">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-center">
                Book Your Session
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="bg-secondary border-border focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course" className="text-muted-foreground">
                  Course / Class
                </Label>
                <Input
                  id="course"
                  required
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="bg-secondary border-border focus:border-primary"
                  placeholder="e.g., SS3, 100 Level, WAEC"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic" className="text-muted-foreground">
                  Topic struggling with
                </Label>
                <Textarea
                  id="topic"
                  required
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="bg-secondary border-border focus:border-primary resize-none"
                  placeholder="Describe the math topics you need help with"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="preferredDateTime"
                  className="text-muted-foreground"
                >
                  Preferred date & time
                </Label>
                <Input
                  id="preferredDateTime"
                  required
                  value={formData.preferredDateTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredDateTime: e.target.value,
                    })
                  }
                  className="bg-secondary border-border focus:border-primary"
                  placeholder="e.g., Monday 3pm, This weekend"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-accent py-6 text-base uppercase tracking-wider font-medium mt-6"
              >
                Pay ₦3,000 & Confirm
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>

            <h3 className="font-display text-2xl font-semibold mb-3">
              Booking Confirmed!
            </h3>

            <p className="text-muted-foreground mb-8">
              Your session has been reserved. Contact us on WhatsApp to finalize
              details.
            </p>

            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-6 text-base font-medium"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Continue on WhatsApp
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
