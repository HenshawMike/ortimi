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
import { MessageCircle, Check, Copy, Share2 } from "lucide-react";
import FloatingSymbols from "./FloatingSymbols";
import { useReferral } from "@/hooks/useReferral";
import { useToast } from "@/hooks/use-toast";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ open, onOpenChange }: BookingDialogProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { isReferred, originalPrice, discountedPrice, getReferralLink } = useReferral();
  const { toast } = useToast();
  const currentPrice = isReferred ? discountedPrice : originalPrice;
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
      `Hello ORTIMI! I just booked a session.\n\nName: ${formData.fullName}\nCourse: ${formData.course}\nTopic: ${formData.topic}\nPreferred Time: ${formData.preferredDateTime}\nPrice: ₦${currentPrice.toLocaleString()}${isReferred ? " (Referral Discount applied)" : ""}`
    );
    window.open(`https://wa.me/2348073535850?text=${message}`, "_blank");
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`New Booking: ${formData.fullName}`);
    const body = encodeURIComponent(
      `Booking Details:\n\nName: ${formData.fullName}\nCourse: ${formData.course}\nTopic: ${formData.topic}\nPreferred Time: ${formData.preferredDateTime}\nPrice: ₦${currentPrice.toLocaleString()}${isReferred ? " (Referral Discount applied)" : ""}`
    );
    window.location.href = `mailto:mikelhenshaw11@gmail.com?subject=${subject}&body=${body}`;
  };

  const copyToClipboard = async (text: string) => {
    // 1. Try modern Clipboard API (Works in Secure Contexts / HTTPS)
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn("Modern Clipboard API failed", err);
    }

    // 2. Reliable Fallback for Insecure Contexts (HTTP) and Mobile
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Styling: Using the "accessible hidden" pattern which browsers usually allow for copying
      textArea.style.position = "absolute";
      textArea.style.left = "0";
      textArea.style.top = "0";
      textArea.style.width = "1px";
      textArea.style.height = "1px";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.opacity = "0.01";
      textArea.style.fontSize = "16px";

      document.body.appendChild(textArea);

      // Selection logic
      textArea.focus();
      textArea.select();

      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);

      const successful = document.execCommand('copy');

      // Cleanup
      if (selection) selection.removeAllRanges();
      document.body.removeChild(textArea);

      if (!successful) throw new Error("Copy command denied by browser");
      return true;
    } catch (err) {
      console.error("Fallback copy failed", err);
      toast({
        title: "Copying Blocked",
        description: "Mobile browsers often block automatic copying on HTTP (non-secure) sites. Please manually select the link above.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleCopyReferral = async () => {
    const success = await copyToClipboard(getReferralLink());
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Link Copied",
        description: "The referral link has been copied to your clipboard.",
      });
    }
  };

  const handleShareReferral = async () => {
    const shareData = {
      title: 'ORTIMI Tutoring',
      text: 'Join ORTIMI for focused math tutoring and get 10% off your session!',
      url: getReferralLink(),
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed", err);
        if (err instanceof Error && err.name !== "AbortError") {
          toast({
            title: "Share Failed",
            description: `Error: ${err.message}`,
            variant: "destructive",
          });
          handleCopyReferral();
        }
      }
    } else {
      toast({
        title: "Share Unavailable",
        description: "Your browser doesn't support native sharing in this context.",
        variant: "destructive",
      });
      handleCopyReferral();
    }
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

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-sm w-[95vw] sm:w-full overflow-hidden p-0 gap-0 shadow-2xl">
        <div className="p-5 sm:p-6 relative max-h-[85vh] overflow-y-auto custom-scrollbar">
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
                <div className="bg-secondary/50 p-4 rounded-lg border border-primary/20 space-y-2">
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
                <p className="text-sm font-medium text-foreground"><span className="text-muted-foreground">Amount:</span> ₦{currentPrice.toLocaleString()} {isReferred && "(10% off applied)"}</p>
              </div>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 text-center mb-6">
                <p className="text-xs font-semibold text-primary uppercase mb-2 flex items-center justify-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  Refer a Friend & Get 10% Off
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Share this link with a friend. When they book, they get 10% off! (you get 10% off by using their link)
                </p>

                <div className="bg-secondary/50 p-2 rounded border border-border mt-1 mb-4">
                  <p className="text-[10px] font-mono break-all select-all text-muted-foreground bg-black/20 p-2 rounded">
                    {getReferralLink()}
                  </p>
                  <p className="text-[9px] text-muted-foreground mt-1 italic italic">
                    Tip: Tap or long-press the link above to manually select/copy
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyReferral}
                    className="flex-1 text-xs font-medium border-primary/30 hover:bg-primary/10 transition-colors"
                  >
                    {isCopied ? (
                      <><Check className="w-3 h-3 mr-1.5" /> Copied!</>
                    ) : (
                      <><Copy className="w-3 h-3 mr-1.5" /> Copy Link</>
                    )}
                  </Button>

                  {canNativeShare && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShareReferral}
                      className="flex-1 text-xs font-medium border-primary/30 hover:bg-primary/10 transition-colors"
                    >
                      <Share2 className="w-3 h-3 mr-1.5" /> Share Link
                    </Button>
                  )}
                </div>
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
