import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export type RootStackParamList = {
  Shop: undefined;
  ProductDetails: { id: string };
  NotFound: undefined;
  Discover: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function ShopTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.select({ ios: 83, android: s(15), default: s(15) }),
          paddingBottom: Platform.select({ ios: s(7), android: s(2), default: s(2) }),
          paddingTop: s(2),
          ...Platform.select({ android: { elevation: 8 }, ios: {}, default: {} }),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          fontFamily: 'Inter-Medium',
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Discover: 'compass',
            Wishlist: 'heart',
            Cart: 'cart',
            Orders: 'bag',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          ...Platform.select({ android: { elevation: 4 }, ios: {}, default: {} }),
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontWeight: '600',
          fontSize: 17,
          color: colors.textPrimary,
          letterSpacing: Platform.select({ ios: -0.4, android: 0, default: 0 }),
        } as any,
        headerTintColor: colors.primary,
        headerBackTitleVisible: false,
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="Shop" component={ShopTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
