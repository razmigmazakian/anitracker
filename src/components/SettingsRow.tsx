import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontSize, radius, spacing } from "@/constants/theme";

type Props = {
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  value?: string;
  onPress: () => void;
};

export default function SettingsRow({ label, icon, value, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={18} color={colors.primary} accessibilityElementsHidden />
      </View>
      <Text style={styles.label}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} accessibilityElementsHidden />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium - 4,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.card,
  },
  pressed: { backgroundColor: colors.cardRaised },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.small,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  label: { flex: 1, color: colors.text, fontSize: fontSize.medium },
  value: { color: colors.textMuted, fontSize: fontSize.medium },
});
