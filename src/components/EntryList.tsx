import { router } from "expo-router";
import type { ReactNode } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import { catalogue } from "@/data/catalogue";
import type { ListEntry } from "@/types/anime";

type Props = {
  entries: ListEntry[];
  emptyMessage: string;
  heading?: string;
  children?: ReactNode;
  onIncrement?: (entry: ListEntry, totalEpisodes: number) => void;
};

export default function EntryList({ entries, emptyMessage, heading, children, onIncrement }: Props) {
  const { isLoading, error } = useEntries();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {heading ? <Text style={styles.heading}>{heading}</Text> : null}
      {children}
      {isLoading ? <ActivityIndicator color={colors.primary} accessibilityLabel="Loading list" /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!isLoading && !error && entries.length === 0 ? (
        <Text style={styles.progress}>{emptyMessage}</Text>
      ) : null}
      {entries.map((entry) => {
        const anime = catalogue.find((item) => item.id === entry.animeId);
        if (!anime) return null;
        const atEpisodeLimit = entry.episodesWatched >= anime.episodes;

        return (
          <View key={entry.animeId} style={styles.entry}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push({ pathname: "/anime/[id]", params: { id: anime.id } })}
              style={styles.details}
            >
              <Text style={styles.title}>{anime.title}</Text>
              <Text style={styles.progress}>
                {listStatusLabels[entry.status]} · {entry.episodesWatched} / {anime.episodes} ep
              </Text>
            </Pressable>
            {onIncrement && entry.status === "watching" && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Log one episode of ${anime.title}`}
                accessibilityState={{ disabled: atEpisodeLimit }}
                disabled={atEpisodeLimit}
                onPress={() => onIncrement(entry, anime.episodes)}
                style={[styles.increment, atEpisodeLimit && styles.disabled]}
              >
                <Text style={styles.incrementLabel}>+1 ep</Text>
              </Pressable>
            )}
          </View>
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
    flexDirection: "row",
  },
  details: {
    flex: 1,
    padding: spacing.medium,
    gap: spacing.small,
  },
  increment: {
    minHeight: 44,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.medium,
  },
  incrementLabel: {
    color: colors.primary,
    fontSize: fontSize.medium,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
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
