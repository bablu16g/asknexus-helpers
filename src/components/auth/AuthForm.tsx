import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import OTPVerification from "./OTPVerification";

const GoogleLogo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.545 6.558C15.6392 7.03733 15.6833 7.52133 15.6833 8C15.6833 8.47867 15.6392 8.96267 15.545 9.442H8.16667V6.558H12.3092C12.1208 5.91467 11.7233 5.36667 11.1642 4.97867L13.6325 3.16133C14.8283 4.29267 15.545 6.00933 15.545 8V6.558Z" fill="#4285F4"/>
    <path d="M8.16686 16C10.3669 16 12.2169 15.2667 13.6327 13.9887L11.1644 12.1713C10.4402 12.64 9.43619 13 8.16686 13C6.05352 13 4.27686 11.5887 3.63686 9.66667L1.09619 11.5333C2.49086 14.2533 5.05219 16 8.16686 16Z" fill="#34A853"/>
    <path d="M3.63667 9.66733C3.48333 9.18867 3.4 8.604 3.4 8C3.4 7.39733 3.48333 6.812 3.63667 6.33333L1.096 4.46667C0.578667 5.54533 0.283333 6.74267 0.283333 8C0.283333 9.25733 0.578667 10.4547 1.096 11.5333L3.63667 9.66733Z" fill="#FBBC05"/>
    <path d="M8.16686 3C9.36819 3 10.4535 3.414 11.2962 4.22L13.4975 2C12.2169 0.76 10.367 0 8.16686 0C5.05219 0 2.49086 1.74667 1.09619 4.46667L3.63686 6.33333C4.27686 4.41133 6.05352 3 8.16686 3Z" fill="#EA4335"/>
  </svg>
);

const FacebookLogo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.1111 0H0.888889C0.4 0 0 0.4 0 0.888889V15.1111C0 15.6 0.4 16 0.888889 16H8.53333V9.77778H6.46667V7.37778H8.53333V5.57778C8.53333 3.51111 9.77778 2.4 11.6444 2.4C12.5333 2.4 13.2889 2.46667 13.5111 2.48889V4.66667H12.2222C11.2 4.66667 11 5.14444 11 5.84444V7.37778H13.4222L13.1111 9.77778H11V16H15.1111C15.6 16 16 15.6 16 15.1111V0.888889C16 0.4 15.6 0 15.1111 0Z" fill="#1877F2"/>
  </svg>
);

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  country: z.string().optional(),
});

interface AuthFormProps {
  type: "login" | "register";
  userType?: "student" | "expert";
}

export function AuthForm({ type, userType = "student" }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      country: "",
    },
  });
  
  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            user_type: userType,
          },
        },
      });

      if (error) {
        if (error.message.includes("provider is not enabled")) {
          setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not enabled. Please contact an administrator to enable this feature.`);
        } else {
          setError(error.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError("");

    try {
      if (type === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (error) {
          setError(error.message);
        }
      } else {
        if (values.password !== values.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              user_type: userType,
              first_name: values.firstName || "",
              last_name: values.lastName || "",
              country: values.country || "",
            },
          },
        });

        if (error) {
          setError(error.message);
        } else {
          // Show OTP verification instead of success message
          setCurrentEmail(values.email);
          setShowOTPVerification(true);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSuccess = () => {
    setShowOTPVerification(false);
    setSuccess(
      "Your account has been created and email verified. You can now log in."
    );
  };
  
  const handleOTPCancel = () => {
    setShowOTPVerification(false);
    setSuccess(
      "Your account has been created. Please check your email for a verification link."
    );
  };

  if (showOTPVerification) {
    return (
      <OTPVerification 
        email={currentEmail}
        onSuccess={handleOTPSuccess}
        onCancel={handleOTPCancel}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground">
            {type === "login"
              ? "Sign in to your account to continue"
              : `Join as a ${userType} to get started`}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400 rounded-md text-sm">
            {success}
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="w-full"
            onClick={() => handleSocialLogin("google")}
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="w-full"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FacebookLogo className="mr-2 h-4 w-4" />
            Continue with Facebook
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {type === "register" && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>
                    {type === "login" && (
                      <Link
                        to="/forgot-password"
                        className="text-sm text-nexus-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === "register" && (
              <>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {type === "login" ? "Signing in..." : "Creating account..."}
                </div>
              ) : type === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm">
            {type === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Link
              to={
                type === "login"
                  ? `/${userType}/register`
                  : `/${userType}/login`
              }
              className="text-nexus-600 hover:underline"
            >
              {type === "login" ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>

        {type === "login" && userType === "student" && (
          <div className="text-center border-t pt-4">
            <p className="text-sm">
              Are you an expert?{" "}
              <Link to="/expert/login" className="text-nexus-600 hover:underline">
                Expert Login
              </Link>
            </p>
          </div>
        )}

        {type === "login" && userType === "expert" && (
          <div className="text-center border-t pt-4">
            <p className="text-sm">
              Are you a student?{" "}
              <Link to="/student/login" className="text-nexus-600 hover:underline">
                Student Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
