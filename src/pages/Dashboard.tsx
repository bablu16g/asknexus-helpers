
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Clock, FileText, Image, SendHorizontal, ThumbsUp, Star, Calendar, Bell, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getQuestions, Question } from "@/lib/questions-api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const StudentDashboard = () => {
  const { profile } = useAuth();
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
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-nexus-600/90 to-nexus-700 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile?.first_name || "Student"}!</h1>
              <p className="mt-2 text-white/80">Get instant help with your questions and assignments.</p>
            </div>
            <Button className="bg-white text-nexus-700 hover:bg-white/90 hover:text-nexus-800" asChild>
              <Link to="/ask-question">
                Ask a New Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-nexus-600">
              <FileText className="h-5 w-5" />
              <span>100+ million</span>
            </CardTitle>
            <CardDescription>Expert solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access our vast library of expert-verified solutions to learn faster
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-nexus-600">
              <Clock className="h-5 w-5" />
              <span>24/7 Support</span>
            </CardTitle>
            <CardDescription>Quick solutions anytime</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get answers to your questions within hours, any time of day or night
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-nexus-600">
              <BookOpen className="h-5 w-5" />
              <span>Verified Experts</span>
            </CardTitle>
            <CardDescription>Learn from the best</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our subject matter experts have been rigorously vetted and tested
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Questions</h2>
            <Link to="/ask-question">
              <Button variant="outline">
                Ask a Question
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <Card>
              <CardContent className="p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nexus-600"></div>
              </CardContent>
            </Card>
          ) : questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{question.title}</CardTitle>
                        <Badge variant="outline" className="font-normal">
                          {question.subject}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(question.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-muted-foreground mb-3">{question.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          Math.random() > 0.5 ? "bg-green-500" : "bg-amber-500"
                        )}></div>
                        {Math.random() > 0.5 ? "Expert working on it" : "Waiting for an expert"}
                      </div>
                      {question.image_url && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Image className="h-3 w-3" />
                          <span>Has attachment</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2">
              <CardContent className="text-center py-12">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="bg-nexus-50 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-nexus-600" />
                  </div>
                  <p className="text-lg font-medium">No questions yet</p>
                  <p className="text-muted-foreground max-w-sm">
                    Ask your first question and get help from our verified experts
                  </p>
                </div>
                <Link to="/ask-question">
                  <Button size="lg">Ask Your First Question</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Plan</CardTitle>
              <CardDescription>Your upcoming study tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="font-medium">Weekly goal</div>
                  <div>3/5 hours</div>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <Calendar className="h-4 w-4 text-nexus-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Physics homework</p>
                    <p className="text-sm text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <BookOpen className="h-4 w-4 text-nexus-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Chemistry quiz</p>
                    <p className="text-sm text-muted-foreground">Friday, 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Experts</CardTitle>
              <CardDescription>Highest rated in your subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Dr. Sharma", subject: "Physics", rating: 4.9 },
                  { name: "Prof. Williams", subject: "Mathematics", rating: 4.8 },
                  { name: "Dr. Chen", subject: "Chemistry", rating: 4.7 },
                ].map((expert, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-nexus-100 text-nexus-800">
                        {expert.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{expert.name}</div>
                      <div className="text-sm text-muted-foreground">{expert.subject}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium">{expert.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-3 items-start">
                <Bell className="h-4 w-4 text-nexus-600 mt-0.5" />
                <p>Your question "How to solve quadratic equations" has received an answer.</p>
              </div>
              <div className="flex gap-3 items-start">
                <AlertCircle className="h-4 w-4 text-nexus-600 mt-0.5" />
                <p>Remember to complete your profile to get personalized help.</p>
              </div>
              <div className="flex gap-3 items-start">
                <Bell className="h-4 w-4 text-nexus-600 mt-0.5" />
                <p>New resources available for your Biology course.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { profile, signOut } = useAuth();
  const userType = profile?.user_type || "student";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-7xl mx-auto p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-nexus-100 text-nexus-800">
                  {profile?.first_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  {profile?.first_name || "User"}'s Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>Sign Out</Button>
          </div>
          
          <StudentDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
