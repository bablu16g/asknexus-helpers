
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ExpertFAQ = () => {
  const faqSections = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I become an expert on AskNexus?",
          answer: "To become an expert, you need to create an account, provide your educational and professional credentials, pass a subject expertise test in your field, and complete a brief interview with our team. Once approved, you can start answering questions and earning money."
        },
        {
          question: "What qualifications do I need to become an expert?",
          answer: "We require a minimum of a bachelor's degree in your field of expertise. For some advanced subjects, a master's degree or PhD may be required. Professional experience can sometimes substitute for formal education, depending on the subject area."
        },
        {
          question: "How long does the application process take?",
          answer: "The application process typically takes 3-7 business days. This includes time for credential verification, subject test completion, and the interview process. You'll receive email updates throughout the process."
        },
        {
          question: "Can I be an expert in multiple subjects?",
          answer: "Yes, you can qualify as an expert in multiple subjects by passing the respective subject tests. Many of our experts specialize in several related fields, which increases their earning potential."
        },
      ]
    },
    {
      title: "Answering Questions",
      faqs: [
        {
          question: "How are questions assigned to experts?",
          answer: "Questions are matched to experts based on subject expertise, availability, and previous rating. You'll receive notifications when questions in your field are available, and you can choose which ones to answer based on your schedule and interest."
        },
        {
          question: "What types of questions will I be answering?",
          answer: "You'll answer academic questions related to your field of expertise. These may include concept explanations, problem-solving, essay feedback, and step-by-step solutions. Questions range from high school to graduate level, depending on your expertise."
        },
        {
          question: "Is there a time limit for answering questions?",
          answer: "Yes, each question has a deadline based on the student's needs. You'll see this deadline before accepting a question. Most questions require answers within 1-24 hours, but some urgent questions may need responses in as little as 30 minutes."
        },
        {
          question: "What happens if I can't answer a question I accepted?",
          answer: "If you're unable to complete a question after accepting it, you should release it as soon as possible so another expert can help the student. Frequent releases may affect your expert rating, so only accept questions you're confident you can answer within the deadline."
        },
      ]
    },
    {
      title: "Payment & Earnings",
      faqs: [
        {
          question: "How much can I earn as an AskNexus expert?",
          answer: "Earnings vary based on your expertise, question complexity, and time commitment. Our experts typically earn between $20-50 per hour, with specialized experts earning $75+ per hour. See our Earnings page for detailed information on rates and bonuses."
        },
        {
          question: "How and when do I get paid?",
          answer: "Payments are processed every two weeks. You can choose to receive payment via PayPal, direct bank transfer, or cryptocurrency. The minimum payout threshold is $50."
        },
        {
          question: "Are there any fees for experts?",
          answer: "There are no fees to join or maintain your expert status. AskNexus takes a service fee from each transaction, but the rates shown when you accept questions reflect your actual earnings."
        },
        {
          question: "Can I work as an expert full-time?",
          answer: "Yes, many of our experts work full-time on the platform. The availability of questions depends on your subject areas and student demand. Popular subjects like mathematics, sciences, and programming tend to have consistent question volume."
        },
      ]
    },
    {
      title: "Technical & Platform Questions",
      faqs: [
        {
          question: "What tools are available for answering questions?",
          answer: "Our platform includes a rich text editor, mathematical equation editor, code snippet tool, file upload functionality, and a whiteboard feature for creating diagrams and illustrations. We also support live video sessions for certain question types."
        },
        {
          question: "Can I use external resources when answering questions?",
          answer: "Yes, you can use reference materials and educational resources, but all answers must be your original work. Plagiarism is strictly prohibited and will result in immediate removal from the platform."
        },
        {
          question: "How are expert ratings calculated?",
          answer: "Your rating is based on student feedback, answer quality, response time, and adherence to our community guidelines. Ratings are displayed as a 5-star scale and are updated in real-time."
        },
        {
          question: "What kind of support do experts receive?",
          answer: "Experts have access to a dedicated support team, regular professional development webinars, a private expert community forum, and resources to help improve your answering techniques and increase your earnings."
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">
            Expert <span className="text-gradient">FAQ</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Find answers to common questions about being an expert on AskNexus. Learn about the application process, answering questions, payments, and more.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {faqSections.map((section, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3 px-4"
                asChild
              >
                <a href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  {section.title}
                </a>
              </Button>
            ))}
          </div>

          <div className="space-y-10">
            {faqSections.map((section, index) => (
              <div key={index} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${section.title}-item-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-4">Contact our expert support team for personalized assistance.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button>Contact Support</Button>
            </Link>
            <Link to="/expert/register">
              <Button variant="outline">Become an Expert</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpertFAQ;
