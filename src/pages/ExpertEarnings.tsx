
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, TrendingUp, Clock, Award, ChevronRight } from "lucide-react";

const ExpertEarnings = () => {
  const earningFactors = [
    {
      icon: <DollarSign className="h-6 w-6 text-expert-500" />,
      title: "Question Complexity",
      description: "Higher difficulty questions earn more. Our system automatically evaluates question complexity based on subject matter, length, and required expertise."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-expert-500" />,
      title: "Rating & Performance",
      description: "Maintain high ratings to increase your earning potential. Experts with 4.8+ stars earn up to 25% more per question answered."
    },
    {
      icon: <Clock className="h-6 w-6 text-expert-500" />,
      title: "Response Time",
      description: "Faster responses earn bonuses. Premium questions requiring immediate attention have higher rates."
    },
    {
      icon: <Award className="h-6 w-6 text-expert-500" />,
      title: "Expertise Level",
      description: "Specialized knowledge in high-demand subjects earns premium rates. PhD-level experts can earn up to 40% more than bachelor's level experts."
    },
  ];
  
  const faqs = [
    {
      question: "When do I receive payment for my answered questions?",
      answer: "Payments are processed every two weeks. Once you reach the minimum threshold of $50, you'll receive your earnings through your chosen payment method (PayPal, bank transfer, or cryptocurrency)."
    },
    {
      question: "How are question complexity levels determined?",
      answer: "Our AI system evaluates questions based on subject matter, word count, specialized terminology, and required academic level. You can see the complexity rating before accepting a question."
    },
    {
      question: "Can I increase my earnings over time?",
      answer: "Yes! As you build your reputation through high ratings and consistent quality, you'll gain access to higher-paying questions. Experts who maintain a 4.8+ star rating for 3 months enter our Elite Experts program with premium rates."
    },
    {
      question: "What happens if a student disputes my answer?",
      answer: "If a student believes your answer doesn't fully address their question, our review team will evaluate the case. If the review finds your answer incomplete, you'll have a chance to revise it. Payment is only affected if you choose not to provide a complete solution."
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Expert <span className="text-gradient">Earning System</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Learn how our transparent, merit-based compensation system works. AskNexus rewards expertise, quality, and reliability with competitive rates.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {earningFactors.map((factor, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-6">
                <div className="mb-4">
                  {factor.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{factor.title}</h3>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="rates" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="rates">Earning Rates</TabsTrigger>
            <TabsTrigger value="bonuses">Bonuses & Incentives</TabsTrigger>
            <TabsTrigger value="tiers">Expert Tiers</TabsTrigger>
          </TabsList>
          <TabsContent value="rates" className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Base Earning Rates</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-md">
                <div className="font-semibold">Complexity Level</div>
                <div className="font-semibold">Rate Range</div>
                <div className="font-semibold">Average Time</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 border-b">
                <div>Basic (Level 1)</div>
                <div>$5 - $10</div>
                <div>15-20 min</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 border-b">
                <div>Intermediate (Level 2)</div>
                <div>$10 - $20</div>
                <div>20-40 min</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 border-b">
                <div>Advanced (Level 3)</div>
                <div>$20 - $35</div>
                <div>40-60 min</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4">
                <div>Specialized (Level 4)</div>
                <div>$35 - $75+</div>
                <div>60+ min</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="bonuses" className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Bonuses & Incentives</h2>
            <div className="space-y-6">
              <div className="p-4 rounded-md bg-muted/50">
                <h3 className="font-semibold mb-2">Speed Bonuses</h3>
                <p>Earn up to 30% extra for quick, quality responses to urgent questions</p>
              </div>
              <div className="p-4 rounded-md bg-muted/50">
                <h3 className="font-semibold mb-2">Consistency Rewards</h3>
                <p>Earn milestone bonuses for answering 50, 100, 250, and 500 questions</p>
              </div>
              <div className="p-4 rounded-md bg-muted/50">
                <h3 className="font-semibold mb-2">Quality Premiums</h3>
                <p>Maintain a 4.8+ rating for 3 months to qualify for our Elite Experts program with 25% higher base rates</p>
              </div>
              <div className="p-4 rounded-md bg-muted/50">
                <h3 className="font-semibold mb-2">Referral Program</h3>
                <p>Earn $100 for each expert you refer who completes 25 quality answers</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tiers" className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Expert Tiers</h2>
            <div className="space-y-6">
              <div className="p-4 rounded-md bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Standard Expert</h3>
                  <span className="text-sm bg-secondary py-1 px-3 rounded-full">Base Rates</span>
                </div>
                <p className="text-sm mb-2">For newly qualified experts with proven knowledge</p>
                <p className="text-sm text-muted-foreground">Requirements: Passing subject tests with 80%+ score</p>
              </div>
              <div className="p-4 rounded-md bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Advanced Expert</h3>
                  <span className="text-sm bg-nexus-100 text-nexus-700 dark:bg-nexus-900 dark:text-nexus-300 py-1 px-3 rounded-full">+15% Rates</span>
                </div>
                <p className="text-sm mb-2">For consistently reliable experts with excellent ratings</p>
                <p className="text-sm text-muted-foreground">Requirements: 50+ answered questions, 4.5+ average rating, 3 months active</p>
              </div>
              <div className="p-4 rounded-md bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Elite Expert</h3>
                  <span className="text-sm bg-expert-100 text-expert-700 dark:bg-expert-900 dark:text-expert-300 py-1 px-3 rounded-full">+25% Rates</span>
                </div>
                <p className="text-sm mb-2">For top-performing experts with exceptional knowledge</p>
                <p className="text-sm text-muted-foreground">Requirements: 200+ answered questions, 4.8+ average rating, 6 months active</p>
              </div>
              <div className="p-4 rounded-md bg-muted/50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Master Expert</h3>
                  <span className="text-sm bg-student-100 text-student-700 dark:bg-student-900 dark:text-student-300 py-1 px-3 rounded-full">+40% Rates</span>
                </div>
                <p className="text-sm mb-2">For the highest tier of experts with proven excellence</p>
                <p className="text-sm text-muted-foreground">Requirements: 500+ answered questions, 4.9+ average rating, 1+ year active, PhD or equivalent experience</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertEarnings;
