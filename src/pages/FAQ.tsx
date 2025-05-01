
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqData = {
    general: [
      {
        question: "What is AskNexus?",
        answer: "AskNexus is an online platform that connects students with expert tutors for academic help. Students can ask questions and receive personalized answers from verified experts in various subjects."
      },
      {
        question: "How does AskNexus work?",
        answer: "Students submit questions through our platform, specifying their subject and academic level. Our system matches the question with qualified experts, who then provide detailed explanations and solutions. Students can interact with experts for follow-up questions and clarification."
      },
      {
        question: "Is AskNexus available 24/7?",
        answer: "Yes, AskNexus is available 24/7, with experts across different time zones ready to help. While response times may vary based on question complexity and expert availability, our platform operates around the clock."
      },
      {
        question: "Which subjects does AskNexus cover?",
        answer: "AskNexus covers a wide range of subjects including Mathematics, Physics, Chemistry, Biology, Computer Science, Engineering, Economics, Business, English, History, and many more. Check our Subjects page for a complete list."
      },
      {
        question: "Who are the experts on AskNexus?",
        answer: "Our experts are qualified academics, teachers, and professionals with at least a bachelor's degree in their field. Many hold master's degrees and PhDs. All experts undergo a rigorous verification process, including credential checks and subject knowledge tests."
      }
    ],
    students: [
      {
        question: "How do I ask my first question?",
        answer: "To ask your first question, create an account, purchase credits or a subscription, then click on 'Ask a Question'. Enter your question details, attach any relevant files, specify your deadline, and submit. You'll be notified when an expert answers your question."
      },
      {
        question: "How much does AskNexus cost?",
        answer: "AskNexus offers several pricing options, including pay-per-question credits and monthly subscriptions. Prices vary based on question complexity and response time needed. Basic questions start at $5, while complex questions with quick turnaround may cost more. Check our Pricing page for current rates and subscription options."
      },
      {
        question: "How long will it take to get an answer?",
        answer: "Response times depend on question complexity and your selected priority level. Standard questions typically receive answers within 1-24 hours. Express priority questions are answered within 1-3 hours, and immediate priority questions usually receive responses within 30 minutes."
      },
      {
        question: "Can I request a specific expert for my question?",
        answer: "Yes, if you've worked with an expert before and were satisfied with their help, you can request them specifically for future questions. This feature is available to all users, though the expert's availability may affect response time."
      },
      {
        question: "What if I'm not satisfied with an answer?",
        answer: "If you're not satisfied with an answer, you can request clarification or additional information from the expert at no extra cost. If the answer still doesn't meet your needs, you can contact our support team for resolution, which may include a partial or full refund or having another expert address your question."
      }
    ],
    payments: [
      {
        question: "What payment methods are accepted?",
        answer: "AskNexus accepts credit/debit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and select cryptocurrencies. All payment processing is secure and complies with PCI DSS standards."
      },
      {
        question: "Are there any hidden fees?",
        answer: "No, AskNexus has no hidden fees. The price you see before submitting your question is the final price you'll pay. Any applicable taxes will be displayed during checkout."
      },
      {
        question: "Do unused credits expire?",
        answer: "Credits purchased individually remain valid for 12 months from the date of purchase. Credits included in subscription plans expire at the end of the billing cycle if unused."
      },
      {
        question: "How do refunds work?",
        answer: "If you're unsatisfied with an answer, we first encourage you to request clarification from the expert. If the issue persists, contact our support team within 7 days of receiving the answer. Refunds are processed on a case-by-case basis and typically completed within 5-7 business days."
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Yes, you can cancel your subscription at any time from your account settings. When you cancel, your subscription will remain active until the end of the current billing period, after which it won't renew. No partial refunds are provided for unused subscription time."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "To create an account, click the 'Sign Up' button, enter your email address, create a password, and complete your profile information. You can sign up using your email or through Google, Apple, or Facebook authentication."
      },
      {
        question: "Can I change my email address or password?",
        answer: "Yes, you can change your email address and password in your account settings. For email changes, a verification link will be sent to your new email address to confirm the change."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, go to your account settings, select 'Privacy', and choose 'Delete Account'. Follow the prompts to confirm deletion. This action is permanent and will remove all your data from our systems after a 30-day grace period."
      },
      {
        question: "Is my personal information safe?",
        answer: "Yes, AskNexus takes data security and privacy seriously. We use industry-standard encryption and security practices to protect your personal information. We never share your personal data with third parties without your consent. For more details, please review our Privacy Policy."
      },
      {
        question: "Can I use AskNexus on my mobile device?",
        answer: "Yes, AskNexus is fully responsive and works on smartphones and tablets. You can ask questions and receive answers on any device with a web browser. We also have iOS and Android mobile apps available for download."
      }
    ]
  };

  // Filter FAQs based on search query
  const filterFAQs = (faqs) => {
    if (!searchQuery) return faqs;
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Check if any results match the search query
  const hasResults = searchQuery ? 
    Object.values(faqData).some(section => 
      filterFAQs(section).length > 0
    ) : true;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Find answers to common questions about AskNexus. If you can't find what you're looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search for answers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {!hasResults && (
          <div className="text-center py-10">
            <p className="text-lg mb-4">No results found for "{searchQuery}"</p>
            <p className="text-muted-foreground mb-6">Try different keywords or browse the categories below</p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        )}

        {hasResults && (
          <Tabs defaultValue="general" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="account">Account & Privacy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(faqData.general).map((faq, index) => (
                  <AccordionItem key={index} value={`general-item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="students">
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(faqData.students).map((faq, index) => (
                  <AccordionItem key={index} value={`students-item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="payments">
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(faqData.payments).map((faq, index) => (
                  <AccordionItem key={index} value={`payments-item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="account">
              <Accordion type="single" collapsible className="w-full">
                {filterFAQs(faqData.account).map((faq, index) => (
                  <AccordionItem key={index} value={`account-item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        )}

        <div className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-4">Our support team is ready to help with any questions you may have.</p>
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
