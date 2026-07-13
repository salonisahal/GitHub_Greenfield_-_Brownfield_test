import React from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { s } from '../theme/spacing';

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
};

export default function SearchBar({ value, placeholder, onChangeText, onClear }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Search'}
        placeholderTextColor={colors.textDisabled}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        underlineColorAndroid="transparent"
        selectionColor={colors.primary}
        style={styles.input}
      />
      {value.length > 0 && onClear ? (
        <Pressable
          onPress={onClear}
          hitSlop={{ top: s(2), bottom: s(2), left: s(2), right: s(2) }}
          android_ripple={{ color: 'rgba(0,0,0,0.08)', borderless: true }}
          style={({ pressed }) => [styles.clearButton, pressed && Platform.OS === 'ios' && { opacity: 0.7 }]}
        >
          <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: s(2),
    paddingHorizontal: s(3),
    paddingVertical: s(2),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    marginLeft: s(2),
    marginRight: s(2),
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 * 1.4,
    letterSpacing: 0.2,
    color: colors.textPrimary,
    fontFamily: 'Inter-Medium',
  },
  clearButton: {
    width: s(6),
    height: s(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
