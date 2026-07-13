import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type QuantityStepperProps = {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function QuantityStepper({ value, onDecrement, onIncrement }: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrement}
        android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
        style={({ pressed }) => [styles.button, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
      >
        <Ionicons name="remove" size={16} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        onPress={onIncrement}
        android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
        style={({ pressed }) => [styles.button, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
      >
        <Ionicons name="add" size={16} color={colors.textPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: s(2),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingHorizontal: s(2),
    paddingVertical: s(1),
  },
  button: {
    width: s(6),
    height: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginHorizontal: s(2),
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
});
