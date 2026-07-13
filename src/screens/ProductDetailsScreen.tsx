import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { products, reviews } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import OptionChip from '../components/OptionChip';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { Product } from '../types';

const CART_STORAGE_KEY = 'shopping_cart';
const WISHLIST_STORAGE_KEY = 'shopping_wishlist';

const storage = {
  getItem: (key: string) => (Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)),
  setItem: (key: string, value: string) =>
    Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
};

export default function ProductDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>>();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const product = products.find((item) => item.id === id) as Product;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const stored = await storage.getItem(WISHLIST_STORAGE_KEY);
      setWishlistIds(stored ? JSON.parse(stored) : []);
    };
    loadWishlist();
  }, []);

  const relatedItems = useMemo(() => products.filter((item) => item.id !== id).slice(0, 3), [id]);
  const productReviews = useMemo(() => reviews.filter((review) => review.productId === id), [id]);

  const addToCart = async () => {
    const stored = await storage.getItem(CART_STORAGE_KEY);
    const cartItems: { id: string; productId: string; quantity: number }[] = stored ? JSON.parse(stored) : [];
    const existing = cartItems.find((item) => item.productId === id);
    let updated;
    if (existing) {
      updated = cartItems.map((item) => (item.productId === id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      updated = [...cartItems, { id: `ci-${Date.now()}`, productId: id, quantity: 1 }];
    }
    await storage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    Alert.alert('Added to Cart', 'This item is ready for checkout.');
  };

  const toggleWishlist = async (productId: string) => {
    const stored = await storage.getItem(WISHLIST_STORAGE_KEY);
    const ids = stored ? (JSON.parse(stored) as string[]) : [];
    const updated = ids.includes(productId) ? ids.filter((item) => item !== productId) : [...ids, productId];
    setWishlistIds(updated);
    await storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
  };

  const price = product.price * (1 - product.discount);
  const discountLabel = `${Math.round(product.discount * 100)}% off`;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <FlatList
        data={productReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewAuthor}>{item.author}</Text>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={14} color={colors.accent} />
                <Text style={styles.reviewScore}>{item.rating.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.reviewComment}>{item.comment}</Text>
            <Text style={styles.reviewDate}>{item.date}</Text>
          </View>
        )}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <Pressable
                onPress={() => navigation.goBack()}
                android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
                style={({ pressed }) => [styles.backButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <Ionicons name="chevron-back" size={18} color={colors.textPrimary} />
              </Pressable>
              <Pressable
                onPress={() => toggleWishlist(id)}
                android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
                style={({ pressed }) => [styles.favoriteButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <Ionicons
                  name={wishlistIds.includes(id) ? 'heart' : 'heart-outline'}
                  size={18}
                  color={wishlistIds.includes(id) ? colors.error : colors.textPrimary}
                />
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled
              decelerationRate="fast"
              contentContainerStyle={styles.galleryRow}
            >
              {Array.from({ length: product.imageCount }).map((_, index) => (
                <View key={`img-${index}`} style={styles.galleryItem}>
                  <Ionicons name="image-outline" size={24} color={colors.textDisabled} />
                </View>
              ))}
            </ScrollView>
            <View style={styles.content}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.title}>{product.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color={colors.accent} />
                <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
                <Text style={styles.ratingCount}>({product.reviewCount} reviews)</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${price.toFixed(0)}</Text>
                <Text style={styles.original}>${product.price.toFixed(0)}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{discountLabel}</Text>
                </View>
              </View>
              <Text style={styles.description}>{product.description}</Text>
              <SectionHeader title="Colors" />
              <View style={styles.colorRow}>
                {product.colors.map((color) => (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
                    style={({ pressed }) => [
                      styles.colorSwatch,
                      { backgroundColor: color },
                      selectedColor === color && styles.colorSelected,
                      pressed && Platform.OS === 'ios' && { opacity: 0.7 },
                    ]}
                  />
                ))}
              </View>
              <SectionHeader title="Sizes" />
              <View style={styles.sizeRow}>
                {product.sizes.map((size) => (
                  <OptionChip key={size} label={size} selected={selectedSize === size} onPress={() => setSelectedSize(size)} />
                ))}
              </View>
              <SectionHeader title="Specifications" />
              {product.specs.map((spec) => (
                <View key={spec} style={styles.specRow}>
                  <Ionicons name="checkmark-circle" size={14} color={colors.success} />
                  <Text style={styles.specText}>{spec}</Text>
                </View>
              ))}
              <SectionHeader title="Related" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled
                decelerationRate="fast"
                contentContainerStyle={styles.relatedRow}
              >
                {relatedItems.map((item) => (
                  <View key={item.id} style={styles.relatedCard}>
                    <ProductCard
                      product={item}
                      onPress={() => navigation.push('ProductDetails', { id: item.id })}
                      onActionPress={() => toggleWishlist(item.id)}
                      actionIcon="heart"
                      actionActive={wishlistIds.includes(item.id)}
                    />
                  </View>
                ))}
              </ScrollView>
              <SectionHeader title="Customer reviews" />
            </View>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListFooterComponent={<View style={styles.footerSpace} />}
      />
      <View style={styles.ctaBar}>
        <Pressable
          onPress={() => toggleWishlist(id)}
          android_ripple={{ color: 'rgba(0,0,0,0.12)', borderless: false }}
          style={({ pressed }) => [styles.saveButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name="heart" size={16} color={colors.error} />
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={addToCart}
          android_ripple={{ color: 'rgba(0,0,0,0.12)', borderless: false }}
          style={({ pressed }) => [styles.cartButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.cartText}>Add to Cart</Text>
        </Pressable>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(4),
    paddingTop: s(2),
  },
  backButton: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  favoriteButton: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  galleryRow: {
    paddingHorizontal: s(4),
    paddingVertical: s(4),
  },
  galleryItem: {
    width: s(32),
    height: s(32),
    borderRadius: s(3),
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(3),
  },
  content: {
    paddingHorizontal: s(4),
  },
  brand: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 1.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
  },
  title: {
    marginTop: s(1),
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 22 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(2),
  },
  ratingText: {
    marginLeft: s(1),
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  ratingCount: {
    marginLeft: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(3),
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20 * 1.2,
    letterSpacing: -0.5,
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  original: {
    marginLeft: s(2),
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textDisabled,
    fontFamily: 'Inter-Medium',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    marginLeft: s(2),
    paddingHorizontal: s(2),
    paddingVertical: s(1),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 11 * 1.4,
    letterSpacing: 0.2,
    color: colors.primaryDark,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    marginTop: s(3),
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: s(2),
  },
  colorSwatch: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    marginRight: s(2),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  colorSelected: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textPrimary,
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: s(2),
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(2),
  },
  specText: {
    marginLeft: s(2),
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  relatedRow: {
    paddingVertical: s(2),
  },
  relatedCard: {
    width: s(34),
    marginRight: s(3),
  },
  reviewCard: {
    marginHorizontal: s(4),
    marginBottom: s(3),
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewScore: {
    marginLeft: s(1),
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  reviewComment: {
    marginTop: s(2),
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  reviewDate: {
    marginTop: s(2),
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 11 * 1.4,
    letterSpacing: 0.2,
    color: colors.textDisabled,
    fontFamily: 'Inter-Medium',
  },
  listContent: {
    paddingBottom: s(14),
  },
  footerSpace: {
    height: s(12),
  },
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(4),
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: s(3),
    paddingHorizontal: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primaryLight,
    marginRight: s(3),
  },
  saveText: {
    marginLeft: s(2),
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.primaryDark,
    fontFamily: 'Inter-SemiBold',
  },
  cartButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
  },
  cartText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
  },
});
