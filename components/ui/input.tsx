import { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { getColors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  keyboardType?: TextInputProps['keyboardType'];
  autoComplete?: TextInputProps['autoComplete'];
};

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  autoComplete,
}: InputProps) {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = useSharedValue<string>(colors.border);

  const animatedBorderStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  const handleFocus = () => {
    setIsFocused(true);
    borderColor.value = withTiming(colors.accent, { duration: 150 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    borderColor.value = withTiming(colors.border, { duration: 150 });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isFocused ? colors.accent : colors.textSecondary }]}>
        {label}
      </Text>
      <Animated.View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.surface },
          animatedBorderStyle,
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
