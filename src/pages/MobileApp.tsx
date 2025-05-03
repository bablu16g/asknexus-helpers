
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

const AppleIconSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path d="M17.0398 12.0459C17.0199 9.14565 19.4453 7.80958 19.5351 7.75176C18.1602 5.79794 16.0354 5.50138 15.2754 5.48347C13.482 5.2957 11.7482 6.5241 10.8379 6.5241C9.90981 6.5241 8.49834 5.50138 6.98399 5.5372C5.04126 5.57302 3.2476 6.6676 2.27552 8.3657C0.269029 11.8357 1.76208 16.9383 3.68659 19.7847C4.65868 21.1746 5.79097 22.7103 7.2702 22.6566C8.71374 22.5992 9.27756 21.7116 11.0053 21.7116C12.7134 21.7116 13.2414 22.6566 14.7557 22.6208C16.3121 22.5992 17.2842 21.2272 18.2205 19.8231C19.3528 18.213 19.8092 16.6414 19.8291 16.5699C19.7894 16.5519 17.0638 15.5292 17.0398 12.0459Z" fill="currentColor"/>
    <path d="M14.4279 3.6824C15.2077 2.71591 15.7236 1.38702 15.5838 0.0402832C14.462 0.0940337 13.0843 0.801886 12.2648 1.74045C11.5447 2.57119 10.9094 3.94317 11.0691 5.2541C12.3274 5.35181 13.6282 4.63099 14.4279 3.6824Z" fill="currentColor"/>
  </svg>
);

const PlayIconSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path d="M3.60387 2.69834L12.2826 11.0459L15.2147 8.22892L3.60387 2.69834Z" fill="currentColor"/>
    <path d="M2.14941 2.27051C2.14941 2.3918 2.14941 19.9577 2.14941 19.9577L12.9984 11.7406L2.14941 2.27051Z" fill="currentColor"/>
    <path d="M20.5684 10.9242L16.3485 8.5835L12.9961 11.7409L16.2738 14.8294L20.5684 12.4655C21.5193 11.9601 21.5193 11.4296 20.5684 10.9242Z" fill="currentColor"/>
    <path d="M3.60461 20.5295L15.2219 14.9686L12.2917 12.1455L3.60461 20.5295Z" fill="currentColor"/>
  </svg>
);

const MobileApp = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get AskNexus on Mobile
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Access homework help on-the-go with our mobile app. Available soon on iOS and Android.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            <div className="flex flex-col h-full p-6 bg-card rounded-xl border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">iOS App</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Seamless experience for iPhone and iPad users. Get help with your homework anywhere.
              </p>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                <AppleIconSVG />
                Coming Soon
              </Button>
            </div>
            
            <div className="flex flex-col h-full p-6 bg-card rounded-xl border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Android App</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Designed for Android users. Take photos of your homework and get expert help instantly.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <PlayIconSVG />
                Coming Soon
              </Button>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold mb-4">Get Notified When We Launch</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to know when our mobile apps are available. We'll send you a notification.
            </p>
            <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-md border"
                />
              </div>
              <Button>
                <PhoneIcon className="mr-2 h-4 w-4" />
                Notify Me
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Take Photos</h3>
              <p className="text-muted-foreground">
                Snap a photo of your question and get help instantly
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Schedule Sessions</h3>
              <p className="text-muted-foreground">
                Book live tutoring sessions with your favorite experts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Get Notifications</h3>
              <p className="text-muted-foreground">
                Instant notifications when your questions are answered
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MobileApp;
