/**
 * Extended color palette for the Intuition app
 * Warm neutral palette with rich teal accent
 */

export const colors = {
  light: {
    background: '#FAFAF9',
    surface: '#FFFFFF',
    textPrimary: '#1C1917',
    textSecondary: '#78716C',
    accent: '#0D9488',
    accentLight: '#14B8A6',
    border: '#E7E5E4',
    borderLight: '#F5F5F4',
    error: '#DC2626',
    success: '#16A34A',
  },
  dark: {
    background: '#0C0A09',
    surface: '#1C1917',
    textPrimary: '#FAFAF9',
    textSecondary: '#A8A29E',
    accent: '#2DD4BF',
    accentLight: '#5EEAD4',
    border: '#292524',
    borderLight: '#44403C',
    error: '#EF4444',
    success: '#22C55E',
  },
} as const;

export type ColorScheme = 'light' | 'dark';

export function getColors(scheme: ColorScheme) {
  return colors[scheme];
}
