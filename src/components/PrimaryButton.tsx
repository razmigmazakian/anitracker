import { Pressable, StyleSheet, Text } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.medium,
  },
  pressed: {
    opacity: 0.8,
  },
  title: {
    color: colors.background,
    fontSize: fontSize.medium,
    fontWeight: "bold",
  },
});