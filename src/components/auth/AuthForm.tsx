
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Google } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  type: "login" | "register";
  userType: "student" | "expert";
}

export function AuthForm({ type, userType }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeTos, setAgreeTos] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, name, agreeTos });
    // Handle authentication logic here
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
            : `Join as ${userType === "student" ? "student" : "expert"} to ${
                userType === "student" ? "get help with your studies" : "share your knowledge"
              }`}
        </p>
      </div>

      <div className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-5 border-2"
          onClick={() => console.log("Google auth")}
        >
          <Google className="h-5 w-5" />
          <span>Continue with Google</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-5 border-2"
          onClick={() => console.log("Facebook auth")}
        >
          <Facebook className="h-5 w-5" />
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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-500 bg-background"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-500 bg-background"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-nexus-500 bg-background"
              placeholder={type === "login" ? "Enter your password" : "Create a password"}
              required
            />
          </div>
          
          {type === "register" && (
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTos}
                  onChange={(e) => setAgreeTos(e.target.checked)}
                  className="w-4 h-4 border border-border rounded focus:ring-nexus-500 bg-background"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-xs text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-nexus-600 dark:text-nexus-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-nexus-600 dark:text-nexus-400 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
          )}
          
          <Button 
            type="submit" 
            className={cn(
              "w-full py-5 rounded-lg",
              userType === "student" 
                ? "bg-nexus-500 hover:bg-nexus-600" 
                : "bg-expert-600 hover:bg-expert-700"
            )}
          >
            {type === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        
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
