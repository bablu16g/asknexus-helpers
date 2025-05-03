
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Clock, FileText, Image, SendHorizontal, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getQuestions, Question } from "@/lib/questions-api";

const StudentDashboard = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchQuestions();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Welcome to AskNexus!</h2>
        <p className="text-muted-foreground mb-4">Expert help combined with AI, available 24/7.</p>
        
        <div className="relative">
          <Input 
            placeholder="What would you like help with today?"
            className="w-full pr-12 h-12 text-base"
          />
          <Button 
            className="absolute right-1 top-1 rounded-full h-10 w-10 p-0" 
            size="icon"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-nexus-600" />
              <span>100+ million</span>
            </CardTitle>
            <CardDescription>Expert solutions</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-nexus-600" />
              <span>Save time</span>
            </CardTitle>
            <CardDescription>Quick solutions for study questions</CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-nexus-600" />
              <span>Subject experts</span>
            </CardTitle>
            <CardDescription>Math, science, programming & more</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recent Questions</h2>
        <Link to="/ask-question">
          <Button>
            Ask a Question
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading questions...</div>
      ) : questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{question.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {new Date(question.created_at).toLocaleDateString()}
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{question.content}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Subject: {question.subject}
                  </div>
                  <div className="flex items-center gap-2">
                    {question.image_url && (
                      <Image className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't asked any questions yet.</p>
            <Link to="/ask-question">
              <Button>Ask Your First Question</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const ExpertDashboard = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="my-work">My Work</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
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
                    <label htmlFor="computer-science-other">Computer Science - Other (10)</label>
                  </div>
                </div>
                
                <Button className="mt-4 w-full sm:w-auto">Start tutoring</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                    <div className="text-3xl font-bold text-nexus-600">$27.50</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Available</div>
                    <div className="text-3xl font-bold">$0.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Helpful rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-nexus-600" />
                  <span className="text-3xl font-bold">66%</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Clarification requests</CardTitle>
              <CardDescription>No pending clarification requests</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-work">
          <Card>
            <CardHeader>
              <CardTitle>Helpful rate by subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>1. Computer Science</div>
                  <div>60%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Be a helpful tutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-nexus-600">
                <div>Tutoring best practices</div>
                <div>Examples of High-quality Solutions</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="earnings">
          <div className="space-y-6">
            <div className="text-3xl font-bold">My Rewards</div>
            
            <Tabs defaultValue="tutor-earnings">
              <TabsList>
                <TabsTrigger value="upload-rewards">Upload-for-Access Rewards</TabsTrigger>
                <TabsTrigger value="other-rewards">Other Rewards</TabsTrigger>
                <TabsTrigger value="tutor-earnings">Tutor Earnings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tutor-earnings" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>What are Tutor Earnings?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Answer students' questions and earn money.</p>
                      <Button>Browse Questions</Button>
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
                          <span>$133.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Available Cash:</span>
                          <span>$0.00</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Pending earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left">
                            <th className="pb-2">ID</th>
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Title</th>
                            <th className="pb-2">Action</th>
                            <th className="pb-2">Earnings</th>
                            <th className="pb-2">Cashed Out</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2">31783822</td>
                            <td>05/15/25</td>
                            <td>Please see attachments for details</td>
                            <td>Question Answer</td>
                            <td>$2.50</td>
                            <td>Unpaid</td>
                          </tr>
                          <tr>
                            <td className="py-2">31783823</td>
                            <td>05/15/25</td>
                            <td>Please see attachments for details</td>
                            <td>Complexity Bonus</td>
                            <td>$2.00</td>
                            <td>Unpaid</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="upload-rewards">
                <Card className="mt-6">
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Upload documents to earn rewards</p>
                    <Button>Upload Documents</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="other-rewards">
                <Card className="mt-6">
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Earn rewards through other activities</p>
                    <Button>Explore Opportunities</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Dashboard = () => {
  const { profile, signOut } = useAuth();
  const userType = profile?.user_type || "student";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-7xl mx-auto p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Welcome, {profile?.first_name || "User"}!
            </h1>
            <Button variant="outline" onClick={signOut}>Sign Out</Button>
          </div>
          
          {userType === "expert" ? <ExpertDashboard /> : <StudentDashboard />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
