import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";

import PrimaryButton from "@/components/PrimaryButton";
import StatusChip from "@/components/StatusChip";
import TextField from "@/components/TextField";
import { listStatuses, listStatusLabels } from "@/constants/listStatus";
import { colors, fontSize, spacing } from "@/constants/theme";
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
      <Text style={styles.title}>Anime not found</Text>
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
      <Text style={styles.title}>{anime.title}</Text>
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
      />
      <TextField
        label="Score (optional)"
        value={score}
        onChangeText={setScore}
        keyboardType="decimal-pad"
        error={errors.score}
      />
      <TextField
        label="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        error={errors.notes}
      />
      <PrimaryButton title="Save" onPress={saveEntry} />
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
    gap: spacing.medium,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  label: {
    color: colors.text,
    fontSize: fontSize.medium,
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