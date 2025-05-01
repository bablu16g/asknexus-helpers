
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ExpertTest = () => {
  const tests = [
    {
      subject: "Mathematics",
      description: "Test your knowledge in calculus, algebra, geometry, and statistics",
      questions: 25,
      timeLimit: "45 minutes",
      status: "Available"
    },
    {
      subject: "Physics",
      description: "Cover mechanics, thermodynamics, electromagnetism, and modern physics",
      questions: 30,
      timeLimit: "60 minutes",
      status: "Available"
    },
    {
      subject: "Chemistry",
      description: "Test organic, inorganic, and physical chemistry concepts",
      questions: 30,
      timeLimit: "50 minutes",
      status: "Available"
    },
    {
      subject: "Biology",
      description: "Cover molecular biology, genetics, ecology, and physiology",
      questions: 35,
      timeLimit: "55 minutes",
      status: "Available"
    },
    {
      subject: "Computer Science",
      description: "Test programming, algorithms, data structures, and computer architecture",
      questions: 25,
      timeLimit: "45 minutes",
      status: "Coming Soon"
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Expert <span className="text-gradient">Subject Tests</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Complete these comprehensive subject tests to qualify as an expert on AskNexus. Our rigorous testing ensures that we maintain the highest quality of expertise on our platform.
          </p>
        </div>

        <div className="mb-12 p-6 border border-nexus-200 dark:border-nexus-800 rounded-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">Test Guidelines</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-nexus-600 mt-1 flex-shrink-0" />
              <p>You must score at least 80% to qualify as an expert in a subject area</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-nexus-600 mt-1 flex-shrink-0" />
              <p>Tests have time limits - manage your time wisely</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-nexus-600 mt-1 flex-shrink-0" />
              <p>You can retake tests after 7 days if you don't pass</p>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-nexus-600 mt-1 flex-shrink-0" />
              <p>Our system will verify your credentials before you can take tests</p>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Available Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tests.map((test) => (
            <Card key={test.subject} className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{test.subject}</CardTitle>
                  <Badge variant={test.status === "Available" ? "default" : "outline"}>
                    {test.status}
                  </Badge>
                </div>
                <CardDescription className="mt-2">{test.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{test.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{test.timeLimit}</span>
                    </div>
                  </div>
                  <Button variant="default" className="w-full" disabled={test.status !== "Available"}>
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertTest;
