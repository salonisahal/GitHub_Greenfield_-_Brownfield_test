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
import { cartSeed, ordersSeed, products } from '../data/mockData';
import { CartItem, Order } from '../types';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HeaderBar from '../components/HeaderBar';
import QuantityStepper from '../components/QuantityStepper';
import PriceRow from '../components/PriceRow';

const CART_STORAGE_KEY = 'shopping_cart';
const ORDERS_STORAGE_KEY = 'shopping_orders';

const storage = {
  getItem: (key: string) => (Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)),
  setItem: (key: string, value: string) =>
    Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = useCallback(async () => {
    const stored = await storage.getItem(CART_STORAGE_KEY);
    setCartItems(stored ? JSON.parse(stored) : cartSeed);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateStorage = async (items: CartItem[]) => {
    setCartItems(items);
    await storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
      .filter((item) => item.quantity > 0);
    updateStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateStorage(updated);
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + product.price * (1 - product.discount) * item.quantity;
    }, 0);
    const shipping = subtotal > 200 ? 0 : 12;
    const discount = subtotal * 0.08;
    const total = subtotal + shipping - discount;
    return { subtotal, shipping, discount, total };
  }, [cartItems]);

  const checkout = async () => {
    if (!cartItems.length) return;
    const storedOrders = await storage.getItem(ORDERS_STORAGE_KEY);
    const existing: Order[] = storedOrders ? JSON.parse(storedOrders) : ordersSeed;
    const newOrder: Order = {
      id: `o-${Date.now()}`,
      items: cartItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          id: `oi-${Date.now()}-${item.id}`,
          productId: item.productId,
          quantity: item.quantity,
          price: product ? product.price : 0,
        };
      }),
      status: 'processing',
      placedAt: new Date().toISOString().slice(0, 10),
      eta: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
      total: totals.total,
      paymentMethod: 'Apple Pay',
      shipping: totals.shipping,
    };
    const updatedOrders = [newOrder, ...existing];
    await storage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    await updateStorage([]);
    Alert.alert('Order placed', 'Your mock order is confirmed.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <HeaderBar title="Shopping Cart" subtitle="Review your selections" />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          const price = product.price * (1 - product.discount);
          return (
            <View style={styles.cartCard}>
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image-outline" size={20} color={colors.textDisabled} />
              </View>
              <View style={styles.cartInfo}>
                <Text style={styles.cartName}>{product.name}</Text>
                <Text style={styles.cartBrand}>{product.brand}</Text>
                <Text style={styles.cartPrice}>${price.toFixed(0)}</Text>
                <QuantityStepper
                  value={item.quantity}
                  onDecrement={() => updateQuantity(item.id, -1)}
                  onIncrement={() => updateQuantity(item.id, 1)}
                />
              </View>
              <Pressable
                onPress={() => removeItem(item.id)}
                android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
                style={({ pressed }) => [styles.removeButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <Ionicons name="trash-outline" size={18} color={colors.error} />
              </Pressable>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListFooterComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <PriceRow label="Subtotal" value={`$${totals.subtotal.toFixed(0)}`} />
            <PriceRow label="Shipping" value={`$${totals.shipping.toFixed(0)}`} />
            <PriceRow label="Discount" value={`-$${totals.discount.toFixed(0)}`} />
            <View style={styles.summaryDivider} />
            <PriceRow label="Total" value={`$${totals.total.toFixed(0)}`} highlight />
            <Pressable
              onPress={checkout}
              android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
              style={({ pressed }) => [styles.checkoutButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={32} color={colors.textDisabled} />
            <Text style={styles.emptyTitle}>Cart is empty</Text>
            <Text style={styles.emptyText}>Browse the latest drops and add items to your bag.</Text>
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
  listContent: {
    paddingHorizontal: s(4),
    paddingBottom: s(6),
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  imagePlaceholder: {
    width: s(16),
    height: s(16),
    borderRadius: s(2),
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(3),
  },
  cartInfo: {
    flex: 1,
  },
  cartName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  cartBrand: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  cartPrice: {
    marginVertical: s(2),
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  removeButton: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  separator: {
    height: s(3),
  },
  summaryCard: {
    marginTop: s(4),
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: s(2),
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: s(2),
  },
  checkoutButton: {
    marginTop: s(3),
    paddingVertical: s(3),
    borderRadius: s(2),
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
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
