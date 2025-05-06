
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
  
  // Create the question
  const { data: questionData, error: questionError } = await supabase
    .from("questions")
    .insert({
      title,
      content,
      user_id: user.user.id,
      subject,
      image_url: imageUrl || null,
    })
    .select();
    
  if (questionError) throw questionError;
  
  // Get online experts
  const { data: onlineExperts, error: expertsError } = await supabase
    .from("expert_profiles")
    .select("id")
    .eq("is_online", true)
    .eq("is_active", true);
    
  if (expertsError) throw expertsError;
  
  // If there are online experts, assign the question to one of them
  if (onlineExperts && onlineExperts.length > 0) {
    // Randomly select an expert (for load balancing)
    const selectedExpertIndex = Math.floor(Math.random() * onlineExperts.length);
    const selectedExpert = onlineExperts[selectedExpertIndex];
    
    // Create question assignment
    const { error: assignmentError } = await supabase
      .from("question_assignments")
      .insert({
        question_id: questionData[0].id,
        expert_id: selectedExpert.id,
        status: "assigned"
      });
      
    if (assignmentError) {
      console.error("Error assigning question:", assignmentError);
      // The question is still created even if assignment fails
    }
  }
  
  return questionData;
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
  const { data: userData } = await supabase.auth.getUser();
  
  if (!userData.user) {
    throw new Error("User not authenticated");
  }
  
  // Update is_online and is_active status
  return supabase
    .from("expert_profiles")
    .update({
      is_online: isOnline,
      is_active: isOnline,
      last_active: new Date().toISOString(),
    })
    .eq("id", userData.user.id);
}
