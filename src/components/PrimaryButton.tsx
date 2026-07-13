import React from 'react';
import { Text, Pressable, StyleSheet, Platform, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary';
}

export function PrimaryButton({ label, onPress, style, variant = 'primary' }: PrimaryButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const backgroundColor = variant === 'primary' ? colors.accent : colors.surface;
  const textColor = variant === 'primary' ? colors.textInverse : colors.textPrimary;
  const borderColor = variant === 'primary' ? colors.accent : colors.border;

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withTiming(0.98, { duration: 120 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 120 });
      }}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
      style={({ pressed }) => [styles.pressable, pressed && Platform.OS === 'ios' && { opacity: 0.8 }, style]}
    >
      <Animated.View style={[styles.container, { backgroundColor, borderColor }, animatedStyle]}>
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: s(2),
  },
  container: {
    paddingVertical: s(3),
    paddingHorizontal: s(6),
    borderRadius: s(2),
    borderWidth: s(0.25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: s(4),
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
  },
});
