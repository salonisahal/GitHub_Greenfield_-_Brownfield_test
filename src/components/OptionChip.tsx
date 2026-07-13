import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type OptionChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function OptionChip({ label, selected, onPress }: OptionChipProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipActive,
        pressed && Platform.OS === 'ios' && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.label, selected && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: s(2),
    paddingHorizontal: s(3),
    borderRadius: s(2),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginRight: s(2),
    marginBottom: s(2),
    backgroundColor: colors.surface,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
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
    color: colors.primaryDark,
  },
});
