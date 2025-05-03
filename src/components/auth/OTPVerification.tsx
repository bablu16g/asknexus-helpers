
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const OTPVerification = ({ email, onSuccess, onCancel }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(60); // 1 minute cooldown for resend

  useEffect(() => {
    // Start countdown for OTP expiration
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start countdown for resend button
    const resendTimer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          setResendDisabled(false);
          clearInterval(resendTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(resendTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsVerifying(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Email verified successfully!");
        onSuccess();
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);
    setResendCountdown(60);
    
    // Start countdown for resend button again
    const resendTimer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          setResendDisabled(false);
          clearInterval(resendTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Verification code has been resent");
        setCountdown(600); // Reset the main countdown to 10 minutes
      }
    } catch (error) {
      toast.error("Failed to resend verification code");
    }
  };

  // Handle OTP digit input
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/[^0-9]/g, '');
    // Limit to 6 digits
    setOtp(value.slice(0, 6));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Email Verification</CardTitle>
        <CardDescription>
          A verification code has been sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Enter the 6-digit code
          </label>
          <Input
            type="text"
            placeholder="000000"
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            className="text-center text-lg tracking-widest"
          />
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Code expires in <span className="font-semibold">{formatTime(countdown)}</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>
        
        <div className="flex items-center justify-between w-full text-sm">
          <Button
            variant="link"
            onClick={onCancel}
            className="p-0 h-auto"
          >
            Try a different method
          </Button>
          
          <Button
            variant="link"
            onClick={handleResendOTP}
            disabled={resendDisabled}
            className="p-0 h-auto"
          >
            {resendDisabled 
              ? `Resend code in ${formatTime(resendCountdown)}` 
              : "Resend code"
            }
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OTPVerification;
