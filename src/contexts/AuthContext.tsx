
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "./auth/useAuthProvider";
import { signIn, signUp, signInWithGoogle, signInWithFacebook, signOut } from "./auth/authService";
import { AuthContextType } from "./auth/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    auth.setLoading(true);
    const { error, data } = await signIn(email, password);
    
    if (!error && data) {
      // Redirect to the appropriate dashboard
      const userType = data.user?.user_metadata?.user_type || 'student';
      if (userType === 'expert') {
        navigate("/expert/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
    
    auth.setLoading(false);
  };
  
  const handleSignUp = async (
    email: string, 
    password: string, 
    userType: UserType, 
    firstName: string,
    lastName: string,
    country: string
  ) => {
    auth.setLoading(true);
    await signUp(email, password, userType, firstName, lastName, country);
    auth.setLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    auth.setLoading(true);
    await signInWithGoogle();
    auth.setLoading(false);
  };

  const handleSignInWithFacebook = async () => {
    auth.setLoading(true);
    await signInWithFacebook();
    auth.setLoading(false);
  };

  const handleSignOut = async () => {
    auth.setLoading(true);
    const { error } = await signOut();
    if (!error) {
      navigate("/");
    }
    auth.setLoading(false);
  };

  const value = {
    ...auth,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithFacebook: handleSignInWithFacebook,
    signOut: handleSignOut,
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

// Re-export types for convenience
export type { UserType, UserProfile, StudentProfile, ExpertProfile } from "./auth/types";
