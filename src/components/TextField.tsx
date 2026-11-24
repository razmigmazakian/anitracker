import { Ionicons } from "@expo/vector-icons";
import { useState, type ReactNode } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { colors, fontSize, radius, spacing, touchTarget } from "@/constants/theme";

type Props = Pick<
  TextInputProps,
  | "keyboardType"
  | "multiline"
  | "autoComplete"
  | "textContentType"
  | "returnKeyType"
  | "onSubmitEditing"
  | "placeholder"
  | "maxLength"
  | "autoCapitalize"
> & {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  helperText?: string;
  secureTextEntry?: boolean;
  /** Rendered inside the field after the input (e.g. a stepper). */
  trailing?: ReactNode;
};

export default function TextField({
  label,
  value,
  onChangeText,
  error,
  helperText,
  secureTextEntry = false,
  multiline,
  trailing,
  autoCapitalize = "none",
  ...inputProps
}: Props) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const hint = error ?? helperText;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrap,
          focused && styles.focused,
          error ? styles.invalid : null,
        ]}
      >
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          accessibilityHint={hint}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          multiline={multiline}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry && !revealed}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, multiline && styles.multiline]}
        />
        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={revealed ? "Hide password" : "Show password"}
            onPress={() => setRevealed((shown) => !shown)}
            hitSlop={4}
            style={styles.accessory}
          >
            <Ionicons
              name={revealed ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
        {trailing}
      </View>
      {error ? (
        <View style={styles.messageRow} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={16} color={colors.danger} accessibilityElementsHidden />
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.small,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.small,
    fontWeight: "600",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.medium,
  },
  focused: {
    borderColor: colors.primary,
  },
  invalid: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    width: 0, // lets the input shrink beside trailing controls (web <input> has an intrinsic width)
    minHeight: 48,
    color: colors.text,
    fontSize: fontSize.medium,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium - 4,
  },
  multiline: {
    minHeight: 112,
    textAlignVertical: "top",
  },
  accessory: {
    width: touchTarget,
    height: touchTarget,
    alignItems: "center",
    justifyContent: "center",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xsmall,
  },
  error: {
    flex: 1,
    color: colors.danger,
    fontSize: fontSize.small,
  },
  helper: {
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
});
