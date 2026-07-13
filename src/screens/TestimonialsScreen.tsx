import React, { useRef, useState } from 'react';
import { View, StyleSheet, Platform, FlatList, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SectionHeader } from '../components/SectionHeader';
import { TestimonialCard } from '../components/TestimonialCard';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { testimonials as testimonialData } from '../data/mockData';
import { Testimonial } from '../types';

export default function TestimonialsScreen() {
  const [testimonials] = useState<Testimonial[]>(testimonialData);
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== undefined) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <SectionHeader title="Testimonials" subtitle="Leaders trust Circle for enterprise engagement." />
      </View>
      <Animated.View entering={FadeInUp.duration(400)} style={styles.carouselWrap}>
        <FlatList
          data={testimonials}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          directionalLockEnabled
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <TestimonialCard testimonial={item} />
            </View>
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          removeClippedSubviews={Platform.OS === 'android'}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </Animated.View>
      <View style={styles.pagination}>
        {testimonials.map((item, index) => (
          <View
            key={`dot-${item.id}`}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  header: {
    paddingHorizontal: s(4),
    paddingTop: s(4),
  },
  carouselWrap: {
    marginTop: s(4),
    height: s(74),
  },
  cardWrap: {
    paddingHorizontal: s(4),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: s(2),
    marginTop: s(4),
  },
  dot: {
    width: s(2),
    height: s(2),
    borderRadius: s(1),
    backgroundColor: colors.border,
  },
  dotActive: {
    width: s(4),
    backgroundColor: colors.accent,
  },
});
