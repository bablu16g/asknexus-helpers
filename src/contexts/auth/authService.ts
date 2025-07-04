
import { supabase } from "@/integrations/supabase/client";
import { UserType } from "./types";
import { toast } from "sonner";

export async function signIn(email: string, password: string) {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) throw error;
    
    toast.success("Welcome back! You've been successfully logged in.");
    return { error: null, data };
  } catch (error: any) {
    console.error("Error signing in:", error);
    toast.error(error.message || "There was an error logging in.");
    return { error, data: null };
  }
}

export async function signUp(
  email: string, 
  password: string, 
  userType: UserType, 
  firstName: string,
  lastName: string,
  country: string
) {
  try {
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
        // Remove emailRedirectTo to ensure OTP verification is used
      }
    });
    
    if (error) throw error;
    
    toast.success("Account created! Please check your email for the verification code.");
    return { error: null, data };
  } catch (error: any) {
    console.error("Error signing up:", error);
    toast.error(error.message || "There was an error creating your account.");
    return { error, data: null };
  }
}

export async function signInWithGoogle(userType: UserType = "student") {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        // Route to appropriate dashboard based on user type
        redirectTo: `${window.location.origin}/auth/callback?user_type=${userType}`
      }
    });
    
    if (error) {
      if (error.message.includes("provider is not enabled")) {
        throw new Error("Google authentication is not enabled. Please configure it in the Supabase dashboard.");
      }
      throw error;
    }
    
    return { error: null };
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    toast.error(error.message || "There was an error logging in with Google.");
    return { error };
  }
}

export async function signInWithFacebook(userType: UserType = "student") {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        queryParams: {},
        // Route to appropriate dashboard based on user type
        redirectTo: `${window.location.origin}/auth/callback?user_type=${userType}`
      }
    });
    
    if (error) {
      if (error.message.includes("provider is not enabled")) {
        throw new Error("Facebook authentication is not enabled. Please configure it in the Supabase dashboard.");
      }
      throw error;
    }
    
    return { error: null };
  } catch (error: any) {
    console.error("Error signing in with Facebook:", error);
    toast.error(error.message || "There was an error logging in with Facebook.");
    return { error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast.success("You've been successfully logged out.");
    return { error: null };
  } catch (error: any) {
    console.error("Error signing out:", error);
    toast.error("There was an error logging you out.");
    return { error };
  }
}

export async function forgotPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) throw error;
    
    toast.success("Password reset instructions sent to your email.");
    return { error: null };
  } catch (error: any) {
    console.error("Error sending reset password email:", error);
    toast.error(error.message || "There was an error sending the password reset email.");
    return { error };
  }
}
