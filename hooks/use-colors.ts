import { useColorScheme } from './use-color-scheme';
import { colors, ColorScheme } from '@/constants/colors';

export function useColors() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorScheme;
  return colors[colorScheme];
}
