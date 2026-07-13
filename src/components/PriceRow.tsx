import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type PriceRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export default function PriceRow({ label, value, highlight }: PriceRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, highlight && styles.labelHighlight]}>{label}</Text>
      <Text style={[styles.value, highlight && styles.valueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: s(1),
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  labelHighlight: {
    color: colors.textPrimary,
  },
  valueHighlight: {
    color: colors.primary,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
});
