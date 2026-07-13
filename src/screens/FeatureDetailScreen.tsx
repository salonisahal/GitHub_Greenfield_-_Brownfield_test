import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { features } from '../data/mockData';
import { RootStackParamList } from '../navigation';

export default function FeatureDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'FeatureDetail'>>();
  const feature = features.find((item) => item.id === route.params.id);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <MaterialIcons name={(feature?.icon ?? 'insights') as keyof typeof MaterialIcons.glyphMap} size={s(8)} color={colors.accent} />
        </View>
        <Text style={styles.title}>{feature?.title ?? 'Feature'}</Text>
        <Text style={styles.description}>{feature?.description ?? 'Feature details are loading.'}</Text>
      </View>
      <View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>What you get</Text>
        <Text style={styles.detailText}>
          Real-time insights, polished exports, and trusted automation workflows tailored to high-growth SaaS teams.
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
    gap: s(3),
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
  iconWrap: {
    width: s(14),
    height: s(14),
    borderRadius: s(7),
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
  },
  description: {
    fontSize: s(3.8),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.8) * 1.4,
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
