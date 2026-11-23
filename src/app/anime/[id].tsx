import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import { listStatusLabels } from "@/constants/listStatus";
import { useEntries } from "@/context/EntriesContext";
import { colors, fontSize, spacing } from "@/constants/theme";
import { catalogue } from "@/data/catalogue";

export default function AnimeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, removeEntry } = useEntries();
  const entry = entries.find((item) => item.animeId === id);
  const anime = catalogue.find((entry) => entry.id === id);

  if (!anime) {
    return (
      <View style={[styles.screen, styles.content]}>
        <Text style={styles.title}>Anime not found</Text>
      </View>
    );
  }

  const { id: animeId, title: animeTitle } = anime;
  const openEntryForm = () =>
    router.push({ pathname: "/entry/[id]", params: { id: animeId } });

  function confirmRemoval() {
    const title = "Remove from List?";
    const message = `Remove your entry for ${animeTitle}?`;
    if (Platform.OS === "web") {
      if (globalThis.confirm(message)) removeEntry(animeId);
      return;
    }
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeEntry(animeId) },
    ]);
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
      {entry ? (
        <View style={styles.actions}>
          <Text style={styles.metadata}>
            {listStatusLabels[entry.status]} · {entry.episodesWatched} / {anime.episodes} ep
          </Text>
          <PrimaryButton title="Edit Entry" onPress={openEntryForm} />
          <Pressable accessibilityRole="button" onPress={confirmRemoval} style={styles.remove}>
            <Text style={styles.removeLabel}>Remove from List</Text>
          </Pressable>
        </View>
      ) : (
        <PrimaryButton title="Add to My List" onPress={openEntryForm} />
      )}
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
  actions: {
    gap: spacing.small,
  },
  remove: {
    alignItems: "center",
    padding: spacing.medium,
  },
  removeLabel: {
    color: colors.danger,
    fontSize: fontSize.medium,
  },
  synopsis: {
    color: colors.text,
    fontSize: fontSize.medium,
  },
});
