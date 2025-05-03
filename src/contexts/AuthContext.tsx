
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserType = "student" | "expert";

export type UserProfile = {
  id: string;
  user_type: UserType;
  first_name: string;
  last_name: string;
  country: string;
};

export type StudentProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
  user_type?: UserType; // Added for compatibility with UI
};

export type ExpertProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  country: string | null;
  expertise: string[];
  rating: number | null;
  total_earnings: number | null;
  is_active: boolean | null;
  is_online: boolean | null;
  last_active: string | null;
  created_at: string;
  updated_at: string;
  user_type?: UserType; // Added for compatibility with UI
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: StudentProfile | ExpertProfile | null;
  userType: UserType | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userType: UserType, firstName: string, lastName: string, country: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | ExpertProfile | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user);
          }, 0);
        } else {
          setProfile(null);
          setUserType(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (user: User) => {
    try {
      const userMetadata = user.user_metadata;
      const userType = userMetadata?.user_type || 'student';
      setUserType(userType as UserType);
      
      // Fetch the appropriate profile based on user type
      if (userType === 'student') {
        const { data, error } = await supabase
          .from("student_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          const studentProfile = data as StudentProfile;
          // Add user_type for UI consistency
          setProfile({
            ...studentProfile,
            user_type: 'student'
          });
          
          // Redirect to the appropriate dashboard if on login pages
          const currentPath = window.location.pathname;
          if (currentPath === "/student/login" || currentPath === "/student/register" || currentPath === "/") {
            navigate("/dashboard");
          }
        }
      } else if (userType === 'expert') {
        const { data, error } = await supabase
          .from("expert_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          const expertProfile = data as ExpertProfile;
          // Add user_type for UI consistency
          setProfile({
            ...expertProfile,
            user_type: 'expert'
          });
          
          // Redirect to the appropriate dashboard if on login pages
          const currentPath = window.location.pathname;
          if (currentPath === "/expert/login" || currentPath === "/expert/register" || currentPath === "/") {
            navigate("/expert/dashboard");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      // Get the user type from user metadata
      const userType = data.user?.user_metadata?.user_type || 'student';
      
      // Redirect to the appropriate dashboard
      if (userType === 'expert') {
        navigate("/expert/dashboard");
      } else {
        navigate("/dashboard");
      }
      
      toast.success("Welcome back! You've been successfully logged in.");
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "There was an error logging in.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        if (error.message.includes("provider is not enabled")) {
          throw new Error("Google authentication is not enabled. Please configure it in the Supabase dashboard.");
        }
        throw error;
      }
      
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      toast.error(error.message || "There was an error logging in with Google.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        if (error.message.includes("provider is not enabled")) {
          throw new Error("Facebook authentication is not enabled. Please configure it in the Supabase dashboard.");
        }
        throw error;
      }
      
    } catch (error: any) {
      console.error("Error signing in with Facebook:", error);
      toast.error(error.message || "There was an error logging in with Facebook.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userType: UserType, 
    firstName: string,
    lastName: string,
    country: string
  ) => {
    try {
      setLoading(true);
      
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            first_name: firstName,
            last_name: lastName,
            country: country
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      toast.success("Account created! Please check your email for the verification code.");
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "There was an error creating your account.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      navigate("/");
      
      toast.success("You've been successfully logged out.");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error("There was an error logging you out.");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    userType,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
