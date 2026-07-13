import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface HeaderBarProps {
  title: string;
  onMenuPress: () => void;
}

export function HeaderBar({ title, onMenuPress }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onMenuPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={({ pressed }) => [styles.menuButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        hitSlop={{ top: s(2), bottom: s(2), left: s(2), right: s(2) }}
      >
        <Ionicons name="menu" size={s(6)} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: s(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(4),
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: s(1) },
        shadowOpacity: 0.08,
        shadowRadius: s(2),
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  menuButton: {
    height: s(10),
    width: s(10),
    borderRadius: s(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
  },
  placeholder: {
    width: s(10),
    height: s(10),
  },
});
