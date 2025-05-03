
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AppleIcon, PlayIcon } from "lucide-react";

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
);

const MobileApp = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">AskNexus Mobile Apps</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our mobile apps for Android and iOS are coming soon!
            </p>
            
            <div className="relative">
              <div className="aspect-video max-w-4xl mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-2xl mb-6">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-white text-3xl font-bold mb-4">Coming Soon</div>
                  <div className="text-white text-lg mb-8">Join the waitlist to be notified when our apps launch</div>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <Button className="bg-black hover:bg-gray-800 text-white">
                      <AppleIcon className="mr-2 h-5 w-5" />
                      iOS App
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <PlayIcon className="mr-2 h-5 w-5" />
                      Android App
                    </Button>
                  </div>
                </div>
                
                {/* App mockup image */}
                <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-nexus-100 text-nexus-600 h-14 w-14 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Instant Notifications</h3>
              <p className="text-muted-foreground">Get real-time alerts when experts answer your questions</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-nexus-100 text-nexus-600 h-14 w-14 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Photo Question Uploads</h3>
              <p className="text-muted-foreground">Take a photo of your homework and get help instantly</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-nexus-100 text-nexus-600 h-14 w-14 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Chat with Experts</h3>
              <p className="text-muted-foreground">Real-time messaging with experienced tutors on the go</p>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-nexus-600 to-nexus-800 text-white rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-4">Join our Early Access Program</h2>
            <p className="mb-8">Be among the first to try our mobile apps and provide feedback</p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-white text-black"
              />
              <Button className="w-full md:w-auto whitespace-nowrap bg-black hover:bg-gray-800">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MobileApp;
