export const colors = {
  primary: '#FACC15',
  primaryDark: '#EAB308',
  primaryLight: '#FEF9C3',
  accent: '#F97316',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#D1D5DB',
  textPrimary: '#111111',
  textSecondary: '#4B5563',
  textDisabled: '#9CA3AF',
  textInverse: '#FFFFFF',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  shadowColor: '#000000',
} as const;

export type Colors = typeof colors;
