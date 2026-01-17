import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getColors, ColorScheme } from '@/constants/colors';

export default function AuthLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);

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
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
