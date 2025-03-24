
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-nexus-400/20 dark:bg-nexus-900/20 rounded-full filter blur-3xl opacity-70 animate-pulse-soft"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-expert-400/10 dark:bg-expert-900/10 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-nexus-700 dark:text-nexus-300 bg-nexus-100 dark:bg-nexus-900/40 border border-nexus-200 dark:border-nexus-700/50 mb-4">
              Get Better Grades with Expert Help
            </span>
          </div>
          
          <h1 className="animate-fade-in opacity-0 text-4xl md:text-6xl font-bold tracking-tight mb-6" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <span className="block">Stuck on a Problem?</span>
            <span className="block text-gradient">Get Expert Solutions <span className="hidden sm:inline">in Minutes</span></span>
          </h1>
          
          <p className="animate-fade-in opacity-0 text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            Upload your academic questions and get detailed step-by-step solutions from verified subject experts. Improve your grades with personalized help.
          </p>
          
          <div className="animate-fade-in opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <Link to="/student/register">
              <Button className="w-full sm:w-auto px-8 py-6 text-base bg-nexus-500 hover:bg-nexus-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                Get Started as Student
              </Button>
            </Link>
            <Link to="/expert/register">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-base border-expert-500/50 text-expert-700 dark:text-expert-300 hover:border-expert-500 hover:bg-expert-50 dark:hover:bg-expert-900/20 rounded-full shadow-md hover:shadow-lg transition-all">
                Apply as Expert
              </Button>
            </Link>
          </div>
          
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <a href="#how-it-works" className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span>Learn more about how it works</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
        
        <div className="animate-fade-in opacity-0 mt-16 max-w-5xl mx-auto glass-card rounded-2xl p-6 shadow-xl" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-gradient mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Academic Subjects</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-gradient mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Verified Experts</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-gradient mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Questions Solved</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-gradient mb-2">97%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
