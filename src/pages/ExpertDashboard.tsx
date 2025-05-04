
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { BookOpen, DollarSign, History, MessageSquare, ThumbsUp, Clock, CheckCircle, ChevronRight, Loader, Bookmark, Users, Award, BarChart } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { getQuestionAssignments, updateExpertStatus } from "@/lib/questions-api";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-7xl mx-auto p-8 rounded-2xl">
          {/* Welcome Card with Expert Status */}
          <Card className="bg-gradient-to-r from-nexus-600/90 to-nexus-700 text-white mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarFallback className="bg-white text-nexus-700 text-xl">
                      {profile?.first_name?.[0] || "E"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">Welcome, {profile?.first_name || "Expert"}!</h1>
                    <p className="mt-1 text-white/80">Share your knowledge and earn while helping students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 rounded-lg px-4 py-3 flex flex-col items-center">
                    <div className="text-sm text-white/80">Status</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Switch 
                        checked={isOnline} 
                        onCheckedChange={handleStatusChange} 
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className={isOnline ? "text-green-300 font-medium" : "text-white/70"}>
                        {isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" onClick={signOut} className="border-white/30 hover:bg-white/10 text-white">
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nexus-600">
                      <MessageSquare className="h-5 w-5" />
                      <span>{assignedQuestions.length}</span>
                    </CardTitle>
                    <CardDescription>Assigned Questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Questions waiting for your expertise and insight
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nexus-600">
                      <DollarSign className="h-5 w-5" />
                      <span>$0.00</span>
                    </CardTitle>
                    <CardDescription>Pending Earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Answer more questions to increase your earnings
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nexus-600">
                      <ThumbsUp className="h-5 w-5" />
                      <span>New Expert</span>
                    </CardTitle>
                    <CardDescription>Rating</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-1 rounded-full bg-gray-200"></div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Earn ratings by helping students
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Select subjects for tutoring</CardTitle>
                        <CardDescription>
                          The available questions are shown next to each subject
                        </CardDescription>
                      </div>
                      <Badge variant={isOnline ? "default" : "outline"} className={isOnline ? "bg-green-500" : ""}>
                        {isOnline ? "Looking for questions" : "Go online to tutor"}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input type="checkbox" id="all-subjects" className="mr-2" />
                          <label htmlFor="all-subjects" className="font-medium">All subjects</label>
                          <Badge variant="outline" className="ml-2">52</Badge>
                        </div>
                        
                        <div className="space-y-3 ml-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input type="checkbox" id="computer-science" className="mr-2" />
                              <label htmlFor="computer-science">Computer Science</label>
                            </div>
                            <Badge variant="outline">15</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between ml-4">
                            <div className="flex items-center">
                              <input type="checkbox" id="computer-science-other" className="mr-2" />
                              <label htmlFor="computer-science-other">Computer Science - Other</label>
                            </div>
                            <Badge variant="outline">5</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input type="checkbox" id="mathematics" className="mr-2" />
                              <label htmlFor="mathematics">Mathematics</label>
                            </div>
                            <Badge variant="outline">20</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input type="checkbox" id="physics" className="mr-2" />
                              <label htmlFor="physics">Physics</label>
                            </div>
                            <Badge variant="outline">12</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input type="checkbox" id="chemistry" className="mr-2" />
                              <label htmlFor="chemistry">Chemistry</label>
                            </div>
                            <Badge variant="outline">5</Badge>
                          </div>
                        </div>
                        
                        <Button className="mt-4" disabled={!isOnline}>
                          {isOnline ? "Start tutoring" : "Go online to start tutoring"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expert Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Response time</span>
                        <span className="font-medium">-</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Questions answered</span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completion rate</span>
                          <span className="font-medium">-</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <h4 className="font-medium mb-2">Expertise Level</h4>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500 hover:bg-amber-600">Bronze</Badge>
                        <div className="text-xs text-muted-foreground">Answer 10 more questions to level up</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {assignedQuestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent assigned questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignedQuestions.map((assignment) => (
                      <Card key={assignment.id} className="hover:shadow-md transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <Badge variant="outline">{assignment.questions.subject}</Badge>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Assigned {new Date(assignment.assigned_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <h3 className="text-base font-medium mb-1">{assignment.questions.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{assignment.questions.content}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              <span className="text-xs text-muted-foreground">Waiting for your answer</span>
                            </div>
                            <Button 
                              variant="default" 
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
                    <div className="flex justify-center items-center py-12">
                      <Loader className="h-8 w-8 animate-spin text-nexus-600" />
                    </div>
                  ) : assignedQuestions.length > 0 ? (
                    <div className="space-y-4">
                      {assignedQuestions.map((assignment) => (
                        <Card key={assignment.id} className="hover:shadow-md transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex justify-between mb-4">
                              <Badge variant="outline">{assignment.questions.subject}</Badge>
                              <Badge className="bg-nexus-600">Assigned to you</Badge>
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
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center gap-3 mb-6">
                        <div className="bg-nexus-50 p-3 rounded-full">
                          <MessageSquare className="h-8 w-8 text-nexus-600" />
                        </div>
                        <p className="text-lg font-medium">No questions assigned yet</p>
                        <p className="text-muted-foreground max-w-md">
                          Set your status to online and select your subject expertise to start receiving questions
                        </p>
                      </div>
                      <Button
                        onClick={() => setActiveTab("dashboard")}
                        className={!isOnline ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""}
                      >
                        {isOnline ? "Waiting for questions..." : "Go online to start receiving questions"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Available Questions Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Browse Available Questions</CardTitle>
                  <CardDescription>
                    Questions waiting for expert answers in your selected subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className={cn(
                        "hover:shadow-md transition-all duration-300",
                        i === 1 ? "border-nexus-600" : ""
                      )}>
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2 mt-2">
                            <Badge variant="outline">
                              {["Mathematics", "Computer Science", "Physics", "Chemistry"][i-1]}
                            </Badge>
                            {i === 1 && (
                              <Badge className="bg-green-500">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-base font-medium mb-1 line-clamp-1">
                            {[
                              "How to solve quadratic equations?",
                              "Explain binary search algorithm",
                              "Calculate the force required to move a block",
                              "Balance this chemical equation"
                            ][i-1]}
                          </h3>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">${[15, 12, 10, 8][i-1]}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">Browse All Questions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nexus-600">
                      <DollarSign className="h-5 w-5" />
                      <span>$0.00</span>
                    </CardTitle>
                    <CardDescription>Available for Withdrawal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      Withdraw Funds
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nexus-600">
                      <History className="h-5 w-5" />
                      <span>$0.00</span>
                    </CardTitle>
                    <CardDescription>Pending Earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">
                      Earnings are released 7 days after completion
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-nexus-600">
                      <Bookmark className="h-5 w-5" />
                      <span>$0.00</span>
                    </CardTitle>
                    <CardDescription>Total Lifetime Earnings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      $500 to reach next expert level
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                      <div className="h-64 w-full bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-muted-foreground">No earnings data to display yet</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:w-1/3 space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Earning Opportunities</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                            <div className="bg-nexus-100 p-1 rounded">
                              <CheckCircle className="h-4 w-4 text-nexus-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Answer questions</p>
                              <p className="text-xs text-muted-foreground">$10-25 per question</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                            <div className="bg-nexus-100 p-1 rounded">
                              <Users className="h-4 w-4 text-nexus-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Refer experts</p>
                              <p className="text-xs text-muted-foreground">$50 per successful referral</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                            <div className="bg-nexus-100 p-1 rounded">
                              <Award className="h-4 w-4 text-nexus-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Earn bonuses</p>
                              <p className="text-xs text-muted-foreground">Performance bonuses for top experts</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <div className="flex justify-between w-full text-sm">
                    <Button variant="outline" size="sm">
                      Payment Settings
                    </Button>
                    <Button variant="link" size="sm" className="flex items-center">
                      Learn more about earnings
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pending earnings</CardTitle>
                  <CardDescription>You don't have any pending earnings yet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="flex flex-col items-center gap-3 mb-6">
                      <div className="bg-nexus-50 p-3 rounded-full">
                        <DollarSign className="h-8 w-8 text-nexus-600" />
                      </div>
                      <p className="text-lg font-medium">No pending earnings</p>
                      <p className="text-muted-foreground max-w-md mb-4">
                        Start answering questions to earn money. You'll get paid for every accepted answer.
                      </p>
                    </div>
                    <Button onClick={() => setActiveTab("questions")}>
                      Browse Questions
                    </Button>
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
