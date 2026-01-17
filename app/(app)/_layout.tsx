import { Alert } from 'react-native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getColors, ColorScheme } from '@/constants/colors';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

export default function AppLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Intuition',
          headerRight: () => (
            <Avatar
              name={user?.name}
              size="sm"
              onPress={handleSignOut}
            />
          ),
        }}
      />
      <Stack.Screen
        name="insights"
        options={{
          title: 'Insights',
        }}
      />
    </Stack>
  );
}
