import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { addresses, userProfile } from '../data/mockData';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import HeaderBar from '../components/HeaderBar';
import OptionChip from '../components/OptionChip';
import SettingRow from '../components/SettingRow';
import ToggleRow from '../components/ToggleRow';

const PROFILE_STORAGE_KEY = 'shopping_profile_settings';

const storage = {
  getItem: (key: string) => (Platform.OS === 'web' ? AsyncStorage.getItem(key) : SecureStore.getItemAsync(key)),
  setItem: (key: string, value: string) =>
    Platform.OS === 'web' ? AsyncStorage.setItem(key, value) : SecureStore.setItemAsync(key, value),
};

export default function ProfileScreen() {
  const [appearance, setAppearance] = useState(userProfile.appearance);
  const [notificationsEnabled, setNotificationsEnabled] = useState(userProfile.notificationsEnabled);
  const [privacyMode, setPrivacyMode] = useState(userProfile.privacyMode);

  const loadSettings = useCallback(async () => {
    const stored = await storage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as {
        appearance: typeof appearance;
        notificationsEnabled: boolean;
        privacyMode: boolean;
      };
      setAppearance(parsed.appearance);
      setNotificationsEnabled(parsed.notificationsEnabled);
      setPrivacyMode(parsed.privacyMode);
    }
  }, [appearance]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const persist = async (next: { appearance: typeof appearance; notificationsEnabled: boolean; privacyMode: boolean }) => {
    await storage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
  };

  const updateAppearance = async (value: typeof appearance) => {
    setAppearance(value);
    await persist({ appearance: value, notificationsEnabled, privacyMode });
  };

  const toggleNotifications = async () => {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    await persist({ appearance, notificationsEnabled: next, privacyMode });
  };

  const togglePrivacy = async () => {
    const next = !privacyMode;
    setPrivacyMode(next);
    await persist({ appearance, notificationsEnabled, privacyMode: next });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <HeaderBar title="Profile" subtitle="Account & preferences" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color={colors.textInverse} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileMeta}>{userProfile.email}</Text>
            <Text style={styles.profileMeta}>{userProfile.phone}</Text>
          </View>
          <Pressable
            onPress={() => Alert.alert('Edit profile', 'Profile editing is simulated in this demo.')}
            android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
            style={({ pressed }) => [styles.editButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
          >
            <Ionicons name="create-outline" size={16} color={colors.primary} />
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved addresses</Text>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <Text style={styles.addressLabel}>{address.label}</Text>
              <Text style={styles.addressLine}>{address.line1}</Text>
              <Text style={styles.addressLine}>
                {address.city}, {address.state} {address.zip}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.appearanceRow}>
            <OptionChip label="System" selected={appearance === 'system'} onPress={() => updateAppearance('system')} />
            <OptionChip label="Light" selected={appearance === 'light'} onPress={() => updateAppearance('light')} />
            <OptionChip label="Dark" selected={appearance === 'dark'} onPress={() => updateAppearance('dark')} />
          </View>
        </View>
        <View style={styles.sectionGroup}>
          <ToggleRow
            label="Notifications"
            description="Order updates and restock alerts"
            value={notificationsEnabled}
            onToggle={toggleNotifications}
          />
          <ToggleRow
            label="Privacy Mode"
            description="Hide product recommendations"
            value={privacyMode}
            onToggle={togglePrivacy}
          />
        </View>
        <View style={styles.sectionGroup}>
          <SettingRow
            label="About Calculator IPA"
            value="Version 1.0"
            icon="information-circle"
            onPress={() => Alert.alert('About', 'Calculator IPA is a demo shopping experience.')}
          />
          <SettingRow
            label="Support"
            value="Help center"
            icon="chatbubble-ellipses"
            onPress={() => Alert.alert('Support', 'Support is simulated for this demo.')}
          />
          <SettingRow
            label="Legal"
            value="Privacy & Terms"
            icon="document-text"
            onPress={() => Alert.alert('Legal', 'Review the demo privacy and terms summary.')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  content: {
    paddingHorizontal: s(4),
    paddingBottom: s(8),
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: s(4),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginBottom: s(4),
  },
  avatar: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(3),
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
  },
  profileMeta: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  editButton: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  section: {
    marginBottom: s(4),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16 * 1.2,
    letterSpacing: -0.5,
    color: colors.textPrimary,
    fontFamily: 'Inter-Bold',
    marginBottom: s(2),
  },
  addressCard: {
    padding: s(3),
    borderRadius: s(3),
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    marginBottom: s(2),
  },
  addressLabel: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 13 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
  },
  addressLine: {
    marginTop: s(1),
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 12 * 1.4,
    letterSpacing: 0.2,
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
  },
  appearanceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sectionGroup: {
    marginBottom: s(4),
    borderRadius: s(3),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});
