import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Slide } from '@/components/onboarding/slide';
import { Button } from '@/components/ui/button';
import { getColors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/use-auth';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    icon: 'sparkles',
    title: 'Welcome to Intuition',
    description: 'Your personal guide to understanding yourself better through daily reflection and insights.',
  },
  {
    icon: 'lightbulb.fill',
    title: 'Trust Your Instincts',
    description: 'Learn to recognize patterns in your thoughts and feelings, building deeper self-awareness over time.',
  },
  {
    icon: 'arrow.right.circle.fill',
    title: "Let's Get Started",
    description: 'Begin your journey to a more intuitive, mindful life. Just a few moments each day can make a difference.',
  },
];

export default function OnboardingScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    completeOnboarding();
    router.replace('/');
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        entering={FadeIn.delay(100).duration(300)}
        style={[styles.skipContainer, { top: insets.top + 16 }]}
      >
        {!isLastSlide && (
          <Pressable onPress={handleSkip}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
          </Pressable>
        )}
      </Animated.View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slideWrapper}>
            <Slide
              icon={slide.icon}
              title={slide.title}
              description={slide.description}
            />
          </View>
        ))}
      </ScrollView>

      <Animated.View
        entering={FadeInUp.delay(400).duration(300)}
        style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}
      >
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? colors.accent : colors.border,
                  width: index === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isLastSlide ? 'Get Started' : 'Next'}
            onPress={handleNext}
            variant="primary"
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipContainer: {
    position: 'absolute',
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  slideWrapper: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
  },
});
