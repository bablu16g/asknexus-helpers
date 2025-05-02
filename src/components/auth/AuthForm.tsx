
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Facebook as FacebookIcon, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface AuthFormProps {
  type: "login" | "register";
  userType: "student" | "expert";
}

export function AuthForm({ type, userType }: AuthFormProps) {
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Login form schema
  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  // Register form schema
  const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    country: z.string().min(1, { message: "Please select your country" }),
    agreeTos: z.boolean().refine(val => val === true, { message: "You must agree to the terms" }),
  });

  // Create form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      country: "",
      agreeTos: false,
    },
  });

  // Handle login submission
  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      await signIn(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration submission
  const handleRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true);
      await signUp(
        values.email,
        values.password,
        userType,
        values.name,
        values.country
      );
      // Not automatically navigating to dashboard as user needs to verify email
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Google authentication
  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      // Redirect happens automatically
    } catch (error) {
      console.error("Google auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Facebook authentication
  const handleFacebookAuth = async () => {
    try {
      setIsLoading(true);
      await signInWithFacebook();
      // Redirect happens automatically
    } catch (error) {
      console.error("Facebook auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {type === "login" ? "Welcome Back" : "Create Your Account"}
        </h1>
        <p className="text-muted-foreground">
          {type === "login"
            ? `Sign in to continue as ${userType === "student" ? "student" : "expert"}`
            : `Join as ${userType === "student" ? "student to get help with your studies" : "expert to share your knowledge"}`}
        </p>
      </div>

      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-5 border-2"
          onClick={handleGoogleAuth}
          disabled={isLoading}
        >
          <Chrome className="h-5 w-5" />
          <span>Continue with Google</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-5 border-2"
          onClick={handleFacebookAuth}
          disabled={isLoading}
        >
          <FacebookIcon className="h-5 w-5" />
          <span>Continue with Facebook</span>
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>
        
        {type === "login" ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        type="password" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className={cn(
                  "w-full py-5 rounded-lg",
                  userType === "student" 
                    ? "bg-nexus-500 hover:bg-nexus-600" 
                    : "bg-expert-600 hover:bg-expert-700"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Create a password" 
                        type="password" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="agreeTos"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 border border-border rounded focus:ring-nexus-500 bg-background"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal text-xs text-muted-foreground">
                        I agree to the{" "}
                        <Link to="/terms" className="text-nexus-600 dark:text-nexus-400 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-nexus-600 dark:text-nexus-400 hover:underline">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className={cn(
                  "w-full py-5 rounded-lg",
                  userType === "student" 
                    ? "bg-nexus-500 hover:bg-nexus-600" 
                    : "bg-expert-600 hover:bg-expert-700"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        )}
        
        <div className="text-center text-sm text-muted-foreground">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link 
                to={`/${userType}/register`} 
                className="text-nexus-600 dark:text-nexus-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link 
                to={`/${userType}/login`} 
                className="text-nexus-600 dark:text-nexus-400 hover:underline font-medium"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
        
        {userType === "student" && type === "login" && (
          <div className="text-center text-sm">
            <Link to="/expert/login" className="text-muted-foreground hover:text-foreground">
              Are you an expert? <span className="text-expert-600 dark:text-expert-400">Sign in here</span>
            </Link>
          </div>
        )}
        
        {userType === "expert" && type === "login" && (
          <div className="text-center text-sm">
            <Link to="/student/login" className="text-muted-foreground hover:text-foreground">
              Are you a student? <span className="text-nexus-600 dark:text-nexus-400">Sign in here</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
