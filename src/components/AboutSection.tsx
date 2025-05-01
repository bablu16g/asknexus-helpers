
import React from "react";
import { Mail } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gradient">About AskNexus</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting students with expert tutors across the globe for instant academic support
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-xl mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Founder</h3>
            <div className="w-24 h-24 bg-gradient-to-br from-nexus-500 to-expert-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              JG
            </div>
            <p className="text-xl font-semibold">Jitender Grewal</p>
            <p className="text-muted-foreground">Founder & CEO</p>
            <div className="flex items-center justify-center mt-2">
              <Mail className="h-4 w-4 text-muted-foreground mr-2" />
              <a href="mailto:jitenderguran16@gmail.com" className="text-muted-foreground hover:text-nexus-500 transition-colors">
                jitenderguran16@gmail.com
              </a>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-4">
              Jitender Grewal founded AskNexus with a vision to revolutionize the way students access academic help.
              With a background in education technology and a passion for making quality education accessible to all,
              Jitender has built AskNexus into a platform that connects students with experts worldwide.
            </p>
            <p className="text-muted-foreground">
              "I believe every student deserves access to quality educational support regardless of their location or resources.
              AskNexus bridges this gap by connecting students directly with qualified experts who can provide personalized
              assistance when it's needed most." — Jitender Grewal
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Star Students</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "Mahesh Yadav", subject: "Computer Science" },
                { name: "Ritesh Yadav", subject: "Physics" },
                { name: "Amit", subject: "Mathematics" },
                { name: "Gaurav", subject: "Chemistry" },
                { name: "Lokesh Yadav", subject: "Biology" },
                { name: "Pooja", subject: "Literature" },
                { name: "Rakhi", subject: "Economics" }
              ].map((student) => (
                <div key={student.name} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-nexus-100 dark:bg-nexus-800 flex items-center justify-center text-nexus-600 dark:text-nexus-300 font-medium">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Top Experts</h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                { name: "Himanshu Sangwan", expertise: "Mathematics", rating: 4.9 },
                { name: "Deepender Sharma", expertise: "Physics", rating: 4.8 },
                { name: "Aman Kumar", expertise: "Computer Science", rating: 4.95 }
              ].map((expert) => (
                <div key={expert.name} className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-expert-100 dark:bg-expert-800 flex items-center justify-center text-expert-600 dark:text-expert-300 font-medium text-lg">
                    {expert.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{expert.name}</p>
                    <p className="text-sm text-muted-foreground">{expert.expertise} Expert</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(expert.rating)
                                ? "text-yellow-400"
                                : i < expert.rating
                                ? "text-yellow-300"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs ml-1 text-muted-foreground">{expert.rating}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
