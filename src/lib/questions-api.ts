
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/contexts/AuthContext";

export type Question = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  user_id: string;
  subject: string;
  created_at: string;
  profile?: UserProfile;
};

export async function createQuestion(
  title: string,
  content: string,
  subject: string,
  imageUrl?: string
) {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  return supabase.from("questions").insert({
    title,
    content,
    user_id: user.user.id,
    subject,
    image_url: imageUrl || null,
  });
}

export async function getQuestions() {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      profiles:user_id(*)
    `)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data as (Question & { profiles: UserProfile })[];
}

export async function getUserQuestions(userId: string) {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      profiles:user_id(*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  return data as (Question & { profiles: UserProfile })[];
}
