import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { categories, products as productSeed, wishlistSeed } from '../data/mockData';
import { RootStackParamList } from '../navigation';
import { Product } from '../types';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';
import CategoryPill from '../components/CategoryPill';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';

const PRODUCT_STORAGE_KEY = 'shopping_products';
const WISHLIST_STORAGE_KEY = 'shopping_wishlist';
const RECENT_SEARCHES_KEY = 'shopping_recent_searches';

const storage = {
  getItem: (key: string) => (Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)),
  setItem: (key: string, value: string) =>
    Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
  deleteItem: (key: string) =>
    Platform.OS === 'web' ? AsyncStorage.removeItem(key) : SecureStore.deleteItemAsync(key),
};

export default function DiscoverScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Shop'>>();
  const [items, setItems] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (offlineMode) {
        throw new Error('You are offline. Connect to the internet to refresh.');
      }
      await new Promise((resolve) => setTimeout(resolve, 700));
      setItems(productSeed);
      const storedWishlist = await storage.getItem(WISHLIST_STORAGE_KEY);
      setWishlistIds(storedWishlist ? JSON.parse(storedWishlist) : wishlistSeed.map((item) => item.productId));
      const storedSearches = await storage.getItem(RECENT_SEARCHES_KEY);
      setRecentSearches(storedSearches ? JSON.parse(storedSearches) : []);
      await storage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(productSeed));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [offlineMode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => (selectedCategory === 'all' ? true : item.categoryId === selectedCategory))
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [items, selectedCategory, searchQuery]);

  const toggleWishlist = async (productId: string) => {
    const updated = wishlistIds.includes(productId)
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId];
    setWishlistIds(updated);
    await storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    Alert.alert('Wishlist updated', wishlistIds.includes(productId) ? 'Removed from wishlist.' : 'Saved to wishlist.');
  };

  const saveSearch = async () => {
    if (!searchQuery.trim()) return;
    const updated = [searchQuery.trim(), ...recentSearches.filter((s) => s !== searchQuery.trim())].slice(0, 6);
    setRecentSearches(updated);
    await storage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const header = (
    <View>
      <HeaderBar title="Discover" subtitle="Curated picks for you" />
      <View style={styles.searchWrap}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} onClear={() => setSearchQuery('')} />
        <Pressable
          onPress={saveSearch}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.saveButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.saveButtonText}>Save Search</Text>
        </Pressable>
      </View>
      {recentSearches.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled
          decelerationRate="fast"
          contentContainerStyle={styles.recentRow}
        >
          {recentSearches.map((term) => (
            <Pressable
              key={term}
              onPress={() => setSearchQuery(term)}
              android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: false }}
              style={({ pressed }) => [styles.recentChip, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={styles.recentText}>{term}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
      <View style={styles.banner}>
        <View style={styles.bannerTextBlock}>
          <Text style={styles.bannerTitle}>Autumn Essentials</Text>
          <Text style={styles.bannerSubtitle}>Up to 30% off statement layers.</Text>
        </View>
        <Ionicons name="sparkles" size={28} color={colors.textInverse} />
      </View>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Offline simulation</Text>
        <Pressable
          onPress={() => setOfflineMode((prev) => !prev)}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.toggleButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.toggleButtonText}>{offlineMode ? 'Disable' : 'Enable'}</Text>
        </Pressable>
      </View>
      <SectionHeader title="Categories" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        decelerationRate="fast"
        contentContainerStyle={styles.categoryRow}
      >
        <CategoryPill label="All" selected={selectedCategory === 'all'} onPress={() => setSelectedCategory('all')} />
        {categories.map((category) => (
          <CategoryPill
            key={category.id}
            label={category.name}
            selected={selectedCategory === category.id}
            onPress={() => setSelectedCategory(category.id)}
          />
        ))}
      </ScrollView>
      <SectionHeader title="Featured" actionLabel="View all" onActionPress={() => Alert.alert('Feature', 'Show full collection')} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        decelerationRate="fast"
        contentContainerStyle={styles.featuredRow}
      >
        {items.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.featuredCardWrap}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
              onActionPress={() => toggleWishlist(item.id)}
              actionActive={wishlistIds.includes(item.id)}
              actionIcon="heart"
            />
          </View>
        ))}
      </ScrollView>
      <SectionHeader title="Trending now" />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <HeaderBar title="Discover" subtitle="Loading curated drops" />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Fetching the latest picks...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <HeaderBar title="Discover" subtitle="Connection required" />
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Unable to refresh</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Pressable
            onPress={loadData}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.retryButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
            onActionPress={() => toggleWishlist(item.id)}
            actionActive={wishlistIds.includes(item.id)}
            actionIcon="heart"
          />
        )}
        ListHeaderComponent={header}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
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
  searchWrap: {
    paddingHorizontal: s(4),
    paddingBottom: s(3),
  },
  saveButton: {
    marginTop: s(2),
    alignSelf: 'flex-start',
    paddingVertical: s(2),
    paddingHorizontal: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
  },
  saveButtonText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.primaryDark,
    fontFamily: 'Inter-SemiBold',
  },
  recentRow: {
    paddingHorizontal: s(4),
    paddingBottom: s(3),
  },
  recentChip: {
    paddingVertical: s(2),
    paddingHorizontal: s(3),
    borderRadius: s(4),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginRight: s(2),
  },
  recentText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  banner: {
    marginHorizontal: s(4),
    marginBottom: s(4),
    borderRadius: s(3),
    backgroundColor: colors.primary,
    padding: s(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTextBlock: {
    flex: 1,
    marginRight: s(2),
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18 * 1.2,
    letterSpacing: -0.5,
    color: colors.textInverse,
    fontFamily: 'Inter-Bold',
  },
  bannerSubtitle: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textInverse,
    fontFamily: 'Inter-Medium',
  },
  toggleRow: {
    paddingHorizontal: s(4),
    marginBottom: s(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  toggleButton: {
    paddingVertical: s(2),
    paddingHorizontal: s(3),
    borderRadius: s(2),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  toggleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-SemiBold',
  },
  categoryRow: {
    paddingHorizontal: s(4),
    paddingBottom: s(4),
  },
  featuredRow: {
    paddingHorizontal: s(4),
    paddingBottom: s(4),
  },
  featuredCardWrap: {
    width: s(36),
    marginRight: s(3),
  },
  listContent: {
    paddingBottom: s(6),
    paddingHorizontal: s(4),
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(6),
  },
  loadingText: {
    marginTop: s(3),
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(6),
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 18 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  errorMessage: {
    marginTop: s(2),
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: s(4),
    paddingVertical: s(3),
    paddingHorizontal: s(6),
    borderRadius: s(2),
    backgroundColor: colors.primary,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
  },
});
