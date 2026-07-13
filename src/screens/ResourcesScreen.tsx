import React, { useState } from 'react';
import { StyleSheet, Platform, FlatList, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SectionHeader } from '../components/SectionHeader';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { resources as resourceData } from '../data/mockData';
import { ResourceItem } from '../types';
import { RootStackParamList } from '../navigation';

export default function ResourcesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DrawerRoot'>>();
  const [resources] = useState<ResourceItem[]>(resourceData);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <SectionHeader title="Resources" subtitle="Thought leadership and playbooks." />
      </View>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ResourceDetail', { id: item.id })}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.resourceCard, pressed && Platform.OS === 'ios' && { opacity: 0.85 }]}
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
            <Text style={styles.readTime}>{item.readTime} read</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={styles.listContent}
      />
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
  listContent: {
    padding: s(4),
  },
  resourceCard: {
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.card,
    borderWidth: s(0.25),
    borderColor: colors.border,
    gap: s(1.5),
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
    fontSize: s(4),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.2,
  },
  summary: {
    fontSize: s(3.3),
    fontWeight: '400',
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: s(3.3) * 1.4,
  },
  readTime: {
    fontSize: s(3),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
  separator: {
    height: s(3),
  },
});
