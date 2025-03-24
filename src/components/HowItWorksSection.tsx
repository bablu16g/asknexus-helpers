
import { CheckCircle, Upload, UserCheck, PenSquare } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const studentSteps: Step[] = [
  {
    icon: <Upload className="w-10 h-10 text-student-500" />,
    title: "Upload Your Question",
    description: "Take a photo of your homework question or type it directly. Add any necessary context or requirements."
  },
  {
    icon: <UserCheck className="w-10 h-10 text-student-500" />,
    title: "Get Matched with Experts",
    description: "Our system automatically matches your question with qualified experts in the specific subject area."
  },
  {
    icon: <PenSquare className="w-10 h-10 text-student-500" />,
    title: "Receive Detailed Solution",
    description: "Experts provide step-by-step explanations to help you understand the concepts, not just the answer."
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-student-500" />,
    title: "Review and Learn",
    description: "Study the solution, ask follow-up questions if needed, and rate your experience with the expert."
  }
];

const expertSteps: Step[] = [
  {
    icon: <UserCheck className="w-10 h-10 text-expert-500" />,
    title: "Pass Subject Tests",
    description: "Demonstrate your expertise by passing our rigorous subject-specific qualification tests."
  },
  {
    icon: <Upload className="w-10 h-10 text-expert-500" />,
    title: "Browse Available Questions",
    description: "Select questions in your area of expertise that match your schedule and knowledge."
  },
  {
    icon: <PenSquare className="w-10 h-10 text-expert-500" />,
    title: "Provide Detailed Solutions",
    description: "Create comprehensive, step-by-step explanations that teach students the concepts."
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-expert-500" />,
    title: "Get Paid and Build Reputation",
    description: "Earn money for each solved question and build your expert profile with positive reviews."
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">AskNexus</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple process designed to connect students with subject matter experts
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Students */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-student-100 text-student-700 dark:bg-student-900/30 dark:text-student-300 mb-4">
                For Students
              </span>
              <h3 className="text-2xl font-bold text-gradient-student">
                Get Help With Your Questions
              </h3>
            </div>
            
            <div className="space-y-8">
              {studentSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* For Experts */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-expert-100 text-expert-700 dark:bg-expert-900/30 dark:text-expert-300 mb-4">
                For Experts
              </span>
              <h3 className="text-2xl font-bold text-gradient-expert">
                Share Your Knowledge & Earn
              </h3>
            </div>
            
            <div className="space-y-8">
              {expertSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
