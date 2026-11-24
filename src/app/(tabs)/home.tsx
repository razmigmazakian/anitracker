import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import EntryList from "@/components/EntryList";
import PrimaryButton from "@/components/PrimaryButton";
import { mockUser } from "@/constants/mockUser";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";

export default function HomeScreen() {
  const { entries } = useEntries();

  return (
    <EntryList
      entries={entries.filter((entry) => entry.status === "watching")}
      emptyMessage="Anime marked Watching will appear here."
    >
      <View style={styles.welcome}>
        <Text accessibilityRole="header" style={styles.greeting}>
          Welcome back, {mockUser.displayName}
        </Text>
        <Text style={styles.subtitle}>Pick up where you left off.</Text>
      </View>
      <PrimaryButton title="Browse Discover" onPress={() => router.push("/discover")} />
      <Text accessibilityRole="header" style={styles.sectionTitle}>Continue Watching</Text>
    </EntryList>
  );
}

const styles = StyleSheet.create({
  welcome: {
    gap: spacing.small,
    marginBottom: spacing.small,
  },
  greeting: {
    color: colors.text,
    fontSize: fontSize.large,
    fontWeight: "bold",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSize.medium,
  },
  sectionTitle: {
    marginTop: spacing.medium,
    color: colors.text,
    fontSize: fontSize.medium,
    fontWeight: "bold",
  },
});
