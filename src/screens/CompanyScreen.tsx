import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SectionHeader } from '../components/SectionHeader';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { companyValues as valueData } from '../data/mockData';
import { CompanyValue } from '../types';

export default function CompanyScreen() {
  const [values] = useState<CompanyValue[]>(valueData);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Company" subtitle="Built for trust, powered by AI." />
        <Text style={styles.description}>
          Circle is a premium engagement platform for fintech and enterprise SaaS teams who demand clarity and speed.
        </Text>
        {values.map((value) => (
          <View key={value.id} style={styles.valueCard}>
            <Text style={styles.valueTitle}>{value.title}</Text>
            <Text style={styles.valueDescription}>{value.description}</Text>
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
  description: {
    marginBottom: s(4),
    fontSize: s(3.6),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.6) * 1.4,
  },
  valueCard: {
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
    marginBottom: s(3),
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
  valueTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  valueDescription: {
    marginTop: s(1),
    fontSize: s(3.3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.3) * 1.4,
  },
});
