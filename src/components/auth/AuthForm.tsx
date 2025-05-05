
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, UserType } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { forgotPassword } from "@/contexts/auth/authService";
import { useState as useHookState } from "react";
import OTPVerification from "./OTPVerification";

interface AuthFormProps {
  type: "login" | "register";
  userType: UserType;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export const AuthForm = ({ type, userType }: AuthFormProps) => {
  const { signIn, signUp, signInWithGoogle, signInWithFacebook, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgottenEmail, setForgottenEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      country: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    await signIn(data.email, data.password);
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    await signUp(
      data.email,
      data.password,
      userType,
      data.firstName,
      data.lastName,
      data.country
    );
    setRegisteredEmail(data.email);
    setShowOTPVerification(true);
  };

  const handleForgotPassword = async () => {
    setIsResettingPassword(true);
    const { error } = await forgotPassword(forgottenEmail);
    setIsResettingPassword(false);
    if (!error) {
      setShowForgotPassword(false);
      loginForm.reset({
        email: forgottenEmail,
        password: "",
      });
    }
  };

  const handleOTPSuccess = () => {
    setShowOTPVerification(false);
    navigate(userType === "expert" ? "/expert/login" : "/student/login");
  };

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
    "China",
    "Brazil",
    "South Africa",
  ].sort();

  // Show OTP verification if registration was successful
  if (showOTPVerification) {
    return (
      <OTPVerification 
        email={registeredEmail} 
        onSuccess={handleOTPSuccess} 
        onCancel={() => setShowOTPVerification(false)} 
      />
    );
  }

  // Show forgot password form if requested
  if (showForgotPassword) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <p className="text-center text-sm text-muted-foreground">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={forgottenEmail}
              onChange={(e) => setForgottenEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={handleForgotPassword} 
              disabled={!forgottenEmail || isResettingPassword}
            >
              {isResettingPassword ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
            <Button 
              variant="link" 
              onClick={() => setShowForgotPassword(false)}
              className="px-0"
            >
              Back to login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">
        {type === "login" ? "Welcome back!" : "Create an account"}
      </h2>
      <div className="mb-4">
        <Tabs defaultValue={userType} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger
              value="student"
              className={cn(
                userType === "student" ? "font-semibold" : "text-muted-foreground"
              )}
              asChild
            >
              <Link to={type === "login" ? "/student/login" : "/student/register"}>
                Student
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="expert"
              className={cn(
                userType === "expert" ? "font-semibold" : "text-muted-foreground"
              )}
              asChild
            >
              <Link to={type === "login" ? "/expert/login" : "/expert/register"}>
                Expert
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-6">
        <Button
          variant="outline"
          type="button"
          className="w-full mb-3"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <img
              src="/placeholder.svg"
              alt="Google"
              className="mr-2 h-4 w-4"
            />
          )}
          Continue with Google
        </Button>

        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={signInWithFacebook}
          disabled={loading}
        >
          {loading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <img
              src="/placeholder.svg"
              alt="Facebook"
              className="mr-2 h-4 w-4"
            />
          )}
          Continue with Facebook
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {type === "login" ? (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <div className="text-right text-sm mt-1">
                    <Button 
                      variant="link" 
                      type="button" 
                      className="p-0 h-auto text-nexus-600" 
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={registerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jeet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Grewal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
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
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      )}

      <div className="mt-6 text-center text-sm">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link
              to={userType === "expert" ? "/expert/register" : "/student/register"}
              className="font-medium text-nexus-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              to={userType === "expert" ? "/expert/login" : "/student/login"}
              className="font-medium text-nexus-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        )}
      </div>
    </>
  );
};
