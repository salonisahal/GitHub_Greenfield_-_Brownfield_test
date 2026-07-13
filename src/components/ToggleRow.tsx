import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type ToggleRowProps = {
  label: string;
  description?: string;
  value: boolean;
  onToggle: () => void;
};

export default function ToggleRow({ label, description, value, onToggle }: ToggleRowProps) {
  return (
    <Pressable
      onPress={onToggle}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
      style={({ pressed }) => [styles.row, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
    >
      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={[styles.toggle, value && styles.toggleActive]}>
        <View style={[styles.knob, value && styles.knobActive]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: s(3),
    paddingHorizontal: s(4),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  toggle: {
    width: s(10),
    height: s(6),
    borderRadius: s(3),
    backgroundColor: colors.border,
    padding: s(1),
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  knob: {
    width: s(4),
    height: s(4),
    borderRadius: s(2),
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
  },
  knobActive: {
    alignSelf: 'flex-end',
  },
});
