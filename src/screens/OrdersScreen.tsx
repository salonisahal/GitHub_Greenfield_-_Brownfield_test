import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { ordersSeed, products } from '../data/mockData';
import { CartItem, Order } from '../types';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HeaderBar from '../components/HeaderBar';

const ORDERS_STORAGE_KEY = 'shopping_orders';
const CART_STORAGE_KEY = 'shopping_cart';

const storage = {
  getItem: (key: string) => (Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)),
  setItem: (key: string, value: string) =>
    Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const stored = await storage.getItem(ORDERS_STORAGE_KEY);
      setOrders(stored ? JSON.parse(stored) : ordersSeed);
    } catch (err) {
      setError('Unable to fetch orders. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, [loadOrders]);

  const buyAgain = async (order: Order) => {
    const stored = await storage.getItem(CART_STORAGE_KEY);
    const existing: CartItem[] = stored ? JSON.parse(stored) : [];
    const updated = [...existing];
    order.items.forEach((item) => {
      const found = updated.find((cart) => cart.productId === item.productId);
      if (found) {
        found.quantity += item.quantity;
      } else {
        updated.push({ id: `ci-${Date.now()}-${item.productId}`, productId: item.productId, quantity: item.quantity });
      }
    });
    await storage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    Alert.alert('Cart updated', 'Items from this order were added to your cart.');
  };

  const statusLabel = useMemo(() => {
    return {
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <HeaderBar title="Orders" subtitle="Fetching your history" />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Preparing your timeline...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <HeaderBar title="Orders" subtitle="Connection issue" />
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            onPress={loadOrders}
            android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
            style={({ pressed }) => [styles.retryButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <HeaderBar title="Orders" subtitle="Your purchase history" />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const itemsCount = item.items.reduce((sum, orderItem) => sum + orderItem.quantity, 0);
          const heroProduct = products.find((p) => p.id === item.items[0]?.productId);
          return (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>Order {item.id.toUpperCase()}</Text>
                  <Text style={styles.orderDate}>Placed {item.placedAt}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{statusLabel[item.status]}</Text>
                </View>
              </View>
              <View style={styles.orderBody}>
                <View style={styles.orderImage}>
                  <Ionicons name="image-outline" size={20} color={colors.textDisabled} />
                </View>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderProduct}>{heroProduct?.name ?? 'Premium bundle'}</Text>
                  <Text style={styles.orderMeta}>{itemsCount} items • {item.paymentMethod}</Text>
                  <Text style={styles.orderTotal}>${item.total.toFixed(0)}</Text>
                  <Text style={styles.orderProgress}>Delivery ETA: {item.eta}</Text>
                </View>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Shipping</Text>
                <Text style={styles.paymentValue}>${item.shipping.toFixed(0)}</Text>
              </View>
              <Pressable
                onPress={() => buyAgain(item)}
                android_ripple={{ color: 'rgba(0,0,0,0.12)' }}
                style={({ pressed }) => [styles.buyAgainButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
              >
                <Text style={styles.buyAgainText}>Buy Again</Text>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="bag-outline" size={32} color={colors.textDisabled} />
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptyText}>Complete a mock checkout to see order history.</Text>
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
  orderCard: {
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  orderDate: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  statusBadge: {
    paddingHorizontal: s(3),
    paddingVertical: s(1),
    borderRadius: s(4),
    backgroundColor: colors.primaryLight,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 11 * 1.4,
    letterSpacing: 0.2,
    color: colors.primaryDark,
    fontFamily: 'Inter-SemiBold',
  },
  orderBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(3),
  },
  orderImage: {
    width: s(14),
    height: s(14),
    borderRadius: s(2),
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(3),
  },
  orderInfo: {
    flex: 1,
  },
  orderProduct: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  orderMeta: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  orderTotal: {
    marginTop: s(2),
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.primary,
    fontFamily: 'Inter-Bold',
  },
  orderProgress: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(3),
  },
  paymentLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  paymentValue: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  buyAgainButton: {
    marginTop: s(3),
    paddingVertical: s(2),
    borderRadius: s(2),
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  buyAgainText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textInverse,
    fontFamily: 'Inter-SemiBold',
  },
  separator: {
    height: s(3),
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
  errorText: {
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
  retryText: {
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
