
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

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
      text: "Hi there! I'm AskNexus Assistant. How can I help you with our platform today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

      if (lowercaseInput.includes("pricing") || lowercaseInput.includes("cost") || lowercaseInput.includes("plan")) {
        responseText = "We offer three plans: Free, Premium ($29/month), and Ultimate ($49/month). Each plan offers different features to suit your needs. Check our pricing section for more details!";
      } else if (lowercaseInput.includes("subject") || lowercaseInput.includes("course")) {
        responseText = "AskNexus covers a wide range of subjects including Mathematics, Science, Computer Science, Languages, History, and more. If you have a specific subject in mind, please ask!";
      } else if (lowercaseInput.includes("expert") || lowercaseInput.includes("tutor") || lowercaseInput.includes("teacher")) {
        responseText = "Our experts are carefully selected professionals with verified credentials in their fields. They include educators like Himanshu Sangwan, Deepender Sharma, and Aman Kumar who are committed to helping students succeed.";
      } else if (lowercaseInput.includes("founder") || lowercaseInput.includes("who created") || lowercaseInput.includes("owner")) {
        responseText = "AskNexus was founded by Jitender Grewal, who envisioned a platform where students could get immediate, high-quality academic help.";
      } else if (lowercaseInput.includes("how it works") || lowercaseInput.includes("process")) {
        responseText = "It's simple! Ask your question, get matched with an expert, receive personalized help, and learn at your own pace. Our platform ensures you get the help you need when you need it.";
      } else if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi") || lowercaseInput.includes("hey")) {
        responseText = "Hello! Welcome to AskNexus. How can I assist you today?";
      } else if (lowercaseInput.includes("thank")) {
        responseText = "You're welcome! If you have any more questions, feel free to ask anytime.";
      } else if (lowercaseInput.includes("register") || lowercaseInput.includes("sign up") || lowercaseInput.includes("join")) {
        responseText = "You can sign up by clicking the 'Sign Up' button in the top right corner. Registration is free and only takes a minute!";
      } else if (lowercaseInput.includes("login") || lowercaseInput.includes("sign in")) {
        responseText = "To log in, click the 'Log In' button in the top right corner and enter your credentials.";
      } else {
        responseText = "Thanks for your question! I'd be happy to help with that. AskNexus is an educational platform that connects students with expert tutors for personalized help. Can you tell me more specifically what you'd like to know about our services?";
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
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-nexus-500 hover:bg-nexus-600",
          "flex items-center justify-center"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-background border border-border rounded-lg shadow-xl flex flex-col overflow-hidden transition-all duration-300 animate-scale-in">
          {/* Chat header */}
          <div className="bg-nexus-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">AskNexus Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="text-white hover:bg-nexus-600 h-8 w-8"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.isUser
                        ? "bg-nexus-500 text-white rounded-tr-none"
                        : "bg-muted rounded-tl-none"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="block text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-[80%]">
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
          <div className="border-t border-border p-3 bg-background">
            <div className="flex items-end gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Ask a question..."
                className="min-h-[60px] max-h-[120px] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="h-10 w-10 rounded-full flex-shrink-0 bg-nexus-500 hover:bg-nexus-600"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Ask about pricing, subjects, experts, or how AskNexus works!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
