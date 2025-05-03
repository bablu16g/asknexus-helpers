
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Layout, BookOpen, DollarSign, History, User, Settings, MessageSquare, Search, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExpertWork = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <SidebarProvider defaultOpen={true} className="pt-24">
        <Sidebar>
          <SidebarHeader className="px-6 py-4">
            <div className="flex items-center gap-3">
              <User className="h-10 w-10 rounded-full bg-nexus-100 p-2 text-nexus-600" />
              <div>
                <div className="font-semibold">{profile?.first_name} {profile?.last_name}</div>
                <div className="text-xs text-muted-foreground">Expert</div>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={true}>
                    <a href="/dashboard">
                      <Layout className="h-5 w-5" />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/expert/work">
                      <MessageSquare className="h-5 w-5" />
                      <span>Questions</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/expert/earnings">
                      <DollarSign className="h-5 w-5" />
                      <span>Earnings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/expert/history">
                      <History className="h-5 w-5" />
                      <span>History</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Expertise</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/subjects/mathematics">
                      <BookOpen className="h-5 w-5" />
                      <span>Mathematics</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/subjects/computer-science">
                      <BookOpen className="h-5 w-5" />
                      <span>Computer Science</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/subjects/physics">
                      <BookOpen className="h-5 w-5" />
                      <span>Physics</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/profile">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 p-6 pt-24">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Expert Workspace</h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search questions..."
                    className="pl-10 pr-4 py-2 rounded-md border border-input bg-background"
                  />
                </div>
                <Button>
                  Browse Questions
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="questions">Available Questions</TabsTrigger>
                <TabsTrigger value="active">Active Questions</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="questions">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select subjects for tutoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input type="checkbox" id="all-subjects-work" className="mr-2" />
                          <label htmlFor="all-subjects-work">All subjects</label>
                        </div>
                        
                        <div className="space-y-2 ml-4">
                          <div className="flex items-center">
                            <input type="checkbox" id="computer-science-work" className="mr-2" checked />
                            <label htmlFor="computer-science-work">Computer Science</label>
                          </div>
                          
                          <div className="flex items-center ml-4">
                            <input type="checkbox" id="computer-science-other-work" className="mr-2" checked />
                            <label htmlFor="computer-science-other-work">Computer Science - Other (10)</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input type="checkbox" id="mathematics-work" className="mr-2" />
                            <label htmlFor="mathematics-work">Mathematics</label>
                          </div>
                          
                          <div className="flex items-center">
                            <input type="checkbox" id="physics-work" className="mr-2" />
                            <label htmlFor="physics-work">Physics</label>
                          </div>
                        </div>
                        
                        <Button className="mt-4">Start tutoring</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <h2 className="text-xl font-semibold">Available Questions (10)</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm text-muted-foreground">Computer Science</span>
                            <span className="text-sm font-medium text-nexus-600">$5.00</span>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2">
                            How to implement a binary search tree in Java?
                          </h3>
                          
                          <p className="text-muted-foreground mb-4">
                            I'm having trouble implementing a binary search tree with insertion and deletion operations in Java...
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Posted 20 minutes ago</span>
                            </div>
                            <Button variant="outline">Answer Question</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="active">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Active Questions (2)</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2].map((i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between mb-4">
                            <span className="text-sm text-muted-foreground">Computer Science</span>
                            <span className="text-sm font-medium text-nexus-600">In Progress</span>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2">
                            Solving recursive algorithm time complexity
                          </h3>
                          
                          <p className="text-muted-foreground mb-4">
                            I need help determining the time complexity of this recursive algorithm...
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Due in 4 hours</span>
                            </div>
                            <Button>Continue Working</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Question History</h2>
                  
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="p-4 text-left">Date</th>
                              <th className="p-4 text-left">Question</th>
                              <th className="p-4 text-left">Subject</th>
                              <th className="p-4 text-left">Status</th>
                              <th className="p-4 text-left">Rating</th>
                              <th className="p-4 text-left">Earnings</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                date: "05/15/25",
                                question: "Please see attachments for details",
                                subject: "Computer Science",
                                status: "Completed",
                                rating: "No rating",
                                earnings: "$4.50"
                              },
                              {
                                date: "05/14/25",
                                question: "4.7 Problems in this exercise",
                                subject: "Computer Science",
                                status: "Completed",
                                rating: "No rating",
                                earnings: "$2.00"
                              },
                              {
                                date: "05/12/25",
                                question: "Binary Search Tree Implementation",
                                subject: "Computer Science",
                                status: "Completed",
                                rating: "★★★★☆",
                                earnings: "$2.50"
                              },
                            ].map((item, i) => (
                              <tr key={i} className="border-t">
                                <td className="p-4">{item.date}</td>
                                <td className="p-4">{item.question}</td>
                                <td className="p-4">{item.subject}</td>
                                <td className="p-4">{item.status}</td>
                                <td className="p-4">{item.rating}</td>
                                <td className="p-4">{item.earnings}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </SidebarProvider>
      
      <Footer />
    </div>
  );
};

export default ExpertWork;
