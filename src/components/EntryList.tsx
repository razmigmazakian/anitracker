import { router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import { catalogue } from "@/data/catalogue";
import type { ListEntry } from "@/types/anime";

type Props = {
  entries: ListEntry[];
  emptyMessage: string;
  heading?: string;
};

export default function EntryList({ entries, emptyMessage, heading }: Props) {
  const { isLoading, error } = useEntries();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {heading ? <Text style={styles.heading}>{heading}</Text> : null}
      {isLoading ? <ActivityIndicator color={colors.primary} accessibilityLabel="Loading list" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!isLoading && !error && entries.length === 0 ? (
        <Text style={styles.progress}>{emptyMessage}</Text>
      ) : null}
      {entries.map((entry) => {
        const anime = catalogue.find((item) => item.id === entry.animeId);
        if (!anime) return null;

        return (
          <Pressable
            key={entry.animeId}
            accessibilityRole="button"
            onPress={() => router.push({ pathname: "/anime/[id]", params: { id: anime.id } })}
            style={styles.entry}
          >
            <Text style={styles.title}>{anime.title}</Text>
            <Text style={styles.progress}>
              {listStatusLabels[entry.status]} · {entry.episodesWatched} / {anime.episodes} ep
            </Text>
          </Pressable>
        );
      })}
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
  heading: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  entry: {
    backgroundColor: colors.card,
    borderRadius: spacing.small,
    padding: spacing.medium,
    gap: spacing.small,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.medium,
    fontWeight: "bold",
  },
  progress: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.medium,
  },
});
