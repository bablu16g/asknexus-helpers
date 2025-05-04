
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

interface SubjectTestProps {
  subject: string;
  onComplete: (score: number) => void;
}

// Generate questions based on subject
const getQuestionsForSubject = (subject: string): Question[] => {
  // In a real app, these would come from a database based on the subject
  // This is a simplified example with hardcoded questions
  switch (subject) {
    case "math":
      return [
        {
          id: 1,
          text: "What is the derivative of f(x) = x^2?",
          options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x^2"],
          correctAnswerIndex: 1,
        },
        {
          id: 2,
          text: "Solve the equation: 2x + 5 = 15",
          options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
          correctAnswerIndex: 0,
        },
        {
          id: 3,
          text: "What is the value of π (pi) to 2 decimal places?",
          options: ["3.14", "3.41", "3.12", "3.16"],
          correctAnswerIndex: 0,
        },
        {
          id: 4,
          text: "What is the formula for the area of a circle?",
          options: ["A = πr", "A = 2πr", "A = πr²", "A = πd"],
          correctAnswerIndex: 2,
        },
        {
          id: 5,
          text: "If f(x) = 3x - 2 and g(x) = x² + 1, what is (f ∘ g)(2)?",
          options: ["13", "15", "17", "19"],
          correctAnswerIndex: 1,
        },
        {
          id: 6,
          text: "What is the solution to the inequality 3x - 7 < 5?",
          options: ["x < 4", "x > 4", "x < 12/3", "x < 4/3"],
          correctAnswerIndex: 2,
        },
        {
          id: 7,
          text: "What is lim(x→0) sin(x)/x?",
          options: ["0", "1", "∞", "Does not exist"],
          correctAnswerIndex: 1,
        },
        {
          id: 8,
          text: "Solve for x: log₂(8x) = 5",
          options: ["x = 1", "x = 2", "x = 4", "x = 16"],
          correctAnswerIndex: 1,
        },
        {
          id: 9,
          text: "What is the sum of the series 1 + 1/4 + 1/9 + ... + 1/n² as n approaches infinity?",
          options: ["π/6", "π²/6", "π²/3", "π/3"],
          correctAnswerIndex: 1,
        },
        {
          id: 10,
          text: "If the points A(1,3), B(5,3), and C(5,7) form a triangle, what is its area?",
          options: ["8 square units", "12 square units", "16 square units", "24 square units"],
          correctAnswerIndex: 0,
        },
      ];
    case "physics":
      return [
        {
          id: 1,
          text: "What is Newton's Second Law of Motion?",
          options: [
            "For every action, there is an equal and opposite reaction",
            "Objects at rest stay at rest unless acted upon by a force",
            "Force equals mass times acceleration",
            "Energy cannot be created or destroyed"
          ],
          correctAnswerIndex: 2,
        },
        {
          id: 2,
          text: "What is the SI unit of electric current?",
          options: ["Volt", "Watt", "Ampere", "Ohm"],
          correctAnswerIndex: 2,
        },
        // Add 8 more physics questions
        {
          id: 3,
          text: "What is the speed of light in a vacuum?",
          options: ["300,000 km/s", "186,000 miles/s", "3 × 10⁸ m/s", "All of the above"],
          correctAnswerIndex: 3,
        },
        {
          id: 4,
          text: "Which of these is NOT a fundamental force in physics?",
          options: ["Gravity", "Strong nuclear force", "Electromagnetism", "Thermal force"],
          correctAnswerIndex: 3,
        },
        {
          id: 5,
          text: "What is the formula for kinetic energy?",
          options: ["E = mc²", "K = ½mv²", "F = ma", "P = mv"],
          correctAnswerIndex: 1,
        },
        {
          id: 6,
          text: "What is the Heisenberg Uncertainty Principle about?",
          options: [
            "The impossibility of predicting weather accurately",
            "The impossibility of precisely measuring both position and momentum",
            "The uncertainty in measuring temperature",
            "The uncertainty in gravitational measurements"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 7,
          text: "What phenomenon explains how airplanes can fly?",
          options: ["Newton's third law", "Bernoulli's principle", "Pascal's law", "Archimedes' principle"],
          correctAnswerIndex: 1,
        },
        {
          id: 8,
          text: "What is the law of conservation of energy?",
          options: [
            "Energy cannot be created or destroyed, only transferred",
            "All energy eventually dissipates as heat",
            "Energy can only be transferred in discrete quantities",
            "The total energy of an object equals its mass times acceleration"
          ],
          correctAnswerIndex: 0,
        },
        {
          id: 9,
          text: "Which particle has no electric charge?",
          options: ["Proton", "Electron", "Neutron", "Positron"],
          correctAnswerIndex: 2,
        },
        {
          id: 10,
          text: "What is the relationship between voltage (V), current (I), and resistance (R)?",
          options: ["V = I × R", "V = I/R", "V = I + R", "V = I - R"],
          correctAnswerIndex: 0,
        },
      ];
    case "computer_science":
      return [
        {
          id: 1,
          text: "Which data structure uses LIFO (Last In First Out)?",
          options: ["Queue", "Stack", "Linked List", "Binary Tree"],
          correctAnswerIndex: 1,
        },
        {
          id: 2,
          text: "What is the time complexity of a binary search algorithm?",
          options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
          correctAnswerIndex: 2,
        },
        {
          id: 3,
          text: "Which of these is NOT a programming paradigm?",
          options: ["Object-oriented", "Functional", "Procedural", "Sequential"],
          correctAnswerIndex: 3,
        },
        {
          id: 4,
          text: "What does SQL stand for?",
          options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Standard Query Logic"],
          correctAnswerIndex: 0,
        },
        {
          id: 5,
          text: "Which of these is a valid JavaScript data type?",
          options: ["integer", "character", "float", "undefined"],
          correctAnswerIndex: 3,
        },
        {
          id: 6,
          text: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Central Processor Utility"],
          correctAnswerIndex: 0,
        },
        {
          id: 7,
          text: "Which sorting algorithm has the worst case time complexity of O(n log n)?",
          options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Merge Sort"],
          correctAnswerIndex: 3,
        },
        {
          id: 8,
          text: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Hyper Text Machine Language"],
          correctAnswerIndex: 0,
        },
        {
          id: 9,
          text: "In object-oriented programming, what is encapsulation?",
          options: [
            "The process of creating objects from classes",
            "The bundling of data and the methods that act on that data",
            "The ability of a class to inherit from another class",
            "The ability to have multiple methods with the same name"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 10,
          text: "Which protocol is used for secure communication over a computer network?",
          options: ["HTTP", "HTTPS", "FTP", "SMTP"],
          correctAnswerIndex: 1,
        },
      ];
    // Add more subjects here
    default:
      // Generic questions for any subject
      return [
        {
          id: 1,
          text: "What is the primary responsibility of a tutor in this subject area?",
          options: [
            "To simply give answers to questions",
            "To explain concepts thoroughly and guide the student's learning",
            "To provide entertainment during sessions",
            "To do the work for the student"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 2,
          text: "What's the best approach when a student doesn't understand a concept?",
          options: [
            "Move to another topic",
            "Repeat the exact same explanation",
            "Try explaining in different ways and use different examples",
            "Tell them to read the textbook"
          ],
          correctAnswerIndex: 2,
        },
        {
          id: 3,
          text: "How should you respond to a student who provides an incorrect answer?",
          options: [
            "Point out they're wrong immediately",
            "Ignore their mistake to avoid embarrassment",
            "Gently guide them to the correct answer through questions",
            "Give them the answer without explanation"
          ],
          correctAnswerIndex: 2,
        },
        {
          id: 4,
          text: "What's the most important quality of an effective online tutor?",
          options: [
            "Being a world-renowned expert in the field",
            "Having patience and clear communication skills",
            "Having many years of teaching experience",
            "Having advanced degrees in the subject"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 5,
          text: "When should you use technical jargon when tutoring?",
          options: [
            "Always - it shows expertise",
            "Never - it's always confusing",
            "Only after defining terms and when appropriate to the student's level",
            "Only with advanced students"
          ],
          correctAnswerIndex: 2,
        },
        {
          id: 6,
          text: "What should you do if you don't know the answer to a student's question?",
          options: [
            "Make up an answer to maintain authority",
            "Admit you don't know and offer to research it together",
            "Change the subject quickly",
            "End the session early"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 7,
          text: "What's the best way to check if a student understands a concept?",
          options: [
            "Ask if they understand",
            "Ask them to explain it back in their own words",
            "Give them a written test",
            "Move on to the next topic immediately"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 8,
          text: "How should you approach tutoring a concept that has multiple valid perspectives or interpretations?",
          options: [
            "Teach only your preferred perspective",
            "Present multiple viewpoints and encourage critical thinking",
            "Avoid such topics entirely",
            "Only present the most common viewpoint"
          ],
          correctAnswerIndex: 1,
        },
        {
          id: 9,
          text: "What's the best approach when a student is struggling with motivation?",
          options: [
            "Tell them they need to try harder",
            "Ignore the issue and focus only on content",
            "Connect the material to their interests and show real-world applications",
            "Reduce the difficulty level significantly"
          ],
          correctAnswerIndex: 2,
        },
        {
          id: 10,
          text: "What should be your primary goal as a tutor?",
          options: [
            "To cover as much content as possible",
            "To help the student develop understanding and independent learning skills",
            "To impress the student with your knowledge",
            "To finish sessions quickly"
          ],
          correctAnswerIndex: 1,
        },
      ];
  }
};

export const SubjectTest: React.FC<SubjectTestProps> = ({ subject, onComplete }) => {
  const [questions] = useState<Question[]>(getQuestionsForSubject(subject));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [testSubmitted, setTestSubmitted] = useState(false);

  useEffect(() => {
    // Timer countdown
    if (timeRemaining > 0 && !testSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !testSubmitted) {
      handleSubmitTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, testSubmitted]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(answers[currentQuestionIndex + 1] !== -1 ? answers[currentQuestionIndex + 1] : null);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1] !== -1 ? answers[currentQuestionIndex - 1] : null);
    }
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswerIndex) {
        correctAnswers++;
      }
    });
    
    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    onComplete(scorePercentage);
  };

  // Format time remaining
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const allQuestionsAnswered = answers.every(answer => answer !== -1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <Progress value={progress} className="h-2 mt-1" />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="h-4 w-4" />
          <span className={`${timeRemaining < 60 ? 'text-red-500' : ''}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-lg mb-4">{currentQuestion.text}</h3>
        
        <RadioGroup value={selectedOption?.toString() || ""} className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={index.toString()} 
                id={`option-${index}`} 
                onClick={() => handleOptionSelect(index)}
              />
              <Label htmlFor={`option-${index}`} className="cursor-pointer text-base">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        {currentQuestionIndex < questions.length - 1 ? (
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            Next
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmitTest}
            disabled={!allQuestionsAnswered}
          >
            Submit Test
          </Button>
        )}
      </div>
      
      <div className="pt-6 border-t">
        <div className="flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index === currentQuestionIndex
                  ? "bg-nexus-600 text-white"
                  : answers[index] !== -1
                  ? "bg-gray-200"
                  : "border border-gray-300"
              }`}
              onClick={() => {
                setCurrentQuestionIndex(index);
                setSelectedOption(answers[index] !== -1 ? answers[index] : null);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
