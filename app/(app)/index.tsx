import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/use-colors';
import { useAuth } from '@/hooks/use-auth';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

type CardProps = {
  title: string;
  description: string;
  emoji: string;
  index: number;
};

function Card({ title, description, emoji, index }: CardProps) {
  const colors = useColors();
  return (
    <Animated.View
      entering={FadeInUp.delay(200 + index * 50).duration(300)}
    >
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
      >
        <Text style={styles.cardEmoji}>{emoji}</Text>
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>
          <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const greeting = getGreeting();
  const userName = user?.name ?? 'there';

  const features = [
    {
      title: 'Daily Reflection',
      description: 'Take a moment to check in with yourself',
      emoji: '📝',
    },
    {
      title: 'Insights',
      description: 'Discover patterns in your thoughts',
      emoji: '💡',
    },
    {
      title: 'Mindfulness',
      description: 'Guided exercises for clarity',
      emoji: '🧘',
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: insets.bottom + 24 },
      ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Animated.Text
        entering={FadeInUp.delay(100).duration(300)}
        style={[styles.greeting, { color: colors.textPrimary }]}
      >
        {greeting}, {userName}
      </Animated.Text>

      <Animated.View
        entering={FadeInUp.delay(150).duration(300)}
        style={[
          styles.welcomeCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.welcomeTitle, { color: colors.textPrimary }]}>
          Welcome to Intuition
        </Text>
        <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
          Your journey to self-discovery starts here. Take a few moments each day to reflect and grow.
        </Text>
      </Animated.View>

      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        Get Started
      </Text>

      <View style={styles.cardList}>
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            title={feature.title}
            description={feature.description}
            emoji={feature.emoji}
            index={index}
          />
        ))}
      </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 16,
    borderCurve: 'continuous',
    borderWidth: 1,
    marginBottom: 32,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  cardList: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  },
  cardEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
  },
});
