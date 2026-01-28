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
import { MessageCircle, Check, ChevronDown } from "lucide-react";
import FloatingSymbols from "./FloatingSymbols";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    window.open(`https://wa.me/2348073535850?text=${message}`, "_blank");
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`New Booking: ${formData.fullName}`);
    const body = encodeURIComponent(
      `Booking Details:\n\nName: ${formData.fullName}\nCourse: ${formData.course}\nTopic: ${formData.topic}\nPreferred Time: ${formData.preferredDateTime}`
    );
    window.location.href = `mailto:mikelhenshaw11@gmail.com?subject=${subject}&body=${body}`;
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
      <DialogContent className="bg-card border-border max-w-md w-[95vw] sm:w-full overflow-hidden p-0 gap-0 shadow-2xl">
        <div className="p-6 sm:p-7 relative max-h-[85vh] overflow-y-auto">
          <FloatingSymbols />
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="payment" className="border-border">
                    <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      View Payment Account Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-secondary/50 p-4 rounded-lg border border-primary/20 space-y-2 mt-2">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Transfer to:</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Bank:</span>
                          <span className="text-white font-bold">FCMB</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Account Number:</span>
                          <span className="text-white font-bold text-lg">3910429016</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Account Name:</span>
                          <span className="text-sm">Henshaw Mike Ewa</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 italic">* Please make transfer before confirming booking</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="space-y-2">
                  <Label htmlFor="course" className="text-muted-foreground">
                    Year
                  </Label>
                  <Input
                    id="course"
                    required
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="bg-secondary border-border focus:border-primary"
                    placeholder="e.g., Year 1, Year 2, Year 3, Year 4"
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


                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-muted-foreground">
                    Topic struggling with "be specific to avoid confusion"
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

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-accent py-6 text-base uppercase tracking-wider font-medium mt-4 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  Confirm
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

              <div className="bg-secondary/30 p-4 rounded-lg border border-border text-left mb-6 space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Booking Summary:</p>
                <p className="text-sm"><span className="text-muted-foreground">Name:</span> {formData.fullName}</p>
                <p className="text-sm"><span className="text-muted-foreground">Course:</span> {formData.course}</p>
                <p className="text-sm"><span className="text-muted-foreground">Time:</span> {formData.preferredDateTime}</p>
              </div>

              <p className="text-muted-foreground mb-8 text-sm">
                Your session has been reserved. Please click below to send us your details via Email and WhatsApp.
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleEmailClick}
                  className="bg-primary hover:bg-accent text-primary-foreground px-8 py-6 text-base font-medium w-full"
                >
                  Send Booking to Email
                </Button>

                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-6 text-base font-medium w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact on WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
