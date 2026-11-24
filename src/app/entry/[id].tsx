import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import PrimaryButton from "@/components/PrimaryButton";
import StatusChip from "@/components/StatusChip";
import CoverArt from "@/components/CoverArt";
import TextField from "@/components/TextField";
import { listStatuses, listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, spacing, touchTarget } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import { catalogue } from "@/data/catalogue";
import { entrySchema } from "@/schemas/entrySchema";
import type { Anime, ListEntry, ListStatus } from "@/types/anime";

type FieldErrors = Partial<Record<keyof z.output<typeof entrySchema>, string>>;

export default function EntryFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries } = useEntries();
  const anime = catalogue.find((item) => item.id === id);
  const entry = entries.find((item) => item.animeId === id);

  return anime ? (
    <EntryForm key={anime.id} anime={anime} entry={entry} />
  ) : (
    <View style={[styles.screen, styles.content]}>
      <Stack.Screen options={{ title: "Add to List" }} />
      <Text style={styles.title}>We couldn&apos;t find that anime.</Text>
    </View>
  );
}

function EntryForm({ anime, entry }: { anime: Anime; entry?: ListEntry }) {
  const { addEntry, updateEntry } = useEntries();
  const [isEditing] = useState(entry !== undefined);
  const [status, setStatus] = useState<ListStatus>(entry?.status ?? "planned");
  const [episodes, setEpisodes] = useState(String(entry?.episodesWatched ?? 0));
  const [score, setScore] = useState(entry?.score?.toString() ?? "");
  const [notes, setNotes] = useState(entry?.notes ?? "");
  const [errors, setErrors] = useState<FieldErrors>({});

  const episodeCount = Number.parseInt(episodes, 10);
  function stepEpisodes(delta: number) {
    const current = Number.isNaN(episodeCount) ? 0 : episodeCount;
    setEpisodes(String(Math.min(Math.max(current + delta, 0), anime.episodes)));
    setErrors((prev) => ({ ...prev, episodesWatched: undefined }));
  }

  function saveEntry() {
    const result = entrySchema.safeParse({
      status,
      episodesWatched: episodes,
      score: score.trim() || undefined,
      notes: notes || undefined,
    });

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      setErrors({
        status: fieldErrors.status?.[0],
        episodesWatched: fieldErrors.episodesWatched?.[0],
        score: fieldErrors.score?.[0],
        notes: fieldErrors.notes?.[0],
      });
      return;
    }
    if (result.data.episodesWatched > anime.episodes) {
      setErrors({ episodesWatched: `Max is ${anime.episodes} episodes` });
      return;
    }

    setErrors({});
    const savedEntry: ListEntry = { animeId: anime.id, ...result.data };
    if (isEditing) {
      updateEntry(savedEntry);
    } else {
      addEntry(savedEntry);
    }

    const message = `Your entry for ${anime.title} was saved.`;
    function leaveForm() {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace({ pathname: "/anime/[id]", params: { id: anime.id } });
      }
    }

    if (Platform.OS === "web") {
      globalThis.alert(`Saved\n\n${message}`);
      leaveForm();
    } else {
      Alert.alert("Saved", message, [{ text: "OK", onPress: leaveForm }]);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: isEditing ? "Edit Entry" : "Add to List" }} />
      <View style={styles.header}>
        <CoverArt anime={anime} style={styles.thumb} />
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={2}>{anime.title}</Text>
          <Text style={styles.subtitle}>
            {anime.type === "series" ? "Series" : "Movie"} · {anime.episodes} {anime.episodes === 1 ? "episode" : "episodes"}
          </Text>
        </View>
      </View>
      <View style={styles.statusField}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {listStatuses.map((value) => (
            <StatusChip
              key={value}
              label={listStatusLabels[value]}
              selected={status === value}
              onPress={() => {
                setStatus(value);
                if (value === "completed") {
                  setEpisodes(String(anime.episodes));
                }
              }}
            />
          ))}
        </View>
        {errors.status ? <Text style={styles.error}>{errors.status}</Text> : null}
      </View>
      <TextField
        label="Episodes watched"
        value={episodes}
        onChangeText={setEpisodes}
        keyboardType="number-pad"
        error={errors.episodesWatched}
        helperText={`Out of ${anime.episodes}`}
        trailing={
          <View style={styles.stepper}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Decrease episodes watched"
              disabled={episodeCount <= 0}
              onPress={() => stepEpisodes(-1)}
              style={({ pressed }) => [styles.stepButton, pressed && styles.stepPressed, episodeCount <= 0 && styles.stepDisabled]}
            >
              <Ionicons name="remove" size={20} color={colors.primary} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Increase episodes watched"
              disabled={episodeCount >= anime.episodes}
              onPress={() => stepEpisodes(1)}
              style={({ pressed }) => [styles.stepButton, pressed && styles.stepPressed, episodeCount >= anime.episodes && styles.stepDisabled]}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </Pressable>
          </View>
        }
      />
      <TextField
        label="Score (optional)"
        value={score}
        onChangeText={setScore}
        keyboardType="decimal-pad"
        error={errors.score}
        helperText="From 1 to 10"
        placeholder="e.g. 8.5"
      />
      <TextField
        label="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        autoCapitalize="sentences"
        maxLength={200}
        error={errors.notes}
        helperText={`${notes.length}/200`}
        placeholder="Thoughts, favourite episodes, where you left off..."
      />
      <PrimaryButton title={isEditing ? "Save Changes" : "Add to List"} icon="checkmark" onPress={saveEntry} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium - 4,
  },
  thumb: {
    width: 56,
    aspectRatio: 2 / 3,
  },
  headerText: {
    flex: 1,
    gap: spacing.xsmall,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.title,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.small,
  },
  label: {
    color: colors.text,
    fontSize: fontSize.small,
    fontWeight: "600",
  },
  stepper: {
    flexDirection: "row",
    paddingRight: spacing.xsmall,
    gap: spacing.small,
  },
  stepButton: {
    width: touchTarget,
    height: touchTarget - 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
  },
  stepPressed: {
    opacity: 0.7,
  },
  stepDisabled: {
    opacity: 0.4,
  },
  statusField: {
    gap: spacing.small,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  error: {
    color: colors.danger,
    fontSize: fontSize.small,
  },
});