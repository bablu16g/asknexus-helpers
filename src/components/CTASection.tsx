
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-nexus-400/10 dark:bg-nexus-900/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-student-400/10 dark:bg-student-900/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="py-16 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ace Your <span className="text-gradient">Academic Journey</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are getting better grades with personalized expert help.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/student/register">
                <Button className="w-full sm:w-auto px-8 py-6 text-base bg-nexus-500 hover:bg-nexus-600 text-white rounded-full">
                  Start as Student
                </Button>
              </Link>
              <Link to="/expert/register">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-base">
                  Apply as Expert
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              No credit card required to sign up. <br className="sm:hidden" />
              Flexible plans to match your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
