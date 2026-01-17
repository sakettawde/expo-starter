import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { getColors, ColorScheme } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

type AvatarSize = 'sm' | 'md' | 'lg';

type AvatarProps = {
  name?: string;
  imageUrl?: string;
  size?: AvatarSize;
  onPress?: () => void;
};

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

const fontSizeMap: Record<AvatarSize, number> = {
  sm: 12,
  md: 14,
  lg: 20,
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function Avatar({ name, imageUrl, size = 'md', onPress }: AvatarProps) {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  const colors = getColors(colorScheme);
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  const initials = name ? getInitials(name) : '?';

  const content = imageUrl ? (
    <Image
      source={{ uri: imageUrl }}
      style={[
        styles.image,
        { width: dimension, height: dimension, borderRadius: dimension / 2 },
      ]}
      contentFit="cover"
    />
  ) : (
    <View
      style={[
        styles.fallback,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: colors.accent,
        },
      ]}
    >
      <Text style={[styles.initials, { fontSize, color: '#FFFFFF' }]}>
        {initials}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.pressable}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 100,
  },
  image: {},
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
  },
});
