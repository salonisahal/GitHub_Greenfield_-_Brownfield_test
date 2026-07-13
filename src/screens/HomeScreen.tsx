import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { collaborationCards } from '../data/mockData';
import { HeaderBar } from '../components/HeaderBar';
import { PrimaryButton } from '../components/PrimaryButton';
import { CollaborationCard } from '../components/CollaborationCard';
import { SectionHeader } from '../components/SectionHeader';
import { DrawerParamList } from '../navigation';

export default function HomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Home'>>();
  const floatValue = useSharedValue(0);
  const floatDistance = s(2);

  useEffect(() => {
    floatValue.value = withRepeat(withTiming(1, { duration: 2400 }), -1, true);
  }, [floatValue]);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatValue.value * -floatDistance }],
  }));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <HeaderBar title="Circle" onMenuPress={() => navigation.openDrawer()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(500)} style={styles.heroBlock}>
          <Text style={styles.heroTitle}>A powerful online engagement tool that's intuitive and simple to use.</Text>
          <Text style={styles.heroSubtitle}>
            With stellar one-click reports and unmatched support, see how Circle can make a difference in your business.
          </Text>
          <PrimaryButton label="Get Started Free" onPress={() => navigation.navigate('Pricing')} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.glowWrap}>
          <Animated.View style={[styles.glow, floatingStyle]} />
        </Animated.View>

        <SectionHeader title="Collaboration lanes" subtitle="Fast, secure, and designed for modern teams." />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled
          decelerationRate="fast"
          contentContainerStyle={styles.horizontalScroll}
        >
          {collaborationCards.map((card) => (
            <Animated.View key={card.id} entering={FadeInUp.delay(300).duration(500)} style={floatingStyle}>
              <CollaborationCard card={card} onPress={() => navigation.navigate('Features')} />
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.sectionSpacing} />
        <SectionHeader title="Why Circle" subtitle="Premium tooling to engage, retain, and grow." />
        <View style={styles.highlights}>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>99.99% uptime</Text>
            <Text style={styles.highlightText}>Enterprise-grade infrastructure backed by 24/7 monitoring.</Text>
          </View>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>50B+ signals</Text>
            <Text style={styles.highlightText}>AI models trained on trusted engagement datasets.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  content: {
    padding: s(4),
    paddingBottom: s(10),
  },
  heroBlock: {
    gap: s(3),
    marginBottom: s(8),
  },
  heroTitle: {
    fontSize: s(6),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(6) * 1.2,
  },
  heroSubtitle: {
    fontSize: s(3.8),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.8) * 1.4,
  },
  glowWrap: {
    height: s(8),
    marginBottom: s(4),
  },
  glow: {
    height: s(6),
    borderRadius: s(3),
    backgroundColor: colors.primaryLight,
    opacity: 0.6,
  },
  horizontalScroll: {
    paddingBottom: s(4),
    gap: s(3),
  },
  sectionSpacing: {
    height: s(6),
  },
  highlights: {
    flexDirection: 'row',
    gap: s(3),
  },
  highlightCard: {
    flex: 1,
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
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
  highlightTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  highlightText: {
    marginTop: s(1),
    fontSize: s(3.2),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.2) * 1.4,
  },
});
