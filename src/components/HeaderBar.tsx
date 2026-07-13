import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type HeaderBarProps = {
  title: string;
  subtitle?: string;
  onActionPress?: () => void;
  actionIcon?: keyof typeof Ionicons.glyphMap;
};

export default function HeaderBar({ title, subtitle, onActionPress, actionIcon }: HeaderBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {onActionPress && actionIcon ? (
        <Pressable
          onPress={onActionPress}
          hitSlop={{ top: s(2), bottom: s(2), left: s(2), right: s(2) }}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
          style={({ pressed }) => [styles.iconButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name={actionIcon} size={20} color={colors.textPrimary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(4),
    paddingTop: s(4),
    paddingBottom: s(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    marginTop: s(1),
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-SemiBold',
  },
  iconButton: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
