import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { getColors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button({ title, onPress, variant = 'primary', disabled = false }: ButtonProps) {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: colors.accent,
            borderWidth: 0,
            boxShadow: colorScheme === 'light'
              ? '0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1)'
              : '0px 1px 3px rgba(0, 0, 0, 0.3)',
          },
          text: {
            color: '#FFFFFF',
          },
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
          },
          text: {
            color: colors.textPrimary,
          },
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          text: {
            color: colors.accent,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.container,
        variantStyles.container as object,
        animatedStyle,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, variantStyles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
