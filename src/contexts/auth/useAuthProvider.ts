
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { UserType, StudentProfile, ExpertProfile } from "./types";

export function useAuthProvider() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProfile | ExpertProfile | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
  }, [navigate]);

  const fetchUserProfile = async (user: User) => {
    try {
      // Check if there's a user_type parameter in the URL (for OAuth redirects)
      const urlUserType = searchParams.get('user_type');
      
      // Get user metadata
      const userMetadata = user.user_metadata;
      // Determine user type from metadata or URL parameter
      const userTypeValue = urlUserType || userMetadata?.user_type || 'student';
      setUserType(userTypeValue as UserType);
      
      // Fetch the appropriate profile based on user type
      if (userTypeValue === 'student') {
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
          if (currentPath === "/student/login" || currentPath === "/student/register" || 
              currentPath === "/auth/callback" || currentPath === "/") {
            navigate("/dashboard");
          }
        }
      } else if (userTypeValue === 'expert') {
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
          
          // Check if the expert needs to complete onboarding
          const isNewExpert = !expertProfile.expertise || expertProfile.expertise.length === 0;
          
          // Redirect to the appropriate page based on onboarding status
          const currentPath = window.location.pathname;
          if (currentPath === "/expert/login" || currentPath === "/expert/register" || 
              currentPath === "/auth/callback" || currentPath === "/") {
            if (isNewExpert) {
              navigate("/expert/onboarding");
            } else {
              navigate("/expert/dashboard");
            }
          }
        } else {
          // If no expert profile exists but user signed up as expert,
          // redirect to onboarding
          navigate("/expert/onboarding");
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  };

  return {
    session,
    user,
    profile,
    userType,
    loading,
    setLoading
  };
}
