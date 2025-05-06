
import { useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAuthRedirect() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      // Check if there's an access_token in the URL (from email confirmation link)
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');
      const userType = searchParams.get('user_type');

      if (accessToken && type === 'recovery') {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (error) {
            toast.error('Error verifying email: ' + error.message);
          } else if (data.session) {
            toast.success('Your email has been verified successfully!');
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error setting session:', error);
          toast.error('There was an error verifying your email.');
        }
      }

      // Check for hash fragment (when redirected back from OAuth)
      if (location.hash) {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessTokenHash = hashParams.get('access_token');
        const refreshTokenHash = hashParams.get('refresh_token');
        
        if (accessTokenHash) {
          try {
            const { error } = await supabase.auth.setSession({
              access_token: accessTokenHash,
              refresh_token: refreshTokenHash || '',
            });

            if (error) {
              toast.error('Error signing in: ' + error.message);
            } else {
              toast.success('Signed in successfully!');
              
              // Get the user_type from URL params if available (from the OAuth redirect)
              const userTypeFromUrl = searchParams.get('user_type');
              
              // Retrieve user data to determine the correct redirection
              const { data: userData } = await supabase.auth.getUser();
              
              if (userData?.user) {
                // Default all OAuth logins to 'student' unless explicitly set as 'expert'
                // This ensures users from Google/Facebook are always directed to student dashboard
                const oauthLoginUserType = 'student'; 
                
                // Update user metadata to ensure they're marked as a student
                if (userData?.user?.app_metadata?.provider === 'google' || 
                    userData?.user?.app_metadata?.provider === 'facebook') {
                  // For OAuth logins, always set as student
                  await supabase.auth.updateUser({
                    data: { user_type: oauthLoginUserType }
                  });
                  navigate('/dashboard');
                } else {
                  // For email logins, respect their chosen user type
                  const userMetadata = userData.user.user_metadata || {};
                  const effectiveUserType = userMetadata.user_type || 'student';
                  
                  if (effectiveUserType === 'expert') {
                    // Check if expert has completed onboarding
                    const { data: expertData } = await supabase
                      .from('expert_profiles')
                      .select('expertise')
                      .eq('id', userData.user.id)
                      .single();
                    
                    if (expertData && expertData.expertise && expertData.expertise.length > 0) {
                      navigate('/expert/dashboard');
                    } else {
                      navigate('/expert/onboarding');
                    }
                  } else {
                    navigate('/dashboard');
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error setting session from hash:', error);
            toast.error('There was an error signing you in.');
          }
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, location.hash, navigate]);

  return null;
}
