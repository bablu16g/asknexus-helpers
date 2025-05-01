
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Bot, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Leela, your AskNexus Assistant. How can I help you with our platform today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBouncing, setIsBouncing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Stop bouncing animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBouncing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsBouncing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hi there! I'm Leela, your AskNexus Assistant. How can I help you with our platform today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response with different responses based on keywords
    setTimeout(() => {
      let responseText = "";
      const lowercaseInput = input.toLowerCase();

      if (lowercaseInput.includes("pricing") || lowercaseInput.includes("cost") || lowercaseInput.includes("plan") || lowercaseInput.includes("subscription")) {
        responseText = "We offer three plans to suit different needs:\n\n✨ **Free Plan**: Great for beginners with basic question-answering and limited subjects.\n\n💎 **Premium Plan** ($29/month): Includes faster responses, all subjects, direct expert chat, and priority support.\n\n🌟 **Ultimate Plan** ($49/month): Our most comprehensive package with 24/7 expert access, unlimited responses, video calls, and specialized tutoring.\n\nAll plans come with a 7-day free trial. Would you like to know more about a specific plan?";
      } else if (lowercaseInput.includes("subject") || lowercaseInput.includes("course") || lowercaseInput.includes("study")) {
        responseText = "AskNexus covers a wide range of subjects including:\n\n📐 Mathematics (Algebra, Calculus, Statistics)\n🔬 Sciences (Physics, Chemistry, Biology)\n💻 Computer Science & Programming\n🌎 Languages (English, Spanish, French, etc.)\n📚 History & Social Studies\n📊 Business & Economics\n\nOur experts specialize in all education levels from elementary to university. Is there a specific subject you're interested in learning more about?";
      } else if (lowercaseInput.includes("expert") || lowercaseInput.includes("tutor") || lowercaseInput.includes("teacher")) {
        responseText = "Our experts are carefully selected professionals with advanced degrees and teaching experience in their fields. We have educators like Himanshu Sangwan (Mathematics), Deepender Sharma (Science), and Aman Kumar (Computer Science) who provide personalized assistance.\n\nAll experts undergo rigorous verification of their credentials and teaching abilities before joining our platform. Many have 5+ years of experience and consistently receive high ratings from students. Would you like to learn more about our expert selection process?";
      } else if (lowercaseInput.includes("founder") || lowercaseInput.includes("who created") || lowercaseInput.includes("owner")) {
        responseText = "AskNexus was founded by Jitender Grewal, an education technology innovator passionate about making quality education accessible to everyone. He created this platform to connect students directly with subject matter experts, eliminating barriers to personalized education. Under his leadership, AskNexus has helped thousands of students achieve academic success across multiple subjects and education levels.";
      } else if (lowercaseInput.includes("how it works") || lowercaseInput.includes("process") || lowercaseInput.includes("steps")) {
        responseText = "Using AskNexus is simple:\n\n1️⃣ **Ask** - Submit your question or problem through our platform\n2️⃣ **Match** - Get paired with the perfect expert for your subject\n3️⃣ **Learn** - Receive personalized explanations and guidance\n4️⃣ **Master** - Apply what you've learned and track your progress\n\nOur platform uses smart matching algorithms to connect you with the right expert quickly. Would you like to try with a sample question?";
      } else if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi") || lowercaseInput.includes("hey") || lowercaseInput.includes("greetings")) {
        responseText = "Hello! Welcome to AskNexus. I'm Leela, your virtual assistant. I'm here to answer any questions about our educational platform, pricing plans, subjects we cover, or how to get started. What would you like to know today?";
      } else if (lowercaseInput.includes("thank")) {
        responseText = "You're welcome! I'm happy I could help. If you have any more questions in the future, feel free to come back and ask anytime. Happy learning with AskNexus!";
      } else if (lowercaseInput.includes("register") || lowercaseInput.includes("sign up") || lowercaseInput.includes("join") || lowercaseInput.includes("create account")) {
        responseText = "Creating an account is quick and easy! Just click the 'Sign Up' button in the navigation bar and follow these steps:\n\n1. Choose between student or expert registration\n2. Fill in your basic information\n3. Verify your email\n4. Complete your profile\n\nThe entire process takes less than 2 minutes, and you can start using the platform immediately. Would you like me to walk you through the registration process?";
      } else if (lowercaseInput.includes("login") || lowercaseInput.includes("sign in")) {
        responseText = "To log in to your AskNexus account:\n\n1. Click the 'Log In' button in the top right corner of the page\n2. Enter your email and password\n3. Click 'Log In'\n\nIf you've forgotten your password, there's a 'Forgot Password' link on the login page to help you reset it. Is there anything specific you're having trouble with?";
      } else if (lowercaseInput.includes("payment") || lowercaseInput.includes("refund") || lowercaseInput.includes("cancel")) {
        responseText = "We accept all major credit cards, PayPal, and Apple Pay for subscription payments. All plans come with a 7-day free trial, and you can cancel anytime before the trial ends without being charged.\n\nIf you're not satisfied with your premium service, we offer a 30-day money-back guarantee. To cancel or request a refund, simply contact our support team through your account dashboard or at support@asknexus.com.";
      } else if (lowercaseInput.includes("contact") || lowercaseInput.includes("support") || lowercaseInput.includes("help")) {
        responseText = "Our support team is available to help you with any questions or issues:\n\n📧 Email: support@asknexus.com\n💬 Live Chat: Available on the website 9am-9pm EST\n📞 Phone: 1-800-ASK-NEXUS (weekdays 8am-8pm EST)\n\nPremium and Ultimate plan subscribers get priority support with faster response times. How can we help you today?";
      } else if (lowercaseInput.includes("review") || lowercaseInput.includes("testimonial") || lowercaseInput.includes("feedback")) {
        responseText = "Our students have had great experiences with AskNexus! Students like Mahesh Yadav, Ritesh Yadav, Amit, Gaurav, Lokesh Yadav, Pooja, and Rakhi have shared positive feedback about their learning journey with us. Many report grade improvements, better understanding of difficult concepts, and increased confidence in their studies. Check out our testimonials section to read their specific stories!";
      } else if (lowercaseInput.includes("mobile") || lowercaseInput.includes("app") || lowercaseInput.includes("phone")) {
        responseText = "Yes, AskNexus is fully responsive and works on all devices including smartphones and tablets. We also have dedicated mobile apps for iOS and Android that provide a seamless experience on the go. You can download them from the App Store or Google Play Store by searching for 'AskNexus'. The mobile version includes all features of the web platform, allowing you to learn anywhere, anytime!";
      } else {
        responseText = "Thank you for your question! AskNexus is a comprehensive educational platform connecting students with expert tutors for personalized academic help. Whether you need assistance with homework, exam preparation, or understanding complex concepts, our qualified experts are here to help.\n\nCan you tell me more specifically what you'd like to know about our services? I'd be happy to explain our pricing plans, available subjects, how the platform works, or anything else you're curious about!";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button with bounce animation */}
      <Button
        onClick={toggleChat}
        className={cn(
          "w-16 h-16 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-nexus-500 hover:bg-nexus-600",
          "flex items-center justify-center",
          isBouncing && !isOpen ? "animate-bounce" : ""
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="absolute bottom-20 right-0 w-80 sm:w-[400px] h-[600px] bg-background rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 animate-scale-in border-nexus-200">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-nexus-600 to-nexus-400 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="https://i.ibb.co/0qhX8K0/chatbot-avatar.png" alt="Leela - AI Assistant" />
                <AvatarFallback className="bg-nexus-300">
                  <Bot className="h-6 w-6 text-white" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Leela</h3>
                <p className="text-xs text-nexus-50">AskNexus Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={resetConversation}
                className="text-white hover:bg-nexus-600/50 h-8 w-8 rounded-full"
                aria-label="Reset conversation"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-nexus-600/50 h-8 w-8 rounded-full"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages container */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-nexus-50/50 to-white dark:from-gray-900/30 dark:to-gray-900"
          >
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2 animate-fade-in",
                    message.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://i.ibb.co/0qhX8K0/chatbot-avatar.png" alt="Leela" />
                      <AvatarFallback className="bg-nexus-300">
                        <Bot className="h-4 w-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl p-3",
                      message.isUser
                        ? "bg-nexus-500 text-white"
                        : "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap" style={{ overflowWrap: 'break-word' }}>
                      {message.text.split('\n').map((line, i) => {
                        // Replace markdown bold with actual bold
                        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <span key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />
                        );
                      }).reduce((acc, curr, idx, arr) => {
                        return acc.length === 0 ? [curr] : [...acc, <br key={idx} />, curr];
                      }, [] as React.ReactNode[])}
                    </p>
                    <span className={cn(
                      "block text-xs mt-1",
                      message.isUser ? "opacity-70" : "text-gray-500",
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.isUser && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-gray-300 dark:bg-gray-600">
                        <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="https://i.ibb.co/0qhX8K0/chatbot-avatar.png" alt="Leela" />
                    <AvatarFallback className="bg-nexus-300">
                      <Bot className="h-4 w-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-nexus-400 animate-bounce"></div>
                      <div className="h-2 w-2 rounded-full bg-nexus-400 animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="h-2 w-2 rounded-full bg-nexus-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-gray-100 dark:border-gray-800 p-3 bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex items-end gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask about AskNexus..."
                className="min-h-[60px] max-h-[120px] resize-none rounded-xl focus-visible:ring-nexus-500 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="h-10 w-10 rounded-full flex-shrink-0 bg-nexus-500 hover:bg-nexus-600 transition-all duration-200 disabled:bg-gray-300 dark:disabled:bg-gray-700"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Ask about pricing, subjects, experts, or how AskNexus works!
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
