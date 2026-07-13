import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SectionHeader } from '../components/SectionHeader';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';
import { DrawerParamList } from '../navigation';

interface Errors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList, 'Login'>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [googleMessage, setGoogleMessage] = useState('');

  const handleLogin = () => {
    const nextErrors: Errors = {};
    if (!email.trim() || !email.includes('@')) nextErrors.email = 'Enter a valid email.';
    if (!password.trim()) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : s(5)}
      >
        <SectionHeader title="Login" subtitle="Welcome back to Circle." />
        <InputField
          label="Email"
          value={email}
          placeholder="you@company.com"
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />
        <InputField
          label="Password"
          value={password}
          placeholder="Your password"
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />
        <Pressable
          onPress={() => navigation.navigate('Contact')}
          android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
          style={({ pressed }) => [styles.forgot, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>
        {googleMessage ? <Text style={styles.helper}>{googleMessage}</Text> : null}
        <View style={styles.actions}>
          <PrimaryButton label="Login" onPress={handleLogin} />
          <PrimaryButton
            label="Sign in with Google"
            onPress={() => setGoogleMessage('Google sign-in is available for enterprise accounts.')}
            variant="secondary"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    padding: s(4),
    ...(Platform.OS === 'web' ? { overflow: 'hidden' as any, maxHeight: '100vh' as any } : {}),
  },
  keyboard: {
    flex: 1,
  },
  forgot: {
    alignSelf: 'flex-start',
    paddingVertical: s(2),
  },
  forgotText: {
    fontSize: s(3.2),
    fontWeight: '600',
    color: colors.accent,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3.2) * 1.4,
  },
  helper: {
    fontSize: s(3.2),
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3.2) * 1.4,
    marginTop: s(2),
  },
  actions: {
    marginTop: s(2),
    gap: s(3),
  },
});
