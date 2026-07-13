import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index < testimonial.rating);
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={s(5)} color={colors.textInverse} />
      </View>
      <Text style={styles.name}>{testimonial.name}</Text>
      <Text style={styles.company}>{testimonial.company}</Text>
      <View style={styles.stars}>
        {stars.map((filled, index) => (
          <Ionicons
            key={`star-${testimonial.id}-${index}`}
            name={filled ? 'star' : 'star-outline'}
            size={s(4)}
            color={colors.primary}
          />
        ))}
      </View>
      <Text style={styles.review}>{testimonial.review}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: s(72),
    padding: s(5),
    borderRadius: s(4),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: s(1) },
        shadowOpacity: 0.1,
        shadowRadius: s(3),
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  avatar: {
    width: s(12),
    height: s(12),
    borderRadius: s(6),
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(3),
  },
  name: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  company: {
    marginTop: s(1),
    fontSize: s(3.5),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4,
  },
  stars: {
    flexDirection: 'row',
    gap: s(1),
    marginTop: s(2),
  },
  review: {
    marginTop: s(3),
    fontSize: s(3.5),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4,
  },
});
