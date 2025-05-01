
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SubjectsSection } from "@/components/SubjectsSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Subjects = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">
            Explore Academic <span className="text-gradient">Subjects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse our comprehensive collection of academic subjects where our expert tutors are ready to help you with your questions and assignments.
          </p>
        </div>
        <SubjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Subjects;
