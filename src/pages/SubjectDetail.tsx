
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

// Define the Subject type
interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  expertCount: number;
  longDescription?: string;
  topics?: string[];
  expertNames?: string[];
  sampleQuestions?: string[];
}

// Sample subjects data
const subjectsData: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    description: "Algebra, Calculus, Statistics, Geometry, and more",
    expertCount: 1200,
    longDescription: "Mathematics is the study of numbers, shapes, and patterns. It is essential in everyday life and is used in science, engineering, medicine, and almost every field imaginable. Our mathematics experts can help you with everything from basic arithmetic to advanced calculus and beyond.",
    topics: ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry", "Number Theory", "Discrete Mathematics", "Linear Algebra"],
    expertNames: ["Dr. Himanshu Sangwan", "Prof. Anil Kumar", "Dr. Jessica Chen", "Prof. Michael Taylor", "Dr. Sarah Johnson"],
    sampleQuestions: [
      "How do I find the derivative of a logarithmic function?",
      "Can you help me solve this system of linear equations?",
      "How do I apply the Pythagorean theorem to this problem?",
      "What statistical test should I use for my research data?"
    ]
  },
  {
    id: "physics",
    name: "Physics",
    icon: "⚛️",
    description: "Mechanics, Electromagnetism, Thermodynamics, Quantum Physics",
    expertCount: 850,
    longDescription: "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force. Our physics experts can help you understand complex concepts and solve challenging problems across all areas of physics.",
    topics: ["Classical Mechanics", "Electromagnetism", "Thermodynamics", "Quantum Physics", "Relativity", "Nuclear Physics", "Optics", "Fluid Dynamics"],
    expertNames: ["Dr. Deepender Sharma", "Prof. Lisa Wong", "Dr. Robert Miller", "Prof. Elena Rodriguez", "Dr. James Wilson"],
    sampleQuestions: [
      "How do I calculate the momentum of an object in circular motion?",
      "Can you explain how electromagnetic induction works?",
      "What is the relationship between pressure and volume in an ideal gas?",
      "How does quantum tunneling work?"
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    description: "Organic, Inorganic, Physical Chemistry, Biochemistry",
    expertCount: 920,
    longDescription: "Chemistry is the scientific study of the properties and behavior of matter. It involves elements, compounds, atoms, molecules, and reactions between substances. Our chemistry experts can help you with understanding chemical principles, solving problems, and mastering chemical equations and reactions.",
    topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry", "Analytical Chemistry", "Polymer Chemistry", "Environmental Chemistry"],
    expertNames: ["Dr. Priya Patel", "Prof. David Lee", "Dr. Maria Gonzalez", "Prof. John Smith", "Dr. Anna Williams"],
    sampleQuestions: [
      "How do I balance this redox reaction?",
      "Can you explain the mechanism for this organic reaction?",
      "What factors affect the rate of a chemical reaction?",
      "How do I calculate the pH of this buffer solution?"
    ]
  },
  {
    id: "biology",
    name: "Biology",
    icon: "🧬",
    description: "Molecular Biology, Genetics, Ecology, Physiology",
    expertCount: 780,
    longDescription: "Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development, and evolution. Our biology experts can help you understand complex biological concepts and processes.",
    topics: ["Molecular Biology", "Genetics", "Ecology", "Physiology", "Evolutionary Biology", "Cell Biology", "Microbiology", "Botany", "Zoology"],
    expertNames: ["Dr. Susan Chen", "Prof. Michael Brown", "Dr. Laura Martinez", "Prof. Thomas Johnson", "Dr. Emily Wilson"],
    sampleQuestions: [
      "How does DNA replication work?",
      "Can you explain the process of photosynthesis?",
      "What are the main components of the immune system?",
      "How do neurons transmit signals in the nervous system?"
    ]
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "💻",
    description: "Programming, Algorithms, Data Structures, AI",
    expertCount: 1050,
    longDescription: "Computer Science is the study of computers and computational systems, including their theory, design, development, and application. Our computer science experts can help you with programming languages, algorithms, data structures, artificial intelligence, and more.",
    topics: ["Programming", "Algorithms", "Data Structures", "Artificial Intelligence", "Machine Learning", "Database Systems", "Computer Networks", "Operating Systems", "Software Engineering"],
    expertNames: ["Dr. Aman Kumar", "Prof. Rebecca Lee", "Dr. Jason Wang", "Prof. Sophia Rodriguez", "Dr. Daniel Kim"],
    sampleQuestions: [
      "How do I implement a binary search tree in Java?",
      "Can you help me debug this Python code?",
      "What's the time complexity of this algorithm?",
      "How do neural networks learn patterns in data?"
    ]
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "🔧",
    description: "Mechanical, Electrical, Civil, Chemical Engineering",
    expertCount: 950,
    longDescription: "Engineering is the use of scientific principles to design and build machines, structures, and other items. Our engineering experts can help you with various disciplines including mechanical, electrical, civil, and chemical engineering problems and concepts.",
    topics: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Chemical Engineering", "Aerospace Engineering", "Biomedical Engineering", "Industrial Engineering"],
    expertNames: ["Dr. Richard Lee", "Prof. Anita Patel", "Dr. Carlos Martinez", "Prof. Jennifer Wilson", "Dr. Mark Johnson"],
    sampleQuestions: [
      "How do I calculate the stress in this beam?",
      "Can you help me design this electrical circuit?",
      "What considerations are important in this fluid dynamics problem?",
      "How do I optimize this chemical process?"
    ]
  },
  {
    id: "economics",
    name: "Economics",
    icon: "📊",
    description: "Microeconomics, Macroeconomics, Econometrics",
    expertCount: 720,
    longDescription: "Economics is the social science that studies how goods and services are produced, distributed, and consumed. Our economics experts can help you understand economic theories, analyze data, interpret economic trends, and solve complex economic problems.",
    topics: ["Microeconomics", "Macroeconomics", "Econometrics", "International Economics", "Development Economics", "Labor Economics", "Financial Economics"],
    expertNames: ["Dr. Robert Chen", "Prof. Alicia Rodriguez", "Dr. Michael Singh", "Prof. Sarah Thompson", "Dr. David Wilson"],
    sampleQuestions: [
      "How does elasticity affect pricing decisions?",
      "Can you explain the effects of fiscal policy on aggregate demand?",
      "How do I interpret this regression analysis?",
      "What factors influence exchange rates?"
    ]
  },
  {
    id: "business",
    name: "Business",
    icon: "📈",
    description: "Management, Marketing, Finance, Accounting",
    expertCount: 830,
    longDescription: "Business studies encompass management, marketing, finance, accounting, and other aspects of organization operations. Our business experts can help you with case studies, financial analysis, marketing strategies, accounting principles, and more.",
    topics: ["Management", "Marketing", "Finance", "Accounting", "Business Strategy", "Entrepreneurship", "Human Resources", "Operations Management"],
    expertNames: ["Dr. Lisa Johnson", "Prof. James Wang", "Dr. Maria Lopez", "Prof. Robert Kim", "Dr. Amanda Wilson"],
    sampleQuestions: [
      "How do I conduct a SWOT analysis for this company?",
      "Can you help me calculate these financial ratios?",
      "What marketing strategy would be best for this product?",
      "How do I account for this business transaction?"
    ]
  }
];

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    // Find the subject based on the URL parameter
    const foundSubject = subjectsData.find(s => s.id === subjectId);
    setSubject(foundSubject || null);
  }, [subjectId]);

  if (!subject) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-20 pt-36">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Subject Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the subject you're looking for.</p>
            <Link to="/subjects">
              <Button>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Subjects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="mb-8">
          <Link to="/subjects" className="inline-flex items-center text-nexus-600 dark:text-nexus-400 hover:text-nexus-700 dark:hover:text-nexus-300 mb-6">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to All Subjects
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{subject.icon}</div>
            <h1 className="text-4xl font-bold">{subject.name}</h1>
          </div>
          
          <div className="text-sm text-nexus-600 dark:text-nexus-400 mb-6">
            {subject.expertCount}+ experts available
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card p-8 rounded-xl mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground mb-6">{subject.longDescription}</p>
              
              <h3 className="text-xl font-semibold mb-3">Topics Covered</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {subject.topics?.map((topic, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-nexus-100 text-nexus-700 dark:bg-nexus-900/30 dark:text-nexus-300 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">Sample Questions</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                {subject.sampleQuestions?.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link to="/student/register">
                  <Button className="rounded-full bg-nexus-500 hover:bg-nexus-600 text-white transition-colors duration-300">
                    Ask Your Question Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-4">Top Experts in {subject.name}</h3>
              <div className="space-y-4">
                {subject.expertNames?.map((expert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-expert-100 dark:bg-expert-800 flex items-center justify-center text-expert-600 dark:text-expert-300 font-medium">
                      {expert.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{expert}</p>
                      <div className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs ml-1 text-muted-foreground">4.9/5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Link to="/expert/register" className="text-nexus-600 dark:text-nexus-400 hover:text-nexus-700 dark:hover:text-nexus-300 text-sm font-medium flex items-center">
                  Become an expert in {subject.name}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Need Help Fast?</h3>
              <p className="text-muted-foreground mb-4">
                Get instant help with your {subject.name} questions from our verified experts.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 text-nexus-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">Step-by-step explanations</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-nexus-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">24/7 expert availability</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 text-nexus-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">Satisfaction guaranteed</span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/student/register" className="w-full">
                  <Button className="w-full rounded-full bg-nexus-500 hover:bg-nexus-600 text-white transition-colors duration-300">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectDetail;
