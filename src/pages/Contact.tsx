
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to our team using any of the contact methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-nexus-100 dark:bg-nexus-800 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-nexus-600 dark:text-nexus-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a 
              href="mailto:asknexus@gmail.com"
              className="text-nexus-600 dark:text-nexus-400 hover:underline font-medium"
            >
              asknexus@gmail.com
            </a>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-nexus-100 dark:bg-nexus-800 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-nexus-600 dark:text-nexus-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-muted-foreground mb-4">
              Have an urgent question? Give us a call directly.
            </p>
            <a 
              href="tel:7027867847"
              className="text-nexus-600 dark:text-nexus-400 hover:underline font-medium"
            >
              (702) 786-7847
            </a>
          </div>

          <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-nexus-100 dark:bg-nexus-800 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-nexus-600 dark:text-nexus-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-4">
              Our office hours are 9 AM - 5 PM, Monday to Friday.
            </p>
            <div className="flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">9 AM - 5 PM (Mon-Fri)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?" 
                  required 
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Write your message here..." 
                  required 
                  className="w-full min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto bg-nexus-500 hover:bg-nexus-600">
                <Send className="h-4 w-4 mr-2" /> Send Message
              </Button>
            </form>
          </div>

          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How quickly can I get help with my questions?</h3>
                <p className="text-muted-foreground">
                  Most questions are answered within 30 minutes, depending on complexity and expert availability.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Are the experts qualified?</h3>
                <p className="text-muted-foreground">
                  Yes, all our experts undergo rigorous screening and testing in their subject areas before joining our platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How much does the service cost?</h3>
                <p className="text-muted-foreground">
                  We offer various plans starting from free tier to premium subscriptions. Check our pricing page for details.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I become an expert on AskNexus?</h3>
                <p className="text-muted-foreground">
                  Absolutely! If you're knowledgeable in a subject area, you can apply to become an expert through our application process.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Our Founder</h2>
          <div className="w-24 h-24 bg-gradient-to-br from-nexus-500 to-expert-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
            JG
          </div>
          <p className="text-xl font-semibold mb-1">Jitender Grewal</p>
          <p className="text-muted-foreground mb-3">Founder & CEO</p>
          <div className="flex items-center justify-center">
            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
            <a href="mailto:jitenderguran16@gmail.com" className="text-muted-foreground hover:text-nexus-500 transition-colors">
              jitenderguran16@gmail.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
