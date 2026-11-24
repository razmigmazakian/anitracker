import { StyleSheet, View } from "react-native";

import { colors, radius } from "@/constants/theme";

type Props = {
  value: number;
  max: number;
  color?: string;
};

/** Visual-only bar; callers must render the numeric progress as text too. */
export default function ProgressBar({ value, max, color = colors.primary }: Props) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;

  return (
    <View style={styles.track} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={[styles.fill, { width: `${ratio * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.track,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill,
  },
});
