import { Image } from "expo-image";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors, fontSize, radius } from "@/constants/theme";
import type { Anime } from "@/types/anime";

const placeholderTints = ["#3B2F63", "#1F3A5F", "#204E46", "#5A3A1E", "#5B2440", "#2D3A5C"];

type Props = {
  anime: Pick<Anime, "id" | "title" | "coverUrl">;
  style?: StyleProp<ViewStyle>;
};

function initials(title: string) {
  return title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z0-9]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** Poster image, or a deterministic tinted placeholder when no cover exists. Decorative. */
export default function CoverArt({ anime, style }: Props) {
  if (anime.coverUrl) {
    return (
      <View style={[styles.cover, style]}>
        <Image
          source={{ uri: anime.coverUrl }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={150}
          accessible={false}
        />
      </View>
    );
  }

  const hash = [...anime.title].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);
  const tint = placeholderTints[hash % placeholderTints.length];

  return (
    <View
      style={[styles.cover, styles.placeholder, { backgroundColor: tint }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Text style={styles.initials}>{initials(anime.title)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    borderRadius: radius.medium,
    overflow: "hidden",
    backgroundColor: colors.cardRaised,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    gap: 4,
  },
  initials: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: fontSize.large,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
