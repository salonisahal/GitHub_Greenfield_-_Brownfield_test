import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { CollaborationCard as CollaborationCardType } from '../types';

interface CollaborationCardProps {
  card: CollaborationCardType;
  onPress: () => void;
}

export function CollaborationCard({ card, onPress }: CollaborationCardProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
        style={({ pressed }) => [StyleSheet.absoluteFillObject, styles.pressable, pressed && Platform.OS === 'ios' && { opacity: 0.85 }]}
      />
      <View style={styles.content} pointerEvents="none">
        <View style={styles.iconWrap}>
          <MaterialIcons name="auto-awesome" size={s(6)} color={colors.accent} />
        </View>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.subtitle}>{card.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: s(44),
    height: s(32),
    borderRadius: s(3),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
    padding: s(4),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: s(1) },
        shadowOpacity: 0.1,
        shadowRadius: s(2),
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  pressable: {
    borderRadius: s(3),
  },
  content: {
    gap: s(2),
  },
  iconWrap: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  subtitle: {
    fontSize: s(3.2),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.2) * 1.4,
  },
});
