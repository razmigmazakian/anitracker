import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { ComponentProps, ReactNode } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import CoverArt from "@/components/CoverArt";
import EmptyState from "@/components/EmptyState";
import ProgressBar from "@/components/ProgressBar";
import StatusBadge from "@/components/StatusBadge";
import { listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, radius, spacing, statusColors, touchTarget } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import { catalogue } from "@/data/catalogue";
import type { ListEntry } from "@/types/anime";

type Props = {
  entries: ListEntry[];
  emptyMessage: string;
  emptyIcon?: ComponentProps<typeof Ionicons>["name"];
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  children?: ReactNode;
  footer?: ReactNode;
  onIncrement?: (entry: ListEntry, totalEpisodes: number) => void;
};

export default function EntryList({
  entries,
  emptyMessage,
  emptyIcon = "albums-outline",
  emptyActionLabel,
  onEmptyAction,
  children,
  footer,
  onIncrement,
}: Props) {
  const { isLoading, error } = useEntries();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {children}
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={colors.primary} accessibilityLabel="Loading list" />
      ) : null}
      {error ? (
        <View style={styles.errorRow} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={20} color={colors.danger} accessibilityElementsHidden />
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
      {!isLoading && !error && entries.length === 0 ? (
        <EmptyState
          icon={emptyIcon}
          message={emptyMessage}
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction}
        />
      ) : null}
      {entries.map((entry) => {
        const anime = catalogue.find((item) => item.id === entry.animeId);
        if (!anime) return null;
        const atEpisodeLimit = entry.episodesWatched >= anime.episodes;
        const progress = `${entry.episodesWatched} of ${anime.episodes} episodes`;

        return (
          <View key={entry.animeId} style={styles.entry}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${anime.title}, ${listStatusLabels[entry.status]}, ${progress}`}
              onPress={() => router.push({ pathname: "/anime/[id]", params: { id: anime.id } })}
              style={({ pressed }) => [styles.details, pressed && styles.pressed]}
            >
              <CoverArt anime={anime} style={styles.thumb} />
              <View style={styles.body}>
                <Text style={styles.title} numberOfLines={2}>
                  {anime.title}
                </Text>
                <StatusBadge status={entry.status} />
                <View style={styles.progressRow}>
                  <View style={styles.progressBar}>
                    <ProgressBar
                      value={entry.episodesWatched}
                      max={anime.episodes}
                      color={statusColors[entry.status]}
                    />
                  </View>
                  <Text style={styles.progress}>
                    {entry.episodesWatched}/{anime.episodes}
                  </Text>
                </View>
              </View>
            </Pressable>
            {onIncrement && entry.status === "watching" ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Log one episode of ${anime.title}`}
                accessibilityState={{ disabled: atEpisodeLimit }}
                disabled={atEpisodeLimit}
                onPress={() => onIncrement(entry, anime.episodes)}
                style={({ pressed }) => [
                  styles.increment,
                  pressed && styles.incrementPressed,
                  atEpisodeLimit && styles.disabled,
                ]}
              >
                <Ionicons name="add" size={20} color={colors.primary} />
                <Text style={styles.incrementLabel}>Ep</Text>
              </Pressable>
            ) : null}
          </View>
        );
      })}
      {footer}
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
    paddingBottom: spacing.xlarge,
    gap: spacing.medium - 4,
  },
  loader: {
    paddingVertical: spacing.large,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
    padding: spacing.medium,
    borderRadius: radius.medium,
    backgroundColor: colors.dangerSoft,
  },
  error: {
    flex: 1,
    color: colors.danger,
    fontSize: fontSize.medium,
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  details: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.medium - 4,
    padding: spacing.medium - 4,
  },
  pressed: {
    backgroundColor: colors.cardRaised,
  },
  thumb: {
    width: 56,
    aspectRatio: 2 / 3,
    borderRadius: radius.small,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.small,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.medium,
    fontWeight: "700",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.small,
  },
  progressBar: {
    flex: 1,
  },
  progress: {
    color: colors.textMuted,
    fontSize: fontSize.xsmall,
    fontVariant: ["tabular-nums"],
  },
  increment: {
    minWidth: 56,
    minHeight: touchTarget + 12,
    marginRight: spacing.medium - 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.medium,
    backgroundColor: colors.primarySoft,
  },
  incrementPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  incrementLabel: {
    color: colors.primary,
    fontSize: fontSize.xsmall,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.4,
  },
});
