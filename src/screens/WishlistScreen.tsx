import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { cartSeed, products, wishlistSeed } from '../data/mockData';
import { CartItem, WishlistItem } from '../types';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HeaderBar from '../components/HeaderBar';
import SearchBar from '../components/SearchBar';

const WISHLIST_STORAGE_KEY = 'shopping_wishlist';
const CART_STORAGE_KEY = 'shopping_cart';

const storage = {
  getItem: (key: string) => (Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)),
  setItem: (key: string, value: string) =>
    Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
};

export default function WishlistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Wishlist'>>();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadWishlist = useCallback(async () => {
    const stored = await storage.getItem(WISHLIST_STORAGE_KEY);
    const ids = stored ? (JSON.parse(stored) as string[]) : wishlistSeed.map((item) => item.productId);
    const items = ids.map((id) => ({ id: `w-${id}`, productId: id, addedAt: new Date().toISOString() }));
    setWishlist(items);
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const saveWishlist = async (items: WishlistItem[]) => {
    setWishlist(items);
    await storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items.map((item) => item.productId)));
  };

  const filteredWishlist = useMemo(() => {
    return wishlist.filter((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return false;
      const query = searchQuery.toLowerCase();
      return product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query);
    });
  }, [wishlist, searchQuery]);

  const removeItem = (productId: string) => {
    const updated = wishlist.filter((item) => item.productId !== productId);
    saveWishlist(updated);
  };

  const moveToCart = async (productId: string) => {
    const stored = await storage.getItem(CART_STORAGE_KEY);
    const existing: CartItem[] = stored ? JSON.parse(stored) : cartSeed;
    const found = existing.find((item) => item.productId === productId);
    const updated = found
      ? existing.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item))
      : [...existing, { id: `ci-${Date.now()}`, productId, quantity: 1 }];
    await storage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    removeItem(productId);
    Alert.alert('Added to Cart', 'The item was moved to your cart.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <HeaderBar title="Wishlist" subtitle="Saved for later" />
      <View style={styles.searchWrap}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} onClear={() => setSearchQuery('')} />
      </View>
      <FlatList
        data={filteredWishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          const price = product.price * (1 - product.discount);
          return (
            <View style={styles.card}>
              <Pressable
                onPress={() => navigation.navigate('ProductDetails', { id: product.id })}
                android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
                style={StyleSheet.absoluteFillObject}
              />
              <View pointerEvents="none" style={styles.cardContent}>
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={20} color={colors.textDisabled} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{product.name}</Text>
                  <Text style={styles.cardBrand}>{product.brand}</Text>
                  <Text style={styles.cardPrice}>${price.toFixed(0)}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => moveToCart(product.id)}
                android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
                style={({ pressed }) => [styles.moveButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <Text style={styles.moveButtonText}>Move to Cart</Text>
              </Pressable>
              <Pressable
                onPress={() => removeItem(product.id)}
                android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
                style={({ pressed }) => [styles.removeButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <Ionicons name="close" size={16} color={colors.textSecondary} />
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={32} color={colors.textDisabled} />
            <Text style={styles.emptyTitle}>No saved items</Text>
            <Text style={styles.emptyText}>Tap the heart icon to save products for later.</Text>
          </View>
        }
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
  listContent: {
    paddingHorizontal: s(4),
    paddingBottom: s(6),
  },
  card: {
    borderRadius: s(3),
    backgroundColor: colors.surface,
    padding: s(3),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: s(14),
    height: s(14),
    borderRadius: s(2),
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(3),
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  cardBrand: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  cardPrice: {
    marginTop: s(2),
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  moveButton: {
    marginTop: s(3),
    paddingVertical: s(2),
    borderRadius: s(2),
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  moveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
  },
  removeButton: {
    position: 'absolute',
    top: s(2),
    right: s(2),
    width: s(6),
    height: s(6),
    borderRadius: s(3),
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: s(3),
  },
  emptyState: {
    padding: s(6),
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: s(3),
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  emptyText: {
    marginTop: s(2),
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});
