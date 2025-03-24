
import { Link } from "react-router-dom";

interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  expertCount: number;
}

const subjects: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    description: "Algebra, Calculus, Statistics, Geometry, and more",
    expertCount: 1200
  },
  {
    id: "physics",
    name: "Physics",
    icon: "⚛️",
    description: "Mechanics, Electromagnetism, Thermodynamics, Quantum Physics",
    expertCount: 850
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    description: "Organic, Inorganic, Physical Chemistry, Biochemistry",
    expertCount: 920
  },
  {
    id: "biology",
    name: "Biology",
    icon: "🧬",
    description: "Molecular Biology, Genetics, Ecology, Physiology",
    expertCount: 780
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "💻",
    description: "Programming, Algorithms, Data Structures, AI",
    expertCount: 1050
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "🔧",
    description: "Mechanical, Electrical, Civil, Chemical Engineering",
    expertCount: 950
  },
  {
    id: "economics",
    name: "Economics",
    icon: "📊",
    description: "Microeconomics, Macroeconomics, Econometrics",
    expertCount: 720
  },
  {
    id: "business",
    name: "Business",
    icon: "📈",
    description: "Management, Marketing, Finance, Accounting",
    expertCount: 830
  },
];

export function SubjectsSection() {
  return (
    <section id="subjects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore <span className="text-gradient">Academic Subjects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get expert help with any subject. Our verified experts are ready to solve your questions and provide detailed explanations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <Link 
              key={subject.id}
              to={`/subjects/${subject.id}`}
              className="group glass-card glass-card-hover hover-lift p-6 rounded-xl text-left"
            >
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-nexus-600 dark:group-hover:text-nexus-400 transition-colors">
                {subject.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {subject.description}
              </p>
              <div className="text-xs text-nexus-600 dark:text-nexus-400">
                {subject.expertCount}+ experts available
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/subjects">
            <button className="text-nexus-600 dark:text-nexus-400 hover:text-nexus-700 dark:hover:text-nexus-300 font-medium inline-flex items-center gap-2 transition-colors">
              View all subjects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
