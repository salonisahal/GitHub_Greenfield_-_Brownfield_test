import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SectionHeader } from '../components/SectionHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { pricingPlans as planData } from '../data/mockData';
import { PricingPlan } from '../types';
import { DrawerParamList } from '../navigation';

export default function PricingScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Pricing'>>();
  const [plans] = useState<PricingPlan[]>(planData);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Pricing" subtitle="Plans that scale with your business." />
        {plans.map((plan) => (
          <View
            key={plan.id}
            style={[styles.planCard, plan.highlight && styles.planHighlight]}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
            </View>
            <View style={styles.featureList}>
              {plan.features.map((feature) => (
                <View key={`${plan.id}-${feature}`} style={styles.featureRow}>
                  <MaterialIcons name="check-circle" size={s(4)} color={colors.accent} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <PrimaryButton
              label={plan.highlight ? 'Start Professional' : 'Choose Plan'}
              onPress={() => navigation.navigate('Contact')}
              variant={plan.highlight ? 'primary' : 'secondary'}
              style={styles.planButton}
            />
          </View>
        ))}
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
    paddingBottom: s(8),
  },
  planCard: {
    marginBottom: s(4),
    padding: s(5),
    borderRadius: s(4),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
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
  planHighlight: {
    borderColor: colors.accent,
    backgroundColor: colors.primaryLight,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  planName: {
    fontSize: s(4.5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(4.5) * 1.2,
  },
  planPrice: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  featureList: {
    marginTop: s(3),
    gap: s(2),
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(2),
  },
  featureText: {
    fontSize: s(3.4),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.4) * 1.4,
  },
  planButton: {
    marginTop: s(4),
  },
});
