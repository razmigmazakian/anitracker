import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import EntryList from "@/components/EntryList";
import PrimaryButton from "@/components/PrimaryButton";
import { mockUser } from "@/constants/mockUser";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";

export default function HomeScreen() {
  const { entries, updateEntry } = useEntries();
  const watching = entries.filter((entry) => entry.status === "watching");
  const firstName = mockUser.displayName.split(" ")[0];

  return (
    <EntryList
      entries={watching}
      emptyIcon="play-circle-outline"
      emptyMessage="Anime you mark as Watching will appear here."
      emptyActionLabel="Find something to watch"
      onEmptyAction={() => router.push("/discover")}
      onIncrement={(entry, total) =>
        updateEntry({ ...entry, episodesWatched: Math.min(entry.episodesWatched + 1, total) })
      }
      footer={
        watching.length > 0 ? (
          <View style={styles.footer}>
            <PrimaryButton
              title="Browse Discover"
              variant="secondary"
              icon="compass-outline"
              onPress={() => router.push("/discover")}
            />
          </View>
        ) : null
      }
    >
      <View style={styles.welcome}>
        <Text accessibilityRole="header" style={styles.greeting}>
          Welcome back, {firstName}
        </Text>
        <Text style={styles.subtitle}>Pick up where you left off.</Text>
      </View>
      <View style={styles.sectionHeader}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>Continue Watching</Text>
        {watching.length > 0 ? <Text style={styles.count}>{watching.length}</Text> : null}
      </View>
    </EntryList>
  );
}

const styles = StyleSheet.create({
  welcome: {
    gap: spacing.xsmall,
    marginBottom: spacing.small,
  },
  greeting: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: spacing.small,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.title,
    fontWeight: "700",
  },
  count: {
    color: colors.textMuted,
    fontSize: fontSize.small,
    fontVariant: ["tabular-nums"],
  },
  footer: {
    marginTop: spacing.small,
  },
});
