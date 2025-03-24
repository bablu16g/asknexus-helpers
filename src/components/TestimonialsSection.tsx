
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  type: "student" | "expert";
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mahesh Yadav",
    role: "Computer Science Student",
    content: "AskNexus has been a lifesaver for my programming courses. The step-by-step explanations helped me understand complex concepts that my textbook couldn't explain clearly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 2,
    name: "Ritesh Yadav",
    role: "Physics Student",
    content: "I was struggling with quantum physics until I found AskNexus. The experts explain every step so well that I finally understand the material instead of just memorizing it.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 3,
    name: "Himanshu Sangwan",
    role: "Mathematics Expert",
    content: "Being an AskNexus expert allows me to help students worldwide while earning from my mathematical expertise. The platform is intuitive and the payment system is reliable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "expert"
  },
  {
    id: 4,
    name: "Pooja",
    role: "Literature Student",
    content: "Premium membership is worth every penny. I get priority answers when I'm on tight deadlines, and the quality of explanations has significantly improved my grades.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 5,
    name: "Deepender Sharma",
    role: "Physics Expert",
    content: "AskNexus provides a flexible way to use my physics knowledge to help students. The subject tests ensure only qualified experts answer questions, maintaining high quality.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "expert"
  },
  {
    id: 6,
    name: "Amit",
    role: "Mathematics Student",
    content: "The personalized explanations I get on AskNexus have helped me understand calculus in ways my textbook never could. Now I'm confident in solving complex problems.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 7,
    name: "Aman Kumar",
    role: "Computer Science Expert",
    content: "The platform makes it easy to help students with their programming challenges. I can provide detailed code examples and explanations that truly help them learn.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "expert"
  },
  {
    id: 8,
    name: "Gaurav",
    role: "Chemistry Student",
    content: "AskNexus experts know exactly how to break down complex organic chemistry reactions. I've improved my grades significantly since I started using the platform.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 9,
    name: "Rakhi",
    role: "Economics Student",
    content: "The unlimited questions feature on the premium plan has been so worth it. I can get help whenever I'm stuck without worrying about running out of credits.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 10,
    name: "Lokesh Yadav",
    role: "Biology Student",
    content: "The diagrams and explanations provided by experts have made complex biological processes much easier to understand. I recommend AskNexus to all my classmates.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "student"
  },
  {
    id: 11,
    name: "Jitender Grewal",
    role: "Founder & CEO",
    content: "I created AskNexus with a vision to connect students with experts who can provide personalized academic support. It's incredible to see how it's helping students succeed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    type: "expert"
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToSlide = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setAnimating(false), 500);
  };

  const goToPrevSlide = () => {
    const newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    goToSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
    goToSlide(newIndex);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from students who found academic success and experts who share their knowledge
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className={cn(
                    "glass-card p-8 rounded-2xl text-center",
                    testimonial.type === "student" 
                      ? "border-student-200/50 dark:border-student-800/30" 
                      : "border-expert-200/50 dark:border-expert-800/30"
                  )}>
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-20 h-20 rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                        <div className={cn(
                          "absolute -bottom-2 -right-2 rounded-full p-1",
                          testimonial.type === "student" 
                            ? "bg-student-100 dark:bg-student-900" 
                            : "bg-expert-100 dark:bg-expert-900"
                        )}>
                          <div className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            testimonial.type === "student" 
                              ? "text-student-700 dark:text-student-300" 
                              : "text-expert-700 dark:text-expert-300"
                          )}>
                            {testimonial.type === "student" ? "Student" : "Expert"}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "w-5 h-5",
                            i < testimonial.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300 dark:text-gray-600"
                          )} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg italic mb-6">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background"
            onClick={goToPrevSlide}
            disabled={animating}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background"
            onClick={goToNextSlide}
            disabled={animating}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-nexus-500 w-6" 
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                )}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
