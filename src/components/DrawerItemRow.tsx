import React from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface DrawerItemRowProps {
  label: string;
  onPress: () => void;
  active?: boolean;
}

export function DrawerItemRow({ label, onPress, active }: DrawerItemRowProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [styles.row, active && styles.active, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: s(3),
    paddingHorizontal: s(4),
    borderRadius: s(2),
  },
  active: {
    backgroundColor: colors.primaryLight,
  },
  label: {
    fontSize: s(3.5),
    fontWeight: '500',
    color: colors.textPrimary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4,
  },
  labelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
