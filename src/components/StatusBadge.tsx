import { StyleSheet, Text, View } from "react-native";

import { listStatusLabels } from "@/constants/listStatus";
import { fontSize, radius, spacing, statusColors } from "@/constants/theme";
import type { ListStatus } from "@/types/anime";

/** Non-interactive status label: colored dot + text, so status is never conveyed by color alone. */
export default function StatusBadge({ status }: { status: ListStatus }) {
  const color = statusColors[status];

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]}>{listStatusLabels[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xsmall + 2,
    paddingHorizontal: spacing.small,
    paddingVertical: 2,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: fontSize.xsmall,
    fontWeight: "600",
  },
});
