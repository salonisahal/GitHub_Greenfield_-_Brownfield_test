import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type CategoryPillProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function CategoryPill({ label, selected, onPress }: CategoryPillProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
      style={({ pressed }) => [
        styles.pill,
        selected && styles.pillActive,
        pressed && Platform.OS === 'ios' && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.label, selected && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: s(2),
    paddingHorizontal: s(3),
    borderRadius: s(5),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginRight: s(2),
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-SemiBold',
  },
  labelActive: {
    color: colors.textInverse,
  },
});
