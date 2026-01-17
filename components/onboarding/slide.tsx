import { View, Text, StyleSheet, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { getColors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Icon mapping for cross-platform support
const iconMapping: Record<string, string> = {
  'sparkles': 'auto-awesome',
  'lightbulb.fill': 'lightbulb',
  'arrow.right.circle.fill': 'arrow-circle-right',
};

type SlideProps = {
  icon: string;
  title: string;
  description: string;
};

export function Slide({ icon, title, description }: SlideProps) {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.iconContainer}>
        {Platform.OS === 'ios' ? (
          <SymbolView
            name={icon as any}
            weight="medium"
            tintColor={colors.accent}
            resizeMode="scaleAspectFit"
            style={styles.symbolIcon}
          />
        ) : (
          <MaterialIcons
            name={iconMapping[icon] as any}
            size={80}
            color={colors.accent}
          />
        )}
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {description}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  symbolIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 24,
  },
});
