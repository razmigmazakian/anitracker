import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";
import { catalogue } from "@/data/catalogue";

export default function AnimeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const anime = catalogue.find((entry) => entry.id === id);

  if (!anime) {
    return (
      <View style={[styles.screen, styles.content]}>
        <Text style={styles.title}>Anime not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {anime.coverUrl ? (
        <Image
          source={{ uri: anime.coverUrl }}
          style={styles.cover}
          contentFit="cover"
          accessibilityLabel={`${anime.title} cover`}
        />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]}>
          <Text style={styles.title}>{anime.title}</Text>
        </View>
      )}

      <Text style={styles.title}>{anime.title}</Text>
      <Text style={styles.metadata}>Anime ID: {anime.id}</Text>
      <Text style={styles.metadata}>
        Type: {anime.type === "series" ? "Series" : "Movie"}
      </Text>
      <Text style={styles.metadata}>Genres: {anime.genres.join(", ")}</Text>
      <Text style={styles.metadata}>Episodes: {anime.episodes}</Text>
      <Text style={styles.metadata}>Year: {anime.year}</Text>
      <Text style={styles.metadata}>Rating: {anime.rating}</Text>
      <Text style={styles.synopsis}>{anime.synopsis}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.medium,
    gap: spacing.small,
  },
  cover: {
    width: "100%",
    height: 220,
    borderRadius: spacing.small,
  },
  coverPlaceholder: {
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.medium,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  metadata: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
  },
  synopsis: {
    color: colors.text,
    fontSize: fontSize.medium,
  },
});