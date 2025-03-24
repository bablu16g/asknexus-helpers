
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthForm } from "@/components/auth/AuthForm";

const StudentLogin = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-20 pt-36">
        <div className="glass-card max-w-md mx-auto p-8 rounded-2xl">
          <AuthForm type="login" userType="student" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentLogin;
