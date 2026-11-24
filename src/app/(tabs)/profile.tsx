import Constants from "expo-constants";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, Text, View,
  type AlertButton,
} from "react-native";

import PrimaryButton from "@/components/PrimaryButton";
import SettingsRow from "@/components/SettingsRow";
import { mockUser } from "@/constants/mockUser";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { useEntries } from "@/context/EntriesContext";
import { catalogue } from "@/data/catalogue";

const languages = ["English", "Arabic", "Japanese"];
const cancel: AlertButton = { text: "Cancel", style: "cancel" };

export default function ProfileScreen() {
  const { entries, isLoading, error } = useEntries();
  const [language, setLanguage] = useState("English");
  const completed = entries.filter((entry) => entry.status === "completed");
  const moviesWatched = completed.filter((entry) =>
    catalogue.some((anime) => anime.id === entry.animeId && anime.type === "movie")
  ).length;
  const stats = [
    { label: "Completed", value: completed.length },
    { label: "Movies watched", value: moviesWatched },
    { label: "Total episodes", value: entries.reduce((total, entry) => total + entry.episodesWatched, 0) },
  ];

  function chooseTheme() {
    Alert.alert("Theme", "Choose a theme.", [
      cancel,
      { text: "Dark", onPress: () => Alert.alert("Theme", "Dark mode is active.") },
      { text: "Light", onPress: () => Alert.alert("Theme", "Light mode is coming soon.") },
    ], { cancelable: true });
  }

  function chooseLanguage() {
    const choices = languages.map((name) => ({
      text: name,
      onPress: () => {
        setLanguage(name);
        Alert.alert("Language", `Language set to ${name}`);
      },
    }));
    // Android supports three alert buttons and allows dismissal with Back.
    Alert.alert(
      "Language",
      "Choose a language.",
      Platform.OS === "android" ? choices : [...choices, cancel],
      { cancelable: true },
    );
  }

  function showAbout() {
    const version = Constants.expoConfig?.version;
    const description = "Discover anime, track your episodes, and organize your watchlist.";
    Alert.alert("AniTracker", version ? `Version ${version}\n${description}` : description);
  }

  function confirmLogout() {
    Alert.alert("Log out?", undefined, [
      cancel,
      { text: "Log out", style: "destructive", onPress: () => router.replace("/login") },
    ], { cancelable: true });
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.initial}>{mockUser.displayName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.identity}>
          <Text accessibilityRole="header" style={styles.name}>{mockUser.displayName}</Text>
          <Text style={styles.secondary}>{mockUser.email}</Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator accessibilityLabel="Loading statistics" color={colors.primary} />
      ) : error ? (
        <Text style={styles.danger}>{error}</Text>
      ) : (
        <View style={styles.stats}>
          {stats.map(({ label, value }, index) => (
            <View
              key={label}
              accessible
              accessibilityLabel={`${label}, ${value}`}
              style={[styles.stat, index > 0 && styles.statDivider]}
            >
              <Text style={styles.number}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settings}>
          <SettingsRow icon="moon-outline" label="Theme" value="Dark" onPress={chooseTheme} />
          <View style={styles.separator} />
          <SettingsRow icon="language-outline" label="Language" value={language} onPress={chooseLanguage} />
          <View style={styles.separator} />
          <SettingsRow
            icon="notifications-outline"
            label="Notifications"
            value="Off"
            onPress={() => Alert.alert("Notifications", "Notifications are not available in this version.")}
          />
          <View style={styles.separator} />
          <SettingsRow icon="information-circle-outline" label="About AniTracker" onPress={showAbout} />
        </View>
      </View>
      <PrimaryButton title="Log out" variant="danger" icon="log-out-outline" onPress={confirmLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.medium, paddingBottom: spacing.xlarge, gap: spacing.large },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.medium },
  avatar: {
    width: 64, height: 64, borderRadius: 32, alignItems: "center",
    justifyContent: "center", backgroundColor: colors.primary,
  },
  initial: { color: colors.onPrimary, fontSize: fontSize.large, fontWeight: "800" },
  identity: { flex: 1, gap: spacing.xsmall },
  name: { color: colors.text, fontSize: fontSize.title, fontWeight: "700" },
  secondary: { color: colors.textMuted, fontSize: fontSize.small },
  stats: {
    flexDirection: "row", backgroundColor: colors.card, borderRadius: radius.large,
    borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.medium,
  },
  stat: { flex: 1, alignItems: "center", gap: spacing.xsmall, paddingHorizontal: spacing.small },
  statDivider: { borderLeftWidth: 1, borderLeftColor: colors.border },
  number: {
    color: colors.text, fontSize: fontSize.large, fontWeight: "800", fontVariant: ["tabular-nums"],
  },
  statLabel: { color: colors.textMuted, fontSize: fontSize.xsmall, textAlign: "center" },
  section: { gap: spacing.small },
  sectionTitle: {
    color: colors.textMuted, fontSize: fontSize.small, fontWeight: "600",
    textTransform: "uppercase", letterSpacing: 0.5, marginLeft: spacing.xsmall,
  },
  settings: {
    borderRadius: radius.large, overflow: "hidden", borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.card,
  },
  separator: { height: 1, marginLeft: 60, backgroundColor: colors.border },
  danger: { color: colors.danger, fontSize: fontSize.medium, fontWeight: "600" },
});
