import React from 'react';
import { Pressable, Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export default function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && onActionPress ? (
        <Pressable
          onPress={onActionPress}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
          style={({ pressed }) => [styles.action, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(2),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  action: {
    paddingVertical: s(1),
    paddingHorizontal: s(2),
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.primary,
    fontFamily: 'Inter-SemiBold',
  },
});
