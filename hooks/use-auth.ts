import { useCallback, useEffect, useState } from 'react';
import { useStorage } from './use-storage';

export type User = {
  email: string;
  name: string;
};

type AuthState = {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: User | null;
};

const initialAuthState: AuthState = {
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  user: null,
};

export function useAuth() {
  const [authState, setAuthState] = useStorage<AuthState>('auth', initialAuthState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const signIn = useCallback(
    (email: string, _password: string) => {
      // Mock authentication - any non-empty credentials succeed
      let name: string;

      if (email === 'demo@intuition.app') {
        name = 'Demo User';
      } else {
        const prefix = email.split('@')[0];
        name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }

      setAuthState({
        isAuthenticated: true,
        hasCompletedOnboarding: authState.hasCompletedOnboarding,
        user: {
          email,
          name,
        },
      });
    },
    [authState.hasCompletedOnboarding, setAuthState]
  );

  const signOut = useCallback(() => {
    setAuthState({
      ...authState,
      isAuthenticated: false,
      user: null,
    });
  }, [authState, setAuthState]);

  const completeOnboarding = useCallback(() => {
    setAuthState({
      ...authState,
      hasCompletedOnboarding: true,
    });
  }, [authState, setAuthState]);

  return {
    isAuthenticated: authState.isAuthenticated,
    hasCompletedOnboarding: authState.hasCompletedOnboarding,
    user: authState.user,
    isReady,
    signIn,
    signOut,
    completeOnboarding,
  };
}
