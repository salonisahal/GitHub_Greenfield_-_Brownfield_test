import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { SectionHeader } from '../components/SectionHeader';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface Errors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!email.trim() || !email.includes('@')) nextErrors.email = 'Enter a valid email.';
    if (!company.trim()) nextErrors.company = 'Company is required.';
    if (!message.trim()) nextErrors.message = 'Message is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSuccess(true);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrors({});
    setSuccess(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : s(5)}
      >
        <SectionHeader title="Contact" subtitle="Talk to our team in under 24 hours." />
        <InputField label="Name" value={name} placeholder="Your name" onChangeText={setName} error={errors.name} />
        <InputField
          label="Email"
          value={email}
          placeholder="you@company.com"
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />
        <InputField label="Company" value={company} placeholder="Company name" onChangeText={setCompany} error={errors.company} />
        <InputField
          label="Message"
          value={message}
          placeholder="How can we help?"
          onChangeText={setMessage}
          error={errors.message}
          multiline
          numberOfLines={4}
        />
        {success ? <Text style={styles.success}>Thanks! We'll reach out shortly.</Text> : null}
        <View style={styles.actions}>
          <PrimaryButton label="Submit" onPress={handleSubmit} />
          <PrimaryButton label="Reset" onPress={handleReset} variant="secondary" />
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
  actions: {
    marginTop: s(2),
    gap: s(3),
  },
  success: {
    fontSize: s(3.4),
    fontWeight: '500',
    color: colors.success,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3.4) * 1.4,
    marginBottom: s(2),
  },
});
