import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/use-colors';

const QUOTES = [
  {
    text: "Trust your intuition. You don't need to explain or justify your feelings to anyone.",
    author: 'Unknown',
  },
  {
    text: 'The only real valuable thing is intuition.',
    author: 'Albert Einstein',
  },
  {
    text: 'Intuition is a very powerful thing, more powerful than intellect.',
    author: 'Steve Jobs',
  },
  {
    text: "Follow your instincts. That's where true wisdom manifests itself.",
    author: 'Oprah Winfrey',
  },
  {
    text: 'The intuitive mind is a sacred gift and the rational mind is a faithful servant.',
    author: 'Albert Einstein',
  },
  {
    text: 'Good instincts usually tell you what to do long before your head has figured it out.',
    author: 'Michael Burke',
  },
  {
    text: 'Have the courage to follow your heart and intuition.',
    author: 'Steve Jobs',
  },
  {
    text: 'Intuition is the whisper of the soul.',
    author: 'Jiddu Krishnamurti',
  },
];

function getRandomQuote() {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
}

export default function InsightsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [quote, setQuote] = useState(getRandomQuote);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNewQuote = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    setTimeout(() => {
      setQuote(getRandomQuote());
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }, 150);
  }, [scale]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 24 },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Animated.View
        entering={FadeInUp.delay(100).duration(300)}
        style={styles.header}
      >
        <Text style={styles.emoji}>💡</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Daily Insight
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          A thought to guide your day
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200).duration(300)}>
        <Animated.View style={animatedStyle}>
          <View
            style={[
              styles.quoteCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text style={[styles.quoteText, { color: colors.textPrimary }]}>
              "{quote.text}"
            </Text>
            <Text style={[styles.quoteAuthor, { color: colors.accent }]}>
              — {quote.author}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300).duration(300)}>
        <Pressable
          onPress={handleNewQuote}
          style={({ pressed }) => [
            styles.refreshButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <Text style={[styles.refreshText, { color: colors.accent }]}>
            Show Another Quote
          </Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
  },
  quoteCard: {
    padding: 24,
    borderRadius: 16,
    borderCurve: 'continuous',
    borderWidth: 1,
    marginBottom: 24,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  quoteText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  quoteAuthor: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
  },
  refreshButton: {
    padding: 16,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
