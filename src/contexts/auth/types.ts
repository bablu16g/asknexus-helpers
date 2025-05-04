
import { Session, User } from "@supabase/supabase-js";

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

export type AuthContextType = {
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
