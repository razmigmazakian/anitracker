import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fontSize, radius, spacing, touchTarget } from "@/constants/theme";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

export default function StatusChip({ label, selected, onPress, accessibilityLabel }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      {selected ? (
        <Ionicons name="checkmark" size={16} color={colors.onPrimary} accessibilityElementsHidden />
      ) : null}
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: touchTarget,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xsmall,
    paddingHorizontal: spacing.medium - 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.small,
    fontWeight: "600",
  },
  selectedLabel: {
    color: colors.onPrimary,
  },
});
