import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { Product } from '../types';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  onActionPress?: () => void;
  actionActive?: boolean;
  actionIcon?: keyof typeof Ionicons.glyphMap;
};

export default function ProductCard({ product, onPress, onActionPress, actionActive, actionIcon }: ProductCardProps) {
  const price = product.price * (1 - product.discount);
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
        style={StyleSheet.absoluteFillObject}
      />
      <View pointerEvents="none" style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={24} color={colors.textDisabled} />
        </View>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${price.toFixed(0)}</Text>
          <Text style={styles.original}>${product.price.toFixed(0)}</Text>
        </View>
      </View>
      {onActionPress && actionIcon ? (
        <Pressable
          onPress={onActionPress}
          hitSlop={{ top: s(2), bottom: s(2), left: s(2), right: s(2) }}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
          style={({ pressed }) => [styles.actionButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name={actionIcon} size={18} color={actionActive ? colors.error : colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: s(3),
    backgroundColor: colors.card,
    padding: s(3),
    marginBottom: s(3),
    minHeight: s(26),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  content: {
    flex: 1,
  },
  imagePlaceholder: {
    height: s(18),
    borderRadius: s(2),
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(3),
  },
  brand: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 1.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  name: {
    marginTop: s(1),
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  priceRow: {
    marginTop: s(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 15 * 1.4,
    letterSpacing: 0.2,
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  original: {
    marginLeft: s(2),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textDisabled,
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'line-through',
  },
  actionButton: {
    position: 'absolute',
    top: s(3),
    right: s(3),
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
});
