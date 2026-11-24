import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import { colors, fontSize, radius, spacing } from "@/constants/theme";

type Props = {
  icon: ComponentProps<typeof Ionicons>["name"];
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({ icon, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.primary} accessibilityElementsHidden />
      </View>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <PrimaryButton title={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.medium,
    paddingVertical: spacing.xlarge,
    paddingHorizontal: spacing.large,
    borderRadius: radius.large,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  message: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
    lineHeight: 24,
    textAlign: "center",
  },
});
