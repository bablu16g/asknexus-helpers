
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
              
              // Redirect based on user_type in URL or path
              const userTypeFromUrl = searchParams.get('user_type');
              if (userTypeFromUrl === 'expert') {
                navigate("/expert/onboarding");
              } else {
                navigate("/dashboard");
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
