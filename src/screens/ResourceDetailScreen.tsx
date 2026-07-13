import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { resources } from '../data/mockData';
import { RootStackParamList } from '../navigation';

export default function ResourceDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'ResourceDetail'>>();
  const resource = resources.find((item) => item.id === route.params.id);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.category}>{resource?.category ?? 'Resource'}</Text>
        <Text style={styles.title}>{resource?.title ?? 'Resource detail'}</Text>
        <Text style={styles.summary}>{resource?.summary ?? 'Insightful content to power your workflows.'}</Text>
        <Text style={styles.readTime}>{resource?.readTime ?? '5 min'} read</Text>
      </View>
      <View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>Key takeaway</Text>
        <Text style={styles.detailText}>
          Deploy a repeatable engagement system with modern analytics, automation, and customer intelligence.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: s(4),
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  card: {
    padding: s(5),
    borderRadius: s(4),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
    gap: s(2),
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
  category: {
    fontSize: s(3),
    fontWeight: '600',
    color: colors.accent,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.2,
    lineHeight: s(3) * 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
  },
  summary: {
    fontSize: s(3.6),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.6) * 1.4,
  },
  readTime: {
    fontSize: s(3.2),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3.2) * 1.4,
  },
  detailBlock: {
    marginTop: s(6),
    gap: s(2),
  },
  detailTitle: {
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  detailText: {
    fontSize: s(3.4),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.4) * 1.4,
  },
});
