import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function StatusChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    justifyContent: "center",
    backgroundColor: colors.card,
    borderRadius: spacing.small,
    paddingHorizontal: spacing.small,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.small,
    fontWeight: "600",
  },
  selectedLabel: {
    color: colors.background,
  },
});
