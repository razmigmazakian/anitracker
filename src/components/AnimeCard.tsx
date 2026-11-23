import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";
import type { Anime } from "@/types/anime";

type Props = {
  anime: Anime;
  onPress: () => void;
};

export default function AnimeCard({ anime, onPress }: Props) {
  const typeLabel = anime.type === "series" ? "Series" : "Movie";
  const firstGenre = anime.genres[0];

  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      {anime.coverUrl ? (
        <Image
          source={{ uri: anime.coverUrl }}
          style={styles.cover}
          contentFit="cover"
        />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]}>
          <Text style={styles.title}>{anime.title}</Text>
        </View>
      )}

      <Text style={styles.title}>{anime.title}</Text>
      <Text style={styles.metadata}>
        {typeLabel}{firstGenre ? ` · ${firstGenre}` : ""}
      </Text>
      <Text style={styles.rating}>Rating: {anime.rating}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: spacing.small,
    padding: spacing.medium,
    gap: spacing.small,
  },
  cover: {
    width: "100%",
    height: 160,
    borderRadius: spacing.small,
  },
  coverPlaceholder: {
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.medium,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
  metadata: {
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
  rating: {
    color: colors.primary,
    fontSize: fontSize.small,
  },
});