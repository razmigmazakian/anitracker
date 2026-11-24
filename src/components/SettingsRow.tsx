import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  label: string;
  value?: string;
  onPress: () => void;
};

export default function SettingsRow({ label, value, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      <Text style={styles.value}>{">"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    padding: spacing.medium,
    borderRadius: spacing.small,
    backgroundColor: colors.card,
  },
  pressed: { opacity: 0.75 },
  label: { flex: 1, color: colors.text, fontSize: fontSize.medium },
  value: { color: colors.textMuted, fontSize: fontSize.medium },
});
