import React, { useState } from 'react';
import { StyleSheet, Platform, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FeatureCard } from '../components/FeatureCard';
import { SectionHeader } from '../components/SectionHeader';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { features as featureData } from '../data/mockData';
import { Feature } from '../types';
import { RootStackParamList } from '../navigation';

export default function FeaturesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'DrawerRoot'>>();
  const [features] = useState<Feature[]>(featureData);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <SectionHeader title="Features" subtitle="Built for enterprise-grade customer engagement." />
      </View>
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeatureCard feature={item} onPress={() => navigation.navigate('FeatureDetail', { id: item.id })} />
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
  separator: {
    height: s(3),
  },
});
