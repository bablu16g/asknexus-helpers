
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: "student" | "expert";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType 
}) => {
  const { user, userType, loading } = useAuth();

  // Show loading or spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nexus-600"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/student/login" />;
  }

  // If a specific user type is required and user doesn't match, redirect
  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to={`/${userType}/login`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
