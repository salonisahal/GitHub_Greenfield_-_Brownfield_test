import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
  onPress: () => void;
}

export function FeatureCard({ feature, onPress }: FeatureCardProps) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [styles.card, pressed && Platform.OS === 'ios' && { opacity: 0.85 }]}
    >
      <View style={styles.iconWrap}>
        <MaterialIcons name={feature.icon as keyof typeof MaterialIcons.glyphMap} size={s(6)} color={colors.accent} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{feature.title}</Text>
        <Text style={styles.description}>{feature.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
    alignItems: 'center',
    gap: s(3),
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: s(1) },
        shadowOpacity: 0.08,
        shadowRadius: s(2),
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  iconWrap: {
    width: s(12),
    height: s(12),
    borderRadius: s(6),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: s(4.5),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4.5) * 1.2,
  },
  description: {
    marginTop: s(1),
    fontSize: s(3.5),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4,
  },
});
