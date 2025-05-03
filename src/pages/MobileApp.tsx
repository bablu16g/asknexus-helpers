
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Apple, Clock, MessageSquare, Smartphone, Star } from "lucide-react";

const AppFeatures = [
  {
    icon: <MessageSquare className="h-10 w-10 text-nexus-600" />,
    title: "Instant Answers",
    description: "Get expert help with your academic questions within minutes, not hours."
  },
  {
    icon: <Clock className="h-10 w-10 text-nexus-600" />,
    title: "24/7 Availability",
    description: "Access expert tutors anytime, anywhere, right from your mobile device."
  },
  {
    icon: <Star className="h-10 w-10 text-nexus-600" />,
    title: "Top-Rated Experts",
    description: "Learn from subject matter experts with verified credentials and experience."
  }
];

const MobileApp = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      toast.success("Thanks for your interest! We'll notify you when the app launches.");
      setEmail("");
      setPhoneNumber("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">
              AskNexus <span className="text-gradient">Mobile App</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mobile app is launching soon! Get instant academic help from verified experts in the palm of your hand.
            </p>
          </div>

          <Tabs defaultValue="features" className="mb-16">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="features">App Features</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {AppFeatures.map((feature, index) => (
                  <div key={index} className="glass-card p-6 rounded-xl text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="platforms">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-xl text-center">
                  <div className="flex justify-center mb-6">
                    <Apple className="h-16 w-16 text-nexus-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">iOS App</h3>
                  <p className="text-muted-foreground mb-6">
                    Coming soon to the App Store. Get access to expert help on your iPhone or iPad.
                  </p>
                  <div className="bg-nexus-50 dark:bg-nexus-900/30 p-3 rounded-md text-sm mb-6">
                    <p className="font-semibold">Expected Release:</p>
                    <p>Late Summer 2024</p>
                  </div>
                  <Button className="w-full">Notify Me</Button>
                </div>
                
                <div className="glass-card p-8 rounded-xl text-center">
                  <div className="flex justify-center mb-6">
                    <Smartphone className="h-16 w-16 text-nexus-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Android App</h3>
                  <p className="text-muted-foreground mb-6">
                    Coming soon to Google Play. Access expert tutors on any Android device.
                  </p>
                  <div className="bg-nexus-50 dark:bg-nexus-900/30 p-3 rounded-md text-sm mb-6">
                    <p className="font-semibold">Expected Release:</p>
                    <p>Late Summer 2024</p>
                  </div>
                  <Button className="w-full">Notify Me</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Get Notified at Launch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number (optional)</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Notify Me When App Launches"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                We'll only use this information to notify you about the app launch. No spam, we promise!
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MobileApp;
