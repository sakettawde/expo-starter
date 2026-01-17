import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getColors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/use-auth';

export default function LoginScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    signIn(email, password);
    router.replace('/(app)');
  };

  const handleDemoSignIn = () => {
    signIn('demo@intuition.app', 'demo');
    router.replace('/(app)');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 60,
            paddingBottom: insets.bottom + 24,
            backgroundColor: colors.background,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          entering={FadeInUp.delay(100).duration(300)}
          style={styles.logoContainer}
        >
          <View style={[styles.logoMark, { backgroundColor: colors.accent }]}>
            <Text style={styles.logoText}>I</Text>
          </View>
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.delay(200).duration(300)}
          style={[styles.title, { color: colors.textPrimary }]}
        >
          Sign In
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.delay(250).duration(300)}
          style={[styles.subtitle, { color: colors.textSecondary }]}
        >
          Welcome back to Intuition
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.delay(300).duration(300)}
          style={styles.form}
        >
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoComplete="password"
          />

          {error ? (
            <Animated.Text
              entering={FadeInUp.duration(200)}
              style={[styles.errorText, { color: colors.error }]}
            >
              {error}
            </Animated.Text>
          ) : null}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).duration(300)}
          style={styles.actions}
        >
          <Button title="Sign In" onPress={handleSignIn} variant="primary" />
          <Button title="Try Demo" onPress={handleDemoSignIn} variant="secondary" />

          <Pressable style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: colors.accent }]}>
              Forgot password?
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(500).duration(300)}
          style={styles.signupContainer}
        >
          <Text style={[styles.signupText, { color: colors.textSecondary }]}>
            Don&apos;t have an account?{' '}
          </Text>
          <Pressable>
            <Text style={[styles.signupLink, { color: colors.accent }]}>Sign up</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    marginBottom: 24,
  },
  errorText: {
    fontSize: 14,
    marginTop: 8,
  },
  actions: {
    gap: 16,
    marginBottom: 32,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  signupText: {
    fontSize: 15,
  },
  signupLink: {
    fontSize: 15,
    fontWeight: '600',
  },
});
