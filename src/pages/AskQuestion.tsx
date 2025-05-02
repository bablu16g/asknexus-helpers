
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuestionForm } from "@/components/QuestionForm";

const AskQuestion = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-3xl mx-auto p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-6">Ask a Question</h1>
          <p className="text-muted-foreground mb-8">
            Provide details about your question. Be specific and include all relevant information to get the best help from our experts.
          </p>
          <QuestionForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AskQuestion;
