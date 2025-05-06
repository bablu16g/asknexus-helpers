
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { SubjectTest } from "@/components/expert/SubjectTest";

// Define steps for the onboarding process
enum OnboardingStep {
  QUALIFICATION = 0,
  SUBJECT_SELECTION = 1,
  SUBJECT_TEST = 2,
  RESULTS = 3,
}

// Define subjects
const SUBJECTS = [
  { value: "math", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "computer_science", label: "Computer Science" },
  { value: "economics", label: "Economics" },
  { value: "history", label: "History" },
  { value: "literature", label: "Literature" },
  { value: "psychology", label: "Psychology" },
  { value: "accounting", label: "Accounting" },
];

// Form schema for expert qualification
const qualificationSchema = z.object({
  education: z.string().min(1, "Education qualification is required"),
  experience: z.string().min(1, "Work/teaching experience is required"),
  bio: z.string().min(100, "Bio must be at least 100 characters").max(500, "Bio cannot exceed 500 characters"),
});

// Form schema for subject selection
const subjectSelectionSchema = z.object({
  subjects: z.array(z.string()).min(1, "Please select at least one subject"),
});

type QualificationFormValues = z.infer<typeof qualificationSchema>;
type SubjectSelectionFormValues = z.infer<typeof subjectSelectionSchema>;

const ExpertOnboarding = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.QUALIFICATION);
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [currentTestSubject, setCurrentTestSubject] = useState<string>("");
  const [testResults, setTestResults] = useState<{
    passed: boolean;
    score: number;
    message: string;
  }>({ passed: false, score: 0, message: "" });

  // Qualification form
  const qualificationForm = useForm<QualificationFormValues>({
    resolver: zodResolver(qualificationSchema),
    defaultValues: {
      education: "",
      experience: "",
      bio: "",
    },
  });

  // Subject selection form
  const subjectForm = useForm<SubjectSelectionFormValues>({
    resolver: zodResolver(subjectSelectionSchema),
    defaultValues: {
      subjects: [],
    },
  });

  const handleQualificationSubmit = async (data: QualificationFormValues) => {
    setLoading(true);
    try {
      if (!user?.id) {
        throw new Error("User ID is required");
      }
      
      // Save qualification data to database using raw query to work around TypeScript limitations
      // We're using this approach because the types haven't been updated to match the database schema
      const { error } = await supabase
        .from("expert_profiles")
        .update({
          education: data.education,
          experience: data.experience,
          bio: data.bio
        } as any)
        .eq("id", user.id);

      if (error) throw error;
      
      // Move to the next step
      setCurrentStep(OnboardingStep.SUBJECT_SELECTION);
    } catch (error: any) {
      toast.error(error.message || "Failed to save qualification information");
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSubmit = (data: SubjectSelectionFormValues) => {
    setSelectedSubjects(data.subjects);
    // Start with the first subject test
    if (data.subjects.length > 0) {
      setCurrentTestSubject(data.subjects[0]);
      setCurrentStep(OnboardingStep.SUBJECT_TEST);
    }
  };

  const handleTestComplete = (score: number) => {
    const passed = score >= 80;
    
    // Update test results
    setTestResults({
      passed,
      score,
      message: passed
        ? "Congratulations! You've passed the test and are now qualified to teach this subject."
        : "Unfortunately, you didn't pass the test. You can try again after 1 month.",
    });
    
    // Move to results step
    setCurrentStep(OnboardingStep.RESULTS);
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      if (!user?.id) {
        throw new Error("User ID is required");
      }
      
      // Update expert profile with approved subjects
      if (testResults.passed) {
        const { error } = await supabase
          .from("expert_profiles")
          .update({
            expertise: [currentTestSubject],
            is_active: true,
          })
          .eq("id", user.id);

        if (error) throw error;
      }
      
      // Redirect to expert dashboard
      navigate("/expert/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to complete onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-3xl mx-auto p-8 rounded-2xl mb-8">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <ul className="flex gap-4 items-center">
                {[
                  "Qualifications",
                  "Subject Selection", 
                  "Subject Test",
                  "Results"
                ].map((step, index) => (
                  <li key={step} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= index
                          ? "bg-nexus-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > index ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span 
                      className={`ml-2 ${
                        currentStep >= index
                          ? "text-nexus-600 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                    {index < 3 && (
                      <div className="w-6 h-0.5 bg-gray-300 mx-2"></div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {currentStep === OnboardingStep.QUALIFICATION && (
              <Card>
                <CardHeader>
                  <CardTitle>Educational & Professional Background</CardTitle>
                  <CardDescription>
                    Tell us about your qualifications and teaching experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...qualificationForm}>
                    <form onSubmit={qualificationForm.handleSubmit(handleQualificationSubmit)} className="space-y-6">
                      <FormField
                        control={qualificationForm.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Educational Qualifications</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="E.g., PhD in Physics, Stanford University" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={qualificationForm.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teaching/Professional Experience</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="E.g., 5 years teaching at high school level" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={qualificationForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write a short bio highlighting your expertise and teaching approach" 
                                {...field}
                                rows={4} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Next: Select Subjects"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {currentStep === OnboardingStep.SUBJECT_SELECTION && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Teaching Subjects</CardTitle>
                  <CardDescription>
                    Choose the subjects you want to teach on our platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...subjectForm}>
                    <form onSubmit={subjectForm.handleSubmit(handleSubjectSubmit)} className="space-y-6">
                      <FormField
                        control={subjectForm.control}
                        name="subjects"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subjects</FormLabel>
                            <FormControl>
                              <MultiSelect
                                options={SUBJECTS}
                                placeholder="Select subjects you want to teach"
                                selected={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setCurrentStep(OnboardingStep.QUALIFICATION)}
                        >
                          Back
                        </Button>
                        <Button type="submit">
                          Next: Take Subject Test
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {currentStep === OnboardingStep.SUBJECT_TEST && (
              <Card>
                <CardHeader>
                  <CardTitle>Subject Knowledge Test: {SUBJECTS.find(s => s.value === currentTestSubject)?.label}</CardTitle>
                  <CardDescription>
                    Complete this 10-question test to qualify as an expert in this subject.
                    You need to score at least 80% to pass.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SubjectTest 
                    subject={currentTestSubject} 
                    onComplete={handleTestComplete}
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === OnboardingStep.RESULTS && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {testResults.passed ? "Congratulations!" : "Test Results"}
                  </CardTitle>
                  <CardDescription>
                    {testResults.passed 
                      ? `You've passed the test with a score of ${testResults.score}%!` 
                      : `Your score: ${testResults.score}%`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-gray-50">
                      <p className={`text-lg ${testResults.passed ? "text-green-600" : "text-red-600"}`}>
                        {testResults.message}
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleFinish} disabled={loading}>
                        {loading ? "Processing..." : "Go to Dashboard"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertOnboarding;
