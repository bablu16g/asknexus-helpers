
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import OTPVerification from "@/components/auth/OTPVerification";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have the access token in the URL (Supabase automatically adds it)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get("access_token")) {
      toast.error("Invalid or expired reset link");
      navigate("/forgot-password");
    } else {
      // Extract email from the hash if possible
      const currentSession = supabase.auth.session();
      if (currentSession?.user?.email) {
        setEmail(currentSession.user.email);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }
      
      toast.success("Password has been reset successfully!");
      navigate("/student/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setIsOtpVerified(true);
  };

  const handleCancelOTP = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <Card className="glass-card max-w-md mx-auto p-8 rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isOtpVerified ? "Create new password" : "Verify your identity"}
            </CardTitle>
            <CardDescription>
              {isOtpVerified 
                ? "Enter and confirm your new password below."
                : "Enter the verification code sent to your email."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isOtpVerified ? (
              <OTPVerification
                email={email}
                onSuccess={handleOtpSuccess}
                onCancel={handleCancelOTP}
              />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      required
                      className="w-full pr-10"
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      required
                      className="w-full pr-10"
                      minLength={8}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full text-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default ResetPassword;
