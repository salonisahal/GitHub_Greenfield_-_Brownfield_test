import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps, useDrawerProgress } from '@react-navigation/drawer';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HomeScreen from '../screens/HomeScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import FeatureDetailScreen from '../screens/FeatureDetailScreen';
import TestimonialsScreen from '../screens/TestimonialsScreen';
import PricingScreen from '../screens/PricingScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ResourceDetailScreen from '../screens/ResourceDetailScreen';
import CompanyScreen from '../screens/CompanyScreen';
import ContactScreen from '../screens/ContactScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { DrawerItemRow } from '../components/DrawerItemRow';

export type DrawerParamList = {
  Home: undefined;
  Features: undefined;
  Pricing: undefined;
  Testimonials: undefined;
  Resources: undefined;
  Company: undefined;
  Contact: undefined;
  Login: undefined;
};

export type RootStackParamList = {
  DrawerRoot: undefined;
  FeatureDetail: { id: string };
  ResourceDetail: { id: string };
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const progress = useDrawerProgress();
  const drawerOffset = s(2);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * drawerOffset }],
  }));

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <Animated.View style={[styles.drawerHeader, animatedStyle]}>
        <Text style={styles.drawerTitle}>Circle</Text>
        <Text style={styles.drawerSubtitle}>Premium SaaS</Text>
      </Animated.View>
      <View style={styles.drawerItems}>
        {([
          { label: 'Home', route: 'Home' },
          { label: 'Features', route: 'Features' },
          { label: 'Pricing', route: 'Pricing' },
          { label: 'Testimonials', route: 'Testimonials' },
          { label: 'Resources', route: 'Resources' },
          { label: 'Company', route: 'Company' },
          { label: 'Contact', route: 'Contact' },
          { label: 'Login', route: 'Login' },
        ] as const).map((item) => (
          <DrawerItemRow
            key={item.route}
            label={item.label}
            onPress={() => props.navigation.navigate(item.route)}
            active={props.state.routeNames[props.state.index] === item.route}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: colors.surface,
          width: s(64),
        },
        overlayColor: 'rgba(17,17,17,0.2)',
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Features" component={FeaturesScreen} />
      <Drawer.Screen name="Pricing" component={PricingScreen} />
      <Drawer.Screen name="Testimonials" component={TestimonialsScreen} />
      <Drawer.Screen name="Resources" component={ResourcesScreen} />
      <Drawer.Screen name="Company" component={CompanyScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DrawerRoot"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
          ...Platform.select({ android: { elevation: 4 }, ios: {}, default: {} }),
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontWeight: '600',
          fontSize: s(4.25),
          color: colors.textPrimary,
          letterSpacing: Platform.select({ ios: -0.4, android: 0, default: 0 }),
        } as any,
        headerTintColor: colors.accent,
        headerBackTitleVisible: false,
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="DrawerRoot" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="FeatureDetail" component={FeatureDetailScreen} options={{ title: 'Feature' }} />
      <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} options={{ title: 'Resource' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Not Found' }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: s(6),
    paddingHorizontal: s(3),
  },
  drawerHeader: {
    paddingHorizontal: s(4),
    paddingBottom: s(4),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  drawerTitle: {
    fontSize: s(5),
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: s(5) * 1.2,
  },
  drawerSubtitle: {
    marginTop: s(1),
    fontSize: s(3.2),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3.2) * 1.4,
  },
  drawerItems: {
    marginTop: s(4),
    gap: s(1),
  },
});
