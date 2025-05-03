
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { BookOpen, DollarSign, History, MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getQuestionAssignments, updateExpertStatus } from "@/lib/questions-api";
import { useNavigate } from "react-router-dom";

type QuestionAssignment = {
  id: string;
  question_id: string;
  expert_id: string;
  status: string;
  assigned_at: string;
  questions: {
    id: string;
    title: string;
    content: string;
    subject: string;
    created_at: string;
  }
}

const ExpertDashboard = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isOnline, setIsOnline] = useState(false);
  const [assignedQuestions, setAssignedQuestions] = useState<QuestionAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set expert status
    if (profile) {
      const expertProfile = profile as any;
      setIsOnline(expertProfile.is_online || false);
      
      // Load assigned questions
      const loadAssignments = async () => {
        try {
          const data = await getQuestionAssignments(expertProfile.id);
          setAssignedQuestions(data as QuestionAssignment[]);
        } catch (error) {
          console.error("Error loading assignments:", error);
        } finally {
          setLoading(false);
        }
      };
      
      loadAssignments();
    }
  }, [profile]);
  
  const handleStatusChange = async (checked: boolean) => {
    setIsOnline(checked);
    try {
      await updateExpertStatus(checked);
    } catch (error) {
      console.error("Error updating expert status:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-7xl mx-auto p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Expert Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Status:</span>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={isOnline} 
                    onCheckedChange={handleStatusChange} 
                  />
                  <span className={isOnline ? "text-green-600" : "text-gray-500"}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <Button variant="outline" onClick={signOut}>Sign Out</Button>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-nexus-600" />
                      <span>{assignedQuestions.length}</span>
                    </CardTitle>
                    <CardDescription>Assigned Questions</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-nexus-600" />
                      <span>$0.00</span>
                    </CardTitle>
                    <CardDescription>Pending Earnings</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-nexus-600" />
                      <span>New Expert</span>
                    </CardTitle>
                    <CardDescription>Rating</CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Select subjects for tutoring</CardTitle>
                  <CardDescription>
                    The available questions are shown next to each subject. First-come, first-serve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="all-subjects" className="mr-2" />
                      <label htmlFor="all-subjects">All subjects</label>
                    </div>
                    
                    <div className="space-y-2 ml-4">
                      <div className="flex items-center">
                        <input type="checkbox" id="computer-science" className="mr-2" />
                        <label htmlFor="computer-science">Computer Science</label>
                      </div>
                      
                      <div className="flex items-center ml-4">
                        <input type="checkbox" id="computer-science-other" className="mr-2" />
                        <label htmlFor="computer-science-other">Computer Science - Other (5)</label>
                      </div>
                    </div>
                    
                    <Button className="mt-4 w-full sm:w-auto">Start tutoring</Button>
                  </div>
                </CardContent>
              </Card>
              
              {assignedQuestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent assigned questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignedQuestions.map((assignment) => (
                      <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-muted-foreground">{assignment.questions.subject}</span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Assigned {new Date(assignment.assigned_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <h3 className="text-base font-medium mb-1">{assignment.questions.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{assignment.questions.content}</p>
                          <div className="mt-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/expert/answer/${assignment.question_id}`)}
                            >
                              Answer Question
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="questions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Questions</CardTitle>
                  <CardDescription>
                    Questions that have been assigned to you based on your expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-6">Loading assignments...</div>
                  ) : assignedQuestions.length > 0 ? (
                    <div className="space-y-4">
                      {assignedQuestions.map((assignment) => (
                        <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex justify-between mb-4">
                              <span className="text-sm text-muted-foreground">{assignment.questions.subject}</span>
                              <span className="text-sm font-medium text-nexus-600">Assigned to you</span>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">
                              {assignment.questions.title}
                            </h3>
                            
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {assignment.questions.content}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Assigned {new Date(assignment.assigned_at).toLocaleString()}</span>
                              </div>
                              <Button onClick={() => navigate(`/expert/answer/${assignment.question_id}`)}>
                                Answer Question
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No questions have been assigned to you yet.</p>
                      <p className="text-sm">Set your status to online and select your subject expertise to start receiving questions.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earnings" className="space-y-6">
              <div className="text-3xl font-bold">My Earnings</div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What are Tutor Earnings?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">Answer students' questions and earn money.</p>
                    <Button onClick={() => setActiveTab("questions")}>Browse Questions</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Money Earned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Lifetime Earnings:</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Available Cash:</span>
                        <span>$0.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pending earnings</CardTitle>
                  <CardDescription>You don't have any pending earnings yet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">Start answering questions to earn money.</p>
                    <Button onClick={() => setActiveTab("questions")}>Browse Questions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertDashboard;
