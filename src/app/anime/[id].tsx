import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import CoverArt from "@/components/CoverArt";
import EmptyState from "@/components/EmptyState";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressBar from "@/components/ProgressBar";
import StatusBadge from "@/components/StatusBadge";
import { colors, fontSize, radius, spacing, statusColors } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import { catalogue } from "@/data/catalogue";

export default function AnimeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, removeEntry } = useEntries();
  const entry = entries.find((item) => item.animeId === id);
  const anime = catalogue.find((item) => item.id === id);

  if (!anime) {
    return (
      <View style={[styles.screen, styles.content]}>
        <EmptyState
          icon="help-circle-outline"
          message="We couldn't find that anime."
          actionLabel="Back to Discover"
          onAction={() => router.replace("/discover")}
        />
      </View>
    );
  }

  const { id: animeId, title: animeTitle } = anime;
  const typeLabel = anime.type === "series" ? "Series" : "Movie";
  const openEntryForm = () =>
    router.push({ pathname: "/entry/[id]", params: { id: animeId } });

  function confirmRemoval() {
    const title = "Remove from List?";
    const message = `Remove your entry for ${animeTitle}? Your progress and notes will be deleted.`;
    if (Platform.OS === "web") {
      if (globalThis.confirm(message)) removeEntry(animeId);
      return;
    }
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeEntry(animeId) },
    ]);
  }

  const facts = [
    { icon: "star" as const, label: anime.rating.toFixed(2), a11y: `Rating ${anime.rating}`, color: colors.rating },
    { icon: "calendar-outline" as const, label: String(anime.year), a11y: `Year ${anime.year}`, color: colors.textMuted },
    {
      icon: "film-outline" as const,
      label: `${anime.episodes} ep`,
      a11y: `${anime.episodes} ${anime.episodes === 1 ? "episode" : "episodes"}`,
      color: colors.textMuted,
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <CoverArt anime={anime} style={styles.cover} />
        <View style={styles.heroText}>
          <Text accessibilityRole="header" style={styles.title}>{anime.title}</Text>
          <Text style={styles.type}>{typeLabel}</Text>
          <View style={styles.facts}>
            {facts.map((fact) => (
              <View key={fact.icon} style={styles.fact} accessible accessibilityLabel={fact.a11y}>
                <Ionicons name={fact.icon} size={14} color={fact.color} />
                <Text style={styles.factText}>{fact.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.tags} accessible accessibilityLabel={`Genres: ${anime.genres.join(", ")}`}>
        {anime.genres.map((genre) => (
          <View key={genre} style={styles.tag}>
            <Text style={styles.tagText}>{genre}</Text>
          </View>
        ))}
      </View>

      {entry ? (
        <View style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <Text style={styles.entryTitle}>In your list</Text>
            <StatusBadge status={entry.status} />
          </View>
          <ProgressBar value={entry.episodesWatched} max={anime.episodes} color={statusColors[entry.status]} />
          <Text style={styles.entryMeta}>
            {entry.episodesWatched} of {anime.episodes} episodes watched
            {entry.score !== undefined ? ` · Your score ${entry.score}/10` : ""}
          </Text>
          {entry.notes ? <Text style={styles.notes}>{entry.notes}</Text> : null}
        </View>
      ) : null}

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>Synopsis</Text>
        <Text style={styles.synopsis}>{anime.synopsis}</Text>
      </View>

      {entry ? (
        <View style={styles.actions}>
          <PrimaryButton title="Edit Entry" icon="create-outline" onPress={openEntryForm} />
          <PrimaryButton title="Remove from List" variant="danger" icon="trash-outline" onPress={confirmRemoval} />
        </View>
      ) : (
        <PrimaryButton title="Add to My List" icon="add" onPress={openEntryForm} />
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
    paddingBottom: spacing.xlarge,
    gap: spacing.large - 4,
  },
  hero: {
    flexDirection: "row",
    gap: spacing.medium,
  },
  cover: {
    width: 120,
    aspectRatio: 2 / 3,
  },
  heroText: {
    flex: 1,
    justifyContent: "flex-end",
    gap: spacing.small,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "800",
    lineHeight: 30,
  },
  type: {
    color: colors.primary,
    fontSize: fontSize.small,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  facts: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.medium - 4,
  },
  fact: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xsmall,
  },
  factText: {
    color: colors.text,
    fontSize: fontSize.small,
    fontVariant: ["tabular-nums"],
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  tag: {
    paddingHorizontal: spacing.medium - 4,
    paddingVertical: spacing.xsmall + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.cardRaised,
  },
  tagText: {
    color: colors.text,
    fontSize: fontSize.small,
  },
  entryCard: {
    gap: spacing.medium - 4,
    padding: spacing.medium,
    borderRadius: radius.large,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  entryTitle: {
    color: colors.text,
    fontSize: fontSize.medium,
    fontWeight: "700",
  },
  entryMeta: {
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
  notes: {
    color: colors.text,
    fontSize: fontSize.small,
    lineHeight: 20,
    fontStyle: "italic",
  },
  section: {
    gap: spacing.small,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.title,
    fontWeight: "700",
  },
  synopsis: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
    lineHeight: 24,
  },
  actions: {
    gap: spacing.medium - 4,
  },
});
