
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import ExpertLogin from "./pages/ExpertLogin";
import ExpertRegister from "./pages/ExpertRegister";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Contact from "./pages/Contact";
import ExpertTest from "./pages/ExpertTest";
import ExpertEarnings from "./pages/ExpertEarnings";
import ExpertFAQ from "./pages/ExpertFAQ";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import AskQuestion from "./pages/AskQuestion";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

// Handle email verification
const EmailVerificationHandler = () => {
  useEffect(() => {
    // Parse the URL fragment to get the access_token
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    // If access_token is found and it's a recovery type, handle the verification
    if (accessToken && type === "recovery") {
      // Set the session using the tokens
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || "",
      }).then(({ data, error }) => {
        if (error) {
          console.error("Error setting session:", error);
          toast.error("There was an error verifying your email.");
        } else if (data.session) {
          toast.success("Your email has been verified successfully!");
        }
      });
    }
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EmailVerificationHandler />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/student/login" element={<StudentLogin />} />
              <Route path="/student/register" element={<StudentRegister />} />
              <Route path="/expert/login" element={<ExpertLogin />} />
              <Route path="/expert/register" element={<ExpertRegister />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ask-question" 
                element={
                  <ProtectedRoute requiredUserType="student">
                    <AskQuestion />
                  </ProtectedRoute>
                } 
              />
              <Route path="/expert/tests" element={<ExpertTest />} />
              <Route path="/expert/earnings" element={<ExpertEarnings />} />
              <Route path="/expert/faq" element={<ExpertFAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              {/* Catch-all route for email verification redirects */}
              <Route path="/auth/callback" element={<Navigate to="/dashboard" />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
