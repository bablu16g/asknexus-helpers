
import { supabase } from "@/integrations/supabase/client";

export type Question = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  user_id: string;
  subject: string;
  created_at: string;
  profile?: any;
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
  
  return supabase
    .from("questions")
    .insert({
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
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  
  // Get student profiles for each question
  const questions = data as Question[];
  const enhancedQuestions = await Promise.all(
    questions.map(async (question) => {
      const { data: profileData } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("id", question.user_id)
        .single();
      
      return {
        ...question,
        profile: profileData,
      };
    })
  );
  
  return enhancedQuestions;
}

export async function getUserQuestions(userId: string) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
    
  if (error) throw error;
  
  // Get student profile for each question
  const questions = data as Question[];
  const enhancedQuestions = await Promise.all(
    questions.map(async (question) => {
      const { data: profileData } = await supabase
        .from("student_profiles")
        .select("*")
        .eq("id", question.user_id)
        .single();
      
      return {
        ...question,
        profile: profileData,
      };
    })
  );
  
  return enhancedQuestions;
}

export async function getQuestionAssignments(expertId: string) {
  const { data, error } = await supabase
    .from("question_assignments")
    .select(`
      *,
      questions(*)
    `)
    .eq("expert_id", expertId)
    .eq("status", "assigned")
    .order("assigned_at", { ascending: true });
    
  if (error) throw error;
  
  return data;
}

export async function updateExpertStatus(isOnline: boolean) {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  return supabase
    .from("expert_profiles")
    .update({
      is_online: isOnline,
      is_active: isOnline,
      last_active: new Date().toISOString(),
    })
    .eq("id", user.user.id);
}
