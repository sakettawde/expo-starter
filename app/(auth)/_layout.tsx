import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getColors, ColorScheme } from '@/constants/colors';
import { useAuth } from '@/hooks/use-auth';

export default function AuthLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const { hasCompletedOnboarding, isAuthenticated } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
      <Stack.Protected guard={hasCompletedOnboarding && !isAuthenticated}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
