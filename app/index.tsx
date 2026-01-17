import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';

export default function Index() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)" />;
}
