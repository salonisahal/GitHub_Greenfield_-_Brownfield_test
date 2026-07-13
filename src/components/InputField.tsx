import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
}

export function InputField({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  multiline,
  numberOfLines,
  error,
}: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor={colors.textDisabled}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        underlineColorAndroid="transparent"
        selectionColor={colors.accent}
        style={[styles.input, multiline ? styles.multiline : undefined, error ? styles.inputError : undefined]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: s(4),
  },
  label: {
    fontSize: s(3.5),
    fontWeight: '600',
    color: colors.textPrimary,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
    lineHeight: s(3.5) * 1.4,
    marginBottom: s(2),
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: s(2),
    borderWidth: s(0.25),
    borderColor: colors.border,
    paddingHorizontal: s(4),
    paddingVertical: s(3),
    fontSize: s(4),
    fontFamily: 'Inter-Regular',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    lineHeight: s(4) * 1.4,
  },
  inputError: {
    borderColor: colors.error,
  },
  multiline: {
    minHeight: s(20),
    textAlignVertical: 'top',
  },
  error: {
    marginTop: s(1),
    fontSize: s(3),
    fontWeight: '500',
    color: colors.error,
    fontFamily: 'Inter-Medium',
    letterSpacing: 0.2,
    lineHeight: s(3) * 1.4,
  },
});
