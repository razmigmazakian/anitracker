import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import CoverArt from "@/components/CoverArt";
import { colors, fontSize, spacing } from "@/constants/theme";
import type { Anime } from "@/types/anime";

type Props = {
  anime: Anime;
  onPress: () => void;
};

export default function AnimeCard({ anime, onPress }: Props) {
  const typeLabel = anime.type === "series" ? "Series" : "Movie";
  const firstGenre = anime.genres[0];
  const meta = [typeLabel, anime.year, firstGenre].filter(Boolean).join(" · ");

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${anime.title}, ${meta}, rated ${anime.rating.toFixed(1)}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View>
        <CoverArt anime={anime} style={styles.cover} />
        <View style={styles.ratingPill}>
          <Ionicons name="star" size={12} color={colors.rating} />
          <Text style={styles.rating}>{anime.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {anime.title}
      </Text>
      <Text style={styles.metadata} numberOfLines={1}>
        {meta}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xsmall + 2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  cover: {
    width: "100%",
    aspectRatio: 2 / 3,
  },
  ratingPill: {
    position: "absolute",
    top: spacing.small,
    left: spacing.small,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "rgba(14, 15, 22, 0.8)",
  },
  rating: {
    color: colors.text,
    fontSize: fontSize.xsmall,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  title: {
    color: colors.text,
    fontSize: fontSize.small,
    fontWeight: "700",
    lineHeight: 19,
  },
  metadata: {
    color: colors.textMuted,
    fontSize: fontSize.xsmall,
  },
});
