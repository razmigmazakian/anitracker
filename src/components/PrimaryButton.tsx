import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors, fontSize, radius, spacing } from "@/constants/theme";

type Variant = "primary" | "secondary" | "danger";

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  icon?: ComponentProps<typeof Ionicons>["name"];
  disabled?: boolean;
  loading?: boolean;
  accessibilityHint?: string;
};

const foreground: Record<Variant, string> = {
  primary: colors.onPrimary,
  secondary: colors.primary,
  danger: colors.danger,
};

export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
  accessibilityHint,
}: Props) {
  const inactive = disabled || loading;
  const color = foreground[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      accessibilityHint={accessibilityHint}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        inactive && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : icon ? (
        <Ionicons name={icon} size={20} color={color} accessibilityElementsHidden />
      ) : null}
      <Text style={[styles.title, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.small,
    paddingHorizontal: spacing.large,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: "transparent",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.dangerSoft,
    borderColor: colors.danger,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.45,
  },
  title: {
    fontSize: fontSize.medium,
    fontWeight: "700",
  },
});
